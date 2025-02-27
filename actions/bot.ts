"use server";

import { api } from "@/lib/api/client";

export async function startScapping(token: string) {
  const response = await api.POST("/scape/{token}/start", {
    params: {
      path: {
        token,
      },
    },
  });
  return response.data;
}

export async function streamChat(
  session_id: string,
  token: string,
  content: string = ""
) {
  const body = { session_id, token, content }
  console.log("Body:::", body)
  const { response } = await api.POST("/chat", {
    headers: { "Content-Type": "application/json" },
    body, 
  });

  if (!response.body) throw new Error("No response body");
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  const stream = new ReadableStream({
    async start(controller) {
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        controller.enqueue(decoder.decode(value));
      }
      controller.close();
    },
  });
  return stream;
}
