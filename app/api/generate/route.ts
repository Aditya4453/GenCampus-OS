import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import openrouter, { TEXT_MODEL } from '@/lib/openrouter';
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

    // Generate marketing content with OpenRouter (Gemini 2.0 Flash)
    const prompt = `You are an elite marketing strategist and creative director specializing in viral college event campaigns. Create a premium, complete marketing kit for this event:

EVENT DETAILS:
- Event Name: ${eventName}
- Theme: ${theme}
- Target Audience: ${audience || 'college students'}
- Tone: ${tone || 'energetic and engaging'}

Generate all content in a single valid JSON object with these exact keys:

---

"posterPrompt": 
A rich, detailed AI image generation prompt for an Instagram poster. Include:
- Art style (e.g. neon noir, retro futurism, bold geometric, cinematic dark)
- Exact color palette with hex codes or descriptors (e.g. "electric purple #7B2FBE, neon cyan #00F5FF, deep black #0A0A0A")
- Typography description (bold sans-serif, glitch text, handwritten accent, etc.)
- Specific visual elements (floating elements, crowd silhouettes, light rays, bokeh, etc.)
- Composition and layout (centered, diagonal tension, rule of thirds)
- Mood/atmosphere (high energy, mysterious, euphoric, etc.)
Make it ultra-detailed so an AI image model can generate a stunning poster.

---

"caption":
A viral Instagram caption. Requirements:
- Opening hook that stops the scroll (1 powerful line)
- 2-3 punchy lines of body copy with genuine Gen-Z voice
- 3-5 well-placed emojis (not at end of every line — use naturally)
- Clear CTA line
- 6-10 hashtags across 2 rows: branded + trending + niche
- Use line breaks between sections for readability
- No corporate language. Sound like a cool campus insider.

---

"emailInvite":
A full professional HTML email. Use this exact structure:
- DOCTYPE + head with responsive meta tags
- Inline CSS only (no <style> blocks for email client compatibility)
- Wrapper table max-width 600px, centered, white background
- Header: full-width gradient banner (match event theme colors) with event name in large white bold text
- Body: warm welcome paragraph, then a 2-column highlights grid (use tables), then a divider
- Details block: Date / Time / Venue (use placeholder values like [DATE], [TIME], [VENUE])
- CTA button: pill-shaped, gradient background, white bold text "Register Now →", centered
- Footer: dark background, college name placeholder, unsubscribe link
- Use system fonts: 'Segoe UI', Arial, sans-serif
- Make it look like a real premium event invite, not a newsletter

---

"whatsappMessage":
A punchy WhatsApp broadcast message:
- Line 1: bold opener with 1 emoji + event name
- Line 2: key detail (date/time placeholder) + hook
- Line 3: CTA with link placeholder [LINK]
- Max 3 lines, conversational, no hashtags, natural tone

---

"landingPageHTML":
A complete single-page HTML landing page. Must include:
- Full HTML5 boilerplate with <head>, Google Fonts import (Inter or Space Grotesk), and embedded <style>
- CSS variables for the event color theme
- Sticky nav bar with event name/logo and "Register" CTA button
- Hero: full-viewport gradient section, large headline, subtitle, animated CTA button (pulse/glow effect)
- "About the Event" section: left text + right decorative element (CSS-only)
- Highlights section: 3-column card grid with icons (use Unicode/emoji icons), hover lift effect
- Schedule/Timeline section: vertical timeline with 3-4 sample entries
- Registration form section: card with Name, Email, College, Year fields + submit button
- Footer: dark background, social icons (Unicode), copyright
- Smooth scroll, subtle CSS animations (fadeInUp keyframes), fully responsive (mobile-first media queries)
- Use the event's theme colors throughout via CSS variables

CRITICAL: Return ONLY raw valid JSON. No markdown, no code fences, no explanation. Just the JSON object.`;

    console.log('Starting OpenRouter API call...');

    const completion = await openrouter.chat.completions.create({
      model: TEXT_MODEL,
      messages: [
        {
          role: 'system',
          content: 'You are an elite marketing strategist, viral content creator, and frontend developer. You produce premium-quality marketing assets for college events. You MUST return only a valid raw JSON object — no markdown, no code blocks, no extra text whatsoever.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 1.0,
      max_tokens: 8000,
      response_format: { type: 'json_object' },
    });

    console.log('OpenRouter API call successful');
    console.log('Model used:', completion.model);
    console.log('Response preview:', completion.choices[0].message.content?.substring(0, 200));

    const rawContent = completion.choices[0].message.content || '{}';
    const content = JSON.parse(rawContent);

    console.log('Generated content keys:', Object.keys(content));

    // Convert posterPrompt to string if it's an object
    let posterPromptString = content.posterPrompt;
    if (typeof posterPromptString === 'object') {
      posterPromptString = JSON.stringify(posterPromptString);
    }

    // Generate AI poster using authenticated Pollinations.ai (sk_ key = no rate limits)
    const pollinationsPrompt = encodeURIComponent(
      typeof content.posterPrompt === 'string'
        ? content.posterPrompt
        : `${eventName} event poster, ${theme} theme, vibrant college event, professional design`
    );
    const pollinationsKey = process.env.POLLINATIONS_API_KEY;
    const posterUrl = `https://image.pollinations.ai/prompt/${pollinationsPrompt}?width=1080&height=1080&nologo=true&model=flux&seed=${Date.now()}${pollinationsKey ? `&key=${pollinationsKey}` : ''}`;

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
