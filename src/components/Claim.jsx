import React, {useEffect, useState} from "react";
import {Container} from "react-bootstrap";
import {useWallet} from "@solana/wallet-adapter-react";
import axios from "axios";
import {claimReward} from "../contexts/transactions"
import {TOKEN_PROGRAM_ID} from "@solana/spl-token";
import {Connection, PublicKey} from "@solana/web3.js";

const Metadata = require("@metaplex-foundation/mpl-token-metadata");


function Claim() {
    const wallet = useWallet();
    const {publicKey} = useWallet();
    const [arr, setArr] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    const [loading, setLoading] = useState(false);
    const [NFTs, setNFTs] = useState([]);
    const [mint, setMints] = useState();
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
            await claimReward(wallet, mint);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        (async function () {

            if (publicKey) {
                console.log(publicKey)

                setLoading(true);

                const connection = new Connection("https://api.mainnet-beta.solana.com", "processed");

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

                accounts.map(async (nft) => {

                    setLoading(true);
                    if (nft.account.data.parsed.info.tokenAmount.amount == "1" && nft.account.data.parsed.info.tokenAmount.decimals == 0) {

                        let metaAccount = await PublicKey.findProgramAddress([Buffer.from('metadata'), Metadata.PROGRAM_ID.toBytes(), new PublicKey(nft.account.data.parsed.info.mint).toBytes()], Metadata.PROGRAM_ID);
                        let x = await connection.getAccountInfo(metaAccount[0]);
                        if(x!=null){
                            console.log("nft classic")
                            let metadata = await Metadata.Metadata.fromAccountAddress(connection, metaAccount[0]);

                            if (metadata.updateAuthority == UPDATE_AUTHORITY && metadata.data.symbol.includes("DBHB")) {
                                console.log("nft bounty")

                                let res = await axios.get(metadata.data.uri);

                                validNfts.push(res);

                                validMints.push(nft.account.data.parsed.info.mint);

                                setMints(validMints);

                                setNFTs(validNfts);

                            }
                        }
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
                            <h3>Loading NFTs ...</h3>
                        </div>
                    ) : publicKey ? (
                        <div className="cards">
                            {NFTs.length === 0 && (
                                <h3 className="team-heading">No NFTs found</h3>
                            )}
                            {console.log(NFTs.length)}
                            {NFTs.map((nft, key) => {
                                return (
                                    <div className="card" key={key}>
                                        <img
                                            src={nft.data.image}
                                            //   src="https://static01.nyt.com/images/2021/03/12/arts/11nft-auction-cryptopunks-print/11nft-auction-cryptopunks-print-mobileMasterAt3x.jpg"
                                            alt={nft.data.name}
                                            width="200"
                                        />
                                        <h5>{nft.data.name}</h5>
                                        <h5>
                                            Bounty: {search("Bounty", nft.data.attributes)}
                                        </h5>
                                        <div>
                                            <button className="btn-primary"
                                                    onClick={() => handleClaim(mint[key])}>Claim
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <h3>User not connected</h3>
                    )}
                </Container>
            </Container>
        </section>
    );
}

export default Claim;
