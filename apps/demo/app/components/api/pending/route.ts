│   │   │       # ══════════════════════════════════════════════
│   │   │       # GET /api/pending
│   │   │       # QUANTE DONAZIONI SONO IN CODA NEL BATCH
│   │   │       # ══════════════════════════════════════════════
│   │   │       # COSA: restituisce il conteggio e la lista delle
│   │   │       #   donazioni in attesa nel batch corrente.
│   │   │       #
│   │   │       # COME:
│   │   │       #   export async function GET() {
│   │   │       #     const items = pendingDonations.get("current") || []
│   │   │       #     return Response.json({
│   │   │       #       count: items.length,
│   │   │       #       items
│   │   │       #     })
│   │   │       #   }
│   │   │       #
│   │   │       # PERCHÉ: il frontend lo chiama per aggiornare
│   │   │       #   il contatore "3 donazioni in attesa nel batch"
│   │   │       #   e per mostrare la lista delle donazioni pendenti.
│   │   │       #   Senza questo, il giudice non vede cosa c'è nel
│   │   │       #   batch prima di sealarlo.
│   │   │       #
│   │   │       # QUANDO: ore 3-4 dell'hackathon (insieme a batch).
