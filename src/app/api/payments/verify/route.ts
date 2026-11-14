import { NextResponse } from "next/server";

export async function POST() {
  // TODO: Verify Razorpay payment signature server-side.
  return NextResponse.json({ error: "Not implemented" }, { status: 501 });
}
