export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";
import { checkAndIncrementUsage } from "@/lib/usage";
import { saveHistory } from "@/lib/history";

export async function POST(request) {
  try {
    const body = await request.json();
    const { topic, audience, platform, tone, extras, userId } = body;

    const usage = await checkAndIncrementUsage({
      uid: userId,
      feature: "titulos",
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

    const prompt = `Genera 5 titulos ultra-CTR para ${platform} sobre: "${topic}".
Audiencia: ${audience}.
Tono: ${tone}.
Extras: ${extras || "sin extras"}.

Reglas:
- Cada titulo debe ser corto, claro y provocar curiosidad.
- Usa promesa + especificidad + gancho emocional.
- No uses comillas ni emojis.
- En español neutro latino.
- Devuelve JSON exacto con { "titles": ["...", "..."] }`;

    const response = await openai.responses.create({
      model: "gpt-4o-mini",
      input: [
        {
          role: "system",
          content:
            "Eres un estratega viral experto en YouTube y TikTok. Optimizas CTR sin clickbait vacio.",
        },
        { role: "user", content: prompt },
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    const text = response.output_text;
    const parsed = JSON.parse(text);
    const titles = Array.isArray(parsed?.titles) ? parsed.titles : [];

    await saveHistory({
      uid: userId,
      type: "titulos",
      input: { topic, audience, platform, tone, extras },
      output: titles,
    });

    return NextResponse.json({ titles, remaining: usage.remaining });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "No se pudo generar los titulos." },
      { status: 500 }
    );
  }
}
