│           # ══════════════════════════════════════════════
│           # L'ALBUM DEI CERTIFICATI
│           # ══════════════════════════════════════════════
│           # COSA: la sezione dove il donatore vede tutti i
│           #   suoi certificati. Simula l'album Petra.
│           #
│           # COME:
│           #   - Campo email + bottone "Vedi il mio album"
│           #   - Chiama GET /api/album?email=xxx
│           #   - Se l'email ha certificati: mostra una griglia
│           #     di CertificateCard, uno per ogni donazione
│           #   - Se l'email non ha certificati: "Nessun certificato
│           #     trovato. Fai una donazione per riceverne uno!"
│           #   - Ogni CertificateCard mostra:
│           #     • Importo e progetto
│           #     • Hash visuale (pattern di colori derivato dall'hash)
│           #     • Data della donazione
│           #     • Bottone "Verifica on-chain" che apre Bithomp
│           #     • Bottone "Verifica proof" che passa il leafHash
│           #       alla sezione VerifyProof
│           #   - Contatore: "Album: 3 certificati | 2 progetti |
│           #     €35 donati" (dati calcolati dalla lista)
│           #
│           # GAMIFICATION: se hai tempo (ore 16+), aggiungi:
│           #   - Badge "Prima donazione!" per il primo certificato
│           #   - Badge "Collezionista" per 3+ certificati
│           #   - Contatore "Petri: 35" (1 Petri per € donato)
│           #   - Progress bar "prossimo badge: 5 donazioni"
│           #   Non è essenziale — è polish. Se non hai tempo,
│           #   la griglia di card è sufficiente.
│           #
│           # PERCHÉ: dimostra che il donatore può tornare,
│           #   inserire la sua email, e ritrovare tutto.
│           #   È il prototipo dell'esperienza post-donazione
│           #   di Petra. Senza l'album, il giudice vede solo
│           #   singoli certificati scollegati — con l'album,
│           #   vede una collezione personale.
│           #
│           # QUANDO: ore 12-14 dell'hackathon.
