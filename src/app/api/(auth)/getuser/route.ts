import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(Req: Request, Res: Response) {
  try {
    const user: { sessionJWT: string } = await Req.json();

    const userObject = jwt.verify(
      user.sessionJWT,
      process.env.JWT_SECRET as string
    );

    return NextResponse.json({ status: 200, userData: userObject });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      msg: "Unexpected Server Error, Please Try Again.",
    });
  }
}
