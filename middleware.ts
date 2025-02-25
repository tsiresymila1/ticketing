import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const token = req.nextauth.token;

    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
    console.log("Token", new Date(token.exp * 1000));
    const isExpired = token.exp && new Date(token.exp * 1000) < new Date();
    if (isExpired) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
    return NextResponse.next();
  },
  {
    pages: { signIn: "/auth/login", signOut: "/auth/login" },
  }
);

export const config = {
  matcher: ["/admin/:path*"],
};
