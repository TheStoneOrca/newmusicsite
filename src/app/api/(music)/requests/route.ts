import { NextResponse } from "next/server";
import pg from "pg";

export async function GET(Req: Request, Res: Response) {
  try {
    const db = new pg.Client({
      connectionString: process.env.DATABASE_URL as string,
    });

    await db.connect();

    const Requests = await db.query(
      "SELECT * FROM requests JOIN users ON users.userid = requests.requestmakerid"
    );

    await db.end();

    return NextResponse.json({ status: 200, requests: Requests.rows });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500, msg: "Server Error" });
  }
}
