// middleware.ts
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
// paths that require authentication or authorization
const requireAuth: string[] = ["/dashboard", "/chart"];
const authPage: string[] = ["/signin", "/signup"];
export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const pathname = request.nextUrl.pathname;

  const token = await getToken({
    req: request,
    secret: process.env.SECRET,
  });
  if (authPage.some((path) => pathname.startsWith(path))) {
    //check not logged in
    if (token) {
      const url = new URL(`/dashboard`, request.url);
      return NextResponse.redirect(url);
    }
  }

  if (requireAuth.some((path) => pathname.startsWith(path))) {
    //check not logged in
    if (!token) {
      const url = new URL(`/signin`, request.url);
      url.searchParams.set("callbackUrl", encodeURI(request.url));
      return NextResponse.redirect(url);
    }
  }
  return res;
}
