import { NextResponse } from "next/server";
import pg from "pg";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface SignupDetails {
  email: string;
  password: string;
  fname: string;
  lname: string;
}

export async function POST(Req: Request, Res: Response) {
  try {
    const user: SignupDetails = await Req.json();

    if (!user.email || !user.fname || !user.lname || !user.password) {
      return NextResponse.json({
        status: 500,
        msg: "Unexpected Server Error, Not All Data Sent In Request. Please Try Again.",
      });
    }

    const db = new pg.Client({
      connectionString: process.env.DATABASE_URL as string,
    });

    await db.connect();

    const checkEmail = await db.query("SELECT * FROM users WHERE email = $1", [
      user.email,
    ]);

    if (checkEmail.rows.length > 0) {
      await db.end();
      return NextResponse.json({
        status: 406,
        msg: "Email Is Already Registered!",
      });
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const userDetails = await db.query(
      "INSERT INTO users(email, password, fname, lname, role) VALUES($1, $2, $3, $4, $5) RETURNING email, fname, lname, role",
      [user.email, hashedPassword, user.fname, user.lname, "member"]
    );

    await db.end();

    const userJWT = jwt.sign(
      userDetails.rows[0],
      process.env.JWT_SECRET as string
    );

    return NextResponse.json({ status: 200, sessionJWT: userJWT });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      msg: "Unexpected Server Error, Please Try Again.",
    });
  }
}
