# 05 Käyttöliittymän designistä tietomalliin

## Mitä tässä opitaan?

Tässä luvussa päätät, mitä sovelluksen täytyy muistaa. Aloitat käyttäjän näkymistä, et tietokannan komennoista. Luvun jälkeen osaat yhdistää näkymän kentän tietokannan sarakkeeseen ja perustella tietojen väliset suhteet.

**Design** tarkoittaa tässä käyttöliittymän ja toiminnan suunnitelmaa. Se voi olla piirros, kuva tai seuraavanlainen tekstikuvaus. **Tietomalli** kuvaa tallennettavat asiat, niiden ominaisuudet ja niiden väliset suhteet. Malli auttaa vastaamaan myös kysymykseen: kenen tietoa tämä on?

## 5.1 Lähtödesign: Tehtävätaulun kolme näkymää

Näkymät voivat olla saman verkkosivun eri tiloja. Erillisiä HTML-tiedostoja ei tarvita. Alla oleva tekstimuoto on samalla kuvallisen suunnitelman saavutettava vaihtoehto.

### Näkymä R1: Kirjautuminen ja rekisteröityminen

- Sivun pääotsikko on ”Tehtävätaulu”. Alussa näkyy lyhyt ohje: ”Kirjaudu sisään tai luo tunnus.”
- Kirjautumislomakkeessa on näkyvillä nimillä varustetut kentät **Sähköposti** ja **Salasana** sekä painike **Kirjaudu**.
- Rekisteröitymislomakkeessa on samat kentät, ohje ”Salasanan pituus 15–128 merkkiä” ja painike **Luo tunnus**.
- Virhe ilmoitetaan tekstinä lomakkeen yhteydessä. Käyttäjän ei tarvitse päätellä virhettä väristä. Salasanaa ei näytetä virheilmoituksessa.
- Uusi käyttäjä saa tavallisen käyttäjän roolin. Lomakkeella ei valita ylläpitäjän oikeuksia.

**Mitä täytyy muistaa?** Käyttäjän tunniste, sähköpostiosoite, salasanan turvalliseen tarkistamiseen tarvittavat tiedot ja rooli. Kirjautumisen jälkeen tarvitaan myös tieto voimassa olevasta istunnosta. Raakaa salasanaa ei tallenneta.

### Näkymä R2: Omat projektit

- Pääotsikko on **Omat projektit**. Näkyvissä ovat kirjautuneen käyttäjän sähköposti ja painike **Kirjaudu ulos**.
- Lista näyttää vain kirjautuneen käyttäjän omat projektit. Projektin nimi toimii valintapainikkeena.
- Kun projekteja ei ole, näkyy teksti **Sinulla ei ole vielä projekteja**.
- Lomakkeessa on kenttä **Projektin nimi**, ohje ”1–120 merkkiä” ja painike **Luo projekti**.
- Luomisen jälkeen uusi projekti näkyy listassa. Tallennuksen onnistuminen tai epäonnistuminen ilmoitetaan tekstinä.

**Mitä täytyy muistaa?** Projektin tunniste, nimi, omistaja ja luontihetki. Projektin nimi ei yksin tunnista projektia: kaksi käyttäjää saa nimetä projektinsa samalla tavalla.

### Näkymä R3: Valitun projektin tehtävät

- Otsikko kertoo valitun projektin nimen. Käyttäjä voi palata projektilistaan.
- Jokaisella tehtävällä on nimi, **Valmis**-valintaruutu sekä nimetty muokkaus- ja poistotoiminto. Valintaruudun saavutettavasta nimestä selviää, mitä tehtävää se koskee.
- Tyhjässä listassa näkyy teksti **Projektissa ei ole vielä tehtäviä**.
- Lisäämislomakkeessa on kenttä **Tehtävän nimi**, ohje ”1–200 merkkiä” ja painike **Lisää tehtävä**.
- Tehtävän nimi voidaan muuttaa, valmis-tila vaihtaa ja tehtävä poistaa. Käyttöliittymä kertoo tallennuksen tuloksen.

**Mitä täytyy muistaa?** Tehtävän tunniste, projekti, nimi, valmis-tila ja luontihetki. Tehtävän omistaja selviää sen projektin kautta. Käyttäjän itse lähettämä väite omistajuudesta ei anna käyttöoikeutta.

## 5.2 Sanasto ennen taulujen piirtämistä

| Käsite | Selitys | Esimerkki |
|---|---|---|
| Entiteetti | Asia, josta säilytetään tietoa. | Käyttäjä, projekti ja tehtävä. |
| Taulu | Tietokannan rakenne yhden tyyppisten asioiden tallentamiseen. | `tasks` sisältää tehtäviä. |
| Rivi eli tietue | Yksi tallennettu asia taulussa. | Tehtävä ”Lue HTTP-luku”. |
| Sarake eli kenttä | Yksi tallennettava ominaisuus. | `title` eli tehtävän nimi. |
| Tietotyyppi | Millaisia arvoja kenttä sisältää. | Teksti, kokonaisluku tai aikaleima. |
| Pääavain, primary key, PK | Arvo, joka yksilöi rivin. | Tehtävän `id`. |
| Viiteavain, foreign key, FK | Kenttä, joka viittaa toisen taulun yksilöivään avaimeen. | Tehtävän `project_id` viittaa projektiin. |
| Kardinaliteetti | Kuinka monta asiaa suhteen kummallakin puolella voi olla. | Yhdellä projektilla voi olla monta tehtävää. |
| Rajoite, constraint | Tietokannan valvoma sääntö. | Pakollinen nimi ei saa olla tyhjä. |
| Skeema | Tietokannan rakenteen täsmällinen määrittely. | Taulut, sarakkeet, avaimet ja rajoitteet yhdessä. |
| Migraatio | Hallittu muutos olemassa olevaan skeemaan. | Uuden määräpäiväsarakkeen lisääminen. |

Pääavain ei ole salasana eikä lupa. Vaikka toisen tehtävän tunniste olisi vaikea arvata, palvelimen täytyy tarkistaa käyttöoikeus. Viiteavain puolestaan estää viittaamasta puuttuvaan projektiin, mutta se ei tiedä, saako HTTP-pyynnön lähettäjä muuttaa kyseistä projektia.

## 5.3 Johda tiedot näkyvistä tarpeista

**Jäljitettävyys** tarkoittaa, että ratkaisulle löytyy perustelu alkuperäisestä tarpeesta. Tee ensin seuraava taulukko itse. Mallivastausta saa käyttää sen jälkeen vertailuun.

| Designin tarve | Tallennettava tieto | Sääntö ja perustelu |
|---|---|---|
| R1: käyttäjä tunnistetaan sähköpostilla | `users.email` | Osoite siistitään alusta ja lopusta ja muunnetaan pieniksi kirjaimiksi tämän sovelluksen sovittuna sääntönä. Sama normalisoitu osoite voi esiintyä vain kerran. |
| R1: salasana tarkistetaan | `password_hash`, `password_salt`, `password_iterations` | Säilytetään salasanan tarkistusarvo, satunnainen suola ja käytetty työmäärä. Näitä ei palauteta selaimelle. |
| R1: istunto säilyy pyyntöjen välillä | `sessions` | Palvelin tunnistaa voimassa olevan istunnon ja sen käyttäjän. |
| R2: käyttäjä näkee omat projektinsa | `projects.user_id` | Jokaisella projektilla on täsmälleen yksi omistaja. Omistaja saadaan palvelimen tarkistamasta istunnosta. |
| R2: projektilla on nimi | `projects.title` | Siistitty nimi on 1–120 merkkiä; sama nimi voi esiintyä useita kertoja. |
| R3: tehtävä kuuluu projektiin | `tasks.project_id` | Jokainen tehtävä viittaa olemassa olevaan projektiin. |
| R3: nimi ja valmis-valinta säilyvät | `tasks.title`, `tasks.done` | Siistitty nimi on 1–200 merkkiä. Valmis-tilalla on kaksi sallittua arvoa. |
| Tallennusjärjestys ja jälkikäteen tarkistaminen | `created_at` | Luontihetken tuottaa palvelin, jotta selain ei määrää sitä. |
| Ylläpidon erillinen oikeus | `users.role` | Sallitaan `user` ja `admin`. Rekisteröityminen tuottaa aina roolin `user`. |

Salasanan **suola** on käyttäjäkohtainen satunnainen lisäarvo, joka osallistuu salasanan tarkistusarvon laskemiseen. **Iteraatiot** tarkoittavat laskennan toistokertoja. Toteutuksen tarkka salasanamenetelmä käydään läpi autentikaatioluvussa. Tässä tärkeää on huomata, että kaikkia tarpeellisia tietokenttiä ei näytetä käyttöliittymässä.

## 5.4 Taulut ja suhteet

| Taulu | Kentät ja tehtävät |
|---|---|
| `users` | `id`: pääavain. `email`: yksilöllinen sähköposti. `password_hash`: salasanan tarkistusarvo. `password_salt`: käyttäjäkohtainen suola. `password_iterations`: tarkistamiseen tarvittava kierrosmäärä. `role`: käyttäjän rooli. `created_at`: luontihetki. |
| `projects` | `id`: pääavain. `user_id`: viite käyttäjään. `title`: nimi. `created_at`: luontihetki. |
| `tasks` | `id`: pääavain. `project_id`: viite projektiin. `title`: nimi. `done`: valmis-tila. `created_at`: luontihetki. |
| `sessions` | `token_hash`: istuntotunnuksen tiiviste ja pääavain. `user_id`: viite käyttäjään. `expires_at`: istunnon päättymishetki. |

**Tiiviste** on lähtöarvosta yksisuuntaisella laskennalla tuotettu tarkistusarvo. Istuntotunnus on satunnainen salaisuus selaimen evästeessä; tietokannassa säilytetään siitä tiiviste. Salasanan tarkistusarvo tarvitsee lisäksi hitaaksi tarkoitetun salasanamenetelmän. Näitä kahta käyttötarkoitusta ei vaihdeta keskenään.

| Suhde | Lukutapa | Pienin ja suurin määrä |
|---|---|---|
| Käyttäjä → projektit | Yksi käyttäjä omistaa monta projektia. | Käyttäjällä 0…monta projektia; projektilla täsmälleen 1 käyttäjä. |
| Projekti → tehtävät | Yhteen projektiin kuuluu monta tehtävää. | Projektilla 0…monta tehtävää; tehtävällä täsmälleen 1 projekti. |
| Käyttäjä → istunnot | Käyttäjällä voi olla useita kirjautuneita selaimia. | Käyttäjällä 0…monta istuntoa; istunnolla täsmälleen 1 käyttäjä. |

Projektin nimeä ei kopioida jokaiseen tehtävään. Tehtävä viittaa projektin tunnisteeseen. Kun projektin nimi muuttuu, samaa nimeä ei tarvitse korjata monesta paikasta. Tätä tietojen tarpeettoman toistamisen vähentämistä kutsutaan **normalisoinniksi**.

## 5.5 Rajoitteet suojaavat tietojen rakennetta

`NOT NULL` kieltää puuttuvan arvon. `UNIQUE` kieltää kaksoiskappaleen. `CHECK` tarkistaa kentän ehdon. `PRIMARY KEY` yksilöi rivin. `FOREIGN KEY` varmistaa viittauksen olemassa olevaan tietoon. Rajoitteet ovat viimeinen suoja myös silloin, kun virheellinen kirjoitus yrittää ohittaa lomakkeen. [PostgreSQL: rajoitteet](https://www.postgresql.org/docs/17/ddl-constraints.html).

SQLiten mallissa `done` tallennetaan kokonaislukuna: `0` tarkoittaa keskeneräistä ja `1` valmista. HTTP-rajapinnan JSONissa vastaavat arvot ovat `false` ja `true`. PostgreSQL-toteutuksessa sarakkeen tyypiksi voi valita suoraan `BOOLEAN`. Valittu esitystapa kerrotaan mallissa, jotta muunnos tehdään tietoisesti.

Malliratkaisun `created_at` on tekstiä ISO 8601 -muodossa, esimerkiksi `2026-01-15T10:30:00.000Z`. Lopun `Z` tarkoittaa UTC-aikaa. Istunnon `expires_at` on kokonaisluku: millisekuntien määrä Unix-ajan alusta, 1.1.1970 kello 00.00 UTC. Muotojen ero on tietoinen: käyttöliittymälle näytettävä luontihetki on helppo lukea tekstinä, ja istunnon päättymistä verrataan palvelimen millisekunteihin. Älä vertaa sekunteja millisekunteihin. PostgreSQLissa vastaava kokonaisluku tarvitsee `BIGINT`-tyypin; myös aikaleimaan perustuva ratkaisu käy, kun muunnokset ovat johdonmukaiset.

Päätä myös poistamisen vaikutus. `ON DELETE CASCADE` tarkoittaa, että pääkohteen poistaminen poistaa siihen viittaavat alikohteet. Tehtävätaulussa projektin poistaminen voi poistaa sen tehtävät ja käyttäjän poistaminen hänen projektinsa sekä istuntonsa. Dokumentoi tämä sääntö, vaikka käyttöliittymässä ei vielä olisi käyttäjän poistamista. Vaihtoehto on estää poisto, kun alikohteita on olemassa. [PostgreSQL: viiteavaimet](https://www.postgresql.org/docs/17/tutorial-fk.html).

SQLite-yhteydessä viiteavaimet on otettava käyttöön yhteyden asetuksella `PRAGMA foreign_keys = ON`. Sovelluksen yhteyden avaus tekee tämän. Muussa työkalussa avattu uusi yhteys tarvitsee oman asetuksensa. [SQLite: viiteavainten käyttöönotto](https://www.sqlite.org/foreignkeys.html).

## 5.6 Tee, tarkista ja muuta

1. Lue kolme lähtönäkymää. Alleviivaa tallennettavat asiat.
2. Kirjoita taulut, kentät ja suhteet ensin paperille tai tekstieditoriin.
3. Lisää jokaiselle kentälle tietotyyppi sekä tieto pakollisuudesta, oletusarvosta ja rajoista.
4. Merkitse avaimet. Kirjoita jokainen suhde kokonaisena virkkeenä.
5. Vertaa malliin. Kysy erityisesti: mistä palvelin tietää tehtävän omistajan?
6. Kirjoita mallista SQL-skeema. **SQL** on kieli, jolla määritellään ja käsitellään relaatiotietokannan tietoja. Seuraavan toteutusvaiheen koodi näyttää komennot kommentteineen.

**Itsenäinen muutoskortti M1:** Näkymään R3 lisätään vapaaehtoinen **Määräpäivä**. Käyttäjä voi asettaa päivämäärän, muuttaa sitä ja tyhjentää sen. Päivämäärällä ei ole kellonaikaa. Lisää jäljitettävyystaulukkoon uusi rivi, valitse esitysmuoto ja selitä, miten erotat puuttuvan arvon virheellisestä päivämäärästä. Esimerkiksi SQLiteen sopii `NULL` tai teksti muodossa `YYYY-MM-DD`. `NULL` tarkoittaa puuttuvaa arvoa; se ei ole sama kuin merkkijono `"null"`.

Muutoskortti kuuluu pakolliseen harjoitukseen. Valmis perusesimerkki auttaa alkuun; määräpäivä suunnitellaan ja toteutetaan itse. Hyväksyttävän ratkaisun pitää säilyttää vanhat tehtävät ja omistajuuden tarkistukset myös muutoksen jälkeen.

**Tarkista ymmärryksesi:** Jos käyttäjällä A ja käyttäjällä B on molemmilla projekti ”Harjoitukset”, miksi tietokanta ei sekoita niitä? Miksi `tasks.project_id` ei yksin takaa, että tehtävän muokkaaminen on sallittua? Vastaa kahdella tai kolmella virkkeellä ennen siirtymistä toteutukseen.
