import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  console.warn("OPENAI_API_KEY no esta definida en .env.local");
}

export const openai = new OpenAI({ apiKey });
