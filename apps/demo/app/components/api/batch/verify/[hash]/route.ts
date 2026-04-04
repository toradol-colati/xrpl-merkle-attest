════════════════════════════════════════════
│                           # GET /api/verify/[hash]
│                           # ════════════════════════════════════════════
│                           # COSA: dato un leaf hash, trova il proof e
│                           #   lo verifica crittograficamente.
│                           # COME:
│                           #   export async function GET(req, { params }) {
│                           #     const { hash } = params
│                           #
│                           #     // Cerca in tutti i batch salvati
│                           #     for (const [root, data] of store) {
│                           #       const match = data.proofs.find(
│                           #         p => p.leafHash === hash
│                           #       )
│                           #       if (match) {
│                           #         const valid = verifyProof(
│                           #           match.proof, hash, root
│                           #         )
│                           #         return Response.json({
│                           #           valid,
│                           #           root,
│                           #           proof: match.proof,
│                           #           item: match.item,
│                           #           explorerUrl: data.anchor.explorerUrl
│                           #         })
│                           #       }
│                           #     }
│                           #     return Response.json(
│                           #       { valid: false, error: "Hash non trovato" },
│                           #       { status: 404 }
│                           #     )
│                           #   }
│                           # PERCHÉ: la verifica indipendente è il valore
│                           #   crittografico dell'intero sistema. Senza
│                           #   questo endpoint, il giudice vede solo
│                           #   "fidarsi del server" — con questo endpoint,
│                           #   vede una prova matematica.
│                           # QUANDO: ore 4-5 dell'hackathon.
