import { NextResponse } from "next/server";

export async function POST() {
  // TODO: Validate provider webhook and update shipment status safely.
  return NextResponse.json({ error: "Not implemented" }, { status: 501 });
}
