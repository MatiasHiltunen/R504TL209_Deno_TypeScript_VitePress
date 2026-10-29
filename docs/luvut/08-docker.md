# 08 Dockerin perusteet tekemällä

## Mitä tässä opitaan?

Käynnistät PostgreSQL-tietokannan Dockerilla, lisäät tietoa, poistat kontin ja osoitat, että tieto säilyy. Tämä luku kuuluu kaikille suorituspoluille. Jos varsinainen sovelluksesi käyttää SQLiteä, pidät sen ennallaan ja teet tämän erillisen labran.

**PostgreSQL**, lyhyesti Postgres, on tietokantapalvelin. Se on jatkuvasti käynnissä oleva ohjelma, johon toinen ohjelma muodostaa tietokantayhteyden. **SQLite** taas toimii sovelluksen käyttämänä kirjastona ja tallentaa tietoa tiedostoon. Sille ei tässä esimerkkipolussa käynnistetä erillistä tietokantapalvelinta.

## 8.1 Sanat ensin

| Käsite | Selitys tässä harjoituksessa |
|---|---|
| Docker | Työkalut, joilla paketoidaan, käynnistetään ja hallitaan kontteja. |
| Isäntäkone, host | Oma tietokoneesi, jonka terminaalissa annat Docker-komentoja. |
| Image eli konttikuva | Valmis ohjelmapaketti ja sen suorittamiseen tarvittavat tiedostot. Tässä `postgres:17`. |
| Tag eli tunniste | Imagen nimen kaksoispisteen jälkeinen osa. `17` rajaa PostgreSQL:n pääversion; sen sisältö voi päivittyä saman pääversion sisällä. |
| Kontti, container | Imagen perusteella käynnistetty eristetty ohjelmaprosessi ympäristöineen. Sama image voi toimia monen kontin pohjana. |
| Dockerfile | Tekstitiedosto, jonka rakennusohjeista tehdään image. |
| Docker Compose | Työkalu, joka käynnistää tiedostossa kuvatut palvelut, verkot ja tallennustilat yhdessä. Komento kirjoitetaan `docker compose`. |
| Portti | Numero, jolla verkkoyhteys ohjataan tiettyyn palveluun. PostgreSQL käyttää tässä porttia 5432. |
| Volume | Dockerin hallitsema tallennustila, joka voi säilyä kontin poistamisen jälkeen. |
| Bind mount | Oman koneen tiedoston tai kansion liittäminen kontin polkuun. Tässä SQL-tiedostot annetaan kontille luettaviksi. |
| Verkko, network | Yhteys, jossa palvelukontit voivat tavoittaa toisensa. Compose luo oletusverkon tätä projektia varten. |
| Ympäristömuuttuja, environment variable | Nimetty asetus, jonka käynnistyvä ohjelma lukee ympäristöstään. Tässä tietokannan salasanan nimi on `POSTGRES_PASSWORD`. |
| Healthcheck | Määräajoin tehtävä tarkistus: vastaako palvelu jo yhteydenottoihin? |

Kontti ei ole kokonainen itsenäinen tietokone. Se eristää prosessin ympäristöä, mutta käyttää Dockerin suoritusympäristön käyttöjärjestelmäydintä. Docker Desktop voi järjestää Linux-konttien suorittamisen virtuaalikoneen kautta. Kontti ei myöskään tee turvattomasta sovelluskoodista turvallista. [Docker: kontti](https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-a-container/) ja [konttikuva](https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-an-image/).

Dockerfilessä `FROM` valitsee pohjakuvan, `WORKDIR` työskentelykansion, `COPY` kopioitavat tiedostot, `RUN` rakennuksen aikana ajettavan komennon, `USER` suorittavan käyttäjän ja `CMD` kontin oletuskäynnistyskomennon. `EXPOSE` kertoo imagen tarkoitetun portin; se ei yksin avaa porttia omalle koneelle. Oman sovelluksen kontittaminen on lisätehtävä, jossa käytetään näitä ohjeita. [Docker: Dockerfilen kirjoittaminen](https://docs.docker.com/get-started/docker-concepts/building-images/writing-a-dockerfile/).

## 8.2 Valmistele työkalut ja tiedostot

Asenna oman käyttöjärjestelmäsi Docker Desktop ja käynnistä se. Linuxissa vaihtoehto on Docker Engine ja Compose-liitännäinen. Käytä [Dockerin käyttöjärjestelmäkohtaisia asennusohjeita](https://docs.docker.com/get-started/get-docker/). Windowsissa käytä Linux-kontteja. Jos oppilaitoksen tietokoneella ei voi asentaa työkaluja, tee sama labra oppilaitoksen Docker-ympäristössä; Docker-osaamistavoite säilyy.

Avaa terminaali. Terminaali on ikkuna, johon kirjoitat komentoja. PowerShell, Bash ja Zsh ovat komentotulkkeja: ne lukevat komennon ja käynnistävät pyydetyn ohjelman. Alla `#` aloittaa selittävän kommentin. Kommentit voi kopioida mukaan.

```sh
# Näytä Docker-asiakkaan ja käynnissä olevan Docker-palvelun versiotiedot.
docker version

# Tarkista, että Docker Compose on asennettu.
docker compose version
```

**Odotettu tulos:** ensimmäinen komento näyttää osat `Client` ja `Server`; toinen näyttää Composen version. Jos `Server`-osa puuttuu ja saat yhteysvirheen, käynnistä Docker Desktop tai Docker Engine ennen jatkamista.

Avaa materiaalipaketin juurikansio editorissa. Sieltä löytyy kansio `docker-postgres`. Pidä kaikki sen tiedostot mukana, myös `.env.example`. Valitse seuraavista vain oma komentotulkkisi.

**Windows, PowerShell:**

```powershell
# Siirry materiaalipaketin juuresta labran kansioon.
Set-Location docker-postgres

# Luo ympäristöasetusten oma tiedosto mallipohjasta.
Copy-Item .env.example .env
```

**macOS tai Linux, Bash/Zsh:**

```sh
# Siirry materiaalipaketin juuresta labran kansioon.
cd docker-postgres

# Luo ympäristöasetusten oma tiedosto mallipohjasta.
cp .env.example .env
```

**Odotettu tulos:** kansiossa on nyt `.env`. Avaa se editorissa. Kirjoita `POSTGRES_PASSWORD=`-rivin yhtäsuuruusmerkin jälkeen tähän labraan tarkoitettu, vähintään 20 kirjaimen ja numeron harjoitussalasana. Voit tuottaa sen salasananhallintaohjelmalla. Älä käytä omaa todellista palvelusalasanaasi. Näiden ohjeiden yksinkertaisen tiedostomuodon vuoksi käytä tällä kertaa vain ASCII-kirjaimia ja numeroita ilman välilyöntejä.

`.env` on tavallinen tekstitiedosto, ei salausta. Sen mallipohjan voi palauttaa; oikea salasanatiedosto jää omalle koneelle. Compose sijoittaa tiedoston arvon `compose.yaml`-tiedoston vastaavaan muuttujakohtaan. [Docker: ympäristömuuttujien korvaaminen](https://docs.docker.com/compose/how-tos/environment-variables/variable-interpolation/).

## 8.3 Lue Compose-tiedosto ennen käynnistystä

Avaa `docker-postgres/compose.yaml`. Jokainen asetus on kommentoitu. Tiedostomuoto on **YAML**: sisennys kertoo, mikä asetus kuuluu millekin palvelulle. Säilytä välilyönnit, älä muuta niitä sarkaimiksi.

| Tiedoston kohta | Mitä se tekee |
|---|---|
| `services` → `db` | Määrittelee yhden tietokantapalvelun. |
| `image: postgres:17` | Valitsee valmiin PostgreSQL 17 -imagen. |
| `environment` | Antaa tietokannan nimen, alustavan ylläpitotunnuksen ja salasanan. |
| `127.0.0.1:5432:5432` | Liittää oman koneen paikallisen portin 5432 kontin porttiin 5432. |
| `pgdata:/var/lib/postgresql/data` | Liittää nimetyn volumen PostgreSQL 17:n tietokantakansioon. |
| SQL-tiedostojen liitokset ja `ro` | Antavat labran SQL-tiedostot kontille vain luettaviksi; `ro` tarkoittaa read only. |
| `healthcheck` | Tarkistaa, että tietokantapalvelin ottaa yhteyksiä vastaan. |
| Viimeinen `volumes`-osa | Määrittelee Composen luoman nimetyn tallennustilan `pgdata`. |

Isäntäkoneen osoite `127.0.0.1` rajaa julkaistun portin paikalliseen käyttöön. Tietokantaan ei tässä avata yhteyttä muilta tietokoneilta. PostgreSQL-yhteys ei ole HTTP-yhteys: portin 5432 avaaminen selaimessa ei näytä verkkosivua. [Docker: portin julkaiseminen](https://docs.docker.com/engine/network/port-publishing/).

**`localhost` tarkoittaa kulloistakin ympäristöä.** Omalla koneella se tarkoittaa omaa konetta. Kontissa se tarkoittaa kyseistä konttia. Jos backend ja tietokanta ovat saman Compose-projektin eri konteissa, backendin tietokantaosoite olisi tässä `db` ja portti `5432`. Jos backend käy omalla koneella, osoite olisi `127.0.0.1` ja julkaistu portti `5432`. Palvelun nimi `db` toimii konttiverkon nimipalvelussa; sitä ei yleensä tunneta oman koneen selaimessa. [Docker: Composen verkot](https://docs.docker.com/compose/how-tos/networking/).

## 8.4 Käynnistä ja katso, mitä tapahtui

Seuraavat komennot ovat samat PowerShellissa, Bashissa ja Zsh:ssa. Aja yksi kerrallaan labran kansiossa.

```sh
# Tarkista Compose-tiedosto tulostamatta salasanan sisältävää kokoonpanoa.
docker compose config --quiet

# Käynnistä palvelu taustalle ja odota valmiustarkistuksen onnistumista.
docker compose up -d --wait

# Näytä tämän Compose-projektin palvelujen tila.
docker compose ps

# Näytä tietokantapalvelun 30 viimeisintä lokiriviä.
docker compose logs --tail=30 db
```

**Odotettu tulos:** tarkistus päättyy virheittä yleensä tulostamatta mitään. Ensimmäinen käynnistys lataa imagen, joten se voi kestää seuraavia käynnistyksiä kauemmin. `ps` näyttää palvelun `db`, käynnissä olevan tilan ja merkinnän `healthy`. Lokissa näkyy ilmoitus, että tietokanta ottaa yhteyksiä vastaan. Älä jatka kirjoittamaan dataa, jos tila on `unhealthy`.

`-d` tarkoittaa tausta-ajoa: terminaali vapautuu muiden komentojen käyttöön. `--wait` odottaa palvelun käynnistymistä tai määritellyn valmiustarkistuksen onnistumista. [Docker: compose up](https://docs.docker.com/reference/cli/docker/compose/up/). `config --quiet` tarkistaa rakenteen ilman koko kokoonpanon tulostamista. [Docker: compose config](https://docs.docker.com/reference/cli/docker/compose/config/).

## 8.5 Lisää yksi rivi ja lue se takaisin

Avaa `sql/01-schema.sql`. Se luo taulun `lab_notes`. Taulussa on automaattinen tunniste, 1–200 merkkiä pitkä teksti ja luontihetki. Tässä käsitellään vain harjoitusmuistiinpanoja. Labra ei vaihda Tehtävätaulun SQLite-tietokantaa PostgreSQLiin.

Avaa `sql/02-write.sql`. `PREPARE` erottaa SQL-komennon rakenteen ja tekstiparametrin. `$1` tarkoittaa ensimmäistä myöhemmin annettavaa arvoa. `EXECUTE` suorittaa komennon arvolla ”Tervehdys, pysyva data!”. Omassa backendissä vastaava erottelu tehdään tietokanta-ajurin parametrisoidulla kyselyllä. **Ajuri** on kirjasto, jolla sovellus keskustelee tietokannan kanssa.

```sh
# Suorita valmiiksi kommentoitu kirjoitusskripti käynnissä olevan db-kontin sisällä.
docker compose exec db psql -v ON_ERROR_STOP=1 -U lab_owner -d kurssilabra -f /lab-sql/02-write.sql

# Suorita lukuskripti ja näytä tallennetut rivit.
docker compose exec db psql -v ON_ERROR_STOP=1 -U lab_owner -d kurssilabra -f /lab-sql/03-read.sql
```

`exec db` ajaa komennon jo käynnissä olevassa `db`-kontissa. `psql` on PostgreSQLin komentoriviasiakas. `-U` valitsee tietokantatunnuksen, `-d` tietokannan ja `-f` suoritettavan tiedoston. `ON_ERROR_STOP=1` pysäyttää tiedoston suorittamisen ensimmäiseen SQL-virheeseen. [Docker: compose exec](https://docs.docker.com/reference/cli/docker/compose/exec/).

**Odotettu tulos:** kirjoitus näyttää esimerkiksi `PREPARE`, `INSERT 0 1` ja `DEALLOCATE`. Luku näyttää yhden rivin, jonka tekstinä on ”Tervehdys, pysyva data!”. Tunniste ja aikaleima voivat poiketa toisen opiskelijan tuloksesta. Jokainen kirjoitusskriptin ajo lisää uuden rivin.

Kokeile sitten tyhjää tekstiä. Seuraavan komennon on tarkoitus epäonnistua; tämä on rajoitteen kokeilu.

```sh
# Yritä lisätä tyhjä teksti: tietokannan CHECK-rajoitteen pitää estää lisäys.
docker compose exec db psql -v ON_ERROR_STOP=1 -U lab_owner -d kurssilabra -c "INSERT INTO lab_notes (label) VALUES ('');"
```

**Odotettu tulos:** PostgreSQL ilmoittaa `check constraint` -virheestä. Lukuskriptillä tarkistettaessa tyhjää riviä ei ole tallentunut. Tietokannan rajoite täydentää backendin tarkistuksia; se ei korvaa niitä.

## 8.6 Todista, että data säilyy

Kirjoita muistiin näkyvän rivin tunniste ja teksti. Tee sitten seuraavat vaiheet.

```sh
# Poista tämän projektin kontti ja oletusverkko; nimetty datavolume säilyy.
docker compose down

# Näytä Dockerin volumet ja etsi tehtavataulu-pg-labra_pgdata.
docker volume ls

# Luo uusi kontti samasta imagesta ja käytä aiemmin luotua datavolumea.
docker compose up -d --wait

# Lue aiemmat tiedot: älä aja kirjoitusskriptiä uudelleen ennen tätä tarkistusta.
docker compose exec db psql -v ON_ERROR_STOP=1 -U lab_owner -d kurssilabra -f /lab-sql/03-read.sql

# Lopeta labra niin, että voit jatkaa samoilla tiedoilla myöhemmin.
docker compose down
```

**Odotettu tulos:** sama rivi löytyy uudelleenluonnin jälkeen. Kontti on vaihdettavissa, mutta nimetty volume säilyttää tietokannan. Volume ei silti ole varmuuskopio: oman koneen tai volumen menetys voi hävittää datan. [Docker: volumet](https://docs.docker.com/engine/storage/volumes/).

**Erillinen tuhoava toimenpide:** valitsin `-v` komennossa `docker compose down -v` poistaisi tämän projektin nimetyn datavolumen tietoineen. Älä käytä sitä tavallisessa lopetuksessa tai ensimmäisenä virheenkorjauksena. Tässä labrassa sitä ei tarvitse suorittaa. [Docker: compose down](https://docs.docker.com/reference/cli/docker/compose/down/).

## 8.7 Tavalliset pysähdykset

| Havainto | Tarkista tai tee |
|---|---|
| `docker`-komentoa ei löydy | Asennus ja terminaalin uudelleenavaaminen. |
| Docker-palvelimeen ei saada yhteyttä | Käynnistä Docker Desktop tai Engine; tarkista `docker version`. |
| `no configuration file provided` | Aja komento kansiossa, jossa `compose.yaml` on. |
| Virhe pyytää asettamaan `POSTGRES_PASSWORD`-arvon | Tarkista `.env`-tiedoston nimi ja että arvo ei ole tyhjä. |
| Portti 5432 on jo käytössä | Muuta vain isäntäkoneen porttia muotoon `127.0.0.1:5433:5432`. Kontin portti pysyy 5432:na. Oman koneen tietokantayhteys käyttää sen jälkeen porttia 5433. |
| `.env`-salasanan vaihtaminen ei muuta kirjautumista | Ensialustuksen muuttuja ei vaihda olemassa olevan tietokantatunnuksen salasanaa. Olemassa oleva salasana vaihdetaan tietokannan hallintatoiminnolla. |
| SQL-alustustiedoston muuttaminen ei päivitä taulua | Alustus ajetaan vain tyhjälle datakansiolle. Tee olemassa olevaan tietokantaan erillinen skeemamuutos. |

PostgreSQL-imagen alustustunnus on ylläpitäjä. Labran sisäinen `psql`-yhteys voi käyttää paikallista luottamusasetusta ilman salasanakyselyä; tämä ei osoita, että verkkoyhteyden salasanasuojaus puuttuisi. Omalle verkkosovellukselle luodaan erillinen tietokantatunnus vain sen tarvitsemilla oikeuksilla. [PostgreSQL Official Image: alustaminen ja asetukset](https://hub.docker.com/_/postgres).

**Selitä lopuksi omin sanoin:** mitä poistui komennolla `down`, mitä säilyi ja miksi? Mikä on backendin tietokantaosoite, jos backend on omalla koneellasi? Entä saman Compose-verkon toisessa kontissa? Palauta vastaukset ja datan säilymisen näyttö pakollisessa Docker-harjoituksessa.
