import { Commitment, Connection, Keypair } from "@solana/web3.js" // here commitment will be used to specify the cluster we want to connect to (devnet, testnet, mainnet-beta)
import wallet from "../../prerequisite/ts/wba-wallet.json";
import { Metaplex, keypairIdentity, bundlrStorage } from "@metaplex-foundation/js";


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
        const mint = await metaplex.nfts().create(
            {
                uri: "https://arweave.net/UxKuTIcEsStR5e2uzvOL6veTCNI6wEPHJR60QyrCV84",
                name: "sam's_rug",
                symbol: "rug",
                creators: [
                    {
                        address: keypair.publicKey,
                        share: 100
                    }
                ],
                sellerFeeBasisPoints: 100,
                isMutable: true

            })

        console.log(mint.nft.address.toBase58())
    }


    // HaDCDggeQsMCt3JJweq5R38ooiPLFhmiTPs4nRUQQhvW

    catch (error) {
        console.log(`Oops, something went wrong: ${error}`);
    }
})();
