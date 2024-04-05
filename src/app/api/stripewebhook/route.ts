import { NextResponse } from "next/server";
import Stripe from "stripe";
import pg from "pg";

const stripe = new Stripe(process.env.STRIPE_SECRET as string);

export async function POST(Request: Request, Response: Response) {
  try {
    const event = await Request.json();

    const db = new pg.Pool({
      connectionString: process.env.DATABASE_URL as string,
    });

    // Handle the ev
    if (event.type === "checkout.session.completed") {
      try {
        const checkoutSession = event.data.object;
        const session = await stripe.checkout.sessions.retrieve(
          checkoutSession.id
        );

        const itemIds: Array<any> = JSON.parse(session.metadata!.itemIDs);

        const itemDetails = itemIds.map((item) => {
          return { buyer: Number(session.metadata!.buyer), itemid: item };
        });

        await fetch(`${process.env.DOMAIN}/api/boughtitem`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ purchaseDetails: itemDetails }),
        });
      } catch (error) {
        console.error(error);
      }
    }
    await db.end();

    // Return a response to acknowledge receipt of the event
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ received: true });
  }
}
