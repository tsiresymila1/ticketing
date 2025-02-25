"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createActivity } from "./activity";
import { checkSession } from "./session";

export type ProjectFormData = {
  title: string;
  description?: string;
  id?: string;
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
  if (!session?.user) {
    return null;
  }
  const res = await prisma.project.upsert({
    where: {
      id: data.id ?? "",
    },
    create: {
      title: data.title,
      description: data.description,
      userId: session!.user.id,
    },
    update: {
      title: data.title,
      description: data.description,
    },
  });
  if (res.id) {
    revalidatePath("/admin/project");
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
