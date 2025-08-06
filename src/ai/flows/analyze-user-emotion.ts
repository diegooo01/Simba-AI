'use server';

/**
 * @fileOverview A flow to analyze the emotional tone of user messages.
 *
 * - analyzeUserEmotion - A function that analyzes the emotion in a user message.
 * - AnalyzeUserEmotionInput - The input type for the analyzeUserEmotion function.
 * - AnalyzeUserEmotionOutput - The return type for the analyzeUserEmotion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeUserEmotionInputSchema = z.object({
  message: z.string().describe('The user message to analyze.'),
});
export type AnalyzeUserEmotionInput = z.infer<typeof AnalyzeUserEmotionInputSchema>;

const AnalyzeUserEmotionOutputSchema = z.object({
  emotion: z.string().describe('The primary emotion detected in the user message.'),
  intensity: z
    .number()
    .describe('The intensity of the detected emotion on a scale from 0 to 1.'),
});
export type AnalyzeUserEmotionOutput = z.infer<typeof AnalyzeUserEmotionOutputSchema>;

export async function analyzeUserEmotion(input: AnalyzeUserEmotionInput): Promise<AnalyzeUserEmotionOutput> {
  return analyzeUserEmotionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeUserEmotionPrompt',
  input: {schema: AnalyzeUserEmotionInputSchema},
  output: {schema: AnalyzeUserEmotionOutputSchema},
  prompt: `You are an AI assistant designed to analyze the emotional tone of user messages.

  Analyze the following message and determine the primary emotion expressed and its intensity.

  Message: {{{message}}}

  Respond with the emotion and intensity.
  Ensure that the emotion is a simple term, such as joy, sadness, anger, fear, or neutral.
  Intensity should be a number between 0 and 1, representing the strength of the emotion.
  `,
});

const analyzeUserEmotionFlow = ai.defineFlow(
  {
    name: 'analyzeUserEmotionFlow',
    inputSchema: AnalyzeUserEmotionInputSchema,
    outputSchema: AnalyzeUserEmotionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
