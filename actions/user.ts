import { prisma } from "@/lib/prisma";
import { checkSession } from "./session";

export async function listUsers() {
  const session = await checkSession();
  if (!session?.user) return [];
  return await prisma.user.findMany();
}
