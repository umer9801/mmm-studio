import type { VercelRequest, VercelResponse } from "@vercel/node";

const ADMIN_USERNAME = process.env.ADMIN_USERNAME ?? "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "mmmstudio2024";
const JWT_SECRET = process.env.JWT_SECRET ?? "mmm-studio-secret-key-2024";

// Simple JWT-like token (base64 signed payload) — no external dep needed
function createToken(payload: object): string {
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const body = Buffer.from(JSON.stringify({ ...payload, iat: Date.now(), exp: Date.now() + 86400000 })).toString("base64url");
  const signature = Buffer.from(JWT_SECRET + header + body).toString("base64url");
  return `${header}.${body}.${signature}`;
}

export function verifyToken(token: string): { valid: boolean; expired?: boolean } {
  try {
    const [header, body, sig] = token.split(".");
    if (!header || !body || !sig) return { valid: false };
    const expectedSig = Buffer.from(JWT_SECRET + header + body).toString("base64url");
    if (sig !== expectedSig) return { valid: false };
    const payload = JSON.parse(Buffer.from(body, "base64url").toString()) as { exp?: number };
    if (payload.exp && Date.now() > payload.exp) return { valid: false, expired: true };
    return { valid: true };
  } catch {
    return { valid: false };
  }
}

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { username, password } = req.body as { username?: string; password?: string };

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required." });
  }

  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Invalid username or password." });
  }

  const token = createToken({ username, role: "admin" });
  return res.status(200).json({ token });
}
