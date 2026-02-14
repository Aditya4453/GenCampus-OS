import { NextResponse } from 'next/server';
import groq from '@/lib/groq';

export async function GET() {
  try {
    console.log('Testing Groq API...');
    console.log('API Key exists:', !!process.env.GROQ_API_KEY);
    console.log('API Key starts with:', process.env.GROQ_API_KEY?.substring(0, 10));
    
    const completion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [
        {
          role: 'user',
          content: 'Say "Hello, Groq is working!" in JSON format with a key "message"',
        },
      ],
      response_format: { type: 'json_object' },
      max_tokens: 100,
    });

    return NextResponse.json({
      success: true,
      response: completion.choices[0].message.content,
    });
  } catch (error: any) {
    console.error('Groq test error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        details: error.response?.data || error.toString(),
      },
      { status: 500 }
    );
  }
}
