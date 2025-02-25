import { prisma } from "@/lib/prisma";
import { checkSession } from "./session";

export async function listActivities(limit?: number) {
  const session = await checkSession();
  return await prisma.activity.findMany({
    where: {
      OR: [
        {
          userId: session?.user.id,
        },
      ],
    },
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: limit,
  });
}

export async function createActivity(action: string) {
  const session = await checkSession();
  return await prisma.activity.create({
    data: {
      action,
      userId: session!.user.id,
    },
  });
}
