// src/app/page.tsx
"use client";

import { useEffect, useState } from "react";
import { sdk } from "@farcaster/miniapp-sdk";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/lib/wagmi";
import styles from "./page.module.css";

export default function Page() {
  const { address, isConnected } = useAccount();
  const [txHash, setTxHash] = useState<string | undefined>();
  const [countdown, setCountdown] = useState<number>(0);

  // Gọi khi mini app đã sẵn sàng (tắt splash trong Farcaster)
  useEffect(() => {
    sdk.actions.ready();
  }, []);

  // đọc streak
  const {
    data: streak,
    refetch: refetchStreak,
    isLoading: loadingStreak,
  } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "streak",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  // đọc timeUntilNextGM (server-side, tính bằng giây)
  const {
    data: timeLeftRaw,
    refetch: refetchTimeLeft,
    isLoading: loadingTimeLeft,
  } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "timeUntilNextGM",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  // đọc lịch sử ngày checkin
  const {
    data: history,
    refetch: refetchHistory,
    isLoading: loadingHistory,
  } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "getCheckinHistory",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  // đồng bộ countdown local với giá trị từ contract & tự tick mỗi giây
  useEffect(() => {
    if (!timeLeftRaw) {
      setCountdown(0);
      return;
    }

    const initial = Number(timeLeftRaw);
    setCountdown(initial);

    if (initial === 0) return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeftRaw]);

  const { writeContractAsync, isPending } = useWriteContract();

  const handleGM = async () => {
    if (!address) return;
    const hash = await writeContractAsync({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "gm",
    });
    setTxHash(hash);
    // chờ 1-2s rồi refetch dữ liệu liên quan
    setTimeout(() => {
      refetchStreak();
      refetchTimeLeft();
      refetchHistory();
    }, 2000);
  };

  const formatSeconds = (total: number) => {
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;
    return [h, m, s]
      .map((v) => v.toString().padStart(2, "0"))
      .join(":");
  };

  const historyArray = (history as readonly bigint[] | undefined) ?? [];

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center p-6 gap-6">
      <div className={styles.ctn}>
        <h1 className="text-2xl font-bold mt-4">
          GM Base & Farcaster <span>Free</span>
        </h1>

       

        {isConnected && (
          <div className="mt-6 space-y-4 text-sm">
            {/* STREAK */}
            <p className="streak">
              ⚡ Day Streak:{" "}
              {loadingStreak ? "Loading..." : Number(streak || 0)} 
            </p>

            {/* COUNTDOWN */}
            <div className="mt-2">
              
              {loadingTimeLeft ? (
                <p>Loading...</p>
              ) : countdown === 0 ? (
                 <ConnectButton />
              ) : (
                <p className="text-yellow-300">
                  Next GM: {formatSeconds(countdown)}
                </p>
              )}
            </div>

            {/* BUTTON GM */}
            <button
              onClick={handleGM}
              disabled={isPending || countdown > 0}
              className="mt-2 px-4 py-2 rounded-lg bg-yellow-400 text-black font-semibold disabled:opacity-60"
            >
              {isPending ? "Loading..." : "GM today ☀️"}
            </button>

            {txHash && (
              <p className="mt-3 break-all">
                Tx:{" "}
                <a
                  className="underline text-sky-400"
                  href={`https://basescan.org/tx/${txHash}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  View Basescan
                </a>
              </p>
            )}

            {/* LỊCH SỬ CHECKIN (ở dưới cùng) */}
            <div className="mt-6 pt-4 border-t border-zinc-800">
              <p className="font-semibold mb-2">History check-in:</p>
              {loadingHistory ? (
                <p>Loading...</p>
              ) : historyArray.length === 0 ? (
                <p>No history available.</p>
              ) : (
                <ul className="space-y-1 max-h-40 overflow-y-auto text-xs">
                  {historyArray
                    .slice()
                    .reverse() // cho ngày mới nhất lên đầu
                    .map((day, idx) => {
                      const timestampMs = Number(day) * 86400 * 1000;
                      const date = new Date(timestampMs);
                      return (
                        <li key={idx} className="flex justify-between">
                          <span>Day #{historyArray.length - idx}</span>
                          <span>
                            {date.toLocaleDateString("vi-VN", {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                            })}
                          </span>
                        </li>
                      );
                    })}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
