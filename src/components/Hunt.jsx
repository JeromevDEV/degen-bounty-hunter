import hunt from "../Assets/hunt.png";
import step1 from "../Assets/step_1.png";
import step2 from "../Assets/step_2.png";
import step3 from "../Assets/step_3.png";
import rightplaceholder from "../Assets/hunt-right.png";

import React, {useEffect, useState} from "react";
import {Container} from "react-bootstrap";
import {useWallet} from "@solana/wallet-adapter-react";
import axios from "axios";
import {claimReward} from "../contexts/transactions"
import {TOKEN_PROGRAM_ID} from "@solana/spl-token";
import {Connection, PublicKey} from "@solana/web3.js";

const Metadata = require("@metaplex-foundation/mpl-token-metadata");

function Hunt() {
    const wallet = useWallet();

    const {publicKey} = useWallet();
    const [loading, setLoading] = useState(false);
    const [NFTs, setNFTs] = useState([]);
    const [mint, setMints] = useState();
    const UPDATE_AUTHORITY = "FSHP7g2kz3Mhy4oQ3w8JYksPR487hMgkcrjYAdjzwtaE";

    const todo = async (mint) => {
        try {
            console.log(mint)
            // await claimReward(wallet, mint);
        } catch (error) {
            console.log(error);
        }
    }

    const search = (nameKey, myArray) => {
        for (var i = 0; i < myArray.length; i++) {
            if (myArray[i].trait_type === nameKey) {
                return myArray[i].value;
            }
        }
        return 0;
    };

    useEffect(() => {
        (async function () {
            if (publicKey) {
                setLoading(true);
                const connection = new Connection("https://lively-wispy-glitter.solana-mainnet.quiknode.pro/09fcb80a5e6d9f40095050a1ca05c85d02f82370/", "processed");


                const accounts = await connection.getParsedProgramAccounts(
                    TOKEN_PROGRAM_ID,
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
                        if (x != null) {
                            let metadata = await Metadata.Metadata.fromAccountAddress(connection, metaAccount[0]);

                            if (metadata.updateAuthority == UPDATE_AUTHORITY &&  metadata.data.symbol.substring(0,1) === "D"
                                &&  metadata.data.symbol.substring(1,2) === "B"
                                &&  metadata.data.symbol.substring(2,3) === "H"
                                &&  metadata.data.symbol.substring(3,4) !== "B") {

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
            <Container fluid className="hunt-section" id="hunt">
                <Container className="hunt-content">
                    <h1 style={{paddingBottom: 25}} className="heading">
                        Coming soon...
                    </h1>
                    <img src={hunt} alt="hunt pic" className="img-fluid" style={{maxWidth: '75%'}}/>
                </Container>
                <Container>
                    <div id="step-container">
                        <div>
                            <img src={step1} style={{width: "50%", height: "50%", marginBottom:"10px", marginTop:"15px"}}/>
                            <p>Select the NFT you want to send in a duel</p>
                        </div>
                        <div>
                            <img src={step2} style={{width: "50%", height: "50%", marginBottom:"10px", marginTop:"15px"}}/>
                            <p>Wait until the duel is done</p>
                        </div>
                        <div>
                            <img src={step3} style={{width: "50%", height: "50%", marginBottom:"10px", marginTop:"15px"}}/>
                            <p>Collect your rewards</p>
                        </div>
                    </div>
                </Container>
                <Container>
                    {loading ? (
                        <div>
                            <h3>Looking for Degen Bounty Hunter ...</h3>
                        </div>
                    ) : publicKey ? (
                        <div id="duel-container">
                            <div className="cards">
                                {NFTs.length === 0 && (
                                    <h3 className="team-heading">No NFTs found</h3>
                                )}
                                {NFTs.map((nft, key) => {
                                    return (
                                        <div className="card-hunt" key={key}>
                                            <img
                                                src={nft.data.image}
                                                alt={nft.data.name}
                                                width="200"
                                            />
                                            <h5>{nft.data.name}</h5>
                                            <h5>
                                                Bounty: {search("Bounty", nft.data.attributes)}
                                            </h5>
                                            <div>
                                                <button className="btn-primary"
                                                        onClick={() => todo(mint[key])}>Hunt !
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div>
                                <img className="hunt-right-img" src={rightplaceholder}/>
                            </div>
                        </div>
                    ) : (
                        <p></p>
                    )}
                </Container>
                <Container>
                    {loading ? (
                        <div>
                            <h3>Looking for Degen Bounty Hunter ...</h3>
                        </div>
                    ) : publicKey ? (
                        <div id="duel-container">
                            <div className="cards">
                                {NFTs.length === 0 && (
                                    <h3 className="team-heading">No NFTs found</h3>
                                )}
                                {NFTs.map((nft, key) => {
                                    return (
                                        <div className="card-hunt" key={key}>
                                            <img
                                                src={nft.data.image}
                                                alt={nft.data.name}
                                                width="200"
                                            />
                                            <h5>{nft.data.name}</h5>
                                            <h5>
                                                Bounty: {search("Bounty", nft.data.attributes)}
                                            </h5>
                                            <div>
                                                <button className="btn-primary"
                                                        onClick={() => todo(mint[key])}>Hunt !
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div id="summary-container">
                                <h1>Summary</h1>
                                <p>Result: (win/lose)</p>
                                {/*{result ? (<p>New bounty: </p>) : (<p></p>) }*/}
                                <p>Your winning chances were: %</p>
                                <p>Your opponent was the n°: </p>
                            </div>
                        </div>
                    ) : (
                        <p></p>
                    )}
                </Container>
            </Container>
        </section>
    );
}

export default Hunt;
