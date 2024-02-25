import { NextResponse } from "next/server";
import pg from "pg";

export async function PATCH(Req: Request, Res: Response) {
  try {
    const requestId = Req.url.slice(Req.url.lastIndexOf("/") + 1);

    const db = new pg.Client({
      connectionString: process.env.DATABASE_URL as string,
    });

    await db.connect();

    await db.query(
      "UPDATE requests SET requestfullfilled = 'true' WHERE requestid = $1",
      [requestId]
    );

    await db.end();

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500, msg: "Server Error" });
  }
}
