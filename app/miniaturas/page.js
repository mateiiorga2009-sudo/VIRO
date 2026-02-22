"use client";

import { useState } from "react";
import AuthPanel from "@/components/AuthPanel";
import CheckoutButton from "@/components/CheckoutButton";
import GeneratorShell from "@/components/GeneratorShell";
import OutputList from "@/components/OutputList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function MiniaturasPage() {
  const [user, setUser] = useState(null);
  const [topic, setTopic] = useState("");
  const [style, setStyle] = useState("cinematico hiperrealista");
  const [platform, setPlatform] = useState("YouTube");
  const [extras, setExtras] = useState("");
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  async function handleGenerate(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      setItems([
        `Primer plano de rostro sorprendido, luz neón violeta/azul, fondo ${platform}, estilo ${style}`,
        `Escena ${topic} con contraste extremo, tipografía vacía, composición rule-of-thirds, ${style}`,
        `Objeto central ${topic} flotando, iluminación rim light, fondo degradado purple/blue`,
        `Duo de personajes reaccionando, expresiones exageradas, colores vibrantes, ${style}`,
      ]);
    } catch (err) {
      setError(err?.message ?? "Error inesperado.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <GeneratorShell
      title="Prompts perfectos para miniaturas"
      subtitle="Recibe prompts listos para Midjourney o DALL-E con alto impacto visual."
    >
      <div className="grid gap-6">
        <AuthPanel onUser={setUser} />
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm text-white/70">
            Pro ilimitado por 9,99€/mes
          </span>
          <CheckoutButton user={user} />
        </div>
        <form
          onSubmit={handleGenerate}
          className="grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-6"
        >
          <Input
            placeholder="Tema principal"
            value={topic}
            onChange={(event) => setTopic(event.target.value)}
            required
          />
          <div className="grid gap-3 md:grid-cols-2">
            <Input
              placeholder="Estilo visual"
              value={style}
              onChange={(event) => setStyle(event.target.value)}
            />
            <Input
              placeholder="Plataforma"
              value={platform}
              onChange={(event) => setPlatform(event.target.value)}
            />
          </div>
          <Textarea
            placeholder="Extras: colores, emociones, objetos clave, texto..."
            value={extras}
            onChange={(event) => setExtras(event.target.value)}
          />
          {error ? <p className="text-sm text-red-300">{error}</p> : null}
          <Button type="submit" disabled={loading}>
            {loading ? "Generando..." : "Generar prompts"}
          </Button>
        </form>
        <OutputList title="Prompts sugeridos" items={items} />
      </div>
    </GeneratorShell>
  );
}
