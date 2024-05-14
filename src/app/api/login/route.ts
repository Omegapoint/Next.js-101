import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const headers = new Headers({});

  const response = NextResponse.redirect("http://localhost:3000/", {
    status: 302,
  });

  return response;
}
