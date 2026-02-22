import OpenAI from 'openai';

// OpenRouter is OpenAI-API-compatible, so we reuse the openai SDK
const openrouter = new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: process.env.OPENROUTER_API_KEY,
    defaultHeaders: {
        'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001',
        'X-Title': 'GenCampus OS',
    },
});

export default openrouter;

// Best models on OpenRouter for structured text generation
export const TEXT_MODEL = 'google/gemini-2.0-flash-001';       // Fast, cheap, great JSON
export const RICH_MODEL = 'google/gemini-2.5-pro-exp-03-25';  // Best quality (free tier)
