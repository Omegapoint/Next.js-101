import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const response = new NextResponse();
    response.cookies.set({
      name: "authenticated",
      value: "true",
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    });
    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "We encountered an error during login" },
      { status: 500 }
    );
  }
}
