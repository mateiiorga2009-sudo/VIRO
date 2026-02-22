export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";
import { checkAndIncrementUsage } from "@/lib/usage";
import { saveHistory } from "@/lib/history";

export async function POST(request) {
  try {
    const body = await request.json();
    const { topic, tone, extras, userId } = body;
    const duration = "12 segundos";

    const usage = await checkAndIncrementUsage({
      uid: userId,
      feature: "intros",
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

    const prompt = `Genera 4 intros de ${duration} sobre "${topic}".
Tono: ${tone}.
Extras: ${extras || "sin extras"}.

Reglas:
- Hook inmediato en la primera frase.
- Una sola idea por intro.
- Espanol neutro latino, listo para grabar.
- Responde solo en JSON: { "intros": ["...", "..."] }`;

    const response = await openai.responses.create({
      model: "gpt-4o-mini",
      input: [
        {
          role: "system",
          content:
            "Eres un guionista experto en retencion para videos cortos.",
        },
        { role: "user", content: prompt },
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    const parsed = JSON.parse(response.output_text);
    const intros = Array.isArray(parsed?.intros) ? parsed.intros : [];

    await saveHistory({
      uid: userId,
      type: "intros",
      input: { topic, tone, duration, extras },
      output: intros,
    });

    return NextResponse.json({ intros, remaining: usage.remaining });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "No se pudo generar las intros." },
      { status: 500 }
    );
  }
}
