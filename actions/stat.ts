import { prisma } from "@/lib/prisma";
import { checkSession } from "./session";

export default async function getStats() {
  const session = await checkSession();
  const project = await prisma.project.count({
    where: {
      OR: [
        {
          userId: session?.user.id,
        },
        {
          collaborators: { some: { id: session?.user.id } },
        },
      ],
    },
  });
  const user = await prisma.user.count();
  const requests = await prisma.request.findMany({
    skip: 1,
  });
  return { project, user, requests };
}
