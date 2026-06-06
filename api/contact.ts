import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";
import { getDb } from "./_lib/db";

function getTransporter() {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!user || !pass) throw new Error("SMTP_USER or SMTP_PASS env vars are not set");

  return nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 465,
    secure: true,       // SSL on port 465
    auth: { user, pass },
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 20000,
    tls: { rejectUnauthorized: false },
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // ── Parse & validate ──────────────────────────────────────────────────────
  const body = req.body as Record<string, unknown>;
  const name      = typeof body.name      === "string" ? body.name.trim()      : "";
  const email     = typeof body.email     === "string" ? body.email.trim()     : "";
  const phone     = typeof body.phone     === "string" ? body.phone.trim()     : "";
  const service   = typeof body.service   === "string" ? body.service.trim()   : "";
  const eventDate = typeof body.eventDate === "string" ? body.eventDate.trim() : "";
  const message   = typeof body.message   === "string" ? body.message.trim()   : "";

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email, and message are required." });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }

  const SMTP_USER   = process.env.SMTP_USER;
  const OWNER_EMAIL = process.env.OWNER_EMAIL;

  if (!SMTP_USER || !OWNER_EMAIL) {
    console.error("Missing env vars: SMTP_USER or OWNER_EMAIL");
    return res.status(500).json({ error: "Server configuration error." });
  }

  const formattedDate = eventDate
    ? new Date(eventDate).toLocaleDateString("en-CA", {
        year: "numeric", month: "long", day: "numeric",
      })
    : "Not specified";

  // ── Save to MongoDB ────────────────────────────────────────────────────────
  let dbSaved = false;
  try {
    const db = await getDb();
    await db.collection("contacts").insertOne({
      name,
      email: email.toLowerCase(),
      phone:     phone     || null,
      service:   service   || null,
      eventDate: eventDate || null,
      message,
      createdAt: new Date(),
      read: false,
    });
    dbSaved = true;
  } catch (err) {
    console.error("MongoDB save error:", err);
    // Continue — don't block the user because of a DB error
  }

  // ── Send emails ────────────────────────────────────────────────────────────
  let emailSent = false;
  try {
    const transporter = getTransporter();

    // Verify connection before sending
    await transporter.verify();

    const detailRows = [
      ["Name",         name],
      ["Email",        `<a href="mailto:${email}" style="color:#B76E79;text-decoration:none;">${email}</a>`],
      ["Phone",        phone    || "Not provided"],
      ["Service",      service  || "Not specified"],
      ["Event Date",   formattedDate],
    ].map(([label, value], i) => `
      <tr style="background:${i % 2 === 0 ? "#fff" : "#fdf9f6"};">
        <td style="padding:12px 16px;font-size:11px;text-transform:uppercase;letter-spacing:2px;color:#999;width:150px;border-bottom:1px solid #ece8e2;">${label}</td>
        <td style="padding:12px 16px;font-size:14px;color:#1a1a1a;border-bottom:1px solid #ece8e2;">${value}</td>
      </tr>`).join("");

    // ── 1. Notify owner ──────────────────────────────────────────────────────
    await transporter.sendMail({
      from:    `"MMM Studio Website" <${SMTP_USER}>`,
      to:      OWNER_EMAIL,
      replyTo: email,
      subject: `New Contact Inquiry from ${name} — MMM Studio`,
      html: `<!DOCTYPE html><html><head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#f8f4ef;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f4ef;padding:40px 20px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#fff;border-radius:4px;overflow:hidden;">
  <tr><td style="background:linear-gradient(135deg,#B76E79,#D6B98C);padding:32px 40px;text-align:center;">
    <h1 style="margin:0;font-family:Georgia,serif;font-weight:400;font-size:26px;color:#fff;letter-spacing:2px;">MMM Studio <em>by Moni</em></h1>
    <p style="margin:8px 0 0;font-size:11px;text-transform:uppercase;letter-spacing:4px;color:rgba(255,255,255,0.85);">New Contact Inquiry</p>
  </td></tr>
  <tr><td style="padding:40px;">
    <p style="margin:0 0 24px;font-size:15px;color:#555;line-height:1.6;">You have a new inquiry from the MMM Studio website:</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #ece8e2;border-radius:4px;overflow:hidden;">${detailRows}</table>
    <div style="margin-top:24px;border:1px solid #ece8e2;border-radius:4px;padding:20px;">
      <p style="margin:0 0 8px;font-size:11px;text-transform:uppercase;letter-spacing:2px;color:#999;">Message</p>
      <p style="margin:0;font-size:14px;color:#1a1a1a;line-height:1.7;white-space:pre-wrap;">${message}</p>
    </div>
    <div style="margin-top:32px;text-align:center;">
      <a href="mailto:${email}?subject=Re: Your inquiry — MMM Studio by Moni"
         style="display:inline-block;background:linear-gradient(135deg,#B76E79,#D6B98C);color:#fff;text-decoration:none;padding:14px 32px;border-radius:40px;font-size:11px;text-transform:uppercase;letter-spacing:3px;">
        Reply to ${name}
      </a>
    </div>
  </td></tr>
  <tr><td style="background:#f8f4ef;padding:20px 40px;text-align:center;border-top:1px solid #ece8e2;">
    <p style="margin:0;font-size:11px;letter-spacing:2px;color:#aaa;">MMM Studio by Moni · 3020 Danforth Ave Unit E, Toronto, ON</p>
  </td></tr>
</table>
</td></tr>
</table>
</body></html>`,
    });

    // ── 2. Confirm to client ─────────────────────────────────────────────────
    await transporter.sendMail({
      from:    `"MMM Studio by Moni" <${SMTP_USER}>`,
      to:      email,
      subject: `We received your message — MMM Studio by Moni`,
      html: `<!DOCTYPE html><html><head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#f8f4ef;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f4ef;padding:40px 20px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#fff;border-radius:4px;overflow:hidden;">
  <tr><td style="background:linear-gradient(135deg,#B76E79,#D6B98C);padding:40px;text-align:center;">
    <h1 style="margin:0;font-family:Georgia,serif;font-weight:400;font-size:30px;color:#fff;letter-spacing:2px;">MMM Studio <em>by Moni</em></h1>
    <p style="margin:10px 0 0;font-size:11px;text-transform:uppercase;letter-spacing:4px;color:rgba(255,255,255,0.85);">Toronto · Luxury Bridal Studio</p>
  </td></tr>
  <tr><td style="padding:48px 40px;">
    <h2 style="margin:0 0 16px;font-family:Georgia,serif;font-weight:400;font-size:24px;color:#1a1a1a;">Dear ${name},</h2>
    <p style="margin:0 0 16px;font-size:15px;color:#555;line-height:1.7;">
      Thank you for reaching out to MMM Studio by Moni. We've received your message and are delighted to hear from you.
    </p>
    <p style="margin:0 0 32px;font-size:15px;color:#555;line-height:1.7;">
      Moni will personally respond within <strong style="color:#1a1a1a;">24 hours</strong>.
    </p>
    <div style="background:#fdf9f6;border:1px solid #ece8e2;border-radius:4px;padding:24px;margin-bottom:32px;">
      <p style="margin:0 0 12px;font-size:11px;text-transform:uppercase;letter-spacing:3px;color:#B76E79;">Your Submission</p>
      ${service   ? `<p style="margin:0 0 8px;font-size:14px;color:#1a1a1a;"><strong>Service:</strong> ${service}</p>` : ""}
      ${eventDate ? `<p style="margin:0 0 8px;font-size:14px;color:#1a1a1a;"><strong>Event Date:</strong> ${formattedDate}</p>` : ""}
      <p style="margin:0;font-size:14px;color:#555;line-height:1.6;white-space:pre-wrap;"><strong style="color:#1a1a1a;">Message:</strong><br/>${message}</p>
    </div>
    <div style="height:1px;background:linear-gradient(90deg,transparent,#D6B98C,transparent);margin:0 0 28px;"></div>
    <ul style="margin:0 0 28px;padding:0 0 0 20px;font-size:14px;color:#555;line-height:2.2;">
      <li>📍 3020 Danforth Ave Unit E, Toronto, ON</li>
      <li>📞 <a href="tel:+14374102185" style="color:#B76E79;text-decoration:none;">+1 437-410-2185</a></li>
      <li>📸 <a href="https://instagram.com/kothamoni_themakeupartist" style="color:#B76E79;text-decoration:none;">@kothamoni_themakeupartist</a></li>
    </ul>
    <div style="text-align:center;">
      <a href="https://wa.me/14374102185"
         style="display:inline-block;background:linear-gradient(135deg,#B76E79,#D6B98C);color:#fff;text-decoration:none;padding:14px 32px;border-radius:40px;font-size:11px;text-transform:uppercase;letter-spacing:3px;">
        Message on WhatsApp
      </a>
    </div>
    <p style="margin:28px 0 0;font-family:Georgia,serif;font-style:italic;font-size:17px;color:#B76E79;text-align:center;">
      "Beauty is the silent language between a bride and her mirror."
    </p>
  </td></tr>
  <tr><td style="background:#f8f4ef;padding:24px 40px;text-align:center;border-top:1px solid #ece8e2;">
    <p style="margin:0 0 4px;font-size:11px;letter-spacing:3px;color:#aaa;">© ${new Date().getFullYear()} MMM Studio by Moni</p>
    <p style="margin:0;font-size:11px;color:#bbb;">3020 Danforth Ave Unit E, Toronto, ON, Canada</p>
  </td></tr>
</table>
</td></tr>
</table>
</body></html>`,
    });

    emailSent = true;
  } catch (err) {
    console.error("Email send error:", JSON.stringify(err, Object.getOwnPropertyNames(err as object)));
  }

  // ── Always return success if DB saved, warn if email failed ───────────────
  if (!dbSaved && !emailSent) {
    return res.status(500).json({ error: "Failed to process your request. Please try again." });
  }

  return res.status(200).json({ success: true, dbSaved, emailSent });
}
