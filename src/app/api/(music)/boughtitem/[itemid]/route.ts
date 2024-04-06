import { NextResponse } from "next/server";
import pg from "pg";

export async function GET(Req: Request, Res: Response) {
  try {
    const db = new pg.Client({
      connectionString: process.env.DATABASE_URL as string,
    });

    await db.connect();

    const itemid = Req.url.slice(Req.url.lastIndexOf("/") + 1);

    const boughtItem = await db.query(
      "SELECT * FROM boughtitems JOIN pieces ON boughtitems.boughtitem = pieces.pieceid JOIN users ON pieces.pieceowner = users.email WHERE boughtitemid = $1",
      [itemid]
    );

    await db.end();

    return NextResponse.json({ status: 200, boughtitem: boughtItem.rows[0] });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500, msg: "Unexpected Server Error." });
  }
}
