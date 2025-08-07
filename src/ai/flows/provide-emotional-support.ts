'use server';

/**
 * @fileOverview This file implements the Genkit flow for providing emotional support based on user message analysis.
 *
 * - provideEmotionalSupport - A function that provides emotional support based on the emotional tone of user messages.
 * - EmotionalSupportInput - The input type for the provideEmotionalSupport function.
 * - EmotionalSupportOutput - The return type for the provideEmotionalSupport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { analyzeUserEmotion } from './analyze-user-emotion';

const EmotionalSupportInputSchema = z.object({
  message: z.string().describe('The user message to analyze for emotional tone.'),
});
export type EmotionalSupportInput = z.infer<typeof EmotionalSupportInputSchema>;

const EmotionalSupportOutputSchema = z.object({
  response: z.string().describe('The emotionally supportive response from the assistant.'),
  redirectToCareLine: z.boolean().describe('Indicates whether the user should be redirected to a specialized care line.'),
});
export type EmotionalSupportOutput = z.infer<typeof EmotionalSupportOutputSchema>;

export async function provideEmotionalSupport(input: EmotionalSupportInput): Promise<EmotionalSupportOutput> {
  return provideEmotionalSupportFlow(input);
}

const analyzeEmotionTool = ai.defineTool({
  name: 'analyzeEmotion',
  description: 'Analyzes the emotional tone of a given text and returns the predominant emotion and its intensity.',
  inputSchema: z.object({
    text: z.string().describe('The text to analyze.'),
  }),
  outputSchema: z.object({
    emotion: z.string().describe('The predominant emotion detected in the text (e.g., joy, sadness, anger).'),
    intensity: z.number().describe('The intensity of the emotion from 0 to 1.')
  }),
}, async (input) => {
    return await analyzeUserEmotion({ message: input.text });
});

const prompt = ai.definePrompt({
  name: 'emotionalSupportPrompt',
  tools: [analyzeEmotionTool],
  input: {schema: EmotionalSupportInputSchema},
  output: {schema: EmotionalSupportOutputSchema},
  prompt: `Eres un asistente de IA de apoyo emocional llamado Simba. Tu objetivo es proporcionar respuestas útiles y empáticas a los usuarios en función de su estado emocional. Responde siempre en español.

Tienes acceso a una herramienta llamada 'analyzeEmotion' que puede analizar el tono emocional del mensaje del usuario.

Basado en la emoción y el mensaje del usuario, proporciona una respuesta apropiada. Si el usuario expresa una angustia extrema o menciona pensamientos de autolesión, establece redirectToCareLine en true y sugiere que se comunique con una línea de crisis. De lo contrario, establece redirectToCareLine en false.

Mensaje del usuario: {{{message}}}
`,
  config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_ONLY_HIGH',
      },
    ],
  },
});

const provideEmotionalSupportFlow = ai.defineFlow(
  {
    name: 'provideEmotionalSupportFlow',
    inputSchema: EmotionalSupportInputSchema,
    outputSchema: EmotionalSupportOutputSchema,
  },
  async input => {
    const emotionAnalysis = await analyzeUserEmotion({ message: input.message });
    const {output} = await prompt(input);

    if (output) {
      if (input.message.toLowerCase().includes('suicidio') || input.message.toLowerCase().includes('autolesión') || (emotionAnalysis.emotion === 'sadness' && emotionAnalysis.intensity > 0.8)) {
        output.redirectToCareLine = true;
      }
      return output;
    }
    return {
      response: 'Estoy aquí para apoyarte. Por favor, cuéntame más sobre lo que estás pasando.',
      redirectToCareLine: false,
    };
  }
);
