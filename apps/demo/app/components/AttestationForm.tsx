│           │   │   # ─────────────────────────────────────────
│           │   │   # I 3 componenti visivi della demo.
│           │   │   # Sono tutti "use client" perché gestiscono
│           │   │   # stato (useState, form input, fetch).
│           │   │   # QUANDO: ore 6-14 dell'hackathon.
│           │   │   # ─────────────────────────────────────────
_____________________________________________________________________________________________
│           │   │   # ════════════════════════════════════════════
│           │   │   # SEZIONE 1: INPUT DEI DATI
│           │   │   # ════════════════════════════════════════════
│           │   │   # COSA: il form dove il giudice inserisce dati
│           │   │   #   da attestare. Simula il "payment trigger."
│           │   │   # COME:
│           │   │   #   - Un dropdown per scegliere il tipo di attestazione:
│           │   │   #     "Donazione", "Presenza", "Certificato"
│           │   │   #     (dimostra che l'SDK è generico, non verticale)
│           │   │   #   - Campi input che cambiano in base al tipo:
│           │   │   #     Donazione: importo, destinatario, descrizione
│           │   │   #     Presenza: evento, partecipante, data
│           │   │   #     Certificato: titolo, destinatario, ente
│           │   │   #   - Bottone "Aggiungi al batch" → aggiunge l'item
│           │   │   #     a una lista visibile sotto il form (useState array)
│           │   │   #   - La lista mostra gli item aggiunti con un contatore
│           │   │   #   - Bottone "Seal batch & anchor to XRPL" →
│           │   │   #     chiama POST /api/batch (vedi sotto)
│           │   │   #   - Loading spinner durante l'attesa (la scrittura
│           │   │   #     XRPL richiede ~4-8 secondi su testnet)
│           │   │   # PERCHÉ: il form è il trigger. Simula quello che
│           │   │   #   in Petra sarà il webhook Stripe. All'hackathon
│           │   │   #   non serve un vero pagamento — serve dimostrare
│           │   │   #   che N input diventano 1 root hash on-chain.
│           │   │   # DETTAGLIO UX: il bottone "Seal" è disabilitato
│           │   │   #   se ci sono meno di 2 item nel batch. Un batch
│           │   │   #   con 1 foglia non dimostra niente.
│           │   │   # QUANDO: ore 6-10 dell'hackathon.
