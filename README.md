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
1. HOME → il giudice vede il QR code + spiegazione del progetto
2. SCANSIONA IL QR → atterra su /donate?site=basilica-roma
3. PAGINA DONAZIONE:
   - Vede "Restauro Basilica di Santa Maria"
   - Sceglie €5 dai bottoni predefiniti
   - Inserisce email (giudice@test.com)
   - Clicca "Dona €5"
   - Loading 1.5s → "Donazione confermata! (#1 nel batch)"
   - La CertificateCard appare subito (SENZA proof — dice
     "Notarizzazione in corso...")
   - Ripete 2-3 volte con email diverse
4. HOME → tab "Batch Monitor":
   - "4 donazioni in attesa | Totale: €23"
   - Lista delle donazioni (email troncata, importo, sito)
   - Clicca "SEAL BATCH & ANCHOR TO XRPL"
   - Loading ~5-8 secondi con messaggi sequenziali:
     "Hashing delle donazioni..."
     "Costruzione Merkle Tree..."
     "Firma transazione XRPL..."
     "Attesa validazione ledger..."
   - RISULTATO: root hash + link Bithomp + conteggio foglie
   - Clicca il link Bithomp → si apre l'explorer testnet →
     il giudice VEDE il Memo con la root hash. Momento wow.
5. HOME → tab "Il tuo album":
   - Inserisce giudice@test.com
   - La CertificateCard ora mostra "Verificata su XRPL"
     con il checkmark verde (il proof è stato allegato)
   - Colori/pattern unici derivati dal leaf hash
   - Clicca "Verifica on-chain" → apre Bithomp
   - Clicca "Verifica proof" → la sezione VerifyProof
     mostra il proof path → VERDE
6. PITCH (3 minuti):
   "In produzione, il bottone 'Dona' è Stripe Checkout.
   L'email arriva dal webhook, non dal form.
   La Map in memoria è PostgreSQL.
   Il bottone 'Seal' è un job automatico ogni 24 ore.
   La CertificateCard è la Petra Card.
   Tutto il resto — l'SDK, il Merkle Tree, la scrittura
   XRPL, la verifica — è identico."


Riepilogo:

Prima dell'hackathon______________________________________________________________
packages/sdk/          ← FATTO (4 funzioni + test + tipi)
scripts/               ← FATTO (fund-wallet + test-e2e)
docs/                  ← FATTO (pitch-deck + cost-comparison)
File radice            ← FATTO (package.json, tsconfig, .env, README bozza)
apps/demo/             ← Struttura creata (package.json, config, layout, globals)

Durante l'hackathon_______________________________________________________________
Ore 1-5:    Scrivi il codice dentro i route.ts delle API
            (store.ts, donate, batch, pending, verify, album)
Ore 5-7:    page.tsx (home con tab) + donate/page.tsx
Ore 7-14:   I componenti React:
            - QREntry.tsx (QR code con qrcode.react)
            - DonationCheckout.tsx (simulazione pagamento)
            - BatchMonitor.tsx (lista pending + bottone seal)
            - BatchResult.tsx (root hash + link Bithomp + albero)
            - VerifyProof.tsx (campo hash → verde/rosso)
            - Album.tsx (email → griglia CertificateCard)
            - CertificateCard.tsx (card visiva con colori da hash)
Ore 14-18:  Polish, gamification, secondo use case
Ore 18-20:  Video demo + aggiornamento pitch + README finale
Ore 20-24:  Buffer imprevisti + submission

Dopo l'hackathon___________________________________________________
packages/sdk/                    → pacchetto npm nel monorepo Petra
apps/demo/app/api/donate/        → evolve nel webhook handler Stripe
apps/demo/app/api/batch/         → evolve nel job BullMQ automatico
apps/demo/app/api/verify/        → endpoint pubblico di verifica
apps/demo/app/api/album/         → endpoint autenticato (Magic Link)
apps/demo/app/components/        → componenti della PWA Petra
CertificateCard.tsx              → Petra Card con design istituzionale
store.ts (Map in-memory)         → PostgreSQL + Prisma

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
