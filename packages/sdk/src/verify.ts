│           │   # ════════════════════════════════════════════
│           │   # FUNZIONE 3: getProof(tree, leafHash)
│           │   # FUNZIONE 4: verifyProof(proof, leafHash, rootHash)
│           │   # ════════════════════════════════════════════
│           │   # COSA:
│           │   #   getProof: dato l'albero e l'hash di una foglia,
│           │   #     restituisce il "percorso" dalla foglia alla root.
│           │   #     È un array di hash intermedi con posizione (left/right).
│           │   #   verifyProof: dato un proof, un leaf hash, e un root hash,
│           │   #     ricalcola il percorso e controlla se il risultato
│           │   #     corrisponde alla root. Restituisce true/false.
│           │   # PERCHÉ: il proof è quello che dai all'utente.
│           │   #   L'utente può verificare indipendentemente che il
│           │   #   suo dato era nel batch, senza fidarsi del server.
│           │   #   Il giudice all'hackathon vedrà la verifica in azione.
│           │   # COME: wrapper sottili su merkletreejs:
│           │   #   tree.getProof(leaf) e MerkleTree.verify(proof, leaf, root)
│           │   # ~20 righe di codice totali per entrambe.
│           │   # QUANDO: prima dell'hackathon.
