// app/frames/gm/txdata/route.tsx
// @ts-nocheck
import { createFrames } from "frames.js/next";
import { transaction } from "frames.js/core";
import { encodeFunctionData } from "viem";
import { GM_ABI } from "@/lib/gmAbi";

export const runtime = "edge";

const CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_GM_CONTRACT_ADDRESS as `0x${string}`;

const frames = createFrames({
  basePath: "/frames",
});

const handler = frames(async (ctx) => {
  console.log("TX FRAME CTX:", ctx);

  const data = encodeFunctionData({
    abi: GM_ABI,
    functionName: "gm",
    args: [],
  });

  return transaction({
    chainId: "eip155:8453", // Base mainnet
    method: "eth_sendTransaction",
    params: {
      abi: GM_ABI,
      to: CONTRACT_ADDRESS,
      data,
      value: "0",
    },
  });
});

export const POST = handler;
