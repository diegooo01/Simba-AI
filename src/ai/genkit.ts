import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [googleAI({
      // Specify a different API key for TTS models
      // See: https://ai.google.dev/gemini-api/docs/models/gemini-2-5-flash#model_variations
      apiKey: process.env.GEMINI_API_KEY,
      models: {
          'gemini-2.5-flash-preview-tts': {
              apiKey: process.env.GEMINI_API_KEY
          }
      }
  })],
  model: 'googleai/gemini-2.0-flash',
});
