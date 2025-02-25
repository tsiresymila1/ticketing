import { prisma } from "@/lib/prisma";
import { getSession } from "./session";

export async function listUsers() {
  const session = await getSession();
  if (!session?.user) return [];
  return await prisma.user.findMany();
}
