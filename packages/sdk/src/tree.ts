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
___________________________________________________________________________________________________
AGGIORNAMENTO:
import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";

export interface LeafData {
  id: string;           // UUID v4, 36 chars
  amountCents: number;  // intero, NON float (5.00 EUR = 500)
  currency: string;     // ISO 4217, 3 chars ("EUR")
  siteId: string;       // short ID del sito
  timestampUnix: number; // intero epoch in secondi, NON ISO string
}

/**
 * Serializzazione canonica deterministica.
 * Chiunque in qualsiasi linguaggio che rispetti queste regole
 * produce lo stesso hash per gli stessi dati.
 */
function canonicalize(item: LeafData): Buffer {
  const parts = [
    Buffer.from(item.id.normalize("NFC"), "utf-8"),
    Buffer.from(item.amountCents.toString(), "utf-8"),
    Buffer.from(item.currency.normalize("NFC"), "utf-8"),
    Buffer.from(item.siteId.normalize("NFC"), "utf-8"),
    Buffer.from(item.timestampUnix.toString(), "utf-8"),
  ];
  // Ordine fisso, definito dallo schema (non dall'input)
  const parts = [
    Buffer.from(item.id, "utf-8"),
    Buffer.from(item.amountCents.toString(), "utf-8"),
    Buffer.from(item.currency, "utf-8"),
    Buffer.from(item.siteId, "utf-8"),
    Buffer.from(item.timestampUnix.toString(), "utf-8"),
  ];
  // Separatore NUL (byte 0x00) tra i campi — previene ambiguità
  // es. {"a":"bc"} vs {"ab":"c"} avrebbero la stessa concatenazione
  const separator = Buffer.from([0x00]);
  return Buffer.concat(parts.flatMap((p, i) =>
    i === 0 ? [p] : [separator, p]
  ));
}

export function hashLeaf(item: LeafData): string {
  const canonical = canonicalize(item);
  return "0x" + keccak256(canonical).toString("hex");
}

export function buildTree(items: LeafData[]): BatchResult {
  const leafHashes = items.map(hashLeaf);

  // Ordinamento lessicografico deterministico delle foglie
  const sortedLeaves = [...leafHashes].sort();

  // Mappa item → leaf hash, ma mantieni l'ordine ordinato nell'albero
  const itemsByHash = new Map(
    items.map((item, i) => [leafHashes[i], item])
  );

  const tree = new MerkleTree(
    sortedLeaves.map((l) => Buffer.from(l.replace("0x", ""), "hex")),
    keccak256,
    { sortPairs: true }
  );

  return {
    root: tree.getHexRoot(),
    leaves: sortedLeaves,  // ← le foglie nell'ordine dell'albero
    tree,
    itemsByHash,           // ← per risalire al dato originale da un hash
  };
}

// Nel Memo XRPL
MemoType: convertStringToHex("application/vnd.xrpl-merkle-attestation.v1")

// Nel proof restituito all'utente
export interface MerkleProof {
  schemaVersion: 1;       // ← incrementale
  algorithm: "keccak256"; // ← esplicito
  leafHash: string;
  path: ProofItem[];
  rootHash: string;
  anchorTx: string;       // txHash XRPL
}