"use client";

import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AuthPanel({ onUser }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (current) => {
      setUser(current);
      onUser?.(current);
      if (current) {
        const userRef = doc(db, "users", current.uid);
        const snap = await getDoc(userRef);
        if (!snap.exists()) {
          await setDoc(
            userRef,
            {
              email: current.email,
              plan: "free",
              createdAt: serverTimestamp(),
            },
            { merge: true }
          );
        }
      }
    });

    return () => unsub();
  }, [onUser]);

  async function handleAuth(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (mode === "login") {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      setEmail("");
      setPassword("");
    } catch (err) {
      setError(err?.message ?? "No se pudo autenticar.");
    } finally {
      setLoading(false);
    }
  }

  if (user) {
    return (
      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">
        <span>Conectado: {user.email}</span>
        <Button
          variant="secondary"
          size="default"
          onClick={() => signOut(auth)}
        >
          Cerrar sesion
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleAuth}
      className="grid gap-3 rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-white/80"
    >
      <div className="flex gap-2">
        <Button
          type="button"
          variant={mode === "login" ? "default" : "secondary"}
          size="default"
          onClick={() => setMode("login")}
        >
          Entrar
        </Button>
        <Button
          type="button"
          variant={mode === "signup" ? "default" : "secondary"}
          size="default"
          onClick={() => setMode("signup")}
        >
          Crear cuenta
        </Button>
      </div>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
      />
      {error ? <p className="text-sm text-red-300">{error}</p> : null}
      <Button type="submit" disabled={loading}>
        {loading ? "Procesando..." : mode === "login" ? "Entrar" : "Crear cuenta"}
      </Button>
    </form>
  );
}
