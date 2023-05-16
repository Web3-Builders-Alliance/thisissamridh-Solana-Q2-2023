import { Commitment, Connection, Keypair } from "@solana/web3.js" // here commitment will be used to specify the cluster we want to connect to (devnet, testnet, mainnet-beta)
import wallet from "../../prerequisite/ts/wba-wallet.json";
import { Metaplex, keypairIdentity, bundlrStorage, isMetaplexFile, toMetaplexFile } from "@metaplex-foundation/js";
import { readFile } from "fs/promises"

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

// Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);


const metaplex = Metaplex.make(connection).use(keypairIdentity(keypair)).use(bundlrStorage({
    address: 'https://devnet.bundlr.network',
    providerUrl: "https://api.devnet.solana.com",
    timeout: 60000
}));
(async () => {
    try {
        // Start here
        const image = await readFile("cluster1/NFT/images/genrug.png");
        const metaplex_image = toMetaplexFile(image, "genrug.png");
        const URI = await metaplex.storage().upload(metaplex_image);
        console.log(URI);

    } catch (error) {
        console.log(`Oops, something went wrong: ${error}`);
    }
})();


// 
https://arweave.net/p1QlrFVgF86IGFhlUYmrQRSLsFMeWFhOMS9LFp-Digw