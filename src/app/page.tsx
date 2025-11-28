// src/app/page.tsx
"use client";

import { useEffect, useState } from "react";
import { sdk } from "@farcaster/miniapp-sdk";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/lib/wagmi";

export default function Page() {
  const { address, isConnected } = useAccount();
  const [txHash, setTxHash] = useState<string | undefined>();

  // Gọi khi mini app đã sẵn sàng (tắt splash trong Farcaster)
  useEffect(() => {
    sdk.actions.ready();
  }, []);

  // đọc streak
  const { data: streak, refetch, isLoading: loadingStreak } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "streak",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  const { writeContractAsync, isPending } = useWriteContract();

  const handleGM = async () => {
    if (!address) return;
    const hash = await writeContractAsync({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "gm",
    });
    setTxHash(hash);
    // chờ 1-2s rồi refetch streak
    setTimeout(() => refetch(), 2000);
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center p-6 gap-6">
      <h1 className="text-2xl font-bold mt-4">
        GM Daily – Base & Farcaster ☀️
      </h1>

      <ConnectButton />

      {!isConnected && (
        <p className="mt-4 text-sm text-zinc-400">
          Hãy kết nối ví để bắt đầu.
        </p>
      )}

      {isConnected && (
        <div className="mt-6 space-y-3 text-sm">
          <p>Địa chỉ: {address}</p>
          <p>
            Streak hiện tại:{" "}
            {loadingStreak ? "Đang tải..." : Number(streak || 0) + " ngày"}
          </p>

          <button
            onClick={handleGM}
            disabled={isPending}
            className="mt-4 px-4 py-2 rounded-lg bg-yellow-400 text-black font-semibold disabled:opacity-60"
          >
            {isPending ? "Đang gửi..." : "GM hôm nay ☀️"}
          </button>

          {txHash && (
            <p className="mt-3">
              Tx:{" "}
              <a
                className="underline text-sky-400"
                href={`https://basescan.org/tx/${txHash}`}
                target="_blank"
              >
                Xem trên Basescan
              </a>
            </p>
          )}
        </div>
      )}
    </main>
  );
}
