import { NextResponse } from "next/server";

export async function GET() {
  // TODO: Return tracking data only for an order the current user may access.
  return NextResponse.json({ error: "Not implemented" }, { status: 501 });
}
