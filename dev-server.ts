/**
 * Local development API server — mirrors Vercel serverless functions.
 * Run via: npx tsx dev-server.ts  (or npm run dev)
 */

// Load .env FIRST before any other imports that might read process.env
import { config } from "dotenv";
config(); // loads .env into process.env synchronously

import express from "express";
import cors from "cors";
import type { Request, Response } from "express";

// ── Dynamic imports so env vars are available when modules initialize ────────
const { default: contactHandler } = await import("./api/contact.js");
const { default: loginHandler } = await import("./api/admin/login.js");
const { default: contactsHandler } = await import("./api/admin/contacts.js");
const { default: readHandler } = await import("./api/admin/contacts/[id]/read.js");
const { default: deleteHandler } = await import("./api/admin/contacts/[id]/index.js");

// ── App setup ────────────────────────────────────────────────────────────────
type VercelHandler = (req: Request, res: Response) => Promise<void> | void;

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

// Wrap handler so express route params become part of req.query (Vercel style)
function route(handler: VercelHandler) {
  return async (req: Request, res: Response) => {
    Object.defineProperty(req, "query", {
      value: { ...req.query, ...req.params },
      writable: true,
      configurable: true,
    });
    await handler(req, res);
  };
}

// ── Routes ───────────────────────────────────────────────────────────────────
app.post("/api/contact", route(contactHandler as VercelHandler));
app.post("/api/admin/login", route(loginHandler as VercelHandler));
app.get("/api/admin/contacts", route(contactsHandler as VercelHandler));
app.patch("/api/admin/contacts/:id/read", route(readHandler as VercelHandler));
app.delete("/api/admin/contacts/:id", route(deleteHandler as VercelHandler));

// ── Start ────────────────────────────────────────────────────────────────────
const PORT = Number(process.env.API_PORT) || 3001;
app.listen(PORT, () => {
  console.log(`\n🚀 API dev server → http://localhost:${PORT}\n`);
  console.log("  POST   /api/contact");
  console.log("  POST   /api/admin/login");
  console.log("  GET    /api/admin/contacts");
  console.log("  PATCH  /api/admin/contacts/:id/read");
  console.log("  DELETE /api/admin/contacts/:id\n");

  // Warn if critical env vars are missing
  const required = ["MONGODB_URI", "SMTP_USER", "SMTP_PASS", "OWNER_EMAIL"];
  const missing = required.filter((k) => !process.env[k]);
  if (missing.length) {
    console.warn(`⚠  Missing env vars: ${missing.join(", ")}`);
    console.warn("   Create a .env file — see .env.example\n");
  } else {
    console.log("✓  All required env vars loaded\n");
  }
});
