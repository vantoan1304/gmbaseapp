// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "GM Daily – Base & Farcaster",
  description: "Mini app GM streak trên Base & Farcaster",
  other: {
    "fc:miniapp": `{
      "version": "1",
      "imageUrl": "https://gmbaseapp-xx84.vercel.app/5050.png",
      "button": {
        "title": "Open GMBase",
        "action": {
          "type": "launch_frame",
          "name": "GMBase",
          "url": "https://gmbaseapp-xx84.vercel.app/",
          "splashImageUrl": "https://gmbaseapp-xx84.vercel.app/5050.png",
          "splashBackgroundColor": "#000000"
        }
      }
    }`
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
