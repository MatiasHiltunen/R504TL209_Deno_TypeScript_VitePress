# 00 Aloita tästä: rakennetaan verkkosovellus yhdessä

**Opintojakso:** R504TL209 Full Stack -sovelluskehitys: Backend, 5 op. **Materiaaliversio:** 19.10.2026. **Luentojen tekniikka:** Deno ja TypeScript. **Harjoitussovellus:** Tehtävätaulu.

Tässä materiaalissa opit, miten selaimessa näkyvä käyttöliittymä, palvelimella toimiva ohjelma ja tietokanta työskentelevät yhdessä. Alussa sinun ei tarvitse osata Denoa, TypeScriptiä, HTML:ää, CSS:ää, JavaScriptiä, SQL:ää tai Dockeria. Käymme myös ohjelmoinnin pieniä rakennuspalikoita läpi ennen kuin käytämme niitä isossa sovelluksessa. Tietokoneen käynnistäminen, tiedostojen tallentaminen ja selaimen käyttäminen riittävät aloitukseen.

Tämä on materiaalin VitePress-versio 20.10.2026. Sivupalkista löydät luvut, ja sivun yläreunan haulla voit etsiä käsitteitä. [Koodipankissa](../koodipankki/index.md) ovat kaikki esimerkit kokonaisina. [Sivuston käyttöohje](../vitepress-kaytto.md) auttaa opettajaa käynnistämisessä ja muokkaamisessa.

## Mitä rakennamme?

Tehtävätaulu on pieni verkkosovellus. Käyttäjä luo harjoitustilin, kirjautuu sisään ja lisää itselleen projektin. Projektiin voi lisätä tehtäviä, vaihtaa niiden nimiä, merkitä ne tehdyiksi ja poistaa niitä. Jokainen käyttäjä näkee omat projektinsa. Ylläpitäjä voi tarkastella lukumäärätilastoja. Ylläpitäjän rooli ei tässä sovelluksessa anna oikeutta lukea muiden projektien sisältöä.

Kaikki harjoitukset tehdään itse keksityillä tiedoilla. Esimerkiksi `aino@example.test` on harjoitustunnus. Sähköpostia ei lähetetä eikä osoitteen omistajuutta vahvisteta tässä oppimissovelluksessa. Käytä harjoitteluun omaa uutta salasanaa, jota et käytä missään oikeassa palvelussa.

## Miten tätä materiaalia käytetään?

Etene ensin mukana ja selitä vasta sitten omin sanoin. Jokaisessa tutoriaalissa on pieni työvaihe, jonka tulos voidaan havaita. Ohjelman ei tarvitse olla kerralla valmis.

1. Lue vaiheen tavoite. Selvitä, työskennelläänkö editorissa, terminaalissa vai selaimessa.
2. Luo täsmälleen nimetty tiedosto. Tiedostopääte kuuluu nimeen: `main.ts` ei ole `main.ts.txt`.
3. Kirjoita tai kopioi koko kyseiseen vaiheeseen merkitty koodi. Kommentit kuuluvat mukaan.
4. Tallenna tiedosto. Suorita annettu komento siinä hakemistossa, joka ohjeessa mainitaan.
5. Vertaa omaa tulostasi kohdan **Odotettu tulos** kuvaukseen. Virheilmoitus on havainto, jonka perusteella työtä korjataan.
6. Tee pieni nimetty muutos. Ennusta ennen suorittamista, mitä muuttuu.
7. Selitä parille, opettajalle tai omaan oppimispäiväkirjaan, mitä rivi tai tiedosto tekee.

**Follow-along** tarkoittaa ohjattua mukana tekemistä. Ensimmäinen kierros saa olla mallin tarkkaa toistamista. **Tarkistuspiste** tarkoittaa kohtaa, jossa pysähdytään varmistamaan, että ohjelma toimii ennen seuraavaa muutosta. **Oma sovellus** on lopuksi tehtävä toteutus, johon sovellat oppimaasi. Pelkkä valmiin esimerkin käynnistäminen ei vielä osoita kaikkia oppimistavoitteita.

## Oppimispolut ja yhteiset vaatimukset

| Polku | Työskentely | Sama pakollinen näyttö |
| --- | --- | --- |
| Ohjattu Deno-polku | Tee tämän materiaalin esimerkit järjestyksessä ja sovella niitä omaan työhön. Backend on TypeScriptiä, ajossa on Deno. | Frontend, API, designistä johdettu tietomalli, oikea tietokanta, autentikaatio, autorisointi, tietoturva, Docker-perusteet, testit ja dokumentaatio. |
| Oma tekniikka | Toteuta sama käyttäytyminen esimerkiksi .NETillä, Javalla, Nodella, Rustilla tai C++:lla. Valitse siihen sopivat kirjastot ja työkalut. | Täsmälleen samat toiminnalliset ja turvallisuutta koskevat hyväksymisehdot. Esimerkin tiedostonimiä tai Deno-komentoja ei tarvitse kopioida. |
| Aiemman osaamisen näyttö | Kokoa olemassa olevasta työstä henkilökohtainen näyttö ja täydennä puuttuvat osat opettajan kanssa sovitulla tavalla. | Jokainen ydintavoite osoitetaan; esimerkiksi autentikaatiota tai Docker-osaamista ei voi jättää näyttämättä. |

Tietokannaksi riittää **SQLite tai Dockerissa ajettava PostgreSQL**. Molempia tietokantoja ei tarvitse toteuttaa omaan sovellukseen. Dockerin perustaidot osoitetaan silti kummallakin polulla: käynnistä kontti, selitä portti ja taltio sekä näytä tiedon säilyminen kontin uudelleenluonnissa. Oman backend-sovelluksen kontittaminen on lisätehtävä L2; Dockerin peruslabra P6 on kaikille pakollinen.

P8:n ja P9:n käyttöoikeus- ja tietoturvakokeiden näyttö on pakollinen. Valmiiden testien ajaminen kuuluu ohjattuun Deno-harjoitteluun. Oman tekniikan polulla saman näytön voi tuottaa käsin tai automaatiolla. Uusien automaattisten regressiotestien laajempi laatiminen on lisätehtävä L1.

Frontend tehdään tässä materiaalissa HTML:llä, CSS:llä ja tavallisella JavaScriptillä. Näin selain voi ajaa sen suoraan. Backendissä käytetään TypeScriptiä. Tämä jako on tietoinen opetuksen ratkaisu: ensin opitaan selaimen toiminta, ja myöhemmin frontendinkin voi siirtää TypeScriptiin tai haluttuun sovelluskehykseen.

## Sisältökartta

| Luku | Mitä opit | Konkreettinen tulos |
| --- | --- | --- |
| 01 | Client, server, frontend, backend, HTTP, API ja tietokanta | Osaat selittää yhden painalluksen koko matkan. |
| 02 | Työkalut, terminaali, Deno ja TypeScriptin ensimmäiset rivit | Ajat itse kirjoitetun TypeScript-ohjelman. |
| 03 | HTML, CSS, JavaScript, DOM ja saavutettava käyttöliittymä | Selain näyttää ja muuttaa tehtävälistaa. |
| 04 | HTTP-pyynnöt, reitit, JSON ja Deno-palvelin | Oma palvelin vastaa selaimelle. |
| 05 | Design, tietotarpeet, avaimet ja relaatiot | Jäljitettävä tietomalli syntyy näkymien tarpeista. |
| 06 | SQL, SQLite, pysyvä tallennus ja migraation ajatus | Tieto säilyy ohjelman sulkemisen yli. |
| 07 | Tietoturva, autentikaatio ja autorisointi | Rakennat koko Tehtävätaulun ja suojaat sen tiedot. |
| 08 | Docker ja PostgreSQL-kontti | Kontti toimii ja data säilyy taltiossa. |
| 09 | Testaus, virheiden selvitys, Git ja luovutus | Osoitat sekä onnistumisen että estettävät toiminnot. |
| 10 | Pakolliset harjoitukset, oma tekniikka ja lisätehtävät | Saat yksiselitteisen palautus- ja arviointiohjeen. |
| 11 | Opettajan toteutusohje ja työpohjat | Materiaalin käyttö opetuksessa ja henkilökohtainen seuranta. |
| 12 | Täydellinen kommentoitu koodipankki | Kaikki esimerkkien lähdetiedostot myös luettavana tekstinä. |

Esimerkkihakemistot ovat erillisiä tarkistuspisteitä. Älä suorita kaikkia palvelimia yhtä aikaa samassa portissa. `00-kieli` on pieni terminaaliohjelma. `01-palvelin` vastaa vain lukupyyntöihin. `02-frontend` tallentaa tiedot vain selaimen muistiin. `03-tietokanta` on paikallinen tietokantaharjoitus. `04-valmis` yhdistää käyttöliittymän, tietokannan ja pääsynhallinnan.

## Saavutettava työskentely

Materiaalin voi lukea järjestyksessä tai otsikoiden avulla. Koodi on oikeaa kopioitavaa tekstiä, ei kuva. Tehtävän pakollisuus ilmaistaan sanana eikä pelkkänä värinä. Jokaisesta kuvallisesta ajatuksesta annetaan sanallinen selitys. Pitkän koodin voi avata myös erillisenä tiedostona omassa editorissa.

Voit suurentaa selaimen tekstin, käyttää näppäimistöä, ruudunlukijaa tai editorin omia saavutettavuusasetuksia. Työvaiheen voi toistaa niin monta kertaa kuin tarvitaan. Kirjoitusnopeus, ulkoa muistaminen ja englanninkielisen ammattisanaston osaaminen etukäteen eivät ole arvioinnin kohteita. Tekninen termi opetellaan yhdessä suomenkielisen merkityksen kanssa.

Tavoitteena on ymmärrettävä ja saavutettava oppimateriaali. Tämä ei ole väite erillisessä auditoinnissa varmennetusta täydellisestä WCAG-vaatimustenmukaisuudesta. Luvussa 03 tehdään omalle käyttöliittymälle käytännön tarkistukset, ja opettaja voi tarjota saman osaamisnäytön tekstinä, puheena tai saavutettavana tallenteena.

## Ennen ensimmäistä ohjelmaa

Varaa editori, selain ja terminaali. Editori on ohjelma, jossa kirjoitat lähdekoodia. Selain näyttää verkkosivuja. Terminaali vastaanottaa kirjoittamiasi komentoja. Työkalujen yksityiskohtaiset asennus- ja tarkistusvaiheet ovat luvussa 02. Docker asennetaan ennen lukua 08; sitä ei tarvita ensimmäisten onnistumisten saamiseen.

**Pysähdy ja sano ääneen:** Mitä haluan tietää kurssin lopussa? Missä tilanteessa pyydän apua? Vastauksen ei tarvitse sisältää yhtään teknistä termiä.
