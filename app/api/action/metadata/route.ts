import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    type: "action",
    icon: "🌞",
    title: "GM Daily Check-in",
    description: "Gửi GM onchain bằng ví của bạn",
  });
}
