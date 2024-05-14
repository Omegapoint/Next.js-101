import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const headers = new Headers({ "Set-Cookie": "authenticated=true" });
  return NextResponse.json("Successfully logged in", {
    status: 200,
    headers,
  });
}
