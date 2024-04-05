import { NextResponse } from "next/server";
import pg from "pg";

interface RequestDetails {
  purchaseDetails: Array<{ buyer: number; itemid: number }>;
}

export async function POST(Req: Request, res: Response) {
  try {
    const req: RequestDetails = await Req.json();

    if (req.purchaseDetails) {
      const db = new pg.Pool({
        connectionString: process.env.DATABASE_URL as string,
      });

      await db.connect();

      req.purchaseDetails.forEach((item) => {
        db.query("INSERT INTO boughtitems(boughtitem, buyer) VALUES($1, $2)", [
          item.itemid,
          item.buyer,
        ]);
      });

      await db.query("DELETE FROM cartitems WHERE itemowner = $1", [
        req.purchaseDetails[0].buyer,
      ]);

      await db.end();

      return NextResponse.json({ status: 200 });
    } else {
      return NextResponse.json({
        status: 404,
        msg: "Not all details sent in request. Rare Error",
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500, msg: "Unexpected Server Error." });
  }
}
