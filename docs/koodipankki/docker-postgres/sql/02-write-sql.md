---
outline: false
---

# docker-postgres/sql/02-write.sql

**Ryhmä:** Dockerin pakollinen PostgreSQL-peruslabra.

Tiedoston sijainti puretussa projektissa on `docker-postgres/sql/02-write.sql`. Kopioi koko sisältö kommentteineen tähän tiedostoon. Suorituskomennot ja odotettu tulos ovat asianomaisessa tutoriaaliluvussa.

[Lataa lähdekoodi tekstinä](/koodit/docker-postgres/sql/02-write.sql.txt) · [Palaa koodipankkiin](/koodipankki/)

````sql
-- PREPARE nimeää SQL-komennon ja määrittelee sen yhden parametrin tekstiksi.
-- Parametri on erikseen annettava arvo: sitä ei liimata osaksi SQL-komennon rakennetta.
PREPARE add_lab_note(text) AS
  -- INSERT lisää uuden rivin; id ja created_at saavat arvonsa automaattisesti.
  INSERT INTO lab_notes (label)
  -- $1 on ensimmäisen parametrin paikka, ei shell-muuttuja tässä SQL-tiedostossa.
  VALUES ($1);

-- EXECUTE antaa valmistellulle komennolle varsinaisen tekstiarvon.
EXECUTE add_lab_note('Tervehdys, pysyva data!');

-- DEALLOCATE vapauttaa nimetyn valmistellun komennon tässä tietokantayhteydessä.
DEALLOCATE add_lab_note;
````
