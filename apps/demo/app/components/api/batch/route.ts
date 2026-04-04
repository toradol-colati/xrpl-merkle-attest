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
