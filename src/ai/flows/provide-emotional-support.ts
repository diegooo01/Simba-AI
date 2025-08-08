'use server';

/**
 * @fileOverview This file implements the Genkit flow for providing emotional support based on user message analysis.
 *
 * - provideEmotionalSupport - A function that provides emotional support based on the emotional tone of user messages.
 * - EmotionalSupportInput - The input type for the provideEmotionalsupport function.
 * - EmotionalSupportOutput - The return type for the provideEmotionalSupport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { analyzeUserEmotion, type AnalyzeUserEmotionOutput } from './analyze-user-emotion';


const EmotionalSupportInputSchema = z.object({
  message: z.string().describe('The user message to analyze for emotional tone.'),
  language: z.string().describe("The language for the assistant's response (e.g., 'Español', 'English')."),
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

const emotionSupportPrompt = ai.definePrompt({
    name: 'emotionSupportPrompt',
    input: {
      schema: z.object({
        message: z.string(),
        language: z.string(),
        emotionAnalysis: z.object({
          emotion: z.enum([
            "Tristeza",
            "Ira/Frustración",
            "Ansiedad/Miedo",
            "Culpa/Vergüenza",
            "Soledad/Vacío",
            "Alegría/Gratitud",
            "Confusión/Agobio/Saturación",
            "Apatía/Desmotivación",
            "Tema no relacionado",
            "Neutral"
          ]),
          intensity: z.number(),
          isCritical: z.boolean(),
        }),
      }),
    },
    output: {schema: EmotionalSupportOutputSchema},
    prompt: `Eres un asistente de IA de apoyo emocional llamado Simba. Tu objetivo es proporcionar respuestas empáticas, calmadas y sin juicios a los usuarios en función de su estado emocional. 
Responde SIEMPRE en el idioma solicitado: {{language}}.

El análisis del mensaje del usuario es:
- Emoción: {{emotionAnalysis.emotion}}
- Intensidad: {{emotionAnalysis.intensity}}
- Es crítico: {{emotionAnalysis.isCritical}}

Basado en este análisis y en el mensaje original del usuario, proporciona una respuesta apropiada en {{language}} siguiendo estas pautas:

*** PAUTAS GENERALES DE RESPUESTA ***
- Tono: Empático, calmado y sin juicios.
- Evita respuestas genéricas tipo “todo estará bien”.
- Refuerza que está bien pedir ayuda.
- Herramientas rápidas a sugerir (si aplica): Respiración 4-7-8, Grounding 5-4-3-2-1, Lista de gratitud, Escritura expresiva, Visualización positiva, Pausa activa o técnica Pomodoro.
- Recomendaciones generales (si aplica): Mantener rutinas básicas, evitar autoexigencia extrema, buscar contacto humano seguro.

*** COMPORTAMIENTO POR EMOCIÓN ***

- **Tristeza**: Valida la emoción (“Siento que estás pasando por un momento difícil...”). Sugiere actividades reconfortantes (escribir, película, música). Ofrece un ejercicio breve como respiración profunda.
- **Ira/Frustración**: Valida sin juzgar (“Parece que estás muy frustrado...”). Sugiere técnicas de descompresión (respirar, caminar, escribir). Ayuda a reencuadrar: ¿qué parte puedes controlar?
- **Ansiedad/Miedo**: Normaliza (“Muchas personas sienten ansiedad...”). Guía un ejercicio de respiración (5-5-5) o la técnica de “anclaje” (grounding). Recomienda evitar cafeína y moverse un poco.
- **Culpa/Vergüenza**: Valida sin reforzar (“Parece que estás siendo muy duro contigo mismo.”). Sugiere un ejercicio de autocompasión. Ayuda a cambiar el lenguaje interno.
- **Soledad/Vacío**: Reconoce la necesidad de conexión. Sugiere contacto social o actividades que generen conexión indirecta.
- **Alegría/Gratitud**: Refuerza y celebra (“¡Qué bueno leer eso!”). Sugiere registrar la gratitud o compartir el momento.
- **Confusión/Agobio/Saturación**: Ayuda a priorizar (“Vamos paso a paso.”). Sugiere listas, dividir tareas, técnica Pomodoro.
- **Apatía/Desmotivación**: Explora causas. Sugiere microacciones y metas muy pequeñas.

*** MANEJO DE TEMAS NO RELACIONADOS ***
- **Si la emoción es "Tema no relacionado"**: Debes responder de forma amable pero firme que tu propósito es el apoyo emocional, no responder preguntas de conocimiento general. Tu respuesta debe ser algo como: "Mi propósito es ser un compañero de apoyo emocional, por lo que no puedo responder preguntas sobre temas generales. ¿Necesitas ayuda en alguna otra cosa?". Usa el idioma solicitado ({{language}}).

*** ESCALAMIENTO ***
- **Si la situación es crítica (emotionAnalysis.isCritical es true)**: Tu respuesta debe ser breve, de acompañamiento y en el idioma correcto: "Estoy aquí contigo. No estás solo/a." o su equivalente. Inmediatamente después, establece 'redirectToCareLine' en true para mostrar la información de ayuda urgente. No intentes aconsejar más.

Si la situación no es crítica, establece 'redirectToCareLine' en false.

Mensaje del usuario: {{{message}}}
`,
});


const provideEmotionalSupportFlow = ai.defineFlow(
  {
    name: 'provideEmotionalSupportFlow',
    inputSchema: EmotionalSupportInputSchema,
    outputSchema: EmotionalSupportOutputSchema,
  },
  async (input) => {
    const emotionAnalysis: AnalyzeUserEmotionOutput = await analyzeUserEmotion({ message: input.message });

    if (emotionAnalysis.isCritical) {
      const criticalResponse: Record<string, string> = {
        'es': 'Estoy aquí contigo. No estás solo/a.',
        'en': 'I am here with you. You are not alone.',
        'fr': 'Je suis là avec toi. Tu n\'es pas seul(e).',
        'pt': 'Estou aqui com você. Você não está só.',
        'zh': '我在这里陪着你。你不是一个人。'
      }
      return {
        response: criticalResponse[input.language] || 'I am here with you. You are not alone.',
        redirectToCareLine: true,
      };
    }

    const { output } = await emotionSupportPrompt({
      message: input.message,
      language: input.language,
      emotionAnalysis: emotionAnalysis,
    });

    if (output) {
      return output;
    }

    // Fallback response
    const fallbackResponse: Record<string, string> = {
        'es': 'Estoy aquí para apoyarte. Por favor, cuéntame más sobre lo que estás pasando.',
        'en': 'I am here to support you. Please tell me more about what you are going through.',
        'fr': 'Je suis là pour te soutenir. S\'il te plaît, dis-m\'en plus sur ce que tu traverses.',
        'pt': 'Estou aqui para te apoiar. Por favor, conte-me mais sobre o que você está passando.',
        'zh': '我在这里支持你。请告诉我更多关于你正在经历的事情。'
    }

    return {
      response: fallbackResponse[input.language] || 'I am here to support you. Please tell me more about what you are going through.',
      redirectToCareLine: false,
    };
  }
);
