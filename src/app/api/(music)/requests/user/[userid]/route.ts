import { NextResponse } from "next/server";
import pg from "pg";

export async function GET(Req: Request, Res: Response) {
  try {
    const userid = Req.url.slice(Req.url.lastIndexOf("/") + 1);
    const db = new pg.Client({
      connectionString: process.env.DATABASE_URL as string,
    });

    await db.connect();

    const Requests = await db.query(
      "SELECT * FROM requests WHERE requestmakerid = $1",
      [userid]
    );

    await db.end();

    return NextResponse.json({ status: 200, requests: Requests.rows });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500, msg: "Server Error" });
  }
}
