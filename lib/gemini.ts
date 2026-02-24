import { GoogleGenAI } from '@google/genai';

const gemini = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

export default gemini;

// Model to use for text generation
export const GEMINI_TEXT_MODEL = 'gemini-2.0-flash';
