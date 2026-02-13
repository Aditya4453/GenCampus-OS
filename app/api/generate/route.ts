import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import openai from '@/lib/openai';
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

    // Generate marketing content with GPT
    const prompt = `Generate a complete marketing kit for a college event with these details:
Event Name: ${eventName}
Theme: ${theme}
Target Audience: ${audience || 'college students'}
Tone: ${tone || 'energetic and engaging'}

Provide the following in JSON format:
1. posterPrompt: A detailed DALL-E prompt for an Instagram poster (describe visual style, colors, layout)
2. caption: An engaging Instagram caption with emojis and hashtags
3. emailInvite: A professional email invitation (HTML format)
4. whatsappMessage: A concise WhatsApp broadcast message
5. landingPageHTML: A simple, modern landing page HTML (include inline CSS, make it responsive)

Return ONLY valid JSON with these exact keys.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: 'You are a marketing expert for college events. Return only valid JSON.',
        },
        { role: 'user', content: prompt },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.8,
    });

    const content = JSON.parse(completion.choices[0].message.content || '{}');

    // Generate poster image with DALL-E
    let posterUrl = '';
    try {
      const imageResponse = await openai.images.generate({
        model: 'dall-e-3',
        prompt: content.posterPrompt || `Create a vibrant Instagram poster for ${eventName} with theme ${theme}`,
        n: 1,
        size: '1024x1024',
        quality: 'standard',
      });
      posterUrl = imageResponse.data?.[0]?.url || '';
    } catch (imageError) {
      console.error('DALL-E error:', imageError);
      // Continue without image if it fails
    }

    // Update project with generated assets
    project.generatedAssets = {
      posterUrl,
      posterPrompt: content.posterPrompt,
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
    
    // Handle rate limiting
    if (error?.status === 429) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500 }
    );
  }
}
