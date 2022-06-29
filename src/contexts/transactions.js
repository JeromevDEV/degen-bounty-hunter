import * as anchor from '@project-serum/anchor';
import { web3 } from "@project-serum/anchor";
import { PublicKey, Transaction, sendAndConfirmRawTransaction, } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID } from "@solana/spl-token";
import axios from 'axios';

// const connection = new Connection("devnet");
const solConnection = new web3.Connection(web3.clusterApiUrl("mainnet-beta"), "processed");

export const claimReward = async (wallet, mintId) => {

    console.log(wallet.publicKey.toBase58())
    console.log(mintId)

    await axios.post("https://degen-bounty-hunter-claim.vercel.app/api/claimReward", {
        wallet: wallet.publicKey.toBase58(),
        mintId,
    })
        .then(async (response) => {

            let recoveredTransaction = Transaction.from(Buffer.from(response.data, 'base64'));
            console.log(recoveredTransaction);
            let tx = await wallet.signTransaction(recoveredTransaction);
            console.log(tx);
            console.log("transaction init")
            await sendAndConfirmRawTransaction(solConnection, tx.serialize());
            console.log("transaction confirmed");

            console.log("txHash =", tx);
        })
        .catch(function (error) {
            console.log(error);
        });
}

export const submitDuel = async (wallet, mintId, bonusNFT) => {
    let response = await axios.post("https://degen-bounty-hunter-claim.vercel.app/api/submitDuel", {
        wallet: wallet.publicKey.toBase58(),
        mintId, bonusNft: bonusNFT
    });
    console.log(response.data);
    let { transactionBase64, info } = response.data;
    let recoveredTransaction = Transaction.from(Buffer.from(transactionBase64, 'base64'));
    console.log(recoveredTransaction);
    let tx = await wallet.signTransaction(recoveredTransaction);
    console.log(tx);
    console.log("transaction init")
    await sendAndConfirmRawTransaction(solConnection, tx.serialize());
    await axios.post("https://degen-bounty-hunter-claim.vercel.app/api/saveNftInfo", { info });
    console.log("transaction confirmed");

    console.log("txHash =", tx);

    //running duel if there are 2 nft left to be dueled
    response = await axios.post("https://degen-bounty-hunter-claim.vercel.app/api/duel");
    console.log(response);
}

export const checkDuelReward = async (wallet, mintId) => {
    let response = await axios.post("https://degen-bounty-hunter-claim.vercel.app/api/checkDuelReward", {
        wallet: wallet.publicKey.toBase58(),
        mintId,
    });
    console.log(response.data);
    let { transactionBase64 } = response.data;
    let recoveredTransaction = Transaction.from(Buffer.from(transactionBase64, 'base64'));
    console.log(recoveredTransaction);
    let tx = await wallet.signTransaction(recoveredTransaction);
    console.log(tx);
    console.log("transaction init");
    let info = { wallet: wallet.publicKey.toBase58(), mintId };
    await sendAndConfirmRawTransaction(solConnection, tx.serialize());
    await axios.post("https://degen-bounty-hunter-claim.vercel.app/api/updateNftInfo", { info });
    console.log("transaction confirmed");

    console.log("txHash =", tx);
}

export const getSubmittedNfts = async (publicKey) => {
    let response = await axios.post("https://degen-bounty-hunter-claim.vercel.app/api/getSubmittedNfts", {
        wallet: publicKey.toBase58(),
    });
    return response.data.info;
}

export const getAssociatedTokenAccount = async (ownerPubkey, mintPk) => {
    let associatedTokenAccountPubkey = (await PublicKey.findProgramAddress(
        [
            ownerPubkey.toBuffer(),
            TOKEN_PROGRAM_ID.toBuffer(),
            mintPk.toBuffer(), // mint address
        ],
        ASSOCIATED_TOKEN_PROGRAM_ID
    ))[0];
    return associatedTokenAccountPubkey;
}

export const createAssociatedTokenAccountInstruction = (
    associatedTokenAddress,
    payer,
    walletAddress,
    splTokenMintAddress
) => {
    const keys = [
        { pubkey: payer, isSigner: true, isWritable: true },
        { pubkey: associatedTokenAddress, isSigner: false, isWritable: true },
        { pubkey: walletAddress, isSigner: false, isWritable: false },
        { pubkey: splTokenMintAddress, isSigner: false, isWritable: false },
        {
            pubkey: anchor.web3.SystemProgram.programId,
            isSigner: false,
            isWritable: false,
        },
        { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
        {
            pubkey: anchor.web3.SYSVAR_RENT_PUBKEY,
            isSigner: false,
            isWritable: false,
        },
    ];
    return new anchor.web3.TransactionInstruction({
        keys,
        programId: ASSOCIATED_TOKEN_PROGRAM_ID,
        data: Buffer.from([]),
    });
}
