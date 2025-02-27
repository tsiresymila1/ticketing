import createClient from "openapi-fetch";
import type { paths } from "./type";

export const api = createClient<paths>({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
});
