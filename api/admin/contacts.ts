import type { VercelRequest, VercelResponse } from "@vercel/node";
import { MongoClient } from "mongodb";
import { verifyToken } from "./login";

const MONGODB_URI = process.env.MONGODB_URI!;

let client: MongoClient | null = null;

async function getDb() {
  if (!client) {
    client = new MongoClient(MONGODB_URI);
    await client.connect();
  }
  return client.db("mmm-studio");
}

function authenticate(req: VercelRequest): boolean {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) return false;
  const token = auth.slice(7);
  return verifyToken(token).valid;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!authenticate(req)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const db = await getDb();
    const contacts = await db
      .collection("contacts")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return res.status(200).json(contacts);
  } catch (err) {
    console.error("Contacts API error:", err);
    return res.status(500).json({ error: "Failed to fetch contacts" });
  }
}
