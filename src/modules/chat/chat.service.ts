import Groq from "groq-sdk";
import { AppError } from "../../lib/errors.ts";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const SYSTEM_PROMPT = (language: string, level: string) => {
  const showTranslation = level === "BEGINNER" || level === "BASIC";

  return `
You are FluentAI, a friendly and encouraging language tutor helping a Brazilian Portuguese speaker learn ${language}.
The student's current level is ${level}.

Your rules:
- Always respond in ${language} (the language being learned)
- Keep responses appropriate for a ${level} level student
- If the student writes in Portuguese, gently respond in ${language} and encourage them to try in ${language}
- Correct grammar mistakes kindly, always showing the correct form
- Be encouraging, patient and motivating
- Keep responses concise and conversational
- If asked something unrelated to language learning, redirect the conversation back to practicing ${language}
- Adapt your vocabulary and sentence complexity to the student's level
${
  showTranslation
    ? `
IMPORTANT: You must respond ONLY with a valid JSON object in this exact format, no other text:
{"message": "your response in ${language}", "translation": "the same response translated to Brazilian Portuguese"}
`
    : ""
}
`;
};

const LANGUAGE_NAMES: Record<string, string> = {
  en: "English",
  es: "Spanish",
  fr: "French",
  de: "German",
  it: "Italian",
  jp: "Japanese",
  zh: "Chinese",
  pt: "Portuguese",
};

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  translation?: string | null;
}

export const chatService = {
  async sendMessage(messages: ChatMessage[], language: string, level: string) {
    const languageName = LANGUAGE_NAMES[language] ?? language;
    const showTranslation = level === "BEGINNER" || level === "BASIC";

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: SYSTEM_PROMPT(languageName, level) },
        ...messages,
      ],
      temperature: 0.7,
      max_tokens: 1024,
    });

    const raw = completion.choices[0]?.message?.content ?? "";

    if (showTranslation) {
      try {
        const parsed = JSON.parse(raw);
        return {
          message: parsed.message ?? raw,
          translation: parsed.translation ?? null,
        };
      } catch {
        return { message: raw, translation: null };
      }
    }

    return { message: raw, translation: null };
  },

  async transcribe(audioBuffer: Buffer, mimeType: string) {
    const blob = new Blob([audioBuffer as unknown as ArrayBuffer], {
      type: mimeType,
    });

    const file = new File([blob], "audio.webm", { type: mimeType });

    const transcription = await groq.audio.transcriptions.create({
      file,
      model: "whisper-large-v3",
      response_format: "text",
    });

    return { text: transcription };
  },

  async textToSpeech(text: string) {
    if (!text?.trim()) {
      throw new AppError(
        "O texto para conversão em fala (TTS) não pode estar vazio.",
      );
    }

    const response = await groq.audio.speech.create({
      model: "canopylabs/orpheus-v1-english",
      input: text,
      voice: "autumn",
      response_format: "wav",
    });

    const buffer = Buffer.from(await response.arrayBuffer());
    return buffer;
  },
};
