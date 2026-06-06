import type { VercelRequest, VercelResponse } from "@vercel/node";

function createToken(username: string): string {
  const secret = process.env.JWT_SECRET ?? "mmm-studio-secret-key-2024";
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const body = Buffer.from(JSON.stringify({ username, role: "admin", iat: Date.now(), exp: Date.now() + 86400000 })).toString("base64url");
  const sig = Buffer.from(secret + header + body).toString("base64url");
  return `${header}.${body}.${sig}`;
}

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const ADMIN_USERNAME = process.env.ADMIN_USERNAME ?? "admin";
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "mmmstudio2024";

  const { username, password } = req.body as { username?: string; password?: string };
  if (!username || !password)
    return res.status(400).json({ error: "Username and password are required." });
  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD)
    return res.status(401).json({ error: "Invalid username or password." });

  return res.status(200).json({ token: createToken(username) });
}
