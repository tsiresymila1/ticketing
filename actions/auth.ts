"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
export type RegisterInput = { name: string; email: string; password: string };

export async function registerUser(data: RegisterInput) {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });
  if (existingUser) return { error: "Email already in use" };

  const hashedPassword = await bcrypt.hash(data.password, 10);
  await prisma.user.create({
    data: { email: data.email, name: data.name, password: hashedPassword },
  });

  return { success: "User registered successfully" };
}
