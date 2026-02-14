import { NextResponse } from 'next/server';
import groq from '@/lib/groq';

export async function POST(req: Request) {
  try {
    const { eventName, theme } = await req.json();
    
    console.log('Testing generation for:', eventName, theme);
    
    const prompt = `Generate a complete marketing kit for a college event with these details:
Event Name: ${eventName}
Theme: ${theme}
Target Audience: college students
Tone: energetic and engaging

Provide the following in JSON format:
1. posterPrompt: A detailed prompt for generating an Instagram poster (describe visual style, colors, layout, text placement)
2. caption: An engaging Instagram caption with emojis and hashtags (3-5 lines)
3. emailInvite: A professional email invitation in HTML format with inline CSS (complete HTML structure)
4. whatsappMessage: A concise WhatsApp broadcast message (2-3 lines max)
5. landingPageHTML: A complete, modern, responsive landing page HTML with inline CSS (full HTML document with hero section, features, and CTA)

Return ONLY valid JSON with these exact keys. Make the content creative, engaging, and professional.`;

    console.log('Calling Groq API...');
    
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

    console.log('Groq API call successful!');
    
    const content = JSON.parse(completion.choices[0].message.content || '{}');
    
    console.log('Generated content keys:', Object.keys(content));

    return NextResponse.json({
      success: true,
      content,
      posterUrl: `https://placehold.co/1080x1080/3B82F6/ffffff?text=${encodeURIComponent(eventName)}&font=roboto`,
    });
  } catch (error: any) {
    console.error('Test generation error:', error);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        details: error.toString(),
      },
      { status: 500 }
    );
  }
}
