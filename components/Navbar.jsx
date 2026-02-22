import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Navbar() {
  return (
    <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
      <Link href="/" className="text-xl font-bold text-white">
        VIRO
      </Link>
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard"
          className={cn(buttonVariants({ variant: "ghost", size: "default" }))}
        >
          Dashboard
        </Link>
        <Link
          href="/titulos"
          className={cn(buttonVariants({ variant: "secondary", size: "default" }))}
        >
          Generar ahora
        </Link>
        <a
          href="#precios"
          className={cn(buttonVariants({ variant: "ghost", size: "default" }))}
        >
          Precios
        </a>
      </div>
    </nav>
  );
}
