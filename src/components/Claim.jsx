import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
// import ClaimableNFT from "./ClaimableNFT";
// import { Connection } from "@metaplex/js";
// import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
// import { Connection } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import axios from "axios";
import {claimReward} from "../contexts/transactions"
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { Connection, PublicKey } from "@solana/web3.js";
const Metadata = require("@metaplex-foundation/mpl-token-metadata");


function Claim() {
    const wallet = useWallet();
    const {publicKey} = useWallet();
    const [arr, setArr] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    const [loading, setLoading] = useState(true);
    const [NFTs, setNFTs] = useState([]);
    const [mint,setMints] = useState();
    const API_KEY = "nxhv0sPzGRpNAkM";
    const API_SECRET = "BwQZsaoHmXGOGt3";
    const UPDATE_AUTHORITY = "FSHP7g2kz3Mhy4oQ3w8JYksPR487hMgkcrjYAdjzwtaE";

    const search = (nameKey, myArray) => {
        for (var i = 0; i < myArray.length; i++) {
            if (myArray[i].trait_type === nameKey) {
                return myArray[i].value;
            }
        }
        return 0;
    };

    const handleClaim = async (mint) => {
        try {
            await claimReward(wallet,mint);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        (async function () {

            if (publicKey) {

                setLoading(true);

                const connection = new Connection("https://api.mainnet-beta.solana.com","processed");

                const accounts = await connection.getParsedProgramAccounts(
                    TOKEN_PROGRAM_ID, // new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA")
                    {
                        filters: [
                            {
                                dataSize: 165, // number of bytes
                            },
                            {
                                memcmp: {
                                    offset: 32, // number of bytes
                                    bytes: publicKey, // base58 encoded string
                                },
                            },
                        ],
                    }
                );

                let validNfts = [];

                let validMints = [];

                accounts.map(async (nft)=>{

                    setLoading(true);
                    if (nft.account.data.parsed.info.tokenAmount.amount == "1" && nft.account.data.parsed.info.tokenAmount.decimals == 0){

                        let metaAccount = await PublicKey.findProgramAddress([Buffer.from('metadata'), Metadata.PROGRAM_ID.toBytes(), new PublicKey(nft.account.data.parsed.info.mint).toBytes()], Metadata.PROGRAM_ID);

                        //let check = await connection.getAccountInfo(metaAccount[0])
                        //if(check!= null){
                            let metadata = await Metadata.Metadata.fromAccountAddress(connection,metaAccount[0]);
                            //console.log(metadata)

                            if (metadata.updateAuthority == UPDATE_AUTHORITY && metadata.data.symbol.includes("DBHB")){

                                let res = await axios.get(metadata.data.uri);

                                validNfts.push(res);

                                validMints.push(nft.account.data.parsed.info.mint);

                                setMints(validMints);

                                setNFTs(validNfts);

                            }
                        //}
                    }
                });

                setLoading(false);

            }
        })();
    }, [publicKey]);

    return (
        <section>
            <Container fluid className="claim-section">
                <h1 className="team-heading">
                You did a good job hunter... now it's time to retire{" "}<span className="roadmap" role="img" aria-labelledby="roadmap">💰</span>
                </h1>
                <Container style={{marginTop:"20px"}}>
                    {loading ? (
                        <div>
                            <h1>Loading NFTs ...</h1>
                        </div>
                    ) : publicKey ? (
                        <div className="cards">
                            {NFTs.length === 0 && (
                                <h1 className="team-heading">No NFTs found</h1>
                            )}
                            {NFTs.map((nft,key) => {
                                return (
                                    <div className="card" key={key}>
                                        <img
                                            src={nft.data.image}
                                            alt={nft.data.name}
                                            width="200"
                                        />
                                        <h5>{nft.data.name}</h5>
                                        <h5>
                                            Bounty: {search("Bounty",nft.data.attributes)}
                                        </h5>
                                        <div>
                                            <button className="btn-primary" onClick={() => handleClaim(mint[key])}>Claim</button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <h1>User not connected</h1>
                    )}
                </Container>
            </Container>
        </section>
    );
}

export default Claim;
