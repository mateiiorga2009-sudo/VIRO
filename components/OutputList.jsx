"use client";

import { Button } from "@/components/ui/button";

export default function OutputList({ items, title }) {
  if (!items?.length) {
    return (
      <div className="rounded-3xl border border-dashed border-white/15 bg-white/5 p-6 text-sm text-white/60">
        Todavia no hay resultados.
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        <Button
          variant="secondary"
          onClick={() => navigator.clipboard.writeText(items.join("\n"))}
        >
          Copiar todo
        </Button>
      </div>
      <ul className="space-y-3 text-sm text-white/80">
        {items.map((item, index) => (
          <li
            key={`${item}-${index}`}
            className="rounded-2xl border border-white/10 bg-white/5 p-3"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
