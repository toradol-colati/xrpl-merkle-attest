│   │   │       # ══════════════════════════════════════════════
│   │   │       # POST /api/donate
│   │   │       # IL TRIGGER DI PAGAMENTO (SIMULATO)
│   │   │       # ══════════════════════════════════════════════
│   │   │       # COSA: simula il webhook che arriverebbe da Stripe
│   │   │       #   dopo un pagamento. In Petra, questo endpoint
│   │   │       #   è chiamato dal webhook Stripe. Nella demo,
│   │   │       #   è chiamato dal bottone "Simula pagamento".
│   │   │       #
│   │   │       # COME:
│   │   │       #   export async function POST(req: Request) {
│   │   │       #     const { email, amount, siteId, siteName } = await req.json()
│   │   │       #
│   │   │       #     // Crea l'oggetto donazione
│   │   │       #     const donation: DonationItem = {
│   │   │       #       id: crypto.randomUUID(),
│   │   │       #       email,
│   │   │       #       amount,
│   │   │       #       currency: "EUR",
│   │   │       #       siteId,
│   │   │       #       siteName,
│   │   │       #       timestamp: new Date().toISOString()
│   │   │       #     }
│   │   │       #
│   │   │       #     // Aggiungi al batch corrente
│   │   │       #     const current = pendingDonations.get("current") || []
│   │   │       #     current.push(donation)
│   │   │       #     pendingDonations.set("current", current)
│   │   │       #
│   │   │       #     return Response.json({
│   │   │       #       success: true,
│   │   │       #       donation,
│   │   │       #       pendingCount: current.length,
│   │   │       #       message: `Donazione #${current.length} aggiunta al batch`
│   │   │       #     })
│   │   │       #   }
│   │   │       #
│   │   │       # PERCHÉ: separa il "ricevere la donazione" dal
│   │   │       #   "chiudere il batch". Nella demo il giudice
│   │   │       #   può fare 5 donazioni una dopo l'altra e poi
│   │   │       #   sealare il batch tutto insieme. Dimostra che
│   │   │       #   il sistema accumula e poi processa in blocco.
│   │   │       #
│   │   │       # QUANDO: ore 2-3 dell'hackathon.
