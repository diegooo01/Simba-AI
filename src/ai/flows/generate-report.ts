
'use server';

/**
 * @fileOverview A flow to generate a detailed report from a conversation history.
 * 
 * - generateReport - A function that analyzes a conversation and produces a structured report.
 * - GenerateReportInput - The input type for the generateReport function.
 * - GenerateReportOutput - The return type for the generateReport function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const MessageSchema = z.object({
  id: z.string(),
  role: z.enum(['user', 'assistant']),
  content: z.string(),
  isCareMessage: z.optional(z.boolean()),
});
export type Message = z.infer<typeof MessageSchema>;

const GenerateReportInputSchema = z.object({
  messages: z.array(MessageSchema).describe("The full list of messages in the conversation, in chronological order."),
  language: z.string().describe("The language for the report's content (e.g., 'es', 'en')."),
});
export type GenerateReportInput = z.infer<typeof GenerateReportInputSchema>;

const GenerateReportOutputSchema = z.object({
  generalInfo: z.object({
    startTime: z.string().describe("The start date and time of the conversation, extracted from the ID of the first message. Example: 'July 26, 2024, 10:00 AM'"),
    totalDuration: z.string().describe("The total duration of the conversation. Example: '25 minutes'"),
    initialContext: z.string().describe("A brief summary of the user's reason for contacting, based on their first couple of messages."),
    initialEmotions: z.array(z.string()).describe("A list of emotions detected in the user's initial messages."),
  }),
  emotionAnalysis: z.array(z.object({
    emotionType: z.string().describe("The type of emotion detected (e.g., 'Tristeza', 'Ansiedad')."),
    keywords: z.array(z.string()).describe("A list of keywords from the user that indicated this emotion."),
    intensity: z.enum(['Baja', 'Moderada', 'Alta', 'No determinado']).describe("The intensity of the emotion."),
    appliedTechniques: z.array(z.string()).describe("A list of intervention techniques or suggestions offered by the assistant for this emotion."),
  })).describe("An analysis of the primary and secondary emotions detected during the conversation. If no clear emotion is detected, this can be an empty array or have a single entry with 'No determinado' values."),
  summary: z.object({
    conversationFlow: z.string().describe("A summary of how the conversation evolved, from the user's initial state to the resolution or end of the chat."),
    endEmotion: z.string().describe("The user's emotional state at the end of the conversation, or 'Inconcluso' if the user stopped responding."),
    finalRecommendations: z.array(z.string()).describe("A list of final recommendations given by the assistant."),
    actionTaken: z.string().describe("A summary of the final action taken, e.g., 'No se requirió escalamiento a líneas de emergencia.' or 'Usuario redirigido a canales de ayuda.'."),
  }),
});
export type GenerateReportOutput = z.infer<typeof GenerateReportOutputSchema>;


export async function generateReport(input: GenerateReportInput): Promise<GenerateReportOutput> {
  return generateReportFlow(input);
}


const generateReportPrompt = ai.definePrompt({
    name: 'generateReportPrompt',
    input: { schema: GenerateReportInputSchema },
    output: { schema: GenerateReportOutputSchema },
    prompt: `
      You are a highly skilled psychologist AI tasked with analyzing a chat conversation to generate a detailed "Interaction Report".
      Analyze the provided message history between a user and an emotional support assistant named Simba.
      Your goal is to fill out the JSON schema with a thorough and objective analysis.
      
      **IMPORTANT**: The entire report, including all fields and summaries, MUST be generated in the requested language: {{language}}.

      **Conversation Rules to Consider:**
      - The 'id' of each message is a timestamp. Use it to determine start/end times and duration.
      - The conversation starts with an assistant message. The user's first message is the true start of the interaction.
      - If the conversation is very short or the user stops responding, reflect this in the report. Use "No determinado" or "Inconcluso" (or their equivalents in {{language}}) where appropriate. Do not invent information.

      **Analysis Guidelines (in {{language}}):**

      1.  **General Information**:
          - \`startTime\`: Infer from the timestamp of the first *user* message.
          - \`totalDuration\`: Calculate the difference between the first and last message timestamps.
          - \`initialContext\`: Summarize the user's first one or two messages to capture their initial problem.
          - \`initialEmotions\`: List the emotions evident in the user's first message.

      2.  **Emotion Analysis**:
          - Identify the main emotions expressed by the user throughout the chat. There might be one primary emotion and one or two secondary ones.
          - For each emotion, identify the keywords or phrases the user typed.
          - Assess the intensity (Baja, Moderada, Alta).
          - List the specific techniques or advice the assistant provided in response to that emotion (e.g., "Ejercicio de respiración 4-7-8", "Sugerencia de escritura expresiva").

      3.  **Summary**:
          - \`conversationFlow\`: Write a narrative describing the conversation's progression. How did it start? What were the key turning points? How did the assistant intervene?
          - \`endEmotion\`: What was the user's apparent emotional state in their last message? If they just stopped, state that it was inconclusive.
          - \`finalRecommendations\`: List the final pieces of advice Simba gave.
          - \`actionTaken\`: Note whether the conversation was escalated or remained at a supportive level.

      **Conversation to Analyze:**
      \`\`\`json
      {{{json messages}}}
      \`\`\`
    `,
});

const generateReportFlow = ai.defineFlow(
  {
    name: 'generateReportFlow',
    inputSchema: GenerateReportInputSchema,
    outputSchema: GenerateReportOutputSchema,
  },
  async (input) => {

    // Filter out the initial welcome message from the assistant if it exists
    const userStartedConversation = input.messages.slice(1);
    
    // Handle case with no user messages
    if (userStartedConversation.length === 0) {
        const startTime = new Date(parseInt(input.messages[0].id)).toLocaleString(input.language);
        return {
            generalInfo: {
                startTime: startTime,
                totalDuration: "0 minutos",
                initialContext: "El usuario no interactuó.",
                initialEmotions: [],
            },
            emotionAnalysis: [],
            summary: {
                conversationFlow: "El usuario abrió el chat pero no envió ningún mensaje.",
                endEmotion: "No iniciado",
                finalRecommendations: [],
                actionTaken: "No se requirió ninguna acción.",
            },
        };
    }
    
    const { output } = await generateReportPrompt({ messages: userStartedConversation, language: input.language });
    if (!output) {
      throw new Error("AI failed to generate a report.");
    }
    return output;
  }
);
