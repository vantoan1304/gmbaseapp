import { NextRequest, NextResponse } from "next/server";
import { frameAction } from "@farcaster/actions";
import { viem } from "@farcaster/actions/viem";
import { gmAbi } from "@/lib/abi";
import { base } from "viem/chains";

export async function POST(req: NextRequest) {
  const ctx = await frameAction(req, {
    onchain: viem({
      chain: base,
      contractAddress: process.env.NEXT_PUBLIC_GM_CONTRACT_ADDRESS!,
      abi: gmAbi,
      functionName: "gm",
    }),
  });

  return NextResponse.json({
    ok: true,
    tx: ctx.transactionId,
  });
}
