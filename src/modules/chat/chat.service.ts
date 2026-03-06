import Groq from "groq-sdk";
import { AppError } from "../../lib/errors.ts";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const SYSTEM_PROMPT = (language: string, level: string) => {
  const isBeginner = level === "BEGINNER" || level === "BASIC";

  return `
You are FluentAI, a professional language tutor. 
IMPORTANT: Your student is a NATIVE BRAZILIAN PORTUGUESE SPEAKER. Never assume they speak Spanish.
Goal: Help the student learn ${language} (Current level: ${level}).

Rules:
1. Always respond in ${language}.
2. If the student writes in Portuguese, respond in ${language} and kindly encourage them to practice.
3. Correct grammar mistakes in ${language} naturally within the conversation.
4. Keep vocabulary appropriate for a ${level} level.
${
  isBeginner
    ? `
5. MANDATORY: You must respond ONLY with a valid JSON object. No text before or after the JSON.
Format: {"message": "your response in ${language}", "translation": "the translation to Brazilian Portuguese"}`
    : "5. Respond with plain text only (no JSON)."
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
    const isBeginner = level === "BEGINNER" || level === "BASIC";

    const cleanMessages = messages.map((message) => ({
      role: message.role,
      content: message.content,
    }));

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: SYSTEM_PROMPT(languageName, level) },
        ...cleanMessages,
      ],
      response_format: isBeginner ? { type: "json_object" } : undefined,
      temperature: 0.5,
      max_tokens: 1024,
    });

    const raw = completion.choices[0]?.message?.content ?? "";

    if (isBeginner) {
      try {
        const parsed = JSON.parse(raw);
        return {
          message: parsed.message || raw,
          translation: parsed.translation || null,
        };
      } catch (err) {
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
