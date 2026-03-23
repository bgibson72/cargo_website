import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name        = (formData.get("name")        as string | null) ?? "";
    const email       = (formData.get("email")       as string | null) ?? "";
    const device      = (formData.get("device")      as string | null) ?? "";
    const os          = (formData.get("os")           as string | null) ?? "";
    const description = (formData.get("description") as string | null) ?? "";
    const screenshot  = formData.get("screenshot") as File | null;

    // Basic server-side validation
    if (!email || !device || !os || !description) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    // Build attachment if screenshot provided
    const attachments: nodemailer.SendMailOptions["attachments"] = [];
    if (screenshot && screenshot.size > 0) {
      const buffer = Buffer.from(await screenshot.arrayBuffer());
      attachments.push({
        filename: screenshot.name || "screenshot.png",
        content: buffer,
        contentType: screenshot.type || "image/png",
      });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.mail.me.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SUPPORT_EMAIL_USER,
        pass: process.env.SUPPORT_EMAIL_PASS, // iCloud app-specific password
      },
    });

    const html = `
      <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;color:#1C0F06">
        <div style="background:#C8752E;padding:24px 32px;border-radius:12px 12px 0 0">
          <h1 style="margin:0;color:#fff;font-size:22px">📦 Cargo Support Request</h1>
        </div>
        <div style="background:#F0EAE0;padding:32px;border-radius:0 0 12px 12px;border:1px solid #D4C4B0">
          <table style="width:100%;border-collapse:collapse">
            <tr>
              <td style="padding:8px 0;font-weight:600;color:#7A5030;width:120px">Name</td>
              <td style="padding:8px 0">${name || "<em>Not provided</em>"}</td>
            </tr>
            <tr style="border-top:1px solid #D4C4B0">
              <td style="padding:8px 0;font-weight:600;color:#7A5030">Email</td>
              <td style="padding:8px 0"><a href="mailto:${email}" style="color:#C8752E">${email}</a></td>
            </tr>
            <tr style="border-top:1px solid #D4C4B0">
              <td style="padding:8px 0;font-weight:600;color:#7A5030">Device</td>
              <td style="padding:8px 0">${device}</td>
            </tr>
            <tr style="border-top:1px solid #D4C4B0">
              <td style="padding:8px 0;font-weight:600;color:#7A5030">OS Version</td>
              <td style="padding:8px 0">${os}</td>
            </tr>
          </table>
          <div style="margin-top:24px;padding-top:24px;border-top:1px solid #D4C4B0">
            <p style="margin:0 0 10px;font-weight:600;color:#7A5030">Issue Description</p>
            <p style="margin:0;white-space:pre-wrap;line-height:1.6">${description.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
          </div>
          ${attachments.length ? '<p style="margin-top:20px;color:#7A5030;font-size:13px">📎 Screenshot attached.</p>' : ""}
        </div>
        <p style="text-align:center;font-size:12px;color:#9A7255;margin-top:16px">
          Sent via cargowebsite-xi.vercel.app support form
        </p>
      </div>
    `;

    await transporter.sendMail({
      from: `"Cargo Support" <${process.env.SUPPORT_EMAIL_USER}>`,
      to:   "bryan.j.gibson@icloud.com",
      replyTo: email,
      subject: `Cargo Support: ${device} / ${os}${name ? ` — ${name}` : ""}`,
      html,
      attachments,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Support email error:", err);
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
  }
}
