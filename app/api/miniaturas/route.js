import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";
import { checkAndIncrementUsage } from "@/lib/usage";
import { saveHistory } from "@/lib/history";

export async function POST(request) {
  try {
    const body = await request.json();
    const { topic, style, platform, extras, userId } = body;

    const usage = await checkAndIncrementUsage({
      uid: userId,
      feature: "miniaturas",
    });

    if (!usage.allowed) {
      return NextResponse.json(
        {
          error:
            "Limite diario alcanzado. Actualiza a Pro para generaciones ilimitadas.",
        },
        { status: 403 }
      );
    }

    const prompt = `Crea 4 prompts para miniaturas (${platform}) sobre "${topic}".
Estilo: ${style}.
Extras: ${extras || "sin extras"}.

Reglas:
- Deben ser prompts listos para Midjourney o DALL-E.
- Incluye iluminacion, encuadre, colores y expresion.
- Evita texto dentro de la imagen salvo que se solicite.
- Responde solo en JSON: { "prompts": ["...", "..."] }`;

    const response = await openai.responses.create({
      model: "gpt-4o-mini",
      input: [
        {
          role: "system",
          content:
            "Eres un director creativo especialista en miniaturas virales para creadores hispanos.",
        },
        { role: "user", content: prompt },
      ],
      response_format: { type: "json_object" },
      temperature: 0.75,
    });

    const parsed = JSON.parse(response.output_text);
    const prompts = Array.isArray(parsed?.prompts) ? parsed.prompts : [];

    await saveHistory({
      uid: userId,
      type: "miniaturas",
      input: { topic, style, platform, extras },
      output: prompts,
    });

    return NextResponse.json({ prompts, remaining: usage.remaining });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "No se pudo generar los prompts." },
      { status: 500 }
    );
  }
}
