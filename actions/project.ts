"use server";
import { prisma } from "@/lib/prisma";
import { generateApiKey } from "@/lib/token";
import { revalidatePath } from "next/cache";
import { createActivity } from "./activity";
import { checkSession } from "./session";

export type ProjectFormData = {
  title: string;
  description?: string;
  id?: string;
  isSpa?: boolean;
  url: string;
};

export async function listProject() {
  const session = await checkSession();
  return await prisma.project.findMany({
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
    include: {
      collaborators: true,
      user: true,
    },
  });
}

export async function processProject(data: ProjectFormData) {
  const session = await checkSession();
  if (!session?.user.id) {
    return null;
  }
  const res = await prisma.project.upsert({
    where: {
      id: data.id ?? "",
    },
    create: {
      title: data.title,
      description: data.description,
      url: data.url,
      token: generateApiKey(),
      userId: session!.user.id,
      isSpa: data.isSpa
    },
    update: {
      title: data.title,
      description: data.description,
      url: data.url,
      isSpa: data.isSpa
    },
  });
  if (res.id) {
    revalidatePath("/admin/project");
    revalidatePath(`/admin/project/${res.id}`);
    await createActivity(`${session?.user.name} create new project.`);
  }
  return res;
}

export async function getprojectById(projectId: string) {
  const session = await checkSession();
  if (!session) return null;
  return await prisma.project.findFirst({
    where: {
      AND: {
        id: projectId,
        OR: [
          {
            userId: session?.user.id,
          },
          {
            collaborators: { some: { id: session?.user.id } },
          },
        ],
      },
    },
    include: {
      collaborators: true,
      user: true,
      requests: {
        take: 50,
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
}

export async function deleteProject(projectId: string) {
  const session = await checkSession();
  const res = await prisma.project.delete({
    where: {
      userId: session?.user.id,
      id: projectId,
    },
  });
  revalidatePath("/admin/project");
  await createActivity(`${session?.user.name} remove ${res.title} project.`);
  return res;
}
