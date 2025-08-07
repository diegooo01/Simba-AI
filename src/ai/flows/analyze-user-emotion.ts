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
  emotion: z.enum([
    "Tristeza",
    "Ira/Frustración",
    "Ansiedad/Miedo",
    "Culpa/Vergüenza",
    "Soledad/Vacío",
    "Alegría/Gratitud",
    "Confusión/Agobio/Saturación",
    "Apatía/Desmotivación",
    "Neutral"
  ]).describe('The primary emotion detected in the user message.'),
  intensity: z
    .number()
    .describe('The intensity of the detected emotion on a scale from 0 to 1.'),
  isCritical: z.boolean().describe('Whether the user message contains critical alert signals like suicide or self-harm mentions.'),
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
The possible emotions are: "Tristeza", "Ira/Frustración", "Ansiedad/Miedo", "Culpa/Vergüenza", "Soledad/Vacío", "Alegría/Gratitud", "Confusión/Agobio/Saturación", "Apatía/Desmotivación", "Neutral".
Intensity should be a number between 0 and 1, representing the strength of the emotion.
If there are mentions of suicide, self-harm, death ("quiero desaparecer", "no vale la pena seguir"), loss of contact with reality, threats to third parties, extreme and frequent anxiety/panic crises, total isolation, chronic insomnia, or no food intake, set isCritical to true. Otherwise, set it to false.

Message: {{{message}}}
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
