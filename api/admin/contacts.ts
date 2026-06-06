import type { VercelRequest, VercelResponse } from "@vercel/node";
import { MongoClient } from "mongodb";

function verifyToken(token: string): boolean {
  try {
    const secret = process.env.JWT_SECRET ?? "mmm-studio-secret-key-2024";
    const parts = token.split(".");
    if (parts.length !== 3) return false;
    const [header, body, sig] = parts;
    const expected = Buffer.from(secret + header + body).toString("base64url");
    if (sig !== expected) return false;
    const payload = JSON.parse(Buffer.from(body, "base64url").toString()) as { exp?: number };
    if (payload.exp && Date.now() > payload.exp) return false;
    return true;
  } catch { return false; }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.status(200).end();

  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ") || !verifyToken(auth.slice(7)))
    return res.status(401).json({ error: "Unauthorized" });

  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) return res.status(500).json({ error: "MONGODB_URI not configured" });

  try {
    const client = new MongoClient(MONGODB_URI, { serverSelectionTimeoutMS: 8000, connectTimeoutMS: 8000 });
    await client.connect();
    const contacts = await client.db("mmm-studio").collection("contacts").find({}).sort({ createdAt: -1 }).toArray();
    await client.close();
    return res.status(200).json(contacts);
  } catch (err) {
    console.error("Contacts fetch error:", (err as Error).message);
    return res.status(500).json({ error: "Failed to fetch contacts: " + (err as Error).message });
  }
}
