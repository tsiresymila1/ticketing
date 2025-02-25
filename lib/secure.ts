"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

export function withAuth<T extends (...args: never[]) => Promise<ReturnType<T>>>(
  action: T
): (...args: Parameters<T>) => Promise<ReturnType<T>> {
  return async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    const session = await getServerSession(authOptions);

    if (!session) {
      throw new Error("Unauthorized");
    }

    return action(...args);
  };
}
