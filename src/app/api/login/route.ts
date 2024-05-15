import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
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
