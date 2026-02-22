export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { topic, platform, frequency, extras, userId } = body;

    // Lazy-load heavy deps to avoid build-time issues on Vercel.
    const [{ openai }, { checkAndIncrementUsage }, { saveHistory }] =
      await Promise.all([
        import("@/lib/openai"),
        import("@/lib/usage"),
        import("@/lib/history"),
      ]);

    const usage = await checkAndIncrementUsage({
      uid: userId,
      feature: "calendario",
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

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY no configurada en el servidor." },
        { status: 500 }
      );
    }

    const prompt = `Genera un calendario de ${frequency} sobre "${topic}".
Plataforma: ${platform}.
Extras: ${extras || "sin extras"}.

Reglas:
- Devuelve 5 ideas numeradas con formato y objetivo (CTR, retencion, conversion).
- Incluye gancho corto por idea.
- Espanol neutro latino.
- Responde solo en JSON: { "ideas": ["...", "..."] }`;

    const response = await openai.responses.create({
      model: "gpt-4o-mini",
      input: [
        {
          role: "system",
          content:
            "Eres un estratega de contenidos que construye calendarios virales.",
        },
        { role: "user", content: prompt },
      ],
      response_format: { type: "json_object" },
      temperature: 0.65,
    });

    const parsed = JSON.parse(response.output_text);
    const ideas = Array.isArray(parsed?.ideas) ? parsed.ideas : [];

    await saveHistory({
      uid: userId,
      type: "calendario",
      input: { topic, platform, frequency, extras },
      output: ideas,
    });

    return NextResponse.json({ ideas, remaining: usage.remaining });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "No se pudo generar el calendario." },
      { status: 500 }
    );
  }
}
