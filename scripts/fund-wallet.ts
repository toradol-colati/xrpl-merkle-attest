    │   # COSA: script che chiama il faucet XRPL testnet
    │   #   per ricaricare il wallet se finisce gli XRP.
    │   # COME: fetch('https://faucet.altnet.rippletest.net/accounts',
    │   #   { method: 'POST', body: JSON.stringify({
    │   #     destination: walletAddress }) })
    │   # PERCHÉ: durante l'hackathon potresti fare 20+ transazioni
    │   #   di test. Il wallet potrebbe scendere sotto la reserve.
    │   #   Questo script lo ricarica in 5 secondi senza aprire
    │   #   il browser.
    │   # QUANDO: prima dell'hackathon.
