import { NextResponse } from "next/server";
import pg from "pg";

interface RequestDetails {
  title: string;
  description: string;
  grade: number;
  coverImg: string;
  pdf: String;
  audio: String;
  userid: number;
}

export async function POST(Req: Request, res: Response) {
  try {
    const req: RequestDetails = await Req.json();

    if (
      req.audio &&
      req.coverImg &&
      req.description &&
      req.grade &&
      req.pdf &&
      req.title &&
      req.userid
    ) {
      const db = new pg.Client({
        connectionString: process.env.DATABASE_URL as string,
      });

      await db.connect();

      await db.query(
        "INSERT INTO requests(requesttitle, requestdescription, requestgrade, requestmakerid, requestimgcover, requestpdf, requestaudiopreview, requestfullfilled) VALUES($1, $2, $3, $4, $5, $6, $7, $8)",
        [
          req.title,
          req.description,
          req.grade,
          req.userid,
          req.coverImg,
          req.pdf,
          req.audio,
          false,
        ]
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
