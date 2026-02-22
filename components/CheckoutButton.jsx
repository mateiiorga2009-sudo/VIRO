"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function CheckoutButton({ user }) {
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user?.uid ?? null,
          email: user?.email ?? null,
        }),
      });
      const data = await res.json();
      if (data?.url) {
        window.location.href = data.url;
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button onClick={handleCheckout} disabled={loading}>
      {loading ? "Abriendo Stripe..." : "Upgrade a Pro"}
    </Button>
  );
}
