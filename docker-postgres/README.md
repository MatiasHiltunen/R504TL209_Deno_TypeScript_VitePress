# PostgreSQL Dockerissa: erillinen peruslabra

Tämä rinnakkaislabra sopii kaikille backend-poluille. Sanasto, käyttöjärjestelmäkohtainen aloitus, odotetut tulokset ja vianetsintä ovat [Docker-luvussa](../sisalto/08-docker.md).

## Tiedostot

| Tiedosto | Tehtävä |
|---|---|
| `compose.yaml` | Määrittelee PostgreSQL 17 -kontin, paikallisen portin, nimetyn volumen ja valmiustarkistuksen. |
| `.env.example` | Tyhjä salasanan mallipohja. Kopioidaan omalle koneelle nimellä `.env`. |
| `.gitignore` | Estää `.env`-tiedoston lisäämisen tämän kansion Git-versionhallintaan. |
| `sql/01-schema.sql` | Luo labran muistiinpanotaulun ensimmäisessä alustuksessa. |
| `sql/02-write.sql` | Lisää yhden rivin parametrisoidulla SQL-komennolla. |
| `sql/03-read.sql` | Näyttää tallennetut rivit. |

## Ajojärjestys, kun .env on valmisteltu

Aja komennot tässä kansiossa. Ne toimivat sekä PowerShellissa että Bashissa. `#` aloittaa kommentin; kommentin saa kopioida komennon mukana.

```sh
# Tarkista asetusten rakenne tulostamatta salasanan sisältävää koottua kokoonpanoa.
docker compose config --quiet

# Lataa tarvittaessa image, käynnistä kontti ja odota sen valmiustarkistusta.
docker compose up -d --wait

# Näytä palvelun tila; odota healthy-merkintää.
docker compose ps

# Lisää yksi harjoitusrivi; jokainen tämän komennon ajo lisää uuden rivin.
docker compose exec db psql -v ON_ERROR_STOP=1 -U lab_owner -d kurssilabra -f /lab-sql/02-write.sql

# Näytä lisätty rivi.
docker compose exec db psql -v ON_ERROR_STOP=1 -U lab_owner -d kurssilabra -f /lab-sql/03-read.sql

# Poista kontti ja projektiverkko, mutta säilytä nimetty datavolume.
docker compose down

# Luo kontti uudelleen ja liitä siihen sama datavolume.
docker compose up -d --wait

# Tarkista, että aiempi rivi on yhä olemassa ajamatta kirjoitusskriptiä uudelleen.
docker compose exec db psql -v ON_ERROR_STOP=1 -U lab_owner -d kurssilabra -f /lab-sql/03-read.sql

# Lopeta työskentely säilyttäen tietokanta seuraavaa kertaa varten.
docker compose down
```

`lab_owner` on tietokannan ylläpitotunnus. Verkkosovelluksessa käytetään erillistä, rajattua palvelutunnusta. Kirjautuva sovelluskäyttäjä on vielä eri asia.

Lisävalitsin `-v` poistaisi myös datavolumen tietoineen. Sitä ei käytetä tavallisessa lopetuksessa. Alustuksen erityisehdot ja version vaikutus datakansioon selitetään Docker-luvussa.
