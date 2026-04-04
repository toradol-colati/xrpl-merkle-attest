│   │   │       # ══════════════════════════════════════════════
│   │   │       # GET /api/album?email=xxx
│   │   │       # L'ALBUM DEI CERTIFICATI DI UN DONATORE
│   │   │       # ══════════════════════════════════════════════
│   │   │       # COSA: dato un'email, restituisce tutti i
│   │   │       #   certificati emessi per quel donatore.
│   │   │       #
│   │   │       # COME:
│   │   │       #   export async function GET(req: Request) {
│   │   │       #     const { searchParams } = new URL(req.url)
│   │   │       #     const email = searchParams.get("email")
│   │   │       #
│   │   │       #     if (!email) {
│   │   │       #       return Response.json(
│   │   │       #         { error: "Email richiesta" },
│   │   │       #         { status: 400 }
│   │   │       #       )
│   │   │       #     }
│   │   │       #
│   │   │       #     const certs = certificates.get(email) || []
│   │   │       #     return Response.json({ email, certificates: certs })
│   │   │       #   }
│   │   │       #
│   │   │       # PERCHÉ: questo è l'endpoint che alimenta la
│   │   │       #   sezione "Album" del frontend. Il donatore
│   │   │       #   inserisce la sua email → vede tutte le sue
│   │   │       #   Petra Card con i proof verificabili.
│   │   │       #   In Petra sarà dietro autenticazione (Magic Link).
│   │   │       #   Nella demo è un semplice campo email.
│   │   │       #
│   │   │       # QUANDO: ore 4-5 dell'hackathon
