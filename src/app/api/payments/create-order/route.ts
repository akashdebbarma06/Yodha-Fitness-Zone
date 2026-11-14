import { NextResponse } from "next/server";

export async function POST() {
  // TODO: Authenticate user, validate cart and calculate total on the server.
  return NextResponse.json({ error: "Not implemented" }, { status: 501 });
}
