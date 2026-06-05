import type { VercelRequest, VercelResponse } from "@vercel/node";
import { MongoClient } from "mongodb";
import nodemailer from "nodemailer";

const MONGODB_URI = process.env.MONGODB_URI!;
const SMTP_USER = process.env.SMTP_USER!; // info@solvixcore.com
const SMTP_PASS = process.env.SMTP_PASS!; // SOLVIXcore1@
const OWNER_EMAIL = process.env.OWNER_EMAIL!; // mmmstudiobymonica@gmail.com

let client: MongoClient | null = null;

async function getDb() {
  if (!client) {
    client = new MongoClient(MONGODB_URI);
    await client.connect();
  }
  return client.db("mmm-studio");
}

const transporter = nodemailer.createTransport({
  host: "mail.solvixcore.com",
  port: 465,
  secure: true,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, phone, service, eventDate, message } = req.body as {
    name?: string;
    email?: string;
    phone?: string;
    service?: string;
    eventDate?: string;
    message?: string;
  };

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email, and message are required." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }

  try {
    // Save to MongoDB
    const db = await getDb();
    const doc = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || null,
      service: service?.trim() || null,
      eventDate: eventDate || null,
      message: message.trim(),
      createdAt: new Date(),
      read: false,
    };
    await db.collection("contacts").insertOne(doc);

    const formattedDate = eventDate
      ? new Date(eventDate).toLocaleDateString("en-CA", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "Not specified";

    // Email to owner — notify about new inquiry
    await transporter.sendMail({
      from: `"MMM Studio Website" <${SMTP_USER}>`,
      to: OWNER_EMAIL,
      replyTo: email,
      subject: `New Contact Inquiry from ${name} — MMM Studio`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Inquiry — MMM Studio</title>
</head>
<body style="margin:0;padding:0;background:#f8f4ef;font-family:'Inter',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f4ef;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:4px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#B76E79,#D6B98C);padding:32px 40px;text-align:center;">
              <h1 style="margin:0;font-family:Georgia,serif;font-weight:400;font-size:28px;color:#ffffff;letter-spacing:2px;">
                MMM Studio <span style="font-style:italic;">by Moni</span>
              </h1>
              <p style="margin:8px 0 0;font-size:11px;text-transform:uppercase;letter-spacing:4px;color:rgba(255,255,255,0.85);">
                New Contact Inquiry
              </p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              <p style="margin:0 0 24px;font-size:15px;color:#555;line-height:1.6;">
                You have received a new message from the MMM Studio website. Here are the details:
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #ece8e2;border-radius:4px;overflow:hidden;">
                ${[
                  ["Name", name],
                  ["Email", `<a href="mailto:${email}" style="color:#B76E79;text-decoration:none;">${email}</a>`],
                  ["Phone", phone || "Not provided"],
                  ["Service of Interest", service || "Not specified"],
                  ["Event Date", formattedDate],
                ].map(([label, value], i) => `
                <tr style="background:${i % 2 === 0 ? "#fff" : "#fdf9f6"};">
                  <td style="padding:12px 16px;font-size:11px;text-transform:uppercase;letter-spacing:2px;color:#999;width:160px;border-bottom:1px solid #ece8e2;">${label}</td>
                  <td style="padding:12px 16px;font-size:14px;color:#1a1a1a;border-bottom:1px solid #ece8e2;">${value}</td>
                </tr>`).join("")}
              </table>
              <div style="margin-top:24px;border:1px solid #ece8e2;border-radius:4px;padding:20px;">
                <p style="margin:0 0 8px;font-size:11px;text-transform:uppercase;letter-spacing:2px;color:#999;">Message</p>
                <p style="margin:0;font-size:14px;color:#1a1a1a;line-height:1.7;white-space:pre-wrap;">${message.trim()}</p>
              </div>
              <div style="margin-top:32px;text-align:center;">
                <a href="mailto:${email}?subject=Re: Your inquiry — MMM Studio by Moni"
                   style="display:inline-block;background:linear-gradient(135deg,#B76E79,#D6B98C);color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:40px;font-size:11px;text-transform:uppercase;letter-spacing:3px;">
                  Reply to ${name}
                </a>
              </div>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background:#f8f4ef;padding:24px 40px;text-align:center;border-top:1px solid #ece8e2;">
              <p style="margin:0;font-size:11px;text-transform:uppercase;letter-spacing:2px;color:#aaa;">
                MMM Studio by Moni &nbsp;·&nbsp; 3020 Danforth Ave Unit E, Toronto, ON
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
    });

    // Confirmation email to the client
    await transporter.sendMail({
      from: `"MMM Studio by Moni" <${SMTP_USER}>`,
      to: email,
      subject: `We received your message — MMM Studio by Moni`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Confirmation — MMM Studio</title>
</head>
<body style="margin:0;padding:0;background:#f8f4ef;font-family:'Inter',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f4ef;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:4px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#B76E79,#D6B98C);padding:40px;text-align:center;">
              <h1 style="margin:0;font-family:Georgia,serif;font-weight:400;font-size:32px;color:#ffffff;letter-spacing:2px;">
                MMM Studio <span style="font-style:italic;">by Moni</span>
              </h1>
              <p style="margin:10px 0 0;font-size:11px;text-transform:uppercase;letter-spacing:4px;color:rgba(255,255,255,0.85);">
                Toronto · Luxury Bridal Studio
              </p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:48px 40px;">
              <h2 style="margin:0 0 16px;font-family:Georgia,serif;font-weight:400;font-size:26px;color:#1a1a1a;">
                Dear ${name},
              </h2>
              <p style="margin:0 0 20px;font-size:15px;color:#555;line-height:1.7;">
                Thank you for reaching out to MMM Studio by Moni. We've received your message and are truly delighted to hear from you.
              </p>
              <p style="margin:0 0 32px;font-size:15px;color:#555;line-height:1.7;">
                Moni will personally review your inquiry and respond within <strong style="color:#1a1a1a;">24 hours</strong> to discuss how we can make your vision come to life.
              </p>

              <!-- Summary Box -->
              <div style="background:#fdf9f6;border:1px solid #ece8e2;border-radius:4px;padding:24px;margin-bottom:32px;">
                <p style="margin:0 0 16px;font-size:11px;text-transform:uppercase;letter-spacing:3px;color:#B76E79;">Your Submission Summary</p>
                ${service ? `<p style="margin:0 0 8px;font-size:14px;color:#1a1a1a;"><strong>Service:</strong> ${service}</p>` : ""}
                ${eventDate ? `<p style="margin:0 0 8px;font-size:14px;color:#1a1a1a;"><strong>Event Date:</strong> ${formattedDate}</p>` : ""}
                <p style="margin:0;font-size:14px;color:#555;line-height:1.6;"><strong style="color:#1a1a1a;">Your Message:</strong><br />${message.trim()}</p>
              </div>

              <div style="height:1px;background:linear-gradient(90deg,transparent,#D6B98C,transparent);margin:0 0 32px;"></div>

              <p style="margin:0 0 12px;font-size:14px;color:#555;line-height:1.6;">
                In the meantime, feel free to explore our work on Instagram or reach out directly:
              </p>
              <ul style="margin:0 0 32px;padding:0 0 0 20px;font-size:14px;color:#555;line-height:2;">
                <li>📍 3020 Danforth Ave Unit E, Toronto, ON</li>
                <li>📞 <a href="tel:+14374102185" style="color:#B76E79;text-decoration:none;">+1 437-410-2185</a></li>
                <li>📸 <a href="https://instagram.com/kothamoni_themakeupartist" style="color:#B76E79;text-decoration:none;">@kothamoni_themakeupartist</a></li>
              </ul>

              <div style="text-align:center;">
                <a href="https://wa.me/14374102185"
                   style="display:inline-block;background:linear-gradient(135deg,#B76E79,#D6B98C);color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:40px;font-size:11px;text-transform:uppercase;letter-spacing:3px;margin-bottom:12px;">
                  Message on WhatsApp
                </a>
              </div>

              <p style="margin:32px 0 0;font-family:Georgia,serif;font-style:italic;font-size:18px;color:#B76E79;text-align:center;">
                "Beauty is the silent language between a bride and her mirror."
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background:linear-gradient(180deg,#f8f4ef,#efe7dd);padding:28px 40px;text-align:center;border-top:1px solid #ece8e2;">
              <p style="margin:0 0 6px;font-size:11px;text-transform:uppercase;letter-spacing:3px;color:#aaa;">
                © ${new Date().getFullYear()} MMM Studio by Moni
              </p>
              <p style="margin:0;font-size:11px;color:#bbb;">
                3020 Danforth Ave Unit E, Toronto, ON, Canada
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return res.status(500).json({ error: "Failed to process your request. Please try again." });
  }
}
