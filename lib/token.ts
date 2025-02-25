import crypto from "crypto";

const SECRET_KEY = process.env.TOKEN_SECRET || "mysecret";

export function generateApiKeys(clientId?: string) {
  const timestamp = Date.now().toString();
  const randomPart = crypto.randomBytes(16).toString("hex");
  const publicKey = `pk_${crypto
    .createHash("sha256")
    .update(`${clientId}.${timestamp}`)
    .digest("hex")
    .slice(0, 24)}`;
  const hmac = crypto.createHmac("sha256", SECRET_KEY);
  hmac.update(`${clientId}.${timestamp}.${randomPart}`);
  const secretKey = `sk_${hmac.digest("hex").slice(0, 48)}`;
  return { publicKey, secretKey };
}
