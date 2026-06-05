import type { VercelRequest, VercelResponse } from "@vercel/node";
import { MongoClient, ObjectId } from "mongodb";
import { verifyToken } from "../../login";

let client: MongoClient | null = null;

async function getDb() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI env var is not set");
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }
  return client.db("mmm-studio");
}

function authenticate(req: VercelRequest): boolean {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) return false;
  return verifyToken(auth.slice(7)).valid;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!authenticate(req)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id } = req.query as { id: string };

  if (!id || !ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  try {
    const db = await getDb();
    await db.collection("contacts").deleteOne({ _id: new ObjectId(id) });
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Delete error:", err);
    return res.status(500).json({ error: "Failed to delete" });
  }
}
