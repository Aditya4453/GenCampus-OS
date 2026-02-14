import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import groq from '@/lib/groq';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { eventName, theme, audience, tone } = await req.json();

    if (!eventName || !theme) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await dbConnect();

    // Create project with pending status
    const project = await Project.create({
      userId: session.user.id,
      eventName,
      theme,
      audience: audience || 'college students',
      tone: tone || 'energetic and engaging',
      status: 'generating',
    });

    // Generate marketing content with Groq
    const prompt = `Generate a complete marketing kit for a college event with these details:
Event Name: ${eventName}
Theme: ${theme}
Target Audience: ${audience || 'college students'}
Tone: ${tone || 'energetic and engaging'}

Provide the following in JSON format:
1. posterPrompt: A detailed prompt for generating an Instagram poster (describe visual style, colors, layout, text placement)
2. caption: An engaging Instagram caption with emojis and hashtags (3-5 lines)
3. emailInvite: A professional email invitation in HTML format with inline CSS (complete HTML structure)
4. whatsappMessage: A concise WhatsApp broadcast message (2-3 lines max)
5. landingPageHTML: A complete, modern, responsive landing page HTML with inline CSS (full HTML document with hero section, features, and CTA)

Return ONLY valid JSON with these exact keys. Make the content creative, engaging, and professional.`;

    console.log('Starting Groq API call...');
    
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: 'You are a marketing expert for college events. Return only valid JSON with no additional text or markdown formatting.',
        },
        { role: 'user', content: prompt },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.8,
      max_tokens: 4000,
    });

    console.log('Groq API call successful');
    console.log('Response:', completion.choices[0].message.content?.substring(0, 200));

    const content = JSON.parse(completion.choices[0].message.content || '{}');
    
    console.log('Generated content keys:', Object.keys(content));

    // Convert posterPrompt to string if it's an object
    let posterPromptString = content.posterPrompt;
    if (typeof posterPromptString === 'object') {
      posterPromptString = JSON.stringify(posterPromptString);
    }

    // Generate a placeholder poster URL (you can integrate with an image generation service later)
    // For now, we'll use a placeholder image service
    const posterUrl = `https://placehold.co/1080x1080/3B82F6/ffffff?text=${encodeURIComponent(eventName)}&font=roboto`;

    // Update project with generated assets
    project.generatedAssets = {
      posterUrl,
      posterPrompt: posterPromptString,
      caption: content.caption,
      emailInvite: content.emailInvite,
      whatsappMessage: content.whatsappMessage,
      landingPageHTML: content.landingPageHTML,
    };
    project.status = 'completed';
    await project.save();

    return NextResponse.json({
      projectId: project._id,
      ...project.generatedAssets,
    });
  } catch (error: any) {
    console.error('Generation error:', error);
    console.error('Error details:', {
      message: error?.message,
      status: error?.status,
      response: error?.response?.data,
    });
    
    // Handle rate limiting
    if (error?.status === 429) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }

    // Return more detailed error for debugging
    return NextResponse.json(
      { 
        error: 'Failed to generate content',
        details: error?.message || 'Unknown error',
      },
      { status: 500 }
    );
  }
}
