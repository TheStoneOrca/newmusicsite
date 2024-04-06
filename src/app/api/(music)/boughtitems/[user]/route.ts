import { NextResponse } from "next/server";
import pg from "pg";

export async function GET(Req: Request, Res: Response) {
  try {
    const db = new pg.Client({
      connectionString: process.env.DATABASE_URL as string,
    });

    await db.connect();

    const userid = Req.url.slice(Req.url.lastIndexOf("/") + 1);

    const boughtItems = await db.query(
      "SELECT * FROM boughtitems JOIN pieces ON boughtitems.boughtitem = pieces.pieceid JOIN users ON pieces.pieceowner = users.email WHERE buyer = $1",
      [userid]
    );

    await db.end();

    return NextResponse.json({ status: 200, boughtitems: boughtItems.rows });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500, msg: "Unexpected Server Error." });
  }
}
