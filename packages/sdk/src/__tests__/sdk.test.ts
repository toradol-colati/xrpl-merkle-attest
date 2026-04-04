│                   # COSA: test unitari per le 4 funzioni.
│                   # PERCHÉ: se i test passano, sai che il motore funziona.
│                   #   All'hackathon non devi chiederti "il tree builder
│                   #   è rotto o il frontend è rotto?" — i test te lo dicono.
│                   # COME: con Vitest (compatibile con l'ecosistema Next.js).
│                   #   Test 1: buildTree con 5 item → root esiste, è 66 char hex
│                   #   Test 2: getProof per item 3 → proof ha elementi
│                   #   Test 3: verifyProof con proof valido → true
│                   #   Test 4: verifyProof con proof alterato → false
│                   #   Test 5 (integrazione, opzionale): anchorToXRPL su testnet
│                   #     → txHash esiste, explorerUrl punta a Bithomp
│                   # ~40 righe di test.
│                   # QUANDO: prima dell'hackathon.
