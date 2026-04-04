│           │   # ════════════════════════════════════════════
│           │   # FUNZIONE 1: buildTree(items: LeafData[])
│           │   # ════════════════════════════════════════════
│           │   # COSA: prende un array di oggetti (donazioni,
│           │   #   presenze, certificati — qualsiasi cosa),
│           │   #   hashsha ogni oggetto con keccak256,
│           │   #   costruisce un MerkleTree con merkletreejs,
│           │   #   restituisce la root hash e l'albero.
│           │   # COME:
│           │   #   1. JSON.stringify ogni item (ordine deterministico)
│           │   #   2. keccak256(stringa) → hash della foglia
│           │   #   3. new MerkleTree(foglie, keccak256, {sortPairs:true})
│           │   #   4. return { root: tree.getHexRoot(), leaves, tree }
│           │   # PERCHÉ: è il cuore crittografico. Trasforma N dati
│           │   #   in 1 hash che li rappresenta tutti.
│           │   # DETTAGLIO CRITICO: sortPairs:true rende l'albero
│           │   #   deterministico — lo stesso input produce sempre
│           │   #   lo stesso output, indipendentemente dall'ordine.
│           │   # ~15 righe di codice.
│           │   # QUANDO: prima dell'hackathon.
