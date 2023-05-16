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
        const { uri } = await metaplex.nfts().uploadMetadata({
            name: "sam's_rug",
            symbol: "rug",
            description: "a really exotic rug created by builders at wba",
            image: "https://arweave.net/p1QlrFVgF86IGFhlUYmrQRSLsFMeWFhOMS9LFp-Digw",
            attributes: [
                { trait_type: 'Feature', value: 'Blood stained red' },
                { trait_type: 'Style', value: 'stiped & metaplex' },
                { trait_type: 'Background', value: 'sky blue' }
            ],
            properties: {
                files: [
                    {
                        type: "image/png",
                        uri: "https://arweave.net/p1QlrFVgF86IGFhlUYmrQRSLsFMeWFhOMS9LFp-Digw",
                    },
                ]
            },
            creators: [
                {
                    address: keypair.publicKey.toBase58(),
                    share: 100
                }
            ]


        })

        console.log(uri) //https://arweave.net/UxKuTIcEsStR5e2uzvOL6veTCNI6wEPHJR60QyrCV84
    } catch (error) {
        console.log(`Oops, something went wrong: ${error}`);
    }
})();
