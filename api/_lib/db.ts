/**
 * Shared MongoDB connection for Vercel API functions.
 */
import { MongoClient } from "mongodb";

let client: MongoClient | null = null;

export async function getDb() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI environment variable is not set");
  if (!client) {
    client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 8000,
      connectTimeoutMS: 8000,
      socketTimeoutMS: 10000,
      // Force direct SRV resolution for Vercel compatibility
      maxPoolSize: 1,
    });
    await client.connect();
  }
  return client.db("mmm-studio");
}
