"use client";

import { useState } from "react";
import AuthPanel from "@/components/AuthPanel";
import CheckoutButton from "@/components/CheckoutButton";
import GeneratorShell from "@/components/GeneratorShell";
import OutputList from "@/components/OutputList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function CalendarioPage() {
  const [user, setUser] = useState(null);
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState("YouTube + TikTok");
  const [frequency, setFrequency] = useState("5 ideas semanales");
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
        `Lunes: ${topic} explicado en 60s (CTR)`,
        `Martes: error comun en ${topic} (retencion)`,
        `Miercoles: checklist rapido de ${topic} (conversion)`,
        `Jueves: mini caso real de ${topic} (CTR)`,
        `Viernes: mitos vs realidad sobre ${topic} (retencion)`,
      ]);
    } catch (err) {
      setError(err?.message ?? "Error inesperado.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <GeneratorShell
      title="Calendario semanal de ideas"
      subtitle="Recibe 5 ideas con formato, objetivo y gancho para toda la semana."
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
              placeholder="Plataformas"
              value={platform}
              onChange={(event) => setPlatform(event.target.value)}
            />
            <Input
              placeholder="Frecuencia"
              value={frequency}
              onChange={(event) => setFrequency(event.target.value)}
            />
          </div>
          <Textarea
            placeholder="Extras: nicho, estilo, objetivos, CTA..."
            value={extras}
            onChange={(event) => setExtras(event.target.value)}
          />
          {error ? <p className="text-sm text-red-300">{error}</p> : null}
          <Button type="submit" disabled={loading}>
            {loading ? "Generando..." : "Generar calendario"}
          </Button>
        </form>
        <OutputList title="Ideas de la semana" items={items} />
      </div>
    </GeneratorShell>
  );
}
