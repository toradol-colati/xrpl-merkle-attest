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
