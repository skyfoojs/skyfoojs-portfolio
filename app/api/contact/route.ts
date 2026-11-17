import { NextResponse } from "next/server";
import { validateContact, type ContactInput } from "@/lib/contact";

/**
 * Sends contact-form messages to the site owner via Resend (https://resend.com).
 * Required env: RESEND_API_KEY. Optional: CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL.
 */

const DEFAULT_TO = "skyfoojs@gmail.com";
// Resend's shared sender works without a verified domain, but can only
// deliver to the email that owns the Resend account.
const DEFAULT_FROM = "Portfolio Contact <onboarding@resend.dev>";

// Best-effort per-instance rate limit: 5 messages / 10 min / IP.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 1000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

function readString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const raw = body as Record<string, unknown>;

  // Honeypot: real users never fill this hidden field. Pretend success.
  if (readString(raw.company).trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const input: ContactInput = {
    name: readString(raw.name),
    email: readString(raw.email),
    message: readString(raw.message),
  };
  const errors = validateContact(input);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: "Please fix the highlighted fields.", errors }, { status: 422 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Too many messages. Please try again later." }, { status: 429 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set");
    return NextResponse.json(
      { error: "The contact form isn't set up yet. Please email me directly." },
      { status: 503 },
    );
  }

  const name = input.name.trim().replace(/[\r\n]+/g, " ");
  const email = input.email.trim();
  const message = input.message.trim();

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM,
      to: [process.env.CONTACT_TO_EMAIL || DEFAULT_TO],
      reply_to: email,
      subject: `Portfolio message from ${name}`,
      // Plain text only, so user input is never rendered as HTML.
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    }),
  });

  if (!res.ok) {
    console.error(`[contact] Resend responded with ${res.status}`);
    return NextResponse.json(
      { error: "Your message couldn't be sent. Please email me directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
