import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    cookies().set({ name: "authenticated", value: "true" });
    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "We encountered an error during login" },
      { status: 500 }
    );
  }
}
