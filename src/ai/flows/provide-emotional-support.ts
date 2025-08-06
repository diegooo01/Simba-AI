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
  description: 'Analyzes the emotional tone of a given text and returns the predominant emotion.',
  inputSchema: z.object({
    text: z.string().describe('The text to analyze.'),
  }),
  outputSchema: z.string().describe('The predominant emotion detected in the text (e.g., joy, sadness, anger).'),
}, async (input) => {
  // Placeholder implementation for emotion analysis.  Replace with actual emotion analysis logic.
  // This could involve calling an external sentiment analysis API or using a pre-trained model.
  // For now, it simply returns a generic emotion based on keywords.
  if (input.text.toLowerCase().includes('sad') || input.text.toLowerCase().includes('depressed')) {
    return 'sadness';
  } else if (input.text.toLowerCase().includes('angry') || input.text.toLowerCase().includes('frustrated')) {
    return 'anger';
  } else {
    return 'neutral';
  }
});

const prompt = ai.definePrompt({
  name: 'emotionalSupportPrompt',
  tools: [analyzeEmotionTool],
  input: {schema: EmotionalSupportInputSchema},
  output: {schema: EmotionalSupportOutputSchema},
  prompt: `You are an AI emotional support assistant named Simba.  Your goal is to provide helpful and empathetic responses to users based on their emotional state.

You have access to a tool called 'analyzeEmotion' which can analyze the emotional tone of the user's message.

Based on the emotion and the user's message, provide an appropriate response. If the user expresses extreme distress or mentions thoughts of self-harm, set redirectToCareLine to true and suggest they contact a crisis hotline.  Otherwise, set redirectToCareLine to false.

User Message: {{{message}}}
Emotion: {{await tools.analyzeEmotion.text=message}}

Response:`, //Crucially, here
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
    const {output} = await prompt(input);
    if (output) {
      if (input.message.toLowerCase().includes('suicide') || input.message.toLowerCase().includes('self-harm')) {
        output.redirectToCareLine = true;
      }
      return output;
    }
    return {
      response: 'I am here to support you. Please tell me more about what you are going through.',
      redirectToCareLine: false,
    };
  }
);
