import { NextResponse } from "next/server";
import pg from "pg";

interface RequestDetails {
  pieceid: number;
  userid: number;
}

export async function POST(Req: Request, res: Response) {
  try {
    const req: RequestDetails = await Req.json();

    if (req.pieceid && req.userid) {
      const db = new pg.Client({
        connectionString: process.env.DATABASE_URL as string,
      });

      await db.connect();

      await db.query(
        "INSERT INTO cartitems(itemowner, itempiece) VALUES($1, $2)",
        [req.userid, req.pieceid]
      );

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
