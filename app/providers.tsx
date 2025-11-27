// app/providers.tsx
"use client";

import { ReactNode } from "react";
import { WagmiConfig } from "wagmi";
import { http } from "viem";
import { base } from "viem/chains";
import {
  RainbowKitProvider,
  getDefaultConfig,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID!;
const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL!;

const config = getDefaultConfig({
  appName: "GM Base App",
  projectId,
  chains: [base],
  transports: {
    [base.id]: http(rpcUrl),
  },
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiConfig config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiConfig>
  );
}
