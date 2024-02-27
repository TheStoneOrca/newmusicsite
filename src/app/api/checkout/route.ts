import { NextResponse } from "next/server";
import Stripe from "stripe";

interface Req {
  items: Array<{ itemid: number; itemname: string; itemprice: number }>;
  userid: number;
}

export async function POST(Req: Request, res: Response) {
  try {
    const req: Req = await Req.json();
    const stripe = new Stripe(process.env.STRIPE_SECRET as string);

    const itemIds = req.items.map((item) => {
      return item.itemid;
    });

    const checkout = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: req.items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.itemname,
          },
          unit_amount: item.itemprice * 100,
        },
        quantity: 1,
      })),
      metadata: {
        itemIDs: JSON.stringify(itemIds),
        buyer: JSON.stringify(req.userid),
      },
      success_url: `${process.env.DOMAIN}/library`,
    });

    return NextResponse.json({ status: 200, checkoutsession: checkout.id });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500, msg: "Unexpected Server Error." });
  }
}
