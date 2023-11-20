import { ConnectButton } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import type { NextPage } from "next";
import { Suspense } from "react";
import { useAccount } from "wagmi";
import { useContractRead } from "wagmi";
import NFTabi from "../components/abi/basic.json";
import Demo from "./demo";

export default function Home() {
  const { address, isConnecting, isDisconnected } = useAccount();
  const add = NFTabi.address as `0x${string}`;

  const { data, isError, isLoading } = useContractRead({
    address: add,
    abi: NFTabi.abi,
    functionName: "balanceOf",
    args: ["0xD69E87CAC35F88681eF1E19721329BB829A3951b"],
  });
  const { data: tokenID } = useContractRead({
    address: add,
    abi: NFTabi.abi,
    functionName: "tokenOfOwnerByIndex",
    args: ["0xD69E87CAC35F88681eF1E19721329BB829A3951b", 0],
  });

  return (
    <Suspense>
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-24`}
      >
        <ConnectButton />
        <Demo number={data} tokenID={tokenID} />
      </main>
    </Suspense>
  );
}
