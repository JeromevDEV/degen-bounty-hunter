import hunt from "../Assets/hunt.png";
import step1 from "../Assets/step_1.png";
import step2 from "../Assets/step_2.png";
import step3 from "../Assets/step_3.png";
import rightplaceholder from "../Assets/hunt-right.png";

import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useWallet } from "@solana/wallet-adapter-react";
import axios from "axios";
import { claimReward, submitDuel, checkDuelReward, getSubmittedNfts } from "../contexts/transactions"
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { Connection, PublicKey } from "@solana/web3.js";
import { ifError } from "assert";

const Metadata = require("@metaplex-foundation/mpl-token-metadata");

function Hunt() {
    let wallet = useWallet();

    const { publicKey } = useWallet();
    const [loading, setLoading] = useState(false);
    const [NFTs, setNFTs] = useState([]);
    const [mint, setMints] = useState();
    const [bonusNFT, setBonusNFT] = useState({ bonus: 0, mintId: "" });
    const [submittedInfo, setSubmittedInfo] = useState([]);
    const UPDATE_AUTHORITY = "5mfkNCR8Fo5p3DLHYBW6knuArGEgj8Ui2Lm4qnWEWUFh";
    // const UPDATE_AUTHORITY = "FSHP7g2kz3Mhy4oQ3w8JYksPR487hMgkcrjYAdjzwtaE";

    const handleSubmit = async (mint) => {
        try {
            console.log(mint);
            await submitDuel(wallet, mint, bonusNFT);
        } catch (error) {
            console.log(error);
        }
    }
    const handleReclaim = async (mint) => {
        try {
            console.log(mint);
            await checkDuelReward(wallet, mint);
            // await claimReward(wallet, mint);
        } catch (error) {
            console.log(error);
        }
    }

    const search = (nameKey, myArray) => {
        for (var i = 0; i < myArray.length; i++) {
            if (myArray[i].trait_type === nameKey || myArray[i].trait_type === nameKey.toUpperCase()) {
                return myArray[i].value;
            }
        }
        return 0;
    };

    useEffect(() => {
        (async function () {
            if (publicKey) {
                setLoading(true);
                const connection = new Connection("https://api.devnet.solana.com/", "processed");
                // const connection = new Connection("https://lively-wispy-glitter.solana-mainnet.quiknode.pro/09fcb80a5e6d9f40095050a1ca05c85d02f82370/", "processed");

                // console.log()

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

                            if (metadata.updateAuthority == UPDATE_AUTHORITY && metadata.data.symbol.substring(0, 7) === "DBHDUEL") {
                                let res = await axios.get(metadata.data.uri);
                                validNfts.push(res);

                                validMints.push(nft.account.data.parsed.info.mint);

                                setMints(validMints);

                                setNFTs(validNfts);

                            }
                            else if (metadata.updateAuthority == UPDATE_AUTHORITY && metadata.data.symbol.substring(0, 3) === "DBH") {
                                let res = await axios.get(metadata.data.uri);
                                let bonus = search("Bonus", res.data.attributes);
                                if (bonusNFT.bonus < bonus)
                                    setBonusNFT({ bonus, mintId: nft.account.data.parsed.info.mint });
                            }
                        }
                    }
                });

                let submittedNfts = await getSubmittedNfts(publicKey);
                setSubmittedInfo(submittedNfts);
                setLoading(false);
            }
        })();
    }, [publicKey]);


    return (
        <section>
            <Container fluid className="hunt-section" id="hunt">
                <Container className="hunt-content">
                    <h1 style={{ paddingBottom: 25 }} className="heading">
                        Coming soon...
                    </h1>
                    <img src={hunt} alt="hunt pic" className="img-fluid" style={{ maxWidth: '75%' }} />
                </Container>
                <Container>
                    <div id="step-container">
                        <div>
                            <img src={step1} style={{ width: "50%", height: "50%", marginBottom: "10px", marginTop: "15px" }} />
                            <p>Select the NFT you want to send in a duel</p>
                        </div>
                        <div>
                            <img src={step2} style={{ width: "50%", height: "50%", marginBottom: "10px", marginTop: "15px" }} />
                            <p>Wait until the duel is done</p>
                        </div>
                        <div>
                            <img src={step3} style={{ width: "50%", height: "50%", marginBottom: "10px", marginTop: "15px" }} />
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
                                                    onClick={() => handleSubmit(mint[key])}>Hunt !
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div>
                                <img className="hunt-right-img" src={rightplaceholder} />
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
                                {submittedInfo.length === 0 && (
                                    <h3 className="team-heading">No NFTs found</h3>
                                )}
                                {submittedInfo.map((info, key) => {
                                    return (
                                        <div key={key}>
                                            <div className="card-hunt">
                                                <img
                                                    src={info.image}
                                                    alt={info.name}
                                                    width="200"
                                                />
                                                <h5>{info.name}</h5>
                                                <h5>
                                                    Bounty: {info.bounty}
                                                </h5>
                                                <div>
                                                    <button className="btn-primary"
                                                        onClick={() => handleReclaim(info.nftMint)}>Reclaim !
                                                    </button>
                                                </div>
                                            </div>
                                            {info.isDuelComplete ? (
                                                <div id="summary-container">
                                                    <h1>Summary</h1>
                                                    <p>Result: {info.isWinner ? ("won") : ("lost")}</p>
                                                    <p>New bounty: {info.newBounty}</p>
                                                    <p>Your winning chances were: {info.winningChance}%</p>
                                                    <p>Your opponent: {info.opponentMint} </p>
                                                </div>
                                            ) : (
                                                <div id="summary-container">
                                                    <h2>Summary</h2>
                                                    <p>Result: Awaiting</p>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
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
