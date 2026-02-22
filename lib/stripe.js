import Stripe from "stripe";

const secretKey = process.env.STRIPE_SECRET_KEY;

if (!secretKey) {
  console.warn("STRIPE_SECRET_KEY no esta definido en .env.local");
}

export const stripe = new Stripe(secretKey ?? "", {
  apiVersion: "2024-06-20",
});
