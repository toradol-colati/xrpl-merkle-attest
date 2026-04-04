│           │   # COSA: tutti i tipi TypeScript.
│           │   # COME: LeafData (il dato grezzo da attestare),
│           │   #   BatchResult (root + foglie + albero),
│           │   #   AnchorResult (txHash + ledgerIndex + explorerUrl),
│           │   #   ProofItem (position left/right + hash).
│           │   # PERCHÉ: tipi condivisi tra SDK e demo app.
│           │   #   TypeScript è non-negoziabile — senza tipi
│           │   #   il codice diventa inmanutenibile in 2 settimane.
│           │   # QUANDO: prima dell'hackathon.
