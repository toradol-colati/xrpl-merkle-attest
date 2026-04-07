│           │   # ════════════════════════════════════════════
│           │   # FUNZIONE 2: anchorToXRPL(rootHash, networkUrl, seed)
│           │   # ════════════════════════════════════════════
│           │   # COSA: prende la root hash e la scrive sul ledger
│           │   #   XRPL dentro il Memo field di una transazione.
│           │   # COME:
│           │   #   1. new Client(networkUrl) → client.connect()
│           │   #   2. Wallet.fromSeed(seed) → il tuo wallet
│           │   #   3. Costruisci una transazione Payment:
│           │   #      - Account: il tuo indirizzo
│           │   #      - Destination: il tuo stesso indirizzo (self-payment)
│           │   #      - Amount: "1" (1 drop, il minimo possibile)
│           │   #      - Memos: [{ MemoType: hex("application/merkle-root"),
│           │   #                   MemoData: hex(rootHash) }]
│           │   #   4. client.autofill(tx) → aggiunge fee e sequence
│           │   #   5. wallet.sign(prepared) → firma con la chiave privata
│           │   #   6. client.submitAndWait(signed) → invia e aspetta validazione
│           │   #   7. return { txHash, ledgerIndex, fee, explorerUrl }
│           │   # PERCHÉ: questa è l'unica funzione che tocca XRPL.
│           │   #   Tutto il resto è crittografia locale.
│           │   # DETTAGLIO CRITICO 1: il MemoType e MemoData devono
│           │   #   essere hex-encoded, non UTF-8. xrpl.js ha
│           │   #   convertStringToHex() per questo.
│           │   # DETTAGLIO CRITICO 2: il self-payment con Amount "0"
│           │   #   potrebbe non funzionare su tutti i nodi. Usa "1"
│           │   #   (1 drop = 0.000001 XRP) per sicurezza. Testalo.
│           │   # ~30 righe di codice.
│           │   # QUANDO: prima dell'hackathon. TESTA SU TESTNET.
__________________________________________________________________________________________________________________
AGGIORNAMENTO:
export interface AnchorOptions {
  fee?: string;              // in drops, undefined = auto via autofill
  lastLedgerOffset?: number; // blocchi dopo l'attuale, default 20
  maxRetries?: number;       // default 3
  sequence?: number;         // ← NUOVO: nonce XRPL iniettato dall'esterno
}

export async function anchorToXRPL(
  rootHash: string,
  networkUrl: string,
  walletSeed: string,
  options: AnchorOptions = {}
): Promise<AnchorResult> {
  const {
    fee,
    lastLedgerOffset = 20,
    sequence,              // ← estrai il parametro
  } = options;

  const client = new Client(networkUrl);
  await client.connect();

  const wallet = Wallet.fromSeed(walletSeed);
  const currentLedger = await client.getLedgerIndex();

  const tx: Payment = {
    TransactionType: "Payment",
    Account: wallet.address,
    Destination: wallet.address,
    Amount: "1",
    LastLedgerSequence: currentLedger + lastLedgerOffset,
    ...(fee && { Fee: fee }),
    ...(sequence !== undefined && { Sequence: sequence }), // ← se presente, usalo
    Memos: [{
      Memo: {
        MemoType: convertStringToHex("application/merkle-root"),
        MemoData: convertStringToHex(rootHash.replace("0x", "")),
      },
    }],
  };

  // Se sequence è stato iniettato, autofill NON lo sovrascriverà.
  // Se è omesso, autofill lo recupera dal ledger automaticamente.
  const prepared = await client.autofill(tx);
  const signed = wallet.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  await client.disconnect();

  return {
    txHash: signed.hash,
    ledgerIndex: (result.result as any).ledger_index ?? 0,
    fee: prepared.Fee ?? "12",
    explorerUrl: buildExplorerUrl(networkUrl, signed.hash),
  };
}

Come lo chiami all'hackathon (ometti sequence, autofill lo gestisce):
await anchorToXRPL(rootHash, network, seed);

export type SignerFunction = (txBlob: string) => Promise<{
  signedTxBlob: string;
  txHash: string;
}>;

export interface AnchorOptions {
  fee?: string;
  lastLedgerOffset?: number;
  sequence?: number;
  client?: Client;  // bonus: client iniettabile per connection reuse
}

export async function anchorToXRPL(
  rootHash: string,
  networkUrl: string,
  signer: SignerFunction,        // ← al posto di walletSeed
  walletAddress: string,         // ← serve per Account/Destination
  options: AnchorOptions = {}
): Promise<AnchorResult> {
  // ... costruzione tx come prima, ma:
  const prepared = await client.autofill(tx);
  const { signedTxBlob, txHash } = await signer(
    JSON.stringify(prepared)
  );
  const result = await client.submitAndWait(signedTxBlob);
  // ...
}

// Helper per l'hackathon: crea un signer da un seed
export function createSeedSigner(seed: string): SignerFunction {
  const wallet = Wallet.fromSeed(seed);
  return async (txBlob) => {
    const tx = JSON.parse(txBlob);
    const signed = wallet.sign(tx);
    return {
      signedTxBlob: signed.tx_blob,
      txHash: signed.hash,
    };
  };
}

const signer = createSeedSigner(process.env.XRPL_WALLET_SEED!);
await anchorToXRPL(root, network, signer, walletAddress);
