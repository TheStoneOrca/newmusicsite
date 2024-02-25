import { NextResponse } from "next/server";
import pg from "pg";

export async function GET(Req: Request, Res: Response) {
  try {
    const requestId = Req.url.slice(Req.url.lastIndexOf("/") + 1);
    const db = new pg.Client({
      connectionString: process.env.DATABASE_URL as string,
    });

    await db.connect();

    const request = await db.query(
      "SELECT * FROM requests JOIN users ON users.userid = requests.requestmakerid WHERE requestid = $1",
      [requestId]
    );

    await db.end();

    return NextResponse.json({ status: 200, requests: request.rows[0] });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500, msg: "Server Error" });
  }
}
