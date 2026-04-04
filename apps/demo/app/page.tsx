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
