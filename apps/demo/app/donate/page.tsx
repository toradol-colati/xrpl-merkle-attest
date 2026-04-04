│           # ══════════════════════════════════════════════
│           # PAGINA DI DONAZIONE (dove atterra il QR)
│           # ══════════════════════════════════════════════
│           # COSA: la pagina su cui atterra il turista dopo
│           #   aver scansionato il QR code. URL: /donate?site=xxx
│           #
│           # COME:
│           #   - Legge il parametro ?site dalla URL
│           #   - Renderizza DonationCheckout con il siteId
│           #   - Dopo la donazione, mostra un messaggio di
│           #     conferma e un link "Vai al tuo album" che
│           #     porta alla home con la tab album pre-selezionata
│           #
│           # PERCHÉ: è una route separata dalla home perché
│           #   nella realtà il turista arriva qui dal QR code,
│           #   non dalla home. La home è per la demo/admin.
│           #   Questa pagina è l'esperienza utente.
│           #
│           # QUANDO: ore 7-8 dell'hackathon.
