"use server";
import { prisma } from "@/lib/prisma";
import { addDays, format, subDays } from "date-fns";
import { checkSession } from "./session";

export async function getRequestByProject(projectId: string, days: number = 7) {
  await checkSession();
  const startDate = subDays(new Date(), days);
  const requestStats = await prisma.request.groupBy({
    by: ["createdAt"],
    where: { createdAt: { gte: startDate }, projectId },
    _count: { id: true },
    orderBy: { createdAt: "asc" },
  });
  const statsMap = new Map(
    requestStats.map((stat) => [
      format(stat.createdAt, "yyyy-MM-dd"),
      stat._count.id,
    ])
  );

  const result = [];
  for (let i = 0; i <= days; i++) {
    const date = format(addDays(startDate, i), "yyyy-MM-dd");
    result.push({ date, requests: statsMap.get(date) || 0 });
  }

  return result;
}
