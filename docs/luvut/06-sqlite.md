# 06 Tieto talteen: SQL ja SQLite

**Tavoite:** tallennat, haet, muutat ja poistat tietokannan rivejä sekä todistat tiedon säilymisen ohjelman sulkemisen yli. **Esitiedot:** luvut 02 ja 05. **Tarkistuspiste:** `esimerkit/03-tietokanta/db_demo.ts`.

## Tietokanta ei ole taulukko selaimen muistissa

Luvun 03 ensimmäisen frontendin lista häviää sivua ladattaessa. Tässä harjoituksessa tieto kirjoitetaan tiedostoon. **SQLite** on tietokantamoottori, jota oma ohjelma kutsuu suoraan. **PostgreSQL** toimii erillisenä palvelimena, johon ohjelma muodostaa yhteyden. Molemmissa voidaan käyttää relaatiomallia ja SQL:ää, mutta niiden asetukset ja osa SQL-syntaksista eroavat.

**SQL** on tietokannan käsittelykieli. TypeScript järjestää sovelluksen toimintaa, kun taas SQL kertoo, mitä rivejä tietokannasta haetaan tai muutetaan. **Taulu** sisältää samanmuotoisia rivejä. **Rivi** on yksi tallennettu asia. **Sarake** on sen nimetty ominaisuus. **Skeema** kuvaa tietokannan rakenteen ja säännöt.

Deno sisältää tässä tarvittavan `node:sqlite`-moduulin. `node:`-alku on yhteensopivuusrajapinnan nimi; Node.js-ajoympäristöä ei tarvitse asentaa Deno-ohjelman rinnalle. Yhteyden avaamiseen käytetään `DatabaseSync`-luokkaa. Sync kertoo, että sen tietokantakutsut valmistuvat synkronisesti ennen seuraavaa riviä. Se on yksinkertainen opetuksessa, mutta pitkä kysely voi pysäyttää saman palvelinprosessin muun JavaScript-työn siksi aikaa. [Deno: SQLite](https://docs.deno.com/examples/sqlite/).

## Tutoriaali T4: ensimmäinen pysyvä rivi

Palaa `backend-kurssi`-hakemistoon, luo `03-tietokanta` ja avaa se editoriin. Luo tiedosto `db_demo.ts` ja kopioi koodipankin samannimisen tiedoston koko kommentoitu sisältö. Tässä käytetään tarkoituksella pientä `notes`-taulua; se ei vielä ole monen käyttäjän lopullinen tietomalli eikä verkossa julkaistava palvelu.

Suorita samassa hakemistossa seuraava komento. Ensimmäinen osa käynnistää Denon oikeuksineen. Tiedostonimen jälkeiset sanat ovat oman ohjelmamme syötteitä: `add` kertoo toiminnon ja lainausmerkkien sisäinen teksti sen sisällön.

```sh
# Luo tai avaa tietokanta ja lisää yksi muistiinpano; oikeudet koskevat tätä tietokantatiedostoa.
deno run --check --allow-read=./harjoitus.sqlite --allow-write=./harjoitus.sqlite db_demo.ts add "Ensimmäinen pysyvä tehtävä"
```

**Odotettu tulos:** ohjelma kertoo lisätyn tunnisteen ja tulostaa taulukon, jossa on nimi ja `done`-arvo 0. Hakemistoon syntyy `harjoitus.sqlite`. Tunniste on ensimmäisessä tyhjässä kannassa 1; jos olet jo harjoitellut, se voi olla toinen numero. Ohjelma päättyy ja terminaalin kehote palaa.

Sulje terminaali, avaa se uudelleen samaan hakemistoon ja suorita:

```sh
# Hae aiemmin tallennetut rivit uudessa ohjelmaprosessissa.
deno run --check --allow-read=./harjoitus.sqlite --allow-write=./harjoitus.sqlite db_demo.ts list
```

**Tarkistuspiste:** sama tehtävä on edelleen mukana. Tämä on pysyvyyden näyttö. Jos rivi puuttuu, tarkista `pwd`: suhteellinen tiedostopolku voi avata eri hakemistossa eri tietokannan. Älä aloita korjausta poistamalla tietokantatiedostoa.

## Muuta ja poista hallitusti

Katso listasta haluamasi rivin tunniste. Alla oleva esimerkki käyttää tunnistetta 1; korvaa se oman rivisi tunnisteella. Lauseen `WHERE id = ?` rajaus kohdistaa operaation valittuun riviin.

```sh
# Merkitse tunnisteen 1 harjoitusrivi tehdyksi; käytä oman rivisi oikeaa tunnistetta.
deno run --check --allow-read=./harjoitus.sqlite --allow-write=./harjoitus.sqlite db_demo.ts done 1
# Poista juuri tunnisteen 1 harjoitusrivi; poistettu rivi ei kuulu seuraavaan listaan.
deno run --check --allow-read=./harjoitus.sqlite --allow-write=./harjoitus.sqlite db_demo.ts delete 1
```

**Odotettu tulos:** `done` vaihtaa valmiustilan arvoon 1. `delete` kertoo yhden muutetun rivin ja poistaa vain valitun rivin. Jos muutettujen rivien määrä on 0, tarkista tunniste; se ei välttämättä tarkoita ohjelmavirhettä.

**Pieni muutos:** lisää teksti `Ainon 'oma' tehtävä`. Teksti sisältää heittomerkkejä, mutta tallennus toimii. SQL:n parametrit huolehtivat siitä, että arvo käsitellään datana. Tyhjää otsikkoa ei hyväksytä. Yli 200 merkin teksti ei myöskään kelpaa.

## SQL-käskyt ilman oletettuja esitietoja

| Käsky tai sääntö | Merkitys | Missä näet sen? |
| --- | --- | --- |
| `CREATE TABLE` | Luo taulun rakenteen. | Harjoitusohjelman alussa. |
| `INSERT INTO` | Lisää uuden rivin. | `add`-toiminnossa. |
| `SELECT` | Hakee valitut sarakkeet ja rivit. | Listauksessa. |
| `UPDATE ... SET` | Muuttaa rivien sarakkeita. | Valmiiksi merkitsemisessä. |
| `DELETE FROM` | Poistaa rivejä. | Poistotoiminnossa. |
| `WHERE` | Rajaa operaation tiettyihin riveihin. | Tunnisteella haettaessa tai muutettaessa. |
| `ORDER BY` | Määrittää järjestyksen; ilman sitä järjestystä ei pidä olettaa. | Listauksen lopussa. |
| `PRIMARY KEY` | Yksilöi yhden rivin. | `id`-sarakkeessa. |
| `NOT NULL` | Arvo ei saa puuttua. | Otsikossa ja valmiustilassa. |
| `DEFAULT` | Käytettävä alkuarvo, jos sitä ei anneta. | `done` alkaa arvosta 0. |
| `CHECK` | Tietokanta valvoo annettua ehtoa. | Sallittu pituus ja 0/1-valmiustila. |

Täydellinen selitys relaatiosta, viiteavaimesta, yksilöllisyydestä ja kardinaliteetista on luvussa 05. SQLite-tietokannan rajoitteet: [CREATE TABLE](https://www.sqlite.org/lang_createtable.html) ja [viiteavaimet](https://www.sqlite.org/foreignkeys.html).

## Parametroitu kysely on pakollinen perustaito

**Parametri** on kyselylle erikseen annettu arvo. **Valmisteltu lause** erottaa SQL:n rakenteen arvoista. Esimerkin `prepare` valmistelee lauseen ja `run(title)` antaa siihen otsikon. Kysymysmerkki on paikkamerkki, jota ei korvata itse merkkijonoja yhdistelemällä.

```ts
// db on aiemmin avattu tietokantayhteys; otsikko on etukäteen tarkistettu merkkijono.
const otsikko = "Ainon 'oma' tehtävä";
// Valmistele kiinteä SQL: käyttäjä ei voi muuttaa sen rakennetta otsikon avulla.
const lisays = db.prepare("INSERT INTO notes (title) VALUES (?)");
// Anna arvo erillisenä parametrina; SQLite käsittelee sen tekstinä.
lisays.run(otsikko);
```

Tämä lyhyt pätkä selittää jo kokonaisessa harjoitusohjelmassa olevaa kohtaa; sitä ei ajeta yksin ilman `db`-yhteyttä. **SQL-injektio** tarkoittaa tilannetta, jossa käyttäjän syöte pääsee muuttamaan kyselyn rakennetta. Pelkkä lainausmerkkien korvaaminen käsin ei ole parametrien vastine. Myös tunnisteet annetaan parametreina. Taulun- ja sarakkeennimet valitaan oman koodin kiinteistä sallituista vaihtoehdoista. [OWASP: SQL-injektion ehkäisy](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html).

## Miksi tarkistetaan sekä backendissä että tietokannassa?

Backendin tarkistus tuottaa käyttäjälle ymmärrettävän virheen. Tietokannan rajoite suojaa tietojen eheyttä myös silloin, kun jokin toinen koodipolku yrittää kirjoittaa huonoa tietoa. **Eheys** tarkoittaa, että tietojen sovitut säännöt pitävät: tehtävä ei viittaa olemattomaan projektiin, rooli on sallittu ja sama tunnus ei esiinny kahdesti.

Frontendin tarkistus auttaa käyttäjää kirjoittamaan oikein, mutta asiakas voi ohittaa sen. TypeScript auttaa ohjelmoijaa löytämään virheitä ennen ajoa, mutta verkkosyöte ei muutu luotettavaksi tyyppimerkinnällä. Nämä tarkistukset palvelevat eri tarkoituksia.

## Migraatio: rakenne muuttuu, tiedot säilyvät

**Migraatio** on numeroitu tietokannan rakenteen muutos. Lopullisen esimerkin `01_create_schema.sql` luo ensimmäisen rakenteen, ja `db.ts` merkitsee suoritetun muutoksen `schema_migrations`-tauluun. Kun käynnistät sovelluksen uudelleen, samoja tauluja ei yritetä luoda uutena eikä vanhoja tietoja poisteta.

Älä muokkaa jo käytettyä ensimmäistä migraatiota ja odota, että vanha tietokanta muuttuu itsestään. Esimerkiksi määräpäivän lisääminen tehtävään on uusi muutos numero 2. M1-harjoituksessa laadit uuden SQL-muutoksen ja lisäät sille suorituskirjanpidon. Vanhan version rivien pitää löytyä myös päivityksen jälkeen. Nykyinen esimerkkimigraattori tuntee muutoksen 1; sitä laajennetaan hallitusti M1:ssä.

Kun lisäät uuden migraatiotiedoston, lisää sen polku myös niiden `deno.jsonc`-komentojen rajattuihin `--allow-read`-oikeuksiin, jotka lukevat migraatioita: start, dev, test ja admin. Päivitä vastaavasti käyttämiesi erillisten testikomentojen oikeudet. Uusi tiedosto ei saa lukuoikeutta pelkällä nimeämisellä. Säilytä rajatut oikeudet; `-A` ei ole tähän tarvittava korjaus.

**Transaktio eli tietokantatapahtuma** niputtaa useita tietokantatöitä yhteen. `BEGIN` aloittaa, `COMMIT` vahvistaa ja `ROLLBACK` peruu keskeneräiset muutokset. Jos rakenteen luonti onnistuu mutta sen kirjaaminen epäonnistuu, emme halua puolikasta lopputulosta. Esimerkin migraatio ja kirjanpito tehdään siksi samassa transaktiossa. [SQLite: transaktiot](https://www.sqlite.org/lang_transaction.html).

## Relaatiota luetaan yhdistämällä

Lopullisessa sovelluksessa tehtävän omistaja löytyy projektin kautta. `tasks.project_id` viittaa projektin tunnisteeseen ja `projects.user_id` käyttäjään. **JOIN** yhdistää taulujen rivejä näiden kenttien perusteella. Autorisoinnissa kysymys on: kuuluuko pyydetty tehtävä projektiin, jonka omistaa nykyinen käyttäjä? Vastaukseen tarvitaan tiedot molemmista tauluista.

Tietokannan viiteavain tarkistaa, että projekti on olemassa. Se ei tarkista kirjautuneen käyttäjän oikeutta projektiin. Tämä omistajuustarkistus toteutetaan luvussa 07 backendin kyselyehdoilla. Testaamme myös vieraan käyttäjän tunnisteen, emme vain oman projektin onnellista polkua.

## Kun vaihdat PostgreSQL:ään

Luku 08 näyttää PostgreSQL:n käynnistämisen Dockerissa ja yhteyden tarkistamisen. PostgreSQL-polulla oma sovellus kytketään siihen valitun tekniikan tietokanta-ajurilla. **Ajuri** on kirjasto, joka osaa puhua tietokantapalvelimen kanssa. Samat tiedot, viiteavaimet, validoinnit, transaktiot ja oikeustarkistukset säilyvät vaatimuksina.

Tämän paketin `04-valmis` on SQLite-toteutus. Dockerin PostgreSQL-harjoitus ei automaattisesti siirrä sitä toiseen tietokantaan. SQLite-polulla oma tietokantaosaaminen voidaan osoittaa täysin ilman tätä siirtoa. PostgreSQL:n valitseva opiskelija osoittaa aidon sovellusyhteyden ja pysyvän CRUD-käytön; pelkkä käynnissä oleva kontti ei täytä tietokannan hyödyntämisen vaatimusta.

**Valmis jatkamaan, kun:** olet tehnyt neljä CRUD-toimintoa, osoittanut pysyvyyden uudella ohjelmaprosessilla ja osaat osoittaa koodista parametrin sekä tietokannan rajoitteen.
