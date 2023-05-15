import { Keypair, PublicKey, Connection, Commitment } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";
import wallet from "../prerequisite/ts/wba-wallet.json";

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

const token_decimals = 1_000_000_000n;

// Mint address (The one created with spl_init)
const mint = new PublicKey("CegWQ6h3KgatEor4YeZLmPKFdSaD3aDbyB6nPN1bfqdd");

(async () => {
  try {
    // Start here

    const tokenAccount = await getOrCreateAssociatedTokenAccount(
      // Associated Token Account (ATA)
      connection,
      keypair, // signer
      mint,
      keypair.publicKey // owner of the ATA
    );

    console.log(`Your ata is: ${tokenAccount.address.toBase58()}`);
    // EYyX9pbQcyy7Fd3SSJVwyUThawHbPYgqLof4vdv7YkYn
    const mintTx = await mintTo(
      connection,
      keypair,
      mint,
      tokenAccount.address,
      keypair,
      1000n * token_decimals // because decimals for the mint are set to 9
    );

    console.log(`Your mint txid is: ${mintTx}`);
    // 55RLDzPmRUpRP1zzU2UmXFsEGuag8fwfPZvk3U1PdBq7oRnpRZVL2RCd7hoaExk8ufrTeaPmGf6PDtr2c4UkKMxY
  } catch (error) {
    console.log(`Oops, something went wrong: ${error}`);
  }
})();
