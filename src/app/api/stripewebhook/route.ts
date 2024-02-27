import { NextResponse } from "next/server";
import Stripe from "stripe";
import pg from "pg";

const stripe = new Stripe(process.env.STRIPE_SECRET as string);

export async function POST(Request: Request, Response: Response) {
  try {
    const event = await Request.json();

    const db = new pg.Client({
      connectionString: process.env.DATABASE_URL as string,
    });

    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;
        // Then define and call a method to handle the successful payment intent.
        // handlePaymentIntentSucceeded(paymentIntent);
        break;
      case "checkout.session.completed":
        try {
          const checkoutSession = event.data.object;
          const session = await stripe.checkout.sessions.retrieve(
            checkoutSession.id
          );

          console.log(session.metadata!.itemIDs);
          console.log(JSON.parse(session.metadata!.itemIDs));

          const itemIds = JSON.parse(session.metadata!.itemIDs);

          itemIds.forEach(async (item: any) => {
            console.log(item);
            console.log(Number(session.metadata!.buyer));
            await db.query(
              "INSERT INTO boughtitems(boughtitem, buyer) VALUES($1, $2)",
              [item, Number(session.metadata!.buyer)]
            );
          });

          console.log("for each");

          await db.query("DELETE FROM cartitems WHERE itemowner = $1", [
            session.metadata!.buyer,
          ]);

          console.log("h");
        } catch (error) {
          console.error(error);
        }

        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    await db.end();

    // Return a response to acknowledge receipt of the event
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ received: true });
  }
}
