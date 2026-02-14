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
    const prompt = `You are an expert marketing copywriter specializing in college events and Gen-Z communication. Create a complete marketing kit for this event:

EVENT DETAILS:
- Event Name: ${eventName}
- Theme: ${theme}
- Target Audience: ${audience || 'college students'}
- Tone: ${tone || 'energetic and engaging'}

Generate the following content in JSON format:

1. posterPrompt: A detailed, creative prompt for an Instagram poster design. Include:
   - Visual style and mood (modern, vibrant, minimalist, etc.)
   - Color palette suggestions
   - Typography style
   - Key visual elements and composition
   - Text hierarchy and placement
   Make it visually striking and Instagram-worthy.

2. caption: An engaging Instagram caption that:
   - Starts with a hook that grabs attention
   - Uses 3-5 relevant emojis naturally (not excessive)
   - Includes 2-3 lines of compelling copy
   - Ends with a clear call-to-action
   - Adds 5-8 relevant hashtags (mix of popular and niche)
   - Feels authentic and conversational, not corporate
   - Uses line breaks for readability

3. emailInvite: A professional HTML email invitation with:
   - Clean, modern design with inline CSS
   - White background with professional color accents
   - Responsive layout (max-width: 600px)
   - Eye-catching header with event name (use gradient or solid color background)
   - Brief introduction paragraph with proper spacing
   - Key event details in a clean format (Date, Time, Venue as placeholders)
   - Benefits/highlights in bullet points or cards
   - Prominent CTA button with hover effect
   - Footer with contact info placeholders
   - Professional typography (system fonts: Arial, Helvetica, sans-serif)
   - Proper padding and margins for readability
   - Use tables for email compatibility
   - Clean, minimal design - avoid clutter

4. whatsappMessage: A concise WhatsApp broadcast (2-3 lines) that:
   - Opens with an attention-grabbing emoji
   - Delivers key info quickly
   - Creates urgency or excitement
   - Includes a clear next step
   - Feels personal and conversational
   - Uses 1-2 emojis maximum

5. landingPageHTML: A complete, modern landing page with:
   - Full HTML5 structure with inline CSS
   - Hero section with gradient background
   - Event highlights/features section
   - About section
   - Registration/CTA section
   - Footer
   - Responsive design
   - Modern aesthetics (gradients, shadows, animations)
   - Professional typography
   - Mobile-optimized

IMPORTANT: Return ONLY valid JSON with these exact keys: posterPrompt, caption, emailInvite, whatsappMessage, landingPageHTML. Make the content creative, authentic, and tailored to the event theme.`;

    console.log('Starting Groq API call...');
    
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: 'You are an expert marketing copywriter and designer specializing in college events, Gen-Z communication, and viral social media content. You understand what makes content engaging, shareable, and conversion-focused. Return only valid JSON with no additional text, markdown formatting, or code blocks.',
        },
        { role: 'user', content: prompt },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.9,
      max_tokens: 4500,
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
