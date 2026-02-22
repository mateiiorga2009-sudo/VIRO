import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getAdminDb } from "@/lib/firebaseAdmin";

export async function POST(request) {
  const signature = request.headers.get("stripe-signature");
  const body = await request.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Firma de webhook invalida." },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const db = getAdminDb();
    let userRef = null;

    if (session.client_reference_id) {
      userRef = db.collection("users").doc(session.client_reference_id);
    } else if (session.customer_email) {
      const snapshot = await db
        .collection("users")
        .where("email", "==", session.customer_email)
        .limit(1)
        .get();
      if (!snapshot.empty) {
        userRef = snapshot.docs[0].ref;
      }
    }

    if (userRef) {
      await userRef.set(
        {
          plan: "pro",
          stripeCustomerId: session.customer,
          stripeSubscriptionId: session.subscription,
          updatedAt: new Date(),
        },
        { merge: true }
      );
    }
  }

  return NextResponse.json({ received: true });
}
