// app/frames/gm/route.tsx
// @ts-nocheck
import { createFrames } from "frames.js/next";
import { ImageResponse } from "next/og";

export const runtime = "edge";

const frames = createFrames({
  basePath: "/frames",
});

const handler = frames(async (ctx) => {
  return {
    image: new ImageResponse(
      (
        <div
          style={{
            fontSize: 40,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          GM onchain 🌞
        </div>
      ),
      { width: 600, height: 600 }
    ),
    buttons: [
      {
        label: "GM 🌞",
        action: "tx",                // transaction button
        target: "/frames/gm/txdata", // route lấy transaction data
      },
    ],
  };
});

export const GET = handler;
export const POST = handler;
