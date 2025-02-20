"use server";

import { prisma } from "@/lib/prisma";
import argon2 from "argon2";

export async function registerUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;

  if (!email || !password || !name) return { error: "All fields are required" };

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) return { error: "Email already in use" };

  const hashedPassword = await argon2.hash(password);
  await prisma.user.create({ data: { email, name, password: hashedPassword } });

  return { success: "User registered successfully" };
}

export async function loginUser(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
  
    if (!email || !password) return { error: "All fields are required" };
  
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return { error: "Invalid credentials" };
  
    const isValid = await argon2.verify(user.password, password);
    if (!isValid) return { error: "Invalid credentials" };
  
    return { success: "Valid credentials" };
  }
  
