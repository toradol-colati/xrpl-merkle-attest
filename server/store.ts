DURING HACKATHON

in-memory array (niente DB, niente PostgreSQL)

POST /api/attest — riceve record, salva in memoria, torna batch ID
POST /api/batch/:id/seal — chiama sdk: buildTree + anchorToXRPL
GET /api/verify/:hash — chiama sdk: verifyProof, torna verde/rosso + link Bithomp
