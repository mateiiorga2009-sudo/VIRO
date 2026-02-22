import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function GeneratorShell({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-hero-gradient">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <Link href="/" className="text-xl font-bold text-white">
          VIRO
        </Link>
        <Link
          href="/titulos"
          className={cn(buttonVariants({ variant: "secondary" }))}
        >
          Volver a generadores
        </Link>
      </header>
      <main className="mx-auto w-full max-w-4xl px-6 pb-16">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">
            Generador IA
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-white md:text-4xl">
            {title}
          </h1>
          <p className="mt-3 max-w-2xl text-base text-white/70">{subtitle}</p>
        </div>
        {children}
      </main>
    </div>
  );
}
