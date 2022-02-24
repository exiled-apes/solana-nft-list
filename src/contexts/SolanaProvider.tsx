import React from "react";
import { useMemo } from "react";
import {
  getPhantomWallet,
  getSolflareWallet,
} from "@solana/wallet-adapter-wallets";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletDialogProvider } from "@solana/wallet-adapter-material-ui";

const ENDPOINT = "https://api.devnet.solana.com";

export default function App({ children }) {
  const wallets = useMemo(() => [getPhantomWallet(), getSolflareWallet()], []);

  return (
    <ConnectionProvider endpoint={ENDPOINT}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletDialogProvider>{children}</WalletDialogProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
