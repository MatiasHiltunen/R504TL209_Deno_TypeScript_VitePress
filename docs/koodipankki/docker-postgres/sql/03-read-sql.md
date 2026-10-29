---
outline: false
---

# docker-postgres/sql/03-read.sql

**Ryhmä:** Dockerin pakollinen PostgreSQL-peruslabra.

Tiedoston sijainti puretussa projektissa on `docker-postgres/sql/03-read.sql`. Kopioi koko sisältö kommentteineen tähän tiedostoon. Suorituskomennot ja odotettu tulos ovat asianomaisessa tutoriaaliluvussa.

[Lataa lähdekoodi tekstinä](/koodit/docker-postgres/sql/03-read.sql.txt) · [Palaa koodipankkiin](/koodipankki/)

````sql
-- SELECT valitsee luettavat sarakkeet, jotta tulosteessa näkyvät tunniste, teksti ja luontihetki.
SELECT id, label, created_at
-- FROM kertoo, mistä taulusta rivit luetaan.
FROM lab_notes
-- ORDER BY näyttää rivit aina tunnisteen mukaisessa nousevassa järjestyksessä.
ORDER BY id;
````
