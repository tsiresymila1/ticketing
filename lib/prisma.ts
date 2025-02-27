import { PrismaClient } from "@prisma/client";
import { api } from "./api/client";

export const prisma = new PrismaClient().$extends({
  name: "projectUpsert",
  query: {
    project: {
      async upsert({ query, args }) {
        const upsertedProject = await query(args);
        const body = {
          token: upsertedProject.token!,
          url: upsertedProject.url!,
          is_spa: upsertedProject.isSpa ?? false,
        };
        api
          .POST("/scape", {
            body: body,
            headers: {
                'Content-Type': 'application/json'
            }
          })
          .catch(console.error);
        return upsertedProject;
      },
    },
  },
});
