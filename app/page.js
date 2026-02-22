import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div className="min-h-screen bg-hero-gradient">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-6 pb-16 pt-10">
        <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-white/60">
              VIRO · IA PARA CREADORES
            </p>
            <h1 className="text-4xl font-semibold text-white md:text-5xl">
              Ideas, titulos y guiones que maximizan CTR en YouTube y TikTok.
            </h1>
            <p className="max-w-xl text-base text-white/70">
              Genera titulos irresistibles, prompts de miniaturas estilo
              cinematico, intros de 10-15 segundos y un calendario semanal de
              ideas listas para publicar.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/titulos"
                className={cn(buttonVariants({ size: "lg" }))}
              >
                Probar generadores
              </Link>
              <a
                href="#precios"
                className={cn(
                  buttonVariants({ variant: "secondary", size: "lg" })
                )}
              >
                Ver planes
              </a>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/70">
              <p className="font-semibold text-white">Plan gratis</p>
              <p>3 generaciones al dia. Upgrade a Pro por 9,99€/mes.</p>
            </div>
          </div>
          <div className="grid gap-4">
            {[
              {
                title: "Titulos ultra-CTR",
                desc: "5 opciones optimizadas con ganchos, curiosidad y promesa.",
                href: "/titulos",
              },
              {
                title: "Prompts miniaturas",
                desc: "Prompts para Midjourney/DALL-E con estilo viral.",
                href: "/miniaturas",
              },
              {
                title: "Intros grabables",
                desc: "Guiones cortos, directos y con hook inmediato.",
                href: "/intros",
              },
              {
                title: "Calendario semanal",
                desc: "5 ideas con formatos y objetivos claros.",
                href: "/calendario",
              },
            ].map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:border-white/30 hover:bg-white/10"
              >
                <div className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-viro-glow to-viro-accent px-5 py-4 text-sm font-semibold text-white shadow-glow-md">
                  <span>{card.title}</span>
                  <span className="text-xs uppercase tracking-[0.2em] text-white/80">
                    Abrir
                  </span>
                </div>
                <p className="mt-3 text-sm text-white/70">{card.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-16 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Prompts perfectos",
              desc: "Instrucciones listas para GPT-4o-mini enfocadas en audiencia hispana.",
            },
            {
              title: "Historial y uso",
              desc: "Guarda resultados en Firestore para repetir o iterar.",
            },
            {
              title: "Produccion veloz",
              desc: "Mobile first, interfaz clara y resultados en segundos.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-6"
            >
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-white/70">{item.desc}</p>
            </div>
          ))}
        </section>

        <section id="precios" className="mt-16">
          <h2 className="text-2xl font-semibold text-white">Planes</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-lg font-semibold text-white">Gratis</h3>
              <p className="mt-2 text-sm text-white/70">
                3 generaciones al dia, acceso completo a los 4 generadores.
              </p>
              <p className="mt-4 text-3xl font-semibold text-white">0€</p>
            </div>
            <div className="rounded-3xl border border-viro-glow/50 bg-white/10 p-6 shadow-glow-md">
              <h3 className="text-lg font-semibold text-white">Pro</h3>
              <p className="mt-2 text-sm text-white/70">
                Generaciones ilimitadas, historial avanzado y priorizacion.
              </p>
              <p className="mt-4 text-3xl font-semibold text-white">
                9,99€/mes
              </p>
              <Link
                href="/titulos"
                className={cn(buttonVariants({}), "mt-4")}
              >
                Suscribirme
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
