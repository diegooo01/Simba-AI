
# Model Card: Asistente de Apoyo Emocional Simba

## Detalles del Modelo

*   **Desarrollado por**: Un modelo de lenguaje grande (LLM) de Google, implementado dentro de una aplicación web Next.js.
*   **Nombre/Tipo de Modelo**: El sistema utiliza el modelo `googleai/gemini-2.0-flash` de Google a través del framework Genkit.
*   **Arquitectura**: El sistema no es un modelo afinado (fine-tuned) de forma tradicional sobre un dataset. En su lugar, es un sistema basado en **ingeniería de prompts con dos pasos**:
    1.  **Paso de Análisis**: Un primer flujo (`analyzeUserEmotion`) analiza el mensaje del usuario para clasificar la emoción principal (ej. "Tristeza", "Ansiedad"), su intensidad (0-1) y detectar si contiene alertas críticas.
    2.  **Paso de Generación**: Un segundo flujo (`provideEmotionalSupport`) toma el mensaje original y el análisis de emoción del primer paso para generar una respuesta empática y contextual, siguiendo un conjunto de directrices específicas para cada emoción.
*   **Versión**: 1.0 (Julio 2024).

## Uso Previsto

*   **Propósito Principal**: Servir como una herramienta de primer contacto para apoyo emocional. Está diseñado para ofrecer un espacio seguro y sin juicios donde los usuarios puedan expresar sus sentimientos y recibir respuestas empáticas y técnicas de manejo emocional básicas (ej. ejercicios de respiración, grounding).
*   **Audiencia Objetivo**: Individuos que buscan un apoyo emocional inmediato y de baja intensidad, particularmente en el contexto de la comunidad de la Universidad de los Andes.
*   **Casos de Uso No Previstos (Out-of-Scope)**:
    *   **No es un sustituto de terapia profesional**: Simba no es un terapeuta, psicólogo o profesional de la salud mental. No puede diagnosticar condiciones ni ofrecer tratamiento a largo plazo.
    *   **No es un servicio de emergencia**: Aunque puede detectar alertas críticas y redirigir a líneas de ayuda, no debe ser utilizado como un servicio de crisis primario.
    *   **No está diseñado para conversaciones generales**: El modelo está optimizado para responder a entradas emocionales. Preguntas sobre temas no relacionados (ej. "¿Cuál es la capital de Mongolia?") pueden no producir respuestas coherentes.

## Factores

*   **Lenguaje**: El modelo está diseñado y probado principalmente para el **español**, específicamente con modismos y expresiones comunes en Colombia. El rendimiento puede variar con otros idiomas o dialectos.
*   **Complejidad del Input**: El rendimiento depende de la claridad con la que el usuario expresa sus emociones. Mensajes muy ambiguos, sarcásticos o con múltiples emociones contradictorias pueden ser difíciles de interpretar correctamente.
*   **Factores Culturales**: Las expresiones emocionales pueden variar culturalmente. El modelo está guiado por un entendimiento general de las emociones, pero puede no capturar todos los matices culturales.

## Métricas

A diferencia de los modelos de clasificación tradicionales, la evaluación de Simba es más cualitativa y se basa en la calidad de la interacción.

*   **Tasa de Detección de Alertas Críticas (Cualitativa)**: Se evalúa la capacidad del modelo para identificar correctamente menciones de autolesión, suicidio u otras crisis (`isCritical = true`) y activar el protocolo de redirección. La métrica clave es minimizar los **Falsos Negativos** (no detectar una crisis real).
*   **Coherencia de la Respuesta Emocional**: Se evalúa si la respuesta generada por el asistente se alinea con la emoción detectada. Por ejemplo, si se detecta "Ansiedad", la respuesta debe incluir técnicas de calma y no, por ejemplo, sugerencias para la "Tristeza".
*   **Adherencia a las Directrices**: Se verifica que las respuestas sigan las pautas definidas en el prompt (ej. validar la emoción, no juzgar, sugerir técnicas apropiadas).

## Datos de Entrenamiento y Evaluación

*   **Datos de Entrenamiento**: El modelo base de Gemini fue pre-entrenado por Google con un corpus masivo y diverso de texto y código. No se ha realizado un "fine-tuning" adicional para Simba con datos de conversaciones de usuarios.
*   **Datos de "Evaluación" (Guiado por Prompt)**: El comportamiento del modelo es guiado en tiempo real por el contenido de los prompts en `src/ai/flows/`. Estos prompts incluyen ejemplos y directrices claras sobre cómo actuar en cada escenario emocional, sirviendo como una forma de "entrenamiento en contexto" (in-context learning).

## Consideraciones Éticas

*   **Privacidad del Usuario**: La aplicación no almacena el historial de conversaciones en una base de datos. La interacción es efímera. Las variables de entorno para la API Key deben ser gestionadas de forma segura y no expuestas en el cliente.
*   **Manejo de Datos Sensibles**: Las conversaciones, aunque no se almacenan, son procesadas por la API de Google. Es fundamental que los usuarios comprendan esto. La aplicación está diseñada para no solicitar información de identificación personal.
*   **Sesgos Potenciales**: Como con cualquier LLM, el modelo puede tener sesgos inherentes de sus datos de entrenamiento. Se ha intentado mitigar esto con directrices de respuesta muy específicas y neutrales, pero el riesgo de generar una respuesta inadecuada o sesgada, aunque bajo, existe.
*   **Transparencia**: La aplicación debe ser clara en que el usuario está interactuando con una IA y no con un humano. El mensaje de bienvenida de Simba establece esta expectativa.

## Advertencias y Recomendaciones

*   **No es infalible**: El análisis de emociones es subjetivo y complejo. El modelo puede malinterpretar el tono del usuario.
*   **Riesgo de Dependencia**: Existe un riesgo potencial de que los usuarios puedan desarrollar una dependencia emocional de la IA. La aplicación busca mitigar esto redirigiendo proactivamente a recursos humanos profesionales.
*   **Recomendación de Supervisión Humana**: Para una implementación en un entorno clínico real, sería crucial que los resúmenes de interacción (como los de la página de "Reportes") fueran revisados periódicamente por un profesional de la salud mental para garantizar la seguridad y la calidad del servicio.
