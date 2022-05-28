import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
// import ClaimableNFT from "./ClaimableNFT";
// import { Connection } from "@metaplex/js";
// import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
// import { Connection } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { programs, Connection } from "@metaplex/js";
import axios from "axios";
import {claimReward} from "../contexts/transactions"

function Claim() {
  const { publicKey,signTransaction } = useWallet();
  const [arr, setArr] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  const [loading, setLoading] = useState(true);
  const [NFTs, setNFTs] = useState([]);
  const API_KEY = "nxhv0sPzGRpNAkM";
  const API_SECRET = "BwQZsaoHmXGOGt3";
  const UPDATE_AUTHORITY = "FSHP7g2kz3Mhy4oQ3w8JYksPR487hMgkcrjYAdjzwtaE";
  let {
    metadata: { Metadata, UpdateMetadata, MetadataDataData, Creator },
  } = programs;

  const search = (nameKey, myArray) => {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].trait_type === nameKey) {
        return myArray[i].value;
      }
    }
    return 0;
  };

  const handleClaim = async () => {
    let mintId = "HyomvqtLBjHhPty1P6dKzNf5gNow9qbfGkxj69pqBD8Z";
    try {
      await claimReward(publicKey, mintId);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    (async function () {
      setLoading(true);
      if (publicKey) {
        // const connection = new Connection("mainnet-beta");
        // const nftsmetadata = await Metadata.findDataByOwner(
        //   connection,
        //   publicKey.toBase58()
        // );

        // console.log("hi");
        // console.log(nftsmetadata);
        // return;
        const HEADERS = {
          APIKeyID: API_KEY,
          APISecretKey: API_SECRET,
        };
        const PARAMS = {
          public_key: publicKey.toBase58(),
          network: "mainnet-beta",
        };
        let res = await axios.get(
          "https://api.theblockchainapi.com/v1/solana/wallet/nfts",
          {
            headers: HEADERS,
            params: PARAMS,
          }
        );
        setNFTs(
          res.data.nfts_metadata.filter((metadata) => {
            return metadata.update_authority === UPDATE_AUTHORITY;
          })
        );
        setLoading(false);
      }
    })();
  }, [publicKey]);

  return (
    <section>
      <Container fluid className="claim-section">
        <Container>
          {loading ? (
            <div>
              <h1>Loading NFTs ...</h1>
            </div>
          ) : publicKey ? (
            <div className="cards">
              {NFTs.length === 0 && (
                <h1 className="team-heading">No NFTs found</h1>
              )}
              {NFTs.map((nft) => {
                console.log(nft);
                return (
                  <div className="card" key={nft.explorer_url}>
                    <img
                      src={nft.off_chain_data.image}
                      //   src="https://static01.nyt.com/images/2021/03/12/arts/11nft-auction-cryptopunks-print/11nft-auction-cryptopunks-print-mobileMasterAt3x.jpg"
                      alt={nft.data.name}
                      width="200"
                    />
                    <h5>{nft.data.name}</h5>
                    <h5>
                      Bounty: {search("Bounty", nft.off_chain_data.attributes)}
                    </h5>
                    <div>
                      <button className="btn-primary" onClick={() => handleClaim()}>Claim</button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <h1>User not connected</h1>
          )}
          {/* <h1 className="team-heading">
            You did a good job hunter... now it's time to retire{" "}
            <span className="roadmap" role="img" aria-labelledby="roadmap">
              💰
            </span>
          </h1> */}
          {/*<ClaimableNFT/>*/}
          {/* <p>WIP</p> */}
        </Container>
      </Container>
    </section>
  );
}

export default Claim;
