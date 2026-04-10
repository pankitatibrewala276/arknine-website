import { NextRequest, NextResponse } from "next/server";

const RATE_LIMIT_MAP = new Map<string, { count: number; reset: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = RATE_LIMIT_MAP.get(ip);

  if (!entry || now > entry.reset) {
    RATE_LIMIT_MAP.set(ip, { count: 1, reset: now + RATE_LIMIT_WINDOW });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, message: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // Parse body
    const body = await req.json();
    const email = typeof body?.email === "string" ? body.email.trim() : "";

    // Validate
    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Enter a valid email address." },
        { status: 400 }
      );
    }

    // Env check — key is base64-encoded JSON, extract the raw api_key
    const rawKey = process.env.BREVO_API_KEY;
    const listId = Number(process.env.BREVO_NEWSLETTER_LIST_ID);
    let apiKey = rawKey || "";

    try {
      const decoded = JSON.parse(Buffer.from(apiKey, "base64").toString());
      if (decoded.api_key) apiKey = decoded.api_key;
    } catch {
      // Not base64 — use as-is (raw key)
    }

    if (!apiKey || !listId) {
      console.error("Missing BREVO_API_KEY or BREVO_NEWSLETTER_LIST_ID");
      return NextResponse.json(
        { success: false, message: "Service temporarily unavailable." },
        { status: 503 }
      );
    }

    // Call Brevo
    const brevoRes = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        email,
        listIds: [listId],
        updateEnabled: true,
      }),
    });

    if (!brevoRes.ok) {
      const data = await brevoRes.json().catch(() => null);
      const msg = data?.message || "Failed to subscribe.";

      // Brevo returns 400 for duplicate contacts with updateEnabled — treat as success
      if (brevoRes.status === 400 && msg.toLowerCase().includes("already")) {
        return NextResponse.json({
          success: true,
          message: "You're already subscribed.",
        });
      }

      return NextResponse.json(
        { success: false, message: msg },
        { status: brevoRes.status }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Subscribed successfully.",
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
