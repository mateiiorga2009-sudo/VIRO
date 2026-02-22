"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import AuthPanel from "@/components/AuthPanel";
import GeneratorShell from "@/components/GeneratorShell";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (current) => {
      setUser(current);
      if (current) {
        setLoading(true);
        setError("");
        try {
          const historyRef = collection(db, "users", current.uid, "history");
          const q = query(historyRef, orderBy("createdAt", "desc"), limit(50));
          const snapshot = await getDocs(q);
          const mapped = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setItems(mapped);
        } catch (err) {
          setError("No se pudo cargar el historial.");
        } finally {
          setLoading(false);
        }
      } else {
        setItems([]);
      }
    });

    return () => unsub();
  }, []);

  return (
    <GeneratorShell
      title="Dashboard historico"
      subtitle="Revisa tus generaciones recientes y reutiliza lo que funciono."
    >
      <div className="grid gap-6">
        <AuthPanel onUser={setUser} />
        {loading ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/70">
            Cargando historial...
          </div>
        ) : null}
        {error ? (
          <div className="rounded-3xl border border-red-400/40 bg-red-500/10 p-6 text-sm text-red-200">
            {error}
          </div>
        ) : null}
        {!loading && !items.length ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/70">
            Todavia no hay resultados guardados.
          </div>
        ) : null}
        <div className="grid gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl border border-white/10 bg-white/5 p-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">
                  {item.type}
                </p>
                <p className="text-xs text-white/50">
                  {item.createdAt?.toDate
                    ? item.createdAt.toDate().toLocaleString()
                    : ""}
                </p>
              </div>
              <pre className="mt-3 whitespace-pre-wrap text-sm text-white/80">
                {Array.isArray(item.output)
                  ? item.output.join("\n")
                  : JSON.stringify(item.output, null, 2)}
              </pre>
            </div>
          ))}
        </div>
      </div>
    </GeneratorShell>
  );
}
