import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: { signIn: "/auth/login", signOut: "/auth/login" },
});

export const config = {
  matcher: ["/admin/:path*"],
};
