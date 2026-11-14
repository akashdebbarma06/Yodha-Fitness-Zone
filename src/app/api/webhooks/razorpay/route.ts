import { NextResponse } from "next/server";

export async function POST() {
  // TODO: Verify webhook signature using the raw request body; make processing idempotent.
  return NextResponse.json({ error: "Not implemented" }, { status: 501 });
}
