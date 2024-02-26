import { NextResponse } from "next/server";
import pg from "pg";

export async function GET(Req: Request, Res: Response) {
  try {
    const db = new pg.Client({
      connectionString: process.env.DATABASE_URL as string,
    });

    await db.connect();

    const cartitems = await db.query(
      "SELECT * FROM cartitems JOIN pieces ON cartitems.itempiece = pieces.pieceid WHERE itemowner = $1",
      [Req.url.slice(Req.url.lastIndexOf("/") + 1)]
    );

    await db.end();

    return NextResponse.json({ status: 200, cartitems: cartitems.rows });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500, msg: "Unexpected Server Error." });
  }
}
