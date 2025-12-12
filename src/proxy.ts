import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  console.log("------------- Middleware -------------");
  // TODO: intercept requests from the browser to authenticate them
}
export const config = {
  matcher: ["/((?!api|login|_next/static|_next/image|favicon.ico).*)"],
};
