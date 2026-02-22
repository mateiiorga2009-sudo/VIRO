"use client";

import { useState } from "react";
import AuthPanel from "@/components/AuthPanel";
import CheckoutButton from "@/components/CheckoutButton";
import GeneratorShell from "@/components/GeneratorShell";
import OutputList from "@/components/OutputList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function IntrosPage() {
  const [user, setUser] = useState(null);
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("directo y motivador");
  const [duration] = useState("12 segundos");
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
        `Si hoy solo tienes 12 segundos, aprende esto sobre ${topic}.`,
        `No cometas este error con ${topic}, te lo explico en 12s.`,
        `El truco rapido para ${topic} que nadie te dijo.`,
        `En 12 segundos te muestro la forma simple de ${topic}.`,
      ]);
    } catch (err) {
      setError(err?.message ?? "Error inesperado.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <GeneratorShell
      title="Guiones de intros 12 segundos"
      subtitle="Crea ganchos verbales claros y listos para grabar en 12s."
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
              placeholder="Tono"
              value={tone}
              onChange={(event) => setTone(event.target.value)}
            />
            <Input placeholder="Duracion" value={duration} disabled />
          </div>
          <Textarea
            placeholder="Extras: promesa, publico, estilo, palabras clave..."
            value={extras}
            onChange={(event) => setExtras(event.target.value)}
          />
          {error ? <p className="text-sm text-red-300">{error}</p> : null}
          <Button type="submit" disabled={loading}>
            {loading ? "Generando..." : "Generar intros"}
          </Button>
        </form>
        <OutputList title="Intros sugeridas" items={items} />
      </div>
    </GeneratorShell>
  );
}
