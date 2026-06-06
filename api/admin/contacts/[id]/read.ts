import type { VercelRequest, VercelResponse } from "@vercel/node";
import { ObjectId } from "mongodb";
import { authenticate } from "../../../_lib/auth";
import { getDb } from "../../../_lib/db";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "PATCH, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.status(200).end();

  if (!authenticate(req.headers.authorization)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method !== "PATCH") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const id = req.query.id as string;
  if (!id || !ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  try {
    const db = await getDb();
    await db
      .collection("contacts")
      .updateOne({ _id: new ObjectId(id) }, { $set: { read: true } });
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Mark read error:", err);
    return res.status(500).json({ error: "Failed to update" });
  }
}
