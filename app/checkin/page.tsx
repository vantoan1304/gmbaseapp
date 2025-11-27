"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  useAccount,
  useReadContract,
  useWriteContract,
} from "wagmi";

import { gmAbi } from "@/lib/abi";
import { useState } from "react";

export default function CheckinPage() {
  const { address, isConnected } = useAccount();
  const [txHash, setTxHash] = useState("");

  // Contract config
  const contract = {
    address: process.env.NEXT_PUBLIC_GM_CONTRACT_ADDRESS as `0x${string}`,
    abi: gmAbi,
  };

  // -------------------------
  // CHECK: can GM today?
  // -------------------------
  const {
    data: canGM,
    refetch: refetchCanGM,
    isFetching: checkingGM,
  } = useReadContract({
    ...contract,
    functionName: "canGM",
    args: address ? [address] : undefined,
  });

  // -------------------------
  // GET streak
  // -------------------------
  const {
    data: streak,
    refetch: refetchStreak,
  } = useReadContract({
    ...contract,
    functionName: "getStreak",
    args: address ? [address] : undefined,
  });

  // -------------------------
  // SEND GM
  // -------------------------
  const {
    writeContract,
    data: gmTxHash,
    isPending: isSendingGM,
  } = useWriteContract();

  async function handleGM() {
    if (!address) return;

    try {
      writeContract({
        ...contract,
        functionName: "gm",
      });

      if (gmTxHash) setTxHash(gmTxHash);

      // refresh UI
      setTimeout(() => {
        refetchCanGM();
        refetchStreak();
      }, 3000);
    } catch (err) {
      console.error("GM Error:", err);
    }
  }

  // -------------------------
  // UI
  // -------------------------
  return (
    <main style={{ padding: 40 }}>
      <h1>GM Daily - Active Base & Farcaster☀️</h1>

      <ConnectButton />

      {!isConnected && <p>Kết nối ví để tiếp tục.</p>}

      {isConnected && (
        <>
          
          <h3>🔥 Streak hiện tại: {Number(streak || 0)} ngày</h3>

          {checkingGM ? (
            <p>Đang kiểm tra xem bạn đã GM hôm nay chưa...</p>
          ) : (
            <>
              {canGM ? (
                <button
                  onClick={handleGM}
                  disabled={isSendingGM}
                  style={{
                    marginTop: 20,
                    padding: "12px 24px",
                    background: "#2563eb",
                    color: "white",
                    borderRadius: 8,
                    border: "none",
                    fontSize: 16,
                  }}
                >
                  {isSendingGM ? "Đang gửi GM..." : "GM Hôm Nay 🌞"}
                </button>
              ) : (
                <p>Bạn đã GM hôm nay rồi 🌙</p>
              )}
            </>
          )}

          {txHash && (
            <p style={{ marginTop: 20 }}>
              Tx:{" "}
              <a
                href={`https://basescan.org/tx/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {txHash.slice(0, 10)}...
              </a>
            </p>
          )}
        </>
      )}
    </main>
  );
}
