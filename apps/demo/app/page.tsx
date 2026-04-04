│           │   # ════════════════════════════════════════════════
│           │   # LA PAGINA PRINCIPALE DELLA DEMO
│           │   # ════════════════════════════════════════════════
│           │   # COSA: Server Component che renderizza il titolo,
│           │   #   la descrizione, e le tre sezioni della demo.
│           │   #   Le sezioni sono Client Component importati.
│           │   # COME:
│           │   #   <main>
│           │   #     <h1>XRPL Merkle Attestation</h1>
│           │   #     <p>Batch N attestazioni, 1 transazione XRPL.</p>
│           │   #     <AttestationForm />   ← sezione 1
│           │   #     <BatchResult />       ← sezione 2
│           │   #     <VerifyProof />       ← sezione 3
│           │   #   </main>
│           │   # PERCHÉ: separare in componenti rende il codice
│           │   #   gestibile durante le 36 ore — puoi lavorare su
│           │   #   una sezione senza rompere le altre.
│           │   # QUANDO: ore 5-6 dell'hackathon.
____________________________________________________________________________________________
AGGIORNAMENTO:
│   │   # La home ora ha 3 sezioni:
│   │   #   1. QREntry (il QR code + spiegazione)
│   │   #   2. BatchMonitor (la control room del batch)
│   │   #   3. Album con VerifyProof (l'album del donatore)
│   │   #
│   │   # Layout a tab o scroll:
│   │   #   Tab 1: "Scansiona & Dona" → QREntry
│   │   #   Tab 2: "Batch Monitor" → BatchMonitor + BatchResult
│   │   #   Tab 3: "Il tuo album" → Album + VerifyProof
│   │   #
│   │   # In alternativa, tutto in una pagina scrollabile
│   │   # con sezioni separate da linee — più semplice
│   │   # da implementare all'hackathon.
