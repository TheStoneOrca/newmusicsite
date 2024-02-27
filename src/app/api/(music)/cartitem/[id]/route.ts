import { NextResponse } from "next/server";
import pg from "pg";

export async function DELETE(Req: Request, Res: Response) {
  try {
    const db = new pg.Client({
      connectionString: process.env.DATABASE_URL as string,
    });

    await db.connect();

    await db.query("DELETE FROM cartitems WHERE itemid = $1", [
      Req.url.slice(Req.url.lastIndexOf("/") + 1),
    ]);

    await db.end();

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500, msg: "Unexpected Server Error." });
  }
}
