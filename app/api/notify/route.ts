import { appendFile, mkdir } from "node:fs/promises";
import { join } from "node:path";

/**
 * Launch sign-ups.
 * Production: set SUPABASE_URL and SUPABASE_KEY (the project's publishable/anon key is enough: the table
 * only allows inserts through it, see supabase/schema.sql; the service role key also works).
 * Development without those: rows are appended to .data/signups.jsonl.
 */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }
  // spam trap filled in: pretend it worked
  if (clean(body.company, 200)) return Response.json({ ok: true });

  const row = {
    name: clean(body.name, 120),
    email: clean(body.email, 254).toLowerCase(),
    city: clean(body.city, 120),
    user_agent: clean(req.headers.get("user-agent"), 300),
  };
  if (!row.name || !row.city || !EMAIL.test(row.email)) return Response.json({ error: "Missing or invalid fields" }, { status: 422 });

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  const table = process.env.SUPABASE_TABLE || "bizmo_launch_signups";

  if (url && key) {
    const r = await fetch(`${url.replace(/\/$/, "")}/rest/v1/${table}`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(row),
    });
    // 409: this email is already on the list, which is fine
    if (!r.ok && r.status !== 409) {
      console.error("notify: supabase insert failed", r.status, await r.text());
      return Response.json({ error: "Could not save" }, { status: 502 });
    }
    return Response.json({ ok: true });
  }

  if (process.env.NODE_ENV === "production") {
    console.error("notify: SUPABASE_URL / SUPABASE_KEY are not set");
    return Response.json({ error: "Sign-up storage is not configured" }, { status: 503 });
  }
  const dir = join(process.cwd(), ".data");
  await mkdir(dir, { recursive: true });
  await appendFile(join(dir, "signups.jsonl"), JSON.stringify({ ...row, created_at: new Date().toISOString() }) + "\n");
  return Response.json({ ok: true, stored: "local" });
}
