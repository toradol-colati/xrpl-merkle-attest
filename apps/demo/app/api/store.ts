│   │   │   # ══════════════════════════════════════════════
│   │   │   # LO STORE IN-MEMORY (il "database" della demo)
│   │   │   # ══════════════════════════════════════════════
│   │   │   # COSA: un modulo che esporta tre strutture dati:
│   │   │   #
│   │   │   #   1. pendingDonations: Map<string, DonationItem[]>
│   │   │   #      Chiave: "current" (c'è un solo batch aperto alla volta)
│   │   │   #      Valore: array delle donazioni in attesa di batch
│   │   │   #      Quando arriva una donazione, va qui.
│   │   │   #      Quando il batch si chiude, si svuota.
│   │   │   #
│   │   │   #   2. sealedBatches: Map<string, SealedBatch>
│   │   │   #      Chiave: root hash del batch
│   │   │   #      Valore: { rootHash, txHash, explorerUrl, proofs[],
│   │   │   #               items[], sealedAt, leavesCount }
│   │   │   #      Quando il batch viene sealato, il risultato va qui.
│   │   │   #
│   │   │   #   3. certificates: Map<string, Certificate[]>
│   │   │   #      Chiave: email del donatore
│   │   │   #      Valore: array dei certificati emessi per quell'email
│   │   │   #      Ogni certificato contiene: donationData, leafHash,
│   │   │   #        proof, rootHash, txHash, explorerUrl, createdAt
│   │   │   #      Questo è il "database" dell'album.
│   │   │   #
│   │   │   # PERCHÉ: è il collante tra le API route.
│   │   │   #   Senza questo, batch/route.ts non sa cosa c'è in coda,
│   │   │   #   verify/route.ts non sa dove cercare i proof,
│   │   │   #   e album/route.ts non sa cosa mostrare.
│   │   │   #   In Petra tutto questo sarà PostgreSQL.
│   │   │   #   Qui è un Map in memoria perché è una demo di 36 ore.
│   │   │   #
│   │   │   # COME: esporta le tre Map + i tipi TypeScript.
│   │   │   #
│   │   │   #   export interface DonationItem {
│   │   │   #     id: string             // UUID generato dal server
│   │   │   #     email: string          // chi ha donato
│   │   │   #     amount: number         // quanto (in EUR)
│   │   │   #     currency: string       // "EUR"
│   │   │   #     siteId: string         // a quale progetto
│   │   │   #     siteName: string       // nome leggibile (solo per UI)
│   │   │   #     timestamp: string      // ISO 8601
│   │   │   #   }
│   │   │   #
│   │   │   #   export interface Certificate {
│   │   │   #     id: string
│   │   │   #     donationData: DonationItem
│   │   │   #     leafHash: string
│   │   │   #     proof: ProofItem[]     // il merkle proof
│   │   │   #     rootHash: string       // la root del batch
│   │   │   #     txHash: string         // la transazione XRPL
│   │   │   #     explorerUrl: string    // link a Bithomp
│   │   │   #     createdAt: string
│   │   │   #   }
│   │   │   #
│   │   │   #   export const pendingDonations = new Map<string, DonationItem[]>()
│   │   │   #   export const sealedBatches = new Map<string, SealedBatch>()
│   │   │   #   export const certificates = new Map<string, Certificate[]>()
│   │   │   #
│   │   │   #   // Inizializza il batch vuoto
│   │   │   #   pendingDonations.set("current", [])
│   │   │   #
│   │   │   # QUANDO: ore 1-2 dell'hackathon (prima di tutto il resto).
