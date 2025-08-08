
'use server';

import { provideEmotionalSupport } from '@/ai/flows/provide-emotional-support';

export async function getSimbaResponse(message: string, language: string) {
  try {
    const response = await provideEmotionalSupport({ message, language });
    if (!response) {
      throw new Error('No response from AI');
    }
    return response;
  } catch (error) {
    console.error("Error getting Simba's response:", error);
    throw new Error('Failed to get a response from the AI assistant.');
  }
}
