│       │   # ══════════════════════════════════════════════
│       │   # IL MONITOR DEL BATCH (la "control room")
│       │   # ══════════════════════════════════════════════
│       │   # COSA: mostra lo stato del batch corrente e
│       │   #   permette di sealarlo. È la vista "admin" —
│       │   #   nella demo la vede il giudice per capire
│       │   #   cosa succede dietro le quinte.
│       │   #
│       │   # COME:
│       │   #   - Poll GET /api/pending ogni 3 secondi (o usa
│       │   #     un semplice setInterval — non serve WebSocket)
│       │   #   - Mostra:
│       │   #     • "Batch corrente: 4 donazioni in attesa"
│       │   #     • Lista delle donazioni: email (troncata),
│       │   #       importo, sito, timestamp
│       │   #     • Importo totale del batch: "€38.00"
│       │   #   - Bottone "SEAL BATCH & ANCHOR TO XRPL" (grande, rosso)
│       │   #     • Al click: chiama POST /api/batch
│       │   #     • Loading: "Costruzione Merkle Tree... Scrittura su
│       │   #       XRPL... Attesa validazione..." (messaggi sequenziali
│       │   #       che appaiono durante i ~5-8 secondi di attesa)
│       │   #     • Risultato: root hash, link Bithomp, numero foglie
│       │   #   - Dopo il seal, sotto appare la sezione BatchResult
│       │   #     (già prevista) con la visualizzazione dell'albero
│       │   #     e il link alla transazione.
│       │   #
│       │   # PERCHÉ: senza questo componente, il giudice non vede
│       │   #   l'accumulo delle donazioni nel batch. Vede solo
│       │   #   "donazione confermata" e poi magicamente un tree.
│       │   #   Con il monitor, vede il batch che si riempie uno
│       │   #   alla volta — dimostra il concetto di aggregazione.
│       │   #
│       │   # QUANDO: ore 10-12 dell'hackathon.

