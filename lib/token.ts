import crypto from "crypto";

export function generateApiKey(clientId?: string) {
  const timestamp = Date.now().toString();
  return  `ai_bot_scrapper_${crypto
    .createHash("sha256")
    .update(`${clientId}.${timestamp}`)
    .digest("hex")
    .slice(0, 24)}`;
  
}
