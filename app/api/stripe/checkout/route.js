import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(request) {
  try {
    const { userId, email } = await request.json();
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      client_reference_id: userId ?? undefined,
      customer_email: email ?? undefined,
      success_url: `${appUrl}/titulos?checkout=success`,
      cancel_url: `${appUrl}/titulos?checkout=cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "No se pudo iniciar el pago." },
      { status: 500 }
    );
  }
}
