import {
  Commitment,
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import wallet from "../prerequisite/ts/wba-wallet.json";
import {
  createCreateMetadataAccountV2Instruction,
  createCreateMetadataAccountV3Instruction,
} from "@metaplex-foundation/mpl-token-metadata";

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

// Define our Mint address
const mint = new PublicKey("CegWQ6h3KgatEor4YeZLmPKFdSaD3aDbyB6nPN1bfqdd");

// Add the Token Metadata Program
const token_metadata_program_id = new PublicKey(
  "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
);

// Create PDA for token metadata
const metadata_seeds = [
  Buffer.from("metadata"),
  token_metadata_program_id.toBuffer(),
  mint.toBuffer(),
];
const [metadata_pda, _bump] = PublicKey.findProgramAddressSync(
  metadata_seeds,
  token_metadata_program_id
);

(async () => {
  try {
    // Start here

    const instruction = createCreateMetadataAccountV3Instruction(
      {
        metadata: metadata_pda,
        mint: mint,
        mintAuthority: keypair.publicKey,
        payer: keypair.publicKey,
        updateAuthority: keypair.publicKey,
        systemProgram: SystemProgram.programId,
      },
      {
        createMetadataAccountArgsV3: {
          data: {
            name: "Samrihd",
            symbol: "SAM",
            uri: "",
            sellerFeeBasisPoints: 0,
            creators: null,
            collection: null,
            uses: null,
          },
          isMutable: true,
          collectionDetails: null,
        },
      }
    );

    const tx = new Transaction().add(instruction);
    const txhash = await sendAndConfirmTransaction(connection, tx, [keypair]);
    console.log(
      `Success! your TX is: https://solscan.io/tx/${txhash}?cluster=devnet`
    );
  } catch (e) {
    console.error(`Oops, something went wrong: ${e}`);
  }
})();


// Success! your TX is: https://solscan.io/tx/5wcdNz7z3Fuh1SH5GVk34TnxNVWTKeMzGehZqdsY1oJ7ru1jFbnpAsSZzqRNNEkGCkSq3Qytoar8EdRBdJxgGnrn?cluster=devnet