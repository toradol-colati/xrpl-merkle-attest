│           │   │   # ════════════════════════════════════════════
│           │   │   # SEZIONE 2: RISULTATO DEL BATCH
│           │   │   # ════════════════════════════════════════════
│           │   │   # COSA: dopo il seal, mostra il risultato.
│           │   │   # COME:
│           │   │   #   - Root hash in grande (font mono, tronco con
│           │   │   #     copy-to-clipboard)
│           │   │   #   - Link cliccabile a Bithomp testnet con la
│           │   │   #     transazione reale → il giudice la apre e
│           │   │   #     VEDE il Memo con la root hash. Questo è il
│           │   │   #     momento "wow" — dato reale su ledger reale.
│           │   │   #   - Numero di foglie nel batch
│           │   │   #   - Fee pagata (in XRP — sarà tipo 0.000012)
│           │   │   #   - Visualizzazione dell'albero Merkle:
│           │   │   #     OPZIONE SEMPLICE (fai questa): lista indentata
│           │   │   #       Root: 0xabc...
│           │   │   #         ├─ 0xdef... (nodo intermedio)
│           │   │   #         │  ├─ 0x123... (foglia: "Donazione €10")
│           │   │   #         │  └─ 0x456... (foglia: "Donazione €5")
│           │   │   #         └─ 0x789... (nodo intermedio)
│           │   │   #            ├─ ...
│           │   │   #     OPZIONE AVANZATA (se hai tempo): canvas/SVG
│           │   │   #       con l'albero disegnato graficamente.
│           │   │   #   - Per ogni foglia nella lista, un bottone
│           │   │   #     "Verifica questa" che passa il leaf hash
│           │   │   #     alla sezione 3 (VerifyProof).
│           │   │   # PERCHÉ: il giudice deve VEDERE che la root hash
│           │   │   #   su Bithomp è la stessa che appare nella demo.
│           │   │   #   Questo dimostra integrità end-to-end.
│           │   │   # QUANDO: ore 10-14 dell'hackathon.
