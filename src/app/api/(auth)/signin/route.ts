import { NextResponse } from "next/server";
import pg from "pg";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface LoginDetails {
  email: string;
  password: string;
}

export async function POST(Req: Request, Res: Response) {
  try {
    const req: LoginDetails = await Req.json();

    if (!req.password || !req.email) {
      return NextResponse.json({
        status: 500,
        msg: "Unexpected Server Error, Not All Data Sent In Request. Please Try Again.",
      });
    }

    const db = new pg.Client({
      connectionString: process.env.DATABASE_URL as string,
    });

    await db.connect();

    const checkUsername = await db.query(
      "SELECT * FROM users WHERE email = $1",
      [req.email]
    );

    if (checkUsername.rows.length > 0) {
      const checkPassword = await bcrypt.compare(
        req.password,
        checkUsername.rows[0].password
      );

      if (checkPassword) {
        const user = await db.query(
          "SELECT userid, email, fname, lname, role FROM users WHERE userid = $1",
          [checkUsername.rows[0].userid]
        );

        await db.end();

        const userJWT = jwt.sign(
          user.rows[0],
          process.env.JWT_SECRET as string
        );

        return NextResponse.json({ status: 200, sessionJWT: userJWT });
      } else {
        await db.end();

        return NextResponse.json({
          status: 401,
          msg: "Invalid Username or Password",
        });
      }
    } else {
      await db.end();
      return NextResponse.json({ status: 404, msg: "User Does Not Exist!" });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      msg: "Unexpected Server Error, Please Try Again.",
    });
  }
}
