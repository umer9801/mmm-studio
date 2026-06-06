import type { VercelRequest, VercelResponse } from "@vercel/node";
import { MongoClient } from "mongodb";
import nodemailer from "nodemailer";

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  const results: Record<string, string> = {
    timestamp: new Date().toISOString(),
    node_version: process.version,
    MONGODB_URI: process.env.MONGODB_URI ? "SET ✓" : "MISSING ✗",
    SMTP_USER:   process.env.SMTP_USER   ? "SET ✓" : "MISSING ✗",
    SMTP_PASS:   process.env.SMTP_PASS   ? "SET ✓" : "MISSING ✗",
    OWNER_EMAIL: process.env.OWNER_EMAIL ? "SET ✓" : "MISSING ✗",
    ADMIN_USERNAME: process.env.ADMIN_USERNAME ? "SET ✓" : "MISSING ✗",
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD ? "SET ✓" : "MISSING ✗",
    JWT_SECRET:  process.env.JWT_SECRET  ? "SET ✓" : "MISSING ✗",
    mongo_connection: "PENDING",
    smtp_connection:  "PENDING",
  };

  // Test MongoDB
  const uri = process.env.MONGODB_URI;
  if (uri) {
    try {
      const client = new MongoClient(uri, { serverSelectionTimeoutMS: 8000, connectTimeoutMS: 8000 });
      await client.connect();
      await client.db("admin").command({ ping: 1 });
      await client.close();
      results.mongo_connection = "SUCCESS ✓";
    } catch (e) {
      results.mongo_connection = "FAILED ✗ — " + (e as Error).message;
    }
  } else {
    results.mongo_connection = "SKIPPED (no URI)";
  }

  // Test SMTP
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  if (smtpUser && smtpPass) {
    try {
      const t = nodemailer.createTransport({
        host: "smtp.hostinger.com", port: 465, secure: true,
        auth: { user: smtpUser, pass: smtpPass },
        tls: { rejectUnauthorized: false },
        connectionTimeout: 8000,
      });
      await t.verify();
      results.smtp_connection = "SUCCESS ✓";
    } catch (e) {
      results.smtp_connection = "FAILED ✗ — " + (e as Error).message;
    }
  } else {
    results.smtp_connection = "SKIPPED (no credentials)";
  }

  return res.status(200).json(results);
}
