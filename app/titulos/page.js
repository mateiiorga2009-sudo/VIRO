"use client";

import { useState } from "react";
import AuthPanel from "@/components/AuthPanel";
import CheckoutButton from "@/components/CheckoutButton";
import GeneratorShell from "@/components/GeneratorShell";
import OutputList from "@/components/OutputList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function TitulosPage() {
  const [user, setUser] = useState(null);
  const [topic, setTopic] = useState("");
  const [audience, setAudience] = useState("creadores hispanos");
  const [platform, setPlatform] = useState("YouTube");
  const [tone, setTone] = useState("energico");
  const [extras, setExtras] = useState("");
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  async function handleGenerate(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/titulos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          audience,
          platform,
          tone,
              extras,
          userId: user?.uid ?? null,
          email: user?.email ?? null,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error ?? "No se pudo generar.");
      }
      setItems(data?.titles ?? []);
    } catch (err) {
      setError(err?.message ?? "Error inesperado.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <GeneratorShell
      title="Titulos YouTube/TikTok ultra-CTR"
      subtitle="Describe tu tema y obtendras 5 titulos listos para maximizar clicks, curiosidad y retencion."
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
            placeholder="Tema principal (ej: ganar musculo flaco)"
            value={topic}
            onChange={(event) => setTopic(event.target.value)}
            required
          />
          <div className="grid gap-3 md:grid-cols-3">
            <Input
              placeholder="Audiencia"
              value={audience}
              onChange={(event) => setAudience(event.target.value)}
            />
            <Input
              placeholder="Plataforma"
              value={platform}
              onChange={(event) => setPlatform(event.target.value)}
            />
            <Input
              placeholder="Tono"
              value={tone}
              onChange={(event) => setTone(event.target.value)}
            />
          </div>
          <Textarea
            placeholder="Extras: objetivo, gancho, estilo, palabras clave..."
            rows={4}
            value={extras}
            onChange={(event) => setExtras(event.target.value)}
          />
          {error ? <p className="text-sm text-red-300">{error}</p> : null}
          <Button type="submit" disabled={loading}>
            {loading ? "Generando..." : "Generar titulos"}
          </Button>
          <p className="text-xs text-white/50">
            Plan gratis: 3 generaciones al dia. Pro ilimitado.
          </p>
        </form>
        <OutputList title="Titulos recomendados" items={items} />
      </div>
    </GeneratorShell>
  );
}
