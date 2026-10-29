---
outline: false
---

# docker-postgres/sql/01-schema.sql

**Ryhmä:** Dockerin pakollinen PostgreSQL-peruslabra.

Tiedoston sijainti puretussa projektissa on `docker-postgres/sql/01-schema.sql`. Kopioi koko sisältö kommentteineen tähän tiedostoon. Suorituskomennot ja odotettu tulos ovat asianomaisessa tutoriaaliluvussa.

[Lataa lähdekoodi tekstinä](/koodit/docker-postgres/sql/01-schema.sql.txt) · [Palaa koodipankkiin](/koodipankki/)

````sql
-- Tämä erillinen harjoitustaulu havainnollistaa SQL:ää ja Dockerin pysyvää tallennusta.
-- Se ei korvaa Tehtävätaulu-sovelluksen käyttäjä-, projekti-, tehtävä- ja istuntotauluja.
-- CREATE TABLE luo taulun. IF NOT EXISTS sallii tämän saman rakenteen luomiskomennon toistamisen.
CREATE TABLE IF NOT EXISTS lab_notes (
  -- BIGINT on suuri kokonaisluku; tietokanta tuottaa aina yksilöllisen pääavaimen automaattisesti.
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  -- TEXT on tekstiä. NOT NULL estää puuttuvan arvon ja CHECK rajaa siistityn tekstin pituuden.
  label TEXT NOT NULL CHECK (char_length(trim(label)) BETWEEN 1 AND 200),
  -- TIMESTAMPTZ kuvaa ajanhetkeä; DEFAULT antaa uudelle riville automaattisesti nykyhetken.
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
-- Sulkeva sulku päättää sarakeluettelon ja puolipiste päättää SQL-komennon.
);
````
