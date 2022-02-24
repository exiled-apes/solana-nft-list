import React, { useCallback, useEffect, useState } from "react";
import { WalletDialogButton } from "@solana/wallet-adapter-material-ui";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useWalletNfts } from "@nfteyez/sol-rayz-react";

export default function App() {
  const wallet = useWallet();
  const { connection } = useConnection();
  const { nfts } = useWalletNfts({
    publicAddress: wallet?.publicKey,
    connection,
  });
  const [metadata, setMetadata] = useState({});

  // we need to fetch the metadata seperately from the NFTs data.uri field
  const fetchMetadata = useCallback(async () => {
    for (const nft of nfts) {
      fetch(nft.data.uri)
        .then((response) => response.json())
        .then((meta) =>
          setMetadata((state) => ({ ...state, [nft.mint]: meta }))
        );
    }
  }, [nfts]);

  useEffect(() => {
    if (nfts?.length) fetchMetadata();
  }, [nfts, fetchMetadata]);

  const renderNft = useCallback(
    (nft) => {
      <div key={nft.name}>
        <img src={metadata?.[nft.mint]?.image} alt="nft" width="200" />
        <br />
        {nft.data.name}
      </div>;
    },
    [metadata]
  );

  return (
    <>
      <h1>Solana NFT List</h1>
      <WalletDialogButton />
      {(nfts || []).map(renderNft)}
    </>
  );
}
