import { NextResponse } from "next/server";

export async function POST() {
  // TODO: Require admin authorization and a paid/eligible order.
  return NextResponse.json({ error: "Not implemented" }, { status: 501 });
}
