"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function CheckoutButton({ user }) {
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    setLoading(true);
    try {
      window.location.href = "https://checkout.stripe.com/demo";
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
