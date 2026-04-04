L'SDK è il file di prima spezzato in 4 moduli + i test.

│   # DOCUMENTAZIONE DEL PROGETTO
│   # è un deliverable esplicito degli hackathon XRPL.
│   #   I giudici lo leggono. Deve spiegare in 30 secondi:
│   #   cos'è, che problema risolve, come si lancia la demo.
│   # COME: titolo, una frase, il problema (Owner Reserve),
│   #   la soluzione (Merkle-in-Memo), come installare e lanciare,
│   #   link alla transazione di esempio su Bithomp testnet,
│   #   dichiarazione del pre-work.
│   # QUANDO: bozza prima dell'hackathon, finalizzato durante
│   #   le ultime ore dell'hackathon con screenshot e qr code reali.

COMPLETE DEMO FLOW:
1. APRE LA HOME → vede il QR code (tab "Scansiona & Dona")
2. SCANSIONA IL QR (o clicca il link) → atterra su /donate?site=davedere
3. SULLA PAGINA DONAZIONE:
   - Sceglie €5
   - Inserisce email: giudice@test.com
   - Clicca "Dona €5"
   - Vede il loading (1.5 sec) → "Donazione confermata! (#1 nel batch)"
   - Ripete 2-3 volte con email diverse (simula più turisti)
4. TORNA ALLA HOME → tab "Batch Monitor"
   - Vede: "3 donazioni in attesa | Totale: €20"
   - Lista delle 3 donazioni
   - Clicca "SEAL BATCH & ANCHOR TO XRPL"
   - Loading 5-8 secondi (costruzione tree + scrittura XRPL)
   - RISULTATO: root hash + link Bithomp (clicca e verifica!)
5. TAB "Il tuo album"
   - Inserisce giudice@test.com
   - Vede la sua CertificateCard con i colori derivati dall'hash
   - Clicca "Verifica on-chain" → si apre Bithomp
   - Clicca "Verifica proof" → la sezione sotto mostra VERDE
6. PITCH: "Questo flusso, in produzione, ha Stripe al posto del
   bottone simulato, PostgreSQL al posto della memoria, e la
   Card diventa la Petra Card con il design istituzionale."


Riepilogo:

Prima dell'hackathon______________________________________________________________
packages/sdk/           ← TUTTO (4 funzioni + test)
scripts/                ← TUTTO (fund-wallet + test-e2e)
docs/                   ← TUTTO (pitch + cost comparison)
File radice             ← TUTTO (package.json, tsconfig, .env, README bozza)

Durante l'hackathon_______________________________________________________________
apps/demo/app/api/      ← I 2 endpoint (ore 1-5)
apps/demo/app/page.tsx  ← La pagina principale (ore 5-6)
apps/demo/components/   ← I 4 componenti (ore 6-18)
README.md               ← Versione finale con screenshot (ultime ore)
docs/pitch-deck.md      ← Aggiornamento con screenshot (ultime ore)

Dopo l'hackathon___________________________________________________
packages/sdk/ → diventa un pacchetto nel monorepo Petra
apps/demo/components/CertificateCard.tsx → evolve nella Petra Card
apps/demo/api/batch/ → evolve nel webhook handler di Stripe
apps/demo/api/verify/ → diventa l'endpoint di verifica pubblica

Come si collega al monorepo Petra
Il monorepo Petra oggi ha /frontend (Next.js, il sito istituzionale).
Dopo l'hackathon:
Copi packages/sdk dentro il monorepo Petra come workspace
In Petra, npm install xrpl-merkle-sdk punta al workspace locale
Il webhook handler di Stripe in Petra importa:
ts   import { buildTree, anchorToXRPL, getProof } from 'xrpl-merkle-sdk'
La PWA di Petra importa CertificateCard (evoluto in Petra Card)
Il codice dell'hackathon non viene buttato — diventa il fondamento
del layer blockchain di Petra.
