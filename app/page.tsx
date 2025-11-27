// app/page.tsx
"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { GM_ABI } from "@/lib/gmAbi";
import { useEffect, useState } from "react";

const CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_GM_CONTRACT_ADDRESS as `0x${string}`;

export default function CheckinPage() {
  const { address, isConnected } = useAccount();

  // tránh hydration error
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const contract = {
    address: CONTRACT_ADDRESS,
    abi: GM_ABI,
  } as const;

  const {
    data: streak,
    refetch: refetchStreak,
    isFetching: loadingStreak,
  } = useReadContract({
    ...contract,
    functionName: "streak",
    args: address ? [address] : undefined,
    query: {
      enabled: mounted && !!address,
    },
  });

  const { writeContractAsync, isPending } = useWriteContract();
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGM = async () => {
    if (!address) return;
    setError(null);

    try {
      const hash = await writeContractAsync({
        ...contract,
        functionName: "gm",
      });

      setTxHash(hash as string);

      setTimeout(() => {
        refetchStreak();
      }, 10_000);
    } catch (err: any) {
      console.error(err);
      setError(err?.shortMessage || err?.message || "Transaction failed");
    }
  };

  return (
    <main style={{ padding: 40 }}>
      <h1>GM Daily – Base & Farcaster 🌞</h1>

      <ConnectButton />

      {/* CHỈ render khác nhau sau khi client đã mount */}
      {!mounted ? (
        <p>Đang kiểm tra trạng thái ví...</p>
      ) : !isConnected ? (
        <p>Hãy kết nối ví để bắt đầu.</p>
      ) : (
        <>
          <p>Địa chỉ: {address}</p>

          <p>
            Streak hiện tại:{" "}
            {loadingStreak ? "Đang tải..." : Number(streak || 0)} ngày
          </p>

          <button
            onClick={handleGM}
            disabled={isPending}
            style={{
              marginTop: 16,
              padding: "8px 16px",
              fontSize: 16,
              cursor: "pointer",
            }}
          >
            {isPending ? "Đang gửi GM..." : "GM hôm nay 🌞"}
          </button>

          {txHash && (
            <p style={{ marginTop: 8 }}>
              Tx:{" "}
              <a
                href={`https://basescan.org/tx/${txHash}`}
                target="_blank"
                rel="noreferrer"
              >
                Xem trên Basescan
              </a>
            </p>
          )}

          {error && (
            <p style={{ color: "red", marginTop: 8 }}>Lỗi: {error}</p>
          )}
        </>
      )}
    </main>
  );
}
