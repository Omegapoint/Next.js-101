import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  cookies().set({ name: "authenticated", value: "true" });
  return NextResponse.json({ status: 200 });
}
