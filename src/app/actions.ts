
'use server';

import { provideEmotionalSupport } from '@/ai/flows/provide-emotional-support';
import { textToSpeech } from '@/ai/flows/text-to-speech';

export async function getSimbaResponse(message: string) {
  try {
    const response = await provideEmotionalSupport({ message });
    if (!response) {
      throw new Error('No response from AI');
    }
    return response;
  } catch (error) {
    console.error("Error getting Simba's response:", error);
    throw new Error('Failed to get a response from the AI assistant.');
  }
}

export async function getSimbaAudioResponse(text: string) {
    try {
        const response = await textToSpeech({ text });
        if(!response) {
            throw new Error('No audio response from AI');
        }
        return response;
    } catch(error) {
        console.error("Error getting Simba's audio response:", error);
        throw new Error('Failed to get an audio response from the AI assistant.');
    }
}
