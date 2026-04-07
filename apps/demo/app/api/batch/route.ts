│               │   # ─────────────────────────────────────────
│               │   # API ROUTES (Next.js App Router)
│               │   # Queste sono le "Server Actions" di Next.js.
│               │   # Girano sul server (non nel browser del giudice),
│               │   # quindi possono accedere al wallet XRPL e
│               │   # importare l'SDK.
│               │   # QUANDO: ore 1-5 dell'hackathon.
│               │   # ─────────────────────────────────────────
_____________________________________________________________________________________________
│               │       # ════════════════════════════════════════════
│               │       # POST /api/batch
│               │       # ════════════════════════════════════════════
│               │       # COSA: riceve gli item, costruisce il tree,
│               │       #   lo ancora su XRPL, restituisce tutto.
│               │       # COME:
│               │       #   export async function POST(req: Request) {
│               │       #     const { items } = await req.json()
│               │       #
│               │       #     // 1. Costruisci l'albero (SDK)
│               │       #     const batch = buildTree(items)
│               │       #
│               │       #     // 2. Ancora su XRPL (SDK)
│               │       #     const anchor = await anchorToXRPL(
│               │       #       batch.root,
│               │       #       process.env.XRPL_NETWORK!,
│               │       #       process.env.XRPL_WALLET_SEED!
│               │       #     )
│               │       #
│               │       #     // 3. Genera i proof per ogni foglia (SDK)
│               │       #     const proofs = batch.leaves.map((leaf, i) => ({
│               │       #       leafHash: leaf,
│               │       #       item: items[i],
│               │       #       proof: getProof(batch.tree, leaf)
│               │       #     }))
│               │       #
│               │       #     // 4. Salva in memoria (per il verify endpoint)
│               │       #     store.set(batch.root, { proofs, anchor })
│               │       #
│               │       #     // 5. Restituisci al frontend
│               │       #     return Response.json({
│               │       #       root: batch.root,
│               │       #       txHash: anchor.txHash,
│               │       #       explorerUrl: anchor.explorerUrl,
│               │       #       fee: anchor.fee,
│               │       #       leavesCount: batch.leaves.length,
│               │       #       proofs
│               │       #     })
│               │       #   }
│               │       # PERCHÉ: questo endpoint è il cuore della demo.
│               │       #   Prende N input, produce 1 transazione XRPL.
│               │       # DETTAGLIO: "store" è un semplice Map<string, any>
│               │       #   in memoria. Non serve un database per la demo.
│               │       #   In Petra sarà PostgreSQL. All'hackathon, in-memory.
│               │       # QUANDO: ore 1-4 dell'hackathon.
_____________________________________________________________________________________________
AGGIORNAMENTO:
// POLICY DI CHIUSURA DEL BATCH:
// - Hackathon: manuale (bottone nella UI)
// - Petra produzione: automatico (BullMQ cron ogni 24h
//   OPPURE al raggiungimento di 500 donazioni)
// - Presenze: manuale (il professore chiude a fine lezione)
// L'SDK non decide quando chiudere. Questa route decide.

import { buildTree, anchorToXRPL, getProof, createSeedSigner } from "xrpl-merkle-sdk";
import { pendingDonations, sealedBatches, certificates } from "../store";

export async function POST(req: Request) {
  const items = pendingDonations.get("current") || [];

  if (items.length === 0) {
    return Response.json({ error: "Nessuna donazione in coda" }, { status: 400 });
  }

  // 1. Costruisci l'albero (SDK, locale, veloce)
  const leaves = items.map(item => ({
    id: item.id,
    amountCents: Math.round(item.amount * 100),
    currency: item.currency,
    siteId: item.siteId,
    timestampUnix: Math.floor(new Date(item.timestamp).getTime() / 1000),
  }));
  const batch = buildTree(leaves);

  // 2. Ancora su XRPL con timeout (rete, lenta, può fallire)
  const signer = createSeedSigner(process.env.XRPL_WALLET_SEED!);

  let anchor;
  try {
    anchor = await Promise.race([
      anchorToXRPL(
        batch.root,
        process.env.XRPL_NETWORK!,
        signer,
        process.env.XRPL_WALLET_ADDRESS!
      ),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("TESTNET_TIMEOUT")), 15000)
      ),
    ]) as any;
  } catch (err: any) {
    // Fallback: ritorna comunque il tree costruito, senza ancoraggio
    return Response.json({
      root: batch.root,
      leavesCount: items.length,
      anchored: false,
      warning: "XRPL testnet non raggiungibile — Merkle Tree costruito in locale",
      error: err.message,
    }, { status: 200 });
  }

  // 3. Genera certificati (resto del codice come già previsto)
  // ...

  return Response.json({
    root: batch.root,
    txHash: anchor.txHash,
    explorerUrl: anchor.explorerUrl,
    leavesCount: items.length,
    anchored: true,
  });
}

Il pezzo chiave è Promise.race([ anchorToXRPL(...), timeout ]). Se XRPL impiega più di 15 secondi 
(testnet down o lenta), la promise di timeout si risolve per prima, lanci un errore, e nel catch 
restituisci comunque il Merkle Tree costruito in locale con un warning. Il giudice vede il tree, 
vede il warning onesto, e tu puoi dire "la testnet è instabile stasera, ma l'SDK ha costruito 
correttamente l'albero — potete verificarlo voi stessi." Dimostri integrità anche in caso di rete 
morta.

const TESTNET_NODES = [
  "wss://s.altnet.rippletest.net:51233",
  "wss://testnet.xrpl-labs.com",
  "wss://clio.altnet.rippletest.net:51233",
];

async function anchorWithFallback(rootHash: string, signer: any, address: string) {
  for (const nodeUrl of TESTNET_NODES) {
    try {
      return await anchorToXRPL(rootHash, nodeUrl, signer, address);
    } catch (err) {
      console.warn(`Node ${nodeUrl} failed, trying next...`);
      continue;
    }
  }
  throw new Error("All testnet nodes unreachable");
}

// Poi, nella POST:
anchor = await Promise.race([
  anchorWithFallback(batch.root, signer, process.env.XRPL_WALLET_ADDRESS!),
  new Promise((_, reject) =>
    setTimeout(() => reject(new Error("TESTNET_TIMEOUT")), 15000)
  ),
]);

anchorWithFallback prova i tre nodi in sequenza. Se il primo fallisce, prova il secondo. 
Se il secondo fallisce, prova il terzo. Solo se tutti e tre falliscono, lancia errore. 
E tutto questo è dentro il Promise.race di 15 secondi totali, quindi se tutti i nodi sono lenti 
ma rispondono oltre 15 secondi, comunque il fallback al tree-without-anchor si attiva.
