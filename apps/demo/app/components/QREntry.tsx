│       │   # ══════════════════════════════════════════════
│       │   # LA SCANSIONE DEL QR CODE
│       │   # ══════════════════════════════════════════════
│       │   # COSA: il primo componente che il giudice vede.
│       │   #   Mostra un QR code grande al centro dello schermo.
│       │   #   Sotto il QR: "Scansiona per donare" + l'URL in chiaro.
│       │   #
│       │   # COME:
│       │   #   - Usa la libreria "qrcode" (npm: qrcode) per generare
│       │   #     il QR come data URL (base64 PNG) lato server,
│       │   #     oppure "qrcode.react" per generarlo come componente
│       │   #     React direttamente nel browser.
│       │   #   - Il QR punta all'URL della pagina donazione:
│       │   #     in sviluppo → http://localhost:3000/donate
│       │   #     in deploy → https://tuodominio.vercel.app/donate
│       │   #   - Sotto il QR mostra due bottoni:
│       │   #     "Scansiona col telefono" (per il giudice che vuole
│       │   #       provare dal telefono — wow factor se funziona)
│       │   #     "Apri la pagina donazione" (link diretto per chi
│       │   #       non vuole/può scansionare — è un fallback)
│       │   #   - Il QR contiene un parametro: ?site=basilica-roma
│       │   #     In questo modo la pagina donazione sa già a quale
│       │   #     progetto si sta donando (lo prende dalla URL).
│       │   #
│       │   # PERCHÉ: dimostra il flusso fisico. Il giudice vede:
│       │   #   "il turista cammina per Roma, vede il QR sul cantiere,
│       │   #   lo scansiona col telefono, e atterra sulla pagina
│       │   #   di donazione." Senza questo passaggio, il giudice
│       │   #   non capisce il trigger iniziale.
│       │   #
│       │   # DIPENDENZA: npm install qrcode.react
│       │   #   (aggiungila al package.json della demo PRIMA
│       │   #   dell'hackathon, così è già installata)
│       │   #
│       │   # QUANDO: ore 6-7 dell'hackathon.
