import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email } = await request.json();

  // Log for now — wire to Supabase when ready
  console.log(`[waitlist] ${email}`);

  return NextResponse.json({ ok: true });
}
