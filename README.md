Il punto chiave della struttura: sono 13 file di codice in totale. 5 nell'SDK (pre-work), 8 nella demo (hackathon). L'SDK è il file che ti ho dato prima spezzato in 4 moduli + i test. La demo sono 2 API route + 4 componenti React + layout + page. Tutto il resto è configurazione.
Il fatto che sia Next.js + Tailwind + TypeScript con App Router significa che quando torni dall'hackathon, il codice della demo si integra nel monorepo Petra senza riscritture — stessa architettura, stesse convenzioni, stesso stack.
│   # COSA: documentazione del progetto.
│   # PERCHÉ: è un deliverable esplicito degli hackathon XRPL.
│   #   I giudici lo leggono. Deve spiegare in 30 secondi:
│   #   cos'è, che problema risolve, come si lancia la demo.
│   # COME: titolo, una frase, il problema (Owner Reserve),
│   #   la soluzione (Merkle-in-Memo), come installare e lanciare,
│   #   link alla transazione di esempio su Bithomp testnet,
│   #   dichiarazione del pre-work.
│   # QUANDO: bozza prima dell'hackathon, finalizzato durante
│   #   le ultime ore dell'hackathon con screenshot e link reali.

Riepilogo: cosa fai QUANDO
Prima dell'hackathon (a casa)______________________________________________________________
packages/sdk/           ← TUTTO (4 funzioni + test)
scripts/                ← TUTTO (fund-wallet + test-e2e)
docs/                   ← TUTTO (pitch + cost comparison)
File radice             ← TUTTO (package.json, tsconfig, .env, README bozza)
Durante l'hackathon (36 ore)_______________________________________________________________
apps/demo/app/api/      ← I 2 endpoint (ore 1-5)
apps/demo/app/page.tsx  ← La pagina principale (ore 5-6)
apps/demo/components/   ← I 4 componenti (ore 6-18)
README.md               ← Versione finale con screenshot (ultime ore)
docs/pitch-deck.md      ← Aggiornamento con screenshot (ultime ore)
Dopo l'hackathon (integrazione in Petra)___________________________________________________
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
