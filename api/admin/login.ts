import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createToken } from "../_lib/auth";

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const ADMIN_USERNAME = process.env.ADMIN_USERNAME ?? "admin";
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "mmmstudio2024";

  const { username, password } = req.body as {
    username?: string;
    password?: string;
  };

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required." });
  }

  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Invalid username or password." });
  }

  const token = createToken({ username, role: "admin" });
  return res.status(200).json({ token });
}
