│       │   # ══════════════════════════════════════════════
│       │   # IL SIMULATORE DI PAGAMENTO
│       │   # ══════════════════════════════════════════════
│       │   # COSA: la pagina dove il giudice "paga."
│       │   #   Sostituisce AttestationForm.tsx nel piano originale
│       │   #   (quello era troppo generico — questo è specifico
│       │   #   per il flusso donazione).
│       │   #
│       │   # COME:
│       │   #   - Riceve il siteId dalla URL (?site=basilica-roma)
│       │   #   - Mostra il nome del progetto in grande:
│       │   #     "Restauro Basilica di Santa Maria"
│       │   #   - Sotto: 4 bottoni con importi predefiniti:
│       │   #     €3 | €5 | €10 | €20
│       │   #     (il giudice clicca un importo, non lo digita)
│       │   #   - Campo email (obbligatorio — è la "shadow identity")
│       │   #   - Bottone "Dona €X" (grande, prominente)
│       │   #   - Al click:
│       │   #     1. Il bottone mostra un loading (spinner o barra)
│       │   #     2. Aspetta 1.5 secondi (simulazione checkout)
│       │   #     3. Chiama POST /api/donate con { email, amount, siteId }
│       │   #     4. Mostra "Donazione confermata!" con un checkmark
│       │   #     5. Sotto: "La tua donazione (#3 nel batch corrente)
│       │   #        sarà notarizzata su blockchain quando il batch
│       │   #        si chiude."
│       │   #
│       │   # DETTAGLIO: il delay di 1.5 secondi è intenzionale.
│       │   #   Simula il tempo che Stripe impiega per processare.
│       │   #   Senza il delay, il giudice non percepisce che sta
│       │   #   avvenendo un pagamento. Con il delay, capisce che
│       │   #   "qui in produzione ci sarebbe Stripe."
│       │   #
│       │   # PERCHÉ: questo componente dimostra il TRIGGER.
│       │   #   Il flusso è: QR → questa pagina → il pagamento
│       │   #   genera una donazione → la donazione entra nel batch.
│       │   #
│       │   # QUANDO: ore 7-10 dell'hackathon.
