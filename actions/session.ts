import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function checkSession() {
  const session = await getServerSession(authOptions);
  if (session && session.user) {
    return session;
  }
  throw new Error("Unauthorized");
}
