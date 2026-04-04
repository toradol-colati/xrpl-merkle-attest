│           │   │   # ════════════════════════════════════════════
│           │   │   # SEZIONE 3: VERIFICA DI UN PROOF
│           │   │   # ════════════════════════════════════════════
│           │   │   # COSA: il verificatore indipendente.
│           │   │   # COME:
│           │   │   #   - Un campo input dove incolli un leaf hash
│           │   │   #     (o lo ricevi dalla sezione 2 via prop/callback)
│           │   │   #   - Bottone "Verifica"
│           │   │   #   - Chiama GET /api/verify/[hash]
│           │   │   #   - Se valido: animazione verde, checkmark,
│           │   │   #     mostra il proof path (i nodi intermedi),
│           │   │   #     link alla transazione XRPL
│           │   │   #   - Se invalido: animazione rossa, X mark,
│           │   │   #     messaggio "questo hash non appartiene al batch"
│           │   │   # PERCHÉ: questa è la dimostrazione crittografica.
│           │   │   #   Il giudice vede che chiunque può verificare
│           │   │   #   l'appartenenza di un dato al batch senza fidarsi
│           │   │   #   del server. È il proof off-chain in azione.
│           │   │   # VISUAL LAYER: il risultato verde/rosso con
│           │   │   #   animazione è la "visual layer" del flusso.
│           │   │   #   Se hai tempo, genera un'immagine SVG dinamica
│           │   │   #   per ogni attestazione verificata — simile
│           │   │   #   a quello che saranno le Petra Card.
│           │   │   # QUANDO: ore 10-14 dell'hackathon.
