# R504TL209 – Backend ja frontend rautalangasta

**Markdown- ja VitePress-versio 20.10.2026.** Täydellinen kurssimateriaali sisältää luvut 00–12 ja kaikki kommentoidut koodit.


---

## 00 Aloita tästä: rakennetaan verkkosovellus yhdessä

**Opintojakso:** R504TL209 Full Stack -sovelluskehitys: Backend, 5 op. **Materiaaliversio:** 19.10.2026. **Luentojen tekniikka:** Deno ja TypeScript. **Harjoitussovellus:** Tehtävätaulu.

Tässä materiaalissa opit, miten selaimessa näkyvä käyttöliittymä, palvelimella toimiva ohjelma ja tietokanta työskentelevät yhdessä. Alussa sinun ei tarvitse osata Denoa, TypeScriptiä, HTML:ää, CSS:ää, JavaScriptiä, SQL:ää tai Dockeria. Käymme myös ohjelmoinnin pieniä rakennuspalikoita läpi ennen kuin käytämme niitä isossa sovelluksessa. Tietokoneen käynnistäminen, tiedostojen tallentaminen ja selaimen käyttäminen riittävät aloitukseen.

Tämä on materiaalin VitePress-versio 20.10.2026. Sivupalkista löydät luvut, ja sivun yläreunan haulla voit etsiä käsitteitä. Koodipankissa (katso saman materiaalipaketin vastaava osa) ovat kaikki esimerkit kokonaisina. Sivuston käyttöohje (katso saman materiaalipaketin vastaava osa) auttaa opettajaa käynnistämisessä ja muokkaamisessa.

### Mitä rakennamme?

Tehtävätaulu on pieni verkkosovellus. Käyttäjä luo harjoitustilin, kirjautuu sisään ja lisää itselleen projektin. Projektiin voi lisätä tehtäviä, vaihtaa niiden nimiä, merkitä ne tehdyiksi ja poistaa niitä. Jokainen käyttäjä näkee omat projektinsa. Ylläpitäjä voi tarkastella lukumäärätilastoja. Ylläpitäjän rooli ei tässä sovelluksessa anna oikeutta lukea muiden projektien sisältöä.

Kaikki harjoitukset tehdään itse keksityillä tiedoilla. Esimerkiksi `aino@example.test` on harjoitustunnus. Sähköpostia ei lähetetä eikä osoitteen omistajuutta vahvisteta tässä oppimissovelluksessa. Käytä harjoitteluun omaa uutta salasanaa, jota et käytä missään oikeassa palvelussa.

### Miten tätä materiaalia käytetään?

Etene ensin mukana ja selitä vasta sitten omin sanoin. Jokaisessa tutoriaalissa on pieni työvaihe, jonka tulos voidaan havaita. Ohjelman ei tarvitse olla kerralla valmis.

1. Lue vaiheen tavoite. Selvitä, työskennelläänkö editorissa, terminaalissa vai selaimessa.
2. Luo täsmälleen nimetty tiedosto. Tiedostopääte kuuluu nimeen: `main.ts` ei ole `main.ts.txt`.
3. Kirjoita tai kopioi koko kyseiseen vaiheeseen merkitty koodi. Kommentit kuuluvat mukaan.
4. Tallenna tiedosto. Suorita annettu komento siinä hakemistossa, joka ohjeessa mainitaan.
5. Vertaa omaa tulostasi kohdan **Odotettu tulos** kuvaukseen. Virheilmoitus on havainto, jonka perusteella työtä korjataan.
6. Tee pieni nimetty muutos. Ennusta ennen suorittamista, mitä muuttuu.
7. Selitä parille, opettajalle tai omaan oppimispäiväkirjaan, mitä rivi tai tiedosto tekee.

**Follow-along** tarkoittaa ohjattua mukana tekemistä. Ensimmäinen kierros saa olla mallin tarkkaa toistamista. **Tarkistuspiste** tarkoittaa kohtaa, jossa pysähdytään varmistamaan, että ohjelma toimii ennen seuraavaa muutosta. **Oma sovellus** on lopuksi tehtävä toteutus, johon sovellat oppimaasi. Pelkkä valmiin esimerkin käynnistäminen ei vielä osoita kaikkia oppimistavoitteita.

### Oppimispolut ja yhteiset vaatimukset

| Polku | Työskentely | Sama pakollinen näyttö |
| --- | --- | --- |
| Ohjattu Deno-polku | Tee tämän materiaalin esimerkit järjestyksessä ja sovella niitä omaan työhön. Backend on TypeScriptiä, ajossa on Deno. | Frontend, API, designistä johdettu tietomalli, oikea tietokanta, autentikaatio, autorisointi, tietoturva, Docker-perusteet, testit ja dokumentaatio. |
| Oma tekniikka | Toteuta sama käyttäytyminen esimerkiksi .NETillä, Javalla, Nodella, Rustilla tai C++:lla. Valitse siihen sopivat kirjastot ja työkalut. | Täsmälleen samat toiminnalliset ja turvallisuutta koskevat hyväksymisehdot. Esimerkin tiedostonimiä tai Deno-komentoja ei tarvitse kopioida. |
| Aiemman osaamisen näyttö | Kokoa olemassa olevasta työstä henkilökohtainen näyttö ja täydennä puuttuvat osat opettajan kanssa sovitulla tavalla. | Jokainen ydintavoite osoitetaan; esimerkiksi autentikaatiota tai Docker-osaamista ei voi jättää näyttämättä. |

Tietokannaksi riittää **SQLite tai Dockerissa ajettava PostgreSQL**. Molempia tietokantoja ei tarvitse toteuttaa omaan sovellukseen. Dockerin perustaidot osoitetaan silti kummallakin polulla: käynnistä kontti, selitä portti ja taltio sekä näytä tiedon säilyminen kontin uudelleenluonnissa. Oman backend-sovelluksen kontittaminen on lisätehtävä L2; Dockerin peruslabra P6 on kaikille pakollinen.

P8:n ja P9:n käyttöoikeus- ja tietoturvakokeiden näyttö on pakollinen. Valmiiden testien ajaminen kuuluu ohjattuun Deno-harjoitteluun. Oman tekniikan polulla saman näytön voi tuottaa käsin tai automaatiolla. Uusien automaattisten regressiotestien laajempi laatiminen on lisätehtävä L1.

Frontend tehdään tässä materiaalissa HTML:llä, CSS:llä ja tavallisella JavaScriptillä. Näin selain voi ajaa sen suoraan. Backendissä käytetään TypeScriptiä. Tämä jako on tietoinen opetuksen ratkaisu: ensin opitaan selaimen toiminta, ja myöhemmin frontendinkin voi siirtää TypeScriptiin tai haluttuun sovelluskehykseen.

### Sisältökartta

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

### Saavutettava työskentely

Materiaalin voi lukea järjestyksessä tai otsikoiden avulla. Koodi on oikeaa kopioitavaa tekstiä, ei kuva. Tehtävän pakollisuus ilmaistaan sanana eikä pelkkänä värinä. Jokaisesta kuvallisesta ajatuksesta annetaan sanallinen selitys. Pitkän koodin voi avata myös erillisenä tiedostona omassa editorissa.

Voit suurentaa selaimen tekstin, käyttää näppäimistöä, ruudunlukijaa tai editorin omia saavutettavuusasetuksia. Työvaiheen voi toistaa niin monta kertaa kuin tarvitaan. Kirjoitusnopeus, ulkoa muistaminen ja englanninkielisen ammattisanaston osaaminen etukäteen eivät ole arvioinnin kohteita. Tekninen termi opetellaan yhdessä suomenkielisen merkityksen kanssa.

Tavoitteena on ymmärrettävä ja saavutettava oppimateriaali. Tämä ei ole väite erillisessä auditoinnissa varmennetusta täydellisestä WCAG-vaatimustenmukaisuudesta. Luvussa 03 tehdään omalle käyttöliittymälle käytännön tarkistukset, ja opettaja voi tarjota saman osaamisnäytön tekstinä, puheena tai saavutettavana tallenteena.

### Ennen ensimmäistä ohjelmaa

Varaa editori, selain ja terminaali. Editori on ohjelma, jossa kirjoitat lähdekoodia. Selain näyttää verkkosivuja. Terminaali vastaanottaa kirjoittamiasi komentoja. Työkalujen yksityiskohtaiset asennus- ja tarkistusvaiheet ovat luvussa 02. Docker asennetaan ennen lukua 08; sitä ei tarvita ensimmäisten onnistumisten saamiseen.

**Pysähdy ja sano ääneen:** Mitä haluan tietää kurssin lopussa? Missä tilanteessa pyydän apua? Vastauksen ei tarvitse sisältää yhtään teknistä termiä.


---

## 01 Verkkosovellus rautalangasta

**Tavoite:** osaat nimetä verkkosovelluksen osat ja selittää, miksi niitä tarvitaan. **Esitiedot:** ei ohjelmoinnin esitietoja. **Tarkistuspiste:** kuvailet omilla sanoillasi, mitä tapahtuu, kun käyttäjä lisää tehtävän.

### Aloitetaan arkisesta tilanteesta

Kuvittele tehtävävihko, jota käytät tietokoneella. Haluat kirjoittaa siihen tehtävän, sulkea selaimen ja löytää tehtävän huomenna uudelleen. Haluat myös, ettei toinen opiskelija näe omaa listaasi.

Tarvitsemme kolme vastuuta. Jonkin on näytettävä kenttä ja painike. Jonkin on päätettävä, onko lisäys sallittu ja onko teksti kelvollinen. Jonkin on säilytettävä hyväksytty tieto. Nämä vastuut ovat käyttöliittymä, palvelinpuolen ohjelma ja tietokanta.

**Frontend** on sovelluksen käyttäjälle näkyvä ja hänen kanssaan toimiva osa. Tässä se suoritetaan selaimessa. Se piirtää lomakkeen, ottaa vastaan kirjoituksesi, lähettää pyynnön ja näyttää vastauksen. Frontend ei saa päättää lopullisesti, mitä tietoja sinulla on oikeus käsitellä.

**Backend** on palvelinpuolen toiminta. Se vastaanottaa pyynnöt, tarkistaa tiedot ja oikeudet, käyttää tietokantaa ja muodostaa vastaukset. Backend voi toimia omalla kannettavallasi kehityksen aikana. Se ei tarkoita automaattisesti pilvipalvelua eikä tietokantaa.

**Tietokanta** on tietojen järjestetty säilytyspaikka ja sen käsittelyyn käytetty järjestelmä. Tässä tieto on tauluissa. Käyttäjän, projektin ja tehtävän tiedot erotetaan toisistaan ja yhdistetään tunnisteilla. Tietokanta säilyttää tietoja myös ohjelman sulkemisen jälkeen, kun käytämme tiedostoa tai pysyvää taltiota.

### Asiakas ja palvelin ovat rooleja

**Client eli asiakas** pyytää palvelua. Tässä selain on backendin asiakas. **Server eli palvelin** vastaanottaa pyynnön ja tarjoaa vastauksen. Sana palvelin voi tarkoittaa sekä ohjelmaa että tietokonetta, jossa ohjelma toimii. Tässä materiaalissa sanomme erikseen *palvelinohjelma*, kun tarkoitamme käynnissä olevaa Deno-ohjelmaa.

Sama ohjelma voi olla yhdessä yhteydessä palvelin ja toisessa asiakas. PostgreSQL-yhteyttä käyttävä backend on selaimeen nähden palvelin ja PostgreSQL:ään nähden tietokanta-asiakas. SQLite taas on sovellukseen liitetty tietokantamoottori: sille ei tarvitse käynnistää erillistä tietokantapalvelinta. [Lähde: MDN, palvelimen käsite](https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Web_mechanics/What_is_a_web_server).

| Sana | Selitys tavallisella kielellä | Tehtävätaulussa |
| --- | --- | --- |
| Käyttäjä | Ihminen, joka käyttää sovellusta | Opiskelija Aino. |
| Selain | Ohjelma, joka näyttää verkkosivuja ja ajaa sivun JavaScriptiä | Firefox, Chrome, Edge tai Safari. |
| Käyttöliittymä, UI | Näkyvät ja käytettävät kentät, tekstit ja painikkeet | Tehtävän nimi ja Lisää-painike. |
| Käyttäjäkokemus, UX | Miten ymmärrettävä ja sujuva käyttö on | Huomaako Aino, tallentuiko tehtävä? |
| Frontend | Käyttöliittymä ja selaimessa tehtävä toiminta | HTML, CSS ja JavaScript. |
| Backend | Pyynnöt käsittelevä palvelinpuolen ohjelma | TypeScript-koodi Denossa. |
| Client, asiakas | Se osapuoli, joka lähettää pyynnön | Selain lähettää lisäyspyynnön. |
| Server, palvelin | Se osapuoli, joka käsittelee pyynnön | Deno-ohjelma vastaa lisäyspyyntöön. |
| Prosessi | Käynnissä oleva ohjelman suoritus | Terminaalista käynnistetty Deno-palvelin. |
| Full stack | Käyttöliittymän ja palvelinpuolen muodostama kokonaisuus | Selain, API ja tietokanta yhdessä. |
| Runtime, ajoympäristö | Ohjelma, joka suorittaa lähdekoodia ja tarjoaa sille toimintoja | Deno suorittaa TypeScriptiä. |
| Kirjasto | Valmiita toimintoja, joita oma ohjelma kutsuu | Tietokannan avaava SQLite-moduuli. |
| Framework, sovelluskehys | Valmis rakenne sovelluksen järjestämiseen | Oma toteutus voi käyttää esimerkiksi Honoa. |

### Mitä yksi painallus tekee?

Käyttäjä kirjoittaa tehtävän nimen ja painaa Lisää-painiketta. Selain lukee lomakkeen arvon ja muodostaa HTTP-pyynnön. Backend tarkistaa kirjautumisen, projektin omistajan ja tekstin pituuden. Kun tarkistukset onnistuvat, backend tallentaa rivin tietokantaan. Se palauttaa vastauksen, jossa on uuden tehtävän tunniste. Selain näyttää uuden rivin ja kertoo tallennuksen onnistuneen.

Jos käyttöoikeus puuttuu, tietokantaan ei kirjoiteta mitään. Jos palvelin ei vastaa, käyttöliittymä näyttää virheen. **Painikkeen painaminen ei vielä todista, että tieto tallentui.** Siksi lataustila, onnistumisviesti ja virheilmoitus kuuluvat toimivaan käyttöliittymään.

Tietokanta ei ole avoin suoraan selaimelle. Tietokannan salasanaa ei laiteta HTML:ään tai selaimen JavaScriptiin. Selain saa vain ne tiedot ja toiminnot, jotka backendin rajapinta antaa sille.

### HTTP, pyyntö ja vastaus

**HTTP** on yhteisesti sovittu tapa lähettää verkkopyyntöjä ja vastauksia. **Request eli pyyntö** kertoo, mitä asiakas haluaa tehdä. **Response eli vastaus** kertoo, miten kävi ja mitä tietoa palautetaan. **HTTPS** suojaa HTTP-yhteyden TLS-salauksella. Suojaus koskee tiedon kulkemista yhteydessä; se ei itsessään tarkista käyttäjän oikeuksia. [Lähde: MDN, HTTP:n yleiskuva](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview).

Pyynnössä ovat esimerkiksi metodi, osoite, otsakkeet ja mahdollinen sisältö. **Metodi** on toiminnon laji: `GET` hakee, `POST` luo tai käynnistää toiminnon, `PATCH` muuttaa osaa tiedosta ja `DELETE` poistaa. **Header eli otsake** kertoo viestin ominaisuudesta, kuten sisältötyypistä. **Body eli viestin runko** sisältää lähetettävän datan, esimerkiksi uuden tehtävän nimen.

Vastauksessa on **statuskoodi**, esimerkiksi `200` onnistumisesta tai `404` puuttuvasta kohteesta. Virhekoodi ei ole vain ohjelmoijalle tarkoitettu numerointi: frontend käyttää sitä päättäessään, näytetäänkö tulos, kirjautumispyyntö vai korjausohje.

### Osoite purettuna osiin

Käytämme osoitetta `http://localhost:8000/api/projects`.

| Osa | Merkitys |
| --- | --- |
| `http` | Yhteyden käytäntö eli protokolla. Paikallisessa harjoituksessa käytetään HTTP:tä. |
| `localhost` | Tällä hetkellä käyttämäsi tietokone verkkoyhteyden näkökulmasta. |
| `8000` | Portti, jossa oma palvelinohjelmamme kuuntelee. |
| `/api/projects` | Polku, jonka avulla backend valitsee käsiteltävän toiminnon. |

**IP-osoite** tunnistaa verkkolaitteen tai verkkoliitännän. `127.0.0.1` on tämän koneen IPv4-silmukkaosoite. **DNS** yhdistää verkkotunnuksen IP-osoitteeseen. **Portti** erottaa samalla koneella kuuntelevia palveluita. Kaksi palvelinta ei yleensä voi kuunnella yhtä aikaa samaa osoite-portti-yhdistelmää.

**Origin eli alkuperä** muodostuu protokollasta, nimestä ja portista yhdessä. `http://localhost:8000` ja `http://localhost:3000` ovat eri alkuperiä. Myös `http://127.0.0.1:8000` ja `http://localhost:8000` ovat eri alkuperiä. Tässä kurssissa käytetään lopulliselle sovellukselle johdonmukaisesti osoitetta `http://localhost:8000`. Docker-luvussa huomataan, että kontin `localhost` tarkoittaa konttia itseään.

### Rajapinta ei ole sama asia kuin käyttöliittymä

**API eli ohjelmointirajapinta** on sovittu tapa, jolla ohjelma pyytää toiselta ohjelmalta tietoa tai toimintaa. Tällä kurssilla API kulkee HTTP:n yli. **Endpoint eli rajapinnan toiminto-osoite** tarkoittaa esimerkiksi yhdistelmää `GET /api/projects`. Sama polku eri metodilla voi tarkoittaa eri toimintoa.

**Reitti** on backendin sääntö, joka yhdistää metodin ja polun koodiin. **Resurssi** on rajapinnassa käsiteltävä asia, esimerkiksi projekti. **CRUD** tarkoittaa luontia, lukemista, päivittämistä ja poistamista: Create, Read, Update, Delete.

**JSON** on tekstimuoto tietojen vaihtamiseen. JavaScript-olio on muistissa oleva tietorakenne, JSON taas sitä muistuttava sovittu tekstiesitys. Verkon yli kulkee esitys. HTTP-vastauksen vastaanottaja jäsentää eli tulkitsee tekstin omaksi tietorakenteekseen. JSON ei sisällä kommentteja; materiaalin JSON-vastaukset ovat dataa, ja niiden kentät selitetään vieressä. Ohjelmakoodimme sen sijaan kommentoidaan.

### Missä tieto asuu?

| Paikka | Esimerkki | Säilyykö sulkemisen jälkeen? | Voiko siihen luottaa oikeuksien lähteenä? |
| --- | --- | --- | --- |
| Selaimen muuttuja | Näytöllä oleva tehtävätaulukko | Ei yleensä sivun uudelleenlatauksen yli. | Ei. Käyttäjä voi muuttaa sitä. |
| Selaimen localStorage | Sivustokohtaisesti selaimeen tallennettu teksti | Usein kyllä, kunnes tiedot poistetaan. | Ei. Se on asiakkaan hallinnassa. |
| Backendin muuttuja | Hetkellinen välitulos | Ei prosessin uudelleenkäynnistyksen yli. | Ei korvaa pysyvää tallennusta. |
| SQLite-tiedosto | `data/tehtavataulu.sqlite` | Kyllä, jos tiedosto säilyy. | Backend tarkistaa sen tiedot ja säännöt. |
| PostgreSQL:n taltio | Dockerin nimetty taltio | Kyllä, jos taltiota ei poisteta. | Backend käyttää sitä hallitusti. |

Tietokanta ei yksin tee sovelluksesta turvallista. Backend päättää, millä ehdoilla tietokannan rivejä saa hakea. Käyttäjä voi lähettää pyynnön myös muulla ohjelmalla kuin sovelluksen omalla käyttöliittymällä. Tämän vuoksi piilotettu painike tai lomakkeen `required`-asetus ei ole käyttöoikeustarkistus.

### Kirjautuminen ja oikeudet ovat kaksi eri kysymystä

**Autentikaatio eli autentikointi** selvittää, kuka pyynnön tekijä on. Tässä se tehdään käyttäjätunnuksella ja salasanalla sekä kirjautumisen jälkeen istunnolla. **Autorisointi eli valtuutus** ratkaisee, saako tunnistettu käyttäjä tehdä pyytämänsä toiminnon juuri tähän kohteeseen. Aino voi olla kirjautunut mutta silti vailla oikeutta Boriksen projektiin.

**Istunto eli sessio** yhdistää peräkkäiset pyynnöt samaan kirjautumiseen. **Cookie eli eväste** on pieni tieto, jonka selain säilyttää ja lähettää soveltuvissa pyynnöissä. Tässä eväste sisältää satunnaisen istuntotunnisteen. Käyttäjän salasanaa ei tallenneta evästeeseen.

### Ensimmäinen harjoitus ilman koodausta

Piirrä paperille tai kirjoita tekstinä käyttäjä, selain, backend ja tietokanta. Kuvaa seuraavat kolme tilannetta: uuden tehtävän onnistunut lisäys, lisäys ilman kirjautumista ja toisen käyttäjän tehtävän poistoyritys. Kirjoita jokaiseen tilanteeseen, missä kohdassa päätös syntyy.

**Odotettu tulos:** oikeuspäätös on backendissä; pysyvä tallennus on tietokannassa; käyttöliittymä kertoo päätöksen käyttäjälle. **Muuta yhtä asiaa:** korvaa selain puhelimen sovelluksella. Backendin samojen sääntöjen pitää edelleen päteä.

**Tarkista ymmärrys:** Voiko selain toimia backendin asiakkaana, vaikka molemmat ovat samalla koneella? Kyllä. Voiko sisään kirjautunut käyttäjä saada käyttöoikeusvirheen? Kyllä. Onko Docker sama asia kuin Deno? Ei: Docker suorittaa kontteja ja Deno ohjelmakoodia kontin sisällä tai suoraan koneella.


---

## 02 Työkalut, terminaali, Deno ja TypeScript

**Tavoite:** käynnistät oman ohjelman ja ymmärrät sen ensimmäiset rakennuspalikat. **Esitiedot:** luku 01. **Työhakemisto:** ensin itse luomasi `backend-kurssi`, sitten sen alihakemistot. **Valmis tarkistuspiste:** `esimerkit/00-kieli/kieli.ts`.

### Kolme työpaikkaa ruudulla

Editorissa kirjoitetaan ja tallennetaan lähdekoodia. Terminaalissa käynnistetään ohjelma ja luetaan sen tulostus. Selaimessa käytetään valmista käyttöliittymää. Terminaalin komento ei kuulu TypeScript-tiedostoon, eikä TypeScript-koodi kuulu selaimen osoiteriville.

Voit käyttää esimerkiksi VS Codea tai muuta tekstieditoria. VS Coden Deno-laajennus voi näyttää koodin tyypitykseen liittyvät virheet jo kirjoittaessa. Se ei korvaa itse Deno-ohjelman asennusta. Avaa editoriin harjoituksen **koko hakemisto**, jotta sen tiedostot pysyvät yhdessä. Älä käytä muotoiltua tekstinkäsittelyohjelmaa lähdekoodin kirjoittamiseen.

**Terminaali** on ikkuna tekstikomennoille. **Komentotulkki eli shell** on ohjelma, joka tulkitsee nämä komennot. Windowsissa tässä materiaalissa käytetään PowerShelliä. Linuxissa ja macOS:ssa käytetään tavallista komentotulkkia, kuten Bashia tai Zsh:ta. Terminaalin alussa näkyvä kehote, esimerkiksi `PS C:\...>` tai `$`, ei kuulu kopioitavaan komentoon.

### Asenna ja tarkista Deno

Deno suorittaa JavaScriptiä ja TypeScriptiä. Kurssipaketti on tarkistettu Deno-versiolla **2.9.7**, johon sisältyy TypeScript **6.0.3**. Uudempi vakaa Deno 2 -versio voi toimia, mutta tarkista esimerkit ennen yhteistä opetuskertaa. Version lukitseminen tekee luokan ongelmien selvittelystä toistettavaa; se ei tarkoita päivitysten jättämistä pysyvästi tekemättä. [Deno: asennus](https://docs.deno.com/runtime/getting_started/installation/) ja [julkaisut](https://github.com/denoland/deno/releases).

#### Windows ja PowerShell

Avaa Windows Terminalin PowerShell-välilehti. Seuraava komento käyttää Windowsin pakettien asennustyökalua WinGetiä. Jos koulun laitetta hallinnoidaan keskitetysti eikä asennus onnistu, käytä oppilaitoksen valmista Deno-ympäristöä tai pyydä asennus sen käytännön mukaisesti.

```powershell
# Asenna Deno Windowsin paketinhallinnalla; tätä ei kirjoiteta .ts-tiedostoon.
winget install DenoLand.Deno
```

Sulje ja avaa terminaali uudelleen asennuksen jälkeen. Tarkista komennolla alla. Jos WinGet puuttuu, virallinen Deno-asennussivu tarjoaa Windowsille myös muun asennustavan.

#### macOS tai Linux

Jos macOS:ssa on jo Homebrew, voit käyttää sen komentoa `brew install deno`. Muussa tapauksessa käytä Denon virallista asennusohjetta. Alla lataus ja suoritus on erotettu, jotta näet, mitä tiedostoa olet suorittamassa. `curl` on lataustyökalu; `sh` suorittaa komentotulkin skriptin.

```sh
# Lataa Denon virallinen asennusskripti tiedostoksi nykyiseen hakemistoon.
curl -fsSL https://deno.land/install.sh -o deno-install.sh
# Näytä skripti, jotta voit verrata sitä viralliseen ohjeeseen ennen suorittamista.
cat deno-install.sh
# Suorita tarkastettu asennusskripti tavallisen käyttäjän oikeuksin.
sh deno-install.sh
```

Noudata asennuksen lopussa tulostuvaa ohjetta Denon lisäämisestä `PATH`-asetukseen. **PATH** on käyttöjärjestelmän luettelo hakemistoista, joista komentojen ohjelmia etsitään. Älä arvaa asetusta: käyttöjärjestelmä ja asennustapa voivat vaikuttaa sen muotoon. Avaa terminaali uudelleen.

#### Kaikki käyttöjärjestelmät

```sh
# Tulosta Deno-, JavaScript-moottori- ja TypeScript-versio.
deno --version
```

**Odotettu tulos:** kolme versiota sisältävää riviä. Jos tulos on *command not found* tai *not recognized*, ohjelmaa ei löydy komennon hakupolusta. Tämä ei ole TypeScript-koodin virhe. Tarkista asennus ja uuden terminaalin avaaminen ennen jatkamista.

### Luo ensimmäinen työhakemisto

Seuraavat komennot toimivat PowerShellissä ja tässä esitetyissä Unix-komentotulkeissa. Aloita esimerkiksi omassa Dokumentit-hakemistossasi. Hakemiston voi luoda myös tiedostonhallinnassa.

```sh
# Luo yksi uusi hakemisto omalle kurssityöllesi.
mkdir backend-kurssi
# Siirry sinne; seuraavat suhteelliset tiedostopolut tulkitaan tästä paikasta.
cd backend-kurssi
# Näytä nykyinen hakemisto ja tarkista, että nimi päättyy backend-kurssi-osaan.
pwd
# Tee kieliharjoitukselle oma paikka.
mkdir 00-kieli
# Siirry kieliharjoituksen hakemistoon.
cd 00-kieli
```

`cd ..` siirtyy yhden hakemiston ylöspäin. `.` tarkoittaa nykyistä hakemistoa. Suhteellinen polku kuten `./kieli.ts` tarkoittaa tiedostoa nykyisessä hakemistossa; täydellinen polku kertoo sijainnin alusta asti. Tiedostonnimen isot ja pienet kirjaimet voivat olla eri nimiä käyttöjärjestelmästä riippuen. Käytä tässä ohjeiden kirjoitusasua.

### Tutoriaali T1: ensimmäinen oma rivi

Luo editorissa `hei.ts`. Kopioi molemmat rivit ja tallenna.

```ts
// console.log tulostaa sulkeisiin annetun tekstin terminaaliin.
console.log("Hei! Minun ohjelmani toimii.");
```

Suorita terminaalissa hakemistossa `00-kieli`:

```sh
# Tarkista tyypit ja suorita tallennettu TypeScript-tiedosto.
deno run --check hei.ts
```

**Odotettu tulos:** `Hei! Minun ohjelmani toimii.`. Terminaalin kehote palautuu: ohjelma päättyi. **Pieni muutos:** vaihda teksti omaksi tervehdykseksesi, tallenna ja aja uudelleen. Jos vanha teksti toistuu, tarkista tallennus ja se, minkä tiedoston käynnistit.

**Koodi** on tietokoneelle annettuja ohjeita. **Merkkijono** on lainausmerkkien sisällä oleva teksti. **Funktiokutsu** pyytää nimettyä toimintoa tekemään työnsä: tässä toimintona on `console.log`. **Argumentti** on kutsulle annettu syöte. **Kommentti** on ihmiselle tarkoitettu selitys; `//`-merkeillä alkava teksti ei ole suoritettava ohje.

### TypeScript ei ole sama asia kuin Deno

TypeScript on ohjelmointikieli, joka lisää JavaScriptiin muun muassa tyyppikuvauksia. Deno on ajoympäristö ja työkalukokonaisuus. **Tyyppi** kertoo, minkä muotoista arvoa koodissa odotetaan: esimerkiksi tekstiä, lukua tai totuusarvoa. Deno osaa suorittaa `.ts`-tiedoston suoraan, mutta `deno run` ja tyyppien tarkistaminen ovat eri toimintoja. Siksi käytämme oppimisvaiheessa `--check`-valitsinta. [Deno: TypeScriptin suoritus ja tyyppitarkistus](https://docs.deno.com/runtime/fundamentals/typescript/).

Tyyppitarkistus ei tarkista verkkopyyntöjen sisältöä ohjelman ollessa käynnissä. Jos kirjoitat tyypin `title: string`, vieras asiakas voi silti lähettää numeron tai jättää kentän pois. Backendissä tarvitaan erillinen ajonaikainen tarkistus. **Ajonaikainen** tarkoittaa aikaa, jolloin ohjelma todella käsittelee arvoja.

### Tutoriaali T2: arvot, oliot ja toisto

Luo `kieli.ts`. Sen kokonainen kommentoitu sisältö on koodipankissa kohdassa `esimerkit/00-kieli/kieli.ts` ja samassa tiedostossa ZIP-paketissa. Kirjoita aluksi koko aloituslohko tiedoston alusta viimeiseen `console.log("Tehty:", tehty, "Tavoite:", tavoite, "Valmis:", valmis);` -riviin asti. Mukaan kuuluvat myös `tehty`-arvon kasvatus ja `valmis`-muuttujan määrittely. Tarkista toiminta. Lisää sen jälkeen `Tehtava`-tyyppi ja taulukko, sitten funktio ja silmukka ja lopuksi kaksi viimeistä esimerkkiä. Näin uusi käsite tulee näkyviin pieninä annoksina.

```sh
# Suorita koko kieliharjoitus tyyppitarkistuksen kanssa.
deno run --check kieli.ts
```

**Odotettu tulos:** opiskelijan nimi on Aino, tehtyjen määrä 2 ja tavoite 3. Ohjelma tulostaa yhden tehdyn ja yhden keskeneräisen tehtävän, keskeneräisten määrän 1 ja lopuksi tekstin `Perusteet toimivat!`.

| Merkintä | Mitä se tarkoittaa? | Mitä opiskelija kokeilee? |
| --- | --- | --- |
| `const` | Nimeä arvo, jota ei sijoiteta myöhemmin uudelleen tähän muuttujaan. Olion sisältö voi silti muuttua. | Vaihda nimen alkuarvo. |
| `let` | Nimeä arvo, joka saa muuttua myöhemmin. | Muuta tehtyjen alkuarvoa. |
| `string`, `number`, `boolean` | Teksti, luku, tosi/epätosi. | Selitä miksi `"2"` ja `2` eivät ole sama tyyppi. |
| `=` ja `===` | Sijoitus ja tarkka yhtäsuuruusvertailu. | Selvitä, kumpi muuttaa muuttujaa. |
| `{ ... }` | Olion kentät tai ohjelmalohko, asiayhteyden mukaan. | Etsi tiedostosta molemmat käyttötavat. |
| `[ ... ]` | Taulukon eli järjestetyn joukon arvot. | Lisää kolmas tehtävä. |
| `function` ja `return` | Määrittele toiminto ja palauta sen tulos. | Vaihda tehdyn tehtävän tulostusteksti. |
| `if` | Tee jotakin vain ehdon toteutuessa. | Vaihda yhden tehtävän valmis-arvo. |
| `for...of` | Käsittele jokainen taulukon arvo vuorollaan. | Tarkista, tulostuuko lisäämäsi tehtävä. |
| `=>` | Nuolifunktion merkintä: syötteet vasemmalla, tehtävä työ oikealla. | Selitä `filter`-ehdon `!`-merkki. |
| `unknown` | Arvon todellista tyyppiä ei vielä tunneta. | Vaihda ulkoinen arvo numeroksi ja tarkkaile tarkistusta. |
| `async`, `await`, `Promise` | Asynkroninen toiminto, sen tuloksen odotus ja tulosta kuvaava lupaus. | Etsi, millä rivillä tervehdys valmistuu. |

Lähde termeille: [TypeScript Handbook, tavalliset tyypit](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html). Esimerkin tehtävä ja selitykset on kirjoitettu tätä opintojaksoa varten.

### Virhettä saa kokeilla hallitusti

Vaihda `const tavoite: number = 3;` niin, että arvo on lainausmerkeissä. Suorita `deno check kieli.ts`. Tarkistimen pitää kertoa, ettei teksti käy numeron paikalle. Palauta toimiva arvo. Älä peitä virhettä `any`-tyypillä tai ohituskommentilla. **any** käytännössä ohittaa osan tyyppien tarkistuksesta, joten se ei ratkaise ymmärtämisen ongelmaa.

**Syntaksivirhe** tarkoittaa, ettei koodin kirjoitusasu noudata kielen sääntöjä; esimerkiksi lainausmerkki puuttuu. **Tyyppivirhe** tarkoittaa, että arvoa käytetään väärän tyyppisenä. **Ajonaikainen virhe** tapahtuu ohjelman käydessä, esimerkiksi tiedostoa ei löydy. **Looginen virhe** tarkoittaa, että koodi toimii mutta tekee väärän asian, kuten näyttää myös toisen käyttäjän tiedot.

### Deno-työkalut ja oikeudet

```sh
# Tarkista tyypit suorittamatta ohjelmaa.
deno check kieli.ts
# Tarkista tavallisia koodin ongelmia; tätä kutsutaan lint-tarkistukseksi.
deno lint kieli.ts
# Muotoile sisennykset ja välit johdonmukaisiksi; tämä muuttaa tiedoston ulkoasua.
deno fmt kieli.ts
```

Deno pyytää erikseen oikeuksia esimerkiksi tiedostojen ja verkon käyttöön. `--allow-net=127.0.0.1:8000` sallii nimetyn verkko-osoitteen. `--allow-read=./data` sallii nimetyn hakemiston lukemisen ja `--allow-write=./data` kirjoittamisen. Nämä ovat ohjelman suoritusympäristön oikeuksia. Ne eivät korvaa sovelluksen käyttäjien autorisointia. [Deno: oikeudet](https://docs.deno.com/runtime/reference/permissions/).

Perusteissa ei käytetä `-A`-valitsinta, joka myöntää laajat oikeudet. Jos saat oikeusvirheen, lue mitä ohjelma yritti tehdä ja vertaa sitä ohjeen käynnistyskomentoon. Komentojen valitsimet kuuluvat ennen suoritettavan tiedoston nimeä. Luvun 06 komentoriviargumentit puolestaan tulevat tiedostonimen jälkeen, koska ne annetaan omalle ohjelmalle.

**Valmis jatkamaan, kun:** osaat käynnistää tiedoston oikeassa hakemistossa, löydät sen tulostuksen ja erotat Deno-työkalun TypeScript-kielestä. Sinun ei tarvitse vielä kirjoittaa kaikkea ulkomuistista.


---

## 03 Frontend: selaimessa näkyvä ja käytettävä osa

Tässä luvussa aloitat tavallisesta tekstitiedostosta ja rakennat lopulta tehtävälistan, jota voi käyttää näppäimistöllä. Et tarvitse ennestään HTML-, CSS-, JavaScript- tai TypeScript-osaamista. Etene yksi kokeilu kerrallaan: luo tiedosto, kopioi koko esimerkki, tallenna, avaa selaimessa ja vertaa tulosta kuvaukseen. Sen jälkeen muuta yhtä asiaa ja kokeile uudelleen.

Luvun kuusi pientä kokeilua opettavat yhden asian kerrallaan. Lopussa yhdistät ne mukana toimitettuun Tehtävätauluun. Valmiiden tiedostojen kommentit selittävät myös ne rivit, joita ei selitetä uudelleen tässä tekstissä.

Kokeilujen 1–5 täydelliset tiedostot ovat myös hakemistossa **`esimerkit/02-frontend-kokeilut/`**. Voit verrata omaa tallennustasi näihin samoista koodilohkoista tehtyihin kopioihin.

**Etene kahdella kierroksella:**

1. Ensimmäisellä kierroksella tee kohdat **3.1–3.11** ja kokeile kohdan **3.14** saavutettavuustarkistukset selaimen muistissa toimivalla demolla. Tässä vaiheessa oikeaa backendiä ei vielä tarvita. Jatka sitten lukuihin **04–07**, joissa rakennat palvelimen, tietomallin, tietokannan ja koko turvallisen sovelluksen.
2. Kun **luvun 07 Tehtävätaulu toimii**, palaa tämän luvun kohtiin **3.12–3.13**. Tee verkkopyyntökokeilu ja koko käyttöliittymän toimintopolku. Toista sen jälkeen kohdan **3.14** saavutettavuuskokeet valmiille sovellukselle. Kohdan **3.15** tehtävien pakollisuus täsmennetään myös luvussa 10.

**Osaat luvun jälkeen:**

- erottaa sisällön rakenteen, ulkoasun, toiminnallisuuden ja palvelimelle tallennetun tiedon;
- tehdä nimetyn syötekentän ja näppäimistöllä toimivan lomakkeen;
- lukea käyttäjän tekstin ja näyttää sen turvallisesti tekstinä;
- selittää, miten tapahtuma, funktio, muuttuja, olio ja taulukko liittyvät tehtävälistaan;
- hakea palvelimelta tietoa ja näyttää odotus-, onnistumis-, tyhjä- ja virhetilan;
- kokeilla käyttöliittymän saavutettavuutta sekä erottaa selaimen tarkistuksen palvelimen käyttöoikeustarkistuksesta.

### 3.1 Aloitetaan sanoista

**Frontend** on sovelluksen käyttäjälle näkyvä ja käyttäjän ohjaama osa. Tässä opintojaksossa se toimii verkkoselaimessa. Kun kirjoitat tehtävän nimen kenttään, painat painiketta tai luet listaa, käytät frontendiä. **Käyttöliittymä** tarkoittaa niitä sisältöjä ja toimintoja, joiden kautta käytät sovellusta. [F1]

**Selain** on esimerkiksi tietokoneessa tai puhelimessa toimiva ohjelma, joka näyttää verkkosivuja. **Client**, suomeksi asiakasohjelma, on ohjelma, joka pyytää palvelua toiselta ohjelmalta. Tehtävätaulussa selain toimii asiakkaana. Asiakas ei tässä tarkoita ihmistä tai maksavaa asiakasta. [F2]

**Backend** on palvelimessa suoritettava sovelluksen osa. Se vastaanottaa pyynnöt, tarkistaa syötteet ja käyttöoikeudet sekä lukee tai muuttaa tietokantaa. **Server** eli palvelin voi keskustelussa tarkoittaa palvelua tarjoavaa ohjelmaa tai sitä ajavaa konetta. Kurssin `Deno.serve` käynnistää palvelinohjelman omalle koneellesi. Sama kone voi siis ajaa sekä selainta että palvelinta. [F2]

**Pyyntö** on asiakkaan lähettämä viesti, esimerkiksi ”hae omat projektini”. **Vastaus** on palvelimen palauttama viesti, esimerkiksi projektien tiedot tai tieto siitä, että kirjautuminen puuttuu. **Rajapinta**, tässä HTTP API, tarkoittaa sovittua tapaa käyttää toisen ohjelman toimintoja. Sopimukseen kuuluvat esimerkiksi osoite, HTTP-menetelmä ja tiedon muoto. Selain ei tarvitse tietoa siitä, millä kielellä palvelin on toteutettu. [F2, F9]

| Asia | Mihin sitä käytetään tässä kurssissa? | Missä se suoritetaan tai käsitellään? |
|---|---|---|
| HTML | Otsikot, tekstikappaleet, kentät, painikkeet ja sisältöjen merkitys | Selain lukee tiedoston ja muodostaa sivun rakenteen. |
| CSS | Värit, välit, reunukset, tekstikoko ja näkymän asettelu | Selain soveltaa tyylisääntöjä sivun elementteihin. |
| JavaScript | Painikkeen toiminta, listan muuttaminen ja verkkopyynnöt | Tämän luvun `.js`-tiedostot suoritetaan selaimessa. |
| TypeScript | Backendin ohjelmakoodi ja kehitysaikaiset tyyppitarkistukset | Kurssin `.ts`-tiedostoja käsittelee Deno. |
| Tietokanta | Käyttäjien, projektien ja tehtävien säilyttäminen | Backend käyttää SQLitea tai myöhemmässä vaihtoehdossa PostgreSQL:ää. |

HTML, CSS ja JavaScript täydentävät toisiaan. HTML:n `button` kertoo painikkeen merkityksen. CSS voi antaa sille tumman taustan. JavaScript voi liittää painikkeen käyttöön toiminnon. Pelkkä tumma suorakulmio ei vielä ole toimiva painike. [F1, F3]

Frontendin tiedostot toimitetaan käyttäjän selaimeen. Käyttäjä voi tutkia ja muuttaa omassa selaimessaan näkyvää sivua. Siksi käyttöoikeuksia tai salaisuuksia ei voi suojata vain frontendin koodilla. Palvelimen on tarkistettava esimerkiksi projektin omistajuus jokaisessa sitä koskevassa pyynnössä. Tehtävätaulun konkreettiset tarkistukset tehdään backend-luvussa.

#### Miksi frontendissä on JavaScriptiä, vaikka kurssi käyttää TypeScriptiä?

Kurssin backend rakennetaan Denolla ja TypeScriptillä. Tässä ensimmäisessä frontendissä käytetään suoraan selaimen suorittamaa JavaScriptiä, jotta voit ensin nähdä, miten selain toimii. TypeScriptin tyyppimerkintöjä ei kopioida sellaisinaan `app.js`-tiedostoon. Valmiissa frontend-esimerkissä ei tarvita erillistä käännös- tai paketointityökalua. Myöhemmin voit valita myös TypeScriptillä rakennettavan frontendin, kun selität sen käännösvaiheen. HTML:n, CSS:n, DOMin ja HTTP:n perusteet säilyvät samoina. [F1, F20]

### 3.2 Työtapa: tiedosto, tallennus ja selaimen päivitys

**Tekstieditori** on ohjelma, jolla muokkaat lähdekoodia. **Lähdekoodi** on ihmiselle kirjoitettu ohjelman tai sivun kuvaus. **Tiedosto** on nimetty tallennettu sisältö. **Kansio** ryhmittelee tiedostoja. **Tiedostopääte** on nimen lopussa oleva osa, esimerkiksi `.html`, `.css` tai `.js`.

Tee ensimmäinen kokeilu näin:

1. Luo omaan harjoituskansioosi uusi kansio nimeltä `frontend-kokeilut`.
2. Avaa tämä kansio käyttämässäsi tekstieditorissa.
3. Luo ensimmäinen tiedosto nimeltä `01-ensimmainen-sivu.html`.
4. Kopioi seuraavan kohdan koodilohkon **sisältö kokonaan** tiedostoon. Älä kopioi koodilohkoa ympäröiviä kolmea heittomerkin näköistä takamerkkiä tai kielen nimeä.
5. Tallenna tiedosto editorin Tallenna-toiminnolla. Tavallinen pikanäppäin on `Ctrl+S`, macOS:ssa `⌘+S`.
6. Avaa tiedosto selaimessa esimerkiksi tiedostonhallinnan Avaa sovelluksella -toiminnolla. Osoiterivillä voi nyt lukea `file:///.../01-ensimmainen-sivu.html`.
7. Muuta otsikon tekstiä editorissa, tallenna ja lataa selaimen sivu uudelleen.

Jos editorissa on tallentamattoman muutoksen merkki, selain näkee edelleen edellisen tallennetun version. Jos käyttöjärjestelmä piilottaa tiedostopäätteet, tarkista, ettei nimi vahingossa ole `01-ensimmainen-sivu.html.txt`.

**Tässä luvussa pienet paikalliset kokeilut ja `esimerkit/02-frontend/index.html` toimivat tiedosto-osoitteella, koska ne eivät tee verkkopyyntöjä.** Tietokantaa ja kirjautumista käyttävä valmis sovellus avataan aina osoitteesta **`http://localhost:8000`**. Siihen palataan kohdassa 3.13. Älä avaa valmiin sovelluksen `public/index.html`-tiedostoa suoraan tiedostona.

#### Kommentti on ihmiselle kirjoitettu selitys

HTML-kommentti alkaa merkeillä `<!--` ja päättyy merkkeihin `-->`. CSS-kommentti alkaa `/*` ja päättyy `*/`. JavaScriptissä `//` aloittaa loppurivin kommentin. Kommentit auttavat lukemaan koodia; niitä ei suoriteta ohjelman käskyinä. Niitä ei myöskään käytetä salaisuuksien piilottamiseen. [F4]

### 3.3 Kokeilu 1: kokonainen HTML-sivu

**Tavoite:** näet eron välilehden otsikon, sivun pääotsikon ja tavallisen tekstin välillä.

Tallenna tämä koko sisältö tiedostoon `01-ensimmainen-sivu.html`:

```html
<!-- DOCTYPE valitsee nykyisen HTML:n käsittelytavan. -->
<!doctype html>
<!-- html ympäröi sivun; lang kertoo tekstin olevan suomea. -->
<html lang="fi">
  <!-- head sisältää selaimen tarvitsemat asetukset. -->
  <head>
    <!-- UTF-8 saa ä- ja ö-kirjaimet näkymään oikein. -->
    <meta charset="utf-8">
    <!-- viewport sovittaa sivun laitteen leveyteen. -->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- title näkyy selaimen välilehdessä. -->
    <title>Ensimmäinen harjoitukseni</title>
  </head>
  <!-- body sisältää käyttäjälle näkyvän sivun. -->
  <body>
    <!-- main kertoo, mikä alue on sivun pääsisältö. -->
    <main>
      <!-- h1 on koko sivun pääotsikko. -->
      <h1>Minun tehtävätauluni</h1>
      <!-- p muodostaa yhden tekstikappaleen. -->
      <p>Tässä harjoituksessa opin tekemään verkkosivun.</p>
      <!-- h2 aloittaa pääotsikon alaisen sisältöalueen. -->
      <h2>Tämän päivän tavoite</h2>
      <!-- Tämä p on toinen tekstikappale. -->
      <p>Osaan tallentaa HTML-tiedoston ja avata sen selaimessa.</p>
    </main>
  </body>
</html>
```

**Odotettu tulos:** välilehdessä lukee ”Ensimmäinen harjoitukseni”. Sivulla näkyvät pääotsikko, kaksi tekstikappaletta ja alaotsikko. Sivu toimii ilman JavaScriptiä ja ilman Denon käynnistämistä.

**Tarkista itse:** muuta vain `title`-elementin tekstiä. Tallenna ja päivitä. Sivun suuri otsikko ei muutu, koska se kuuluu `h1`-elementtiin. Muuta sen jälkeen `h1`:n tekstiä ja kokeile uudelleen.

**Tavallinen virhe:** selain näyttää koko koodin tekstinä. Tarkista tiedostopääte ja että avasit tiedoston selaimessa. Jos vain ä-kirjain näyttää oudolta, tarkista UTF-8-tallennus ja `charset`-rivi.

#### Elementti, tagi ja attribuutti

**Elementti** on HTML:n sisältöosa, esimerkiksi otsikko. `h1`-elementin alkutagi on `<h1>` ja lopputagi `</h1>`. Niiden välissä on otsikon teksti. **Tagi** on kulmasulkeiden sisällä oleva merkintä. Kaikilla elementeillä ei ole lopputagia: esimerkiksi `meta` ja `input` ovat tyhjiä elementtejä, joihin tieto annetaan attribuuteilla. [F5]

**Attribuutti** antaa elementille lisätiedon. Merkinnässä `<html lang="fi">` attribuutin nimi on `lang` ja arvo `fi`. Arvo kirjoitetaan lainausmerkkien sisään. **Semanttinen HTML** tarkoittaa, että elementti valitaan sisällön tarkoituksen perusteella. Otsikko merkitään otsikoksi, lista listaksi ja toiminto painikkeeksi. Tällöin myös avustava teknologia voi tunnistaa rakenteen. [F5, F11]

| Merkintä | Merkitys aloittelijalle |
|---|---|
| `h1`, `h2`, `h3` | Otsikon taso. Suurempi numero on alemman tason otsikko, ei vain pienemmän fontin valinta. |
| `p` | Yksi tekstikappale. |
| `main` | Sivun varsinainen pääsisältö. |
| `section` | Otsikon ympärille koottu sisältöalue. |
| `ul` ja `li` | Järjestämätön lista ja yksi sen kohta. |
| `a` ja `href` | Linkki ja osoite, johon linkki vie. |
| `button` | Käynnistettävä toiminto, jota voi käyttää myös näppäimistöllä. |
| `id` | Elementin yksilöllinen tunniste tällä sivulla. Sama id ei kuulu kahteen elementtiin. |
| `class` | Yhteisen tyylin tai ryhmän nimi. Samaa luokkaa voi käyttää monessa elementissä. |

### 3.4 Kokeilu 2: CSS muuttaa ulkoasua

**Tavoite:** opit yhdistämään kaksi tiedostoa ja lukemaan yksinkertaisen tyylisäännön.

Luo `frontend-kokeilut`-kansioon alikansio `02-tyylit`. Luo sen sisään tiedostot `index.html` ja `styles.css`. Tallenna seuraavat sisällöt kokonaisina. Tiedostojen täytyy olla **samassa kansiossa**.

`index.html`:

```html
<!-- Nykyisen HTML:n asiakirja. -->
<!doctype html>
<!-- Sivun kieli on suomi. -->
<html lang="fi">
  <!-- Sivun asetusten alku. -->
  <head>
    <!-- UTF-8 määrittää tekstin merkistön. -->
    <meta charset="utf-8">
    <!-- Näkymän leveys seuraa laitteen leveyttä. -->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Välilehden nimi. -->
    <title>CSS-kokeilu</title>
    <!-- rel kertoo tyylitiedostosta; href löytää saman kansion styles.css:n. -->
    <link rel="stylesheet" href="styles.css">
  </head>
  <!-- Käyttäjälle näkyvä sisältö alkaa. -->
  <body>
    <!-- main on sivun pääsisältö. -->
    <main>
      <!-- h1 on pääotsikko. -->
      <h1>Tehtävätaulun ulkoasu</h1>
      <!-- p on tekstikappale; class yhdistää sen CSS:n kortti-luokkaan. -->
      <p class="kortti">Tämä teksti on valkoisella kortilla.</p>
    </main>
  </body>
</html>
```

`styles.css`:

```css
/* body valitsee sivun näkyvän sisällön juurielementin. */
body {
  /* Käytetään laitteesta löytyvää selkeää kirjasinta. */
  font-family: system-ui, sans-serif;
  /* Riviväli on 1,6 kertaa kirjasimen koko. */
  line-height: 1.6;
  /* Tumma teksti erottuu vaaleasta taustasta. */
  color: #172b3a;
  /* Tausta on vaalea siniharmaa. */
  background: #f4f7fa;
  /* Sisältö saa yhden peruskirjasinkoon verran tilaa reunoille. */
  padding: 1rem;
}

/* main valitsee pääsisällön alueen. */
main {
  /* Rivistä ei tehdä hyvin pitkää edes suurella näytöllä. */
  max-width: 44rem;
  /* Automaattiset sivumarginaalit keskittävät alueen. */
  margin-inline: auto;
}

/* Piste valitsee kaikki elementit, joilla on class="kortti". */
.kortti {
  /* Kortin tausta on valkoinen. */
  background: #ffffff;
  /* Reuna on yhden pikselin yhtenäinen tumma viiva. */
  border: 1px solid #586577;
  /* Padding jättää tilaa sisällön ja reunuksen väliin. */
  padding: 1rem;
}
```

**Odotettu tulos:** sivun tausta on vaalea, teksti tummaa ja tekstikappale valkoisen reunustetun kortin sisällä.

**Tarkista itse:** muuta kortin `padding` arvosta `1rem` arvoon `2rem`. Kortin sisälle tulee enemmän tilaa. Tallenna CSS ja päivitä selain. Kavenna sitten selainikkunaa: tekstin pitää rivittyä, eikä kiinteä leveys saa pakottaa sitä näkymän ulkopuolelle.

**Tavallinen virhe:** tyylit eivät vaikuta. Varmista, että nimi on täsmälleen `styles.css`, `href` sisältää saman nimen ja tiedosto on tallennettu HTML:n kanssa samaan kansioon. Tarkista myös, että CSS on CSS-tiedostossa eikä tavallisena tekstinä HTML:n `body`-osassa.

#### Miten CSS-sääntö luetaan?

**Valitsin** kertoo, mihin elementtiin sääntö kohdistuu. `body` valitsee elementin nimen perusteella, `.kortti` luokan perusteella ja `#status` id:n perusteella. Aaltosulkeiden sisällä ovat **ominaisuudet** ja niiden **arvot**. Rivillä `color: #172b3a;` ominaisuus on `color`, kaksoispiste erottaa arvon ja puolipiste päättää määrityksen. [F3]

`margin` tarkoittaa elementin ulkopuolista tyhjää tilaa. `padding` on elementin sisäpuolinen tila. `border` on reunus niiden välissä. `rem` perustuu sivun juurielementin kirjasinkokoon, ja `%` on suhteellinen osuus. Tavallisissa tekstisivuissa joustavat leveydet helpottavat näkymän käyttöä eri kokoisilla näytöillä. [F3, F12]

### 3.5 Kokeilu 3: painike ja JavaScript

**Tavoite:** yksi käyttäjän toiminto muuttaa yhden tekstin.

Luo uusi alikansio `03-painike`. Luo sinne `index.html` ja `app.js`. Tässä pienessä kokeilussa selaimen oletustyylit riittävät; aiemman kokeilun tiedostoja ei muuteta.

`index.html`:

```html
<!-- Valitaan nykyinen HTML. -->
<!doctype html>
<!-- Sivun kieli on suomi. -->
<html lang="fi">
  <!-- Asetusten alku. -->
  <head>
    <!-- Merkistö on UTF-8. -->
    <meta charset="utf-8">
    <!-- Näkymä sovitetaan laitteen leveyteen. -->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Nimi selaimen välilehdelle. -->
    <title>Painikekokeilu</title>
    <!-- src löytää ohjelman; defer odottaa sivun rakenteen valmistumista. -->
    <script src="app.js" defer></script>
  </head>
  <!-- Näkyvän sivun alku. -->
  <body>
    <!-- main sisältää pääsisällön. -->
    <main>
      <!-- h1 nimeää koko kokeilun. -->
      <h1>Ensimmäinen toiminto</h1>
      <!-- id yhdistää painikkeen ohjelmaan; type tekee tavallisen toimintopainikkeen. -->
      <button id="tervehdys" type="button">Näytä tervehdys</button>
      <!-- id löytyy ohjelmasta; role ilmoittaa muuttuvan tekstin ruudunlukijalle. -->
      <p id="viesti" role="status">Odota painikkeen painamista.</p>
    </main>
  </body>
</html>
```

`app.js`:

```javascript
// Etsitään sivulta id="tervehdys" ja annetaan viittaukselle nimi painike.
const painike = document.querySelector("#tervehdys");
// Etsitään kappale, jonka tekstiä haluamme vaihtaa.
const viesti = document.querySelector("#viesti");

// Funktion sisällä oleva koodi suoritetaan vasta kun funktiota kutsutaan.
function tervehdi() {
  // Kirjoitetaan kappaleeseen uusi teksti turvallisesti tekstinä.
  viesti.textContent = "Hei! Painike ja JavaScript toimivat.";
}

// Click-tapahtuman tullessa selain kutsuu tervehdi-funktiota.
painike.addEventListener("click", tervehdi);
```

**Odotettu tulos:** painaminen muuttaa kappaleen tekstiä. Tallenna molemmat tiedostot ennen kokeilemista.

**Tarkista itse:** paina `Tab`, kunnes painike saa näkyvän kohdistuksen. Paina `Enter` tai välilyönti. Toiminnon pitää onnistua ilman hiirtä. Muuta tervehdystekstiä, tallenna ja päivitä selain.

**Tavallinen virhe:** konsolissa lukee esimerkiksi, ettei `null`-arvolta voi lukea ominaisuutta. Tavallisesti `querySelector` ei löytänyt elementtiä: id on kirjoitettu eri tavalla tai skripti suoritettiin ennen elementin syntymistä. Tarkista `#tervehdys`, HTML:n `id="tervehdys"` ja `defer`.

#### DOM on selaimen muistissa oleva sivurakenne

Kun selain lukee HTML:n, se muodostaa siitä muistissa rakenteen nimeltä **DOM**, Document Object Model. Sen kautta ohjelma voi etsiä elementtejä, lukea niiden sisältöjä ja muuttaa sivua. `document` viittaa tähän dokumenttiin. `querySelector` etsii ensimmäisen annetun CSS-valitsimen täyttävän elementin. [F6]

DOMin muuttaminen ei muuta editorissa olevaa HTML-tiedostoa. Tässä kokeilussa `textContent` muutti selaimen tämänhetkistä näkymää. Kun lataat sivun uudelleen, selain lukee alkuperäisen tiedoston uudelleen.

**Tapahtuma** on selaimen ilmoitus siitä, että jotakin tapahtui. Esimerkkejä ovat `click`, `submit` ja `change`. **Tapahtumankuuntelija** liittää tapahtumaan suoritettavan funktion. `addEventListener("click", tervehdi)` sanoo: ”kun tästä painikkeesta tulee click-tapahtuma, suorita tervehdi”. Tavallisen HTML-painikkeen aktivointi näppäimistöllä voi käynnistää saman toiminnon. [F7, F11]

Viimeisellä rivillä lukee `tervehdi`, ilman sulkeita. Se antaa kuuntelijalle funktion myöhemmin kutsuttavaksi. `tervehdi()` kutsuisi funktiota heti kyseisellä rivillä. Tätä eroa kannattaa kokeilla kopiossa ja palauttaa toimiva versio sen jälkeen.

### 3.6 JavaScriptin merkit ja sanat ennen suurempaa esimerkkiä

Ohjelmassa on **arvoja**, kuten nimi, numero tai totuusarvo. **Muuttuja** antaa arvolle nimen. **Funktio** ryhmittelee suoritettavia käskyjä. **Parametri** on funktion vastaanottaman arvon nimi. **Paluuarvo** on funktion `return`-käskyllä takaisin antama tulos. Seuraava taulukko avaa harjoituksissa käytetyn perussyntaksin. [F4, F21, F24]

| Merkintä | Mitä se tarkoittaa? | Missä näet sen? |
|---|---|---|
| `const nimi = ...` | Nimetään arvo. Samaa muuttujanimeä ei tämän jälkeen aseteta viittaamaan kokonaan uuteen arvoon. | Viittaus sivun lomakkeeseen. |
| `let maara = 0` | Nimetään arvo, jonka voi myöhemmin korvata uudella arvolla. | Seuraavan tehtävän numerotunniste. |
| `"teksti"` | Merkkijono eli tekstiä sisältävä arvo. | Tehtävän nimi tai tilaviesti. |
| `15` | Numero. | Tehtävän tunniste tai sallittu minimipituus. |
| `true`, `false` | Totuusarvot, suomeksi tosi ja epätosi. | Onko tehtävä valmis? |
| `null` | Tarkoituksella puuttuva arvo. | Projektia ei ole vielä valittu. |
| `undefined` | Arvoa ei ole annettu tai löydetty. | `find` ei löytänyt projektia. |
| `=` | Asetetaan arvo. | `task.done = true`. |
| `===` | Verrataan, ovatko arvo ja tietotyyppi samat. | Onko projektin id valittu id? |
| `!==` | Verrataan, ovatko arvot tai tyypit erilaiset. | Säilytetään muut kuin poistettava tehtävä. |
| `!arvo` | Käännetään totuusarvo vastakkaiseksi. | Valmis muuttuu keskeneräiseksi. |
| `[]` | Taulukko eli järjestyksessä oleva joukko arvoja. | Tehtävälista muistissa. |
| `{ title: "Lue", done: false }` | Olio eli nimettyjen ominaisuuksien kokonaisuus. | Yksi tehtävä. |
| `task.title` | Luetaan olion ominaisuus pisteen oikealta puolelta. | Tehtävän nimi. |
| `funktio(arvo)` | Kutsutaan funktiota ja annetaan sille arvo. | Näytä tilaviesti. |
| `() => { ... }` | Lyhyt tapa kirjoittaa funktio; lohkoa ei suoriteta ennen kutsua. | Tapahtumankuuntelija. |
| `if (ehto)` | Suoritetaan seuraava lohko vain ehdon ollessa tosi. | Tyhjän nimen tarkistus. |
| `ehto ? a : b` | Valitaan arvo `a`, jos ehto on tosi, muuten `b`. | Teksti ”valmis” tai ”kesken”. |
| `arvo ?? ""` | Käytetään oikean puolen arvoa vain, jos vasen on `null` tai `undefined`. | Puuttuvan lomakearvon korvaaminen tyhjällä tekstillä. |
| `return` | Lopetetaan funktio ja voidaan antaa tulos takaisin. | Keskeytetään virheellinen lomakkeen käsittely. |

`const` ei jäädytä olion tai taulukon sisältöä. Esimerkiksi `const task = { done: false }` sallii myöhemmin `task.done = true`, koska muuttuja viittaa yhä samaan olioon. Tämä erottaa muuttujan uudelleen asettamisen sen sisältämän olion muuttamisesta. [F21]

Valmiissa esimerkissä näet myös takamerkkien sisällä kirjoitettua tekstiä, esimerkiksi `` `Tehtäviä ${tasks.length}.` ``. Tätä kutsutaan **mallimerkkijonoksi**. `${...}` sijoittaa lasketun arvon tekstin keskelle. Se ei itsessään suojaa sisältöä: turvallinen tekstitulostus tehdään edelleen `textContent`-ominaisuudella. [F23, F14]

### 3.7 Kokeilu 4: lomake lukee käyttäjän tekstin

**Tavoite:** opit nimeämään kentän, estämään tahattoman sivunvaihdon ja näyttämään käyttäjän tekstin.

Luo alikansio `04-lomake` ja sen sisään `index.html` ja `app.js`. Kirjoita seuraavat täydelliset tiedostot.

`index.html`:

```html
<!-- Nykyisen HTML:n asiakirja. -->
<!doctype html>
<!-- lang kertoo sivun kielen. -->
<html lang="fi">
  <!-- Selaimen asetukset alkavat. -->
  <head>
    <!-- Merkistö tukee suomen kirjaimia. -->
    <meta charset="utf-8">
    <!-- Sivun leveys sovitetaan laitteen näkymään. -->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Välilehden otsikko. -->
    <title>Lomakekokeilu</title>
    <!-- src löytää ohjelman; defer odottaa HTML:n valmistumista. -->
    <script src="app.js" defer></script>
  </head>
  <!-- Sivulla näkyvä sisältö alkaa. -->
  <body>
    <!-- main nimeää sivun pääsisällön alueen. -->
    <main>
      <!-- h1 on sivun pääotsikko. -->
      <h1>Nimeä seuraava tehtävä</h1>
      <!-- form kokoaa lomakkeen; id antaa sille tunnisteen ohjelmaa varten. -->
      <form id="lomake">
        <!-- label näkyy koko ajan; for yhdistää nimen oikeaan kenttään. -->
        <label for="tehtava">Tehtävän nimi (pakollinen)</label>
        <!-- id yhdistää labelin; name nimeää tiedon; text on kenttätyyppi. -->
        <!-- required tekee kentästä pakollisen; maxlength rajaa pituuden. -->
        <input id="tehtava" name="title" type="text" required maxlength="200">
        <!-- submit lähettää lomakkeen myös kentästä Enteriä painettaessa. -->
        <button type="submit">Näytä tehtävä</button>
      </form>
      <!-- id löytyy koodista; role ilmoittaa tekstin muutokset rauhallisesti. -->
      <p id="tulos" role="status">Et ole vielä antanut tehtävää.</p>
      <!-- role="alert" ilmoittaa virheen heti; alue on jo valmiina DOMissa. -->
      <p id="virhe" role="alert"></p>
    </main>
  </body>
</html>
```

`app.js`:

```javascript
// Etsitään lomake sen id:n avulla.
const lomake = document.querySelector("#lomake");
// Etsitään tekstikenttä, jonka value sisältää kirjoitetun tekstin.
const kentta = document.querySelector("#tehtava");
// Etsitään onnistuneen tuloksen näyttöpaikka.
const tulos = document.querySelector("#tulos");
// Etsitään virheiden näyttöpaikka.
const virhe = document.querySelector("#virhe");

// Submit syntyy lomakkeen lähettämisestä painikkeella tai Enterillä.
lomake.addEventListener("submit", (event) => {
  // Estetään oletuslähetys, jotta selain pysyy tällä sivulla.
  event.preventDefault();
  // Luetaan kentän teksti ja poistetaan alun sekä lopun välilyönnit.
  const nimi = kentta.value.trim();
  // Length kertoo merkkijonon pituuden; nolla tarkoittaa tyhjää tekstiä.
  if (nimi.length === 0) {
    // Kerrotaan täsmällinen virhe tekstinä.
    virhe.textContent = "Kirjoita tehtävän nimi. Pelkät välilyönnit eivät riitä.";
    // Palautetaan kohdistus korjattavaan kenttään.
    kentta.focus();
    // Lopetetaan käsittely ennen onnistumisviestiä.
    return;
  }
  // Poistetaan edellisen yrityksen virhe.
  virhe.textContent = "";
  // Käyttäjän kirjoitus lisätään tekstinä, ei HTML-koodina.
  tulos.textContent = `Seuraava tehtäväsi: ${nimi}`;
});
```

**Odotettu tulos:** kirjoita ”Lue backendin perusteet” ja paina Enter. Teksti ilmestyy sivulle eikä sivu lataudu uudelleen.

**Tarkista itse:** lähetä tyhjä kenttä. Selain pyytää täyttämään sen. Lähetä sitten pelkkiä välilyöntejä: ohjelman oma tekstivirhe tulee näkyviin. Korjaa nimi ja lähetä uudelleen: virhe poistuu. Napsauta näkyvää label-tekstiä: kohdistuksen pitää mennä kenttään. [F8]

**Tavallinen virhe:** toiminto välähtää ja sivu palautuu alkuun. Tarkista `event.preventDefault()`. Toinen tavallinen virhe on käyttää vain painikkeen `click`-kuuntelijaa ja unohtaa lomake: tämän vuoksi kuuntelemme `form`-elementin `submit`-tapahtumaa.

#### `id`, `name` ja näkyvä nimi ovat eri asioita

`id="tehtava"` yksilöi elementin sivulla ja yhdistää sen labeliin. `name="title"` antaa kentän tiedolle nimen lomakkeen sisällä. Näkyvä label ”Tehtävän nimi” kertoo ihmiselle, mitä pitää kirjoittaa. Kaikilla kolmella on oma tehtävänsä. `placeholder`-vihje kentän sisällä ei korvaa pysyvää labelia: vihje katoaa kirjoitettaessa. [F8]

Valmis sovellus lukee osan lomakkeista `FormData`-oliolla. `new FormData(lomake)` kokoaa kenttien arvot `name`-nimien perusteella. Se **ei vielä lähetä niitä verkkoon**. Lähetys tehdään erikseen `fetch`-kutsulla. `disabled`-tilassa olevat kentät jäävät FormDatan ulkopuolelle, joten arvot kerätään ennen lomakkeen asettamista odotustilaan. Tätä järjestystä on kommentoitu valmiissa `app.js`:ssä. [F13]

#### Miksi `textContent` on tärkeä?

Syötä tehtävän nimeksi teksti `<strong>Hei</strong>`. Tämän luvun esimerkeissä sen pitää näkyä kulmasulkeineen tavallisena tekstinä. `textContent` ei tulkitse merkkijonoa HTML-merkintänä. Käyttäjän tekstin sijoittaminen `innerHTML`-ominaisuuteen voi sen sijaan avata tien selaimessa suoritettavaan haitalliseen koodiin eli XSS-haavoittuvuuteen. [F14]

Tämä ei poista palvelimen validoinnin tarvetta. **Validointi** on syötteen tarkistamista sovittuja sääntöjä vastaan: esimerkiksi onko nimi olemassa ja pysyykö se pituusrajan sisällä. Frontendin validointi auttaa käyttäjää huomaamaan virheen nopeasti. Backendin validointi suojaa sovelluksen tallentamaa tietoa myös silloin, kun pyyntö tulee muualta kuin omalta lomakkeeltamme.

### 3.8 Kokeilu 5: olio, taulukko ja näkyvä lista

**Tavoite:** opit erottamaan muistissa olevan tiedon sivulla olevasta HTML-elementistä.

Luo alikansio `05-lista` ja sen sisään `index.html` ja `app.js`. Tällä kertaa ohjelmaan kirjoitetaan kaksi harjoitustehtävää valmiiksi.

`index.html`:

```html
<!-- Nykyinen HTML. -->
<!doctype html>
<!-- Asiakirjan kieli on suomi. -->
<html lang="fi">
  <!-- Asetusten alku. -->
  <head>
    <!-- Suomen kirjaimia tukeva merkistö. -->
    <meta charset="utf-8">
    <!-- Leveys seuraa laitteen näkymää. -->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Selaimen välilehdessä näkyvä nimi. -->
    <title>Taulukosta listaksi</title>
    <!-- Ohjelma haetaan samasta kansiosta ja ajetaan HTML:n jälkeen. -->
    <script src="app.js" defer></script>
  </head>
  <!-- Näkyvä sisältö alkaa. -->
  <body>
    <!-- main on sivun pääsisältö. -->
    <main>
      <!-- h1 nimeää harjoituksen. -->
      <h1>Tehtävät ohjelman muistista</h1>
      <!-- ul on järjestämätön lista; id auttaa ohjelmaa löytämään sen. -->
      <ul id="lista"></ul>
    </main>
  </body>
</html>
```

`app.js`:

```javascript
// Taulukon sisällä on kaksi oliota; jokainen olio kuvaa yhtä tehtävää.
const tehtavat = [
  // Id erottaa tehtävän; title on nimi; done on valmiudesta kertova totuusarvo.
  { id: 1, title: "Avaa HTML-tiedosto", done: true },
  // Toisella tehtävällä on oma id, nimi ja tila.
  { id: 2, title: "Kokeile lomaketta", done: false },
];
// Etsitään HTML:n tyhjä ul-elementti.
const lista = document.querySelector("#lista");

// Funktio tekee ohjelman tiedoista näkyviä elementtejä.
function piirra() {
  // Poistetaan mahdollinen edellinen sisältö, jotta rivejä ei tule kahteen kertaan.
  lista.replaceChildren();
  // Käydään kaikki taulukon tehtävät läpi yksi kerrallaan.
  for (const tehtava of tehtavat) {
    // Luodaan yksi li-elementti; sitä ei vielä ole liitetty näkyvälle sivulle.
    const rivi = document.createElement("li");
    // Tila kerrotaan sanoin; käyttäjän nimi kirjoitetaan turvallisesti tekstinä.
    rivi.textContent = `${tehtava.title}: ${tehtava.done ? "valmis" : "kesken"}`;
    // Append liittää uuden rivin ul-elementtiin, jolloin selain näyttää sen.
    lista.append(rivi);
  }
}

// Kutsutaan funktiota, jotta lista piirretään sivun avaamisen yhteydessä.
piirra();
```

**Odotettu tulos:** kaksi tehtävää näkyy luettelona. Ensimmäisessä lukee ”valmis”, toisessa ”kesken”.

**Tarkista itse:** muuta toisen tehtävän `done` arvoksi `true`, tallenna ja päivitä. Lisää taulukkoon kolmas olio uudella id:llä. Muista pilkku olioiden välissä. Kokeile myös tyhjää taulukkoa: poista vain oliorivit, mutta säilytä `[]`. Sivun lista on silloin tyhjä.

**Tavallinen virhe:** näet tiedot JavaScriptissä, mutta et sivulla. Tarkista, että lopussa kutsutaan `piirra()`. Funktion määrittely kertoo, miten toiminto tehdään; kutsu käynnistää sen. Jos sama lista toistuu moneen kertaan, tarkista `replaceChildren()`.

**Olio** `tehtava` ja **elementti** `rivi` ovat eri asioita. Olio kuvaa sovelluksen tietoa. Elementti on yksi tapa esittää se käyttäjälle. Funktiota, joka päivittää näkymän tiedoista, kutsutaan usein nimellä `render`. Tässä käytimme suomenkielistä nimeä `piirra`. Nimi ei ole JavaScriptin taikasana; me päätimme sen itse. DOMin elementtejä luodaan ja liitetään dokumenttiin selaimen rajapinnan kautta. [F6]

Valmiissa esimerkissä näet seuraavat taulukon käsittelytavat. Niiden viralliset kuvaukset löytyvät JavaScriptin Array-viitteestä. [F22]

| Toiminto | Mitä se tekee tehtävälistassa? |
|---|---|
| `push` | Lisää uuden tehtävän taulukon loppuun. |
| `find` | Hakee ensimmäisen ehdon täyttävän projektin, esimerkiksi tietyn id:n. |
| `filter` | Tekee uuden taulukon vain ehdon täyttävistä arvoista. Näin poistettu tehtävä jätetään listasta pois. |
| `map` | Tekee uuden taulukon muuttamalla jokaisen arvon annetun funktion avulla. Näin juuri palvelimella muokattu tehtävä korvataan uudella tiedolla. |
| `for...of` | Toistaa toiminnon jokaiselle arvolle. Näin listan HTML-rivit rakennetaan. |
| `length` | Kertoo, montako arvoa taulukossa on. Sen avulla tunnistetaan tyhjä lista. |

### 3.9 Seuraa mukana: kolmen tiedoston muistissa toimiva Tehtävätaulu

Nyt käytät mukana toimitettua kokonaisuutta **`esimerkit/02-frontend/`**. Se sisältää kolme tiedostoa: `index.html`, `styles.css` ja `app.js`. Jokainen HTML-elementti, attribuutti, CSS-sääntö ja JavaScriptin toiminnallinen rivi on kommentoitu suomeksi. Myös sulkeiden ryhmittelyä ja rivien tarkoitusta selitetään lähellä koodia.

Tämä vaihe yhdistää lisäämisen, lukemisen, muokkaamisen ja poistamisen. Näistä käytetään lyhennettä **CRUD**: Create, Read, Update ja Delete. Siinä ei vielä ole kirjautumista, oikeaa tallennusta, tietokantaa tai HTTP-pyyntöjä. Tiedot elävät vain tämän yhden välilehden muistissa.

#### Vaihe A: varmista, että oikea kokonaisuus on auki

1. Kopioi koko `esimerkit/02-frontend` omaan harjoituskansioosi.
2. Avaa kopion kansio editorissa. Varmista, että sen sisällä näkyvät kaikki kolme tiedostoa.
3. Avaa kopion `index.html` selaimessa. Tässä vaiheessa `file:///...`-osoite on tarkoituksellinen.
4. Lue sivun alun teksti: sen tulee kertoa, että tiedot ovat vain selaimen muistissa.

**Odotettu tulos:** näet otsikon, uuden tehtävän kentän, painikkeen ja tyhjän listan ohjeen.

**Tarkistus:** avaa `index.html` editorissa ja etsi rivit `href="styles.css"` ja `src="app.js"`. Näet, miten HTML yhdistää kaksi muuta tiedostoa.

**Tavallinen virhe:** HTML on kopioitu, mutta CSS ja JavaScript jäivät toiseen kansioon. Kopioi kaikki kolme samaan kansioon. Kirjautumislomake puolestaan tarkoittaa, että avasit vahingossa myöhemmän vaiheen tiedoston.

#### Vaihe B: lisää ja lue kaksi tehtävää

1. Kirjoita ”Lue HTML:n otsikkotasot” ja paina Enter.
2. Kirjoita ”Kokeile sovellusta ilman hiirtä” ja paina Enter.
3. Tarkista, että molemmat näkyvät ja kummankin kohdalla lukee ”kesken”.
4. Etsi `app.js`:stä `tasks.push`. Lue sitä edeltävä kommentti ja katso, mitä `id`, `title` ja `done` saavat arvoikseen.

**Odotettu tulos:** kaksi erillistä tehtävää ja onnistumisviesti. Kenttä tyhjenee lisäyksen jälkeen ja saa kohdistuksen takaisin seuraavaa nimeä varten.

**Tarkistus:** listassa on kaksi tehtävää, vaikka antaisit niille saman nimen. Id erottaa tehtävät; nimi ei ole tunniste.

**Tavallinen virhe:** selain lataa sivun Enteristä ja lista katoaa. Tarkista, ettei `event.preventDefault()` ole poistunut lomakkeen kuuntelijasta.

#### Vaihe C: vaihda tila, nimeä uudelleen ja poista

1. Merkitse ensimmäinen tehtävä valmiiksi. Sen näkyvä tila muuttuu sanaksi ”valmis”.
2. Vaihda tila takaisin keskeneräiseksi.
3. Muuta toisen tehtävän nimikentän tekstiä ja paina ”Tallenna nimi”.
4. Poista ensimmäinen tehtävä. Peruuta ensin vahvistus ja varmista, että tehtävä säilyy. Tee poisto uudelleen ja vahvista se.
5. Poista jäljelle jäävä tehtävä. Sivun pitää kertoa, että lista on nyt tyhjä.

**Odotettu tulos:** nimimuutos koskee oikeaa tehtävää. Poiston jälkeen kohdistus palaa olemassa olevaan kenttään eikä jää poistettuun painikkeeseen.

**Tarkistus:** etsi ohjelmasta `task.done = !task.done`, `task.title = newTitle` ja `tasks.filter`. Selitä parille kunkin rivin vaikutus. Lue selitys kommentista, jos et vielä muista syntaksia.

**Tavallinen virhe:** vaihdat muuttujan arvon, mutta teksti ei päivity. Tarkista `render()`-kutsu. Selaimen näkyvä DOM ei automaattisesti muutu vain siksi, että JavaScriptin tavallisen olion ominaisuus muuttui.

#### Vaihe D: huomaa tallennuksen puuttuminen

1. Lisää yksi tehtävä.
2. Päivitä sivu selaimen latauspainikkeella.
3. Tarkista, että lista on tyhjä.
4. Avaa sama tiedosto toiseen välilehteen: sillä on oma tyhjä muistinsa.

**Odotettu tulos:** tiedot katoavat. Tämä on tämän harjoitusvaiheen tarkoituksellinen ominaisuus, joka perustuu muuttujien säilyttämiseen vain välilehden muistissa.

**Pysähdy selittämään:** ”Näin tehtävän ruudulla” ei vielä tarkoita ”tehtävä tallentui tietokantaan”. Backend- ja tietokantavaiheessa tallennus tehdään palvelimelle, ja haemme samat tiedot takaisin sivun lataamisen jälkeen.

### 3.10 Verkkopyyntö, JSON ja selaimen sekä palvelimen sopimus

**HTTP** on selaimen ja verkkopalvelimen viestintään käytettävä protokolla eli yhteisten viestisääntöjen kokonaisuus. **URL** on resurssin osoite. Tehtävätaulun `/api/projects` tarkoittaa projektikokoelman osoitetta. Sen edessä oleva alkuperä on tässä `http://localhost:8000`. [F2, F9]

**Origin** eli alkuperä muodostuu protokollasta, palvelinnimestä ja portista. Tässä alkuperä on `http` + `localhost` + `8000`. **Portti** erottaa koneessa kuuntelevan verkkopalvelun. `http://127.0.0.1:8000` ja `http://localhost:8000` eivät ole sama origin, vaikka ne tässä osoittavat omaan koneeseen. [F15]

Kurssin valmis palvelin odottaa kirjoittavien pyyntöjen alkuperäksi täsmälleen `http://localhost:8000`. Se ei salli kirjoituksia mielivaltaisista alkuperistä. Käytä siksi juuri tätä osoitetta ja poista käytöstä mahdollinen toisen portin frontend-kehityspalvelin tätä esimerkkiä seuratessasi.

**JSON** on tekstimuotoinen tiedonesitystapa. JavaScriptin olio on ohjelman muistissa oleva arvo; JSON on tekstiä, jota voidaan siirtää verkossa. `JSON.stringify` muuttaa sopivan JavaScript-arvon JSON-tekstiksi. Vastauksen `json()` lukee JSON-tekstin ja muodostaa siitä JavaScript-arvon. [F9]

| Tapahtuma käyttöliittymässä | Pyyntö valmiissa Tehtävätaulussa | Palvelimen tehtävä |
|---|---|---|
| Avaa oma työtila | `GET /api/projects` | Tunnista käyttäjä ja palauta vain hänen omat projektinsa. |
| Luo projekti | `POST /api/projects` | Tarkista nimi ja luo projekti kirjautuneelle käyttäjälle. |
| Muuta projektin nimeä | `PATCH /api/projects/:id` | Tarkista omistajuus ja muuta nimeä. |
| Avaa projektin tehtävät | `GET /api/projects/:id/tasks` | Tarkista omistajuus ja lue tehtävät. |
| Lisää tehtävä | `POST /api/projects/:id/tasks` | Tarkista omistajuus sekä nimi ja luo tehtävä. |
| Muuta tehtävän nimeä tai tilaa | `PATCH /api/tasks/:id` | Tarkista tehtävän projektin omistajuus ja sallittu muutos. |
| Poista tehtävä | `DELETE /api/tasks/:id` | Tarkista omistajuus ja poista tehtävä. |
| Poista projekti | `DELETE /api/projects/:id` | Tarkista omistajuus ja poista projekti sekä sen tehtävät. |

Taulukon `:id` on paikkamerkintä: todellisessa pyynnössä sen paikalla on esimerkiksi `7`. Sitä ei kirjoiteta sellaisenaan selaimen pyyntöön. Taulukon osoitteet kuvaavat juuri tämän opintojakson esimerkkisovellusta, eivät kaikkien verkkopalvelujen yhteistä pakollista nimeämistapaa.

### 3.11 Promise sekä `async` ja `await`

Palvelimen vastaus ei ole valmiina samalla hetkellä, kun lähetät pyynnön. Sen saapumista täytyy odottaa. **Asynkroninen** toiminta tarkoittaa tässä, että tulos valmistuu myöhemmin ja ohjelma voi sillä aikaa jatkaa muuta työtä. [F10]

`fetch` palauttaa **Promisen**, jota voi ajatella myöhemmin valmistuvan tuloksen edustajana. Se ei ole vielä projektien taulukko. Promise voi olla odottava, onnistuneesti valmistunut tai virheeseen päättynyt. `await` odottaa kyseisen Promisen valmistumista oman `async`-funktionsa sisällä. Se ei tarkoita koko selaimen pysäyttämistä. [F10]

| Kohta ohjelmassa | Mitä se tarkoittaa ihmiselle? |
|---|---|
| `async function hae()` | Tämä funktio palauttaa Promisen ja voi käyttää `await`-odotusta. |
| `await fetch(...)` | Odota HTTP-vastauksen saapumista tähän toimintoon. |
| `response.ok` | Tarkista, onko HTTP-status onnistumisen alueella 200–299. |
| `await response.json()` | Odota vastauksen rungon lukemista ja tulkitse sen JSON. |
| `throw new Error(...)` | Ilmoita, että toiminto ei voi jatkua normaalisti. |
| `try` ja `catch` | Yritä toimintoa; käsittele virhe, jos sellainen syntyy. |
| `finally` | Tee loppusiivous sekä onnistumisen että virheen jälkeen. |

`fetch` voi onnistua verkkopyyntönä, vaikka palvelin vastaisi ”401: et ole kirjautunut” tai ”404: kohdetta ei löytynyt”. Siksi tarvitaan erikseen `response.ok`-tarkistus. Pelkkä `catch` ei käsittele HTTP-virhevastauksia, jos et tarkista statusta ja käsittele epäonnistumista itse. [F9, F10]

**HTTP-status** on vastauksen numeromuotoinen tuloskoodi. Valmiissa esimerkissä 200 tarkoittaa onnistunutta hakua tai muokkausta, 201 uuden kohteen luontia ja 204 onnistumista ilman vastausrunkoa. Tämän vuoksi 204-vastaukselle ei kutsuta `response.json()`: tyhjä sisältö ei ole JSON-asiakirja. Kirjautumattomuus on 401 ja ylläpito-oikeuden puute 403.

#### Näytettävät tilat eivät ole sama asia kuin HTTP-status

| Käyttöliittymän tila | Esimerkkiteksti | Mitä käyttäjä voi tehdä? |
|---|---|---|
| Alku- tai tyhjä tila | ”Sinulla ei vielä ole projekteja. Luo ensimmäinen projekti yllä.” | Aloittaa ensimmäisen kohteen luomisen. |
| Odotus | ”Tallennetaan uutta tehtävää…” | Ymmärtää, että pyyntö on kesken. Uusi lähetys estetään hetkeksi. |
| Onnistuminen | ”Tehtävä lisätty.” | Jatkaa seuraavaan tehtävään. |
| Virhe | ”Nimen pitää sisältää 1–200 merkkiä.” | Korjaa syötteen. |
| Yhteyden katkeaminen | ”Palvelimeen ei saatu yhteyttä.” | Tarkistaa palvelimen käynnissäolon ja yrittää uudelleen. |
| Vanhentunut kirjautuminen | ”Kirjautuminen on vanhentunut. Kirjaudu uudelleen.” | Palaa tunnistautumiseen. |

Tilaviesti sijoitetaan jo valmiiksi HTML:ssä olevaan `role="status"`-alueeseen. Virheille on erillinen `role="alert"`-alue. Viestiä ei kerrota vain värillä tai pienellä kuvakkeella. `aria-live="polite"` pyytää avustavaa teknologiaa ilmoittamaan tavallisen päivityksen sopivassa tauossa. [F16]

### 3.12 Kokeilu 6: hae tietoa oikealta palvelimelta

**Tämä kokeilu tehdään vasta, kun backendin valmis vaihe toimii.** Aikaisemmissa `file:///...`-kokeiluissa ei vielä ollut palvelinta. Tässä käytetään mukana olevan sovelluksen osoitetta `http://localhost:8000`.

**Tavoite:** erotat verkkopyynnön onnistumisen ja kirjautumisen puuttumisen sekä löydät pyynnön selaimen kehittäjätyökaluista.

1. Käynnistä valmis backend sen oman luvun ohjeella, tavallisesti `esimerkit/04-valmis`-kansiossa komennolla `deno task start`.
2. Avaa selaimessa **`http://localhost:8000`** ja luo harjoitustunnus. Käytä keksittyä osoitetta kuten `oppija@example.test` ja tähän harjoitukseen valittua vähintään 15 merkin salasanaa.
3. Luo käyttöliittymässä yksi projekti.
4. Avaa selaimen valikosta kehittäjätyökalut. Valitse **Console** eli konsoli. Konsoli on paikka, jossa voit suorittaa lyhyitä JavaScript-kokeiluja tämän sivun yhteydessä.
5. Suorita seuraava kokonainen kokeilu konsolissa. Voit kirjoittaa sen ensin omaan `06-verkkokokeilu.js`-tiedostoosi talteen. Älä lisää sitä valmiin `app.js`:n perään; tämä on erillinen kokeilu.

```javascript
// Async-funktio voi odottaa palvelimen vastauksen valmistumista.
async function kokeileProjektihakua() {
  // Käytetään valmiin sovelluksen olemassa olevaa tilaviestikappaletta.
  const naytto = document.querySelector("#status");
  // Kerrotaan pyynnön olevan kesken.
  naytto.textContent = "Kokeilu: haetaan omia projekteja…";
  // Try-lohkon mahdolliset virheet siirtyvät catch-lohkoon.
  try {
    // Osoite alkaa /-merkillä, joten käytetään tämän sivun palvelinta.
    const vastaus = await fetch("/api/projects", {
      // GET pyytää tietoa muuttamatta sitä.
      method: "GET",
      // Selain lähettää saman alkuperän istuntoevästeen automaattisesti.
      credentials: "same-origin",
      // Harjoituksessa halutaan palvelimen tämänhetkinen vastaus.
      cache: "no-store",
    });
    // HTTP-virhe pitää tarkistaa itse, vaikka fetch sai vastauksen.
    if (!vastaus.ok) {
      // Virhe siirtää käsittelyn catchiin ja sisältää HTTP-statuksen.
      throw new Error(`Projektihaku epäonnistui: HTTP ${vastaus.status}`);
    }
    // JSON-vastauksen lukeminenkin on odotettava asynkroninen toiminto.
    const tiedot = await vastaus.json();
    // Palvelimen projects-taulukon pituus näytetään tekstinä.
    naytto.textContent = `Kokeilu onnistui. Projekteja: ${tiedot.projects.length}.`;
  } catch (virhe) {
    // Myös yhteysvirheestä jää näkyvä teksti sivulle.
    naytto.textContent = `Kokeilun virhe: ${virhe.message}`;
  }
}

// Kutsutaan määriteltyä funktiota; pelkkä määrittely ei tekisi pyyntöä.
kokeileProjektihakua();
```

**Odotettu tulos:** sivun tilaviestissä näkyy omien projektiesi määrä. Jos olet luonut yhden projektin, määrä on 1. Konsolissa näkyvä `Promise` on funktion paluuarvo eikä itsessään virhe.

**Tarkista onnistuminen:** valitse kehittäjätyökalujen **Network** eli verkkopyynnöt. Suorita konsolissa uudelleen `kokeileProjektihakua()`. Etsi pyyntö `projects`. Tarkista osoite, GET-menetelmä, status ja JSON-vastaus. Tunnista siinä luomasi projektin nimi.

**Tarkista virhe:** kirjaudu käyttöliittymästä ulos ja suorita sama konsolikutsu uudelleen. Nyt palvelimen pitää palauttaa 401. Sivun kokeiluviesti kertoo HTTP-virheen. Avaa sivu lopuksi uudelleen, jotta tavallinen sovelluksen tilaviesti palautuu.

**Tavallinen virhe:** saat `Failed to fetch`-tyyppisen virheen tai haun väärälle osoitteelle. Tarkista, että osoiterivillä on `http://localhost:8000`, Deno on käynnissä ja kokeilet konsolissa juuri tällä välilehdellä. `file:///...`-sivulla `fetch("/api/projects")` ei tarkoita Denon palvelinta.

### 3.13 Seuraa mukana: koko frontend yhdistyy Deno-backendiin

Valmis kokonaisuus on kansiossa **`esimerkit/04-valmis/`**. Sen frontend-tiedostot ovat `public/index.html`, `public/styles.css` ja `public/app.js`. Käynnistä backendin ohjeen mukaan palvelin. Avaa käyttöliittymä osoitteesta **`http://localhost:8000`**. Frontendin ja backendin pitää olla tässä esimerkissä samassa alkuperässä.

Tästä vaiheesta lähtien tiedot tallentuvat backendin kautta oikeaan tietokantaan. Tehtävän onnistuneesta tallennuksesta kerrotaan vasta palvelimen vastauksen jälkeen. Sovellus ei säilytä salasanaa tai istuntotunnistetta `localStorage`-tallennuksessa. Kirjautuminen perustuu backendin asettamaan `HttpOnly`-istuntoevästeeseen. Selain lähettää evästeen pyynnössä automaattisesti, mutta frontendin JavaScript ei lue sitä. `HttpOnly` suojaa evästeen lukemiselta JavaScriptistä; se ei yksin estä kaikkia selaimessa tapahtuvia hyökkäyksiä. [F17]

#### Miksi valmiin sovelluksen pituustarkistus eroaa pienestä lomakekokeilusta?

**Unicode** on tekstin merkkien yhteinen standardi. **Koodipiste** tarkoittaa yhtä sen numeroitua kohtaa. JavaScriptin merkkijono käyttää sisäisesti UTF-16-esitystä: esimerkiksi `😀` vie kaksi UTF-16-koodiyksikköä, vaikka se on yksi Unicode-koodipiste. Tavallinen merkkijonon `.length` ja HTML:n `maxlength` laskevat UTF-16-yksiköitä. Pienten kokeilujen `maxlength` havainnollistaa selaimen omaa kenttärajaa. [F25, F26]

Valmis Tehtävätaulu sopii backendin kanssa rajat **Unicode-koodipisteinä**: projektin nimi 1–120, tehtävän nimi 1–200 ja salasana 15–128. Frontend käyttää niiden tarkistamiseen `Array.from(teksti).length`-laskentaa kuten backendkin. Sen nimissä ja salasanoissa ei käytetä ristiriitaista HTML:n `maxlength`- tai `minlength`-rajaa. Kenttien `required`-pakollisuus säilyy. Pituusvirhe näytetään tekstinä; palvelin tarkistaa säännön aina uudelleen. Sähköpostin erillinen 254 yksikön raja säilyy samana selaimessa ja palvelimella.

Yksi käyttäjän näkemä kirjoitusmerkki voi muodostua myös useasta koodipisteestä, esimerkiksi yhdistellyssä emojissa. Siksi koodipisteiden määrä ei kaikissa teksteissä ole sama kuin silmällä laskettu merkkien määrä. Tässä harjoituksessa olennaista on, että frontend ja backend käyttävät keskenään samaa laskutapaa. [F26]

#### Mitä tiedostoista kannattaa lukea ensin?

| Järjestys | Tiedosto tai funktio | Mitä etsit? |
|---|---|---|
| 1 | `public/index.html` | Otsikot, `form`, `label`, `input`, `button`, tyhjät listat ja viestialueet. |
| 2 | `public/styles.css` | Säännöt `label`, `input`, `button`, `:focus-visible` ja pienelle näytölle muuttuva ruudukko. |
| 3 | `state` ja `ui` tiedostossa `public/app.js` | Sovelluksen tiedot sekä erilliset viittaukset sivun elementteihin. |
| 4 | `announce`, `showError`, `setBusy` | Miten käyttäjä saa tiedon onnistumisesta, virheestä ja odotuksesta. |
| 5 | `api` | Miten pyyntö lähetetään, onnistuminen tarkistetaan ja JSON luetaan. |
| 6 | `renderProjects`, `renderTasks` | Miten projektien ja tehtävien tiedoista syntyy näkyvä lista. |
| 7 | Lomakkeiden `addEventListener`-kohdat | Mitä tehdään juuri painikkeen käytön tai Enterin jälkeen. |
| 8 | `initialize` | Miten sivu selvittää aluksi voimassa olevan kirjautumisen. |

Pitkää tiedostoa ei tarvitse ymmärtää yhdellä lukemisella. Käytä editorin hakua funktion nimeen. Lue ensin kommentti ja sitä seuraava rivi. Pidä selain vieressä auki, jotta voit yhdistää rivin todelliseen toimintaan.

#### Vaihe A: tunnistautuminen ja oma työtila

1. Tarkista, että sivulla näkyy ”Kirjaudu sisään” ja ”Luo tunnus”.
2. Luo tunnus keksityllä osoitteella ja 15–128 merkin harjoitussalasanalla. Salasanan alun tai lopun välilyöntejä ei ohjelmassa poisteta.
3. Varmista, että kirjautuneen käyttäjän osoite näkyy ja tyhjä projektilista neuvoo luomaan ensimmäisen projektin.
4. Kirjaudu ulos. Työtilan ja siihen ladattujen projektitietojen pitää poistua näkymästä.
5. Yritä kirjautua väärällä salasanalla. Virheen pitää näkyä tekstinä. Korjaa salasana ja kirjaudu onnistuneesti.

**Odotettu tulos:** kirjautuminen vaihtaa näkyvän työtilan ja uloskirjautuminen päättää myös palvelimen istunnon. Pelkkä näkymän piilottaminen ei olisi uloskirjautuminen.

**Tarkistus:** avaa Network-näkymä ja etsi `/api/auth/register`, `/api/auth/login`, `/api/auth/logout` tai `/api/auth/me`. Älä lisää salasanan tulostusta konsoliin. Katso pyynnön tarkoitusta, vastauskoodia ja sitä, että frontend toimii palvelimen vahvistaman käyttäjän perusteella.

**Tavallinen virhe:** uloskirjautumisen jälkeen seuraava käyttäjä näkee vanhan projektin tekstin. Valmis `showGuest` tyhjentää muistissa olevat projektit ja tehtävät sekä niistä rakennetun näkymän. Tarkista tämä toiminto, jos muokkaat koodia.

#### Vaihe B: projektin kaikki neljä perustoimintoa

1. Luo projekti ”Web-ohjelmoinnin harjoitukset”.
2. Luo toinen projekti ”Viikon suunnitelma”.
3. Avaa ensimmäinen projekti sen omasta painikkeesta.
4. Muuta projektin nimi muokkauskentässä ja paina ”Tallenna projektin nimi”.
5. Avaa sivu uudelleen tai päivitä se. Avaa sama projekti ja tarkista tallennettu nimi.
6. Avaa toinen projekti, avaa ”Projektin poistaminen” ja poista se vahvistuksen kautta.

**Odotettu tulos:** molemmat projektit näkyvät listassa, nimimuutos säilyy latauksen yli ja poistettu projekti katoaa. Valittu projekti näkyy listassa myös tekstillä ”valittu”.

**Tarkistus:** erotat POST-luonnin, GET-luvun, PATCH-muokkauksen ja DELETE-poiston Network-näkymästä. Projektin id ei vaihdu sen nimenmuutoksen vuoksi.

**Tavallinen virhe:** vaihdat CSS:llä näkyvää otsikkoa tai JavaScriptin paikallista tekstiä, mutta nimi palautuu latauksessa. Pysyvä muutos vaatii onnistuneen palvelinpyynnön ja tietokantatallennuksen.

#### Vaihe C: tehtävän kaikki perustoiminnot

1. Avaa jäljellä oleva projekti.
2. Lisää kaksi tehtävää. Uuden tehtävän nimi on 1–200 merkkiä; projektin nimen raja on 1–120 merkkiä.
3. Valitse ensimmäisen tehtävän valintaruutu. Tilateksti muuttuu sanaksi ”valmis”.
4. Avaa tehtävän ”Muokkaa tai poista” -osa. Vaihda tehtävän nimeä ja tallenna.
5. Päivitä sivu, avaa projekti uudelleen ja varmista, että nimi ja valmiustila säilyivät.
6. Poista toinen tehtävä vahvistuksen kautta. Peruuta ensin ja tarkista, ettei peruuttaminen poista tietoa.

**Odotettu tulos:** tallennettu tehtävä palaa näkyviin sivun lataamisen jälkeen. Samaa tehtävän nimeä saa käyttää eri tehtävissä; kohde valitaan id:n perusteella.

**Tarkistus:** avaa muokkausosa näppäimistöllä, siirry nimikenttään, tallenna Enterillä ja varmista, että kohdistus pysyy samassa tehtävässä. Tehtävän valintaruutua voi vaihtaa välilyönnillä.

**Tavallinen virhe:** muokkaus lähettää tyhjän nimen, vaikka kentässä on tekstiä. Jos käytät `FormData`a, kerää arvot ennen `disabled`-tilaa. Valmis tehtävän muokkausapu lukee kentän `value`-arvon suoraan myös disabled-tilassa. Palvelimen virhe pitää näyttää käyttäjälle. [F13]

#### Vaihe D: odotuksen, virheen ja uuden yrityksen kokeilu

1. Avaa Network-näkymä ja ota käyttöön selaimen tarjoama hitaamman yhteyden simulointi, jos se on käytettävissä.
2. Luo tehtävä. Huomaa odotusviesti ja hetkellisesti pois käytöstä olevat kentät sekä painikkeet.
3. Tarkista, että käyttö vapautuu vastauksen jälkeen.
4. Pysäytä oma Deno-palvelimesi sen pääteikkunassa ja yritä tallentaa uusi tehtävä jo avoimella sivulla.
5. Tarkista tekstinä näkyvä yhteysvirhe. Käynnistä palvelin uudelleen ja yritä uudelleen.
6. Palauta selaimen yhteysasetukset normaaliksi kokeilun jälkeen.

**Odotettu tulos:** virhe ei jätä käyttöliittymää pysyvästi estettyyn tilaan. `runAction` vapauttaa kentät `finally`-osassa ja palauttaa kohdistuksen, kun alkuperäinen elementti on edelleen käytettävissä.

**Tarkistus:** `response.ok` on olemassa sekä valmiin `api`-funktion koodissa että omassa pienessä verkkokokeilussasi. Valmiin esimerkin 15 sekunnin aikaraja estää odotustilan jatkumisen loputtomiin. Jos yhteys katkesi tallennushetkellä, lataa sivu ja tarkista tieto ennen samaa tallennusta uudelleen: palvelin saattoi ehtiä tehdä muutoksen, vaikka vastaus ei saapunut selaimeen.

**Tavallinen virhe:** kentät jäävät harmaiksi. Tarkista, että `setBusy(false)` on `finally`-osassa. Vain onnistumisen perässä oleva vapautus ei riitä virhetilanteisiin.

### 3.14 Saavutettavuus kuuluu perustoimintaan

**Saavutettavuus** tarkoittaa tässä, että erilaiset käyttäjät pystyvät havaitsemaan sisällön, ymmärtämään sitä ja käyttämään toimintoja. Käyttäjä voi esimerkiksi suurentaa tekstiä, käyttää näppäimistöä tai kuunnella sivua ruudunlukijalla. **Ruudunlukija** on avustava ohjelma, joka välittää käyttöliittymän rakennetta ja sisältöä puheena tai muuna käyttäjälle sopivana esityksenä. [F11]

**Kohdistus** eli focus kertoo, mihin näppäimistön seuraava toiminto kohdistuu. Pelkkä hiiren osoittimen sijainti ei ole sama asia. `:focus-visible`-tyyli tekee kohdistuksen näkyväksi, kun käyttäjä liikkuu näppäimistöllä. Kohdistusviivaa ei poisteta ilman toimivaa korvaavaa merkkiä. [F18]

**Kontrasti** tarkoittaa tekstin ja taustan välisen vaaleuseron suhdetta. WCAG 2.2:n AA-tason tavallisen tekstin vähimmäiskontrasti on 4,5:1; riittävän suurelle tekstille 3:1. Käytä kontrastin tarkistamiseen mittaavaa työkalua silmämääräisen arvion lisäksi. Tehtävän valmiutta tai virhettä ei välitetä vain värillä: tekstissä kerrotaan ”valmis”, ”kesken” tai virheen syy. [F19]

**Responsiivinen** käyttöliittymä sopeutuu käytettävissä olevaan tilaan. Valmis esimerkki käyttää pienellä näytöllä yhtä saraketta ja suuremmalla kahta. Se ei kiinnitä lomaketta satoja pikselejä leveämmäksi kuin näkymä. Tekstin suurentaminen pitää sallia, eikä viewport-asetuksessa poisteta käyttäjän zoomausmahdollisuutta. [F12]

#### Tee nämä kokeet kummallekin frontendille

Kirjaa jokaisesta kokeesta tulos: onnistui, ei onnistunut tai ei vielä kokeiltu. ”En kokeillut” on eri asia kuin ”toimii”. Jos koe epäonnistuu, kirjaa toistamisohje ja korjaus.

| Koe | Täsmällinen toiminta | Hyväksytty tulos |
|---|---|---|
| Näppäimistö | Laita hiiri sivuun. Käytä Tabia, Shift+Tabia, Enteriä ja välilyöntiä. | Kaikki ydintoiminnot onnistuvat, järjestys on ymmärrettävä ja kohdistus näkyy. |
| Ohituslinkki | Valmiissa sovelluksessa paina ensimmäinen Tab sivun alussa. | ”Siirry pääsisältöön” tulee näkyviin ja linkki ohittaa aloitusosan. |
| Label | Napsauta kentän näkyvää nimeä. | Kohdistus siirtyy vastaavaan kenttään. |
| Tyhjä kenttä | Yritä lähettää tyhjä tai vain välilyöntejä sisältävä nimi. | Näet ymmärrettävän virheen ja tiedät, mitä pitää korjata. |
| Otsikot | Tutki sivun otsikkorakennetta avustavalla työkalulla tai ruudunlukijalla. | Pääotsikko ja alatasot kuvaavat sisältöä loogisessa järjestyksessä. |
| 200 % suurennus | Suurenna selaimen näkymä kaksinkertaiseksi. | Teksti, kentät ja painikkeet pysyvät luettavina ja käytettävinä. |
| Kapea näkymä | Käytä noin 320 CSS-pikselin leveyttä tai vastaavaa 400 % suurennusta 1280 pikselin näkymässä. | Ydinsisältöä voi lukea ja käyttää ilman kahteen suuntaan vierittämistä. |
| Muuttuva viesti | Lisää tehtävä käytössäsi olevan ruudunlukijan kanssa. | Onnistumisviesti havaitaan ilman, että käyttäjän täytyy itse etsiä muuttunut teksti. |
| Kohteen poistaminen | Poista juuri kohdistettu tehtävä. | Kohdistus siirtyy olemassa olevaan mielekkääseen kenttään tai toimintoon. |
| Virheestä palautuminen | Katkaise yhteys kesken käytön ja palauta se. | Virhe näkyy tekstinä ja toiminto on uudelleen käytettävissä. |
| Pitkä teksti | Anna pitkä tehtävän nimi ja sähköpostiosoite. | Teksti rivittyy eikä peitä painikkeita tai levitä koko sivua. |

Testien perustana ovat W3C:n ohjeet lomakkeiden nimeämisestä, ilmoituksista, näkyvästä kohdistuksesta ja sisällön uudelleenrivittymisestä. Nämä kurssikokeet eivät yksin osoita kaikkien WCAG-kriteerien täyttymistä; ne ovat harjoituksen käytännön tarkistuslista. [F8, F12, F16, F18]

#### Käytä oikeaa elementtiä ennen ARIA-lisäyksiä

HTML:n oma `button`, `input`, `label`, `form` ja `details` sisältävät valmiita toimintoja, joihin selaimet ja avustavat teknologiat voivat tukeutua. `div` on yleinen ryhmittelyelementti. Sen ulkoasun muuttaminen painikkeen näköiseksi ei tee siitä automaattisesti näppäimistöllä toimivaa painiketta. [F11]

**ARIA** tarkoittaa lisämerkintöjä, jotka kertovat käyttöliittymän merkityksistä tai tiloista avustaville teknologioille. Esimerkkejä ovat `aria-live`, `aria-labelledby` ja `aria-busy`. Ne eivät automaattisesti toteuta puuttuvaa toiminnallisuutta. `aria-labelledby="projects-title"` nimeää alueen viittaamalla olemassa olevaan otsikkoon, jonka id on `projects-title`. [F8, F16]

**`hidden` ei ole käyttöoikeussuoja.** Se piilottaa käyttöliittymän osan. Tavallinen käyttäjä voi omassa selaimessaan poistaa hidden-attribuutin, jolloin esimerkiksi ylläpidon painike saattaa näkyä. Valmiin sovelluksen palvelin silti estää tavallisen käyttäjän ylläpitopyynnön. Käyttöliittymän näkyvyys ja palvelimen tekemä autorisointi ovat eri asioita.

### 3.15 Harjoitukset tästä eteenpäin

Koko opintojakson pakolliset tietoturva-, mallinnus-, tietokanta-, autentikaatio- ja autorisointivaatimukset ovat loppuosan tehtävissä. Tämä frontend-luku tuottaa niihin käytettävän käyttöliittymän. Vaihtoehtoinen backend-tekniikka ei poista käyttäjän tarvitsemia toimintoja, virhepalautetta tai saavutettavuuskokeita.

**Perustaso: tee ensin nämä.**

1. Muuta muistidemon tekstit omaan selkeään suomeesi. Säilytä jokaisella kentällä näkyvä label ja kaikilla toiminnoilla kuvaava nimi.
2. Lisää ja muokkaa tehtävää sekä hiirellä että näppäimistöllä. Kirjoita omin sanoin, mistä tapahtuma alkaa ja mitä `render` tekee.
3. Suorita valmiin sovelluksen rekisteröinti, kirjautuminen, projektin sekä tehtävän CRUD ja uloskirjautuminen. Todista päivittämällä sivu, että tiedot ovat tietokannassa.
4. Tarkista käyttöliittymän tyhjä tila, odotus, onnistuminen ja virhe. Tallenna havaintosi.
5. Kokeile tehtävän nimenä `<strong>Oma teksti</strong>`. Sen pitää näkyä kirjaimellisena tekstinä. Selitä `textContent`-valinta.
6. Tee vähintään näppäimistö-, label-, virheviesti-, suurennus- ja kapean näkymän kokeet. Korjaa havaitut ongelmat.

**Pakollinen soveltaminen: P4–P5 ja P8.**

1. **P4–P5: muutoskortti M1 on pakollinen.** Lisää tehtävälle määräpäivä luvun 05 suunnitteluohjeen ja luvun 10 hyväksymisehtojen mukaisesti. Johda kenttä designista datamalliin, tietokantaan, palvelimen validointiin ja käyttöliittymään. Määräpäivän antaminen on sovelluksen käyttäjälle vapaaehtoista; kentän suunnittelu ja toteuttaminen ovat opiskelijalle pakollisia. Käyttäjän täytyy voida asettaa, muuttaa ja tyhjentää päivämäärä. Käytä näkyvää labelia, säilytä vanhat tiedot migraatiossa ja säilytä omistajuuden tarkistukset.
2. **P8: kahden käyttäjän oikeustestit ovat pakollisia.** Tee omistajuustestit kahdella harjoituskäyttäjällä luvun 10 P8-taulukon mukaan. Kokeile käyttöliittymän lisäksi suoria API-pyyntöjä toisen käyttäjän kohteen tunnisteella, myös M1-määräpäivään. Tavallisen näkymän toimiminen ei vielä todista käyttöoikeuksien oikeellisuutta.

**Vapaaehtoiset jatkoharjoitukset: suodatin ja laskuri.**

1. Lisää suodatin ”Kaikki”, ”Kesken” ja ”Valmiit”. Suodatin muuttaa näkymää; tehtäviä ei poisteta tietokannasta. Käytä nimettyä HTML-valintaa tai selkeästi nimettyjä painikkeita. Kerro myös suodatetun tyhjän listan syy.
2. Lisää näkyvä lukumäärä projektin keskeneräisistä tehtävistä. Varmista, että se päivittyy luonnin, valmiuden vaihtamisen ja poiston jälkeen.

**Lisätehtävät: vaikeimmat jäävät vapaaehtoisiksi.**

- Tee tallentamattoman muokkauksen tunnistus. Käyttäjä saa ymmärrettävän ilmoituksen vaihtaessaan projektia kesken muokkauksen.
- Tue useita yhtä aikaa käytettäviä välilehtiä niin, että vanhentunut tieto voidaan havaita ja ladata uudelleen. Käsittele myös tilanteet, joissa toinen välilehti poistaa parhaillaan avoimen projektin.
- Toteuta TypeScriptillä käännettävä frontend tai haluamasi käyttöliittymäkirjasto. Dokumentoi, miten lähdekoodi muuttuu selaimen suorittamaksi koodiksi. Säilytä samat saavutettavuus- ja tietoturvavaatimukset.
- Tee käyttöliittymän toistettavat selaintestit: käyttäjän A ja B erottelu, virheestä palautuminen, kohdistus poiston jälkeen ja hakutuloksen turvallinen tekstitulostus.

### 3.16 Kun jokin ei toimi

Etene pienimmästä tarkistuksesta seuraavaan. Lue ensin selaimen näkyvä virhe, sitten konsolin ensimmäinen virhe ja lopuksi verkkopyynnön vastaus. Yksi puuttuva lainausmerkki voi aiheuttaa useita myöhempiä ilmoituksia.

| Oire | Todennäköinen selitys | Ensimmäinen tarkistus |
|---|---|---|
| HTML-koodi näkyy tekstinä | Väärä tiedostopääte tai tiedosto avattiin tekstinä | Tiedoston oikea nimi ja avaava sovellus. |
| Tyylit puuttuvat | CSS-polku ei vastaa tiedoston paikkaa | `href`, tiedoston nimi ja tallennus. |
| Painike ei tee mitään | JS-tiedosto ei lataudu tai koodi pysähtyy virheeseen | `src`, `defer` ja konsolin ensimmäinen virhe. |
| Virhe mainitsee `null`-arvon | Elementtiä ei löydy | HTML:n id ja `querySelector`-valitsin. |
| Lista katoaa Enteristä | Oletuslähetys lataa sivun | Lomakkeen `submit` ja `preventDefault`. |
| Muistidemon tiedot katoavat päivityksessä | Tämän vaiheen tiedot ovat vain muistissa | Käytätkö `02-frontend`-vaihetta? |
| Valmis app ei kirjaudu tiedosto-osoitteesta | Käyttöliittymä ei ole backendin alkuperässä | Avaa `http://localhost:8000`. |
| Kirjoitus palauttaa 403 alkuperävirheen | Osoite ei vastaa palvelimen sallimaa originia | Käytätkö `127.0.0.1`:tä, väärää porttia tai erillistä kehityspalvelinta? |
| API palauttaa 401 | Istunto puuttuu tai on vanhentunut | Kirjaudu uudelleen ja tarkista pyyntö. |
| Ylläpidon API palauttaa 403 | Käyttäjällä ei ole ylläpitäjän roolia | Tavalliselle käyttäjälle tämä on odotettu turvallinen tulos. |
| Projektin tai tehtävän API palauttaa 404 | Kohdetta ei ole tai se ei kuulu käyttäjälle | Id, oma käyttäjä ja onko kohde poistettu. |
| Tallennus saa 400-virheen | Syöte ei täytä palvelimen sääntöä | Vastauksen turvallinen virheteksti ja kentän arvo. |
| JSONin lukeminen epäonnistuu | Tyhjä tai vääränmuotoinen vastaus | Tarkistetaanko 204 ennen `response.json()`-kutsua? |
| Tallentuva nimi on tyhjä | Kenttä luettiin vasta disabled-tilan jälkeen | Kerätäänkö FormData ennen odotustilaa? |
| Poiston jälkeen näppäimistö hukkuu | Kohdistettu elementti poistettiin DOMista | Kohdistetaanko seuraava olemassa oleva kenttä tai painike? |
| Lataustila jää päälle virheen jälkeen | Vapautus suoritetaan vain onnistumisessa | `finally` ja `setBusy(false)`. |

### 3.17 Lähteet ja tarkistuspäivä

Viralliset lähteet on tarkistettu **19.10.2026**. Esimerkkien suomenkielinen koodi, työvaiheet, harjoitukset ja Tehtävätaulun API-sopimus on laadittu tätä materiaalia varten. Lähteet tukevat selaimen toimintaa ja saavutettavuuden käsitteitä; ne eivät määritä juuri tämän esimerkkisovelluksen projektikohtaisia osoitteita.

| Viite | Virallinen lähde |
|---|---|
| F1 | MDN: [What is JavaScript?](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/What_is_JavaScript) |
| F2 | MDN: [The web standards model](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Web_standards/The_web_standards_model) |
| F3 | MDN: [What is CSS?](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/What_is_CSS) |
| F4 | MDN: [JavaScript: Adding interactivity](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website/Adding_interactivity) |
| F5 | MDN: [HTML: Creating the content](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website/Creating_the_content) |
| F6 | MDN: [Document Object Model (DOM)](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model) |
| F7 | MDN: [EventTarget: addEventListener()](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) |
| F8 | W3C WAI: [Labeling Controls](https://www.w3.org/WAI/tutorials/forms/labels/) |
| F9 | MDN: [Using the Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) |
| F10 | MDN: [How to use promises](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Async_JS/Promises) |
| F11 | MDN: [CSS and JavaScript accessibility best practices](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/CSS_and_JavaScript) |
| F12 | W3C WAI: [Understanding Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html) |
| F13 | MDN: [Using FormData Objects](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest_API/Using_FormData_Objects) |
| F14 | MDN: [Node: textContent](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent) |
| F15 | MDN: [Same-origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy) |
| F16 | W3C WAI: [User Notifications](https://www.w3.org/WAI/tutorials/forms/notifications/) |
| F17 | MDN: [Using HTTP cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies) |
| F18 | W3C WAI: [Understanding Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html) |
| F19 | W3C WAI: [Understanding Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) |
| F20 | TypeScript: [TypeScript for the New Programmer](https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html) |
| F21 | MDN: [Grammar and types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types) |
| F22 | MDN: [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) |
| F23 | MDN: [Template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) |
| F24 | MDN: [Nullish coalescing operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing) |
| F25 | MDN: [maxlength HTML attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/maxlength) |
| F26 | MDN: [String: length](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/length) |


---

## 04 Ensimmäinen backend ja HTTP-rajapinta

**Tavoite:** käynnistät palvelimen, pyydät siltä tietoa ja löydät pyynnön sekä vastauksen selaimen kehittäjätyökaluista. **Esitiedot:** luvut 01–03. **Tarkistuspiste:** `esimerkit/01-palvelin/main.ts`.

### Ensin ymmärrys, sitten palvelin

Tavallinen terminaaliohjelmamme suoritti rivit ja päättyi. Palvelin jää käyntiin odottamaan pyyntöjä. Se ei siis ole jumissa, vaikka terminaalin kehote ei palaa näkyviin. Selaimen avaaminen lähettää sille pyynnön. Pyynnön käsittelijä palauttaa vastauksen. Denon sisäänrakennettu `Deno.serve` huolehtii HTTP-yhteydestä, jotta harjoituksessa voimme keskittyä käsittelysääntöön. [Deno: HTTP-palvelin](https://docs.deno.com/api/deno/http-server/).

**Reititys** tarkoittaa sopivan käsittelyn valitsemista metodin ja polun perusteella. Aluksi tarvitsemme vain kolme sääntöä: `/` näyttää tervehdyksen, `/api/health` palauttaa toimivuustiedon ja tuntematon polku tuottaa virheen. Tässä vaiheessa ei kirjoiteta käyttäjätietoja eikä tallenneta mitään.

### Tutoriaali T3: palvelin vastaa

1. Palaa oman `backend-kurssi`-hakemistosi tasolle. Jos olet `00-kieli`-hakemistossa, komento `cd ..` riittää.
2. Luo `01-palvelin`-hakemisto ja avaa se editoriin.
3. Luo tiedosto `main.ts`.
4. Kopioi koodipankin **esimerkit/01-palvelin/main.ts** kokonaisuudessaan. Mukana ovat kaikki kommentit ja kaikki kolme reittiä.
5. Tallenna. Suorita alla oleva komento terminaalissa `01-palvelin`-hakemistossa.

```sh
# Salli vain oman koneen portti 8000, tarkista tyypit ja käynnistä HTTP-palvelin.
deno run --check --allow-net=127.0.0.1:8000 main.ts
```

**Odotettu tulos:** terminaali kertoo kuuntelevansa osoitteessa `http://127.0.0.1:8000/`. Avaa selaimen osoiteriviltä `http://localhost:8000/`. Näet tekstin, joka alkaa `Hei! Palvelin toimii.`. Älä avaa `main.ts`-tiedostoa selaimella: Deno suorittaa sen ja selain käyttää sen tarjoamaa HTTP-osoitetta.

Pidä terminaali auki. Avaa selaimeen `http://localhost:8000/api/health`. Näet JSON-dataa, jonka `status`-kentän arvo on `ok` ja `viesti`-kentän arvo on `Backend vastasi.`. Selain voi näyttää JSONin muotoiltuna tai yhdellä rivillä. Molemmat ovat oikein.

**Tarkistuspiste:** avaa `http://localhost:8000/ei-ole`. Näet JSON-virheen. Avaa kehittäjätyökalut seuraavan kohdan mukaisesti ja varmista, että vastauksen status on `404`. Sivulla näkyvä virheteksti yksin ei vielä varmista oikeaa statuskoodia.

### Katso, mitä verkossa tapahtuu

Avaa selaimen valikosta Kehittäjätyökalut / Developer tools. Useissa selaimissa näppäin on F12, mutta valikko toimii myös silloin, kun tietokone varaa näppäimen muuhun käyttöön. Valitse **Network / Verkko**. Päivitä sivu, koska ennen työkalun avaamista tehtyä pyyntöä ei välttämättä näy.

Siirry takaisin osoitteeseen `http://localhost:8000/api/health` ja valitse Network-listasta polun `api/health` rivi. Etsi Request Method, Status Code, Response Headers ja Response. Niiden suomenkieliset nimet vaihtelevat selaimittain. Kirjoita havaintoon: metodi GET, status 200, sisältötyyppi application/json ja palautettu viesti. Kehittäjätyökalujen Console-välilehti näyttää frontendin JavaScript-virheet; terminaali näyttää backendin tulostuksen. Kyseessä ovat eri paikat.

**Pieni muutos:** vaihda palvelimen viesti, tallenna, pysäytä ohjelma terminaalissa Ctrl+C:llä ja suorita sama komento uudelleen. Päivitä selain. Vaihda myöhemmin käynnistyskomentoon `--watch`, jolloin Deno käynnistää ohjelman uudelleen lähdekoodin muuttuessa. Backendin uudelleenkäynnistys ei automaattisesti päivitä jo auki olevaa selaimen sivua.

```sh
# Tarkkaile tiedoston muutoksia ja käynnistä palvelin tarvittaessa uudelleen.
deno run --watch --check --allow-net=127.0.0.1:8000 main.ts
```

### Lue palvelimen koodi yksi vastuu kerrallaan

`Deno.serve` saa asetusolion ja käsittelijäfunktion. Asetukset kertovat missä kuunnellaan. Käsittelijä saa yhden `Request`-olion, joka edustaa saapunutta pyyntöä. `new URL(request.url)` tulkitsee osoitteen. `request.method` kertoo metodin ja `url.pathname` polun. `if`-ehdot valitsevat vastauksen. `return` lopettaa juuri tämän pyynnön käsittelyn.

`Response.json` muodostaa JSON-vastauksen. `new Response` voi puolestaan sisältää tavallista tekstiä tai muuta sisältöä. `Content-Type` kertoo vastaanottajalle, miten sisältö tulkitaan. `charset=utf-8` kertoo tekstin merkistön. Kommenttien `Request`- ja `Response`-nimet ovat tyyppien nimiä; pienellä kirjoitettu `request` on valitsemamme muuttujan nimi.

Yhtä käsittelijää kutsutaan monelle eri pyynnölle. Älä ajattele, että koko palvelin kuuluu yhdelle opiskelijalle: samalle palvelimelle voi tulla pyyntöjä monelta käyttäjältä. Siksi kirjautuneen käyttäjän tunnistetta ei myöhemmin laiteta yhteen kaikille yhteiseen muuttujaan.

### HTTP-sopimus ennen isoa toteutusta

Lopullisen sovelluksen sopimus näyttää tältä. **Sopimus** tarkoittaa dokumentoitua yhteisymmärrystä pyynnöistä, vastauksista ja virheistä. Frontendin ja backendin tekijä voivat työskennellä rinnakkain, kun sopimus on sama.

| Metodi ja polku | Tarkoitus | Tavallinen onnistuminen |
| --- | --- | --- |
| `POST /api/auth/register` | Luo harjoitustili ja istunto. | 201 ja käyttäjän perustiedot. |
| `POST /api/auth/login` | Tarkista tunnus ja salasana sekä luo istunto. | 200 ja käyttäjän perustiedot. |
| `POST /api/auth/logout` | Mitätöi nykyinen istunto. | 204, ei sisältöä. |
| `GET /api/auth/me` | Hae oman istunnon käyttäjä. | 200 ja käyttäjä. |
| `GET /api/projects` | Listaa käyttäjän omat projektit. | 200 ja projektitaulukko. |
| `POST /api/projects` | Luo oma projekti. | 201 ja uusi projekti. |
| `GET /api/projects/{id}` | Hae yksi oma projekti. | 200 ja projekti. |
| `PATCH /api/projects/{id}` | Muuta oman projektin nimeä. | 200 ja päivitetty projekti. |
| `DELETE /api/projects/{id}` | Poista oma projekti ja sen tehtävät. | 204. |
| `GET /api/projects/{id}/tasks` | Listaa oman projektin tehtävät. | 200 ja tehtävätaulukko. |
| `POST /api/projects/{id}/tasks` | Lisää tehtävä omaan projektiin. | 201 ja tehtävä. |
| `GET /api/tasks/{id}` | Hae yksi oman projektin tehtävä. | 200 ja tehtävä. |
| `PATCH /api/tasks/{id}` | Muuta oman tehtävän nimeä tai valmis-tilaa. | 200 ja päivitetty tehtävä. |
| `DELETE /api/tasks/{id}` | Poista oma tehtävä. | 204. |
| `GET /api/admin/stats` | Hae yhteiset lukumäärätilastot ylläpitäjänä. | 200 ja kolme lukumäärää. |

Merkintä `{id}` on dokumentoinnin paikkamerkki. Oikeaan pyyntöön kirjoitetaan esimerkiksi `/api/projects/1/tasks`. Palvelin antaa tunnisteen luontivastauksessa: käyttäjän tai frontendin ei tarvitse arvailla sitä. JSON-vastauksessa projektit ovat kentässä `projects`, tehtävät kentässä `tasks` ja yksittäinen luotu kohde kentässä `project` tai `task`.

Kirjoittavassa pyynnössä ilmoitetaan `Content-Type: application/json` ja sallitun alkuperän `Origin`. Myös `DELETE`- ja logout-pyynnöissä lähetetään JSON-runko `{}`; pelkkä tyhjä HTTP-runko ei täytä tämän esimerkin sopimusta. Selain asettaa Originin itse. Projektin luontiin lähetetään `title`, tehtävän luontiin `title` ja tehtävän muutokseen `title`, `done` tai molemmat. Kirjautumiseen lähetetään `email` ja `password`. **Asiakas ei valitse omistajaa eikä roolia.** Ne ratkaistaan backendissä.

### Tilakoodit, jotka pitää osata lukea

| Koodi | Merkitys tässä materiaalissa | Mitä frontend tekee? |
| --- | --- | --- |
| 200 | Pyyntö onnistui ja vastauksessa on tietoa. | Näyttää tiedot. |
| 201 | Uusi kohde luotiin. | Lisää tai hakee listan uudelleen. |
| 204 | Pyyntö onnistui ilman vastausrunkoa. | Ei yritä lukea tyhjää runkoa JSONiksi. |
| 400 | Syöte on virheellinen. | Näyttää selkeän korjausviestin. |
| 401 | Käyttäjää ei ole tunnistettu kelvollisella istunnolla. | Pyytää kirjautumaan. |
| 403 | Toimintoon ei ole oikeutta tai pyynnön alkuperä ei ole sallittu. | Näyttää eston, ei yritä kiertää sitä. |
| 404 | Kohdetta tai reittiä ei löydy käyttäjän käytettävissä olevista tiedoista. | Näyttää puuttuvan kohteen. |
| 405 | Reitti ei salli käytettyä metodia. | Korjaa ohjelman pyynnön. |
| 409 | Luonti on ristiriidassa olemassa olevan tiedon kanssa. | Pyytää korjaamaan tiedot. |
| 413 | Pyynnön runko on liian suuri. | Pyytää lyhentämään syötettä. |
| 415 | Sisältötyyppiä ei tueta. | Korjaa Content-Type-otsakkeen. |
| 429 | Yrityksiä tuli liikaa lyhyessä ajassa. | Ohjaa odottamaan. |
| 500 | Palvelin kohtasi odottamattoman virheen. | Kertoo epäonnistumisesta paljastamatta palvelimen sisäisiä tietoja. |

Vieraan käyttäjän projektista palautetaan tässä sovelluksessa 404 myös silloin, kun tiedämme sen olevan tietokannassa. Näin vastaus ei paljasta ulkopuoliselle kohteen olemassaoloa. Roolilla suojatulla ylläpito-osoitteella tavallinen käyttäjä saa 403. Yleiset merkitykset: [MDN, HTTP-vastauskoodit](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status).

### Frontend hakee tietoa

Frontendin `fetch` tekee pyynnön. Luvun 03 lyhyt esimerkki opettaa sen askelittain; lopullinen `public/app.js` käyttää samaa ajatusta kaikissa toiminnoissa. `await fetch(...)` odottaa vastausta, `response.ok` tarkistaa onnistuneen HTTP-tilan ja `await response.json()` tulkitsee vastausrungon. Verkkoyhteyden katkeaminen ja HTTP-virhevastaus ovat eri tilanteita: `fetch` ei automaattisesti heitä virhettä pelkän 404- tai 500-koodin vuoksi.

**Sama alkuperä** helpottaa harjoittelua. Lopullinen backend tarjoaa sekä käyttöliittymän että API:n portista 8000, ja frontend käyttää suhteellisia polkuja, kuten `/api/projects`. **CORS** on selaimen sääntöihin kuuluva tapa sallia toisen alkuperän vastauksen lukeminen. CORS-asetus ei tunnista käyttäjää eikä anna oikeutta tietokannan riveihin. Tässä harjoituksessa emme tarvitse avointa CORS-asetusta.

### Kun jokin ei toimi

| Havainto | Ensimmäinen tarkistus |
| --- | --- |
| Selain ei saa yhteyttä. | Onko palvelin edelleen käynnissä terminaalissa? Ovatko osoite ja portti oikein? |
| Address already in use. | Onko toinen harjoitus tai vanha palvelin portissa 8000? Pysäytä se Ctrl+C:llä. |
| Sivu näyttää vanhan tekstin. | Tallensitko oikean tiedoston, käynnistitkö oikean ohjelman ja päivititkö selaimen? |
| Deno ilmoittaa verkko-oikeuden puuttuvan. | Sisältääkö komento tarkan `--allow-net`-asetuksen? |
| API-pyynnön sijasta avautuu hakukone. | Kirjoititko alkuun `http://` selaimen osoiterivillä? |

**Valmis jatkamaan, kun:** saat 200- ja 404-vastaukset ja osaat näyttää niiden metodin, polun ja tilakoodin kehittäjätyökaluissa. Pysäytä harjoituspalvelin ennen myöhempää Tehtävätaulun käynnistämistä.


---

## 05 Käyttöliittymän designistä tietomalliin

### Mitä tässä opitaan?

Tässä luvussa päätät, mitä sovelluksen täytyy muistaa. Aloitat käyttäjän näkymistä, et tietokannan komennoista. Luvun jälkeen osaat yhdistää näkymän kentän tietokannan sarakkeeseen ja perustella tietojen väliset suhteet.

**Design** tarkoittaa tässä käyttöliittymän ja toiminnan suunnitelmaa. Se voi olla piirros, kuva tai seuraavanlainen tekstikuvaus. **Tietomalli** kuvaa tallennettavat asiat, niiden ominaisuudet ja niiden väliset suhteet. Malli auttaa vastaamaan myös kysymykseen: kenen tietoa tämä on?

### 5.1 Lähtödesign: Tehtävätaulun kolme näkymää

Näkymät voivat olla saman verkkosivun eri tiloja. Erillisiä HTML-tiedostoja ei tarvita. Alla oleva tekstimuoto on samalla kuvallisen suunnitelman saavutettava vaihtoehto.

#### Näkymä R1: Kirjautuminen ja rekisteröityminen

- Sivun pääotsikko on ”Tehtävätaulu”. Alussa näkyy lyhyt ohje: ”Kirjaudu sisään tai luo tunnus.”
- Kirjautumislomakkeessa on näkyvillä nimillä varustetut kentät **Sähköposti** ja **Salasana** sekä painike **Kirjaudu**.
- Rekisteröitymislomakkeessa on samat kentät, ohje ”Salasanan pituus 15–128 merkkiä” ja painike **Luo tunnus**.
- Virhe ilmoitetaan tekstinä lomakkeen yhteydessä. Käyttäjän ei tarvitse päätellä virhettä väristä. Salasanaa ei näytetä virheilmoituksessa.
- Uusi käyttäjä saa tavallisen käyttäjän roolin. Lomakkeella ei valita ylläpitäjän oikeuksia.

**Mitä täytyy muistaa?** Käyttäjän tunniste, sähköpostiosoite, salasanan turvalliseen tarkistamiseen tarvittavat tiedot ja rooli. Kirjautumisen jälkeen tarvitaan myös tieto voimassa olevasta istunnosta. Raakaa salasanaa ei tallenneta.

#### Näkymä R2: Omat projektit

- Pääotsikko on **Omat projektit**. Näkyvissä ovat kirjautuneen käyttäjän sähköposti ja painike **Kirjaudu ulos**.
- Lista näyttää vain kirjautuneen käyttäjän omat projektit. Projektin nimi toimii valintapainikkeena.
- Kun projekteja ei ole, näkyy teksti **Sinulla ei ole vielä projekteja**.
- Lomakkeessa on kenttä **Projektin nimi**, ohje ”1–120 merkkiä” ja painike **Luo projekti**.
- Luomisen jälkeen uusi projekti näkyy listassa. Tallennuksen onnistuminen tai epäonnistuminen ilmoitetaan tekstinä.

**Mitä täytyy muistaa?** Projektin tunniste, nimi, omistaja ja luontihetki. Projektin nimi ei yksin tunnista projektia: kaksi käyttäjää saa nimetä projektinsa samalla tavalla.

#### Näkymä R3: Valitun projektin tehtävät

- Otsikko kertoo valitun projektin nimen. Käyttäjä voi palata projektilistaan.
- Jokaisella tehtävällä on nimi, **Valmis**-valintaruutu sekä nimetty muokkaus- ja poistotoiminto. Valintaruudun saavutettavasta nimestä selviää, mitä tehtävää se koskee.
- Tyhjässä listassa näkyy teksti **Projektissa ei ole vielä tehtäviä**.
- Lisäämislomakkeessa on kenttä **Tehtävän nimi**, ohje ”1–200 merkkiä” ja painike **Lisää tehtävä**.
- Tehtävän nimi voidaan muuttaa, valmis-tila vaihtaa ja tehtävä poistaa. Käyttöliittymä kertoo tallennuksen tuloksen.

**Mitä täytyy muistaa?** Tehtävän tunniste, projekti, nimi, valmis-tila ja luontihetki. Tehtävän omistaja selviää sen projektin kautta. Käyttäjän itse lähettämä väite omistajuudesta ei anna käyttöoikeutta.

### 5.2 Sanasto ennen taulujen piirtämistä

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

### 5.3 Johda tiedot näkyvistä tarpeista

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

### 5.4 Taulut ja suhteet

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

### 5.5 Rajoitteet suojaavat tietojen rakennetta

`NOT NULL` kieltää puuttuvan arvon. `UNIQUE` kieltää kaksoiskappaleen. `CHECK` tarkistaa kentän ehdon. `PRIMARY KEY` yksilöi rivin. `FOREIGN KEY` varmistaa viittauksen olemassa olevaan tietoon. Rajoitteet ovat viimeinen suoja myös silloin, kun virheellinen kirjoitus yrittää ohittaa lomakkeen. [PostgreSQL: rajoitteet](https://www.postgresql.org/docs/17/ddl-constraints.html).

SQLiten mallissa `done` tallennetaan kokonaislukuna: `0` tarkoittaa keskeneräistä ja `1` valmista. HTTP-rajapinnan JSONissa vastaavat arvot ovat `false` ja `true`. PostgreSQL-toteutuksessa sarakkeen tyypiksi voi valita suoraan `BOOLEAN`. Valittu esitystapa kerrotaan mallissa, jotta muunnos tehdään tietoisesti.

Malliratkaisun `created_at` on tekstiä ISO 8601 -muodossa, esimerkiksi `2026-01-15T10:30:00.000Z`. Lopun `Z` tarkoittaa UTC-aikaa. Istunnon `expires_at` on kokonaisluku: millisekuntien määrä Unix-ajan alusta, 1.1.1970 kello 00.00 UTC. Muotojen ero on tietoinen: käyttöliittymälle näytettävä luontihetki on helppo lukea tekstinä, ja istunnon päättymistä verrataan palvelimen millisekunteihin. Älä vertaa sekunteja millisekunteihin. PostgreSQLissa vastaava kokonaisluku tarvitsee `BIGINT`-tyypin; myös aikaleimaan perustuva ratkaisu käy, kun muunnokset ovat johdonmukaiset.

Päätä myös poistamisen vaikutus. `ON DELETE CASCADE` tarkoittaa, että pääkohteen poistaminen poistaa siihen viittaavat alikohteet. Tehtävätaulussa projektin poistaminen voi poistaa sen tehtävät ja käyttäjän poistaminen hänen projektinsa sekä istuntonsa. Dokumentoi tämä sääntö, vaikka käyttöliittymässä ei vielä olisi käyttäjän poistamista. Vaihtoehto on estää poisto, kun alikohteita on olemassa. [PostgreSQL: viiteavaimet](https://www.postgresql.org/docs/17/tutorial-fk.html).

SQLite-yhteydessä viiteavaimet on otettava käyttöön yhteyden asetuksella `PRAGMA foreign_keys = ON`. Sovelluksen yhteyden avaus tekee tämän. Muussa työkalussa avattu uusi yhteys tarvitsee oman asetuksensa. [SQLite: viiteavainten käyttöönotto](https://www.sqlite.org/foreignkeys.html).

### 5.6 Tee, tarkista ja muuta

1. Lue kolme lähtönäkymää. Alleviivaa tallennettavat asiat.
2. Kirjoita taulut, kentät ja suhteet ensin paperille tai tekstieditoriin.
3. Lisää jokaiselle kentälle tietotyyppi sekä tieto pakollisuudesta, oletusarvosta ja rajoista.
4. Merkitse avaimet. Kirjoita jokainen suhde kokonaisena virkkeenä.
5. Vertaa malliin. Kysy erityisesti: mistä palvelin tietää tehtävän omistajan?
6. Kirjoita mallista SQL-skeema. **SQL** on kieli, jolla määritellään ja käsitellään relaatiotietokannan tietoja. Seuraavan toteutusvaiheen koodi näyttää komennot kommentteineen.

**Itsenäinen muutoskortti M1:** Näkymään R3 lisätään vapaaehtoinen **Määräpäivä**. Käyttäjä voi asettaa päivämäärän, muuttaa sitä ja tyhjentää sen. Päivämäärällä ei ole kellonaikaa. Lisää jäljitettävyystaulukkoon uusi rivi, valitse esitysmuoto ja selitä, miten erotat puuttuvan arvon virheellisestä päivämäärästä. Esimerkiksi SQLiteen sopii `NULL` tai teksti muodossa `YYYY-MM-DD`. `NULL` tarkoittaa puuttuvaa arvoa; se ei ole sama kuin merkkijono `"null"`.

Muutoskortti kuuluu pakolliseen harjoitukseen. Valmis perusesimerkki auttaa alkuun; määräpäivä suunnitellaan ja toteutetaan itse. Hyväksyttävän ratkaisun pitää säilyttää vanhat tehtävät ja omistajuuden tarkistukset myös muutoksen jälkeen.

**Tarkista ymmärryksesi:** Jos käyttäjällä A ja käyttäjällä B on molemmilla projekti ”Harjoitukset”, miksi tietokanta ei sekoita niitä? Miksi `tasks.project_id` ei yksin takaa, että tehtävän muokkaaminen on sallittua? Vastaa kahdella tai kolmella virkkeellä ennen siirtymistä toteutukseen.


---

## 06 Tieto talteen: SQL ja SQLite

**Tavoite:** tallennat, haet, muutat ja poistat tietokannan rivejä sekä todistat tiedon säilymisen ohjelman sulkemisen yli. **Esitiedot:** luvut 02 ja 05. **Tarkistuspiste:** `esimerkit/03-tietokanta/db_demo.ts`.

### Tietokanta ei ole taulukko selaimen muistissa

Luvun 03 ensimmäisen frontendin lista häviää sivua ladattaessa. Tässä harjoituksessa tieto kirjoitetaan tiedostoon. **SQLite** on tietokantamoottori, jota oma ohjelma kutsuu suoraan. **PostgreSQL** toimii erillisenä palvelimena, johon ohjelma muodostaa yhteyden. Molemmissa voidaan käyttää relaatiomallia ja SQL:ää, mutta niiden asetukset ja osa SQL-syntaksista eroavat.

**SQL** on tietokannan käsittelykieli. TypeScript järjestää sovelluksen toimintaa, kun taas SQL kertoo, mitä rivejä tietokannasta haetaan tai muutetaan. **Taulu** sisältää samanmuotoisia rivejä. **Rivi** on yksi tallennettu asia. **Sarake** on sen nimetty ominaisuus. **Skeema** kuvaa tietokannan rakenteen ja säännöt.

Deno sisältää tässä tarvittavan `node:sqlite`-moduulin. `node:`-alku on yhteensopivuusrajapinnan nimi; Node.js-ajoympäristöä ei tarvitse asentaa Deno-ohjelman rinnalle. Yhteyden avaamiseen käytetään `DatabaseSync`-luokkaa. Sync kertoo, että sen tietokantakutsut valmistuvat synkronisesti ennen seuraavaa riviä. Se on yksinkertainen opetuksessa, mutta pitkä kysely voi pysäyttää saman palvelinprosessin muun JavaScript-työn siksi aikaa. [Deno: SQLite](https://docs.deno.com/examples/sqlite/).

### Tutoriaali T4: ensimmäinen pysyvä rivi

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

### Muuta ja poista hallitusti

Katso listasta haluamasi rivin tunniste. Alla oleva esimerkki käyttää tunnistetta 1; korvaa se oman rivisi tunnisteella. Lauseen `WHERE id = ?` rajaus kohdistaa operaation valittuun riviin.

```sh
# Merkitse tunnisteen 1 harjoitusrivi tehdyksi; käytä oman rivisi oikeaa tunnistetta.
deno run --check --allow-read=./harjoitus.sqlite --allow-write=./harjoitus.sqlite db_demo.ts done 1
# Poista juuri tunnisteen 1 harjoitusrivi; poistettu rivi ei kuulu seuraavaan listaan.
deno run --check --allow-read=./harjoitus.sqlite --allow-write=./harjoitus.sqlite db_demo.ts delete 1
```

**Odotettu tulos:** `done` vaihtaa valmiustilan arvoon 1. `delete` kertoo yhden muutetun rivin ja poistaa vain valitun rivin. Jos muutettujen rivien määrä on 0, tarkista tunniste; se ei välttämättä tarkoita ohjelmavirhettä.

**Pieni muutos:** lisää teksti `Ainon 'oma' tehtävä`. Teksti sisältää heittomerkkejä, mutta tallennus toimii. SQL:n parametrit huolehtivat siitä, että arvo käsitellään datana. Tyhjää otsikkoa ei hyväksytä. Yli 200 merkin teksti ei myöskään kelpaa.

### SQL-käskyt ilman oletettuja esitietoja

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

### Parametroitu kysely on pakollinen perustaito

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

### Miksi tarkistetaan sekä backendissä että tietokannassa?

Backendin tarkistus tuottaa käyttäjälle ymmärrettävän virheen. Tietokannan rajoite suojaa tietojen eheyttä myös silloin, kun jokin toinen koodipolku yrittää kirjoittaa huonoa tietoa. **Eheys** tarkoittaa, että tietojen sovitut säännöt pitävät: tehtävä ei viittaa olemattomaan projektiin, rooli on sallittu ja sama tunnus ei esiinny kahdesti.

Frontendin tarkistus auttaa käyttäjää kirjoittamaan oikein, mutta asiakas voi ohittaa sen. TypeScript auttaa ohjelmoijaa löytämään virheitä ennen ajoa, mutta verkkosyöte ei muutu luotettavaksi tyyppimerkinnällä. Nämä tarkistukset palvelevat eri tarkoituksia.

### Migraatio: rakenne muuttuu, tiedot säilyvät

**Migraatio** on numeroitu tietokannan rakenteen muutos. Lopullisen esimerkin `01_create_schema.sql` luo ensimmäisen rakenteen, ja `db.ts` merkitsee suoritetun muutoksen `schema_migrations`-tauluun. Kun käynnistät sovelluksen uudelleen, samoja tauluja ei yritetä luoda uutena eikä vanhoja tietoja poisteta.

Älä muokkaa jo käytettyä ensimmäistä migraatiota ja odota, että vanha tietokanta muuttuu itsestään. Esimerkiksi määräpäivän lisääminen tehtävään on uusi muutos numero 2. M1-harjoituksessa laadit uuden SQL-muutoksen ja lisäät sille suorituskirjanpidon. Vanhan version rivien pitää löytyä myös päivityksen jälkeen. Nykyinen esimerkkimigraattori tuntee muutoksen 1; sitä laajennetaan hallitusti M1:ssä.

Kun lisäät uuden migraatiotiedoston, lisää sen polku myös niiden `deno.jsonc`-komentojen rajattuihin `--allow-read`-oikeuksiin, jotka lukevat migraatioita: start, dev, test ja admin. Päivitä vastaavasti käyttämiesi erillisten testikomentojen oikeudet. Uusi tiedosto ei saa lukuoikeutta pelkällä nimeämisellä. Säilytä rajatut oikeudet; `-A` ei ole tähän tarvittava korjaus.

**Transaktio eli tietokantatapahtuma** niputtaa useita tietokantatöitä yhteen. `BEGIN` aloittaa, `COMMIT` vahvistaa ja `ROLLBACK` peruu keskeneräiset muutokset. Jos rakenteen luonti onnistuu mutta sen kirjaaminen epäonnistuu, emme halua puolikasta lopputulosta. Esimerkin migraatio ja kirjanpito tehdään siksi samassa transaktiossa. [SQLite: transaktiot](https://www.sqlite.org/lang_transaction.html).

### Relaatiota luetaan yhdistämällä

Lopullisessa sovelluksessa tehtävän omistaja löytyy projektin kautta. `tasks.project_id` viittaa projektin tunnisteeseen ja `projects.user_id` käyttäjään. **JOIN** yhdistää taulujen rivejä näiden kenttien perusteella. Autorisoinnissa kysymys on: kuuluuko pyydetty tehtävä projektiin, jonka omistaa nykyinen käyttäjä? Vastaukseen tarvitaan tiedot molemmista tauluista.

Tietokannan viiteavain tarkistaa, että projekti on olemassa. Se ei tarkista kirjautuneen käyttäjän oikeutta projektiin. Tämä omistajuustarkistus toteutetaan luvussa 07 backendin kyselyehdoilla. Testaamme myös vieraan käyttäjän tunnisteen, emme vain oman projektin onnellista polkua.

### Kun vaihdat PostgreSQL:ään

Luku 08 näyttää PostgreSQL:n käynnistämisen Dockerissa ja yhteyden tarkistamisen. PostgreSQL-polulla oma sovellus kytketään siihen valitun tekniikan tietokanta-ajurilla. **Ajuri** on kirjasto, joka osaa puhua tietokantapalvelimen kanssa. Samat tiedot, viiteavaimet, validoinnit, transaktiot ja oikeustarkistukset säilyvät vaatimuksina.

Tämän paketin `04-valmis` on SQLite-toteutus. Dockerin PostgreSQL-harjoitus ei automaattisesti siirrä sitä toiseen tietokantaan. SQLite-polulla oma tietokantaosaaminen voidaan osoittaa täysin ilman tätä siirtoa. PostgreSQL:n valitseva opiskelija osoittaa aidon sovellusyhteyden ja pysyvän CRUD-käytön; pelkkä käynnissä oleva kontti ei täytä tietokannan hyödyntämisen vaatimusta.

**Valmis jatkamaan, kun:** olet tehnyt neljä CRUD-toimintoa, osoittanut pysyvyyden uudella ohjelmaprosessilla ja osaat osoittaa koodista parametrin sekä tietokannan rajoitteen.


---

## 07 Rakennetaan koko sovellus turvallisesti

**Tavoite:** yhdistät frontendin, backendin ja tietokannan toimivaksi Tehtävätauluksi. Opit kirjautumisen ja käyttöoikeuksien eron sekä näytät, että väärä toiminto todella estetään. **Esitiedot:** luvut 01–06. **Tarkistuspiste:** `esimerkit/04-valmis` kokonaisuudessaan.

Tämä on materiaalin pisin ohjattu työ. Jaa se useaan työskentelykertaan. Tarkoitus ei ole kirjoittaa koko kirjautumisjärjestelmää yhdellä istumalla tai muistaa kryptografian yksityiskohtia ulkoa. Kirjoitat selitetyt tiedostot vaiheittain, suoritat tarkistukset ja seuraat yhtä pyyntöä koodin läpi.

### Ensin kaksi erillistä päätöstä

**Autentikaatio:** kuka lähettää pyynnön? Syötetty salasana tarkistetaan. Onnistumisen jälkeen palvelin antaa satunnaisen istuntotunnisteen. Seuraavissa pyynnöissä tunniste yhdistetään palvelimella käyttäjään.

**Autorisointi:** saako tämä käyttäjä suorittaa tämän toiminnon tähän kohteeseen? Kirjautumisen jälkeenkin projektin omistaja tarkistetaan. Tavallisella käyttäjällä ei ole ylläpitoroolia. Tällä kurssilla ylläpitäjä saa lukea yhteisiä lukumääriä, mutta ei automaattisesti kaikkien projektien sisältöjä.

**Omistajuus** on yhteys tiedon ja käyttäjän välillä. **Rooli** on nimetty oikeusryhmä, kuten `user` tai `admin`. Omistajuus ratkaisee pääsyn omiin projekteihin. Rooli ratkaisee pääsyn erilliseen tilastotoimintoon. [OWASP: autorisoinnin periaatteet](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html).

### Salasana ei kuulu tietokantaan sellaisenaan

**Tiiviste eli hash** on laskettu esitys tiedosta. Salasanan tallentamiseen tarvitaan siihen tarkoitettu hidas menetelmä. **Suola eli salt** on jokaista tallennusta varten arvottu lisäarvo, joka erottaa saman salasanan eri tallenteet. Suola ei ole salaisuus. **Työmäärä** tarkoittaa, kuinka paljon laskentaa yksi salasanan tarkistaminen vaatii.

Tässä riippuvuudettomassa opetusesimerkissä käytetään ajoympäristön Web Crypto -rajapinnan **PBKDF2-HMAC-SHA-256**-toimintoa, 600 000 kierrosta ja satunnaista 16 tavun suolaa. Salausalgoritmia ei kirjoiteta itse. Tuotantoratkaisun menetelmä valitaan sen uhkamallin ja ajantasaisten ohjeiden perusteella; OWASP suosittelee uusille ratkaisuille ensisijaisesti Argon2id:tä. PBKDF2-esimerkki ei tarkoita, että se olisi kaikkien uusien palvelujen ensisijainen valinta tai että käyttämämme ympäristö olisi FIPS-sertifioitu. [OWASP: salasanojen tallennus](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html).

Kirjautumisessa lasketaan käyttäjän syöttämästä salasanasta uusi tulos samalla tallennetulla suolalla ja työmäärällä. Sitä verrataan tallenteeseen valmiilla `timingSafeEqual`-toiminnolla. **Vakioaikaisen vertailun** tarkoitus on välttää vertailun katkeaminen ensimmäiseen eroavaan tavuun. Se ei tee koko HTTP-pyynnöstä täsmälleen samanpituista.

Sama lyhyt SHA-256-tiivistys ilman tarkoituksenmukaista hidasta salasanamenetelmää ei riitä ihmisen salasanalle. Sen sijaan vahvasti satunnaiselle 32 tavun istuntotunnisteelle käytetään SHA-256-tiivistettä: satunnaista tunnistetta ei arvata samalla tavalla kuin ihmisen valitsemaa sanaa. Tietokannassa on istunnosta vain tiiviste ja voimassaoloaika, selaimessa raaka tunniste.

### Eväste ja istunto käytännössä

Palvelin lähettää vastauksessa `Set-Cookie`-otsakkeen. Selain säilyttää evästeen ja lisää sen soveltuviin myöhempiin pyyntöihin. Frontendin ei tarvitse lukea istuntotunnistetta eikä tallentaa sitä `localStorage`-muistiin.

| Määritys | Mitä se tekee tässä esimerkissä? |
| --- | --- |
| `HttpOnly` | Estää selaimen JavaScriptiä lukemasta evästeen arvoa. Selain voi silti lähettää evästeen pyynnön mukana. |
| `SameSite=Strict` | Rajoittaa evästeen lähettämistä sivustojen välisissä tilanteissa. Tämä on yksi kerros CSRF-suojauksessa. |
| `Path=/` | Evästettä käytetään tämän sovelluksen poluilla. |
| `Max-Age=28800` | Selain säilyttää istuntoevästeen enintään kahdeksan tuntia. Palvelin valvoo omaa vanhenemisaikaansa erikseen. |
| `Secure` HTTPS-ympäristössä | Rajaa evästeen lähettämisen suojattuun yhteyteen. Paikallisessa HTTP-harjoituksessa tätä lippua ei aseteta. |
| Ei `Domain`-määritystä | Eväste kuuluu asetuksen antaneelle isännälle. |

Uloskirjautuminen poistaa istunnon palvelimen tietokannasta ja käskee selainta poistamaan evästeen. Myös talteen kopioitu vanha tunniste lakkaa silloin toimimasta. Uusi kirjautuminen vaihtaa tunnisteen; selain ei saa valita kirjautumisen jälkeistä tunnistetta itse. [OWASP: istunnon hallinta](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html).

`APP_ORIGIN=https://...` kertoo sovellukselle julkisen alkuperän ja ottaa Secure-evästeen käyttöön. Asetus **ei itsessään rakenna TLS-yhteyttä**. Etäjulkaisu vaatii toimivan HTTPS-palvelun esimerkiksi oikein määritellyn käänteisen välityspalvelimen kautta. **Käänteinen välityspalvelin** vastaanottaa selaimen yhteyden ja välittää pyynnön backendille. Kurssin ensimmäinen suoritus tehdään paikallisesti.

### Mikä on CSRF ja miksi Origin tarkistetaan?

**CSRF** tarkoittaa yritystä saada käyttäjän selain lähettämään muutos omilla evästeillään toiselta sivustolta. Tässä API hyväksyy muutospyynnön vain, kun `Origin` on täsmälleen asetettu `http://localhost:8000` ja sisältötyyppi on JSON. Puuttuva alkuperä ja arvo `null` hylätään myös. Tämä koskee rekisteröintiä, kirjautumista, uloskirjautumista ja kaikkia tietojen muutoksia.

Selaimen oma JavaScript ei voi vapaasti väärentää `Origin`-otsaketta. Erillinen HTTP-työkalu voi asettaa sen, joten Origin ei todista käyttäjän henkilöllisyyttä: autentikaatio ja autorisointi tarvitaan lisäksi. Tämä on tarkoituksella rajattu samaa alkuperää käyttävän JSON-API:n suojausmalli. Jos arkkitehtuuriin lisätään tavallisia HTML-lomakekirjoituksia, useita alkuperiä tai muita tunnistetapoja, CSRF-ratkaisu arvioidaan uudelleen; esimerkiksi istuntoon sidottu CSRF-tunniste on toinen tavallinen ratkaisu. [OWASP: CSRF:n torjunta](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html).

### Tutoriaali T5A: tee projektille oma paikka

Luo `backend-kurssi`-hakemistoon `04-valmis`. Älä kopioi aiemmasta harjoituksesta `harjoitus.sqlite`-tiedostoa tähän. Lopullisella sovelluksella on oma malli ja oma `data/tehtavataulu.sqlite`. Luo ensin seuraavat tiedostot tässä järjestyksessä. Jokaisen kokonainen kommentoitu sisältö löytyy koodipankista täsmälleen samalla polulla.

| Vaihe | Luo tai täytä | Miksi juuri tämä tiedosto? |
| --- | --- | --- |
| 1 | `01_create_schema.sql` | Tietokannan neljä varsinaista taulua ja niiden säännöt. |
| 2 | `db.ts` | Yhteyden avaaminen ja version 1 migraation hallinta. |
| 3 | `security.ts` | Salasanan käsittely, istuntotunniste, eväste ja yritysrajoitus. |
| 4 | `security_demo.ts` | Pieni erillinen koe juuri luoduille turvatoiminnoille. |

**Moduuli** on oma tiedosto, jonka nimiä voi tuoda toisiin tiedostoihin. `export` antaa nimen muiden käyttöön ja `import` ottaa sen käyttöön. Tuonti `./security.ts` viittaa samassa hakemistossa olevaan tiedostoon. Tiedostopääte kirjoitetaan mukaan. `import type` tuo vain tyyppitiedon eikä aloita esimerkiksi tietokantayhteyttä.

Suorita terminaalissa `04-valmis`-hakemistossa:

```sh
# Tarkista tietokantamoduulin tyypit avaamatta vielä tietokantaa.
deno check db.ts
# Tarkista turvatoiminnot ja suorita pieni salasanakoe; verkkolupaa ei tarvita.
deno run --check security_demo.ts
```

**Odotettu tulos:** sama salasana tuottaa eri suolan ja eri tiivisteen. Oikean salasanan hyväksyntä on `true`, väärän `false`, ja istunnon tallenne eroaa raakatunnisteesta. Laskenta saa kestää hetken; hitaus on tässä osa salasanan suojausta. **Tarkistuspiste:** osoita tiedostosta rivi, joka tuottaa suolan, ja eri rivi, joka tarkistaa salasanan.

### Tutoriaali T5B: lisää syötteiden tarkistus ja sovellussäännöt

Luo seuraavaksi `http.ts`, `auth.ts` ja `projects.ts` koodipankin mukaan. Tarkista jokainen tiedosto heti tallennuksen jälkeen.

```sh
# Tarkista JSONin, kenttien ja virheiden käsittelymoduuli.
deno check http.ts
# Tarkista kirjautumis- ja istuntotoiminnot sekä niiden tuonnit.
deno check auth.ts
# Tarkista projekti- ja tehtävätoiminnot omistajuussääntöineen.
deno check projects.ts
```

**Odotettu tulos:** tarkistin ei ilmoita tyyppivirheitä. Se ei kuitenkaan vielä todista, että oikeudet toimivat; ne testataan myöhemmin. Jos import-tiedostoa ei löydy, vertaa tiedoston nimeä ja hakemistoa ennen koodin muuttamista.

`http.ts` käsittelee tuntemattoman verkkosyötteen. `unknown` tarkoittaa, että muoto on ensin tarkistettava. JSONin on oltava olio, nimien tekstiä ja valmiustilan oikea totuusarvo. Projektin nimi on 1–120 ja tehtävän nimi 1–200 Unicode-koodipistettä reunavälien poistamisen jälkeen. Salasanan pituus on 15–128 koodipistettä; salasanaa ei trimmata eli siitä ei poisteta välilyöntejä.

Koko JSON-pyynnön enimmäiskoko on 16 KiB eli 16 × 1024 tavua. **Tavu** on tiedon koon yksikkö; yksi näkyvä merkki voi olla useampi tavu. Koodipiste ja näkyvä kirjoitusmerkki eivät myöskään ole kaikissa kielissä sama asia. Tavuraja suojaa suurilta pyynnöiltä, kenttäkohtainen raja pitää datan sovitussa muodossa.

`auth.ts` tarkistaa tunnuksen ja luo istunnon. Epäonnistunut kirjautuminen antaa saman yleisen viestin riippumatta siitä, onko tunnus tuntematon vai salasana väärä. Sähköposti yhdenmukaistetaan poistamalla reunavälit ja vaihtamalla kirjaimet pieniksi. Tämä on sovelluksen tunnuskäytäntö; se ei todista osoitteen omistajuutta.

`projects.ts` ei luota selaimen `user_id`-kenttään. Se saa kirjautuneen käyttäjän palvelimen istuntokäsittelystä. Projektin hakuun liitetään käyttäjän tunniste, ja tehtävän omistaja tarkistetaan sen projektin kautta. Päivityksessä `done` ei saa olla merkkijono `"false"`: vain oikea JSON-totuusarvo kelpaa. Ylimääräiset kentät, kuten itse ehdotettu rooli, hylätään.

**Tarkistuspiste:** löydä kolme eri kohtaa: kentän tyypin tarkistus, SQL:n parametri ja projektin omistajuusehto. Ne ratkaisevat eri ongelmat. Selitä erot ennen jatkamista.

### Tutoriaali T5C: kytke osat yhteen

Luo `app.ts`, `main.ts`, `deno.jsonc`, `integration_test.ts` ja hakemisto `seed`, jonka sisään tulee `admin.ts`. Luo `public`-hakemisto ja täytä sinne `index.html`, `styles.css` ja `app.js` koodipankista. Jos käytät valmista ZIP-tarkistuspistettä, nämä ovat jo mukana. Täydellisessä esimerkissä ei ole korvattavia kolme pistettä sisältäviä koodiaukkoja.

Valmiin testitiedoston käyttöönotto ja ajaminen kuuluu ohjattuun harjoitteluun. Se ei tarkoita, että aloittelijan pitäisi tässä vaiheessa kirjoittaa koko testiautomaatio itsenäisesti. P8:n ja P9:n testinäytöt ovat pakollisia kaikilla poluilla; oman laajan automaation rakentaminen on lisätehtävä L1.

| Tiedosto | Vastuu |
| --- | --- |
| `app.ts` | Yhdistää reitit, virheenkäsittelyn ja staattisten tiedostojen tarjoilun. |
| `main.ts` | Lukee asetukset, avaa tietokannan ja käynnistää verkkopalvelimen. |
| `deno.jsonc` | Nimeää pitkät käynnistys- ja testikomennot lyhyiksi taskeiksi. JSONC sallii kommentit. |
| `integration_test.ts` | Kokeilee oikeita HTTP-käsittelijöitä eristetyillä tietokannoilla. |
| `seed/admin.ts` | Antaa jo luodulle harjoituskäyttäjälle ylläpitoroolin paikallisella hallintakomennolla. |
| `public/index.html` | Semanttinen sivurakenne ja lomakkeet. |
| `public/styles.css` | Luettava ulkoasu, mukautuminen ja näkyvä näppäimistökohdistus. |
| `public/app.js` | Lomakkeiden käsittely, API-pyynnöt, tilaviestit ja listojen turvallinen näyttäminen. |

**Tehdasfunktio** tarkoittaa tässä funktiota, joka luo ja palauttaa toisen toiminnon. `createApp` tuottaa pyyntöjä käsittelevän funktion, mutta ei käynnistä porttia. `main.ts` antaa sen `Deno.serve`-toiminnolle. Testi voi kutsua samaa käsittelijää ilman verkkoa. Näin testi käyttää todellista sovelluslogiikkaa.

```sh
# Tarkista valmiin kokonaisuuden TypeScript-tiedostot ja testikoodi.
deno task check
# Käynnistä koko sovellus asetustiedoston selitetyillä oikeuksilla.
deno task start
```

**Odotettu tulos:** terminaali kertoo avattavan osoitteen. Avaa **http://localhost:8000**. Näet Tehtävätaulun kirjautumissivun. Ensimmäinen käynnistys luo tietokannan ja ensimmäisen migraatiomerkinnän. Käytä tätä tarkkaa osoitetta myös myöhemmin. Suoraan tiedostosta avattu lopullinen HTML, Live Serverin eri portti tai osoite `127.0.0.1` ei vastaa oletettua Origin-asetusta.

Staattiset tiedostot tarkoittavat tässä valmiita HTML-, CSS- ja JavaScript-tiedostoja. Backend tarjoaa vain oman sallittujen tiedostojen luettelonsa sisällöt. Tietokantaa, asetuksia tai TypeScript-lähteitä ei anneta selaimelle pyydettyä URL-polkuakaan muuttamalla.

### Tutoriaali T5D: kokeile käyttäjän koko polku

1. Luo harjoitustili A, esimerkiksi `aino@example.test`. Valitse vain tähän paikalliseen harjoitukseen tarkoitettu vähintään 15 merkin salasana.
2. Tarkista, että kirjautuneen käyttäjän tieto näkyy. Rekisteröinti kirjautuu tässä esimerkissä automaattisesti sisään.
3. Luo projekti nimeltä `Backend-harjoitukset` ja avaa sen tehtävät.
4. Lisää tehtävä `Selitä frontend ja backend`. Muuta nimeä, merkitse tehtävä valmiiksi ja tarkista muuttunut tila.
5. Päivitä selain. Tiedon pitää edelleen löytyä. Luo vielä toinen tehtävä ja poista se.
6. Pysäytä backend Ctrl+C:llä ja käynnistä uudelleen. Säilytetyn tehtävän pitää löytyä edelleen.
7. Kirjaudu ulos. Omien projektien ei pidä enää näkyä, ja suojattu API ilman istuntoa antaa 401-vastauksen.

**Odotettu tulos:** luonti, muutos, luku ja poisto toimivat. **Jos 403 ilmestyy heti:** tarkista selaimen alkuperä. **Jos 415 ilmestyy:** tarkista JSON-sisältötyyppi. **Jos 429 ilmestyy:** yritysraja on ylittynyt, lue odotusohje. Älä korjaa näitä poistamalla turvatarkistuksia.

Yritysrajoitus sallii tässä paikallisessa esimerkissä enintään 5 kirjautumisyritystä samaa sähköpostia kohti ja 20 samaa IP-osoitetta kohti 15 minuutissa. Rekisteröintejä sallitaan 10 samasta IP-osoitteesta samassa ajassa. Onnistuneetkin yritykset lasketaan. Laskurit ovat yhden prosessin muistissa. Tuotannossa on arvioitava jaettu laskurivarasto, usean palvelimen toiminta, yhteisen IP-osoitteen käyttäjät ja palvelunestotilanteet.

### Tutoriaali T5E: toinen käyttäjä ja ylläpitäjä

Avaa toinen selainprofiili tai yksityinen ikkuna ja luo harjoituskäyttäjä B, esimerkiksi `boris@example.test`. Saman selainprofiilin toinen välilehti yleensä jakaa evästeen, joten se ei yksin luo erillistä kirjautumista.

Varmista, ettei B näe A:n projekteja. Käyttöliittymän näkymä ei vielä riitä: luvussa 09 ja P8:ssa lähetetään myös suora pyyntö A:n kohteen tunnisteella. Jokaisen vieraan luku-, lisäys-, muutos- ja poistoyrityksen pitää estyä. A:n tiedon pitää säilyä entisellään.

Luo tavallisella rekisteröinnillä kolmas harjoitustili, esimerkiksi `yllapitaja@example.test`. Pysäytä tarvittaessa palvelin ja suorita **samassa `04-valmis`-hakemistossa** hallintakomento:

```sh
# Ylennä oma jo rekisteröity harjoituskäyttäjä ylläpitäjäksi paikallisella komennolla.
# Sähköpostiosoite on taskin jälkeinen argumentti seed/admin.ts-ohjelmalle.
deno task admin yllapitaja@example.test
```

Käynnistä palvelin uudelleen, jos pysäytit sen. Kirjaudu tällä tilillä ja päivitä näkymä. Tilastot ovat käytettävissä. Tavallinen käyttäjä saa `GET /api/admin/stats` -reitistä 403, kirjautumaton 401 ja ylläpitäjä 200. Roolin voi muuttaa vain palvelimen hallintaoikeuden haltija; julkista ”tee minusta admin” -rajapintaa ei ole.

**Tarkistuspiste:** lisää erilliseen rekisteröintitestipyyntöön ylimääräinen `role`-kenttä arvolla `admin`. Pyyntö hylätään. Vaihtoehtoisella tekniikalla kentän hallittu sivuuttaminen on myös hyväksyttävää, kun rooli pysyy tavallisena käyttäjänä ja testi todistaa sen.

### Turvasanasto sidottuna omaan koodiin

| Käsite | Mitä se tarkoittaa? | Miten tätä kokeillaan? |
| --- | --- | --- |
| Validointi | Arvon tyypin, muodon, koon ja sallittujen arvojen tarkistus. | Lähetä nimi numerona tai valmis-tila tekstinä. |
| SQL-injektio | Syöte pyrkii muuttamaan SQL-kyselyn rakennetta. | Tallenna SQL:ltä näyttävä teksti; kyselyn tulosjoukko ei laajene. |
| XSS | Käyttäjän teksti päätyy selaimessa suoritettavaksi koodiksi. | HTML:ltä näyttävä nimi näkyy pelkkänä tekstinä. |
| CSRF | Vieras sivusto yrittää tehdä muutoksen käyttäjän istunnolla. | Väärä tai puuttuva Origin hylätään. |
| IDOR / BOLA | Toisen kohteen tunnisteella pääsee toisen tietoihin puutteellisen oikeustarkistuksen vuoksi. | Käyttäjä B lähettää A:n tehtävän tunnisteen. |
| Rate limit | Rajoitetaan yritysten määrää aikavälissä. | Hallittu testi saavuttaa rajan ja saa 429-vastauksen. |
| CSP | Content Security Policy rajaa sivun sallittuja sisältölähteitä ja suorituksia. | Inline-hyökkäyskoodi ei ole sallittua, mutta myös näyttötapa on turvallinen. |
| Salaisuus | Tieto, jolla voi käyttää rajattua palvelua tai tunnistautua. | Salasana, evästeen raakasisältö ja tietokannan tunnus eivät päädy palautukseen. |

Frontend käyttää käyttäjän tekstille `textContent`-ominaisuutta tai lomakekentän `value`-ominaisuutta. Se ei lisää sitä `innerHTML`-ominaisuudella HTML-koodiksi. CSP ja HttpOnly ovat lisäsuojia; kumpikaan ei yksin korjaa kaikkia XSS-seurauksia. [OWASP: XSS:n ehkäisy](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html).

### Mitä tästä vielä puuttuu laajassa oikeassa palvelussa?

Esimerkki opettaa aidon kirjautumisen ja käyttöoikeudet paikallisessa oppimisympäristössä. Mukana ei ole sähköpostiosoitteen vahvistamista, salasanan palauttamista, monivaiheista tunnistamista, jaettua yritysrajoitusta tai tuotantoympäristön HTTPS-asennusta. Rekisteröinnin ristiriitavastaus voi antaa vihjeen tunnuksen olemassaolosta, vaikka kirjautumisvirhe on yleinen. Näitä rajoja arvioidaan P9:ssa.

Synkroninen SQLite ja yhden prosessin muistitilat ovat tarkoituksenmukainen aloitus. Kasvavan palvelun työmäärä, rinnakkaisuus, varmuuskopiot, seuranta ja tunnistuspalvelun valinta vaativat erilliset päätökset. Pakollinen harjoitus on tunnistaa oman ratkaisun raja ja perustella seuraava parannus. Kaikkea tuotantopalvelun infrastruktuuria ei tarvitse toteuttaa hyväksyttyyn perussuoritukseen.

**Valmis jatkamaan, kun:** oma sovellus toimii selaimessa, tunnet vähintään kahden käyttäjän eri tietojen rajat ja osaat osoittaa salasanan, istunnon, validoinnin ja omistajuuden tarkistukset koodista. Seuraavaksi samat havainnot muutetaan toistettavaksi testinäytöksi.


---

## 08 Dockerin perusteet tekemällä

### Mitä tässä opitaan?

Käynnistät PostgreSQL-tietokannan Dockerilla, lisäät tietoa, poistat kontin ja osoitat, että tieto säilyy. Tämä luku kuuluu kaikille suorituspoluille. Jos varsinainen sovelluksesi käyttää SQLiteä, pidät sen ennallaan ja teet tämän erillisen labran.

**PostgreSQL**, lyhyesti Postgres, on tietokantapalvelin. Se on jatkuvasti käynnissä oleva ohjelma, johon toinen ohjelma muodostaa tietokantayhteyden. **SQLite** taas toimii sovelluksen käyttämänä kirjastona ja tallentaa tietoa tiedostoon. Sille ei tässä esimerkkipolussa käynnistetä erillistä tietokantapalvelinta.

### 8.1 Sanat ensin

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

### 8.2 Valmistele työkalut ja tiedostot

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

### 8.3 Lue Compose-tiedosto ennen käynnistystä

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

### 8.4 Käynnistä ja katso, mitä tapahtui

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

### 8.5 Lisää yksi rivi ja lue se takaisin

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

### 8.6 Todista, että data säilyy

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

### 8.7 Tavalliset pysähdykset

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


---

## 09 Testaa, selvitä virhe ja luovuta ymmärrettävä työ

**Tavoite:** osoitat toiminnan toistettavalla kokeella ja osaat kertoa, mitä koe todistaa. **Esitiedot:** luku 07 ja käynnistyvä `04-valmis`-sovellus. **Tarkistuspisteet:** `integration_test.ts`, `oikeuskoe_test.ts` ja `csrfkoe_test.ts`.

### Onnistumisen lisäksi testataan kielto

**Testi** on ennalta määritelty koe ja sen odotettu tulos. Pelkkä ”kokeilin ja tuntui toimivan” ei kerro, mitä tarkistettiin. Testi voi olla käsin tehty tai automaattinen. **Testiautomaatio** suorittaa kokeen ohjelmalla niin, että sen voi toistaa samalla tavalla.

**Positiivinen testi** tarkistaa sallitun toiminnon, kuten oman tehtävän muokkauksen. **Negatiivinen testi** tarkistaa estettävän toiminnon, kuten toisen käyttäjän tehtävän muokkauksen. Kielteinen tulos on siis negatiivisessa testissä onnistuminen. Oikeuksien testaaminen pelkän käyttöliittymän kautta ei riitä, koska käyttäjä voi lähettää pyynnön myös suoraan rajapintaan.

**Yksikkötesti** tarkistaa rajatun toiminnon. **Integraatiotesti** tarkistaa, että useat osat toimivat yhdessä; tässä pyynnön käsittely käyttää oikeaa SQL-tietokantaa. **Selainpolun testi** käyttää lisäksi käyttöliittymää selaimessa. Yksi laji ei korvaa kaikkia muita. [Deno: testaus](https://docs.deno.com/runtime/test/).

### Tutoriaali T6A: aja esimerkin testit

Avaa terminaali `04-valmis`-hakemistoon. Tavallisen sovelluksen ei tarvitse olla käynnissä. Testit kutsuvat samaa `createApp`-pyyntökäsittelijää suoraan, joten ne eivät tarvitse vapaata porttia eivätkä verkkolupaa.

```sh
# Tarkista esimerkin päämoduulit ja testien TypeScript-tyypit.
deno task check
# Aja 11 laajempaa integraatiotestiä omilla eristetyillä tietokannoillaan.
deno task test
```

**Odotettu tulos:** lopussa on 11 hyväksyttyä testiä ja 0 epäonnistunutta. Kukin nimetty testikokonaisuus voi sisältää useita tarkistuksia. Testit eivät käytä omien harjoitustiliesi tietokantaa. Pysyvyyden kokeessa luodaan oma väliaikainen alihakemisto `data`-hakemiston alle ja poistetaan vain tämä testin luoma hakemisto.

| Testikokonaisuus | Mitä sillä osoitetaan? |
| --- | --- |
| Rekisteröinti ja tallenteet | Suolatut salasanat ja istuntojen tiivisteet, rajattu julkinen käyttäjävastaus. |
| Kirjautuminen ja uloskirjautuminen | Uusi tunniste syntyy ja vanha lakkaa toimimasta. |
| Istunnon vanheneminen | Käyttö estyy täsmälleen sovitulla aikarajalla. |
| Kaksi käyttäjää | Vieraan projektin tai tehtävän luku, luonti, muutos ja poisto estyvät. |
| Roolit ja omistajan väärentäminen | Asiakas ei saa korottaa oikeuksiaan. |
| Origin, JSON ja koko | Palvelin hylkää väärän alkuperän, väärän muodon ja liian suuren sisällön. |
| SQL:ltä ja HTML:ltä näyttävä teksti | Sisältö säilyy datana eikä muuta SQL:n rakennetta. |
| Julkisten tiedostojen rajaus | Lähdekoodi ja tietokanta eivät ole selaimen ladattavissa. |
| Epäonnistunut kirjautuminen | Yleinen virhe ja yritysrajoitus toimivat. |
| Pysyvyys ja eheys | Uudelleenavaus säilyttää tiedon; migraatio ei toistu ja viiteavaimet toimivat. |
| HTTPS-eväste | Suojatun julkisen alkuperän asetuksessa evästeellä on Secure-lippu. |

SQL-testi ei todista XSS-suojauksen toimivuutta selaimessa. Tee siksi myös P9:n näyttö, jossa HTML:ltä näyttävä teksti näkyy käyttöliittymässä pelkkänä tekstinä eikä synnytä uutta HTML-elementtiä. Secure-lipun testi ei puolestaan todista TLS-palvelimen oikeaa asennusta: ne ovat eri tarkistuksia.

### Tutoriaali T6B: kirjoita pieni oikeustesti mukana

Luo `oikeuskoe_test.ts` ja kopioi koodipankin saman tiedoston koko sisältö. Tämä on pieni erillinen koe, jonka voi käydä läpi rivi riviltä ennen laajaa testitiedostoa. Se luo A:n ja B:n, luo A:lle projektin ja yrittää lisätä siihen tehtävän B:nä.

```sh
# Suorita vain pieni omistajuuskoe; muistikanta ei tarvitse kirjoituslupaa.
deno test --no-prompt --allow-read=./01_create_schema.sql oikeuskoe_test.ts
```

**Odotettu tulos:** yksi testi hyväksytään. Siinä on kolme ajatusta: valmistele tilanne, suorita kokeiltava toiminto ja vertaa tulosta odotukseen. Lopuksi yhteys suljetaan myös mahdollisen virheen jälkeen. `assert.equal` epäonnistuu, jos arvot eroavat, ja `assert.ok` vaatii totuudellisen eli hyväksyttävän arvon.

**Tarkistuspiste:** osoita testistä, missä käytetään A:n evästettä ja missä B:n. Osoita sen jälkeen kaksi eri tarkistusta: estävä HTTP-koodi ja tietokannan muuttumattomuus omistajan uuden lukupyynnön kautta. Virhekoodi yksin ei riittäisi, jos luvaton kirjoitus olisi silti tapahtunut.

**Pieni muutos:** lisää saman testin sisään B:n lukuyritys A:n projektin tehtäviin ja odota 404-vastausta. Älä muuta sovelluksen oikeussääntöjä testin läpäisemiseksi. Seuraava soveltava askel on ulottaa tämä suoja M1-määräpäivään. Laaja testitiedosto on vertailumalli, ei opiskelijan oman muutoksen valmis ratkaisu.

### Tutoriaali T6C: väärä alkuperä kelvollisella istunnolla

Luo `csrfkoe_test.ts` koodipankin mukaan. Tämä koe erottaa CSRF-suojauksen kirjautumisesta ja omistajuudesta. Testillä on kelvollinen istunto ja käyttäjän oma tehtävä, mutta muutospyynnössä on väärä tai puuttuva Origin. Jos testaisimme vain rekisteröintiä ilman istuntoa, emme vielä osoittaisi kirjautuneen käyttäjän tiedon säilymistä tällaisessa tilanteessa.

```sh
# Aja erillinen kirjautuneen käyttäjän CSRF-koe muistitietokannalla.
deno test --no-prompt --allow-read=./01_create_schema.sql csrfkoe_test.ts
```

**Odotettu tulos:** yksi testi hyväksytään. Sekä väärän että puuttuvan Originin PATCH-pyyntö palauttaa 403:n, ja käyttäjän oma uusi GET-pyyntö palauttaa edelleen alkuperäisen nimen sekä keskeneräisen tilan. Koodissa tarkistetaan erikseen nämä kolme havaintoa. Testissä oleva istunto on voimassa koko kokeen ajan.

**Pieni muutos:** laajenna sama ajatus M1-määräpäivään. Selvitä, missä sovelluksen ajonaikainen tarkistus toimii ja missä testin muuttumattomuus todistetaan. P9:n näytön pitää kattaa myös itse lisäämäsi ominaisuus.

### Mikä on testikello?

Istunto kestää kahdeksan tuntia, mutta testissä ei odoteta kahdeksaa tuntia. Sovelluskäsittelijälle voi antaa `now`-funktion. Normaalisti se on `Date.now`. Testissä se palauttaa testin hallitseman luvun. **Riippuvuuden antaminen ulkopuolelta** tarkoittaa tässä juuri tätä: kello saadaan asetuksena, joten sen toimintaa voi hallita muuttamatta oikean käyttäjän koneen aikaa.

Testi tarkistaa ajan juuri ennen vanhenemista ja sen rajalla. Näin voi huomata esimerkiksi sekunnin ja millisekunnin sekoittamisen. **Rajatapaus** on sallittujen ja hylättävien arvojen reunalla oleva koe: tyhjä nimi, pisin sallittu nimi ja yksi merkki liikaa ovat kaikki hyödyllisiä.

### Käsin tehtävä oikeuskoe selkeinä vaiheina

1. Kirjaudu A:na ja luo projekti sekä tehtävä. Kirjaa palautetut numeeriset tunnisteet.
2. Kirjaudu B:nä eri selainprofiilissa. Tee B:n oma projekti varmistaaksesi, että kirjautuminen toimii.
3. Lähetä B:n istunnolla suora pyyntö A:n projektin tunnisteeseen. API-työkalu voi olla oma automaattinen testi tai HTTP-pyyntöihin tarkoitettu ohjelma.
4. Kokeile vieraan projektin listauksen lisäksi lisäystä, tehtävän muokkausta ja poistoa. Käytä oikeita Content-Type- ja Origin-otsakkeita, jotta todella testaat omistajuutta etkä vain väärää pyyntömuotoa.
5. Lue A:n omalla istunnolla projekti uudelleen. Varmista, ettei yksikään estetty toiminto muuttanut tietoa.
6. Toista erikseen väärän Originin koe kelvollisella omalla istunnolla. Näin CSRF-suojaus ja omistajuussuojaus eivät peitä toisiaan.

Jos testaat selaimen kehittäjäkonsolilla, selain asettaa Originin ja lähettää saman alkuperän evästeet itse. Originin tarkoitukselliseen väärentämiseen käytetään tämän vuoksi erillistä HTTP-testiä. Älä tulosta tai liitä palautukseen evästeen raakaa arvoa. P8:n taulukko määrittää kaikki pakolliset omistajuus- ja roolikokeet.

### Kun testi epäonnistuu

Lue ensimmäinen epäonnistunut tarkistus. Kirjoita talteen odotettu tulos ja todellinen tulos. Paikanna sitten vastuu: oliko pyyntö väärä, torjuiko validointi sen ennen oikeuskoetta, puuttuiko istunto vai oliko SQL-ehto puutteellinen? Muuta yhtä asiaa kerrallaan ja suorita sama testi uudelleen.

| Havainto | Mitä se usein tarkoittaa? |
| --- | --- |
| Odotin 404:ää mutta sain 401:n. | Testissä ei ole voimassa olevaa käyttäjäistuntoa. |
| Odotin oikeustestiä mutta sain Origin-virheen. | Pyyntö ei vielä pääse autorisointiin; anna oikea Origin omistajuuskokeessa. |
| Odotin 201:tä mutta sain 400:n. | Syötteen muoto, sallittu kenttä tai pituus ei täsmää sopimukseen. |
| Odotin 200:aa mutta saan 429:n. | Samalla testipalvelimella on jo ylitetty yritysraja. Käytä eristettyä testiä. |
| Muutos näkyy väärässä kannassa. | Komento ajettiin väärässä hakemistossa tai asetettu tiedostopolku eroaa. |
| Tuntematon API-polku antaa kirjautumattomana 401:n. | Koko suojatun API-alueen tunnistaminen tehdään ensin. Testaa 404 kirjautuneena tai julkisella tuntemattomalla polulla. |
| Palvelin toimii mutta nappi ei tee mitään. | Katso selaimen Console sekä Network; backendin terminaali ei näytä kaikkia frontend-virheitä. |

**Regressio** on aiemmin toimineen ominaisuuden rikkoutuminen muutoksessa. Kun lisäät määräpäivän, aja myös vanhat testit. Uusi kenttä ei saa avata omistajuutta tai rikkoa vanhojen rivien lukemista. Lisätehtävä L1 laajentaa opiskelijan omat kokeet automaattiseksi suojaksi. Pakolliset kielteiset kokeet tehdään silti kaikilla poluilla, vaikka kaikkia ei automatisoitaisi.

### Git: tallenna työn vaiheet

**Git** on versionhallintatyökalu. Se säilyttää nimettyjä muutoskokonaisuuksia ja näyttää, mitä muuttui. **Repository eli repositorio** on projektin versionhallittu kokonaisuus. **Commit** on siihen tallennettu muutoskokonaisuus. GitHub ja muut vastaavat palvelut voivat säilyttää Git-repositorioita verkossa; Gitin paikallinen käyttö ei itsessään julkaise työtä.

Asenna Git oman käyttöjärjestelmäsi [virallisen asennusohjeen](https://git-scm.com/install/) mukaan. Tarkista `git --version`. Tee versionhallinta oman työsi hakemistossa, jossa projektin tiedostot ovat. `.gitignore` rajaa esimerkiksi tietokannat ja paikalliset salaisuudet pois uudesta seurannasta. Se ei poista jo historiaan tallennettua salaisuutta.

**Tee ennen seuraavia komentoja:** kopioi puretun materiaalipaketin juuressa oleva `.gitignore` oman `backend-kurssi`-hakemistosi juureen. Lähde on siis paketissa samassa hakemistossa kuin tämä materiaalin README, kohde samassa hakemistossa, jossa aiot suorittaa `git init`. Jos olet rakentanut vain erillisen `04-valmis`-projektin ja versionhallinta tulee sen sisälle, kopioi sen sijaan tiedosto `esimerkit/04-valmis/.gitignore` oman `04-valmis`-hakemistosi juureen. Jos alussa pisteellä alkava tiedosto ei näy tiedostonhallinnassa, avaa sen sisältö koodipankista ja luo editorissa täsmälleen nimetty `.gitignore`. Tallenna tiedosto ennen `git add` -komentoa. Pelkkä toisessa hakemistossa oleva mallipaketin `.gitignore` ei suojaa omaa työtäsi.

```sh
# Luo omaan projektihakemistoosi paikallinen Git-repositorio.
git init
# Aseta tähän repositorioon oma nimesi; korvaa esimerkkiteksti ennen suorittamista.
git config user.name "Oma nimi"
# Aseta oma tähän työhön käyttämäsi sähköposti; tämä on commitin tekijätieto.
git config user.email "oma-osoite@example.test"
# Katso, mitkä tiedostot Git tunnistaa ja varmista, etteivät data tai .env ole mukana.
git status
# Valitse sallitut projektitiedostot seuraavaan tallennukseen .gitignore huomioiden.
git add .
# Tarkista valittujen muutosten sisältö ennen tallennusta; poistu pitkästä näkymästä q-näppäimellä.
git diff --cached
# Tallenna ensimmäinen toimiva vaihe selkeällä viestillä.
git commit -m "Lisää toimiva paikallinen Tehtävätaulu"
# Näytä lyhyt muutoshistoria, josta saat palautuksen tarkistettavan version.
git log --oneline
```

Jos `git status` näyttää tietokannan, `.env`-tiedoston tai salaisuuden, keskeytä ennen committia ja korjaa rajaus. Oppimistyön versionhallinta ei tarvitse suurta komentomäärää: tavoite on, että esimerkiksi tietomallin muutos, sen toteutus ja testit ovat jäljitettävissä. [Git: aloitustutoriaali](https://git-scm.com/docs/gittutorial).

### Dokumentaatio, loki ja luovutus

**README** on projektin aloitusohje. Toinen opiskelija saa sen avulla asennettua, käynnistettyä ja testattua työn. Kirjaa teknologioiden versiot, tiedostorakenne, asetukset ilman salaisuuksia, tietokannan alustus, migraatiot, käynnistys, testit ja tunnetut rajat. Liitä API-taulukko ja tietomallin kuvaus.

**Loki** on ohjelman toiminnasta syntyvää kirjattua tietoa. Loki voi auttaa selvittämään virheen, mutta salasanaa, koko pyyntörunkoa ja istuntotunnistetta ei tulosteta siihen. Esimerkki palauttaa odottamattomasta virheestä yleisen vastauksen eikä sisäistä virhepinoa. **Virhepino** on ohjelman suorituskohtien luettelo, josta voi näkyä sisäisiä tiedostopolkuja.

**CI eli jatkuva integraatio** tarkoittaa muutosten automaattista tarkistusta esimerkiksi versionhallinnan yhteydessä. **CD eli jatkuva toimitus tai julkaisu** tarkoittaa tarkistetun version valmistelua tai viemistä käyttöön sovitulla tavalla. Tässä perussuorituksessa olennaista on toistettava paikallinen tarkistus ja käynnistys. Laajempi julkaisuketju voi olla jatkokehitystä.

Luovutettavaan pakettiin kuuluvat lähdekoodi, kommentoidut asetuspohjat, migraatiot, omat testinäytöt, alkuperäinen design ja oma M1-muutos. Siihen eivät kuulu oikeat salaisuudet tai itse kerätyt oikeiden käyttäjien henkilötiedot. Opettajalle ei tarvitse palauttaa valmista tietokantatiedostoa, jos sama rakenne ja harjoitustiedot syntyvät dokumentoiduilla askelilla.

**Valmis palautukseen, kun:** toinen opiskelija pystyy seuraamaan READMEtä ja sinä pystyt selittämään yhden onnistuvan sekä yhden estetyn pyynnön koko kulun. Luvun 10 tehtäväkohtaiset hyväksymisehdot ratkaisevat, mitä vielä täydennetään.


---

## 10 Harjoitukset, suorituspolut ja arviointi

### 10.1 Etenet mallin mukana ja siirryt omaan ratkaisuun

Harjoituksissa on kolme vaihetta: **toista**, **muuta** ja **perustele itsenäisesti**. Alussa saat kopioida kommentoidun mallin. Aja pieni osa kerrallaan ja vertaa tulosta ohjeeseen. Muuta sen jälkeen yhtä asiaa. Lopussa toteutat oman designmuutoksen ja osoitat myös, mitä sovellus kieltäytyy tekemästä.

P1–P9 ovat kaikki pakollisia. L1–L5 ovat vaativampia lisätehtäviä. Lisätehtävä ei korvaa puuttuvaa tietoturvaa, tietomallia, tietokantaa, autentikaatiota, autorisointia, frontendia tai Docker-osaamista. Valmiin sovelluksen käynnistäminen aloittaa työn; oma muutos, testinäyttö ja selitykset osoittavat oppimisen.

**Hyväksyntätesti** on ennalta kerrottu koe, jolla tarkistetaan toiminto. **Kielteinen testi** eli negatiivinen testi yrittää toimintoa, jonka pitää epäonnistua. HTTP-testissä palautetaan pyynnön menetelmä ja reitti, tarvittavat testiarvot, vastauskoodi, olennainen vastaus sekä tieto siitä, muuttuiko tietokanta. Poista salasanat ja istuntotunnukset palautettavista tulosteista.

Palautus voi olla saavutettava tekstiraportti, jota täydentävät kuvakaappaukset tai lyhyt tekstitetty video. Pelkkää videota tai pelkkiä kuvia ei edellytetä. Koodin ja ohjeiden pitää olla tekstinä luettavissa. Kirjaa jokaiseen tehtävään käyttämäsi tiedostot ja todelliset testitulokset; jos koe epäonnistui, kerro korjaus ja uusinnan tulos.

### P1. Selitä yhden pyynnön matka — toista ja nimeä

**Tavoite:** erotat selaimen, palvelimen ja tietokannan tehtävät. Enimmäispisteet 5.

**Tee:** käynnistä ensimmäinen HTTP-esimerkki ja avaa se selaimessa. Selitä omin sanoin frontend, backend, client, server, HTTP, URL, portti, API, JSON ja tietokanta. Kuvaa, mitä tapahtuu, kun käyttäjä painaa ”Lisää tehtävä”. Käytä esimerkkinä omaa ajettua sovellusta.

**Palauta:** noin yhden sivun sanasto ja pyynnön eteneminen numeroituina vaiheina. Lisää yhden todellisen pyynnön menetelmä, osoite ja vastauskoodi.

**Hyväksyntätestit:** pystyt nimeämään, missä HTML näytetään, missä käyttöoikeus tarkistetaan ja missä tieto säilytetään. Osaat erottaa server-ohjelman sitä ajavasta tietokoneesta. Selvität myös, miksi TypeScript-tyyppi ei yksin tarkista internetistä tulevan JSONin sisältöä.

**Arvioinnissa:** täsmällinen mutta omalla kielellä annettu selitys on tärkeämpi kuin englanninkielisten määritelmien muistaminen.

### P2. Tee käytettävä frontend — toista ja muuta

**Tavoite:** rakennat toimivan ja saavutettavan selaimen käyttöliittymän. Enimmäispisteet 10.

**Tee:** toteuta kolme lähtödesignin näkymää. Käytä HTML:ää rakenteeseen, CSS:ää ulkoasuun ja JavaScriptiä tapahtumiin sekä HTTP-pyyntöihin. Voit harjoitella ensin esimerkkidatalla; lopullisessa palautuksessa näkymät käyttävät oikeaa backendia. Muuta mallista vähintään ohjetekstiä ja yhtä ulkoasun ominaisuutta ja selitä muutokset.

**Palauta:** frontendin tiedostot, lyhyt selitys kolmesta tekniikasta sekä saavutettavuustarkistuksen tulokset.

**Hyväksyntätestit:** kirjautuminen, projektin luominen sekä tehtävän lisääminen, nimeäminen, valmis-tilan vaihtaminen ja poistaminen toimivat selaimessa. Lomakekentillä on näkyvät, ohjelmallisesti yhdistetyt nimet. Toiminnot onnistuvat näppäimistöllä ja kohdistus näkyy. Virheistä sekä tyhjästä listasta kerrotaan tekstinä. 200 prosentin suurennus säilyttää olennaisen sisällön ja toiminnot. Käyttäjän kirjoittama teksti näytetään tekstinä.

**Arvioinnissa:** arvioidaan toimintaa ja ymmärrettävyyttä. Frontend-kehys ei itsessään tuo lisäpisteitä. Lomakekenttien nimeämisen tausta: [W3C WAI](https://www.w3.org/WAI/tutorials/forms/labels/). Suurennuksen tausta: [WCAG 2.2, tekstin suurentaminen](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html).

### P3. Vastaa selaimen pyyntöihin — toista ja kokeile

**Tavoite:** ymmärrät HTTP-rajapinnan toiminnan. Enimmäispisteet 10.

**Tee:** rakenna palvelin ja reitit mallin mukana. **Reitti** tarkoittaa tässä HTTP-menetelmän ja osoitepolun yhdistelmää. Kirjoita taulukko käytettävistä reiteistä, vastaanotettavasta JSONista ja vastauksista. Lähetä sama pyyntö sekä selaimesta että HTTP-testityökalulla.

**Palauta:** reittitaulukko, ajettava backend ja vähintään neljä pyyntö–vastausnäyttöä: onnistuva luku, onnistuva luonti, virheellinen syöte ja tuntematon reitti.

**Hyväksyntätestit:** onnistuva toiminto palauttaa tarkoitukseen sopivan 2xx-koodin; virheellinen JSON tai väärä kentän tyyppi hallitun 4xx-vastauksen; puuttuva reitti 404-vastauksen. Virheellinen pyyntö ei kaada palvelinta. Rajapinnan virhe ei paljasta salaisuuksia tai sisäistä virhepinoa. Lopullisessa työssä suojatut reitit käyttävät P7:n ja P8:n tarkistuksia.

**Arvioinnissa:** osaat yhdistää pyynnön palvelimen reittiin ja siitä lähetettyyn vastaukseen. Testityökalun nimi ei vaikuta pisteisiin.

### P4. Johda tietomalli designistä — sovella

**Tavoite:** mallinnat datan todellisesta käyttöliittymätarpeesta. Enimmäispisteet 15.

**Tee:** aloita luvun 5 tekstidesignistä. Tee oma jäljitettävyystaulukko ennen mallivastauksen tarkastamista. Kuvaa entiteetit, kentät, tietotyypit, pääavaimet, viiteavaimet, kardinaliteetit ja rajoitteet. Lisää pakollinen muutoskortti M1: tehtävän vapaaehtoinen määräpäivä, jota voi muuttaa ja tyhjentää.

**Palauta:** alkuperäinen design tai sen tekstiviite, oma malli, kenttäkohtainen jäljitettävyys ja M1:n päivitetty näkymäkuvaus. Kaavio on sallittu, mutta suhteet on kerrottava myös tekstinä. Merkitse vertailussa tekemäsi korjaukset.

**Hyväksyntätestit:** jokaiselle tallennetulle kentälle löytyy perusteltu tarve. Tehtävän projektin ja omistajan selvittäminen onnistuu mallista. Puuttuva määräpäivä erotetaan virheellisestä. Samannimiset projektit eri käyttäjillä toimivat. Poistojen vaikutus on päätetty. Salasana ei esiinny mallissa selväkielisenä tallennettavana kenttänä.

**Arvioinnissa:** malli palvelee designiä ja oikeussääntöjä. Kaavion koristeellisuus ei vaikuta pisteisiin. M1:n perusteltu itsenäinen ratkaisu nostaa osaamisen mallin toistamista pidemmälle.

### P5. Tallenna pysyvästi ja toteuta M1 — sovella koko ketjuun

**Tavoite:** käytät oikeaa tietokantaa ja viet designmuutoksen käyttöliittymästä tallennukseen asti. Enimmäispisteet 15.

**Tee:** valitse SQLite tai PostgreSQL Dockerissa. Toteuta projektien luominen ja lukeminen sekä tehtävien CRUD: luominen, lukeminen, muuttaminen ja poistaminen. Lisää M1:n määräpäivä skeemaan, backendin tarkistuksiin, rajapintaan ja frontendiin. Tee skeemamuutos migraationa, joka säilyttää olemassa olevat käyttäjät, projektit ja tehtävät.

**Palauta:** skeema, migraatio, muutetut tiedostot, käynnistysohje sekä ennen–jälkeen-näyttö datasta. Osoita koodista vähintään yksi parametrisoitu luku ja yksi parametrisoitu kirjoitus. Parametrisoidussa kyselyssä käyttäjän arvo annetaan erillään SQL-komennon tekstistä.

**Hyväksyntätestit:** luotu ja muutettu tehtävä säilyy backendin uudelleenkäynnistyksen jälkeen. Poistettu tehtävä ei palaa. Viiteavaimet estävät viittauksen puuttuvaan projektiin. Migraatio säilyttää vanhan datan. Määräpäivän voi asettaa arvoon `2030-12-31`, muuttaa ja tyhjentää. Päivä `2030-02-30` hylätään palvelimella. Sama tieto näkyy uuden sivulatauksen jälkeen. Muutos ei anna oikeutta toisen käyttäjän tehtävään.

**Arvioinnissa:** tiedon kulku ja säilyminen ratkaisevat. Pelkkä muistissa oleva taulukko, `localStorage` tai tietokannan kuva ei täytä vaatimusta. ORM eli oliomallin ja tietokannan välinen kirjasto on sallittu omalla tekniikkapolulla, mutta opiskelija selittää sen muodostaman mallin ja turvallisen kyselyn.

### P6. Käynnistä kontti ja säilytä data — toista ja selitä

**Tavoite:** osaat Dockerin peruskäsitteet ja palvelun elinkaaren. Enimmäispisteet 5.

**Tee:** suorita luvun 8 PostgreSQL-labra. Jos oma sovelluksesi käyttää jo PostgreSQLiä Dockerissa, voit osoittaa samat kokeet sen kehitystietokannalla. SQLite ja vaihtoehtoinen backend-kieli eivät vapauta Docker-harjoituksesta.

**Palauta:** kommentoitu Compose-tiedosto ilman salasanaa, `up`-, `ps`-, `logs`- ja `exec`-komentojen olennaiset tulokset sekä näyttö datasta ennen `down`–`up`-kierrosta ja sen jälkeen. Selitä myös imagen, kontin, Dockerfilen, portin, volumen, verkon ja ympäristömuuttujan tehtävä.

**Hyväksyntätestit:** palvelu käynnistyy, lokit löytyvät, SQL-komento suoritetaan kontissa ja sama data löytyy kontin uudelleenluonnin jälkeen. Portti on rajattu paikalliseen kehityskäyttöön. Todellinen `.env` ei ole palautuksessa. Osaat kertoa eron isännän `localhost`-osoitteen ja toisen kontin palvelunimen välillä sekä sen, miksi `down -v` olisi tuhoava toimenpide.

**Arvioinnissa:** käytännön näyttö ja oma selitys tarvitaan yhdessä. Oman backendin kontittaminen on lisätehtävä; tämän peruslabran osaaminen on pakollista.

### P7. Tunnista käyttäjä — kokoa ohjeista

**Tavoite:** toteutat autentikaation eli käyttäjän tunnistamisen. Enimmäispisteet 10.

**Tee:** toteuta rekisteröityminen, kirjautuminen, kirjautuneen käyttäjän tunnistaminen ja uloskirjautuminen. Käytä turvallista salasanamenetelmää tai kehyksen siihen tarkoitettua kirjastoa. Palvelin tarkistaa istunnon tai vastaavan tunnisteen jokaisessa suojatussa pyynnössä. Kerro, miten istunto vanhenee ja miten uloskirjautuminen mitätöi sen.

**Palauta:** toimivat käyttäjänäkymät, salasanan tallennusmenetelmän perustelu ja testit. Älä palauta testissä käytettyä istuntosalaisuutta. Näytä tietokannan rakenne ja salasanan tarkistamiseen käytettävä koodi tai kirjastokutsu.

**Hyväksyntätestit:** uusi tunnus voidaan luoda, oikea salasana toimii ja väärä ei. Sama normalisoitu sähköposti ei luo toista tunnusta. Tietokannassa ei ole selväkielistä salasanaa. Kirjautumaton pyyntö suojattuun resurssiin palauttaa 401. Uloskirjautumisen jälkeen vanhan istunnon uudelleenkäyttö epäonnistuu. Vanhentunut istunto hylätään; vanhenemisen voi osoittaa hallitulla testikellolla tai eristetyllä testidatalla.

**Arvioinnissa:** osaat selittää, mitä selain säilyttää ja mitä palvelin tarkistaa. Pelkkä käyttöliittymän ”kirjautunut”-muuttuja ei täytä vaatimusta. Valmiin turvallisuuskirjaston käyttäminen on hyväksytty toteutustapa.

### P8. Rajaa käyttäjän oikeudet — testaa itsenäisesti

**Tavoite:** toteutat autorisoinnin eli käyttöoikeuden tarkistamisen. Autentikaatio vastaa ”kuka olet?”, autorisointi ”mitä saat tehdä tälle tiedolle?”. Enimmäispisteet 15.

**Tee:** luo käyttäjät A ja B sekä erillinen ylläpitäjärooli. A ja B omistavat eri projektit. Tavallinen käyttäjä käsittelee vain omien projektiensa tehtäviä. Ylläpitotoiminto vaatii ylläpitäjäroolin. Tarkista oikeudet backendissä jokaisessa luku- ja muutosreitissä. [OWASP: käyttöoikeuksien tarkistaminen](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html).

Malliratkaisun ylläpitoreitti `GET /api/admin/stats` näyttää vain koontilukuja. Ylläpitäjäkään ei saa muiden projektisisältöjä. Projektitehtävien reitti on `/api/projects/:id/tasks` ja yksittäisen tehtävän `/api/tasks/:id`; `:id` korvataan testattavan kohteen tunnisteella. Malliratkaisu palauttaa vieraille resursseille 404:n.

**Palauta:** rooli- ja omistajuussäännöt sekä seuraavan taulukon jokaisen rivin suora HTTP/API-testitulos. Suora testi tarkoittaa pyyntöä, jonka lähetät HTTP-testityökalulla tai automaattisella testillä. Toiminnon piilottaminen käyttöliittymästä ei osoita oikeuksien rajaamista.

| Pakollinen koe | Odotettu tulos |
|---|---|
| A lukee ja muuttaa oman projektinsa tehtävää | Toiminto onnistuu ja oikea tieto muuttuu. |
| B yrittää lukea A:n projektin tehtävät projektin tunnisteella | 403 tai 404; A:n tietoja ei palauteta. |
| B yrittää lukea A:n yksittäisen tehtävän suoraan sen tunnisteella | 403 tai 404; tehtävän tietoja ei palauteta. |
| B yrittää lisätä tehtävän A:n projektiin | 403 tai 404; A:n projektiin ei synny tehtävää. |
| B yrittää muuttaa A:n tehtävän nimeä, tilaa tai M1-määräpäivää | 403 tai 404; kaikki alkuperäiset tiedot säilyvät. |
| B yrittää poistaa A:n tehtävän | 403 tai 404; A löytää tehtävän yhä. |
| B lähettää A:n tunnisteen omistajakenttänä luontipyynnössä | Palvelin hylkää kentän tai sivuuttaa sen; B ei saa oikeutta A:n tietoihin. |
| Rekisteröitymispyyntöön lisätään rooli `admin` | Kenttä hylätään tai sivuutetaan; uudesta käyttäjästä ei tule ylläpitäjää. |
| Tavallinen käyttäjä kutsuu ylläpidon reittiä suoraan | 403; ylläpitotietoja tai -toimintoa ei anneta. |
| Ylläpitäjä kutsuu samaa sallittua ylläpitoreittiä | Toiminto onnistuu määriteltyjen oikeussääntöjen mukaan. |
| Kirjautumaton kutsuu ylläpidon reittiä | 401. |

**Hyväksyntätestit:** kaikki taulukon rivit läpäistään. Tarkista myös muut toteuttamasi suojatut reitit. Kielteisissä muutostesteissä tarkistetaan vastauksen lisäksi tietokannan tai omistajan uuden lukupyynnön avulla, ettei data muuttunut. `404` voi olla tietoinen tapa olla paljastamatta vieraan resurssin olemassaoloa.

**Arvioinnissa:** jokainen tarkistus sidotaan käyttäjään, resurssiin ja toimintaan. Satunnainen tunniste, CORS-asetus tai nappien piilottaminen ei korvaa omistajuuden ja roolin tarkistusta.

### P9. Perustele ja koettele tietoturvaa — yhdistä ja arvioi

**Tavoite:** tunnistat oman sovelluksen uhkat, osoitat suojaukset ja arvioit niiden rajat. Enimmäispisteet 15.

**Tee:** kirjoita **uhkamalli**, eli lyhyt kuvaus suojattavista tiedoista, väärinkäytön mahdollisuuksista ja torjuntakeinoista. Käytä omaa sovellustasi ja M1-muutosta. Suorita alla olevat kokeet omassa kehitys- tai testiympäristössäsi. Hyödynnä P8:n testituloksia toistamatta niitä raportissa kokonaan.

| Pakollinen kohde | Koe ja vaadittu näyttö |
|---|---|
| Ajonaikainen syötteen tarkistus | Lähetä suoraan APIin väärän tyyppinen, tyhjä, liian pitkä ja virheellinen päivämääräarvo. Palvelin palauttaa hallitun 4xx-vastauksen eikä tallenna virheellistä arvoa. |
| SQL-injektio | Kokeile tekstiarvoa, joka sisältää esimerkiksi merkit `' OR 1=1 --`. Se ei muuta kyselyn rakennetta, ohita kirjautumista eikä palauta ylimääräisiä rivejä. Näytä lisäksi parametrien käyttö koodissa. |
| XSS eli selaimessa suoritettavan koodin ujuttaminen | Anna tehtävän nimeksi esimerkiksi `<img src=x onerror=alert(1)>`. Näytä, että arvo näkyy tekstinä tai hylätään eikä muodosta suoritettavaa HTML:ää. Perustele käytetty turvallinen näyttötapa. |
| CSRF eli pyyntöjen väärentäminen toisen sivuston kautta | Evästeistunnossa lähetä muuttava pyyntö voimassa olevalla testi-istunnolla mutta väärällä Origin-arvolla tai väärällä/puuttuvalla CSRF-tunnisteella. Pyyntö hylätään ja data säilyy. Sallitusta käyttöliittymästä tehty sama toiminto onnistuu. Jos tunniste lähetetään vain erikseen Authorization-otsakkeessa, osoita, ettei selain liitä sitä automaattisesti vieraan sivun pyyntöön eikä muutos onnistu ilman tunnistetta. |
| Istunnon ja salaisuuksien suojaus | Näytä evästeen tai muun tunnisteen asetukset, vanheneminen ja mitätöinti. Tarkista, ettei salaisuuksia ole lähdekoodissa, frontendissä tai palautuksen lokeissa. Kerro, miten HTTPS-julkaisu ja evästeen `Secure`-asetus eroavat paikallisesta HTTP-harjoituksesta. |
| Omistajuus ja roolit | Liitä P8:n hyväksytty koematriisi myös oman määräpäivämuutoksen osalta. |

**Palauta:** noin 1–2 sivun uhkamalli ja testitaulukko. Kirjoita kuhunkin uhkaan ”mitä suojataan”, ”missä tarkistus tehdään”, ”mitä kokeilin” ja ”mitä havaitsin”. Lisää lyhyt arvio kolmesta asiasta: toimivuuden raja, turvallisuuden jäljelle jäävä riski ja skaalautuvuuden pullonkaula. **Skaalautuvuus** tarkoittaa tässä sitä, miten ratkaisu kestää käyttäjien, pyyntöjen tai datan määrän kasvua. Perustele ehdotettu seuraava parannus; sitä ei tarvitse toteuttaa lisätehtävänä.

**Hyväksyntätestit:** jokainen taulukon kohde on käsitelty todellisella näytöllä. Sovellus ei paljasta toisen tietoja, suorita käyttäjän HTML:ää tai hyväksy väärää syötettä. Uhkien kuvauksen pitää vastata juuri omaa toteutusta. Evästepohjaisessa ratkaisussa CSRF-suojaus arvioidaan kokonaisuutena; CORS ei yksin ole käyttöoikeus- tai CSRF-ratkaisu. [OWASP: CSRF:n torjunta](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html).

**Arvioinnissa:** korkea pistemäärä syntyy havaintojen perustelusta, korjausten osoittamisesta ja ratkaisun rajojen arvioinnista. Turvallisuustermien lista ilman yhteyttä koodiin ei riitä.

### 10.2 Vaihtoehtoinen suorituspolku: valitse oma backend-tekniikka

Voit toteuttaa backendin esimerkiksi .NETillä, Javalla, Nodella, Rustilla tai C++:lla. Deno ja TypeScript ovat opetuksen yhteisen follow-along-polun tekniikat. Omaa tekniikkaa käyttävä tekee saman Tehtävätaulun toiminnallisuuden ja M1-muutoksen sekä palauttaa samat näytöt. Teknologiavalinta ei muuta arvosanan ylärajaa.

| Vaatimus | Sama näyttö kaikilla tekniikoilla |
|---|---|
| Frontend ja HTTP | Selaimessa toimivat näkymät, saavutettavuustarkistus ja dokumentoitu HTTP-rajapinta. |
| Designistä tietomalliin | Sama lähtödesign, jäljitettävyys, avaimet, suhteet, rajoitteet ja M1. |
| Tietokanta | SQLite tai PostgreSQL Dockerissa, pysyvä data, CRUD ja turvalliset parametrisoidut kyselyt. |
| Autentikaatio | Todellinen käyttäjän tunnistaminen, turvallinen salasanan käsittely sekä päättyvä ja mitätöitävä istunto tai vastaava ratkaisu. Kehyksen valmis kirjasto käy. |
| Autorisointi | Samat kahden käyttäjän omistajuuskokeet ja roolitestit suoraan rajapintaan. |
| Tietoturva | Samat syötteen tarkistukset ja SQLi-, XSS-, CSRF-, istunto- ja salaisuuskokeet. |
| Docker | Sama kontti-, portti-, verkko- ja volumen säilymisen näyttö; SQLite ei poista vaatimusta. |
| Toistettavuus | README kertoo versiot, asennuksen, asetusten mallipohjan, tietokannan alustuksen, migraation, käynnistyksen ja testien ajon. |

Kenttien nimet ja kirjastojen sisäiset rakenteet voivat olla erilaisia. Dokumentoi vastaavuus: mikä oman ratkaisusi osa toteuttaa kunkin vaatimuksen. Myös reittien nimet voivat erota, kun testimatriisissa on tarkka vastaavuus. Kielen tyyppijärjestelmä, kehyksen automaatiot tai valmis kirjasto eivät poista velvollisuutta osoittaa lopputulosta.

### 10.3 Vaativammat lisätehtävät L1–L5

Lisätehtävissä toimiva ja turvallinen ydin pidetään mukana. Tee ensin P1–P9. Valitse lisätehtäviä oman kiinnostuksen mukaan.

| Tehtävä | Tavoite ja tehtävä | Palautus ja hyväksyntä |
|---|---|---|
| L1: Automaattinen regressiosuoja | Muuta käsin tehdyt olennaiset testit automaattisiksi. Regressio tarkoittaa aiemmin toimineen asian rikkoutumista muutoksessa. | Toistettava testikomento ja tulokset. Kaksi käyttäjää, vanhentunut istunto ja M1:n rajatapaukset katetaan eristetyllä testidatalla. |
| L2: Koko sovellus konttiin | Tee backendille Dockerfile ja Compose-käynnistys. SQLite-polulla liitä myös sovelluksen datakansio pysyvään volumeen. | Käynnistysohje, rajatut oikeudet, salaisuuksista vapaa image ja koko sovelluksen datan säilymiskoe. Pohja löytyy kansiosta `esimerkit/04-valmis`. |
| L3: Varmuuskopio ja palautus | Tee tietokannalle toistettava varmuuskopiointi ja palautus erilliseen testiympäristöön. | Palauta kopio ja osoita rivien sekä suhteiden säilyminen. Kerro, mitä tapahtuu kirjoituksille kopioinnin aikana. Harjoituksen alkuperäinen data säilytetään. |
| L4: Samanaikaiset muutokset | Estä kahden käyttäjäikkunan vanhojen tietojen aiheuttama tahaton ylikirjoitus esimerkiksi versionumerolla. | Kahden rinnakkaisen muutoksen testi: toinen hyväksytään ja ristiriita kerrotaan toiselle. Käyttöliittymästä voi palautua tilanteesta tietoja menettämättä. |
| L5: Jaetut projektit | Lisää projektin jäsenyys ja eritasoiset oikeudet, esimerkiksi lukija ja muokkaaja. Laajenna malli ja uhkamalli. | Migraatio, muuttunut design, jäsenyysmalli ja kattava oikeusmatriisi. Oikeuden poistaminen estää seuraavan pyynnön. Arvioi ratkaisun toimintaa käyttäjämäärän kasvaessa. |

Lisätehtävät eivät ole automaattisia lisäpisteitä, eikä suurinta arvosanaa sidota niiden tekemiseen. Niistä saatava näyttö voi vahvistaa samoja arvioitavia taitoja enintään arviointimatriisin kokonaispistemäärään asti.

### 10.4 Ehdotus arviointimatriisiksi: 0–100 pistettä

Tämä on materiaalin käyttöön tarkoitettu **arviointiehdotus**, ei väite opintojakson valmiiksi päätetystä pisteytyksestä. Opettaja sovittaa sen toteutuksen arviointikäytäntöön ja kertoo kriteerit ennen työskentelyä.

| Tehtävä | Pisteet enintään | Hyväksytty perustaso: kaikki tehtävän ydinehdot täyttyvät |
|---|---:|---:|
| P1 Käsitteet ja pyynnön kulku | 5 | 3 |
| P2 Frontend ja saavutettavuus | 10 | 6 |
| P3 Backend ja HTTP-rajapinta | 10 | 6 |
| P4 Design ja tietomalli | 15 | 9 |
| P5 Tietokanta, CRUD ja M1 | 15 | 9 |
| P6 Dockerin perusteet | 5 | 3 |
| P7 Autentikaatio | 10 | 6 |
| P8 Autorisointi | 15 | 9 |
| P9 Tietoturva ja oman ratkaisun arviointi | 15 | 9 |
| **Yhteensä** | **100** | **60** |

Jokaisessa tehtävässä 60 % pisteistä vastaa hyväksytysti osoitettua perustasoa. Seuraavat 20 % arvioivat omia selityksiä ja ratkaisujen jäljitettävyyttä. Viimeiset 20 % arvioivat toteutuksen johdonmukaisuutta, testinäytön laatua ja ratkaisun rajojen ymmärtämistä. Opettaja käyttää kokonaisia pisteitä tehtävän pistevälin sisällä.

**Kaikkien yhdeksän ydintehtävän on oltava hyväksyttyjä.** Korkea kokonaispistemäärä ei korvaa puuttuvaa autorisointia tai muuta ydinehtoa. Puuttuva näyttö täydennetään ennen hyväksyntää. Vakavasti puutteellista ydintoimintoa ei merkitä läpäistyksi toisen tehtävän pisteillä.

| Ehdotettu kokonaisarvosana | Pistealue, kun kaikki ydintehtävät on hyväksytty |
|---|---|
| 1 | 60–69 |
| 2 | 70–79 |
| 3 | 80–89 |
| 4 | 90–94 |
| 5 | 95–100 |

Hylätty tai täydennettävä suoritus tarkoittaa tässä ehdotuksessa alle 60 pistettä tai jonkin ydintehtävän puuttuvaa hyväksyntää. Arvosanaan 5 voi päästä huolellisella P1–P9-työllä: opiskelija osaa toteuttaa, suunnitella ja arvioida oman sovelluksensa toimivuutta, turvallisuutta sekä skaalautuvuuden rajoja. Lisätehtäviä tai tiettyä backend-kieltä ei vaadita korkeimpaan arvosanaan.

### 10.5 Ehdotus työmäärän jakamiseksi

Alla on opetuskertakohtainen suunnitelma 135 tunnin kokonaisuuteen. Tunnit ovat työmäärää, eivät pakollisia yhtäjaksoisia istuntoja. Itsenäiseen työhön sisältyvät lukeminen, toistaminen, virheiden selvittäminen, oma muutos ja palautuksen laatiminen. Opettaja voi siirtää käsittelyjärjestystä ryhmän etenemisen mukaan.

| Opetuskerta | Painopiste | Ohjattu opetus | Itsenäinen työ |
|---|---|---:|---:|
| 1 | Peruskäsitteet, työkalut ja ensimmäinen pyyntö; P1 | 4 h | 9 h |
| 2 | HTML, CSS, JavaScript ja saavutettavuus; P2 | 4 h | 11 h |
| 3 | Deno, TypeScript ja HTTP-rajapinta; P3 | 4 h | 13 h |
| 4 | Design, tietomalli ja SQL; P4 | 4 h | 14 h |
| 5 | Pysyvä tallennus ja M1-muutos; P5 | 4 h | 16 h |
| 6 | Docker ja autentikaatio; P6–P7 | 4 h | 14 h |
| 7 | Autorisointi ja tietoturvatestit; P8–P9 | 4 h | 16 h |
| 8 | Näytöt, oman ratkaisun arviointi ja täydennykset | 2 h | 12 h |
| **Yhteensä** | | **30 h** | **105 h** |


---

## 11 Opettajalle: toteutus ja palautettavat näytöt

### Materiaalin pedagoginen käyttö

Materiaali on rakennettu R504TL209 Full Stack -sovelluskehitys: Backend -opintojakson viiden opintopisteen kokonaisuuteen. Mitoitus on 135 tuntia, joista 30 on ohjattua opetusta ja 105 itsenäistä tai ryhmässä tehtävää opiskelutyötä. Luvun 10 tuntijako on toteutusehdotus. Se ei muuta lukujärjestyksen varauksia tai oppilaitoksen opetustunnin määritelmää.

Uusi oppija kohtaa samanaikaisesti tiedostonhallinnan, komentotulkin, ohjelmointikielen ja verkkosovelluksen käsitteet. Pidä ensin onnistumisen vaatima muutos pienenä. Näytä ruudulta aina, missä olet: editori, terminaali vai selain. Lue ensimmäisellä kerralla myös komentojen valitsimet ääneen merkityksineen. Vältä piiloon jääviä hiirellä tehtyjä muutoksia ja valmiiksi oletettuja asennuksia.

Yhden ohjatun työjakson toimiva rytmi on: lyhyt arkinen selitys, opettajan näyttämä pieni muutos, opiskelijan toisto, yhteinen tarkistuspiste, yhden asian muuntaminen ja omin sanoin kertominen. Toistamista ei tarvitse perustella pois. Se on tämän materiaalin ensimmäinen vaihe, josta siirrytään vähitellen soveltamiseen.

### Ehdotus opetuskertojen ydinkysymyksiksi

| Kerta | Kysymys, johon opiskelija osaa lopuksi vastata | Näytettävä asia |
| --- | --- | --- |
| 1 | Missä pyyntö alkaa ja missä päätös tehdään? | Ensimmäinen Deno-ohjelma, selainpyyntö ja vastaus. |
| 2 | Miten HTML, CSS ja JavaScript jakavat työn? | Selaimen muistissa toimiva, näppäimistöllä käytettävä lista. |
| 3 | Miten API-pyyntö päätyy omaan funktiooni? | Deno.serve, reitti, JSON, status ja hallittu virhe. |
| 4 | Mitä designin toteuttaminen vaatii tiedolta? | Kenttien jäljitettävyys, relaatiot ja SQL-kokeet. |
| 5 | Miten uusi kenttä lisätään rikkomatta vanhaa dataa? | SQLite, migraatio ja M1:n suunnittelu sekä toteutus. |
| 6 | Miten käyttäjä tunnistetaan ja kontti käynnistetään? | Pieni turvatoimintojen koe, istunto ja Docker-peruslabra. |
| 7 | Miksi toinen käyttäjä ei saa tehdä tätä muutosta? | Omistajuus, roolit, CSRF ja muuttumattomuuden tarkistus. |
| 8 | Mistä toinen henkilö tietää työn toimivan? | Henkilökohtainen näyttö, toistettava ajo ja ratkaisun rajat. |

Docker voidaan käsitellä ennen SQLitea, jos ryhmän ympäristö on siihen valmis. Uuden tekniikan opetus alkaa taas ohjatusta pienestä kokeesta, vaikka projektin kokonaisuus etenee kohti itsenäistä työtä. Vaikeustaso kasvaa lopun omissa sovelluksissa, oikeustesteissä ja lisätehtävissä.

### Mitä jaetaan opiskelijoille?

VitePress-versiossa opiskelija lukee tämän sivuston lukuja. Käynnistys, muokkaaminen ja staattisen sivuston rakentaminen on kuvattu VitePress-käyttöohjeessa (katso saman materiaalipaketin vastaava osa). Seuraavat kappaleet kuvaavat myös aiemman HTML- ja Moodle-toimituksen käyttöä. Aiempi materiaalipaketti (katso saman materiaalipaketin vastaava osa) on saatavana samojen sisältöjen vaihtoehtoiseen jakeluun.

Jaettava HTML-opas on luettavissa ilman kirjautumista paikallisena tiedostona. ZIP-paketissa ovat samat luvut muokattavina Markdown-lähteinä, täydelliset esimerkit ja erilliset Moodle-sivujen HTML-sisällöt. Koodipankki sisältää kokonaiset tiedostot. Sisällön perusteella opiskelijalta ei edellytetä verkkosivulta löytyvän muuttuvan esimerkin kopioimista.

Kurssin JSON-tiedosto käyttää aiemman materiaalin `metadata`-, `sections`- ja `modules`-rakennetta. Se on **sisältöpaketti samaan rakenteeseen perustuvalle tuontiratkaisulle**, ei Moodlen natiivi `.mbz`-varmuuskopio. Yleiseen Moodleen sisältö voidaan lisätä sivu kerrallaan paketissa olevasta HTML:stä ja tehtävien kuvauksista. JSONin kenttien tuki tarkistetaan käytössä olevasta tuontiratkaisusta ennen sen ajoa.

Tämä toimitus ei ole tehnyt muutoksia käynnissä olevaan Moodle-kurssiin. Tehtävien deadlinet, ryhmäasetukset ja käyttöoikeudet asetetaan toteutuksen aikataulun mukaan. Luvun 10 pisteytys on ehdotus, joka viestitään opiskelijoille ennen arvioitavaa työtä.

### Saavutettavuuden käytännön ohjeet opetustilanteeseen

Säilytä otsikkotasot ja kuvaavat linkkitekstit. Älä muuta koodia kuvaksi tai piilota ydinohjeita pelkkään tallenteeseen. Jos tallennat opetuksen, huolehdi tekstityksestä ja anna rinnalle samat tiedostot sekä tekstiohjeet. Luennon kuvallinen piirros selitetään myös puheena tai tekstinä.

Varaa aikaa näppäimistöllä etenemiseen ja anna opiskelijan avata kommentoitu koodi omassa editorissaan. Tiiviimpi editorin näkymä on mahdollista asetuksilla; kommenttien poistamista ei vaadita. Arvioi ymmärrystä ja toimintaa, älä kirjoitusnopeutta, englannin taitoa tai ulkoasun koristeellisuutta.

Käyttöliittymän automaattinen tarkistin tai selainkoe ei osoita kaikkea saavutettavuutta. Opiskelijan tehtävässä tarvitaan myös näppäimistökoe, näkyvien nimien ja virheiden tarkistus sekä suurennuksen kokeilu. Ruudunlukijalla tehtävää arviointia voi käyttää lisänä ja palautteen lähteenä. Dokumentoi todelliset havainnot väitteen ”täysin saavutettava” sijaan.

### Henkilökohtainen osaaminen ryhmätyössä

Ryhmä saa tehdä yhteisen sovelluksen. Jokainen opiskelija palauttaa omat näyttöviitteensä ja selittää ainakin yhden onnistuvan sekä yhden estettävän pyynnön. Commitien määrä ei yksin osoita oppimista. Yhteisestä työstä voi arvioida eri opiskelijoilta eri osuuksia, kun kaikki ydintavoitteet tulevat henkilökohtaisesti osoitetuiksi.

Lyhyt henkilökohtainen näyttö voidaan toteuttaa keskusteluna, saavutettavana tekstinä tai muulla sovitulla tavalla. Anna tehtävänanto ennakkoon: opiskelija näyttää oman työnsä, tekee pienen muutoksen tai jäljittää olemassa olevan toiminnon ja selittää, miten hän varmisti sen. Muistinvarainen syntaksikoe ei ole tämän materiaalin tarkoitus.

### Työpohja A: oma polku

Täytä yksi sivu ennen itsenäistä työtä:

| Kohta | Opiskelijan vastaus |
| --- | --- |
| Käyttämäni backend-kieli ja ajoympäristö | Kirjoita nimi ja versio. |
| Frontendin tekniikka | Kirjoita HTML/CSS/JS tai valittu vastaava toteutustapa. |
| Tietokanta | SQLite tai PostgreSQL Dockerissa; perustele valinta. |
| Docker-näyttö | Kerro, missä osoitat P6:n kontti- ja pysyvyyskokeet. |
| Käyttäjien tunnistaminen | Nimeä käyttämäsi menetelmä ja kirjasto tai kurssin malliratkaisu. |
| Käyttöoikeussäännöt | Kirjoita käyttäjän, omistajan ja ylläpitäjän sallitut toiminnot. |
| M1-muutoksen suunnitelma | Kerro, mihin näkymään, kenttään, reittiin ja tauluun muutos tulee. |
| Näytön toimitus | Kerro lähdekoodin versio sekä ohjeiden ja testitulosten sijainti. |

Oman tekniikan polulla ei edellytetä Denoa vastaavaa tiedostojakoa, käsin kirjoitettua salaustoimintoa tai tiettyä HTTP-kirjastoa. Turvallisen valmiin ratkaisun käyttö hyväksytään. Tunnistautumismenetelmän on kuitenkin täytettävä sama vanhenemisen, väärän tunnisteen torjunnan ja uloskirjautumisen mitätöinnin vaatimus. Esimerkiksi JWT:n käyttö ei yksin todista, että uloskirjautuminen estäisi jo myönnetyn tunnisteen uudelleenkäytön.

### Työpohja B: designistä toteutukseen

| Designin näkymä ja käyttäjän tarve | Tallennettava kenttä ja tyyppi | Rajoite ja oletus | API-pyyntö/vastaus | Hyväksyntäkoe |
| --- | --- | --- | --- | --- |
| Kirjoita oma havainto. | Nimeä taulu ja kenttä. | Kerro myös puuttuvan arvon käsittely. | Nimeä tarkka toiminto. | Kerro syöte ja odotettu tulos. |

M1:n määräpäivä on kalenteripäivä, ei kellonaika. Päätä, erotatko API:ssa kentän puuttumisen, arvon `null` ja tyhjän tekstin. Esimerkiksi PATCH-pyynnön puuttuva kenttä voi tarkoittaa ”älä muuta”, kun `null` tarkoittaa ”tyhjennä”. Perustele valinta, toteuta se johdonmukaisesti ja testaa oikea päivämäärä. Pelkkä muodon `vuosi-kuukausi-päivä` tarkistus ei havaitse helmikuun 30. päivää.

### Työpohja C: testinäyttö

| Tunnus ja vaatimus | Lähtötilanne ja käyttäjä | Pyyntö tai käyttötoiminto | Odotettu tulos | Todellinen tulos | Tietokannan tila ja näyttöviite |
| --- | --- | --- | --- | --- | --- |
| Esimerkiksi P8, vieras muokkaus. | B on kirjautunut; tehtävän omistaa A. | Kirjoita metodi, reitti ja ei-salainen syöte. | Estävä vastaus ja muuttumaton tieto. | Kirjaa havaittu tulos. | Viittaa uuteen omistajan lukupyyntöön ja koodin versioon. |

Pelkkä tulosteen `passed`-sana ei korvaa kuvausta siitä, mitä testi tekee. Opiskelija valitsee vähintään yhden testin ja selittää valmistelun, toiminnon, vertailun ja siivouksen. Näyttöön ei kopioida istuntotunnisteita tai salasanoja.

### Työpohja D: lähteet ja tekoälyn käyttö

Kirjaa, mistä sait teknisen ohjeen, mitä siitä käytit, miten tarkistit sen ja mikä päätös jäi omaksesi. Jos käytät tekoälyä, nimeä käyttötarkoitus ja varmennus: esimerkiksi koodirivin selitys, virheen selvittäminen tai vaihtoehtoisen mallin arviointi. Käytä julkista tai itse keksittyä harjoitusdataa. Noudata lisäksi toteutuksen erikseen annettua tekoälyohjetta; tämä materiaali ei luo uusia oppilaitoksen virallisia käyttöehtoja.

### Arvioinnin toteutus

Käy ensin läpi kaikki P1–P9-ydinehdot. Puuttuva autentikaatio, autorisointi tai muu pakollinen näyttö merkitään täydennettäväksi. Laske laatupisteet vasta saman yhteisen matriisin perusteella. Yhden tekniikan asennusvaikeudet tai valitun kehyksen nimi eivät saa tuottaa automaattista arvosanakattoa.

Korkeassa arvioinnissa opiskelija perustelee oman mallinsa, näyttää turvallisuuden kokeilla ja arvioi toimivuuden sekä skaalautuvuuden rajoja. Tätä voi osoittaa perusteellisella ydintyöllä. Lisätehtävien lukumäärä ei korvaa puuttuvaa ymmärrystä, eikä vaikeimman lisätehtävän tekeminen ole korkeimman arvosanan ehto.

### Lisätehtävä L2:n valmis lähtöpohja

Paketin `04-valmis/Dockerfile` ja `compose.sqlite.yaml` ovat kommentoitu lähtöpohja koko SQLite-sovelluksen kontittamiseen. Ne ovat erillisiä pakollisesta PostgreSQL-peruslabrasta. Pysäytä ensin mahdollinen paikallinen Deno-palvelin portista 8000. Suorita seuraavat komennot `04-valmis`-hakemistossa vain Dockerin ollessa käytettävissä:

```sh
# Rakenna sovellusimage ja käynnistä SQLite-sovellus omassa kontissa.
docker compose -f compose.sqlite.yaml up --build -d
# Tarkista, että web-palvelu on käynnissä.
docker compose -f compose.sqlite.yaml ps
# Lue sovelluksen loki ja avaa sen jälkeen http://localhost:8000 selaimessa.
docker compose -f compose.sqlite.yaml logs web
```

Luo kontissa toimivaan sovellukseen omat harjoitustiedot. Paikallisen Deno-ajon tiedostoja ei kopioida automaattisesti kontin tietokantaan. Compose käyttää omaa nimettyä taltiota. Näytä datan säilyminen seuraavalla kierroksella:

```sh
# Poista tämän Compose-projektin kontti säilyttäen nimetty tietokantataltio.
docker compose -f compose.sqlite.yaml down
# Luo kontti uudelleen samaan taltion sisältöön kytkettynä.
docker compose -f compose.sqlite.yaml up -d
```

**Odotettu tulos:** aiemmin luodut tilit, projektit ja tehtävät löytyvät kirjautumisen jälkeen. **Arvioitava lisänäyttö:** opiskelija selittää Dockerfilen kerrokset, prosessin tavallisen käyttäjän, portin, väliaikaisen välimuistin ja pysyvän tietokannan eri sijainnit. Kuvan rakentamisen onnistuminen ei yksin osoita käyttöliittymän, tietokannan ja kirjautumisen toimivuutta.

Docker-esimerkkien rakenne ja polut on tarkistettu materiaalia laadittaessa. Konttien varsinaista käynnistystä ei ole voitu varmentaa tämän toimituksen ympäristössä, koska Docker-moottori puuttuu. Opettajan käyttöönottokoe on ajaa sekä P6:n PostgreSQL-labra että mahdollinen L2 ennen niitä käsittelevää opetuskertaa. Deno- ja selainkokeiden toteutuneet tulokset on koottu paketin tarkistusraporttiin.


---

## 12 Täydellinen kommentoitu koodipankki

Tässä ovat toimituksen kokonaiset esimerkkitiedostot. Samat tiedostot löytyvät ZIP-paketista samoilla poluilla. Kopioi yhden tiedoston koko sisältö siihen nimettyyn tiedostoon; älä kopioi tiedostonimen otsikkoa tai koodilohkon rajausmerkkejä. Kommentit ovat osa opetusta ja ne saa säilyttää omassa työssä.

Suorituskomennot, oikea työhakemisto ja odotettu tulos löytyvät kyseisestä tutoriaaliluvusta. Kaikki tiedostot eivät käynnisty itsenäisesti: esimerkiksi `auth.ts` käyttää muita valmiin backendin tiedostoja. `04-valmis` käynnistetään sen omasta hakemistosta komennolla `deno task start`.

Valmis esimerkki ei sisällä opiskelijan omaa M1-määräpäiväratkaisua. Kaksi pientä testitutoriaalia täydentävät 11 integraatiotestin kokonaisuutta. PostgreSQL-peruslabra on pakollinen P6, koko sovelluksen Dockerfile on lisätehtävän L2 lähtöpohja.


### 12.1 Ensimmäinen ohjelma ja TypeScript

#### `esimerkit/00-kieli/hei.ts`

````ts
// console.log tulostaa sulkeisiin annetun tekstin terminaaliin.
console.log("Hei! Minun ohjelmani toimii.");
````

#### `esimerkit/00-kieli/kieli.ts`

````ts
// Tämä tiedosto suoritetaan Denossa, ei selaimessa. .ts tarkoittaa TypeScriptiä.
// Kaksi kauttaviivaa aloittaa kommentin: Deno ei suorita kommentin tekstiä.

// const antaa arvolle nimen. Kaksoispisteen string tarkoittaa tekstiä.
const nimi: string = "Aino";
// number tarkoittaa lukua. Luvun ympärille ei kirjoiteta lainausmerkkejä.
const tavoite: number = 3;
// let sallii muuttujan arvon vaihtamisen myöhemmin.
let tehty: number = 1;
// = sijoittaa uuden arvon; + laskee yhteen kaksi lukua.
tehty = tehty + 1;
// boolean on totuusarvo: true on tosi ja false on epätosi.
const valmis: boolean = tehty === tavoite;
// console.log kirjoittaa sulkeissa olevat arvot terminaaliin.
console.log("Opiskelija:", nimi);
// Pilkut erottavat toisistaan saman funktion argumentit eli syötteet.
console.log("Tehty:", tehty, "Tavoite:", tavoite, "Valmis:", valmis);

// type antaa tietomuodolle nimen; tässä olion nimi on Tehtava.
type Tehtava = {
  // id on tehtävän yksilöllinen numero, jonka tyyppi on number.
  id: number;
  // otsikko on tehtävän sisältö tekstinä.
  otsikko: string;
  // valmis kertoo totuusarvolla, onko tehtävä tehty.
  valmis: boolean;
}; // Aaltosulku päättää olion tyyppikuvauksen, puolipiste päättää määrittelyn.

// Hakasulut [] merkitsevät taulukkoa eli järjestettyä joukkoa arvoja.
const tehtavat: Tehtava[] = [
  // Aaltosulkujen sisällä on yksi olio, jonka kentillä on nimet ja arvot.
  { id: 1, otsikko: "Avaa terminaali", valmis: true },
  // Tämä toinen olio noudattaa samaa Tehtava-tyyppiä.
  { id: 2, otsikko: "Käynnistä palvelin", valmis: false },
]; // Hakasulku päättää taulukon.

// function määrittelee uudelleen käytettävän toiminnon nimeltä muodostaRivi.
// Parametri tehtava saa yhden Tehtava-olion; viimeinen string on paluuarvon tyyppi.
function muodostaRivi(tehtava: Tehtava): string {
  // if suorittaa lohkon vain silloin, kun sulkeiden ehto on tosi.
  if (tehtava.valmis) {
    // return palauttaa vastauksen ja lopettaa tämän funktion suorituksen.
    return tehtava.otsikko + " — tehty";
  } // Tähän päättyy ehdollinen lohko.
  // Tähän saavutaan vain, jos tehtävä ei ollut valmis.
  return tehtava.otsikko + " — kesken";
} // Tähän päättyy funktion määrittely.

// for...of käy taulukon arvot läpi yksi kerrallaan.
for (const tehtava of tehtavat) {
  // Funktiota kutsutaan sen nimellä ja sulkeilla; tehtava annetaan syötteeksi.
  console.log(muodostaRivi(tehtava));
} // Silmukan lohko päättyy; seuraava kierros ottaa seuraavan tehtävän.

// Nuolifunktio on lyhyempi tapa kirjoittaa funktio; => erottaa syötteen ja työn.
// filter tekee uuden taulukon arvoista, joille funktio palauttaa true.
// Huutomerkki ! kääntää totuusarvon: !false on true.
const keskeneraiset = tehtavat.filter((tehtava) => !tehtava.valmis);
// length kertoo taulukon alkioiden lukumäärän.
console.log("Keskeneräisiä:", keskeneraiset.length);

// unknown tarkoittaa arvoa, jonka muotoa emme vielä tiedä.
const ulkoinenArvo: unknown = "  Opi lisää  ";
// typeof tarkistaa arvon tyypin ohjelman ollessa käynnissä.
if (typeof ulkoinenArvo === "string") {
  // Vasta tarkistuksen jälkeen voimme turvallisesti käyttää tekstin trim-metodia.
  // trim poistaa tekstin alusta ja lopusta tyhjät merkit.
  console.log("Siistitty otsikko:", ulkoinenArvo.trim());
} // Ajonaikaisen tarkistuksen lohko päättyy.

// async kertoo, että funktio palauttaa lupauksen eli Promisen.
// Promise<string> lupaa valmistuessaan merkkijonon.
async function tervehdi(): Promise<string> {
  // Promise.resolve luo heti valmistuvan lupauksen; tässä ei tehdä verkkopyyntöä.
  // await odottaa tulosta jatkamatta tämän funktion seuraavalle riville ennen sitä.
  const tervehdys = await Promise.resolve("Perusteet toimivat!");
  // async-funktion palauttama arvo päätyy lupauksen tulokseksi.
  return tervehdys;
} // Funktion lohko päättyy.

// Deno sallii await-sanan moduulin ylimmällä tasolla eli myös funktioiden ulkopuolella.
console.log(await tervehdi());
````

### 12.2 Ensimmäinen Deno-palvelin

#### `esimerkit/01-palvelin/main.ts`

````ts
// Deno.serve käynnistää HTTP-palvelimen. Deno on ajossa olevan ympäristön nimi.
// Ensimmäinen argumentti on asetusolio, toinen argumentti pyyntöä käsittelevä funktio.
Deno.serve(
  {
    // hostname rajaa kuuntelun oman tietokoneen IPv4-osoitteeseen.
    hostname: "127.0.0.1",
    // port kertoo palvelimen käyttämän oven eli portin numeron.
    port: 8000,
  },
  // request sisältää yhden HTTP-pyynnön; => aloittaa käsittelijäfunktion.
  (request: Request): Response => {
    // URL tulkitsee osoitetekstin olioksi, josta voidaan lukea esimerkiksi polku.
    const url = new URL(request.url);
    // Tässä ensimmäisessä harjoituksessa sallitaan vain lukemiseen tarkoitettu GET.
    if (request.method !== "GET") {
      // 405 kertoo, että osoitteessa ei hyväksytä pyydettyä toimintoa.
      return new Response("Tässä harjoituksessa sallitaan vain GET.", {
        // status asettaa HTTP-vastauksen numerokoodin.
        status: 405,
        // Allow kertoo asiakkaalle, mitä HTTP-metodia osoite tukee.
        headers: { "Allow": "GET", "Content-Type": "text/plain; charset=utf-8" },
      });
    }
    // pathname on osoitteen polku, esimerkiksi /api/health.
    if (url.pathname === "/api/health") {
      // Response.json muuttaa olion JSON-tekstiksi ja asettaa sen sisältötyypin.
      return Response.json({ status: "ok", viesti: "Backend vastasi." });
    }
    // / tarkoittaa sivuston juurta eli osoitetta ilman erillistä polkua.
    if (url.pathname === "/") {
      // new luo uuden Response-olion, josta Deno lähettää HTTP-vastauksen selaimelle.
      return new Response("Hei! Palvelin toimii. Avaa seuraavaksi /api/health.", {
        // UTF-8 varmistaa, että ääkköset tulkitaan oikeina kirjaimina.
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }
    // Jos mikään yllä oleva reitti ei täsmännyt, palautetaan selkeä 404-virhe.
    return Response.json({ error: "Osoitetta ei löydy." }, { status: 404 });
  }, // Pyyntöä käsittelevä funktio päättyy; Deno kutsuu sitä uudelleen seuraavalle pyynnölle.
); // Deno.serve-kutsu päättyy. Prosessi jää odottamaan pyyntöjä.
````

### 12.3 Frontendin pienet kokeilut

#### `esimerkit/02-frontend-kokeilut/01-ensimmainen-sivu.html`

````html
<!-- DOCTYPE valitsee nykyisen HTML:n käsittelytavan. -->
<!doctype html>
<!-- html ympäröi sivun; lang kertoo tekstin olevan suomea. -->
<html lang="fi">
  <!-- head sisältää selaimen tarvitsemat asetukset. -->
  <head>
    <!-- UTF-8 saa ä- ja ö-kirjaimet näkymään oikein. -->
    <meta charset="utf-8">
    <!-- viewport sovittaa sivun laitteen leveyteen. -->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- title näkyy selaimen välilehdessä. -->
    <title>Ensimmäinen harjoitukseni</title>
  </head>
  <!-- body sisältää käyttäjälle näkyvän sivun. -->
  <body>
    <!-- main kertoo, mikä alue on sivun pääsisältö. -->
    <main>
      <!-- h1 on koko sivun pääotsikko. -->
      <h1>Minun tehtävätauluni</h1>
      <!-- p muodostaa yhden tekstikappaleen. -->
      <p>Tässä harjoituksessa opin tekemään verkkosivun.</p>
      <!-- h2 aloittaa pääotsikon alaisen sisältöalueen. -->
      <h2>Tämän päivän tavoite</h2>
      <!-- Tämä p on toinen tekstikappale. -->
      <p>Osaan tallentaa HTML-tiedoston ja avata sen selaimessa.</p>
    </main>
  </body>
</html>
````

#### `esimerkit/02-frontend-kokeilut/02-tyylit/index.html`

````html
<!-- Nykyisen HTML:n asiakirja. -->
<!doctype html>
<!-- Sivun kieli on suomi. -->
<html lang="fi">
  <!-- Sivun asetusten alku. -->
  <head>
    <!-- UTF-8 määrittää tekstin merkistön. -->
    <meta charset="utf-8">
    <!-- Näkymän leveys seuraa laitteen leveyttä. -->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Välilehden nimi. -->
    <title>CSS-kokeilu</title>
    <!-- rel kertoo tyylitiedostosta; href löytää saman kansion styles.css:n. -->
    <link rel="stylesheet" href="styles.css">
  </head>
  <!-- Käyttäjälle näkyvä sisältö alkaa. -->
  <body>
    <!-- main on sivun pääsisältö. -->
    <main>
      <!-- h1 on pääotsikko. -->
      <h1>Tehtävätaulun ulkoasu</h1>
      <!-- p on tekstikappale; class yhdistää sen CSS:n kortti-luokkaan. -->
      <p class="kortti">Tämä teksti on valkoisella kortilla.</p>
    </main>
  </body>
</html>
````

#### `esimerkit/02-frontend-kokeilut/02-tyylit/styles.css`

````css
/* body valitsee sivun näkyvän sisällön juurielementin. */
body {
  /* Käytetään laitteesta löytyvää selkeää kirjasinta. */
  font-family: system-ui, sans-serif;
  /* Riviväli on 1,6 kertaa kirjasimen koko. */
  line-height: 1.6;
  /* Tumma teksti erottuu vaaleasta taustasta. */
  color: #172b3a;
  /* Tausta on vaalea siniharmaa. */
  background: #f4f7fa;
  /* Sisältö saa yhden peruskirjasinkoon verran tilaa reunoille. */
  padding: 1rem;
}

/* main valitsee pääsisällön alueen. */
main {
  /* Rivistä ei tehdä hyvin pitkää edes suurella näytöllä. */
  max-width: 44rem;
  /* Automaattiset sivumarginaalit keskittävät alueen. */
  margin-inline: auto;
}

/* Piste valitsee kaikki elementit, joilla on class="kortti". */
.kortti {
  /* Kortin tausta on valkoinen. */
  background: #ffffff;
  /* Reuna on yhden pikselin yhtenäinen tumma viiva. */
  border: 1px solid #586577;
  /* Padding jättää tilaa sisällön ja reunuksen väliin. */
  padding: 1rem;
}
````

#### `esimerkit/02-frontend-kokeilut/03-painike/app.js`

````js
// Etsitään sivulta id="tervehdys" ja annetaan viittaukselle nimi painike.
const painike = document.querySelector("#tervehdys");
// Etsitään kappale, jonka tekstiä haluamme vaihtaa.
const viesti = document.querySelector("#viesti");

// Funktion sisällä oleva koodi suoritetaan vasta kun funktiota kutsutaan.
function tervehdi() {
  // Kirjoitetaan kappaleeseen uusi teksti turvallisesti tekstinä.
  viesti.textContent = "Hei! Painike ja JavaScript toimivat.";
}

// Click-tapahtuman tullessa selain kutsuu tervehdi-funktiota.
painike.addEventListener("click", tervehdi);
````

#### `esimerkit/02-frontend-kokeilut/03-painike/index.html`

````html
<!-- Valitaan nykyinen HTML. -->
<!doctype html>
<!-- Sivun kieli on suomi. -->
<html lang="fi">
  <!-- Asetusten alku. -->
  <head>
    <!-- Merkistö on UTF-8. -->
    <meta charset="utf-8">
    <!-- Näkymä sovitetaan laitteen leveyteen. -->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Nimi selaimen välilehdelle. -->
    <title>Painikekokeilu</title>
    <!-- src löytää ohjelman; defer odottaa sivun rakenteen valmistumista. -->
    <script src="app.js" defer></script>
  </head>
  <!-- Näkyvän sivun alku. -->
  <body>
    <!-- main sisältää pääsisällön. -->
    <main>
      <!-- h1 nimeää koko kokeilun. -->
      <h1>Ensimmäinen toiminto</h1>
      <!-- id yhdistää painikkeen ohjelmaan; type tekee tavallisen toimintopainikkeen. -->
      <button id="tervehdys" type="button">Näytä tervehdys</button>
      <!-- id löytyy ohjelmasta; role ilmoittaa muuttuvan tekstin ruudunlukijalle. -->
      <p id="viesti" role="status">Odota painikkeen painamista.</p>
    </main>
  </body>
</html>
````

#### `esimerkit/02-frontend-kokeilut/04-lomake/app.js`

````js
// Etsitään lomake sen id:n avulla.
const lomake = document.querySelector("#lomake");
// Etsitään tekstikenttä, jonka value sisältää kirjoitetun tekstin.
const kentta = document.querySelector("#tehtava");
// Etsitään onnistuneen tuloksen näyttöpaikka.
const tulos = document.querySelector("#tulos");
// Etsitään virheiden näyttöpaikka.
const virhe = document.querySelector("#virhe");

// Submit syntyy lomakkeen lähettämisestä painikkeella tai Enterillä.
lomake.addEventListener("submit", (event) => {
  // Estetään oletuslähetys, jotta selain pysyy tällä sivulla.
  event.preventDefault();
  // Luetaan kentän teksti ja poistetaan alun sekä lopun välilyönnit.
  const nimi = kentta.value.trim();
  // Length kertoo merkkijonon pituuden; nolla tarkoittaa tyhjää tekstiä.
  if (nimi.length === 0) {
    // Kerrotaan täsmällinen virhe tekstinä.
    virhe.textContent = "Kirjoita tehtävän nimi. Pelkät välilyönnit eivät riitä.";
    // Palautetaan kohdistus korjattavaan kenttään.
    kentta.focus();
    // Lopetetaan käsittely ennen onnistumisviestiä.
    return;
  }
  // Poistetaan edellisen yrityksen virhe.
  virhe.textContent = "";
  // Käyttäjän kirjoitus lisätään tekstinä, ei HTML-koodina.
  tulos.textContent = `Seuraava tehtäväsi: ${nimi}`;
});
````

#### `esimerkit/02-frontend-kokeilut/04-lomake/index.html`

````html
<!-- Nykyisen HTML:n asiakirja. -->
<!doctype html>
<!-- lang kertoo sivun kielen. -->
<html lang="fi">
  <!-- Selaimen asetukset alkavat. -->
  <head>
    <!-- Merkistö tukee suomen kirjaimia. -->
    <meta charset="utf-8">
    <!-- Sivun leveys sovitetaan laitteen näkymään. -->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Välilehden otsikko. -->
    <title>Lomakekokeilu</title>
    <!-- src löytää ohjelman; defer odottaa HTML:n valmistumista. -->
    <script src="app.js" defer></script>
  </head>
  <!-- Sivulla näkyvä sisältö alkaa. -->
  <body>
    <!-- main nimeää sivun pääsisällön alueen. -->
    <main>
      <!-- h1 on sivun pääotsikko. -->
      <h1>Nimeä seuraava tehtävä</h1>
      <!-- form kokoaa lomakkeen; id antaa sille tunnisteen ohjelmaa varten. -->
      <form id="lomake">
        <!-- label näkyy koko ajan; for yhdistää nimen oikeaan kenttään. -->
        <label for="tehtava">Tehtävän nimi (pakollinen)</label>
        <!-- id yhdistää labelin; name nimeää tiedon; text on kenttätyyppi. -->
        <!-- required tekee kentästä pakollisen; maxlength rajaa pituuden. -->
        <input id="tehtava" name="title" type="text" required maxlength="200">
        <!-- submit lähettää lomakkeen myös kentästä Enteriä painettaessa. -->
        <button type="submit">Näytä tehtävä</button>
      </form>
      <!-- id löytyy koodista; role ilmoittaa tekstin muutokset rauhallisesti. -->
      <p id="tulos" role="status">Et ole vielä antanut tehtävää.</p>
      <!-- role="alert" ilmoittaa virheen heti; alue on jo valmiina DOMissa. -->
      <p id="virhe" role="alert"></p>
    </main>
  </body>
</html>
````

#### `esimerkit/02-frontend-kokeilut/05-lista/app.js`

````js
// Taulukon sisällä on kaksi oliota; jokainen olio kuvaa yhtä tehtävää.
const tehtavat = [
  // Id erottaa tehtävän; title on nimi; done on valmiudesta kertova totuusarvo.
  { id: 1, title: "Avaa HTML-tiedosto", done: true },
  // Toisella tehtävällä on oma id, nimi ja tila.
  { id: 2, title: "Kokeile lomaketta", done: false },
];
// Etsitään HTML:n tyhjä ul-elementti.
const lista = document.querySelector("#lista");

// Funktio tekee ohjelman tiedoista näkyviä elementtejä.
function piirra() {
  // Poistetaan mahdollinen edellinen sisältö, jotta rivejä ei tule kahteen kertaan.
  lista.replaceChildren();
  // Käydään kaikki taulukon tehtävät läpi yksi kerrallaan.
  for (const tehtava of tehtavat) {
    // Luodaan yksi li-elementti; sitä ei vielä ole liitetty näkyvälle sivulle.
    const rivi = document.createElement("li");
    // Tila kerrotaan sanoin; käyttäjän nimi kirjoitetaan turvallisesti tekstinä.
    rivi.textContent = `${tehtava.title}: ${tehtava.done ? "valmis" : "kesken"}`;
    // Append liittää uuden rivin ul-elementtiin, jolloin selain näyttää sen.
    lista.append(rivi);
  }
}

// Kutsutaan funktiota, jotta lista piirretään sivun avaamisen yhteydessä.
piirra();
````

#### `esimerkit/02-frontend-kokeilut/05-lista/index.html`

````html
<!-- Nykyinen HTML. -->
<!doctype html>
<!-- Asiakirjan kieli on suomi. -->
<html lang="fi">
  <!-- Asetusten alku. -->
  <head>
    <!-- Suomen kirjaimia tukeva merkistö. -->
    <meta charset="utf-8">
    <!-- Leveys seuraa laitteen näkymää. -->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Selaimen välilehdessä näkyvä nimi. -->
    <title>Taulukosta listaksi</title>
    <!-- Ohjelma haetaan samasta kansiosta ja ajetaan HTML:n jälkeen. -->
    <script src="app.js" defer></script>
  </head>
  <!-- Näkyvä sisältö alkaa. -->
  <body>
    <!-- main on sivun pääsisältö. -->
    <main>
      <!-- h1 nimeää harjoituksen. -->
      <h1>Tehtävät ohjelman muistista</h1>
      <!-- ul on järjestämätön lista; id auttaa ohjelmaa löytämään sen. -->
      <ul id="lista"></ul>
    </main>
  </body>
</html>
````

### 12.4 Frontend selaimen muistissa

#### `esimerkit/02-frontend/index.html`

````html
<!-- DOCTYPE valitsee nykyisen HTML:n käsittelytavan. -->
<!doctype html>
<!-- html on sivun juuri; lang kertoo ruudunlukijalle tekstin olevan suomea. -->
<html lang="fi">
  <!-- head sisältää selaimelle tarkoitetut asetukset. -->
  <head>
    <!-- UTF-8 näyttää myös suomen ä- ja ö-kirjaimet. -->
    <meta charset="utf-8">
    <!-- viewport sovittaa sivun laitteen leveyteen ja sallii zoomauksen. -->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- title näkyy selaimen välilehdessä. -->
    <title>Tehtävätaulu – selaimen muistissa toimiva harjoitus</title>
    <!-- rel kertoo CSS-tyylitiedostosta; href on suhteellinen polku saman kansion tiedostoon. -->
    <link rel="stylesheet" href="styles.css">
    <!-- src löytää saman kansion ohjelman; defer odottaa, että HTML on luettu. -->
    <script src="app.js" defer></script>
  </head>
  <!-- body sisältää käyttäjälle näkyvän sivun. -->
  <body>
    <!-- main on sivun pääsisältö. -->
    <main>
      <!-- h1 on koko sivun pääotsikko. -->
      <h1>Oma tehtävälista</h1>
      <!-- p on kappale; strong painottaa tärkeää tietoa myös merkityksen tasolla. -->
      <p><strong>Harjoitus: tiedot ovat vain tämän välilehden muistissa.</strong> Sivun lataaminen uudelleen tyhjentää listan. Tietoja ei lähetetä palvelimelle.</p>
      <!-- noscript neuvoo, jos JavaScript on estetty. -->
      <noscript>Ota JavaScript käyttöön, jotta voit kokeilla tehtävälistaa.</noscript>
      <!-- form kokoaa syötteen; id antaa sille nimen JavaScriptin hakua varten. -->
      <form id="task-form">
        <!-- label antaa kentälle näkyvän nimen; for vastaa inputin id:tä. -->
        <label for="task-title">Uusi tehtävä (pakollinen)</label>
        <!-- input on syötekenttä; id yhdistää labelin; name nimeää arvon; type on teksti; required ja maxlength rajaavat syötteen. -->
        <input id="task-title" name="title" type="text" required maxlength="200">
        <!-- button on painike; submit lähettää lomakkeen myös Enterillä. -->
        <button type="submit">Lisää tehtävä</button>
      </form>
      <!-- id löytyy koodista; role ja aria-live ilmoittavat muuttuvan tekstin; aria-atomic lukee koko viestin. -->
      <p id="status" role="status" aria-live="polite" aria-atomic="true">Lista on tyhjä. Lisää ensimmäinen tehtävä.</p>
      <!-- id löytyy koodista; role="alert" ilmoittaa tekstinä näytettävän virheen heti. -->
      <p id="error" role="alert"></p>
      <!-- h2 on pääotsikon alainen sisältöotsikko. -->
      <h2>Tehtävät</h2>
      <!-- ul on järjestämätön lista; id yhdistää sen ohjelmaan. -->
      <ul id="task-list"></ul>
    </main>
  </body>
</html>
````

#### `esimerkit/02-frontend/styles.css`

````css
/* Tähti valitsee jokaisen HTML-elementin. */
* {
  /* Mitattava leveys sisältää myös täytteen ja reunuksen. */
  box-sizing: border-box;
}

/* body-sääntö antaa koko sivun oletustyylit. */
body {
  /* Käytetään laitteen valmiita kirjasimia. */
  font-family: system-ui, sans-serif;
  /* Tekstin koko seuraa käyttäjän selaimeen valitsemaa peruskokoa. */
  font-size: 1rem;
  /* Ilmava riviväli helpottaa lukemista. */
  line-height: 1.6;
  /* Tumma teksti erottuu vaaleasta taustasta. */
  color: #172b3a;
  /* Tausta on vaalea. */
  background: #f4f7fa;
  /* Selaimen oletusmarginaali korvataan omalla täytteellä. */
  margin: 0;
  /* Sisältö ei osu näytön reunoihin. */
  padding: 1rem;
  /* Pitkät sanat saavat katketa kapeassa näkymässä. */
  overflow-wrap: anywhere;
}

/* main on sivun pääsisällön alue. */
main {
  /* Luettavuutta helpottava enimmäisleveys ei pakota sivua pienellä näytöllä leveäksi. */
  max-width: 46rem;
  /* Automaattiset vasen ja oikea marginaali keskittävät sisällön. */
  margin-inline: auto;
}

/* Jokainen label saa näkyvän oman rivin. */
label {
  /* block aloittaa oman rivin. */
  display: block;
  /* Nimi erottuu lihavoinnilla. */
  font-weight: 650;
  /* Nimen yläpuolelle jää tilaa. */
  margin-top: 0.75rem;
}

/* Syötteillä ja painikkeilla on yhteisiä ulkoasuominaisuuksia. */
input,
button {
  /* Peritään sivun luettava kirjasin ja tekstikoko. */
  font: inherit;
  /* Vähintään 44 pikselin korkeus helpottaa osoittamista. */
  min-height: 44px;
  /* Sisältö ei osu reunukseen. */
  padding: 0.5rem 0.75rem;
  /* Selkeä reunus erottaa kentät ja painikkeet taustasta. */
  border: 2px solid #586577;
  /* Alapuolen väli erottaa seuraavan toiminnon. */
  margin-bottom: 0.5rem;
}

/* Tavallinen syötekenttä käyttää käytettävissä olevan leveyden. */
input {
  /* Leveys ei ylitä vanhempaa box-sizing-säännön ansiosta. */
  width: 100%;
  /* Syöttöteksti on tummaa. */
  color: #172b3a;
  /* Kentän pohja on valkoinen. */
  background: #ffffff;
}

/* Painikkeen tumma tausta ja vaalea teksti erottuvat toisistaan. */
button {
  /* Painikkeen tausta on tumma sinivihreä. */
  background: #174e5c;
  /* Painikkeen teksti on valkoista. */
  color: #ffffff;
  /* Osoitin ilmaisee hiirellä käytettävän toiminnon. */
  cursor: pointer;
  /* Pitkä painiketeksti saa mennä usealle riville. */
  white-space: normal;
}

/* Näppäimistökohdistus näkyy selvästi kaikissa kohteissa. */
:focus-visible {
  /* Sininen paksu ääriviiva kertoo, mikä kohde on aktiivinen. */
  outline: 3px solid #005fcc;
  /* Viiva siirtyy hieman irti elementin reunasta. */
  outline-offset: 3px;
}

/* id-valitsin alkaa #-merkillä; tämä koskee vain virhealuetta. */
#error {
  /* Virhe näkyy tummanpunaisena mutta kerrotaan aina myös sanoin. */
  color: #7e1720;
  /* Lihavointi auttaa huomaamaan virhetekstin. */
  font-weight: 650;
}

/* Listan tehtävät erotetaan toisistaan. */
li {
  /* Jokaisen tehtävän yläreunassa on viiva. */
  border-top: 1px solid #718096;
  /* Sisältö ja reunaviiva erotetaan sisätäytteellä. */
  padding-block: 0.75rem;
  /* Tehtävien alle jätetään väliä. */
  margin-bottom: 0.75rem;
}
````

#### `esimerkit/02-frontend/app.js`

````js
// Tämä ohjelma toimii kokonaan selaimessa eikä tee fetch-pyyntöjä tai tallenna tiedostoon.
// const antaa muuttujalle nimen; document kuvaa selaimen muodostamaa sivua.
const form = document.querySelector("#task-form");
// #task-title etsii elementin, jonka HTML:n id on task-title.
const titleInput = document.querySelector("#task-title");
// Tähän ul-elementtiin lisätään tehtävien li-elementit.
const list = document.querySelector("#task-list");
// Tilaviestille on oma p-elementtinsä.
const status = document.querySelector("#status");
// Virheviestille on HTML:ssä valmiina role="alert"-alue.
const error = document.querySelector("#error");

// let sallii muuttujan uuden arvon; [] on aluksi tyhjä tehtävätaulukko.
let tasks = [];
// Seuraava uusi tehtävä saa tämän numerotunnisteen.
let nextId = 1;

// Funktio kokoaa useita rivejä yhdeksi nimellä kutsuttavaksi toiminnoksi.
function announce(message) {
  // textContent kirjoittaa tekstin sellaisenaan eikä tulkitse käyttäjän HTML-merkkejä.
  status.textContent = message;
  // Edellisen toiminnon virhe poistetaan onnistumisen yhteydessä.
  error.textContent = "";
}

// render rakentaa näkymän tasks-taulukon tämänhetkisistä tiedoista.
function render(focusId = "task-title") {
  // Poistetaan edellinen lista; ilman argumentteja replaceChildren jättää sen tyhjäksi.
  list.replaceChildren();
  // for...of käy taulukon tehtävät läpi yksi kerrallaan.
  for (const task of tasks) {
    // document.createElement luo uuden HTML-elementin muistiin.
    const item = document.createElement("li");
    // p on tehtävän nimen ja tilan sisältävä tekstikappale.
    const description = document.createElement("p");
    // Kysymysmerkki valitsee kahdesta tekstistä: true antaa valmis, false antaa kesken.
    description.textContent = `${task.title} (${task.done ? "valmis" : "kesken"})`;
    // Luodaan oikea painike tehtävän tilan vaihtamiseen.
    const toggle = document.createElement("button");
    // button-tyyppi tekee toiminnon, joka ei lähetä lomaketta.
    toggle.type = "button";
    // Yksilöllinen id auttaa palauttamaan kohdistuksen listan uudelleenrakennuksen jälkeen.
    toggle.id = `toggle-${task.id}`;
    // Painikkeen näkyvä nimi kertoo toiminnon ja kohteen.
    toggle.textContent = task.done ? `Merkitse keskeneräiseksi: ${task.title}` : `Merkitse valmiiksi: ${task.title}`;
    // addEventListener liittää tapahtumaan suoritettavan funktion.
    toggle.addEventListener("click", () => {
      // Huutomerkki vaihtaa totuusarvon: true muuttuu falseksi ja false trueksi.
      task.done = !task.done;
      // Piirretään muuttunut lista ja palautetaan kohdistus samaan toimintoon.
      render(`toggle-${task.id}`);
      // Ilmoitetaan muutos myös sanoina tilaviestissä.
      announce(task.done ? "Tehtävä merkitty valmiiksi." : "Tehtävä merkitty keskeneräiseksi.");
    });
    // Form antaa jokaiselle tehtävälle oman nimenmuokkauslomakkeen.
    const editForm = document.createElement("form");
    // Lomakkeelle annetaan sen tehtävän nimeen perustuva saavutettava nimi.
    editForm.setAttribute("aria-label", `Muokkaa tehtävää ${task.title}`);
    // Label antaa muokkauskentälle näkyvän nimen.
    const editLabel = document.createElement("label");
    // htmlFor on JavaScriptin nimi HTML:n for-attribuutille.
    editLabel.htmlFor = `edit-${task.id}`;
    // Pakollisuutta ei ilmaista pelkällä värillä tai tähdellä.
    editLabel.textContent = "Tehtävän nimi (pakollinen)";
    // Input kerää muokatun nimen.
    const editInput = document.createElement("input");
    // Id vastaa labelin htmlFor-arvoa.
    editInput.id = `edit-${task.id}`;
    // Text on tavallinen tekstikenttä.
    editInput.type = "text";
    // Name nimeää kentän lomakkeen sisällä.
    editInput.name = "title";
    // Nykyinen tehtävän nimi asetetaan muokattavaksi arvoksi.
    editInput.value = task.title;
    // Required saa selaimen tarkistamaan, ettei kenttä ole tyhjä.
    editInput.required = true;
    // Enintään 200 merkkiä riittää tämän harjoituksen tehtävän nimeen.
    editInput.maxLength = 200;
    // Luodaan muokkauslomakkeen painike.
    const save = document.createElement("button");
    // Submit käynnistää form-elementin submit-tapahtuman myös Enterillä.
    save.type = "submit";
    // Painikkeen nimi kertoo toiminnon.
    save.textContent = "Tallenna nimi";
    // Kuunnellaan juuri tämän tehtävän lomakkeen lähetystä.
    editForm.addEventListener("submit", (event) => {
      // Estetään selaimen oletuslähetys, joka lataisi sivun ja tyhjentäisi muistimme.
      event.preventDefault();
      // value lukee kentän tekstin; trim poistaa vahingossa syötetyt reunavälilyönnit.
      const newTitle = editInput.value.trim();
      // Pelkät välilyönnit eivät ole kelvollinen nimi.
      if (newTitle.length === 0) {
        // Virhe kerrotaan tekstinä olemassa olevassa alert-alueessa.
        error.textContent = "Kirjoita tehtävän nimi. Pelkät välilyönnit eivät riitä.";
        // Kohdistetaan kenttä, joka käyttäjän täytyy korjata.
        editInput.focus();
        // Return lopettaa tämän käsittelijän ennen tallennusta.
        return;
      }
      // Päivitetään olemassa olevan tehtäväolion title-ominaisuus.
      task.title = newTitle;
      // Rakennetaan päivitetty lista ja kohdistetaan saman tehtävän uusi kenttä.
      render(`edit-${task.id}`);
      // Kerrotaan, että muutos on tehty tämän välilehden muistissa.
      announce("Tehtävän nimi muutettu selaimen muistissa.");
    });
    // Lisätään lomakkeeseen label, kenttä ja tallennuspainike tässä järjestyksessä.
    editForm.append(editLabel, editInput, save);
    // Luodaan poistopainike.
    const remove = document.createElement("button");
    // Painike ei ole lomakkeen lähetyspainike.
    remove.type = "button";
    // Tehtävän nimi erottaa tämän poistopainikkeen muista.
    remove.textContent = `Poista tehtävä: ${task.title}`;
    // Liitetään poistoon click-tapahtuman käsittelijä.
    remove.addEventListener("click", () => {
      // globalThis viittaa selaimen yleiseen ympäristöön; confirm palauttaa false, jos käyttäjä peruuttaa.
      if (!globalThis.confirm(`Poistetaanko tehtävä ”${task.title}”?`)) return;
      // Filter tekee uuden taulukon, jossa ovat vain muut tunnisteet kuin poistettava.
      tasks = tasks.filter((oldTask) => oldTask.id !== task.id);
      // Poistettua painiketta ei enää ole; oletuskohdistus siirtyy uuden tehtävän kenttään.
      render();
      // Myös tyhjäksi tullut lista saa sanallisen tilan.
      announce(tasks.length === 0 ? "Tehtävä poistettu. Lista on nyt tyhjä." : "Tehtävä poistettu.");
    });
    // Kootaan yhden tehtävän osat li-elementtiin.
    item.append(description, toggle, editForm, remove);
    // Lisätään valmis li näkyvälle sivulle ul-elementin lapseksi.
    list.append(item);
  }
  // Haku löytää saman id:n myös juuri rakennetusta uudesta näkymästä.
  const focused = document.getElementById(focusId);
  // Ehto estää focus-kutsun, jos elementtiä ei löytyisi.
  if (focused) focused.focus();
}

// Lomakkeen submit toimii painikkeella sekä Enter-näppäimellä.
form.addEventListener("submit", (event) => {
  // Oletuslähetyksen estäminen pitää harjoituksen samalla sivulla.
  event.preventDefault();
  // Luetaan käyttäjän teksti ja poistetaan turhat reunavälit.
  const title = titleInput.value.trim();
  // Selain estää tyhjän kentän; tässä tarkistetaan lisäksi pelkät välilyönnit.
  if (title.length === 0) {
    // Kerrotaan täsmällinen korjausohje tekstinä.
    error.textContent = "Kirjoita tehtävän nimi. Pelkät välilyönnit eivät riitä.";
    // Palautetaan näppäimistön kohdistus korjattavaan kenttään.
    titleInput.focus();
    // Lopetetaan käsittelijä lisäämättä tehtävää.
    return;
  }
  // Push lisää olion taulukkoon; olion id, title ja done ovat tehtävän ominaisuuksia.
  tasks.push({ id: nextId, title, done: false });
  // Seuraavaa tehtävää varten kasvatetaan tunnistetta yhdellä.
  nextId = nextId + 1;
  // Reset tyhjentää lomakkeen takaisin HTML:n alkuarvoihin.
  form.reset();
  // Näytetään muuttunut lista ja kohdistetaan kenttä seuraavaa tehtävää varten.
  render();
  // Tilaviesti kertoo sekä onnistumisesta että listan määrästä.
  announce(`Tehtävä lisätty. Tehtäviä yhteensä ${tasks.length}.`);
});
````

### 12.5 SQLite ensimmäistä kertaa

#### `esimerkit/03-tietokanta/db_demo.ts`

````ts
// import tuo kirjastosta nimetyn toiminnon käyttöömme tässä tiedostossa.
// node:sqlite on Denon mukana tuleva SQLite-yhteensopivuusmoduuli: Nodea ei asenneta.
import { DatabaseSync } from "node:sqlite";

// new avaa tietokannan ja luo tiedoston, jos sitä ei vielä ole.
// Polku alkaa pisteellä, joten se on suhteessa terminaalin nykyiseen hakemistoon.
const db = new DatabaseSync("./harjoitus.sqlite");

// try...finally varmistaa, että yhteys suljetaan myös virheen sattuessa.
try {
  // exec suorittaa kiinteän SQL-lauseen ilman käyttäjältä tulevaa sisältöä.
  // PRAGMA on SQLite-asetus; foreign_keys ottaa viiteavaimien valvonnan käyttöön.
  db.exec("PRAGMA foreign_keys = ON;");
  // Monirivinen merkkijono kirjoitetaan takamerkkien eli `-merkkien väliin.
  db.exec(`
    -- CREATE TABLE luo taulun. IF NOT EXISTS säilyttää jo olevan taulun ja sen tiedot.
    CREATE TABLE IF NOT EXISTS notes (
      -- INTEGER PRIMARY KEY antaa jokaiselle riville yksilöllisen numeron.
      id INTEGER PRIMARY KEY,
      -- TEXT on tekstiä, NOT NULL vaatii arvon ja CHECK rajaa sallitun pituuden.
      title TEXT NOT NULL CHECK(length(title) BETWEEN 1 AND 200),
      -- SQLite käyttää tässä totuusarvoon 0:aa tai 1:tä; DEFAULT 0 on alkuarvo.
      done INTEGER NOT NULL DEFAULT 0 CHECK(done IN (0, 1))
    );
  `);
  // Deno.args sisältää tiedostonimen jälkeiset komentoriviargumentit.
  // ?? antaa oletusarvon, jos pyydettyä alkiota ei ole.
  const command = Deno.args[0] ?? "list";
  // if valitsee lisäyskomennon perusteella suoritettavan lohkon.
  if (command === "add") {
    // slice ottaa argumentit indeksistä 1 alkaen; join yhdistää sanat välilyönnein.
    const title = Deno.args.slice(1).join(" ").trim();
    // Tarkistamme rajat myös ennen SQL-kyselyä, jotta virhe on opiskelijalle selkeä.
    if (title.length < 1 || title.length > 200) {
      // Error on virheolio; throw keskeyttää tämän työn ja siirtää virheen kutsujalle.
      throw new Error("Otsikon pituuden pitää olla 1–200 merkkiä.");
    }
    // ? on paikkamerkki. Teksti annetaan run-metodille erillisenä arvona.
    // Tämän vuoksi tekstin heittomerkki ei voi muuttaa SQL-lauseen rakennetta.
    const result = db.prepare("INSERT INTO notes (title) VALUES (?)").run(title);
    // lastInsertRowid kertoo juuri lisätyn rivin tunnisteen.
    console.log("Lisätty tunnisteella", result.lastInsertRowid);
  } else if (command === "done" || command === "delete") {
    // Number muuttaa argumentin numeroksi; puuttuvasta arvosta tulee NaN.
    const id = Number(Deno.args[1]);
    // Turvallinen kokonaisluku on kokonaisluku JavaScriptin tarkasti esitettävällä alueella.
    if (!Number.isSafeInteger(id) || id < 1) {
      // Selkeä virhe auttaa korjaamaan komentoa arvaamisen sijaan.
      throw new Error("Anna positiivinen kokonaislukutunniste, esimerkiksi done 1.");
    }
    // Ehdollinen lauseke ? : valitsee kahdesta kiinteästä SQL-lauseesta yhden.
    const sql = command === "done"
      // UPDATE muuttaa olemassa olevan rivin; WHERE rajaa muutoksen yhteen tunnisteeseen.
      ? "UPDATE notes SET done = 1 WHERE id = ?"
      // DELETE poistaa rivin; parametrin käyttö rajaa kohteen täsmällisesti.
      : "DELETE FROM notes WHERE id = ?";
    // Myös numeerinen tunniste annetaan paikkamerkkiin erillään SQL-tekstistä.
    const result = db.prepare(sql).run(id);
    // changes kertoo muutettujen rivien määrän, ei koko taulun kokoa.
    console.log("Muutettuja rivejä:", result.changes);
  } else if (command !== "list") {
    // Tuntematon komento ei saa vahingossa tehdä muuta tietokantatyötä.
    throw new Error("Komennot: list, add Otsikko, done TUNNISTE, delete TUNNISTE.");
  }
  // SELECT hakee rivejä; ORDER BY pitää tulostusjärjestyksen samana.
  const rows = db.prepare("SELECT id, title, done FROM notes ORDER BY id").all();
  // console.table näyttää haetut rivit luettavana taulukkona terminaalissa.
  console.table(rows);
} finally {
  // close vapauttaa tietokantayhteyden. Tiedosto säilyy seuraavaa suoritusta varten.
  db.close();
}
````

#### `esimerkit/03-tietokanta/.gitignore`

````text
# Tietokanta syntyy db_demo.ts-ohjelman ajossa; harjoitusdataa ei siirretä Gitiin.
harjoitus.sqlite
# Mahdolliset SQLite-tietokannan apuosat kuuluvat samaan paikalliseen dataan.
harjoitus.sqlite-*
````

### 12.6 Valmiin sovelluksen backend

#### `esimerkit/04-valmis/01_create_schema.sql`

````sql
-- Migraatio on tietokannan rakenteen numeroitu muutos. Tämä on muutos numero 1.
-- db.ts suorittaa tämän tiedoston vain, jos muutosta 1 ei ole vielä kirjattu.
-- Älä muuta jo käytetyn migraation sisältöä. Tee myöhemmin uusi migraatio.

-- CREATE TABLE luo taulun: yksi rivi vastaa yhtä käyttäjää.
CREATE TABLE users (
  -- INTEGER PRIMARY KEY antaa riville yksilöllisen kokonaislukutunnuksen.
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  -- NOT NULL vaatii arvon; UNIQUE estää saman sähköpostin kahdesti.
  email TEXT NOT NULL UNIQUE CHECK (length(email) BETWEEN 3 AND 254),
  -- Tallennamme salasanasta hitaan PBKDF2-tiivisteen, emme salasanaa.
  password_hash TEXT NOT NULL CHECK (length(password_hash) = 64),
  -- Salt on käyttäjäkohtainen satunnainen suola, joka ei ole salaisuus.
  password_salt TEXT NOT NULL CHECK (length(password_salt) = 32),
  -- Myös tiivistyksen työmäärä tallennetaan mahdollista myöhempää muutosta varten.
  password_iterations INTEGER NOT NULL CHECK (password_iterations >= 600000),
  -- DEFAULT antaa oletuksen; CHECK sallii vain nämä kaksi roolia.
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  -- UTC-aika tallennetaan tekstinä muodossa 2026-10-19T12:34:56.123Z.
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

-- Projektin omistaja on yksi käyttäjä; käyttäjällä voi olla monta projektia.
CREATE TABLE projects (
  -- Projektilla on oma tunnus: se ei ole sama asia kuin omistajan tunnus.
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  -- FOREIGN KEY -viittaus estää viittauksen käyttäjään, jota ei ole.
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  -- Myös tietokanta torjuu tyhjän tai liian pitkän nimen.
  title TEXT NOT NULL CHECK (length(trim(title)) BETWEEN 1 AND 120),
  -- DEFAULT laskee ajan, kun uusi projekti lisätään.
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

-- Tehtävä kuuluu yhteen projektiin; projektiin voi kuulua monta tehtävää.
CREATE TABLE tasks (
  -- PRIMARY KEY yksilöi juuri tämän tehtävän.
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  -- CASCADE poistaa tehtävät samalla, kun niiden projekti poistetaan.
  project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  -- Tehtävän nimi saa olla projektin nimeä pidempi: enintään 200 merkkiä.
  title TEXT NOT NULL CHECK (length(trim(title)) BETWEEN 1 AND 200),
  -- SQLitessä käytämme kokonaislukuja 0 = kesken ja 1 = valmis.
  done INTEGER NOT NULL DEFAULT 0 CHECK (done IN (0, 1)),
  -- Tekstimuotoinen UTC-aika helpottaa ajan lähettämistä JSON-vastauksessa.
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

-- Istunto yhdistää satunnaisen kirjautumistunnisteen yhteen käyttäjään.
CREATE TABLE sessions (
  -- Tallennamme tunnisteesta vain SHA-256-tiivisteen. Raaka tunniste on evästeessä.
  token_hash TEXT PRIMARY KEY NOT NULL CHECK (length(token_hash) = 64),
  -- Käyttäjän poistaminen mitätöi samalla hänen istuntonsa.
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  -- Millisekunnit Unix-epookista: sama aikayksikkö kuin JavaScriptin Date.now().
  expires_at INTEGER NOT NULL
);

-- Indeksi nopeuttaa omistajan projektien hakua; se ei itsessään anna käyttöoikeutta.
CREATE INDEX projects_owner_index ON projects(user_id);
-- Indeksi nopeuttaa yhden projektin tehtävien hakua.
CREATE INDEX tasks_project_index ON tasks(project_id);
-- Indeksi nopeuttaa käyttäjään liittyvien istuntojen käsittelyä.
CREATE INDEX sessions_user_index ON sessions(user_id);
-- Indeksi nopeuttaa vanhentuneiden istuntojen siivousta.
CREATE INDEX sessions_expiry_index ON sessions(expires_at);
````

#### `esimerkit/04-valmis/db.ts`

````ts
// import tuo toisessa moduulissa määritellyn nimen tähän tiedostoon.
// node:sqlite on Denon mukana tuleva yhteensopivuusmoduuli, ei npm-asennus.
import { DatabaseSync } from "node:sqlite";

// export sallii muiden tiedostojen käyttää tätä tyyppiä; type ei luo ajettavaa koodia.
export type Role = "user" | "admin"; // Pystyviiva tarkoittaa: jompikumpi näistä arvoista.

// interface kuvaa olion muodon TypeScriptille; se ei tarkista selaimen lähettämää dataa.
export interface User {
  id: number; // number on JavaScriptin lukutyyppi.
  email: string; // string on merkkijono eli teksti.
  role: Role; // Rooli on yllä määritelty user tai admin.
} // Aaltosulku päättää tämän tyypin kentät.

// extends lisää User-tyypin kenttien rinnalle tietokannassa tarvittavat salasanatiedot.
export interface UserRow extends User {
  password_hash: string; // Tiiviste heksadesimaalisena tekstinä.
  password_salt: string; // Satunnainen suola heksadesimaalisena tekstinä.
  password_iterations: number; // PBKDF2-laskennan kierrosten määrä.
}

// Tietokannan sarakkeissa käytämme alaviivaa; JSONissa muunnetaan camelCase-muotoon.
export interface ProjectRow {
  id: number; // Projektin tietokantatunnus.
  user_id: number; // Projektin omistajan tunnus; sitä ei oteta asiakaspyynnöstä.
  title: string; // Projektin nimi.
  created_at: string; // Luontiaika UTC-ajassa.
}

// Tämä tyyppi kuvaa tehtävän yhden tietokantarivin.
export interface TaskRow {
  id: number; // Tehtävän oma tunnus.
  project_id: number; // Viittaus projektiin.
  title: string; // Tehtävän nimi.
  done: number; // SQLite käyttää arvoa 0 tai 1; API palauttaa boolean-arvon.
  created_at: string; // Tehtävän luontiaika.
}

// function määrittelee toiminnon; path-parametri on tietokantatiedoston polku.
// Paluutyypin DatabaseSync merkitys: kutsuja saa avatun tietokantayhteyden.
export function openDatabase(path: string): DatabaseSync {
  // new luo olion. Erityinen polku :memory: luo testille vain muistissa olevan kannan.
  const db = new DatabaseSync(path);
  // try aloittaa lohkon, jonka virheet käsitellään alempana catch-lohkossa.
  try {
    // Viiteavaimet on otettava käyttöön erikseen jokaisessa SQLite-yhteydessä.
    db.exec("PRAGMA foreign_keys = ON;");
    // WAL on kirjoitusloki; tiedostokanta voi luoda myös -wal- ja -shm-tiedostoja.
    db.exec("PRAGMA journal_mode = WAL;");
    // Lyhyt lukitus odottaa enintään 5 sekuntia ennen tietokantavirhettä.
    db.exec("PRAGMA busy_timeout = 5000;");
    // Muutoskirjanpito on erillinen taulu, jonka voi turvallisesti varmistaa joka käynnistyksellä.
    db.exec(`
      -- IF NOT EXISTS jättää jo olemassa olevan taulun rauhaan.
      CREATE TABLE IF NOT EXISTS schema_migrations (
        -- Yksi rivi tarkoittaa yhtä jo suoritettua migraatiota.
        version INTEGER PRIMARY KEY,
        -- Tallennamme myös muutoksen suoritusajan.
        applied_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
      );
    `); // Kenoviivan sijaan nämä monirivisen tekstin rajat ovat gravismerkkejä `.
    // BEGIN IMMEDIATE varaa kirjoituksen: kaksi käynnistystä ei suorita samaa muutosta yhtä aikaa.
    db.exec("BEGIN IMMEDIATE;");
    // Sisempi try antaa mahdollisuuden perua keskeneräinen rakenteen muutos.
    try {
      // prepare valmistelee SQL-lauseen; get hakee yhden rivin tai undefined-arvon.
      const applied = db.prepare("SELECT version FROM schema_migrations WHERE version = ?").get(1);
      // Huutomerkki tarkoittaa negaatiota: jos riviä ei löydy, muutos on tekemättä.
      if (!applied) {
        // import.meta.url on tämän tiedoston osoite, joten polku ei riipu kutsujan hakemistosta.
        const schema = Deno.readTextFileSync(new URL("./01_create_schema.sql", import.meta.url));
        // Tässä exec suorittaa oman SQL-tiedostomme, ei koskaan käyttäjältä tullutta SQL-tekstiä.
        db.exec(schema);
        // Kysymysmerkki on parametrin paikka; run sitoo arvon 1 erillään SQL-koodista.
        db.prepare("INSERT INTO schema_migrations(version) VALUES (?)").run(1);
      }
      // COMMIT vahvistaa sekä taulut että muutoskirjanpidon yhtenä kokonaisuutena.
      db.exec("COMMIT;");
    } catch (error) { // Virhe siirtää suorituksen tähän; error on saatu virheolio.
      // ROLLBACK peruu keskeneräisen tapahtuman, jotta kantaan ei jää puolikasta rakennetta.
      db.exec("ROLLBACK;");
      // throw välittää virheen kutsujalle eikä väitä käynnistyksen onnistuneen.
      throw error;
    }
    // return päättää funktion ja antaa avatun yhteyden kutsujan käytettäväksi.
    return db;
  } catch (error) {
    // Jos alustus epäonnistuu, yhteyttä ei jätetä avoimeksi.
    db.close();
    // Kutsuja saa alkuperäisen virheen ja voi pysäyttää käynnistyksen.
    throw error;
  }
}
````

#### `esimerkit/04-valmis/security.ts`

````ts
// node:crypto tarjoaa Denon mukana vertailun, joka ei lopeta ensimmäiseen eriävään tavuun.
import { timingSafeEqual } from "node:crypto";

// const on muuttumaton nimi. Alaviiva numeroissa helpottaa lukemista: 600_000 = 600000.
export const PASSWORD_ITERATIONS = 600_000; // PBKDF2-HMAC-SHA-256:n työmäärä.
// Kahdeksan tuntia sekunteina; evästeen Max-Age käyttää sekunteja.
export const SESSION_SECONDS = 8 * 60 * 60;
// Sama evästeen nimi on käytössä sekä luotaessa, luettaessa että poistettaessa.
export const COOKIE_NAME = "tehtavataulu_session";

// Paluuolio sisältää tallennettavat arvot; se ei sisällä alkuperäistä salasanaa.
export interface PasswordDigest {
  hash: string; // 32 tavun laskentatulos 64 heksadesimaalimerkkinä.
  salt: string; // 16 satunnaista tavua 32 heksadesimaalimerkkinä.
  iterations: number; // Hitaan laskennan kierrosten määrä.
}

// Uint8Array on tavujono: kukin alkio on kokonaisluku väliltä 0–255.
function toHex(bytes: Uint8Array): string {
  // Array.from käy tavut läpi; nuoli => määrittelee jokaiselle tavulle tehtävän muunnoksen.
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
  // toString(16) kirjoittaa luvun heksamuotoon; padStart lisää tarvittaessa etunollan.
}

// Tässä luemme vain oman tietokantamme tai oman ohjelmamme tuottamaa heksatekstiä.
function fromHex(hex: string) {
  // Kaksi tekstimerkkiä vastaa yhtä tavua; new varaa tulosta varten uuden tavutaulukon.
  const bytes = new Uint8Array(hex.length / 2);
  // for toistaa lohkon; index++ kasvattaa laskuria yhdellä jokaisen kierroksen jälkeen.
  for (let index = 0; index < bytes.length; index++) {
    // slice ottaa kaksi merkkiä ja parseInt(..., 16) tulkitsee ne heksalukuna.
    bytes[index] = Number.parseInt(hex.slice(index * 2, index * 2 + 2), 16);
  }
  // Palautamme oman uuden taulukon: salainen vertailu tarvitsee tekstin sijaan tavuja.
  return bytes;
}

// async-funktio palauttaa Promisen eli myöhemmin valmistuvan tuloksen.
async function derivePassword(
  password: string,
  salt: string,
  iterations: number,
): Promise<Uint8Array> {
  // TextEncoder muuntaa salasanan Unicode-tekstin UTF-8-tavuiksi.
  const passwordBytes = new TextEncoder().encode(password);
  // await odottaa kryptografisen operaation valmistumista; se ei muuta salasanaa tekstiksi lokiin.
  const key = await crypto.subtle.importKey(
    "raw", // Lähtöarvo annetaan tavujonona.
    passwordBytes, // Tämä on salasanan tavuesitys, jota ei tallenneta kantaan.
    "PBKDF2", // Käytämme salasanoille tarkoitettua hidasta avaimenjohdantoa.
    false, // Avainta ei saa viedä ulos tästä CryptoKey-oliosta.
    ["deriveBits"], // Hakasulkeet muodostavat taulukon sallituista toiminnoista.
  );
  // PBKDF2 tekee paljon työtä jokaiselle arvaukselle, mikä hidastaa salasanojen murtamista.
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", salt: fromHex(salt), iterations }, // Aaltosulut luovat asetusolion.
    key, // Käytämme juuri luotua avainta.
    256, // Laskentatuloksen pituus bitteinä: 256 bittiä = 32 tavua.
  );
  // Muunnamme ArrayBuffer-tuloksen tavutaulukoksi myöhempää käsittelyä varten.
  return new Uint8Array(bits);
}

// Rekisteröinti kutsuu tätä funktiota aina uudella satunnaisella suolalla.
export async function hashPassword(password: string): Promise<PasswordDigest> {
  // getRandomValues käyttää kryptografisesti turvallista satunnaisuutta.
  const salt = toHex(crypto.getRandomValues(new Uint8Array(16)));
  // Sama salasana eri suolalla antaa eri tallennettavan tiivisteen.
  const hash = toHex(await derivePassword(password, salt, PASSWORD_ITERATIONS));
  // Lyhennys {hash} tarkoittaa samaa kuin {hash: hash}.
  return { hash, salt, iterations: PASSWORD_ITERATIONS };
}

// Promise<boolean> tarkoittaa myöhemmin saatavaa tosi/epätosi-vastausta.
export async function verifyPassword(password: string, stored: PasswordDigest): Promise<boolean> {
  // Laskemme syötetystä salasanasta vertailuarvon käyttäen tallennettua suolaa ja työmäärää.
  const candidate = await derivePassword(password, stored.salt, stored.iterations);
  // Palautamme tallennetun heksatekstin takaisin 32 tavuksi.
  const expected = fromHex(stored.hash);
  // && vaatii molemmat ehdot. Vertailun molempien tavujonojen on oltava samanpituisia.
  return candidate.length === expected.length && timingSafeEqual(candidate, expected);
}

// Tuntematon sähköposti tekee saman hitaan salasanatyön kuin olemassa oleva käyttäjä.
// Tämä vähentää ilmeistä ajoituseroa; se ei lupaa koko HTTP-pyynnön vakioaikaisuutta.
export const DUMMY_PASSWORD: PasswordDigest = {
  hash: "0".repeat(64), // Keinotekoinen vertailuarvo, jota ei tallenneta käyttäjälle.
  salt: "0".repeat(32), // Keinotekoinen, oikeanpituinen suola vain tuntemattoman tilin polulle.
  iterations: PASSWORD_ITERATIONS, // Sama työmäärä kuin oikealla käyttäjällä.
};

// Istuntotunniste on arvaamaton salaisuus; sitä ei muodosteta käyttäjän tunnuksesta.
export function newSessionToken(): string {
  // 32 satunnaista tavua antaa 256 bittiä satunnaisuutta; tulos on 64 heksamerkkiä.
  return toHex(crypto.getRandomValues(new Uint8Array(32)));
}

// Tunniste on valmiiksi vahvasti satunnainen, joten sille riittää nopea SHA-256-tiiviste.
// Salasanalle ei riitä: salasanaa ihminen voi käyttää uudelleen tai sen voi arvata.
export async function hashSessionToken(token: string): Promise<string> {
  // digest laskee tiivisteen; se ei salaa tietoa palautettavasti.
  const hash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(token));
  // Tallennamme tietokantaan vain tämän tiivisteen.
  return toHex(new Uint8Array(hash));
}

// Luemme Cookie-otsakkeesta vain sovelluksen oman evästeen.
export function readSessionToken(request: Request): string | null {
  // ?? käyttää tyhjää tekstiä, jos otsaketta ei ole eli tulos on null.
  const cookies = (request.headers.get("cookie") ?? "").split(";");
  // map siistii osat; filter pitää vain omalla nimellä alkavat evästeet.
  const matches = cookies.map((part) => part.trim()).filter((part) =>
    part.startsWith(`${COOKIE_NAME}=`)
  );
  // Hylkäämme myös saman nimiset päällekkäiset evästeet, jotta tulkinta on yksiselitteinen.
  if (matches.length !== 1) return null;
  // slice poistaa nimen ja yhtäsuuruusmerkin arvon edestä.
  const token = matches[0].slice(COOKIE_NAME.length + 1);
  // Säännöllinen lauseke hyväksyy täsmälleen oman 64-merkkisen heksamuotomme.
  return /^[a-f0-9]{64}$/.test(token) ? token : null; // ? : valitsee toisen kahdesta arvosta.
}

// secure on true HTTPS-osoitteessa; localhostin tavallinen HTTP käyttää false-arvoa.
export function sessionCookie(token: string, secure: boolean): string {
  // HttpOnly estää JavaScriptin lukemasta evästettä; SameSite auttaa torjumaan sivustojen välisiä pyyntöjä.
  const base =
    `${COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${SESSION_SECONDS}`;
  // Secure rajaa evästeen lähettämisen HTTPS-yhteyksiin. Domain puuttuu: eväste on isäntäkohtainen.
  return base + (secure ? "; Secure" : "");
}

// Eväste poistetaan samalla nimellä ja polulla, joilla se luotiin.
export function deletedSessionCookie(secure: boolean): string {
  // Max-Age=0 käskee selainta poistamaan evästeen; palvelin poistaa myös tietokannan istunnon.
  return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0${secure ? "; Secure" : ""}`;
}

// Yksi laskuririvi kuvaa yhden IP-osoitteen tai sähköpostin yrityksiä aikajaksolla.
interface AttemptWindow {
  count: number; // Kuinka monta yritystä tähän ikkunaan on laskettu.
  resetAt: number; // Milloin laskuri nollautuu, millisekunteina Unix-epookista.
}

// Funktio palauttaa laskuritoiminnon, joka muistaa oman Map-taulukkonsa kutsujen välillä.
// now-parametri on funktio; testeissä voimme antaa sille hallittavan kellon.
export function createRateLimiter(now: () => number) {
  // Map tallentaa avain–arvo-pareja tämän palvelinprosessin muistiin.
  const windows = new Map<string, AttemptWindow>();
  // Yhden ikkunan kesto on 15 minuuttia millisekunneissa.
  const windowMs = 15 * 60 * 1000;
  // Paluuarvo on nuolifunktio: null sallii yrityksen, luku kertoo odotussekunnit.
  return (key: string, limit: number): number | null => {
    // Kello luetaan kerran, jotta tämän kutsun kaikki vertailut käyttävät samaa aikaa.
    const time = now();
    // Siivoamme vanhentuneet laskurit myös muistista, jotta ne eivät kerry ikuisesti.
    for (const [savedKey, window] of windows) {
      // delete poistaa Map-olion rivin, jos aikaraja on saavutettu.
      if (window.resetAt <= time) windows.delete(savedKey);
    }
    // get hakee olemassa olevan laskurin tai palauttaa undefined-arvon.
    let window = windows.get(key);
    // Uudelle avaimelle tarvitaan uusi aikajakso ja laskuri.
    if (!window) {
      // Kiinteä yläraja estää rajattoman määrän yksilöllisiä laskuriavaimia.
      if (windows.size >= 10_000) return 60;
      // Aloitamme nollasta; hetken päästä myös tämä kutsu lasketaan mukaan.
      window = { count: 0, resetAt: time + windowMs };
      // set tallentaa uuden avaimen ja sen laskurin.
      windows.set(key, window);
    }
    // Jos sallittu määrä on jo käytetty, palautamme jäljellä olevat sekunnit ylöspäin pyöristäen.
    if (window.count >= limit) return Math.ceil((window.resetAt - time) / 1000);
    // Myös onnistuneet yritykset lasketaan; tämän tarkoitus on rajata autentikointityön määrää.
    window.count += 1;
    // null tarkoittaa kutsujalle: tämä yritys saa jatkaa.
    return null;
  };
}
````

#### `esimerkit/04-valmis/http.ts`

````ts
// Record<string, unknown> tarkoittaa oliota, jonka kenttien arvoja ei vielä tunneta.
// unknown pakottaa tarkistamaan arvon ennen käyttöä: selaimen JSON ei ole luotettua.
export type JsonObject = Record<string, unknown>;

// extends Error tekee omasta virheestämme tavallisen JavaScript-virheen alityypin.
export class HttpError extends Error {
  status: number; // Esimerkiksi 400 = virheellinen pyyntö tai 401 = kirjautuminen puuttuu.
  headers: Record<string, string>; // Esimerkiksi Retry-After kertoo odotusajan sekunteina.

  // constructor suoritetaan, kun muu koodi kutsuu new HttpError(...).
  constructor(status: number, message: string, headers: Record<string, string> = {}) {
    // super kutsuu Error-yliluokan alustusta ja tallettaa virheilmoituksen.
    super(message);
    // this tarkoittaa juuri luotavaa virheoliota; tallennamme sille omat kentät.
    this.status = status;
    // Parametrin oletus {} tarkoittaa tyhjää oliota, jos otsakkeita ei anneta.
    this.headers = headers;
  }
}

// Yksi apufunktio varmistaa, että kaikki JSON-vastaukset ilmoittavat sisältötyyppinsä.
export function json(
  data: unknown,
  status = 200,
  extraHeaders: Record<string, string> = {},
): Response {
  // JSON.stringify muuttaa JavaScript-arvon JSON-tekstiksi; Response on HTTP-vastaus.
  return new Response(JSON.stringify(data), {
    status, // Kentän lyhyt muoto käyttää samannimisen parametrin arvoa.
    headers: { "Content-Type": "application/json; charset=utf-8", ...extraHeaders }, // ... kopioi lisäotsakkeet.
  });
}

// Kirjoittava pyyntö voi muuttaa tietoa; myös kirjautuminen ja uloskirjautuminen kuuluvat tähän.
export function isWriteMethod(method: string): boolean {
  // includes palauttaa true, jos metodi löytyy tästä sallittujen kirjoitusmetodien taulukosta.
  return ["POST", "PUT", "PATCH", "DELETE"].includes(method);
}

// CSRF tarkoittaa hyökkäystä, jossa toinen sivusto yrittää tehdä pyynnön käyttäjän evästeellä.
export function checkWriteRequest(request: Request, allowedOrigin: string): void {
  // Origin koostuu protokollasta, isäntänimestä ja portista; selaimen JavaScript ei voi vapaasti asettaa sitä.
  if (request.headers.get("origin") !== allowedOrigin) {
    // Puuttuva Origin hylätään myös. Esimerkiksi curl-harjoituksessa se on lisättävä itse.
    throw new HttpError(403, "Pyynnön alkuperää ei hyväksytty.");
  }
  // Otsakkeessa voi olla myös charset; erotamme varsinaisen mediatyypin ennen puolipistettä.
  const contentType = request.headers.get("content-type")?.split(";")[0].trim().toLowerCase();
  // JSON-vaatimus estää tavallisen vieraan sivuston HTML-lomakkeen käyttämisen API:n kirjoituksiin.
  if (contentType !== "application/json") {
    // 415 kertoo, ettei pyynnön sisältötyyppi ole tuettu.
    throw new HttpError(415, "Käytä Content-Type: application/json -otsaketta.");
  }
}

// Luemme enintään 16 KiB, vaikka asiakas jättäisi Content-Length-otsakkeen pois tai valehtelisi sen.
export async function readJsonObject(request: Request): Promise<JsonObject> {
  // Tämä tavuraja koskee koko JSON-runkoa, ei vain yhtä kenttää.
  const limit = 16 * 1024;
  // Number muuntaa pituusotsakkeen luvuksi; puuttuva otsake tuottaa tässä nollan.
  const declaredLength = Number(request.headers.get("content-length") ?? "0");
  // Selvästi liian pitkän pyynnön voi hylätä jo ennen rungon lukemista.
  if (declaredLength > limit) {
    // ?. kutsuu cancel-metodia vain, jos body on olemassa; peruminen lopettaa lisäluennan.
    await request.body?.cancel();
    // 413 ilmaisee liian suuren pyynnön.
    throw new HttpError(413, "Pyynnön sisältö saa olla enintään 16 KiB.");
  }
  // Myös poistossa lähetetään JSON-olio {}: pyyntö ei jää sisällöltään tulkinnanvaraiseksi.
  if (!request.body) throw new HttpError(400, "Lähetä JSON-olio, esimerkiksi {}.");
  // getReader antaa pääsyn rungon tavupaloihin yksi pala kerrallaan.
  const reader = request.body.getReader();
  // Tämä taulukko pitää vastaanotetut palat, kunnes tiedämme kokonaispituuden.
  const chunks: Uint8Array[] = [];
  // let sallii arvon muuttamisen: koko kasvaa jokaisesta uudesta palasta.
  let total = 0;
  // finally-lohko alempana vapauttaa lukijan myös virheessä.
  try {
    // while toistaa lukemista, kunnes break päättää silmukan.
    while (true) {
      // Destrukturointi {value, done} poimii kaksi kenttää lukutuloksesta.
      const { value, done } = await reader.read();
      // done kertoo, että koko pyyntörunko on luettu.
      if (done) break;
      // byteLength mittaa todellisia tavuja; merkkimäärä voisi olla tätä pienempi.
      total += value.byteLength;
      // Tarkistamme todellisen koon ennen kuin tallennamme tämän palan.
      if (total > limit) {
        // Lopetamme rungon lukemisen heti, kun raja ylittyy.
        await reader.cancel();
        // Heitetty virhe muutetaan app.ts-tiedostossa selkeäksi JSON-vastaukseksi.
        throw new HttpError(413, "Pyynnön sisältö saa olla enintään 16 KiB.");
      }
      // push lisää yhden palan taulukon loppuun.
      chunks.push(value);
    }
  } finally {
    // Lukijan lukko ei saa jäädä varatuksi onnistumisen tai virheen jälkeen.
    reader.releaseLock();
  }
  // Varaamme täsmälleen lukemamme kokoisen yhteisen tavutaulukon.
  const bytes = new Uint8Array(total);
  // offset kertoo, mihin kohtaan seuraava pala kirjoitetaan.
  let offset = 0;
  // for...of käy läpi tallennetut palat niiden alkuperäisessä järjestyksessä.
  for (const chunk of chunks) {
    // set kopioi palan tavut oikeaan kohtaan.
    bytes.set(chunk, offset);
    // Seuraava pala alkaa juuri kirjoitetun palan jälkeen.
    offset += chunk.byteLength;
  }
  // JSON.parse voi heittää virheen; sen tulos on aluksi tarkoituksella unknown.
  let parsed: unknown;
  // Käsittelemme virheellisen UTF-8-tekstin ja virheellisen JSONin samalla ymmärrettävällä virheellä.
  try {
    // fatal=true torjuu rikkinäiset UTF-8-tavut; parse tulkitsee tekstin JSON-arvoksi.
    parsed = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
  } catch {
    // 400 kertoo, että pyyntö ei ole kelvollista JSONia.
    throw new HttpError(400, "Pyynnön sisältö ei ole kelvollista JSONia.");
  }
  // typeof null on myös object, joten null pitää sulkea erikseen pois; taulukko ei ole lomakeolio.
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    // || tarkoittaa: ainakin yksi näistä hylkäysehdoista toteutuu.
    throw new HttpError(400, "JSONin ylimmän tason pitää olla olio.");
  }
  // as kertoo TypeScriptille juuri tarkistetun rakenteen; yksittäiset kentät ovat yhä unknown.
  return parsed as JsonObject;
}

// Torjumme ylimääräiset kentät kuten role, user_id ja project_id, ellei reitti nimenomaan salli niitä.
export function allowFields(body: JsonObject, allowed: string[]): void {
  // Object.keys palauttaa olion omien kenttien nimet.
  for (const field of Object.keys(body)) {
    // Syöte ei saa laajentaa reitin toimivaltaa lisäämällä omia kenttiään.
    if (!allowed.includes(field)) {
      throw new HttpError(400, "Pyynnössä on kenttä, jota tämä toiminto ei hyväksy.");
    }
  }
}

// Sähköpostin tarkistus on palvelimella pakollinen, vaikka selainkin tarkistaa lomaketta.
export function requireEmail(value: unknown): string {
  // typeof tekee ajonaikaisen tyyppitarkistuksen; TypeScript-tyyppi yksin ei tee sitä.
  if (typeof value !== "string") throw new HttpError(400, "Anna sähköpostiosoite tekstinä.");
  // trim poistaa reunavälilyönnit ja toLowerCase yhdenmukaistaa tilin nimen.
  const email = value.trim().toLowerCase();
  // Tämä on kurssin muototarkistus; osoitteen omistajuus vaatisi erillisen vahvistusviestin.
  // Myös näkymätön NUL torjutaan, jotta tietokannan tekstipituuden tulkinta ei poikkea tarkistuksesta.
  if (
    email.length > 254 || email.includes("\u0000") ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    // Virhe ei kerro, onko osoitteella olemassa tiliä.
    throw new HttpError(400, "Anna sähköpostiosoite muodossa nimi@example.test.");
  }
  // Kutsuja saa yhdenmukaistetun osoitteen, ei alkuperäistä tarkistamatonta arvoa.
  return email;
}

// Salasanassa sallitaan välilyönnit ja pitkät salalauseet, eikä sitä koskaan trimmailla.
export function requirePassword(value: unknown): string {
  // Vain merkkijono kelpaa; esimerkiksi numerosta ei tehdä salasanaa automaattisesti.
  if (typeof value !== "string") throw new HttpError(400, "Anna salasana tekstinä.");
  // Array.from laskee Unicode-koodipisteet; esimerkiksi moni emoji on useampi tällainen piste.
  const length = Array.from(value).length;
  // 15–128 merkkiä on tämän harjoitussovelluksen salasanakäytäntö ilman MFA:ta.
  if (length < 15 || length > 128) {
    throw new HttpError(400, "Salasanassa pitää olla 15–128 merkkiä.");
  }
  // Salasanan sisältöä ei muuteta huomaamatta tarkistuksen yhteydessä.
  return value;
}

// Sama nimitarkistus toimii projekteille ja tehtäville eri enimmäispituuksilla.
export function requireTitle(value: unknown, maxLength: number): string {
  // JSON voi sisältää myös taulukon tai numeron; torjumme ne tässä.
  if (typeof value !== "string") throw new HttpError(400, "Anna nimi tekstinä.");
  // Nimen reunoilla olevat tyhjät merkit eivät kuulu tallennettavaan nimeen.
  const title = value.trim();
  // Unicode-koodipisteiden laskenta vastaa tavallisen SQLite-tekstin length-tarkistuksen tarkoitusta.
  const length = Array.from(title).length;
  // Kieltämällä NUL-merkin vältämme SQLite length -funktion ja JavaScriptin erilaisen NUL-tulkinnan.
  if (length < 1 || length > maxLength || title.includes("\u0000")) {
    // ${...} sijoittaa muuttujan arvon gravismerkkien rajaamaan tekstipohjaan.
    throw new HttpError(400, `Nimessä pitää olla 1–${maxLength} merkkiä eikä NUL-merkkiä.`);
  }
  // Vain tarkistettu teksti jatkaa tietokantakerrokseen.
  return title;
}

// Polun :id-osa saapuu tekstinä; tietokanta tarvitsee positiivisen kokonaisluvun.
export function requireId(value: string): number {
  // Pelkät numeromerkit kelpaavat; esimerkiksi 1abc tai -2 eivät kelpaa.
  if (!/^\d+$/.test(value)) throw new HttpError(404, "Kohdetta ei löytynyt.");
  // Number tulkitsee kokonaisen merkkijonon luvuksi.
  const id = Number(value);
  // SafeInteger estää JavaScriptin tarkkuusrajan ylittävät tunnukset.
  if (!Number.isSafeInteger(id) || id <= 0) throw new HttpError(404, "Kohdetta ei löytynyt.");
  // Palautamme tyypitetyn ja tarkistetun numeron.
  return id;
}

// Asetamme samat suojaavat otsakkeet myös virhevastauksille ja staattisille tiedostoille.
export function secureResponse(response: Response, https: boolean): Response {
  // CSP rajaa sivun oman originin skripteihin, tyyleihin, kuviin ja verkkopyyntöihin.
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'none'; script-src 'self'; style-src 'self'; connect-src 'self'; img-src 'self'; base-uri 'none'; form-action 'self'; frame-ancestors 'none'",
  );
  // Selain ei saa arvata esimerkiksi JSON-tekstin olevan suoritettavaa JavaScriptiä.
  response.headers.set("X-Content-Type-Options", "nosniff");
  // Sivun kehystys estetään myös tätä vanhempaa otsaketta tukevissa selaimissa.
  response.headers.set("X-Frame-Options", "DENY");
  // Linkin seuraaminen ei paljasta lähtösivun osoitetta Referer-otsakkeessa.
  response.headers.set("Referrer-Policy", "no-referrer");
  // Vastausten välimuistiin tallennus kielletään etenkin kirjautuneen käyttäjän datan vuoksi.
  response.headers.set("Cache-Control", "no-store");
  // Tämän sivun vastauksia ei ole tarkoitettu vieraan originin resursseiksi.
  response.headers.set("Cross-Origin-Resource-Policy", "same-origin");
  // Sovellus ei tarvitse kameraa, mikrofonia eikä sijaintitietoa.
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  // HSTS ohjaa HTTPS-käyttöön vain silloin, kun sovelluksen julkinen osoite on HTTPS.
  if (https) response.headers.set("Strict-Transport-Security", "max-age=31536000");
  // Response-olion sisältö pysyy samana; olemme täydentäneet sen otsakkeet.
  return response;
}
````

#### `esimerkit/04-valmis/auth.ts`

````ts
// import type tuo vain tyyppitiedon; tätä tuontia ei tarvita ohjelman ajossa.
import type { DatabaseSync } from "node:sqlite";
// User on julkinen käyttäjätieto; UserRow sisältää myös salasanan vertailutiedot.
import type { User, UserRow } from "./db.ts";
// HTTP-apufunktiot tarkistavat tuntemattoman JSONin ennen sen käyttämistä.
import {
  allowFields,
  HttpError,
  json,
  type JsonObject,
  requireEmail,
  requirePassword,
} from "./http.ts";
// Turvatoiminnot on erotettu omaan tiedostoonsa, jotta niiden tehtävät näkyvät selvästi.
import {
  createRateLimiter,
  deletedSessionCookie,
  DUMMY_PASSWORD,
  hashPassword,
  hashSessionToken,
  newSessionToken,
  readSessionToken,
  SESSION_SECONDS,
  sessionCookie,
  verifyPassword,
} from "./security.ts";

// Tehdasfunktio kokoaa tämän yhden palvelimen kirjautumistoiminnot ja yhteisen yrityslaskurin.
export function createAuth(db: DatabaseSync, secureCookies: boolean, now: () => number) {
  // Sulkeuma muistaa laskurit, vaikka yksi HTTP-pyyntö päättyisi.
  const consumeAttempt = createRateLimiter(now);

  // Sisäinen apufunktio muuttaa ylitetyn rajan käyttäjälle näkyväksi HTTP-virheeksi.
  function checkAttempts(key: string, maximum: number): void {
    // Paluuarvo null tarkoittaa sallittua yritystä; numero on odotussekuntien määrä.
    const retryAfter = consumeAttempt(key, maximum);
    // !== vertaa arvoja ilman automaattista tyyppimuunnosta.
    if (retryAfter !== null) {
      // 429 kertoo liian monista yrityksistä; Retry-After kertoo, milloin voi yrittää uudelleen.
      throw new HttpError(429, "Liian monta yritystä. Odota ja yritä uudelleen.", {
        "Retry-After": String(retryAfter),
      });
    }
  }

  // Tämä tarkistus lukee käyttäjän aina palvelimen istunnosta, ei pyynnön user_id-kentästä.
  async function currentUser(request: Request): Promise<User> {
    // Evästeen arvo on salainen satunnaistunniste, ei käyttäjän rooli tai käyttäjätunnus.
    const token = readSessionToken(request);
    // Puuttuva tai vääränmuotoinen eväste ei riitä kirjautumiseen.
    if (!token) throw new HttpError(401, "Kirjaudu ensin sisään.");
    // Tietokannasta haetaan tunnisteen tiivisteellä; raakaa tunnistetta ei tallenneta.
    const tokenHash = await hashSessionToken(token);
    // Poistamme myös palvelimen puolella vanhentuneet istunnot ennen käyttöoikeustarkistusta.
    db.prepare("DELETE FROM sessions WHERE expires_at <= ?").run(now());
    // JOIN yhdistää voimassa olevan istunnon käyttäjään; rooli luetaan tämänhetkisestä käyttäjärivistä.
    const user = db.prepare(`
      -- Palautamme vain julkiseen User-tyyppiin kuuluvat kentät.
      SELECT users.id, users.email, users.role
      FROM sessions
      JOIN users ON users.id = sessions.user_id
      -- Molemmat ehdot vaaditaan: oikea tunniste ja tulevaisuudessa oleva vanhenemisaika.
      WHERE sessions.token_hash = ? AND sessions.expires_at > ?
    `).get(tokenHash, now()) as User | undefined; // as kuvaa oman SQL-kyselymme tuloksen TypeScriptille.
    // Tuntematon, poistettu tai vanhentunut istunto tuottaa saman 401-virheen.
    if (!user) throw new HttpError(401, "Kirjaudu ensin sisään.");
    // Paluuolio ei sisällä salasanatietoja eikä istuntotunnistetta.
    return user;
  }

  // Jokainen onnistunut kirjautuminen ja rekisteröinti saa uuden satunnaistunnisteen.
  async function beginSession(request: Request, user: User, status: number): Promise<Response> {
    // Luomme uuden tunnisteen; emme jatka selaimen mahdollisesti lähettämällä vanhalla arvolla.
    const token = newSessionToken();
    // Laskemme uuden tunnisteen tietokantaan tallennettavan tiivisteen.
    const tokenHash = await hashSessionToken(token);
    // Luemme vanhan evästeen, jotta tämän selaimen aikaisempi istunto voidaan mitätöidä.
    const oldToken = readSessionToken(request);
    // ? : tekee vanhan tunnisteen tiivisteen vain, jos tunniste oli olemassa.
    const oldHash = oldToken ? await hashSessionToken(oldToken) : null;
    // Tässä Date.now-yksikkö on millisekunti; kerromme evästeen sekunnit tuhannella.
    const expiresAt = now() + SESSION_SECONDS * 1000;
    // Istunnon vaihto on yksi tietokantatapahtuma: vanha poistuu ja uusi lisätään yhdessä.
    db.exec("BEGIN IMMEDIATE;");
    // try/catch varmistaa, ettei epäonnistunut vaihto jää puolikkaaksi.
    try {
      // Mahdollinen aiempi eväste ei jää toimivaksi uuden kirjautumisen jälkeen.
      if (oldHash) db.prepare("DELETE FROM sessions WHERE token_hash = ?").run(oldHash);
      // Siivoamme vanhentuneet istunnot myös kirjautumisen yhteydessä.
      db.prepare("DELETE FROM sessions WHERE expires_at <= ?").run(now());
      // Parametrit annetaan run-kutsussa; niitä ei liitetä SQL-tekstiin.
      db.prepare("INSERT INTO sessions(token_hash, user_id, expires_at) VALUES (?, ?, ?)").run(
        tokenHash,
        user.id,
        expiresAt,
      );
      // Vahvistamme kaikki tapahtuman muutokset.
      db.exec("COMMIT;");
    } catch (error) {
      // Virheessä palautamme tietokannan ennen tapahtumaa vallinneeseen tilaan.
      db.exec("ROLLBACK;");
      // app.ts muuttaa odottamattoman virheen yleiseksi palvelinvirheeksi.
      throw error;
    }
    // Set-Cookie on HTTP-vastausotsake: selain tallentaa sen automaattisesti omaksi evästeekseen.
    return json({ user }, status, { "Set-Cookie": sessionCookie(token, secureCookies) });
  }

  // Rekisteröinti luo tavallisen käyttäjän ja avaa tälle istunnon.
  async function register(request: Request, body: JsonObject, clientIp: string): Promise<Response> {
    // Asiakas saa lähettää vain sähköpostin ja salasanan; role-kenttä hylätään.
    allowFields(body, ["email", "password"]);
    // Tarkistamme ja yhdenmukaistamme sähköpostiosoitteen.
    const email = requireEmail(body.email);
    // Tarkistamme salasanan pituuden muuttamatta sen sisältöä.
    const password = requirePassword(body.password);
    // Yksi IP saa tässä opetuspalvelimessa tehdä enintään 10 rekisteröintiyritystä 15 minuutissa.
    checkAttempts(`register:ip:${clientIp}`, 10);
    // Salasanan hidas laskenta tehdään ennen tietokantaan tallentamista.
    const digest = await hashPassword(password);
    // Rooli on kovakoodattu user-arvoksi; käyttäjä ei voi valita admin-roolia.
    const result = db.prepare(`
      -- Salasana-arvot ovat erillisiä parametreja, eivät SQL-koodin osia.
      INSERT INTO users(email, password_hash, password_salt, password_iterations, role)
      VALUES (?, ?, ?, ?, 'user')
      -- UNIQUE-rajoite suojaa myös kahta samanaikaista samalla osoitteella tehtyä rekisteröintiä.
      ON CONFLICT(email) DO NOTHING
    `).run(email, digest.hash, digest.salt, digest.iterations);
    // changes kertoo muutettujen rivien määrän; nolla tarkoittaa varattua sähköpostia.
    if (Number(result.changes) === 0) {
      throw new HttpError(409, "Rekisteröinti ei onnistunut näillä tiedoilla.");
    }
    // Muodostamme vain selaimelle sopivan julkisen käyttäjäolion.
    const user: User = { id: Number(result.lastInsertRowid), email, role: "user" };
    // 201 on uuden resurssin luomista tarkoittava HTTP-tila.
    return await beginSession(request, user, 201);
  }

  // Kirjautumisessa tunnistetaan käyttäjä olemassa olevan salasanan avulla.
  async function login(request: Request, body: JsonObject, clientIp: string): Promise<Response> {
    // Reitti ei hyväksy esimerkiksi roolia, istunnon tunnistetta tai käyttäjän numeerista tunnusta.
    allowFields(body, ["email", "password"]);
    // Samaa normalisointia käytetään rekisteröinnissä ja kirjautumisessa.
    const email = requireEmail(body.email);
    // Salasanaan ei tehdä trim- eikä kirjainkoon muutosta.
    const password = requirePassword(body.password);
    // IP tulee Deno.serve-yhteyden tiedoista, ei asiakkaan X-Forwarded-For-otsakkeesta.
    checkAttempts(`login:ip:${clientIp}`, 20);
    // Lisäksi yhden sähköpostin arvailuja rajataan viiteen yritykseen 15 minuutissa.
    checkAttempts(`login:email:${email}`, 5);
    // Kysely etsii tiliä parametrina annetulla sähköpostilla.
    const row = db.prepare(
      "SELECT id, email, role, password_hash, password_salt, password_iterations FROM users WHERE email = ?",
    ).get(email) as UserRow | undefined;
    // Olemassa olevalta tililtä käytetään sen omaa suolaa; tuntemattomalle tehdään sama laskentatyö.
    const stored = row
      ? { hash: row.password_hash, salt: row.password_salt, iterations: row.password_iterations }
      : DUMMY_PASSWORD;
    // Tämä vertailu tapahtuu myös silloin, kun sähköpostiosoitetta ei löydy.
    const matches = await verifyPassword(password, stored);
    // Sama viesti ja tilakoodi peittävät sen, oliko sähköposti vai salasana väärä.
    if (!row || !matches) throw new HttpError(401, "Sähköposti tai salasana on väärä.");
    // Salasanan tiivistettä tai suolaa ei sisällytetä selaimelle palautettavaan olioon.
    const user: User = { id: row.id, email: row.email, role: row.role };
    // Onnistunut kirjautuminen vaihtaa istunnon uuteen tunnisteeseen.
    return await beginSession(request, user, 200);
  }

  // Uloskirjautuminen mitätöi palvelimen istunnon, vaikka eväste olisi kopioitu talteen.
  async function logout(request: Request, body: JsonObject): Promise<Response> {
    // Logoutin JSON-runko on tyhjä olio {}.
    allowFields(body, []);
    // Istunnon puuttuminen ei estä uloskirjautumisen loppuun viemistä.
    const token = readSessionToken(request);
    // Käytämme tietokantahakuun vain tiivistettä.
    if (token) {
      db.prepare("DELETE FROM sessions WHERE token_hash = ?").run(await hashSessionToken(token));
    }
    // 204 tarkoittaa onnistumista ilman vastausrunkoa; null on tällöin pakollinen sisältö.
    return new Response(null, {
      status: 204,
      headers: { "Set-Cookie": deletedSessionCookie(secureCookies) },
    });
  }

  // Tehdas antaa kutsujalle neljä nimettyä toimintoa, joilla on sama tietokanta ja laskuri.
  return { currentUser, register, login, logout };
}
````

#### `esimerkit/04-valmis/projects.ts`

````ts
// Tietokanta- ja rivityypit auttavat tarkistamaan palvelimen omaa koodia ennen ajoa.
import type { DatabaseSync } from "node:sqlite";
// User tulee kirjautumisistunnosta, ProjectRow ja TaskRow omista SQL-kyselyistämme.
import type { ProjectRow, TaskRow, User } from "./db.ts";
// Validointi ja HTTP-vastaukset ovat yhteisiä kaikille reiteille.
import { allowFields, HttpError, json, type JsonObject, requireId, requireTitle } from "./http.ts";

// Muunnamme tietokantarivin tietoisesti julkisen API-sopimuksen mukaiseksi.
function projectJson(row: ProjectRow) {
  // user_id jää palvelimelle; created_at saa JSONissa nimen createdAt.
  return { id: row.id, title: row.title, createdAt: row.created_at };
}

// Tämä muunnos pitää SQLiten kokonaisluvut erillään JavaScriptin totuusarvoista.
function taskJson(row: TaskRow) {
  // === 1 tuottaa boolean-arvon true tai false; emme lähetä käyttöliittymälle merkkijonoa "false".
  return {
    id: row.id,
    projectId: row.project_id,
    title: row.title,
    done: row.done === 1,
    createdAt: row.created_at,
  };
}

// Autorisointi vastaa kysymykseen: saako juuri tämä käyttäjä käyttää juuri tätä projektia?
function ownedProject(db: DatabaseSync, id: number, ownerId: number): ProjectRow {
  // Molemmat ehdot ovat pakollisia; pelkkä projektin id ei ole käyttöoikeus.
  const row = db.prepare(
    "SELECT id, user_id, title, created_at FROM projects WHERE id = ? AND user_id = ?",
  ).get(id, ownerId) as ProjectRow | undefined;
  // Vastaamme samoin puuttuvaan ja toisen omistamaan projektiin, joten vieraan kohteen olemassaolo ei paljastu.
  if (!row) throw new HttpError(404, "Projektia ei löytynyt.");
  // Vain omistajalle kuuluva rivi palautuu jatkokäsittelyyn.
  return row;
}

// Tehtävän omistaja selvitetään sen projektin kautta: tehtävässä ei ole erillistä käyttäjäkenttää.
function ownedTask(db: DatabaseSync, id: number, ownerId: number): TaskRow {
  // JOIN seuraa viiteavainta tasks.project_id -> projects.id ja tarkistaa projektin omistajan.
  const row = db.prepare(`
    -- tasks.-etuliite kertoo, kumman taulun sarake on kyseessä.
    SELECT tasks.id, tasks.project_id, tasks.title, tasks.done, tasks.created_at
    FROM tasks
    JOIN projects ON projects.id = tasks.project_id
    -- Arvot sidotaan get-kutsussa samassa järjestyksessä kuin kysymysmerkit.
    WHERE tasks.id = ? AND projects.user_id = ?
  `).get(id, ownerId) as TaskRow | undefined;
  // Vieraan tehtävän numeron arvaaminen ei anna oikeutta lukea tai muuttaa sitä.
  if (!row) throw new HttpError(404, "Tehtävää ei löytynyt.");
  // Palautamme vain onnistuneen omistajuustarkistuksen läpäisseen rivin.
  return row;
}

// Tämä reititin käsittelee projektit, tehtävät ja rajatun ylläpitonäkymän.
// Response | null tarkoittaa joko valmista vastausta tai tietoa siitä, ettei reitti kuulu tähän tiedostoon.
export function handleProjects(
  db: DatabaseSync,
  method: string,
  path: string,
  user: User,
  body: JsonObject,
): Response | null {
  // Tällä erillisellä reitillä näytetään vain yhteismääriä; sitä ei käytetä muiden projektien lukemiseen.
  if (path === "/api/admin/stats") {
    // Tilastot ovat vain luettavia; tämä reitti ei muuta dataa.
    if (method !== "GET") throw new HttpError(405, "Tämä reitti hyväksyy vain GET-pyynnön.");
    // Pelkkä kirjautuminen ei riitä: palvelin tarkistaa myös tietokannasta luetun roolin.
    if (user.role !== "admin") throw new HttpError(403, "Toiminto vaatii ylläpitäjän roolin.");
    // Sisäkkäiset SELECT-lauseet laskevat kunkin taulun rivimäärän palauttamatta henkilötietoja.
    const totals = db.prepare(
      "SELECT (SELECT COUNT(*) FROM users) AS users, (SELECT COUNT(*) FROM projects) AS projects, (SELECT COUNT(*) FROM tasks) AS tasks",
    ).get();
    // COUNT palauttaa aina rivin; puuttuminen olisi ohjelman tai tietokannan odottamaton virhe.
    if (!totals) throw new Error("Tilastokysely ei palauttanut riviä.");
    // Number varmistaa, että JSON saa tavallisia lukuja eikä esimerkiksi bigint-arvoja.
    return json({
      users: Number(totals.users),
      projects: Number(totals.projects),
      tasks: Number(totals.tasks),
    });
  }

  // Tämä polku tarkoittaa kirjautuneen käyttäjän projektikokoelmaa.
  if (path === "/api/projects") {
    // GET lukee kokoelman eikä muuta palvelimen dataa.
    if (method === "GET") {
      // WHERE rajaa jo tietokantakyselyn vain kirjautuneen käyttäjän projekteihin.
      const rows = db.prepare(
        "SELECT id, user_id, title, created_at FROM projects WHERE user_id = ? ORDER BY id",
      ).all(user.id) as unknown as ProjectRow[];
      // map muuntaa jokaisen rivin API-olioksi. Tyhjästä kannasta palautuu tyhjä projects-taulukko.
      return json({ projects: rows.map(projectJson) });
    }
    // POST luo tähän kokoelmaan yhden uuden projektin.
    if (method === "POST") {
      // Omistajaa ei hyväksytä rungossa; user_id otetaan palvelimen tunnistamasta käyttäjästä.
      allowFields(body, ["title"]);
      // Projektin nimi on pakollinen ja enintään 120 Unicode-koodipistettä pitkä.
      const title = requireTitle(body.title, 120);
      // Parametrisoitu INSERT käsittelee myös heittomerkit tavallisena nimen tekstinä.
      const result = db.prepare("INSERT INTO projects(user_id, title) VALUES (?, ?)").run(
        user.id,
        title,
      );
      // Haemme luodun projektin, jotta vastauksessa on tietokannan tuottama luontiaika.
      const row = ownedProject(db, Number(result.lastInsertRowid), user.id);
      // 201 kertoo, että uusi projekti luotiin onnistuneesti.
      return json({ project: projectJson(row) }, 201);
    }
    // Tunnettu polku mutta väärä metodi on 405, ei onnistunut operaatio.
    throw new HttpError(405, "Projektikokoelma hyväksyy GET- ja POST-pyynnöt.");
  }

  // Sulkuryhmä ([^/]+) poimii yhden polkuosan projektin tunnukseksi.
  const taskCollection = path.match(/^\/api\/projects\/([^/]+)\/tasks$/);
  // match palauttaa null, jos polku ei täsmää; muussa tapauksessa jatkamme täällä.
  if (taskCollection) {
    // [1] on ensimmäisen sulkuryhmän sisältö; [0] olisi koko osunut teksti.
    const projectId = requireId(taskCollection[1]);
    // Omistajuus tarkistetaan myös tehtävälistan lukemisessa ja uuden tehtävän luomisessa.
    ownedProject(db, projectId, user.id);
    // GET lukee yhden projektin tehtävät.
    if (method === "GET") {
      // JOIN ja user_id-ehto pitävät omistajuusrajauksen mukana myös tässä varsinaisessa datakyselyssä.
      const rows = db.prepare(`
        SELECT tasks.id, tasks.project_id, tasks.title, tasks.done, tasks.created_at
        FROM tasks
        JOIN projects ON projects.id = tasks.project_id
        WHERE tasks.project_id = ? AND projects.user_id = ?
        ORDER BY tasks.id
      `).all(projectId, user.id) as unknown as TaskRow[]; // Tyyppivakuutus koskee omaa SQL-tulosta.
      // Käyttöliittymä saa taulukon, jossa done on true tai false.
      return json({ tasks: rows.map(taskJson) });
    }
    // POST lisää tehtävän polussa yksilöityyn projektiin.
    if (method === "POST") {
      // project_id-kenttää ei hyväksytä rungossa; projekti tulee tarkistetusta URL-polusta.
      allowFields(body, ["title"]);
      // Tehtävän nimessä saa olla 1–200 merkkiä.
      const title = requireTitle(body.title, 200);
      // INSERT ... SELECT lisää rivin vain, jos omistettu projekti on edelleen olemassa.
      const result = db.prepare(
        "INSERT INTO tasks(project_id, title) SELECT id, ? FROM projects WHERE id = ? AND user_id = ?",
      ).run(title, projectId, user.id);
      // Jos projekti olisi poistettu toisen yhteyden kautta, uutta tehtävää ei luoda.
      if (Number(result.changes) !== 1) throw new HttpError(404, "Projektia ei löytynyt.");
      // Haemme luodun tehtävän samalla omistajuuden tarkistavalla apufunktiolla.
      const row = ownedTask(db, Number(result.lastInsertRowid), user.id);
      // 201 ja task-kenttä muodostavat sovitun uuden tehtävän vastauksen.
      return json({ task: taskJson(row) }, 201);
    }
    // Muilla metodeilla ei saa tyhjentää tehtäväkokoelmaa tai ohittaa yksittäisen tehtävän reittejä.
    throw new HttpError(405, "Tehtäväkokoelma hyväksyy GET- ja POST-pyynnöt.");
  }

  // Tämä polku yksilöi yhden projektin.
  const projectItem = path.match(/^\/api\/projects\/([^/]+)$/);
  // Totuusarvoksi tulkittu match-tulos kertoo, löytyikö reitti.
  if (projectItem) {
    // Muunnamme URL-osan turvalliseksi kokonaisluvuksi ennen SQL-kyselyä.
    const id = requireId(projectItem[1]);
    // Jokainen tämän reitin toiminto edellyttää projektin omistajuutta.
    const row = ownedProject(db, id, user.id);
    // GET lukee yhden omistetun projektin.
    if (method === "GET") return json({ project: projectJson(row) });
    // PATCH päivittää nimikentän; omistajan vaihtaminen ei kuulu API-sopimukseen.
    if (method === "PATCH") {
      // Näin käyttäjä ei voi syöttää esimerkiksi toista user_id-arvoa.
      allowFields(body, ["title"]);
      // Uusi nimi käy saman tarkistuksen kuin luomisessa.
      const title = requireTitle(body.title, 120);
      // Päivityksen WHERE tarkistaa uudelleen sekä projektin että omistajan.
      db.prepare("UPDATE projects SET title = ? WHERE id = ? AND user_id = ?").run(
        title,
        id,
        user.id,
      );
      // Vastauksessa on juuri tietokannasta luettu päivitetty tila.
      return json({ project: projectJson(ownedProject(db, id, user.id)) });
    }
    // DELETE poistaa projektin ja viiteavaimen CASCADE-säännöllä sen tehtävät.
    if (method === "DELETE") {
      // Poistopyynnön runko on tyhjä olio {}.
      allowFields(body, []);
      // Omistajuus on mukana myös poistavassa SQL-lauseessa.
      db.prepare("DELETE FROM projects WHERE id = ? AND user_id = ?").run(id, user.id);
      // 204-vastauksessa ei ole JSON-runkoa; selain tarkistaa tilakoodin.
      return new Response(null, { status: 204 });
    }
    // Tunnetun projektireitin muut metodit hylätään.
    throw new HttpError(405, "Projekti hyväksyy GET-, PATCH- ja DELETE-pyynnöt.");
  }

  // Tehtävän reitti sisältää tehtävän oman tunnuksen, ei projektin tunnusta.
  const taskItem = path.match(/^\/api\/tasks\/([^/]+)$/);
  // Vain tähän polkumuotoon osuvat pyynnöt käsitellään tässä lohkossa.
  if (taskItem) {
    // Tunnuksen tyypin ja arvoalueen tarkistus tapahtuu ennen omistajuuskyselyä.
    const id = requireId(taskItem[1]);
    // Omistajuus kulkee tehtävästä projektiin ja projektista kirjautuneeseen käyttäjään.
    const row = ownedTask(db, id, user.id);
    // Myös yhden tehtävän luku on suojattu samalla tarkistuksella.
    if (method === "GET") return json({ task: taskJson(row) });
    // PATCH saa muuttaa nimen, valmistumistilan tai molemmat.
    if (method === "PATCH") {
      // Tehtävää ei voi siirtää toisen käyttäjän projektiin piilotetulla project_id-kentällä.
      allowFields(body, ["title", "done"]);
      // Tyhjä PATCH olisi epäselvä: pyydämme vähintään yhden muutettavan kentän.
      if (Object.keys(body).length === 0) {
        throw new HttpError(400, "Anna uusi nimi tai valmistumistila.");
      }
      // Puuttuva title säilyttää vanhan nimen; annettu nimi validoidaan aina.
      const title = body.title === undefined ? row.title : requireTitle(body.title, 200);
      // Teksti "false" ei ole boolean false: hyväksymme vain aidon JSON-totuusarvon.
      if (body.done !== undefined && typeof body.done !== "boolean") {
        throw new HttpError(400, "done-kentän pitää olla true tai false.");
      }
      // SQLitelle muunnetaan true -> 1 ja false -> 0; puuttuva kenttä säilyttää vanhan arvon.
      const done = body.done === undefined ? row.done : body.done ? 1 : 0;
      // Sisäkkäinen SELECT rajaa päivityksen vain käyttäjän omiin projekteihin.
      db.prepare(
        "UPDATE tasks SET title = ?, done = ? WHERE id = ? AND project_id IN (SELECT id FROM projects WHERE user_id = ?)",
      ).run(title, done, id, user.id);
      // Palautamme tallennetun tilan, jotta frontend voi näyttää oikean lopputuloksen.
      return json({ task: taskJson(ownedTask(db, id, user.id)) });
    }
    // DELETE poistaa yhden omistetun tehtävän.
    if (method === "DELETE") {
      // Tälle toiminnolle ei tarvita lisäkenttiä.
      allowFields(body, []);
      // Myös poistossa omistajuus on osa SQL-lauseen ehtoa.
      db.prepare(
        "DELETE FROM tasks WHERE id = ? AND project_id IN (SELECT id FROM projects WHERE user_id = ?)",
      ).run(id, user.id);
      // Onnistunut poisto palauttaa tyhjän 204-vastauksen.
      return new Response(null, { status: 204 });
    }
    // Esimerkiksi PUT ei korvaa tehtävää huomaamatta kokonaan.
    throw new HttpError(405, "Tehtävä hyväksyy GET-, PATCH- ja DELETE-pyynnöt.");
  }

  // null ilmoittaa app.ts-tiedostolle, ettei mikään tämän tiedoston reiteistä täsmännyt.
  return null;
}
````

#### `esimerkit/04-valmis/app.ts`

````ts
// Tietokannan tyyppi ei avaa yhteyttä: yhteys annetaan main.ts-tiedostosta tai testistä.
import type { DatabaseSync } from "node:sqlite";
// Kirjautumistoiminnot sijaitsevat omassa moduulissaan.
import { createAuth } from "./auth.ts";
// Näillä apufunktioilla luemme pyynnön turvallisesti ja muodostamme yhtenäisen vastauksen.
import {
  checkWriteRequest,
  HttpError,
  isWriteMethod,
  json,
  type JsonObject,
  readJsonObject,
  secureResponse,
} from "./http.ts";
// Projektien ja tehtävien omistajuustarkistukset ovat tämän reitittimen vastuulla.
import { handleProjects } from "./projects.ts";

// Valinnat kuvaavat tämän sovellusinstanssin asetuksia.
export interface AppOptions {
  origin: string; // Selaimessa käytetty tarkka alkuperä, esimerkiksi http://localhost:8000.
  now?: () => number; // ? tekee asetuksesta vapaaehtoisen; testi voi antaa oman kellon.
}

// createApp ei avaa verkkoporttia: se tuottaa Request -> Promise<Response> -käsittelijän.
// Siksi samaa oikeaa sovelluskoodia voidaan testata ilman ulkoista verkkopalvelua.
export function createApp(db: DatabaseSync, options: AppOptions) {
  // new URL pilkkoo originin protokollaan, isäntänimeen ja porttiin.
  const configuredUrl = new URL(options.origin);
  // Originissa ei ole polkua tai loppuviivaa. Tarkka muoto välttää epäselvän hyväksyttyjen osoitteiden listan.
  if (
    configuredUrl.origin !== options.origin || !["http:", "https:"].includes(configuredUrl.protocol)
  ) {
    // Tämä on käynnistyksen asetusvirhe, ei käyttäjän HTTP-pyynnön virhe.
    throw new Error(
      "APP_ORIGIN pitää antaa originina, esimerkiksi http://localhost:8000, ilman loppuviivaa.",
    );
  }
  // HTTPS-osoitteessa sessioeväste saa Secure-määrityksen.
  const https = configuredUrl.protocol === "https:";
  // ?? käyttää oikeaa kelloa, ellei testi antanut toista; Date.now on tässä funktio eikä sen tulos.
  const now = options.now ?? Date.now;
  // Kirjautumistoiminnot ja yrityslaskurit luodaan kerran palvelinta kohden.
  const auth = createAuth(db, https, now);
  // Allowlist tarkoittaa nimenomaisesti sallittuja tiedostoja; pyydettyä polkua ei liitetä tiedostopolkuun.
  const staticFiles = new Map<string, { file: string; type: string }>([
    ["/", { file: "index.html", type: "text/html; charset=utf-8" }], // Etusivu.
    ["/index.html", { file: "index.html", type: "text/html; charset=utf-8" }], // Sama etusivu nimellään.
    ["/styles.css", { file: "styles.css", type: "text/css; charset=utf-8" }], // Selaimen tyylit.
    ["/app.js", { file: "app.js", type: "text/javascript; charset=utf-8" }], // Selaimessa ajettava JavaScript.
  ]);

  // Varsinainen reititys tuottaa vastauksen tai heittää selitetyn HTTP-virheen.
  async function dispatch(request: Request, clientIp: string): Promise<Response> {
    // pathname on esimerkiksi /api/projects; URLin kyselyosa ei kuulu tähän reittinimeen.
    const path = new URL(request.url).pathname;
    // method on HTTP-verbi kuten GET, POST, PATCH tai DELETE.
    const method = request.method;
    // Tavallisen lukupyynnön runkona käytämme tyhjää oliota.
    let body: JsonObject = {};
    // Kirjoittavien pyyntöjen suojaus tehdään ennen yhtään API:n tietokantamuutosta.
    if (isWriteMethod(method)) {
      // Tarkka Origin + JSON-sisältötyyppi suojaavat myös login-, register- ja logout-pyynnöt.
      checkWriteRequest(request, options.origin);
      // Rungon koko ja JSON-olion muoto tarkistetaan ennen kenttien käyttöä.
      body = await readJsonObject(request);
    }

    // Rekisteröinti on tarkoituksella käytettävissä ilman aiempaa istuntoa.
    if (path === "/api/auth/register") {
      // Sama URL ei tarjoa käyttäjälistaa GET-pyynnöllä.
      if (method !== "POST") throw new HttpError(405, "Rekisteröinti käyttää POST-pyyntöä.");
      // Palautamme rekisteröinnin vastauksen: julkinen käyttäjä ja istuntoeväste.
      return await auth.register(request, body, clientIp);
    }
    // Login tarkistaa olemassa olevan käyttäjän salasanan.
    if (path === "/api/auth/login") {
      // Salasanaa ei saa lähettää GET-osoitteen kyselyosassa.
      if (method !== "POST") throw new HttpError(405, "Kirjautuminen käyttää POST-pyyntöä.");
      // IP-osoite välitetään palvelimen yhteystiedoista yritysrajoitusta varten.
      return await auth.login(request, body, clientIp);
    }
    // Logoutin pitää myös toimia tilanteessa, jossa istunto on jo vanhentunut.
    if (path === "/api/auth/logout") {
      // Uloskirjautuminen muuttaa istuntotilaa, joten GET ei ole sallittu.
      if (method !== "POST") throw new HttpError(405, "Uloskirjautuminen käyttää POST-pyyntöä.");
      // Palvelimen istunnon poisto ja selaimen evästeen vanhentaminen tehdään yhdessä toiminnossa.
      return await auth.logout(request, body);
    }
    // Me tarkoittaa tässä nykyisen istunnon käyttäjää.
    if (path === "/api/auth/me") {
      // Nykyisen käyttäjän lukeminen on GET-operaatio.
      if (method !== "GET") {
        throw new HttpError(405, "Nykyisen käyttäjän haku käyttää GET-pyyntöä.");
      }
      // currentUser heittää 401-virheen, jos voimassa olevaa kirjautumista ei ole.
      return json({ user: await auth.currentUser(request) });
    }

    // Kaikki loput API-reitit vaativat kirjautumisen ennen datan lukemista tai muuttamista.
    if (path.startsWith("/api/")) {
      // Autentikointi tunnistaa käyttäjän; projects.ts tarkistaa tämän jälkeen oikeuden juuri pyydettyyn kohteeseen.
      const user = await auth.currentUser(request);
      // Reititin saa palvelimen tunnistaman käyttäjän, ei selaimen ehdottamaa käyttäjää.
      const response = handleProjects(db, method, path, user, body);
      // Jos reititin tunnisti pyynnön, palautamme sen vastauksen.
      if (response) return response;
      // Tuntemattomalle API-polulle ei tarjoilla HTML-etusivua vahingossa.
      throw new HttpError(404, "API-reittiä ei löytynyt.");
    }

    // Julkisiin tiedostoihin ei tarvita istuntoa, jotta kirjautumissivun voi avata.
    const asset = staticFiles.get(path);
    // Esimerkiksi /db.ts, /.env ja /data/tehtavataulu.sqlite eivät ole sallittujen listalla.
    if (!asset) throw new HttpError(404, "Sivua ei löytynyt.");
    // Julkiset tiedostot ovat vain luettavia GET-pyynnöillä.
    if (method !== "GET") throw new HttpError(405, "Tiedostot hyväksyvät vain GET-pyynnön.");
    // Tiedostonimi tulee yllä olevasta omasta Mapista, ei käyttäjän URLista.
    const contents = await Deno.readFile(new URL(`./public/${asset.file}`, import.meta.url));
    // Response lähettää tiedoston tavut oikealla sisältötyypillä.
    return new Response(contents, { headers: { "Content-Type": asset.type } });
  }

  // Palautettava nuolifunktio on se toiminto, jonka Deno.serve kutsuu jokaiselle pyynnölle.
  return async (request: Request, clientIp = "local-test"): Promise<Response> => {
    // Yksi try/catch keskittää virheiden käsittelyn ja pitää vastausten muodon yhtenäisenä.
    try {
      // Kaikki onnistuneetkin vastaukset saavat suojaavat HTTP-otsakkeet.
      return secureResponse(await dispatch(request, clientIp), https);
    } catch (error) {
      // instanceof erottaa omat käyttäjälle tarkoitetut virheemme odottamattomista ohjelmavirheistä.
      if (error instanceof HttpError) {
        // Virhesopimus on aina JSON {error: string}; mukana voi olla esimerkiksi Retry-After.
        return secureResponse(json({ error: error.message }, error.status, error.headers), https);
      }
      // Emme tulosta salasanoja, istuntotunnisteita tai koko pyyntörunkoa lokiin.
      console.error("Pyynnön käsittelyssä tapahtui odottamaton palvelinvirhe.");
      // Asiakas ei saa tietokantavirheen yksityiskohtia tai palvelimen tiedostopolkuja.
      return secureResponse(
        json({ error: "Palvelin ei pystynyt käsittelemään pyyntöä." }, 500),
        https,
      );
    }
  };
}
````

#### `esimerkit/04-valmis/main.ts`

````ts
// createApp kokoaa HTTP-käsittelijän; sen import ei vielä käynnistä palvelinta.
import { createApp } from "./app.ts";
// openDatabase avaa SQLite-kannan ja suorittaa puuttuvan ensimmäisen migraation.
import { openDatabase } from "./db.ts";

// Ympäristömuuttuja on käynnistyksen asetus. ?? antaa oletuksen, jos arvo puuttuu.
const hostname = Deno.env.get("APP_HOST") ?? "127.0.0.1";
// Oletuksena kuunnellaan vain oman tietokoneen IPv4-osoitetta; Dockerissa tarvitaan 0.0.0.0.
const port = Number(Deno.env.get("APP_PORT") ?? "8000");
// Selain käyttää tätä täsmällistä osoitetta. Esimerkiksi localhost ja 127.0.0.1 ovat eri origineja.
const origin = Deno.env.get("APP_ORIGIN") ?? "http://localhost:8000";
// Väärää porttiasetusta ei hyväksytä hiljaisesti.
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error("APP_PORT pitää olla kokonaisluku 1–65535.");
}
// Pilkomme julkisen osoitteen voidaksemme rajata HTTP-käytön paikalliseen harjoitteluun.
const publicUrl = new URL(origin);
// HTTP ilman salausta sallitaan vain paikalliselle palvelulle; etäkäyttö tarvitsee HTTPS:n.
if (
  publicUrl.protocol === "http:" &&
  !["localhost", "127.0.0.1", "[::1]"].includes(publicUrl.hostname)
) {
  // HTTPS voidaan toteuttaa esimerkiksi oikein asetetussa käänteisvälityspalvelimessa.
  throw new Error("Käytä etäpalvelun APP_ORIGIN-asetuksessa HTTPS-osoitetta.");
}
// recursive sallii jo olemassa olevan hakemiston: aiempaa opiskelijan dataa ei poisteta.
await Deno.mkdir("./data", { recursive: true });
// Tietokanta ja sen mahdolliset WAL-aputiedostot pysyvät data-hakemistossa.
const db = openDatabase("./data/tehtavataulu.sqlite");
// Annamme saman tietokannan ja sallitun originin kaikille pyynnöille.
const app = createApp(db, { origin });
// Deno.serve avaa verkkokuuntelun. Parametrin infosta luetaan todellinen yhdistäneen asiakkaan osoite.
const server = Deno.serve(
  { hostname, port },
  (request, info) => app(request, info.remoteAddr.hostname),
);
// Tämä loki auttaa avaamaan juuri Origin-tarkistuksen hyväksymän osoitteen.
console.log(`Avaa selain osoitteeseen ${origin}. Lopeta painamalla Ctrl+C.`);
// Tämä lippu estää kahden samanaikaisen sammutuspyynnön käynnistämisen.
let closing = false;
// Signaalikäsittelijä kutsutaan esimerkiksi Ctrl+C-painalluksesta.
function shutdown(): void {
  // Uusi sammutus aloitetaan vain, jos edellinen ei ole jo käynnissä.
  if (!closing) {
    // Tallennamme tilan ennen asynkronista sammutusta.
    closing = true;
    // void kertoo, että emme odota Promisea tässä synkronisessa signaalikäsittelijässä.
    void server.shutdown();
  }
}
// SIGINT on keskeytyssignaali, jonka Ctrl+C tavallisesti lähettää.
Deno.addSignalListener("SIGINT", shutdown);
// Windows ei tue samaa SIGTERM-signaalia; Dockerin Linux-ympäristössä se sammuttaa kontin siististi.
if (Deno.build.os !== "windows") Deno.addSignalListener("SIGTERM", shutdown);
// Odotamme, että palvelin on oikeasti päättänyt pyyntöjen käsittelyn.
try {
  // Top-level await on Denossa sallittu: päämoduuli voi odottaa Promisea.
  await server.finished;
} finally {
  // Poistamme rekisteröidyn signaalikäsittelijän ennen poistumista.
  Deno.removeSignalListener("SIGINT", shutdown);
  // Poistamme myös Linuxissa tai macOS:ssä lisätyn SIGTERM-käsittelijän.
  if (Deno.build.os !== "windows") Deno.removeSignalListener("SIGTERM", shutdown);
  // Yhteys suljetaan vasta palvelimen pysähdyttyä.
  db.close();
}
````

#### `esimerkit/04-valmis/deno.jsonc`

````jsonc
// JSONC on JSON-muotoinen asetustiedosto, jossa //-kommentit ovat sallittuja.
{
  // tasks antaa komennoille lyhyet nimet: esimerkiksi deno task start.
  "tasks": {
    // start: run suorittaa ohjelman; --no-prompt estää odottamattomat lupakyselyt.
    // --allow-read sallii vain datan, julkiset tiedostot ja oman migraation lukemisen.
    // --allow-write sallii vain data-hakemistoon kirjoittamisen, myös SQLite-aputiedostot.
    // --allow-net rajaa kuuntelun paikalliseen osoitteeseen tai Dockerin 0.0.0.0-osoitteeseen portissa 8000.
    // --allow-env sallii vain kolme nimettyä asetusta. Porttia muutettaessa muuta myös verkkolupaa.
    "start": "deno run --no-prompt --allow-read=./data,./public,./01_create_schema.sql --allow-write=./data --allow-net=127.0.0.1:8000,0.0.0.0:8000 --allow-env=APP_HOST,APP_PORT,APP_ORIGIN main.ts",
    // dev käyttää samoja rajattuja lupia; --watch käynnistää ohjelman uudelleen lähdetiedoston muuttuessa.
    "dev": "deno run --watch=./public --no-prompt --allow-read=./data,./public,./01_create_schema.sql --allow-write=./data --allow-net=127.0.0.1:8000,0.0.0.0:8000 --allow-env=APP_HOST,APP_PORT,APP_ORIGIN main.ts",
    // check tarkistaa TypeScript-tyypit suorittamatta HTTP-palvelinta tai muokkaamatta tietokantaa.
    "check": "deno check main.ts integration_test.ts seed/admin.ts",
    // test käyttää omaa muistissa tai väliaikaisessa alihakemistossa olevaa kantaa, ei opiskelijan sovelluskantaa.
    // Testit kutsuvat oikeaa Request -> Response -käsittelijää, joten ne eivät tarvitse verkkolupaa.
    "test": "deno test --no-prompt --allow-read=./data,./public,./01_create_schema.sql --allow-write=./data integration_test.ts",
    // admin ylentää jo rekisteröidyn käyttäjän; lisää sähköpostiosoite task-komennon loppuun.
    "admin": "deno run --no-prompt --allow-read=./data,./01_create_schema.sql --allow-write=./data seed/admin.ts",
    // fmt yhdenmukaistaa sisennykset ja rivinvaihdot, jotta koodia on helpompi lukea yhdessä.
    "fmt": "deno fmt",
    // lint etsii yleisiä koodivirheitä; se ei korvaa tietoturva- tai käyttöoikeustestejä.
    "lint": "deno lint"
  },
  // compilerOptions muuttaa TypeScriptin ennen ajoa tekemiä tarkistuksia.
  "compilerOptions": {
    // strict vaatii täsmällistä tyypitystä ja esimerkiksi puuttuvien arvojen huomioimista.
    "strict": true
  },
  // fmt-asetukset ohjaavat deno fmt -komennon tulostyyliä.
  "fmt": {
    // Kohtuullinen rivipituus auttaa näyttämään koodia luennolla ja rinnakkain editorissa.
    "lineWidth": 100
  },
  // excludes rajaa generoidut tietokantatiedostot pois kehitystyökalujen tiedostojen läpikäynnistä.
  "exclude": ["data"]
}
````

#### `esimerkit/04-valmis/.gitignore`

````text
# data sisältää paikalliset käyttäjät ja istunnot, joten sitä ei tallenneta Gitiin.
data/
# Älä lisää oikeita asetussalaisuuksia; .env.example on vain julkinen mallipohja.
.env
.env.*
!.env.example
# Myös muualle vahingossa luotu tietokanta ja sen apuosat jätetään pois.
*.sqlite
*.sqlite-*
*.db
*.db-*
````

### 12.7 Valmiin sovelluksen frontend

#### `esimerkit/04-valmis/public/index.html`

````html
<!-- DOCTYPE kertoo selaimelle, että tiedosto käyttää nykyistä HTML-kieltä. -->
<!doctype html>
<!-- html ympäröi koko sivun; lang="fi" kertoo tekstin olevan suomea. -->
<html lang="fi">
  <!-- head sisältää sivun asetukset, joita ei näytetä varsinaisena sisältönä. -->
  <head>
    <!-- charset="utf-8" saa esimerkiksi ä- ja ö-kirjaimet näkymään oikein. -->
    <meta charset="utf-8">
    <!-- viewport sovittaa sivun laitteen leveyteen; zoomausta ei estetä. -->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- title näkyy selaimen välilehdessä ja auttaa tunnistamaan sivun. -->
    <title>Tehtävätaulu – omat projektit</title>
    <!-- rel kertoo tiedoston olevan tyyliohje; href on CSS-tiedoston osoite. -->
    <link rel="stylesheet" href="/styles.css">
    <!-- src osoittaa JavaScriptiin; defer odottaa HTML:n jäsentämisen valmistumista. -->
    <script src="/app.js" defer></script>
  </head>
  <!-- body sisältää käyttäjälle näkyvän sivun. -->
  <body>
    <!-- a on linkki; href siirtää pääsisältöön; class yhdistää CSS:n ohituslinkkityyliin. -->
    <a class="skip-link" href="#main-content">Siirry pääsisältöön</a>
    <!-- header on sivun aloitusosa; class rajaa sisällön luettavaan leveyteen. -->
    <header class="page-header">
      <!-- h1 on sivun ainoa ylimmän tason otsikko. -->
      <h1>Tehtävätaulu</h1>
      <!-- p muodostaa tekstikappaleen. -->
      <p>Pidä omat projektit ja niihin kuuluvat tehtävät järjestyksessä.</p>
    </header>
    <!-- main on pääsisältö; id on ohituslinkin kohde; tabindex="-1" sallii kohdistuksen koodista. -->
    <main id="main-content" tabindex="-1">
      <!-- noscript näytetään, jos JavaScriptin suoritus on estetty selaimessa. -->
      <noscript>Tämä harjoitussovellus tarvitsee JavaScriptin. Ota se käyttöön selaimen asetuksissa.</noscript>
      <!-- id löytää viestikentän koodista; role ja aria-live ilmoittavat muutokset rauhallisesti; aria-atomic lukee koko viestin. -->
      <p id="status" class="message" role="status" aria-live="polite" aria-atomic="true">Tarkistetaan kirjautumista…</p>
      <!-- role="alert" ilmoittaa virheestä heti; tyhjä elementti säilyy sivulla viestien vastaanottamista varten. -->
      <p id="error" class="error-message" role="alert" aria-atomic="true"></p>
      <!-- section ryhmittelee tunnistautumisen; id auttaa koodia; aria-labelledby nimeää osion otsikon perusteella; hidden piilottaa sen aluksi. -->
      <section id="auth-section" aria-labelledby="auth-title" hidden>
        <!-- id sitoo tämän h2-alaotsikon edellisen osion saavutettavaan nimeen. -->
        <h2 id="auth-title">Kirjaudu tai luo tunnus</h2>
        <!-- class liittää tähän apukappaleeseen hillityn mutta luettavan tekstityylin. -->
        <p class="hint">Kaikki alla olevat kentät ovat pakollisia. Harjoittelussa käytä keksittyä sähköpostiosoitetta ja salasanaa, jota et käytä muualla.</p>
        <!-- div ryhmittelee kaksi lomaketta asettelua varten; class käyttää joustavaa ruudukkoa. -->
        <div class="two-columns">
          <!-- form kerää kirjautumiskentät; id yhdistää lomakkeen JavaScriptiin; aria-labelledby antaa sille nimen. -->
          <form id="login-form" class="card" aria-labelledby="login-title">
            <!-- h3 on h2-otsikon alainen lomakkeen otsikko; id nimeää lomakkeen. -->
            <h3 id="login-title">Kirjaudu sisään</h3>
            <!-- label nimeää kentän; for vastaa täsmälleen inputin id:tä. -->
            <label for="login-email">Sähköpostiosoite</label>
            <!-- type tarkistaa sähköpostin muodon; id yhdistää labelin; name nimeää tiedon; autocomplete auttaa täyttämistä; required tekee kentästä pakollisen; maxlength rajaa pituuden. -->
            <input id="login-email" name="email" type="email" autocomplete="username" required maxlength="254">
            <!-- for yhdistää salasanan näkyvän nimen oikeaan kenttään. -->
            <label for="login-password">Salasana</label>
            <!-- password peittää kirjoituksen; current-password kertoo tallennetusta salasanasta; required tekee kentästä pakollisen; JavaScript ja palvelin tarkistavat pituuden muuttamatta salasanaa. -->
            <input id="login-password" name="password" type="password" autocomplete="current-password" required>
            <!-- submit lähettää lomakkeen myös Enter-näppäimellä. -->
            <button type="submit">Kirjaudu sisään</button>
          </form>
          <!-- Toinen form on rekisteröinnille; id löytää sen koodista ja aria-labelledby nimeää sen. -->
          <form id="register-form" class="card" aria-labelledby="register-title">
            <!-- h3 kertoo tämän lomakkeen tarkoituksen; id yhdistää sen lomakkeeseen. -->
            <h3 id="register-title">Luo tunnus</h3>
            <!-- labelin for yhdistyy rekisteröinnin sähköpostikenttään. -->
            <label for="register-email">Sähköpostiosoite</label>
            <!-- email on selaimen sähköpostikenttä; name nimeää arvon; autocomplete auttaa tunnuksen syöttämistä; required ja maxlength rajaavat kenttää. -->
            <input id="register-email" name="email" type="email" autocomplete="username" required maxlength="254">
            <!-- labelin for yhdistyy uuden salasanan kenttään. -->
            <label for="register-password">Uusi salasana</label>
            <!-- aria-describedby yhdistää kenttään ohjeen; muut attribuutit nimeävät pakollisen uuden salasanan; pituus tarkistetaan JavaScriptissä ja palvelimella samoina Unicode-koodipisteinä. -->
            <input id="register-password" name="password" type="password" autocomplete="new-password" required aria-describedby="password-hint">
            <!-- id yhdistää ohjeen kenttään; class antaa yhteisen ohjetyylin. -->
            <p id="password-hint" class="hint">15–128 merkkiä. Voit käyttää pitkää, helposti muistettavaa lausetta. Erikoismerkki ei ole pakollinen.</p>
            <!-- submit käynnistää juuri rekisteröintilomakkeen käsittelyn. -->
            <button type="submit">Luo tunnus ja kirjaudu</button>
          </form>
        </div>
      </section>
      <!-- section sisältää kirjautuneen näkymän; hidden poistaa sen aluksi myös näppäimistöjärjestyksestä. -->
      <section id="workspace" aria-labelledby="workspace-title" hidden>
        <!-- h2 nimeää kirjautuneen työtilan; id on aria-labelledby-viittauksen kohde. -->
        <h2 id="workspace-title">Oma työtila</h2>
        <!-- div ryhmittelee käyttäjätiedon ja uloskirjautumisen samalle joustavalle riville. -->
        <div class="account-row">
          <!-- JavaScript kirjoittaa kirjautuneen osoitteen tähän p-elementtiin id:n avulla. -->
          <p id="account-email"></p>
          <!-- button on toiminto; type="button" estää tahattoman lomakelähetyksen; id yhdistää käsittelijään. -->
          <button id="logout-button" type="button" class="secondary">Kirjaudu ulos</button>
        </div>
        <!-- div muodostaa leveällä näytöllä kaksi saraketta; kapealla sisältö pysyy yhdessä sarakkeessa. -->
        <div class="two-columns">
          <!-- section nimeää projektialueen h3-otsikosta; class tekee näkyvän kortin. -->
          <section class="card" aria-labelledby="projects-title">
            <!-- h3 kertoo projektialueen tarkoituksen; id nimeää osion. -->
            <h3 id="projects-title">Omat projektit</h3>
            <!-- form kerää uuden projektin; id yhdistää luontitoimintoon. -->
            <form id="project-create-form">
              <!-- for nimeää uuden projektin kentän; pakollisuus kerrotaan tekstinä. -->
              <label for="new-project-title">Uuden projektin nimi (pakollinen)</label>
              <!-- text on tavallinen tekstikenttä; name nimeää arvon; required tekee kentästä pakollisen; Unicode-pituus tarkistetaan JavaScriptissä ja palvelimella. -->
              <input id="new-project-title" name="title" type="text" required>
              <!-- submit käynnistää projektin tallentamisen. -->
              <button type="submit">Luo projekti</button>
            </form>
            <!-- id löytää tyhjän listan ohjeen; class antaa ohjetekstin ulkoasun. -->
            <p id="project-empty" class="hint">Sinulla ei vielä ole projekteja. Luo ensimmäinen projekti yllä.</p>
            <!-- ul on järjestämätön lista; id löytää sen koodista; class poistaa luettelomerkit; role säilyttää listan tunnistuksen myös ilman merkkejä. -->
            <ul id="project-list" class="project-list" role="list"></ul>
          </section>
          <!-- section sisältää valitun projektin; hidden piilottaa osion ennen valintaa; aria-labelledby käyttää muuntuvaa otsikkoa. -->
          <section id="project-detail" class="card" aria-labelledby="project-title" hidden>
            <!-- id löytää muuntuvaotsikon; tabindex="-1" sallii koodin kohdistaa otsikon projektin valinnan jälkeen. -->
            <h3 id="project-title" tabindex="-1">Valitse projekti</h3>
            <!-- form muokkaa valitun projektin nimeä; id erottaa sen luontilomakkeesta. -->
            <form id="project-rename-form">
              <!-- label kertoo muokattavan arvon ja sen pakollisuuden. -->
              <label for="project-name">Projektin nimi (pakollinen)</label>
              <!-- id yhdistää labelin; name nimeää arvon; text on tekstikenttä; required tekee siitä pakollisen; Unicode-pituus tarkistetaan JavaScriptissä ja palvelimella. -->
              <input id="project-name" name="title" type="text" required>
              <!-- submit tallentaa nimenmuutoksen. -->
              <button type="submit" class="secondary">Tallenna projektin nimi</button>
            </form>
            <!-- details antaa selaimen oman avattavan lisäosan projektin poistamiselle. -->
            <details>
              <!-- summary on näppäimistöllä avattava lisäosan otsikko. -->
              <summary>Projektin poistaminen</summary>
              <!-- p kertoo poistamisen seurauksen ennen toimintoa. -->
              <p>Projektin poistaminen poistaa myös kaikki sen tehtävät. Sovellus pyytää vielä vahvistuksen.</p>
              <!-- id yhdistää poistokäsittelijään; button ei lähetä lomaketta; danger erottaa ulkoasun tekstin lisäksi. -->
              <button id="project-delete-button" type="button" class="danger">Poista projekti ja sen tehtävät</button>
            </details>
            <!-- h4 on tämän projektin alainen tehtäväotsikko. -->
            <h4>Tehtävät</h4>
            <!-- form kerää uuden tehtävän; id yhdistää lomakkeen käsittelijään. -->
            <form id="task-create-form">
              <!-- for yhdistyy uuden tehtävän tekstikenttään. -->
              <label for="new-task-title">Uusi tehtävä (pakollinen)</label>
              <!-- id yhdistää labelin; name nimeää arvon; text määrittää kenttätyypin; required tekee kentästä pakollisen; Unicode-pituus tarkistetaan JavaScriptissä ja palvelimella. -->
              <input id="new-task-title" name="title" type="text" required>
              <!-- submit tallentaa uuden tehtävän valittuun projektiin. -->
              <button type="submit">Lisää tehtävä</button>
            </form>
            <!-- id löytää kappaleen, jossa kerrotaan lukumäärä tai tyhjän/lataavan tilan ohje. -->
            <p id="task-summary" class="hint">Projektilla ei vielä ole tehtäviä.</p>
            <!-- ul kertoo tehtävien olevan lista; id löytää sen koodista; class muotoilee listan; role säilyttää listan tunnistuksen myös ilman luettelomerkkejä. -->
            <ul id="task-list" class="task-list" role="list"></ul>
          </section>
        </div>
        <!-- section näkyy vain ylläpitäjälle; hidden ei ole käyttöoikeussuoja, jonka palvelin tekee erikseen. -->
        <section id="admin-section" class="card" aria-labelledby="admin-title" hidden>
          <!-- h3 nimeää ylläpito-osion; id yhdistää siihen aria-labelledby-viittauksen. -->
          <h3 id="admin-title">Ylläpidon lukumäärät</h3>
          <!-- id yhdistää tilastohakuun; type="button" tekee erillisen toiminnon. -->
          <button id="stats-button" type="button" class="secondary">Hae lukumäärät</button>
          <!-- id on tilastotekstin kohde; p näyttää tiedon tavallisena luettavana tekstinä. -->
          <p id="stats-output">Lukumääriä ei ole vielä haettu.</p>
        </section>
      </section>
    </main>
    <!-- footer on sivun loppuosa; class rajaa leveyden samaan tapaan kuin header. -->
    <footer class="page-footer">
      <!-- p kertoo sovelluksen tarkoituksen lyhyesti. -->
      <p>Tehtävätaulu · web-ohjelmoinnin harjoitussovellus</p>
    </footer>
  </body>
</html>
````

#### `esimerkit/04-valmis/public/styles.css`

````css
/* Tähti valitsee kaikki elementit. ::before ja ::after ovat CSS:n tuottamia lisäosia. */
*,
*::before,
*::after {
  /* Leveys sisältää täytteet ja reunukset, joten kentät eivät kasva vanhempaansa leveämmiksi. */
  box-sizing: border-box;
}

/* html on koko sivun juurielementti. */
html {
  /* 100 % kunnioittaa selaimen tai käyttäjän valitsemaa tekstin peruskokoa. */
  font-size: 100%;
  /* Tällä sivulla kentille pyydetään vaaleaa käyttöjärjestelmäteemaa. */
  color-scheme: light;
}

/* body määrittää koko näkyvän sivun oletustyylit. */
body {
  /* Poistetaan selaimen oletusmarginaali. */
  margin: 0;
  /* Käytetään laitteen omia kirjasimia ilman ulkoista latausta. */
  font-family: system-ui, sans-serif;
  /* Rivien väliin jätetään tilaa lukemisen helpottamiseksi. */
  line-height: 1.6;
  /* Tumma teksti erottuu vaaleasta taustasta. */
  color: #172b3a;
  /* Vaalea sivutausta erottaa valkoiset sisältökortit. */
  background: #f4f7fa;
  /* Pitkä sana saa katketa, jotta sivu ei levene puhelimessa. */
  overflow-wrap: anywhere;
}

/* Pilkku antaa saman säännön kolmelle sisältöalueelle. */
.page-header,
main,
.page-footer {
  /* Sisältö vie enintään 72 peruskirjasimen levyistä rem-yksikköä mutta jättää reunoille tilaa. */
  width: min(72rem, calc(100% - 2rem));
  /* Automaattiset sivumarginaalit keskittävät alueen. */
  margin-inline: auto;
}

/* Sivun aloitus saa oman pystysuuntaisen täytteensä. */
.page-header {
  /* block tarkoittaa tavanomaisessa suomenkielisessä sivussa ylä- ja alareunaa. */
  padding-block: 2rem 0.5rem;
}

/* Pääotsikko erottuu selkeästi. */
h1 {
  /* clamp säätää kokoa näkymän mukaan mutta pitää minimi- ja maksimikoon. */
  font-size: clamp(2rem, 5vw, 3rem);
  /* Otsikon riviväli on leipätekstiä tiiviimpi. */
  line-height: 1.15;
}

/* Kaikilla otsikkotasoilla on yhteinen ylä- ja alaväli. */
h1,
h2,
h3,
h4 {
  /* Yläpuolelle ei tule oletusmarginaalia; alle jää 0,75 rem. */
  margin-block: 0 0.75rem;
}

/* Alueet erotetaan pystysuunnassa toisistaan. */
section {
  /* margin-block lisää tilaa alueen ylä- ja alapuolelle. */
  margin-block: 1rem;
}

/* Tämä luokka antaa samat korttityylit lomakkeelle ja osiolle. */
.card {
  /* Pienin leveys nolla sallii kortin kaventumisen ruudukossa. */
  min-width: 0;
  /* Sisäreunus jättää tekstille hengitystilaa. */
  padding: 1.25rem;
  /* Selkeä tummahko reunus erottaa kortin taustasta. */
  border: 1px solid #718096;
  /* Hieman pyöristetty reuna on vain ulkoasuvalinta. */
  border-radius: 0.5rem;
  /* Kortin tausta on valkoinen. */
  background: #ffffff;
}

/* Kahden alueen asettelu alkaa yhdestä sarakkeesta pienillä näytöillä. */
.two-columns {
  /* grid käynnistää CSS-ruudukon. */
  display: grid;
  /* Yksi joustava sarake saa tarvittaessa kaventua nollaan. */
  grid-template-columns: minmax(0, 1fr);
  /* gap on sarakkeiden ja rivien välinen tyhjä tila. */
  gap: 1.25rem;
  /* Kunkin kortin yläreuna alkaa samasta kohdasta; kortteja ei venytetä yhtä korkeiksi. */
  align-items: start;
}

/* Vasta riittävän leveässä näkymässä näytetään kaksi saraketta. */
@media (min-width: 52rem) {
  /* Tämä sääntö korvaa vain ruudukon sarakemäärän. */
  .two-columns {
    /* Kaksi yhtä suurta saraketta; fr on osuus vapaasta tilasta. */
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

/* Tunnuksen ja uloskirjautumisen rivi saa tarvittaessa taittua. */
.account-row,
.task-actions {
  /* flex asettelee lapset peräkkäin riville. */
  display: flex;
  /* wrap sallii siirtymisen seuraavalle riville pienessä tilassa. */
  flex-wrap: wrap;
  /* Kohdistetaan lapset pystysuunnassa keskelle. */
  align-items: center;
  /* Jätetään lasten väliin tasainen etäisyys. */
  gap: 0.75rem;
}

/* Lomakkeen kentän nimi näytetään omalla rivillään. */
label {
  /* block käyttää rivin koko leveyden. */
  display: block;
  /* Lihavointi erottaa nimen ohjetekstistä. */
  font-weight: 650;
  /* Annetaan ylä- ja alapuolelle eri kokoiset välit. */
  margin-block: 0.75rem 0.25rem;
}

/* Tavallinen syöte ja painike perivät luettavan kirjasinkoon. */
input,
button {
  /* inherit kopioi ympäröivän sisällön kirjasintyylin. */
  font: inherit;
  /* Vähintään 44 CSS-pikselin korkeus helpottaa osoittamista. */
  min-height: 44px;
  /* Sisätäyte pitää tekstin irti reunoista. */
  padding: 0.55rem 0.8rem;
  /* Näkyvä reunus auttaa erottamaan kentän. */
  border: 2px solid #586577;
  /* Kenttien ja painikkeiden kulmat ovat hieman pyöristetyt. */
  border-radius: 0.35rem;
}

/* Tekstisyötteet täyttävät oman vanhempansa leveyden. */
input {
  /* width huomioi myös reunuksen box-sizing-säännön vuoksi. */
  width: 100%;
  /* Kenttä saa kaventua pienellä näytöllä. */
  min-width: 0;
  /* Teksti on tummaa. */
  color: #172b3a;
  /* Syöttöalueen tausta on valkoinen. */
  background: #ffffff;
}

/* Peruspainike erottuu valkoisella tekstillä tummasta pohjasta. */
button {
  /* Painikkeen teksti on valkoista. */
  color: #ffffff;
  /* Tumma sinivihreä on riittävän selkeä valkoisen tekstin tausta. */
  background: #174e5c;
  /* Reunus käyttää samaa tummaa väriä. */
  border-color: #174e5c;
  /* Painiketta ei pakoteta pysymään yhdellä rivillä. */
  white-space: normal;
  /* Osoitin kertoo hiirikäyttäjälle painettavasta kohteesta. */
  cursor: pointer;
}

/* Lomakkeen suorana lapsena oleva painike saa väliä edeltävään kenttään. */
form > button {
  /* Vain yläreunan marginaalia muutetaan. */
  margin-top: 0.75rem;
}

/* Toissijainen painike näyttää eri toiminnolta mutta säilyttää näkyvän reunuksen. */
button.secondary {
  /* Tumma teksti pysyy luettavana valkoisella. */
  color: #172b3a;
  /* Valkoinen tausta erottaa toissijaisen toiminnon. */
  background: #ffffff;
}

/* Poistopainike erotetaan värin lisäksi aina myös Poista-tekstillä. */
button.danger {
  /* Tumma punainen antaa valkoiselle tekstille vahvan kontrastin. */
  background: #8f1d21;
  /* Reunus vastaa taustaa. */
  border-color: #8f1d21;
}

/* disabled tarkoittaa, ettei toiminto ole juuri nyt käytettävissä. */
button:disabled,
input:disabled {
  /* Harmaa pohja kertoo odottamisesta ilman voimakasta himmennystä. */
  background: #e0e7ed;
  /* Teksti säilyy tummana ja luettavana. */
  color: #334155;
  /* Reunus näkyy myös odotustilassa. */
  border-color: #64748b;
  /* Osoitin näyttää, ettei painaminen juuri nyt onnistu. */
  cursor: wait;
}

/* focus-visible näyttää selaimen tunnistaman näppäimistökohdistuksen kaikissa kohteissa. */
:focus-visible {
  /* Kolmen pikselin tumma sininen ääriviiva erottuu sivun taustasta. */
  outline: 3px solid #005fcc;
  /* Ääriviiva siirretään irti kohteen reunasta. */
  outline-offset: 3px;
}

/* Tila- ja virheviestit saavat yhteisen tilan ympärilleen. */
.message,
.error-message {
  /* Pysty- ja vaakasuuntainen täyte parantaa luettavuutta. */
  padding: 0.75rem 1rem;
  /* Näkyvä vasen reunus erottaa viestin sisällöstä. */
  border-left: 4px solid #174e5c;
  /* Viestin pohja on vaalea sininen. */
  background: #e5eff7;
}

/* Virheellä on myös oma tekstiväri; teksti kertoo aina virheen syyn. */
.error-message {
  /* Tumma punainen teksti sopii vaaleaan virhepohjaan. */
  color: #7e1720;
  /* Reunus käyttää tekstin sävyä. */
  border-color: #7e1720;
  /* Hyvin vaalea punainen erottaa viestityypin. */
  background: #fff2f3;
}

/* Tyhjä virhealue säilyy DOMissa mutta ei tarvitse näkyvää laatikkoa. */
.error-message:empty {
  /* Poistetaan tyhjän viestin marginaalit. */
  margin: 0;
  /* Poistetaan tyhjän viestin täytteet. */
  padding: 0;
  /* Poistetaan tyhjän viestin reunus. */
  border: 0;
}

/* Ohjeet ovat yhtä suuria kuin muu teksti, mutta väriltään hieman hillitympiä. */
.hint {
  /* Tämä tummanharmaa säilyttää hyvän kontrastin valkoiseen. */
  color: #425568;
}

/* Sovelluksen listat saavat korttimaisen ulkoasun. */
.project-list,
.task-list {
  /* Poistetaan vain visuaaliset luettelomerkit; HTML:n role="list" säilyttää listamerkityksen. */
  list-style: none;
  /* Listalla ei ole vasenta sisennystä. */
  padding: 0;
  /* Jätetään listan yläpuolelle tilaa. */
  margin-block: 1rem 0;
}

/* Projektipainike täyttää listarivinsä. */
.project-list button {
  /* Painike ulottuu listan leveydelle. */
  width: 100%;
  /* Nimi alkaa suomen lukusuunnan alusta. */
  text-align: start;
  /* Projektien väliin jää pieni rako. */
  margin-bottom: 0.5rem;
}

/* aria-current kertoo myös avustavalle teknologialle valitun projektin. */
.project-list button[aria-current="true"] {
  /* Valitun projektin nimen alleviivaus on värin lisäksi näkyvä merkki. */
  text-decoration: underline;
  /* Paksumpi teksti korostaa valintaa. */
  font-weight: 750;
}

/* Jokainen tehtävä on listan li-elementti. */
.task-item {
  /* Yläreuna erottaa tehtävät toisistaan. */
  border-top: 1px solid #718096;
  /* Pystysuuntainen täyte tekee tehtävistä erillisiä alueita. */
  padding-block: 1rem;
}

/* Tehtävän valintaruutu ja sen nimi pysyvät samassa joustavassa ryhmässä. */
.task-toggle {
  /* flex asettaa valintaruudun nimen viereen. */
  display: flex;
  /* Kohdistetaan valintaruutu tekstin ensimmäiselle alueelle. */
  align-items: start;
  /* Ruudun ja nimen väliin jätetään tilaa. */
  gap: 0.75rem;
}

/* Vain checkbox-tyyppiset syötteet saavat tämän koon. */
input[type="checkbox"] {
  /* Valintaruutu ei täytä koko rivin leveyttä. */
  width: 1.5rem;
  /* Ruudun korkeus vastaa sen leveyttä. */
  height: 1.5rem;
  /* Ohitetaan muiden syötteiden 44 pikselin vähimmäiskorkeus; suuri label laajentaa painettavaa aluetta. */
  min-height: 1.5rem;
  /* Ruutu ei kutistu pitkän tekstin vieressä. */
  flex-shrink: 0;
  /* Valitun ruudun väri sopii painikkeisiin. */
  accent-color: #174e5c;
}

/* Valintaruudun näkyvä label tarjoaa koko nimialueen painettavaksi. */
.task-toggle label {
  /* Label ottaa riviltä jäljelle jäävän tilan. */
  flex: 1;
  /* Vähimmäiskorkeus pitää painettavan alueen suurena. */
  min-height: 44px;
  /* Poistetaan tekstikenttälabelien marginaali. */
  margin: 0;
}

/* detailsin yhteenveto on selaimen oma avattava painike. */
summary {
  /* Osoitin kertoo lisäosan olevan avattava. */
  cursor: pointer;
  /* Riittävä korkeus helpottaa valintaa. */
  min-height: 44px;
  /* Täyte erottaa tekstin ympäröivästä sisällöstä. */
  padding-block: 0.6rem;
  /* Alleviivaus auttaa tunnistamaan toiminnon. */
  text-decoration: underline;
}

/* Ohituslinkki odottaa sivun alussa näkymän ulkopuolella. */
.skip-link {
  /* Absoluuttinen sijoitus estää piilotettua linkkiä varaamasta tilaa. */
  position: absolute;
  /* Linkki jää vasemman reunan ulkopuolelle, kunnes se saa kohdistuksen. */
  left: -10000px;
  /* Yläreunassa on pieni turvaväli näkyvää tilaa varten. */
  top: 0.5rem;
  /* Vaalea tausta erottaa näkyviin tulevan linkin. */
  background: #ffffff;
  /* Tumma linkkiväri erottuu valkoisesta. */
  color: #174e5c;
  /* Näkyvä linkki saa painettavaa aluetta. */
  padding: 0.75rem;
  /* Linkki näkyy muiden elementtien päällä kohdistettaessa. */
  z-index: 10;
}

/* Myös ohjelmallinen focus tuo ohituslinkin näkyviin. */
.skip-link:focus {
  /* Linkki siirtyy vasempaan reunaan näkyviin. */
  left: 1rem;
}

/* hidden-attribuutti piilottaa sisällön riippumatta muista asettelusäännöistä. */
[hidden] {
  /* important varmistaa, ettei myöhempi display-sääntö vahingossa näytä piilotettua aluetta. */
  display: none !important;
}

/* Sivun loppuun jätetään tilaa myös pienellä näytöllä. */
.page-footer {
  /* Pystysuuntainen täyte erottaa lopputekstin pääsisällöstä. */
  padding-block: 2rem;
}
````

#### `esimerkit/04-valmis/public/app.js`

````js
// Tämä tiedosto on selaimen JavaScriptiä. Backendin TypeScript suoritetaan erikseen Denossa.
// Tiukka tila auttaa huomaamaan esimerkiksi vahingossa luodut nimeämättömät muuttujat.
"use strict";

// state on olio: yhteen nimettyyn kokonaisuuteen kerätään käyttöliittymän tämänhetkiset tiedot.
const state = {
  // null tarkoittaa, ettei kirjautunutta käyttäjää ole vielä tiedossa.
  user: null,
  // Tyhjä taulukko [] pitää myöhemmin sisällään palvelimen palauttamat projektit.
  projects: [],
  // Tähän taulukkoon ladataan vain valitun projektin tehtävät.
  tasks: [],
  // Valitun projektin kokonaislukutunniste tallennetaan tähän; aluksi valintaa ei ole.
  selectedProjectId: null,
  // busy kertoo, odotetaanko verkkopyynnön valmistumista.
  busy: false,
};

// ui-olion ominaisuuksiin tallennetaan viittaukset HTML-elementteihin.
const ui = {
  // querySelector etsii CSS-valitsimella; # tarkoittaa HTML:n id-attribuuttia.
  status: document.querySelector("#status"),
  // Virheviesti näytetään tekstinä tässä jo HTML:ssä olevassa alert-alueessa.
  error: document.querySelector("#error"),
  // Tämä alue sisältää kirjautumisen ja rekisteröinnin.
  auth: document.querySelector("#auth-section"),
  // Kirjautumislomakkeeseen liitetään myöhemmin submit-kuuntelija.
  login: document.querySelector("#login-form"),
  // Rekisteröintilomakkeella on oma kuuntelijansa.
  register: document.querySelector("#register-form"),
  // Työtila näytetään vasta onnistuneen tunnistautumisen jälkeen.
  workspace: document.querySelector("#workspace"),
  // Tähän tulostetaan kirjautuneen käyttäjän sähköpostiosoite.
  account: document.querySelector("#account-email"),
  // Uloskirjautumispainike päättää palvelimen istunnon.
  logout: document.querySelector("#logout-button"),
  // Projektin luontilomake pitää sisällään uuden nimen.
  projectCreate: document.querySelector("#project-create-form"),
  // Projektirivit lisätään tähän ul-listaan.
  projectList: document.querySelector("#project-list"),
  // Tyhjän projektilistan ohje voidaan näyttää ja piilottaa.
  projectEmpty: document.querySelector("#project-empty"),
  // Valitun projektin sisältö on omassa osiossaan.
  detail: document.querySelector("#project-detail"),
  // Otsikko päivittyy valitun projektin nimen mukaan.
  projectTitle: document.querySelector("#project-title"),
  // Tämä lomake muuttaa olemassa olevan projektin nimeä.
  projectRename: document.querySelector("#project-rename-form"),
  // Tämä painike poistaa valitun projektin kaikkine tehtävineen.
  projectDelete: document.querySelector("#project-delete-button"),
  // Tehtävän luontilomake kuuluu aina valittuun projektiin.
  taskCreate: document.querySelector("#task-create-form"),
  // Tehtävärivit lisätään tähän ul-listaan.
  taskList: document.querySelector("#task-list"),
  // Tässä kerrotaan tehtävien määrä tai tyhjän listan ohje.
  taskSummary: document.querySelector("#task-summary"),
  // Ylläpidon alue piilotetaan tavalliselta käyttäjältä käytettävyyden vuoksi.
  admin: document.querySelector("#admin-section"),
  // Tämä painike pyytää palvelimelta käyttöoikeuksilla suojatun koosteen.
  statsButton: document.querySelector("#stats-button"),
  // Kooste näytetään tekstinä tässä kappaleessa.
  statsOutput: document.querySelector("#stats-output"),
};

// Funktio on nimetty toimintokokonaisuus; message-parametri saa kutsujan antaman tekstin.
function announce(message) {
  // textContent käsittelee sisällön tekstinä, joten käyttäjän syöte ei muutu HTML-koodiksi.
  ui.status.textContent = message;
  // Uusi tilaviestintä poistaa edellisen toiminnon virheen.
  ui.error.textContent = "";
}

// Näytetään käyttäjälle ymmärrettävä virhe ilman palvelimen sisäisten tietojen lisäämistä.
function showError(error) {
  // Verkkovirhe ja vääränmuotoinen vastaus erotetaan API:n tarkoituksellisesta virhetekstistä.
  let message = error instanceof Error ? error.message : "Tuntematon virhe. Yritä uudelleen.";
  // TypeError syntyy fetchissä esimerkiksi verkkoyhteyden puuttuessa.
  if (error instanceof TypeError) {
    // Teknisen virhetekstin sijaan kerrotaan mitä käyttäjä voi tarkistaa.
    message = "Palvelimeen ei saatu yhteyttä. Tarkista, että Deno-palvelin on käynnissä, ja yritä uudelleen.";
  }
  // JSON-jäsennyksen virhe kertoo, ettei palvelin palauttanut sovittua tietomuotoa.
  if (error instanceof SyntaxError) {
    // Tämän harjoituksen käyttäjä voi yrittää latausta uudelleen.
    message = "Palvelimen vastausta ei voitu lukea. Lataa sivu uudelleen.";
  }
  // Aikarajan ylitys saa oman selkokielisen viestinsä.
  if (error instanceof Error && (error.name === "AbortError" || error.name === "TimeoutError")) {
    // Pyyntö saattoi jo ehtiä palvelimelle; ensin tarkistetaan tämänhetkinen tieto.
    message = "Palvelin vastasi liian hitaasti. Lataa sivu uudelleen ja tarkista tiedot ennen uutta tallennusta.";
  }
  // Tila-alue ei jää virhetilanteessa näyttämään odottamista.
  ui.status.textContent = "Toiminto ei valmistunut normaalisti.";
  // Virhe ilmoitetaan näkyvänä tekstinä sekä HTML:n role="alert"-alueella.
  ui.error.textContent = `Virhe: ${message}`;
}

// Odotustila ehkäisee saman lomakkeen tahattomat kaksoislähetykset.
function setBusy(busy) {
  // Tallennetaan true- tai false-arvo yhteiseen tilaan.
  state.busy = busy;
  // querySelectorAll palauttaa kaikki painikkeet ja kentät; forEach käy ne yksitellen läpi.
  document.querySelectorAll("button, input").forEach((control) => {
    // disabled estää toiminnon odotuksen ajaksi; false palauttaa käytön.
    control.disabled = busy;
  });
  // ARIA-attribuutti odottaa tekstiä, joten String muuttaa totuusarvon tekstiksi.
  ui.workspace.setAttribute("aria-busy", String(busy));
  // Myös tunnistautumisalue kertoo avustavalle teknologialle odottamisesta.
  ui.auth.setAttribute("aria-busy", String(busy));
}

// Kohdistetaan olemassa oleva elementti; tätä kutsutaan vasta kun disabled on poistettu.
function focusId(id) {
  // Etsitään elementti sen yksilöivällä id-arvolla.
  const element = document.getElementById(id);
  // Ehto estää puuttuvan elementin käytön.
  if (element) {
    // focus siirtää näppäimistön kohdistuksen tähän kohteeseen.
    element.focus();
  }
}

// async-funktio voi odottaa verkkopyyntöä; oletusmenetelmä on tietoa lukeva GET.
async function api(path, method = "GET", body = undefined) {
  // Headers kokoaa pyynnön otsakkeet; Accept pyytää JSON-muotoista vastausta.
  const headers = new Headers({ Accept: "application/json" });
  // Vain tietoja muuttavat pyynnöt tarvitsevat tässä JSON-rungon.
  if (method !== "GET") {
    // Palvelin edellyttää kirjoituksilta tätä tyyppiä myös CSRF-suojauksensa osana.
    headers.set("Content-Type", "application/json");
  }
  // AbortController osaa keskeyttää tämän yhden verkkopyynnön.
  const controller = new AbortController();
  // setTimeout kutsuu keskeytystä 15 sekunnin päästä, jos vastausta ei ehdi tulla.
  const timeout = setTimeout(() => controller.abort(), 15000);
  // finally-osio vapauttaa ajastimen riippumatta siitä, onnistuuko pyyntö.
  try {
    // fetch lähettää pyynnön; await odottaa vastausta estämättä koko selaimen käyttöä.
    const response = await fetch(path, {
      // method on esimerkiksi GET, POST, PATCH tai DELETE.
      method,
      // Lähetetään samalle alkuperälle kuuluva istuntoeväste automaattisesti.
      credentials: "same-origin",
      // Käyttäjäkohtaisia API-vastauksia ei haeta selaimen HTTP-välimuistista.
      cache: "no-store",
      // Liitetään yllä koottu otsakeolio pyyntöön.
      headers,
      // GETillä ei ole runkoa; muulloin JSON.stringify muuttaa olion siirrettäväksi tekstiksi.
      body: method === "GET" ? undefined : JSON.stringify(body ?? {}),
      // Liitetään pyynnön keskeytysmahdollisuus tähän fetchiin.
      signal: controller.signal,
    });
    // 204 tarkoittaa onnistumista ilman runkoa; muut vastaukset luetaan JSONina.
    const payload = response.status === 204 ? null : await response.json();
    // fetch ei itsessään pidä HTTP 400/401/403/404/500 -vastauksia verkkovirheinä.
    if (!response.ok) {
      // Palvelimen turvallinen error-teksti otetaan mukaan, jos se on olemassa.
      const error = new Error(payload?.error ?? `Pyyntö epäonnistui (HTTP ${response.status}).`);
      // Tallennetaan status virheen ominaisuudeksi, jotta 401 voidaan käsitellä erikseen.
      error.status = response.status;
      // throw siirtää käsittelyn lähimpään catch-lohkoon.
      throw error;
    }
    // return antaa palvelimen tiedot funktiota odottavalle kutsujalle.
    return payload;
  } finally {
    // Ajastin poistetaan myös virheessä, ettei se jää turhaan odottamaan.
    clearTimeout(timeout);
  }
}

// Tämä apufunktio hoitaa kaikille käyttöliittymätoiminnoille yhteisen odotus- ja virhetilan.
async function runAction(loadingMessage, action) {
  // Jo käynnissä olevan toiminnon aikana ei aloiteta toista.
  if (state.busy) return false;
  // Tallennetaan kohdistettu elementti ennen kuin disabled voisi siirtää kohdistuksen pois siitä.
  const focusedBefore = document.activeElement;
  // Estetään painikkeet ja kentät odotuksen ajaksi.
  setBusy(true);
  // Kerrotaan näkyvästi, mitä juuri nyt odotetaan.
  announce(loadingMessage);
  // try tarkoittaa, että seuraavan toiminnon virheet käsitellään catchissa.
  try {
    // action on kutsujan antama funktio; await odottaa myös sen sisäiset verkkopyynnöt.
    await action();
    // true kertoo tapahtumankäsittelijälle onnistumisesta.
    return true;
  } catch (error) {
    // 401 kirjautuneena tarkoittaa esimerkiksi vanhentunutta tai toisessa välilehdessä poistettua istuntoa.
    if (error.status === 401 && state.user !== null) {
      // Poistetaan vanhat käyttäjätiedot näkymästä ja näytetään kirjautuminen.
      showGuest();
      // Kerrotaan uudelleenkirjautumisen tarve.
      error.message = "Kirjautuminen on vanhentunut. Kirjaudu uudelleen.";
    }
    // Virhe tulee sivulle, jotta pelkkää kehittäjäkonsolia ei tarvitse osata lukea.
    showError(error);
    // false kertoo käsittelijälle, ettei sen pidä näyttää onnistumista.
    return false;
  } finally {
    // Lomakkeet vapautetaan sekä onnistumisen että virheen jälkeen.
    setBusy(false);
    // Palautetaan kohdistus, jos alkuperäinen elementti on yhä näkyvän näkymän DOMissa.
    if (focusedBefore instanceof HTMLElement && focusedBefore.isConnected && !focusedBefore.closest("[hidden]")) {
      // Varsinainen käsittelijä voi tämän jälkeen kohdistaa uuteen onnistumisen kohteeseen.
      focusedBefore.focus();
    } else if (state.user === null) {
      // Vanhentunut istunto saattoi piilottaa vanhan kohteen; tällöin tarjotaan kirjautumiskenttä.
      focusId("login-email");
    }
  }
}

// Luetaan lomakkeelta nimikenttä ja tarkistetaan tavallinen kirjoitusvirhe jo selaimessa.
function readTitle(form, maximum) {
  // elements.namedItem löytää lomakkeen name="title"-kentän myös disabled-tilassa; value lukee sen tekstin ja trim poistaa reunavälit.
  const title = form.elements.namedItem("title").value.trim();
  // Array.from laskee Unicode-koodipisteet kuten backend; tavallinen .length laskisi UTF-16-yksiköt ja esimerkiksi 😀 kahdesti.
  const length = Array.from(title).length;
  // Tyhjäksi jäänyt tai liian pitkä nimi pysäyttää toiminnon.
  if (length === 0 || length > maximum) {
    // Palvelin tarkistaa saman asian uudelleen, koska selaimen tarkistuksen voi ohittaa.
    throw new Error(`Nimen pitää sisältää 1–${maximum} merkkiä. Pelkät välilyönnit eivät riitä.`);
  }
  // Palautetaan siistitty nimi kutsujalle.
  return title;
}

// Kirjautumaton näkymä tyhjentää myös edellisen käyttäjän selaimeen ladatut tiedot.
function showGuest() {
  // Tunnistautuneen käyttäjän tietoa ei enää säilytetä.
  state.user = null;
  // Projektit poistetaan muistista; tietokantaan ei tehdä tässä muutoksia.
  state.projects = [];
  // Myös ladatut tehtävät poistetaan muistista.
  state.tasks = [];
  // Valinta puretaan.
  state.selectedProjectId = null;
  // Tunnistautumislomakkeet näytetään.
  ui.auth.hidden = false;
  // Kirjautuneen työtila piilotetaan.
  ui.workspace.hidden = true;
  // Ylläpitonäkymä piilotetaan varmuuden vuoksi erikseen.
  ui.admin.hidden = true;
  // Näkyvästä otsikkorivistä poistetaan edellisen käyttäjän osoite.
  ui.account.textContent = "";
  // Tyhjennetään molempien lomakkeiden syötetyt arvot, myös salasanat.
  ui.login.reset();
  // Rekisteröintilomakkeen salasanakin tyhjennetään.
  ui.register.reset();
  // Tilastot eivät jää seuraavan kirjautujan selaintilaan.
  ui.statsOutput.textContent = "Lukumääriä ei ole vielä haettu.";
  // Piirretään tyhjentyneet projektit ja poistetaan tehtävien näkyvä sisältö.
  renderProjects();
  // Valinnan puute piilottaa projektin yksityiskohdat ja tyhjentää tehtävälistan.
  renderProjectDetail();
}

// Näytetään palvelimen vahvistaman käyttäjän työtila.
function showWorkspace(user) {
  // Käyttäjän id, email ja role tulivat palvelimen vastauksesta.
  state.user = user;
  // Tunnistautumislomakkeita ei tarvita kirjautuneessa näkymässä.
  ui.auth.hidden = true;
  // Oman työtilan sisältö voidaan nyt näyttää.
  ui.workspace.hidden = false;
  // Näytetään osoite tekstinä; mahdollinen HTML-merkistö ei suorita koodia.
  ui.account.textContent = `Kirjautunut: ${user.email}`;
  // Roolitieto ohjaa vain näkymää; palvelin tarkistaa ylläpito-oikeuden jokaisella pyynnöllä.
  ui.admin.hidden = user.role !== "admin";
  // Salasanaa ei jätetä kirjautumislomakkeeseen onnistumisen jälkeen.
  ui.login.reset();
  // Myös rekisteröintilomakkeen salasana tyhjennetään.
  ui.register.reset();
}

// Ladataan projektit vasta tunnistautumisen jälkeen.
async function loadProjects() {
  // GET hakee tiedot muuttamatta niitä.
  const result = await api("/api/projects");
  // Palvelimen projects-ominaisuus sisältää käyttäjän omat projektit.
  state.projects = result.projects;
  // Täytetään lista ladatuilla tiedoilla.
  renderProjects();
}

// Piirtäminen tarkoittaa tässä HTML-elementtien päivittämistä state-olion tiedoista.
function renderProjects() {
  // replaceChildren ilman argumentteja poistaa vanhat listarivit turvallisesti.
  ui.projectList.replaceChildren();
  // Tyhjän listan ohje näkyy vain, kun projektitaulukon pituus on nolla.
  ui.projectEmpty.hidden = state.projects.length !== 0;
  // for...of toistaa lohkon jokaiselle taulukon projektille.
  for (const project of state.projects) {
    // Luodaan listan yksi li-elementti muistiin.
    const item = document.createElement("li");
    // Luodaan oikea painike, jolla on selaimen valmiit näppäimistöominaisuudet.
    const button = document.createElement("button");
    // Painike ei lähetä lomaketta.
    button.type = "button";
    // Yksilöllinen id mahdollistaa kohdistuksen palauttamisen uudelleenpiirron jälkeen.
    button.id = `project-button-${project.id}`;
    // secondary käyttää CSS:n vaaleaa painiketyyliä.
    button.className = "secondary";
    // Verrataan numerotunnisteita; === ei muuta arvojen tietotyyppejä.
    const selected = project.id === state.selectedProjectId;
    // Valinta kerrotaan avustavalle teknologialle tekstiarvona.
    button.setAttribute("aria-current", String(selected));
    // Myös näkyvä teksti kertoo valitun projektin; käyttäjän nimi tulostetaan turvallisesti.
    button.textContent = selected ? `${project.title} (valittu)` : `Avaa projekti: ${project.title}`;
    // Uusikin painike noudattaa parhaillaan voimassa olevaa odotustilaa.
    button.disabled = state.busy;
    // Nuolifunktio käynnistää projektin avaamisen vasta click-tapahtuman tullessa.
    button.addEventListener("click", () => selectProject(project.id));
    // Lisätään painike li-elementin lapseksi.
    item.append(button);
    // Lisätään valmis li sivulla olevaan ul-listaan.
    ui.projectList.append(item);
  }
}

// Avaa projekti hakemalla sen tehtävät palvelimelta.
async function selectProject(projectId) {
  // runAction kertoo odottamisesta ja ottaa kiinni mahdollisen virheen.
  const success = await runAction("Ladataan projektin tehtäviä…", async () => {
    // Numerotunniste liitetään API:n polkuun; palvelin tarkistaa omistajuuden.
    const result = await api(`/api/projects/${projectId}/tasks`);
    // Valinta muutetaan vasta onnistuneen haun jälkeen.
    state.selectedProjectId = projectId;
    // Aiemman projektin tehtävät korvataan uudella listalla.
    state.tasks = result.tasks;
    // Päivitetään projektipainikkeiden valintamerkinnät.
    renderProjects();
    // Täytetään projektin nimi ja tehtävät.
    renderProjectDetail();
    // Onnistuminen kerrotaan myös ruudunlukijan tilaviestinä.
    announce("Projekti avattu. Voit lisätä, muokata ja poistaa sen tehtäviä.");
  });
  // Onnistumisen jälkeen kohdistus siirtyy uuteen sisältöön, virheessä takaisin avauspainikkeeseen.
  focusId(success ? "project-title" : `project-button-${projectId}`);
}

// Päivitetään valitun projektin kortti.
function renderProjectDetail() {
  // find palauttaa ensimmäisen ehdon täyttävän projektin tai undefined-arvon.
  const project = state.projects.find((item) => item.id === state.selectedProjectId);
  // Jos projektia ei ole valittu, korttia ei näytetä.
  if (!project) {
    // hidden poistaa kortin myös näppäimistön kohdistusjärjestyksestä.
    ui.detail.hidden = true;
    // Vanhoja tehtäviä ei jätetä piilotettuun DOMiin.
    ui.taskList.replaceChildren();
    // Vanhasta projektista ei säilytetä nimeä kentässä.
    document.querySelector("#project-name").value = "";
    // Myös piilotettu otsikko palautetaan lähtötilaan.
    ui.projectTitle.textContent = "Valitse projekti";
    // return päättää tämän funktion suorittamisen tähän.
    return;
  }
  // Valitun projektin kortti tuodaan näkyviin.
  ui.detail.hidden = false;
  // Nimi asetetaan otsikkoon tekstinä.
  ui.projectTitle.textContent = project.title;
  // value asettaa syötekentän nykyisen arvon; se ei tulkitse HTML-koodia.
  document.querySelector("#project-name").value = project.title;
  // Piirretään juuri tälle projektille ladatut tehtävät.
  renderTasks();
}

// Piirretään tehtävälista; openTaskId kertoo mahdollisen muokkausosan, jonka haluamme pitää auki.
function renderTasks(openTaskId = null) {
  // Poistetaan vanhat rivit ennen uuden listan rakentamista.
  ui.taskList.replaceChildren();
  // filter tekee uuden taulukon vain valmiista tehtävistä; length kertoo niiden määrän.
  const completed = state.tasks.filter((task) => task.done).length;
  // Tyhjä tila saa oman toimintaan ohjaavan tekstinsä.
  ui.taskSummary.textContent = state.tasks.length === 0
    // Kolmioperaattorin ?-haara käytetään, kun tehtäviä ei ole.
    ? "Projektilla ei vielä ole tehtäviä. Lisää ensimmäinen tehtävä yllä."
    // :-haara kertoo olemassa olevien ja valmiiden tehtävien määrät.
    : `Tehtäviä yhteensä ${state.tasks.length}. Valmiita ${completed}.`;
  // Jokainen tehtävä muutetaan omaksi saavutettavaksi listarivikseen.
  for (const task of state.tasks) {
    // Luodaan yksi tehtävän li-elementti.
    const item = document.createElement("li");
    // className yhdistää tehtävärivin CSS:n tyyliin.
    item.className = "task-item";
    // div ryhmittelee valintaruudun ja sen näkyvän nimen.
    const toggleRow = document.createElement("div");
    // Tämä luokka asettelee valintaruudun nimen viereen.
    toggleRow.className = "task-toggle";
    // Luodaan selaimen oma input-elementti.
    const checkbox = document.createElement("input");
    // checkbox-tyyppi toimii hiirellä sekä välilyöntinäppäimellä.
    checkbox.type = "checkbox";
    // Jokaiselle tehtävälle muodostetaan yksilöllinen valintaruudun tunniste.
    checkbox.id = `task-done-${task.id}`;
    // checked kuvaa totuusarvona, onko valintaruutu valittu.
    checkbox.checked = task.done;
    // Vastaluotu valintaruutu noudattaa odotustilaa.
    checkbox.disabled = state.busy;
    // label on ruudun näkyvä ja ohjelmallisesti yhdistetty nimi.
    const label = document.createElement("label");
    // htmlFor vastaa HTML:n for-attribuuttia ja yhdistyy checkboxin id:hen.
    label.htmlFor = checkbox.id;
    // Tilan nimi kerrotaan sanoin; sisältö käsitellään tavallisena tekstinä.
    label.textContent = `${task.title} (${task.done ? "valmis" : "kesken"})`;
    // Muutoskuuntelija suoritetaan, kun käyttäjä vaihtaa valintaruudun tilaa.
    checkbox.addEventListener("change", async () => {
      // Otetaan käyttäjän pyytämä uusi tila talteen ennen verkkopyyntöä.
      const requestedDone = checkbox.checked;
      // PATCH muuttaa vain sovittua done-ominaisuutta.
      const success = await runAction("Tallennetaan tehtävän tilaa…", async () => {
        // Lähetetään palvelimelle uusi totuusarvo JSON-oliona.
        const result = await api(`/api/tasks/${task.id}`, "PATCH", { done: requestedDone });
        // map käy tehtävät läpi ja korvaa vain muuttuneen tehtävän palvelimen vastauksella.
        state.tasks = state.tasks.map((oldTask) => oldTask.id === task.id ? result.task : oldTask);
        // Piirretään vahvistettu tila palvelimen tiedoista.
        renderTasks();
        // Ilmoitetaan uusi tila nimeltä.
        announce(result.task.done ? "Tehtävä merkitty valmiiksi." : "Tehtävä merkitty keskeneräiseksi.");
      });
      // Virheessä palautetaan alkuperäinen ruutu palvelimen viimeksi vahvistamaan tilaan.
      if (!success) checkbox.checked = task.done;
      // Uudelleenpiirto loi uuden elementin, joten kohdistus etsitään vakaalla id:llä.
      focusId(`task-done-${task.id}`);
    });
    // Valintaruutu ja nimi lisätään samaan ryhmään.
    toggleRow.append(checkbox, label);
    // details tekee muokkauksesta selaimen omilla toiminnoilla avattavan osion.
    const details = document.createElement("details");
    // Aiemmin muokattu tehtävä pidetään tarvittaessa avoinna.
    details.open = task.id === openTaskId;
    // summary on avattavan osion näppäimistöllä toimiva otsikko.
    const summary = document.createElement("summary");
    // Tehtävän nimi erottaa tämän toiminnon muiden tehtävien toiminnoista.
    summary.textContent = `Muokkaa tai poista: ${task.title}`;
    // form mahdollistaa muokatun nimen lähettämisen myös Enterillä.
    const form = document.createElement("form");
    // Lomakkeelle annetaan sitä kuvaava saavutettava nimi.
    form.setAttribute("aria-label", `Muokkaa tehtävää ${task.title}`);
    // Kentän nimi on oma label-elementtinsä.
    const nameLabel = document.createElement("label");
    // Label yhdistetään kohta luotavaan nimikenttään.
    nameLabel.htmlFor = `task-name-${task.id}`;
    // Pakollisuus ilmaistaan sanallisesti.
    nameLabel.textContent = "Tehtävän uusi nimi (pakollinen)";
    // input kerää tehtävän uuden nimen.
    const input = document.createElement("input");
    // text on tavallinen yhden rivin tekstikenttä.
    input.type = "text";
    // Yksilöllinen id yhdistää kentän labeliin ja kohdistukseen.
    input.id = `task-name-${task.id}`;
    // name on avain, jolla FormData hakee kentän arvon.
    input.name = "title";
    // Selain tarkistaa, että kenttä on täytetty.
    input.required = true;
    // Pituus tarkistetaan readTitle-funktiossa koodipisteinä; HTML:n maxLength käyttäisi erilaista UTF-16-laskentaa.
    // Nykyinen nimi näytetään muokattavana arvona.
    input.value = task.title;
    // Myös tämä kenttä noudattaa yhteistä odotustilaa.
    input.disabled = state.busy;
    // Luodaan tallennuspainike.
    const save = document.createElement("button");
    // submit käynnistää tätä lomaketta kuuntelevan käsittelijän.
    save.type = "submit";
    // Toissijainen tyyli erottaa muokkauksen uuden tehtävän luomisesta.
    save.className = "secondary";
    // Näkyvä teksti kertoo suoraan toiminnon.
    save.textContent = "Tallenna tehtävän nimi";
    // Uusi painike pysyy odotuksessa estettynä.
    save.disabled = state.busy;
    // Lomakkeen submit-tapahtuma kokoaa tallentamisen yhteen paikkaan.
    form.addEventListener("submit", async (event) => {
      // Estetään selaimen oletustoiminto, joka lataisi sivun uudelleen.
      event.preventDefault();
      // Hoidetaan odotus ja virhe yhteisellä apufunktiolla.
      const success = await runAction("Tallennetaan tehtävän nimeä…", async () => {
        // readTitle tarkistaa nimen; palvelimelle lähetetään vain title-ominaisuus.
        const result = await api(`/api/tasks/${task.id}`, "PATCH", { title: readTitle(form, 200) });
        // Korvataan muokattu tehtävä palvelimen vahvistamalla tiedolla.
        state.tasks = state.tasks.map((oldTask) => oldTask.id === task.id ? result.task : oldTask);
        // Pidetään tämän tehtävän muokkausosa auki uudelleenpiirrossa.
        renderTasks(task.id);
        // Ilmoitetaan tallennuksen onnistumisesta.
        announce("Tehtävän nimi tallennettu.");
      });
      // Onnistumisen jälkeen kohdistetaan uusi samanniminen kenttä.
      if (success) focusId(`task-name-${task.id}`);
    });
    // Lomakkeen elementit lisätään siinä järjestyksessä kuin niitä luetaan ja käytetään.
    form.append(nameLabel, input, save);
    // Luodaan tehtävän poistopainike.
    const remove = document.createElement("button");
    // button estää tahattoman lomakelähetyksen.
    remove.type = "button";
    // danger valitsee poistamisen punaisen ulkoasun.
    remove.className = "danger";
    // Nimi erottaa poistotoiminnot myös ruudunlukijan painikelistassa.
    remove.textContent = `Poista tehtävä: ${task.title}`;
    // Poistoa ei voi aloittaa kesken toisen pyynnön.
    remove.disabled = state.busy;
    // Poistaminen käynnistyy painikkeen click-tapahtumasta.
    remove.addEventListener("click", async () => {
      // globalThis viittaa selaimen yleiseen ympäristöön; confirm avaa sen oman poistovahvistuksen.
      if (!globalThis.confirm(`Poistetaanko tehtävä ”${task.title}”? Tätä ei voi perua.`)) return;
      // Varsinainen DELETE tehdään vasta myönteisen vahvistuksen jälkeen.
      const success = await runAction("Poistetaan tehtävää…", async () => {
        // api lisää DELETEen Content-Type-otsakkeen ja tyhjän JSON-rungon.
        await api(`/api/tasks/${task.id}`, "DELETE");
        // filter säilyttää kaikki muut kuin juuri poistetun tehtävän.
        state.tasks = state.tasks.filter((oldTask) => oldTask.id !== task.id);
        // Päivitetään lista sekä tyhjä tila tai lukumäärä.
        renderTasks();
        // Poiston onnistuminen kerrotaan tekstinä.
        announce("Tehtävä poistettu.");
      });
      // Poistettu painike ei enää ole sivulla; siirretään kohdistus uuden tehtävän kenttään.
      if (success) focusId("new-task-title");
    });
    // Div ryhmittelee poistopainikkeen omaan toimintoriviinsä.
    const actions = document.createElement("div");
    // task-actions antaa riville joustavan asettelun.
    actions.className = "task-actions";
    // Liitetään poistopainike toimintoriviin.
    actions.append(remove);
    // Avattavaan osioon lisätään ensin otsikko, sitten lomake ja poistotoiminto.
    details.append(summary, form, actions);
    // Tehtävärivi koostuu valintaruudusta ja muokkausosasta.
    item.append(toggleRow, details);
    // Lisätään valmis tehtävä sivun listaan.
    ui.taskList.append(item);
  }
}

// Yhteinen kirjautumis- ja rekisteröintitoiminto vähentää saman koodin toistamista.
async function authenticate(event, path) {
  // Estetään HTML-lomakkeen tavallinen sivunvaihto.
  event.preventDefault();
  // currentTarget on se lomake, johon kuuntelija on liitetty; se talletetaan ennen awaitia.
  const form = event.currentTarget;
  // FormData kerää kenttien arvot niiden name-attribuuttien perusteella.
  const data = new FormData(form);
  // Odotuksen aikana koko näkymä estää kaksoislähetykset.
  const success = await runAction("Tarkistetaan tunnusta…", async () => {
    // Luetaan salasana aiemmin kerätystä FormDatasta; välilyöntejä ei poisteta.
    const password = String(data.get("password") ?? "");
    // Käytetään täsmälleen backendin Unicode-koodipisteisiin perustuvaa pituuslaskentaa.
    const passwordLength = Array.from(password).length;
    // Alle 15 tai yli 128 koodipisteen salasana saa näkyvän virheen ennen verkkopyyntöä.
    if (passwordLength < 15 || passwordLength > 128) {
      // runAction näyttää tämän viestin sivun virhealueella ja vapauttaa lomakkeen uudelleen.
      throw new Error("Salasanassa pitää olla 15–128 merkkiä.");
    }
    // Palvelimelle lähetetään vain sähköposti ja salasana, ei käyttäjän pyytämää roolia.
    const result = await api(path, "POST", {
      // Sähköpostin reunoilta voi poistaa vahingossa syötetyt välilyönnit.
      email: String(data.get("email") ?? "").trim(),
      // Lähetetään alkuperäinen salasana muuttamatta sen sisältöä.
      password,
    });
    // Selain säilyttää HttpOnly-istuntoevästeen; JavaScript ei lue sitä eikä tallenna salasanaa.
    showWorkspace(result.user);
    // Nyt tunnistautuneen käyttäjän omat projektit voidaan hakea.
    await loadProjects();
    // Kerrotaan onnistuneesta kirjautumisesta.
    announce("Kirjautuminen onnistui. Luo projekti tai avaa oma projektisi.");
  });
  // Seuraava luonteva kohde on projektin luontikenttä.
  if (success) focusId("new-project-title");
}

// Kirjautumislomakkeen submit käyttää login-osoitetta.
ui.login.addEventListener("submit", (event) => authenticate(event, "/api/auth/login"));
// Rekisteröintilomakkeen submit käyttää register-osoitetta.
ui.register.addEventListener("submit", (event) => authenticate(event, "/api/auth/register"));

// Uloskirjautuminen on palvelimella tehtävä istunnon poisto.
ui.logout.addEventListener("click", async () => {
  // Näytetään odotus ja odotetaan vastausta.
  const success = await runAction("Kirjaudutaan ulos…", async () => {
    // Pelkkä käyttöliittymän piilottaminen ei riittäisi; palvelimen istunto poistetaan.
    await api("/api/auth/logout", "POST", {});
    // Palvelimen vahvistuksen jälkeen poistetaan paikalliset käyttäjätiedot.
    showGuest();
    // Kerrotaan kirjautumattomasta tilasta.
    announce("Olet kirjautunut ulos.");
  });
  // Kirjautumislomakkeen ensimmäinen kenttä on nyt mielekäs kohdistuskohde.
  if (success) focusId("login-email");
});

// Projektin luonti käsitellään lomakkeella, joten Enter toimii kuten painikkeen painaminen.
ui.projectCreate.addEventListener("submit", async (event) => {
  // Estetään sivun uudelleenlataus.
  event.preventDefault();
  // Aloitetaan palvelimelle tallentava toiminto.
  const success = await runAction("Luodaan projektia…", async () => {
    // readTitle lukee kentän myös disabled-tilassa ja tarkistaa 1–120 koodipistettä; palvelin tarkistaa saman sekä omistajan.
    const result = await api("/api/projects", "POST", { title: readTitle(ui.projectCreate, 120) });
    // push lisää palvelimen palauttaman projektin taulukon loppuun.
    state.projects.push(result.project);
    // Juuri luotu projekti valitaan suoraan.
    state.selectedProjectId = result.project.id;
    // Uudella projektilla ei ole vielä tehtäviä.
    state.tasks = [];
    // Tyhjennetään luontikenttä seuraavaa projektia varten.
    ui.projectCreate.reset();
    // Päivitetään projektien lista.
    renderProjects();
    // Näytetään uuden projektin tyhjä tehtäväalue.
    renderProjectDetail();
    // Kerrotaan onnistumisesta ja seuraavasta mahdollisesta toiminnosta.
    announce("Projekti luotu. Lisää sille ensimmäinen tehtävä.");
  });
  // Kohdistus siirtyy uuden projektin tehtäväkenttään.
  if (success) focusId("new-task-title");
});

// Olemassa olevan projektin nimenmuutos.
ui.projectRename.addEventListener("submit", async (event) => {
  // Estetään lomakkeen oletuslähetys.
  event.preventDefault();
  // Lähetetään muutos palvelimelle.
  const success = await runAction("Tallennetaan projektin nimeä…", async () => {
    // PATCH muokkaa olemassa olevaa projektia; readTitle tarkistaa nimen samalla 120 koodipisteen rajalla kuin backend.
    const result = await api(`/api/projects/${state.selectedProjectId}`, "PATCH", { title: readTitle(ui.projectRename, 120) });
    // Korvataan vain muokattu projekti; muut säilyvät ennallaan.
    state.projects = state.projects.map((oldProject) => oldProject.id === result.project.id ? result.project : oldProject);
    // Listassa näytetään palvelimen vahvistama uusi nimi.
    renderProjects();
    // Myös otsikko ja muokkauskenttä päivitetään.
    renderProjectDetail();
    // Ilmoitetaan onnistumisesta.
    announce("Projektin nimi tallennettu.");
  });
  // Kohdistetaan nimen kenttä uudelleen.
  if (success) focusId("project-name");
});

// Projektin poistaminen poistaa backendissä myös projektiin kuuluvat tehtävät.
ui.projectDelete.addEventListener("click", async () => {
  // Etsitään valittu projekti vahvistusviestin nimeä varten.
  const project = state.projects.find((item) => item.id === state.selectedProjectId);
  // Ilman valittua projektia toiminnolla ei ole kohdetta.
  if (!project) return;
  // globalThis.confirm avaa selaimen vahvistuksen ennen pyyntöä; Peruuta lopettaa funktion heti.
  if (!globalThis.confirm(`Poistetaanko projekti ”${project.title}” ja kaikki sen tehtävät? Tätä ei voi perua.`)) return;
  // Käynnistetään verkkotoiminto.
  const success = await runAction("Poistetaan projektia ja sen tehtäviä…", async () => {
    // DELETE poistaa juuri tämän omistetun projektin.
    await api(`/api/projects/${project.id}`, "DELETE");
    // Poistetaan vahvistetusti poistunut projekti paikallisesta listasta.
    state.projects = state.projects.filter((item) => item.id !== project.id);
    // Poistettu projekti ei voi enää olla valittu.
    state.selectedProjectId = null;
    // Sen tehtävät poistetaan käyttöliittymän muistista.
    state.tasks = [];
    // Päivitetään jäljellä olevat projektit ja tarvittaessa tyhjä tila.
    renderProjects();
    // Piilotetaan poistuneen projektin kortti.
    renderProjectDetail();
    // Kerrotaan poistamisen laajuus myös onnistumisviestissä.
    announce("Projekti ja sen tehtävät poistettu.");
  });
  // Poistunut painike korvataan kohdistuksessa projektin luontikentällä.
  if (success) focusId("new-project-title");
});

// Uusi tehtävä lisätään juuri valittuun projektiin.
ui.taskCreate.addEventListener("submit", async (event) => {
  // Estetään sivun tavallinen uudelleenlataus.
  event.preventDefault();
  // Odotetaan palvelimen vahvistusta ennen listan muuttamista.
  const success = await runAction("Tallennetaan uutta tehtävää…", async () => {
    // readTitle tarkistaa 1–200 koodipistettä; palvelin tarkistaa saman sekä tämän projektin omistajuuden.
    const result = await api(`/api/projects/${state.selectedProjectId}/tasks`, "POST", { title: readTitle(ui.taskCreate, 200) });
    // Lisätään palvelimen luoma id ja muut tiedot tehtävätaulukkoon.
    state.tasks.push(result.task);
    // Tyhjennetään tehtäväkenttä seuraavaa tehtävää varten.
    ui.taskCreate.reset();
    // Piirretään lista, joka sisältää myös uuden tehtävän.
    renderTasks();
    // Ilmoitetaan onnistumisesta näkyvästi.
    announce("Tehtävä lisätty.");
  });
  // Tehtäviä voi lisätä peräkkäin näppäimistöllä ilman ylimääräistä siirtymistä.
  if (success) focusId("new-task-title");
});

// Ylläpidon koosteen lukeminen on suojattu myös palvelimella.
ui.statsButton.addEventListener("click", async () => {
  // Toiminto käsitellään samoilla lataus- ja virhetiloilla kuin muut pyynnöt.
  await runAction("Haetaan ylläpidon lukumääriä…", async () => {
    // GET ei muuta mitään; tavallinen käyttäjä saisi tästä palvelimelta 403-vastauksen.
    const stats = await api("/api/admin/stats");
    // Tiedot näytetään ymmärrettävänä tekstinä, ei pelkkinä irrallisina numeroina.
    ui.statsOutput.textContent = `Käyttäjiä ${stats.users}, projekteja ${stats.projects}, tehtäviä ${stats.tasks}.`;
    // Onnistumisviesti kertoo haun valmistuneen.
    announce("Ylläpidon lukumäärät haettu.");
  });
  // Palautetaan näppäimistön kohdistus toiminnon painikkeeseen.
  focusId("stats-button");
});

// Sivun käynnistys tarkistaa, onko selaimella jo voimassa oleva istuntoeväste.
async function initialize() {
  // Alun lataustila käyttää samaa apufunktiota kuin käyttäjän käynnistämät toiminnot.
  await runAction("Tarkistetaan kirjautumista…", async () => {
    // 401 on aloituksessa tavallinen kirjautumattoman käyttäjän tila.
    try {
      // JavaScript ei lue evästettä; selain liittää sen pyyntöön automaattisesti.
      const result = await api("/api/auth/me");
      // Palvelimen vahvistama käyttäjä näytetään työtilassa.
      showWorkspace(result.user);
      // Ladataan tämän käyttäjän projektit.
      await loadProjects();
      // Kerrotaan onnistuneesta valmistumisesta.
      announce("Oma työtila ladattu. Valitse projekti tai luo uusi.");
    } catch (error) {
      // Myös verkkovirheessä näytetään kirjautumisnäkymä, jotta käyttäjä voi yrittää uudelleen.
      showGuest();
      // 401 käsitellään tavallisena aloitustilana eikä punaisena virheenä.
      if (error.status === 401) {
        // Kerrotaan seuraavat vaihtoehdot selvästi.
        announce("Kirjaudu sisään tai luo uusi tunnus.");
      } else {
        // Muut virheet siirretään runActionin yhteiseen virhekäsittelyyn.
        throw error;
      }
    }
  });
}

// Käynnistetään alustus vasta kun defer-skriptin HTML-elementit ovat käytettävissä.
initialize();
````

### 12.8 Turvatoimintojen kokeet, testit ja ylläpitäjä

#### `esimerkit/04-valmis/security_demo.ts`

````ts
// Tuomme vain omat nimetyt turvatoimintomme; import ei käynnistä HTTP-palvelinta.
import { hashPassword, hashSessionToken, newSessionToken, verifyPassword } from "./security.ts";

// Tämä on julkinen kokeiluteksti, ei oikean tilin salasana. Älä käytä sitä oikeassa palvelussa.
const kokeilusana = "Harjoitellaan vain omalla koneella!";
// Ensimmäinen laskenta tuottaa satunnaisen suolan ja hitaan PBKDF2-tiivisteen.
const ensimmainen = await hashPassword(kokeilusana);
// Toinen laskenta saa saman salasanan mutta arpoo uuden suolan.
const toinen = await hashPassword(kokeilusana);
// !== tarkoittaa erisuuruusvertailua. Tulostamme vain kokeen tuloksen, emme salasanaa.
console.log("Sama salasana, eri suola:", ensimmainen.salt !== toinen.salt);
// Eri suola muuttaa myös tallennettavan tiivisteen, vaikka salasana on sama.
console.log("Sama salasana, eri tiiviste:", ensimmainen.hash !== toinen.hash);
// Tarkistus käyttää ensimmäisen tuloksen suolaa ja kierrosmäärää.
console.log("Oikea salasana hyväksytään:", await verifyPassword(kokeilusana, ensimmainen));
// Väärällä salasanalla vertailu palauttaa false-arvon.
console.log(
  "Väärä salasana hyväksytään:",
  await verifyPassword("Tämä on eri pitkä kokeilusana!", ensimmainen),
);
// Istuntotunniste arvotaan eri menetelmällä kuin ihmisen valitsema salasana.
const tunniste = newSessionToken();
// Tietokantaan tallennettava istuntotiiviste lasketaan tunnisteesta.
const tiiviste = await hashSessionToken(tunniste);
// Näytämme vain vertailun. Itse istuntotunniste on salaisuus, jota ei tarvita lokiin.
console.log("Istunnon tallenne eroaa raakatunnisteesta:", tiiviste !== tunniste);
````

#### `esimerkit/04-valmis/oikeuskoe_test.ts`

````ts
// assert.equal vertaa kahta arvoa ja epäonnistuu, jos ne eivät ole samat.
import assert from "node:assert/strict";
// Käytämme samaa HTTP-käsittelijää kuin Deno.serve käyttää valmiissa sovelluksessa.
import { createApp } from "./app.ts";
// openDatabase luo testille oman kannan, kun polkuna annetaan :memory:.
import { openDatabase } from "./db.ts";

// Deno.test nimeää kokeen; async sallii hitaiden toimintojen await-odotuksen.
Deno.test("Pieni oikeuskoe: B ei lisää tehtävää A:n projektiin", async () => {
  // Muistikanta ei kirjoita opiskelijan data/tehtavataulu.sqlite-tiedostoon.
  const db = openDatabase(":memory:");
  // Origin on sama täsmällinen alkuperä kuin selaimen käyttöpolussa.
  const origin = "http://localhost:8000";
  // Luomme pyyntökäsittelijän avaamatta oikeaa verkkoporttia.
  const app = createApp(db, { origin });
  // Paikallinen apufunktio kokoaa jokaisen kirjoituspyynnön samalla sovitulla tavalla.
  function pyynto(polku: string, data: unknown, cookie = ""): Request {
    // Request on oikea HTTP-pyynnön olio, jonka palvelin osaa käsitellä.
    return new Request(origin + polku, {
      // Tässä pienessä kokeessa kaikki kirjoitukset ovat POST-pyyntöjä.
      method: "POST",
      // Selain asettaisi Originin itse; testiohjelma antaa sen tarkoituksella käsin.
      headers: { "Origin": origin, "Content-Type": "application/json", "Cookie": cookie },
      // JSON.stringify muuttaa annetun olion JSON-tekstiksi.
      body: JSON.stringify(data),
    });
  }
  // try/finally vapauttaa tietokannan myös silloin, kun jokin vertailu epäonnistuu.
  try {
    // Tämä julkinen testiteksti ei ole oikean käyttäjän salasana.
    const password = "Vain taman paikallisen testin salasana!";
    // Vaihe 1: valmistele A tavallisen rekisteröintirajapinnan kautta.
    const a = await app(pyynto("/api/auth/register", { email: "a@example.test", password }));
    // Varmistamme, että valmistelu todella onnistui, ennen kuin tulkitsemme evästettä.
    assert.equal(a.status, 201);
    // Set-Cookie sisältää nimen, arvon ja määreet. Seuraavaan pyyntöön riittää nimi=arvo.
    const aCookie = a.headers.get("set-cookie")?.split(";")[0];
    // Tämä tarkistus varmistaa evästeen olemassaolon ja kaventaa myös TypeScript-tyypin.
    assert.ok(aCookie);
    // Valmistele B erillisenä käyttäjänä, jolla on oma istunto.
    const b = await app(pyynto("/api/auth/register", { email: "b@example.test", password }));
    // Rekisteröinnin pitää onnistua myös toiselle käyttäjälle.
    assert.equal(b.status, 201);
    // Luemme B:n oman istunnon evästeen mutta emme tulosta salaista arvoa.
    const bCookie = b.headers.get("set-cookie")?.split(";")[0];
    // Ilman erillistä B:n evästettä emme testaisi eri käyttäjän oikeutta.
    assert.ok(bCookie);
    // A luo projektin omalla istunnollaan. Omistajaa ei anneta JSONissa.
    const luotu = await app(pyynto("/api/projects", { title: "A:n projekti" }, aCookie));
    // Uuden projektin onnistumiskoodi on 201.
    assert.equal(luotu.status, 201);
    // Luemme oman sovelluksemme vastaussopimuksen mukaisen tunnisteen.
    const data = await luotu.json() as { project: { id: number } };
    // Tekstipohja ${...} sijoittaa oikean tunnisteen polkuun, joten numeroa ei arvata.
    const polku = `/api/projects/${data.project.id}/tasks`;
    // Vaihe 2: yritä lisätä B:n evästeellä tehtävä A:n projektiin.
    const estetty = await app(pyynto(polku, { title: "B:n luvaton lisäys" }, bCookie));
    // Vaihe 3: varmista estävä vastaus. Tämä malli käyttää vieraille kohteille 404:ää.
    assert.equal(estetty.status, 404);
    // Varmista myös seuraukset lukemalla A:n tehtävät uudella A:n omalla pyynnöllä.
    const tarkistus = await app(new Request(origin + polku, { headers: { Cookie: aCookie } }));
    // Omistajan luku toimii edelleen.
    assert.equal(tarkistus.status, 200);
    // Tuloksen on oltava yhä tyhjä: luvaton kirjoitus ei saanut muuttaa tietokantaa.
    const lista = await tarkistus.json() as { tasks: unknown[] };
    // Nolla todistaa, ettei B:n lisäämää tehtävää syntynyt taustalla virhevastauksesta huolimatta.
    assert.equal(lista.tasks.length, 0);
  } finally {
    // Sulkeminen hävittää vain tämän erillisen muistikannan.
    db.close();
  }
});
````

#### `esimerkit/04-valmis/csrfkoe_test.ts`

````ts
// assert vertaa testin todellista tulosta etukäteen päätettyyn tulokseen.
import assert from "node:assert/strict";
// Sama pyyntökäsittelijä toimii testissä ja oikeassa verkkopalvelimessa.
import { createApp } from "./app.ts";
// Muistikanta erottaa kokeen opiskelijan omasta sovellusdatasta.
import { openDatabase } from "./db.ts";

// Tällä kertaa testataan kirjautuneen käyttäjän oman kohteen CSRF-suojausta.
Deno.test("CSRF-koe: väärä ja puuttuva Origin eivät muuta omaa tehtävää", async () => {
  // Jokainen testi saa omat taulunsa vain tämän yhteyden ajaksi.
  const db = openDatabase(":memory:");
  // Backend hyväksyy muutospyynnöille vain tämän täsmällisen alkuperän.
  const origin = "http://localhost:8000";
  // Tuotamme oikean sovelluskäsittelijän omalla tietokannalla.
  const app = createApp(db, { origin });
  // Apufunktio muodostaa aluksi sallitut POST-pyynnöt testidatan luomista varten.
  function post(path: string, data: unknown, cookie = ""): Request {
    // Request-olioon laitetaan sama muoto, jota toimiva frontend käyttää.
    return new Request(origin + path, {
      // POST on tässä luomiseen käytetty HTTP-metodi.
      method: "POST",
      // Cookie tunnistaa käyttäjän; Origin ja sisältötyyppi liittyvät eri tarkistuksiin.
      headers: { "Origin": origin, "Content-Type": "application/json", "Cookie": cookie },
      // Olio muutetaan verkon JSON-tekstiesitykseksi.
      body: JSON.stringify(data),
    });
  }
  // finally vapauttaa kannan myös odottamattomassa testivirheessä.
  try {
    // Luomme oman testikäyttäjän oikean rekisteröintitoiminnon kautta.
    const registered = await app(post("/api/auth/register", {
      // Tämä keksitty osoite kuuluu vain eristettyyn paikalliseen testiin.
      email: "csrf@example.test",
      // Julkinen testisalalause ei ole oikean tilin salasana.
      password: "Vain eristetyn CSRF-kokeen salalause!",
    }));
    // Valmistelun pitää onnistua ennen varsinaista turvallisuuskoetta.
    assert.equal(registered.status, 201);
    // Säilytämme kelvollisen istuntoevästeen testin sisällä tulostamatta sitä.
    const cookie = registered.headers.get("set-cookie")?.split(";")[0];
    // Tämä varmistaa, ettei testissä vahingossa käytetä kirjautumatonta pyyntöä.
    assert.ok(cookie);
    // Testikäyttäjä luo itselleen projektin oikealla alkuperällä.
    const projectResponse = await app(post("/api/projects", { title: "Oma projekti" }, cookie));
    // Vaadimme onnistuneen luomisen.
    assert.equal(projectResponse.status, 201);
    // Poimimme oikean projektitunnisteen sovelluksen vastauksesta.
    const project = await projectResponse.json() as { project: { id: number } };
    // Lisäämme projektiin tehtävän, jonka pitäisi säilyä estetyissä kokeissa ennallaan.
    const taskResponse = await app(
      post(`/api/projects/${project.project.id}/tasks`, { title: "Säilyvä nimi" }, cookie),
    );
    // Tehtävänkin luonnin on onnistuttava.
    assert.equal(taskResponse.status, 201);
    // Luemme tehtävän tunnisteen vastaussopimuksen mukaisesta oliosta.
    const task = await taskResponse.json() as { task: { id: number } };
    // Tätä täsmälleen samaa omaa tehtävää sekä muutetaan että tarkistetaan.
    const taskUrl = origin + `/api/tasks/${task.task.id}`;
    // Kokeile sekä väärää alkuperää että puuttuvaa otsaketta.
    for (const invalidOrigin of ["https://vieras.example", null]) {
      // Tunnistautuminen ja JSON-muoto ovat kunnossa; muutamme vain alkuperää.
      const headers = new Headers({ "Content-Type": "application/json", "Cookie": cookie });
      // null-tapauksessa Origin jätetään tarkoituksella kokonaan pois.
      if (invalidOrigin !== null) headers.set("Origin", invalidOrigin);
      // PATCH yrittää muuttaa nykyisen tehtävän nimeä ja tilaa samalla pyynnöllä.
      const blocked = await app(
        new Request(taskUrl, {
          // Metodi ja runko ovat muuten kelvollisia, joten epäonnistumisen syy voidaan rajata Originiin.
          method: "PATCH",
          // Käytämme juuri rakennettuja otsakkeita, joissa oikea istunto on yhä mukana.
          headers,
          // Nämä muutokset eivät saa päätyä tietokantaan.
          body: JSON.stringify({ title: "Luvaton muutos", done: true }),
        }),
      );
      // Virhe kertoo, että muutospyyntö pysäytettiin.
      assert.equal(blocked.status, 403);
      // Luemme tiedon uudelleen oikealla istunnolla; GET ei muuta sovelluksen tehtävätietoa.
      const readBack = await app(new Request(taskUrl, { headers: { Cookie: cookie } }));
      // Oma kelvollinen istunto toimii yhä, joten koe ei onnistunut vahingossa logoutin vuoksi.
      assert.equal(readBack.status, 200);
      // Tulkitsemme tehtävän nimen ja valmiustilan sovelluksen JSON-vastauksesta.
      const unchanged = await readBack.json() as { task: { title: string; done: boolean } };
      // Estävä koodi ei riitä: myös alkuperäisen nimen on säilyttävä.
      assert.equal(unchanged.task.title, "Säilyvä nimi");
      // Samalla tarkistetaan, ettei valmis-tila muuttunut taustalla.
      assert.equal(unchanged.task.done, false);
    }
  } finally {
    // Hävitetään vain tätä koetta varten avattu muistikanta.
    db.close();
  }
});
````

#### `esimerkit/04-valmis/integration_test.ts`

````ts
// assert tarjoaa tarkistuksia, jotka keskeyttävät testin, jos todellinen tulos on väärä.
import assert from "node:assert/strict";
// Käytämme testissä samaa sovelluskäsittelijää kuin oikeassa verkkopalvelimessa.
import { createApp } from "./app.ts";
// Jokainen testi saa oman SQLite-kantansa; opiskelijan sovelluskantaa ei avata.
import { openDatabase, type User } from "./db.ts";
// Sama vakio auttaa kokeilemaan juuri sovelluksen istunnon vanhenemisrajaa.
import { hashSessionToken, PASSWORD_ITERATIONS, SESSION_SECONDS } from "./security.ts";

// Testipyyntöjen origin on täsmälleen sama kuin harjoituksen selaimessa käytetty osoite.
const ORIGIN = "http://localhost:8000";
// Tämä on julkinen testisalalause, jota ei pidä käyttää oikean tilin salasanana.
const PASSWORD = "Vain testin pitka salalause 123!";

// Fixture tarkoittaa testin tarvitsemien olioiden valmisteltua kokonaisuutta.
function fixture() {
  // :memory: pitää tämän testin taulut RAM-muistissa vain yhteyden eliniän ajan.
  const db = openDatabase(":memory:");
  // Testikello on erillinen muuttuja, jotta vanhenemista voidaan testata odottamatta kahdeksaa tuntia.
  let time = Date.UTC(2026, 0, 1);
  // Nuolifunktio lukee nykyisen time-arvon joka kutsulla.
  const app = createApp(db, { origin: ORIGIN, now: () => time });
  // request kutsuu HTTP-käsittelijää oikealla Request-oliolla avaamatta verkkoyhteyttä.
  const request = (path: string, options: RequestInit = {}, ip = "127.0.0.1") =>
    app(new Request(ORIGIN + path, options), ip);
  // Palautettava advance-funktio siirtää vain tämän testin kelloa.
  return {
    db,
    request,
    advance: (milliseconds: number) => {
      time += milliseconds;
    },
  };
}

// ReturnType poimii fixture-funktion palauttaman olion tyypin, jotta sitä ei kirjoiteta kahdesti.
type Fixture = ReturnType<typeof fixture>;

// Tämä apufunktio jäljittelee frontendin kirjoittavaa fetch-pyyntöä.
function write(method: string, body: unknown, cookie = ""): RequestInit {
  // Otsakkeet sisältävät testissä käsin Originin; oikea selain asettaa sen itse.
  return {
    method,
    headers: { Origin: ORIGIN, "Content-Type": "application/json", Cookie: cookie },
    body: JSON.stringify(body),
  };
}

// Rekisteröimme käyttäjän oikean API:n kautta, jolloin myös salasanan käsittely ja sessio testautuvat.
async function register(test: Fixture, email: string) {
  // Testin POST-pyyntö sisältää vain API:n sallimat kentät.
  const response = await test.request(
    "/api/auth/register",
    write("POST", { email, password: PASSWORD }),
  );
  // Rekisteröinti on onnistunut vasta, kun tilakoodi on 201.
  assert.equal(response.status, 201);
  // Käyttäjä luetaan JSON-vastauksesta; tämän jälkeen yksittäisiä kenttiä tarkistetaan testissä.
  const data = await response.json() as { user: User };
  // Luemme selaimeen tarkoitetun Set-Cookie-otsakkeen testiasiakkaan muistiksi.
  const setCookie = response.headers.get("set-cookie");
  // assert.ok varmistaa, ettei arvo puutu; TypeScriptkin oppii sen olevan nyt olemassa.
  assert.ok(setCookie);
  // Seuraavaan pyyntöön lähetetään vain nimi=arvo, ei HttpOnly- tai Max-Age-määrityksiä.
  const cookie = setCookie.split(";")[0];
  // Palautamme sekä käyttäjän että evästeen jatkopolkua varten.
  return { user: data.user, cookie, setCookie };
}

// Deno.test rekisteröi testin; async sallii API-pyyntöjen odottamisen sen sisällä.
Deno.test("Rekisteröinti tallentaa suolatun PBKDF2-tiivisteen ja vain istuntotunnisteen tiivisteen", async () => {
  // Jokainen testi luo oman eristetyn tietokannan.
  const test = fixture();
  // finally sulkee yhteyden, vaikka jokin tarkistus epäonnistuisi.
  try {
    // Iso alkukirjain havainnollistaa sähköpostin yhdenmukaistamista.
    const alice = await register(test, "Alice@example.test");
    // Toinen käyttäjä käyttää samaa julkista testisalalausetta.
    const bob = await register(test, "bob@example.test");
    // API kertoo aina palvelimen määrittämän tavallisen roolin.
    assert.equal(alice.user.role, "user");
    // Sähköpostin kirjainkoko on yhdenmukaistettu.
    assert.equal(alice.user.email, "alice@example.test");
    // Julkisen käyttäjän kenttiin ei kuulu salasana tai sen tiiviste.
    assert.deepEqual(Object.keys(alice.user).sort(), ["email", "id", "role"]);
    // Evästeen suojaominaisuudet ovat mukana paikallisessakin kehityksessä.
    assert.match(alice.setCookie, /HttpOnly; SameSite=Strict; Max-Age=28800/);
    // HTTP-localhost ei käytä Secure-määritystä; HTTPS-versio testataan erikseen.
    assert.equal(alice.setCookie.includes("; Secure"), false);
    // Tietokanta luetaan tässä vain testin sisällä, ei julkisesta API:sta.
    const rows = test.db.prepare(
      "SELECT password_hash, password_salt, password_iterations FROM users ORDER BY id",
    ).all();
    // Sama salasana tuottaa eri suolan jokaiselle käyttäjälle.
    assert.notEqual(rows[0].password_salt, rows[1].password_salt);
    // Eri suola tuottaa myös eri tiivisteen samasta salasanasta.
    assert.notEqual(rows[0].password_hash, rows[1].password_hash);
    // Salasana ei saa olla suoraan tallennettu vertailukenttään.
    assert.notEqual(rows[0].password_hash, PASSWORD);
    // Hitaan laskennan työmäärä on sovittu 600000 kierrosta.
    assert.equal(rows[0].password_iterations, PASSWORD_ITERATIONS);
    // Poimimme vain evästeen salaisen arvon nimi=arvo-parista.
    const rawToken = alice.cookie.split("=")[1];
    // Istuntorivi haetaan käyttäjän tunnuksella vain tätä testiä varten.
    const session = test.db.prepare("SELECT token_hash FROM sessions WHERE user_id = ?").get(
      alice.user.id,
    );
    // Tietokannassa ei ole selaimelle annettua raakaa tunnistetta.
    assert.notEqual(session?.token_hash, rawToken);
    // Tallennettu arvo on täsmälleen raakatunnisteen SHA-256-tiiviste.
    assert.equal(session?.token_hash, await hashSessionToken(rawToken));
    // Kahden käyttäjän evästeet ovat erilliset.
    assert.notEqual(alice.cookie, bob.cookie);
  } finally {
    // Muistitietokannan sisältö katoaa, kun tämän testin yhteys suljetaan.
    test.db.close();
  }
});

// Tämä testi todentaa kirjautumisen, tunnisteen vaihdon ja uloskirjautumisen palvelimen puolella.
Deno.test("Login vaihtaa istunnon; logout mitätöi myös kopioidun vanhan evästeen", async () => {
  // Uusi fixture varmistaa, etteivät aiemman testin käyttäjät vaikuta tähän.
  const test = fixture();
  // Yhteys siivotaan onnistumisen ja epäonnistumisen jälkeen.
  try {
    // Suojatun datan lukeminen ilman kirjautumista on kielletty.
    assert.equal((await test.request("/api/projects")).status, 401);
    // Myös ylläpitotilastot vaativat ensin autentikoinnin.
    assert.equal((await test.request("/api/admin/stats")).status, 401);
    // Kirjaudumme aluksi rekisteröimällä uuden käyttäjän.
    const alice = await register(test, "alice@example.test");
    // Nykyisen käyttäjän haku hyväksyy voimassa olevan evästeen.
    assert.equal(
      (await test.request("/api/auth/me", { headers: { Cookie: alice.cookie } })).status,
      200,
    );
    // Onnistunut login saa myös vanhan evästeen, jotta sen korvaaminen tulee testatuksi.
    const login = await test.request(
      "/api/auth/login",
      write("POST", { email: alice.user.email, password: PASSWORD }, alice.cookie),
    );
    // Oikeilla tunnuksilla kirjautuminen onnistuu.
    assert.equal(login.status, 200);
    // Uuden vastauksen evästeestä poimitaan nimi=arvo-osa.
    const newCookie = login.headers.get("set-cookie")!.split(";")[0]; // ! on tyyppivakuutus testin onnistumisoletuksesta.
    // Vanhaa tunnistetta ei käytetä uudelleen.
    assert.notEqual(newCookie, alice.cookie);
    // Kopio aiemmasta evästeestä ei enää tunnista käyttäjää.
    assert.equal(
      (await test.request("/api/auth/me", { headers: { Cookie: alice.cookie } })).status,
      401,
    );
    // Uusi eväste toimii.
    assert.equal(
      (await test.request("/api/auth/me", { headers: { Cookie: newCookie } })).status,
      200,
    );
    // Uloskirjautuminen lähetetään kirjoittavana, Origin-tarkistettuna JSON-pyyntönä.
    const logout = await test.request("/api/auth/logout", write("POST", {}, newCookie));
    // 204 ilmaisee onnistumisen ilman vastausrunkoa.
    assert.equal(logout.status, 204);
    // Selain ohjataan poistamaan eväste.
    assert.match(logout.headers.get("set-cookie") ?? "", /Max-Age=0/);
    // Myöskään käsin talletettu kopio viimeisestä evästeestä ei enää toimi.
    assert.equal(
      (await test.request("/api/auth/me", { headers: { Cookie: newCookie } })).status,
      401,
    );
    // Palvelimen istuntotaulu on tyhjä: kyse ei ollut vain käyttöliittymän piilottamisesta.
    assert.equal(test.db.prepare("SELECT COUNT(*) AS total FROM sessions").get()?.total, 0);
  } finally {
    // Yhteys suljetaan riippumatta assert-tarkistusten tuloksista.
    test.db.close();
  }
});

// Hallittava testikello korvaa oikean kahdeksan tunnin odottamisen.
Deno.test("Istunto vanhenee palvelimella tasan kahdeksan tunnin kohdalla", async () => {
  // Muistissa olevat käyttäjä- ja istuntorivit kuuluvat vain tähän testiin.
  const test = fixture();
  // try/finally pitää resurssien siivouksen varmana.
  try {
    // Luodaan tunnistettu käyttäjä.
    const alice = await register(test, "alice@example.test");
    // Siirrytään yhden millisekunnin päähän vanhenemisesta.
    test.advance(SESSION_SECONDS * 1000 - 1);
    // Juuri ennen rajaa istunto on voimassa.
    assert.equal(
      (await test.request("/api/auth/me", { headers: { Cookie: alice.cookie } })).status,
      200,
    );
    // Saavutetaan tarkka vanhenemishetki.
    test.advance(1);
    // Palvelin hylkää evästeen, vaikka testiasiakas lähettää sen edelleen.
    assert.equal(
      (await test.request("/api/auth/me", { headers: { Cookie: alice.cookie } })).status,
      401,
    );
    // Myös tietokannan vanhentunut rivi poistetaan.
    assert.equal(test.db.prepare("SELECT COUNT(*) AS total FROM sessions").get()?.total, 0);
  } finally {
    // Sulkeminen hävittää tämän testin muistitietokannan.
    test.db.close();
  }
});

// Nämä ovat varsinaiset horisontaalisen käyttöoikeuden kielteiset testit kahdella käyttäjällä.
Deno.test("B ei lue, luo, muuta eikä poista A:n projektin tai tehtävän tietoja", async () => {
  // Testi käyttää oikeita tietokantaviittauksia ja oikeita istuntoja.
  const test = fixture();
  // Lopussa yhteys suljetaan myös mahdollisen tietoturvavirheen paljastuessa.
  try {
    // A ja B ovat kaksi erillistä rekisteröityä tavallista käyttäjää.
    const alice = await register(test, "alice@example.test");
    // Toinen rekisteröinti saa uuden käyttäjätunnuksen ja uuden evästeen.
    const bob = await register(test, "bob@example.test");
    // A luo projektinsa API:n kautta; user_id ei esiinny pyynnössä.
    const createdProject = await test.request(
      "/api/projects",
      write("POST", { title: "A:n projekti" }, alice.cookie),
    );
    // Projektin luomisen pitää onnistua.
    assert.equal(createdProject.status, 201);
    // Otamme talteen uuden projektin tunnuksen seuraavia pyyntöjä varten.
    const { project } = await createdProject.json();
    // A lisää tehtävän omaan projektiinsa.
    const createdTask = await test.request(
      `/api/projects/${project.id}/tasks`,
      write("POST", { title: "A:n tehtävä" }, alice.cookie),
    );
    // Tehtävän luominen palauttaa uuden resurssin.
    assert.equal(createdTask.status, 201);
    // Otamme talteen myös tehtävän tunnuksen.
    const { task } = await createdTask.json();
    // B:n oma projektikokoelma ei sisällä A:n projektia.
    const bList = await test.request("/api/projects", { headers: { Cookie: bob.cookie } });
    // Tyhjä lista ei vuoda edes vieraan projektin nimeä.
    assert.deepEqual(await bList.json(), { projects: [] });
    // Kukin rivi on yksi eri tapa yrittää päästä A:n tietoihin B:n tunnuksilla.
    const attacks: Array<[string, string, unknown]> = [
      ["GET", `/api/projects/${project.id}`, undefined], // Suora projektin luku.
      ["PATCH", `/api/projects/${project.id}`, { title: "B:n muutos" }], // Projektin nimen muutos.
      ["DELETE", `/api/projects/${project.id}`, {}], // Koko projektin poistaminen.
      ["GET", `/api/projects/${project.id}/tasks`, undefined], // Vieraan projektin tehtävälista.
      ["POST", `/api/projects/${project.id}/tasks`, { title: "B:n lisäys" }], // Tehtävän lisääminen vieraaseen projektiin.
      ["GET", `/api/tasks/${task.id}`, undefined], // Yhden vieraan tehtävän luku.
      ["PATCH", `/api/tasks/${task.id}`, { done: true }], // Vieraan tehtävän tilan muutos.
      ["DELETE", `/api/tasks/${task.id}`, {}], // Vieraan tehtävän poistaminen.
    ];
    // Destrukturointi antaa jokaisen testirivin kolme osaa omiksi muuttujikseen.
    for (const [method, path, body] of attacks) {
      // Lukupyyntö tarvitsee vain evästeen; kirjoitus käyttää samaa suojattua JSON-muotoa kuin frontend.
      const options = method === "GET"
        ? { headers: { Cookie: bob.cookie } }
        : write(method, body, bob.cookie);
      // Vieraalle resurssille palautuu 404 riippumatta siitä, onko toiminto luku vai muutos.
      assert.equal((await test.request(path, options)).status, 404, `${method} ${path}`);
    }
    // A pystyy yhä lukemaan tehtävänsä epäonnistuneiden hyökkäysten jälkeen.
    const unchanged = await test.request(`/api/tasks/${task.id}`, {
      headers: { Cookie: alice.cookie },
    });
    // Pelkkä virhetilakoodi ei riitä todisteeksi: tarkistamme myös, ettei data muuttunut.
    assert.deepEqual((await unchanged.json()).task, task);
    // A:n projektissakin on edelleen alkuperäinen nimi.
    const intactProject = await test.request(`/api/projects/${project.id}`, {
      headers: { Cookie: alice.cookie },
    });
    // Tallennettu projekti vastaa ennen hyökkäyksiä luotua projektia.
    assert.deepEqual((await intactProject.json()).project, project);
    // Omistajan sallittu päivitys toimii samasta suojatusta reitistä.
    const changed = await test.request(
      `/api/tasks/${task.id}`,
      write("PATCH", { title: "A:n päivitetty tehtävä", done: true }, alice.cookie),
    );
    // Päivitys onnistuu oikealla käyttäjällä.
    assert.equal(changed.status, 200);
    // Vastauksessa on oikea boolean-arvo.
    assert.equal((await changed.json()).task.done, true);
    // Omistaja saa poistaa oman tehtävänsä.
    assert.equal(
      (await test.request(`/api/tasks/${task.id}`, write("DELETE", {}, alice.cookie))).status,
      204,
    );
    // Poistettu tehtävä ei enää löydy omistajaltakaan.
    assert.equal(
      (await test.request(`/api/tasks/${task.id}`, { headers: { Cookie: alice.cookie } })).status,
      404,
    );
    // Luomme vielä tehtävän, jotta projektin kaskadipoisto voidaan todentaa.
    assert.equal(
      (await test.request(
        `/api/projects/${project.id}/tasks`,
        write("POST", { title: "Poistuu projektin mukana" }, alice.cookie),
      )).status,
      201,
    );
    // Projektin omistajan poistopyyntö onnistuu.
    assert.equal(
      (await test.request(`/api/projects/${project.id}`, write("DELETE", {}, alice.cookie))).status,
      204,
    );
    // Viiteavaimen CASCADE-sääntö poisti myös projektiin kuuluneen tehtävän.
    assert.equal(test.db.prepare("SELECT COUNT(*) AS total FROM tasks").get()?.total, 0);
  } finally {
    // Sulkemme vain tämän testin kannan.
    test.db.close();
  }
});

// Roolin väärentäminen ja toisen omistajan syöttäminen pitää hylätä palvelimella.
Deno.test("Asiakas ei valitse roolia tai omistajaa; admin näkee vain erikseen sallitut yhteismäärät", async () => {
  // Testin tietokanta on aluksi tyhjä.
  const test = fixture();
  // Suljemme tietokannan myös silloin, jos jokin oikeustarkistus on rikki.
  try {
    // Hyökkääjä yrittää lisätä rekisteröintirunkoon admin-roolin.
    const forged = await test.request(
      "/api/auth/register",
      write("POST", { email: "evil@example.test", password: PASSWORD, role: "admin" }),
    );
    // Ylimääräinen kenttä johtaa 400-virheeseen ennen käyttäjän luomista.
    assert.equal(forged.status, 400);
    // Tarkistamme myös sivuvaikutuksen puuttumisen.
    assert.equal(test.db.prepare("SELECT COUNT(*) AS total FROM users").get()?.total, 0);
    // Luomme oikean tavallisen käyttäjän.
    const alice = await register(test, "alice@example.test");
    // Luomme toisen käyttäjän, jonka omistajuutta ei saa jäljitellä.
    const bob = await register(test, "bob@example.test");
    // Tavallinen käyttäjä ei saa ylläpitotilastoja.
    assert.equal(
      (await test.request("/api/admin/stats", { headers: { Cookie: alice.cookie } })).status,
      403,
    );
    // A yrittää tehdä projektin B:n omistukseen lähettämällä ylimääräisen user_id-kentän.
    const forgedOwner = await test.request(
      "/api/projects",
      write("POST", { title: "Väärä omistaja", user_id: bob.user.id }, alice.cookie),
    );
    // Palvelin hylkää koko pyynnön.
    assert.equal(forgedOwner.status, 400);
    // Epäonnistunut pyyntö ei luonut projektia kenellekään.
    assert.equal(test.db.prepare("SELECT COUNT(*) AS total FROM projects").get()?.total, 0);
    // B luo itselleen yhden aidon projektin.
    const bProjectResponse = await test.request(
      "/api/projects",
      write("POST", { title: "B:n yksityinen projekti" }, bob.cookie),
    );
    // Tunnusta käytetään myöhemmin ylläpitäjän oikeuksien rajauksen testiin.
    const { project } = await bProjectResponse.json();
    // Testi jäljittelee paikallista admin-komentoa: rooli muuttuu luotetussa tietokantakäytössä.
    test.db.prepare("UPDATE users SET role = 'admin' WHERE id = ?").run(alice.user.id);
    // Istunnon käyttäjän rooli luetaan palvelimella uudelleen jokaisessa pyynnössä.
    const stats = await test.request("/api/admin/stats", { headers: { Cookie: alice.cookie } });
    // Ylläpitäjä pääsee nimenomaisesti tähän yhteismääräreittiin.
    assert.equal(stats.status, 200);
    // Vastauksessa on vain laskurit: ei salasanoja, sähköposteja tai muiden projektien nimiä.
    assert.deepEqual(await stats.json(), { users: 2, projects: 1, tasks: 0 });
    // Admin-rooli ei ohita omistajuussääntöä tavallisilla projektireiteillä.
    assert.equal(
      (await test.request(`/api/projects/${project.id}`, { headers: { Cookie: alice.cookie } }))
        .status,
      404,
    );
    // Adminin oma projektikokoelma pysyy omana kokoelmana.
    assert.deepEqual(
      await (await test.request("/api/projects", { headers: { Cookie: alice.cookie } })).json(),
      { projects: [] },
    );
  } finally {
    // Siivoamme testin resurssin.
    test.db.close();
  }
});

// CSRF-, kokoraja- ja tyyppitarkistukset kokeillaan suoraan HTTP-pyynnöillä.
Deno.test("Origin, sisältötyyppi, rungon koko ja kenttien tyypit tarkistetaan palvelimella", async () => {
  // Tämä testi ei luota frontendin lomakkeiden rajoituksiin.
  const test = fixture();
  // finally sulkee kannan jokaisella lopputuloksella.
  try {
    // Muodostamme muuten kelvollisen rekisteröintipyynnön.
    const valid = write("POST", { email: "alice@example.test", password: PASSWORD });
    // Vieraan sivuston alkuperä ei kelpaa, vaikka sisältö olisi oikeaa JSONia.
    const foreign = {
      ...valid,
      headers: { Origin: "https://vieras.example", "Content-Type": "application/json" },
    };
    // Hylkäys tapahtuu ennen tilin luomista.
    assert.equal((await test.request("/api/auth/register", foreign)).status, 403);
    // Myös puuttuva Origin on tarkoituksella hylättävä.
    assert.equal(
      (await test.request("/api/auth/register", {
        ...valid,
        headers: { "Content-Type": "application/json" },
      })).status,
      403,
    );
    // localhost ja 127.0.0.1 eivät ole sama origin, vaikka ne voivat osoittaa samalle koneelle.
    assert.equal(
      (await test.request("/api/auth/register", {
        ...valid,
        headers: { Origin: "http://127.0.0.1:8000", "Content-Type": "application/json" },
      })).status,
      403,
    );
    // Oikeakaan origin ei salli tekstilomaketta JSON-API:n kirjoitukseen.
    assert.equal(
      (await test.request("/api/auth/register", {
        ...valid,
        headers: { Origin: ORIGIN, "Content-Type": "text/plain" },
      })).status,
      415,
    );
    // Rikkinäinen JSON tuottaa 400-virheen.
    assert.equal((await test.request("/api/auth/register", { ...valid, body: "{" })).status, 400);
    // Myös kelvollinen JSON voi olla väärää rakennetta: tässä taulukko olion sijaan.
    assert.equal((await test.request("/api/auth/register", write("POST", []))).status, 400);
    // null ei ole lomakedataa kuvaava olio.
    assert.equal((await test.request("/api/auth/register", write("POST", null))).status, 400);
    // Rungon todellinen koko tarkistetaan myös ilman Content-Length-otsaketta.
    assert.equal(
      (await test.request(
        "/api/auth/register",
        write("POST", { email: "a".repeat(17_000), password: PASSWORD }),
      )).status,
      413,
    );
    // Sähköpostin näkymätön NUL-merkki torjutaan jo validoinnissa, ei vasta tietokantavirheenä.
    assert.equal(
      (await test.request(
        "/api/auth/register",
        write("POST", { email: "a\u0000@example.test", password: PASSWORD }),
      )).status,
      400,
    );
    // Hylätyt pyynnöt eivät jättäneet käyttäjärivejä tietokantaan.
    assert.equal(test.db.prepare("SELECT COUNT(*) AS total FROM users").get()?.total, 0);
    // Seuraavaksi käytämme oikeaa kirjautumista datan validoinnin testeissä.
    const alice = await register(test, "alice@example.test");
    // Pelkistä välilyönneistä koostuva projektin nimi on virhe.
    assert.equal(
      (await test.request("/api/projects", write("POST", { title: "   " }, alice.cookie))).status,
      400,
    );
    // Projektin enimmäispituus on 120 merkkiä.
    assert.equal(
      (await test.request("/api/projects", write("POST", { title: "a".repeat(121) }, alice.cookie)))
        .status,
      400,
    );
    // Luomme kelvollisen projektin tehtävätyyppien tarkistusta varten.
    const projectResponse = await test.request(
      "/api/projects",
      write("POST", { title: "Kelvollinen" }, alice.cookie),
    );
    // JSONista poimitaan projektin tunnus.
    const { project } = await projectResponse.json();
    // Tehtävän 200-merkkinen nimi on vielä sallittu.
    const taskResponse = await test.request(
      `/api/projects/${project.id}/tasks`,
      write("POST", { title: "a".repeat(200) }, alice.cookie),
    );
    // Projektin ja tehtävän pituusrajat ovat tarkoituksella erilaiset.
    assert.equal(taskResponse.status, 201);
    // Tallennetaan luodun tehtävän tunnus.
    const { task } = await taskResponse.json();
    // JSON-teksti "false" ei saa vahingossa tulkintua totuudeksi.
    assert.equal(
      (await test.request(`/api/tasks/${task.id}`, write("PATCH", { done: "false" }, alice.cookie)))
        .status,
      400,
    );
    // Tehtävän siirtäminen project_id-kentällä ei kuulu tähän API:in.
    assert.equal(
      (await test.request(
        `/api/tasks/${task.id}`,
        write("PATCH", { project_id: 999 }, alice.cookie),
      )).status,
      400,
    );
    // Kumpikaan hylätty päivitys ei muuttanut tehtävän tilaa.
    assert.equal(test.db.prepare("SELECT done FROM tasks WHERE id = ?").get(task.id)?.done, 0);
  } finally {
    // Suljemme tämän testin erillisen tietokannan.
    test.db.close();
  }
});

// Testi havainnollistaa SQL-parametrien tarkoitusta myös erikoismerkkejä sisältävällä datalla.
Deno.test("Heittomerkit ja HTML-teksti tallentuvat datana ilman SQL-koodin suorittamista", async () => {
  // Uusi tietokanta estää aiempien testien sivuvaikutukset.
  const test = fixture();
  // Lopuksi yhteys suljetaan.
  try {
    // Luomme tavallisen käyttäjän, jolla on oikeus omaan projektiinsa.
    const alice = await register(test, "alice@example.test");
    // Nimi näyttää SQL-lauseelta, mutta sitä pitää käsitellä tavallisena tekstinä.
    const title = "O'Brian'); DROP TABLE users; --";
    // Lähetämme tekstin tavallisessa nimikentässä.
    const response = await test.request("/api/projects", write("POST", { title }, alice.cookie));
    // Projekti saa syntyä, koska välimerkit ovat sallittua nimeä.
    assert.equal(response.status, 201);
    // Tallennettu arvo on sama teksti; sitä ei ole tulkittu SQL-komennoksi.
    assert.equal((await response.json()).project.title, title);
    // users-taulu on edelleen olemassa ja sisältää käyttäjänsä.
    assert.equal(test.db.prepare("SELECT COUNT(*) AS total FROM users").get()?.total, 1);
    // HTML:ltä näyttävä nimiteksti saa myös säilyä datana.
    const html = "<img src=x onerror=alert('xss')>";
    // Turvallinen frontend näyttää arvon textContentilla, ei innerHTML:llä.
    const htmlResponse = await test.request(
      "/api/projects",
      write("POST", { title: html }, alice.cookie),
    );
    // API kertoo sisällön olevan JSONia, jotta selain ei tulkitse sitä HTML-sivuksi.
    assert.match(htmlResponse.headers.get("content-type") ?? "", /^application\/json/);
    // JSONissa teksti on ennallaan; selaimessa suorittamattomuus varmistetaan myös frontend-harjoituksessa.
    assert.equal((await htmlResponse.json()).project.title, html);
  } finally {
    // Suljemme kannan, vaikka injektiotesti paljastaisi virheen.
    test.db.close();
  }
});

// Suojausotsakkeiden ja sallitun tiedostolistan vaikutukset kokeillaan todellisilla poluilla.
Deno.test("Staattinen allowlist ei paljasta lähdekoodia tai tietokantaa ja CSP on käytössä", async () => {
  // Muistitietokanta riittää, koska tiedostoreitit eivät tarvitse käyttäjädataa.
  const test = fixture();
  // Sulkeminen on tämänkin testin vastuulla.
  try {
    // Jokainen näistä tiedostoista on kielletty, vaikka nimi arvataan oikein.
    for (
      const path of [
        "/db.ts",
        "/deno.jsonc",
        "/01_create_schema.sql",
        "/data/tehtavataulu.sqlite",
        "/.env",
        "/%2e%2e/db.ts",
      ]
    ) {
      // Suoraan kirjoitettu tiedostopolku ei muuta palvelimen allowlistiä.
      assert.equal((await test.request(path)).status, 404, path);
    }
    // Oikea etusivu on julkisesti saatavilla.
    const index = await test.request("/");
    // Käynnistyspaketissa pitää olla myös frontend-tiedostot.
    assert.equal(index.status, 200);
    // Skriptejä saa ladata vain samasta originista.
    assert.match(index.headers.get("content-security-policy") ?? "", /script-src 'self'/);
    // CSP ei salli inline-JavaScriptiä.
    assert.equal(
      (index.headers.get("content-security-policy") ?? "").includes("unsafe-inline"),
      false,
    );
    // Sisältötyypin arvaaminen on estetty.
    assert.equal(index.headers.get("x-content-type-options"), "nosniff");
    // Kirjautuneen sovelluksen vastauksia ei tallenneta välimuistiin.
    assert.equal(index.headers.get("cache-control"), "no-store");
    // POST ei voi kirjoittaa julkista CSS-tiedostoa.
    assert.equal((await test.request("/styles.css", write("POST", {}))).status, 405);
    // Myös virhevastaukset saavat samat suojausotsakkeet.
    const denied = await test.request("/api/auth/me");
    // Ulkopuolinen sivusto ei saa kehystää edes kirjautumisvirhettä.
    assert.equal(denied.headers.get("x-frame-options"), "DENY");
  } finally {
    // Suljemme testin kannan.
    test.db.close();
  }
});

// Geneerinen virhe ja yritysraja ovat eri suojauksia; testaamme molemmat.
Deno.test("Väärä ja tuntematon tili saavat saman virheen, ja kirjautumisyrityksiä rajoitetaan", async () => {
  // Uusi sovellus saa uuden, aluksi tyhjän prosessikohtaisen laskurin.
  const test = fixture();
  // Lopuksi yhteys vapautetaan.
  try {
    // Luomme yhden oikean tilin väärän salasanan kokeilua varten.
    const alice = await register(test, "alice@example.test");
    // Tämä salasana täyttää pituussäännön mutta ei vastaa tilin salasanaa.
    const wrongPassword = "Väärä mutta tarpeeksi pitkä salalause";
    // Tunnettu sähköposti ja väärä salasana eivät saa kirjata sisään.
    const known = await test.request(
      "/api/auth/login",
      write("POST", { email: alice.user.email, password: wrongPassword }),
    );
    // Tuntematon tili saa saman laskentapolun ja julkisen virheen.
    const unknown = await test.request(
      "/api/auth/login",
      write("POST", { email: "unknown@example.test", password: wrongPassword }),
    );
    // Molemmat tulkitaan epäonnistuneiksi kirjautumisiksi.
    assert.equal(known.status, 401);
    // Tilakoodi ei paljasta tilin olemassaoloa.
    assert.equal(unknown.status, 401);
    // Myös virheteksti on sama.
    assert.deepEqual(await known.json(), await unknown.json());
    // Yksi A:n epäonnistuminen on jo tehty; neljä lisää täyttää viiden yrityksen rajan.
    for (let count = 0; count < 4; count++) {
      // Kukin sallittujen yritysten sisäinen väärä kirjautuminen saa normaalin 401-virheen.
      assert.equal(
        (await test.request(
          "/api/auth/login",
          write("POST", { email: alice.user.email, password: wrongPassword }),
        )).status,
        401,
      );
    }
    // Kuudes yritys hylätään jo ennen hidasta salasanatyötä, vaikka salasana olisi nyt oikein.
    const limited = await test.request(
      "/api/auth/login",
      write("POST", { email: alice.user.email, password: PASSWORD }),
    );
    // 429 ilmaisee ylittyneen yritysrajan.
    assert.equal(limited.status, 429);
    // Odotusaika ilmoitetaan standardiotsakkeessa sekunteina.
    assert.equal(limited.headers.get("retry-after"), "900");
    // Testikello siirretään seuraavan aikaikkunan alkuun.
    test.advance(15 * 60 * 1000);
    // Rajoitus ei lukitse tiliä loputtomasti: oikea kirjautuminen toimii aikarajan jälkeen.
    assert.equal(
      (await test.request(
        "/api/auth/login",
        write("POST", { email: alice.user.email, password: PASSWORD }),
      )).status,
      200,
    );
  } finally {
    // Suljemme vain tämän testin tietokannan.
    test.db.close();
  }
});

// Tässä kokeillaan aidon tiedoston säilyvyyttä ja tietokannan omia eheyssääntöjä.
Deno.test("SQLite säilyttää datan uudelleenavauksessa, migraatio ei toistu ja viiteavaimet toimivat", () => {
  // Testien väliaikaiset tiedostot rajataan data-hakemiston erilliseen alihakemistoon.
  Deno.mkdirSync("./data", { recursive: true });
  // makeTempDirSync luo yksilöllisen kansion, joten opiskelijan varsinainen kanta ei ole vaarassa.
  const directory = Deno.makeTempDirSync({ dir: "./data", prefix: "test-" });
  // Tämän polun omistaa vain tämä testi.
  const path = `${directory}/test.sqlite`;
  // Ensimmäinen avaus luo tietokannan ja suorittaa migraation 1.
  let db = openDatabase(path);
  // Suljemme viimeisen yhteyden ja poistamme vain oman väliaikaisen kansion.
  try {
    // Tämä suoraan lisätty rivi on vain rakennetestiä varten; API-testit käyttävät oikeaa salasanan laskentaa.
    const inserted = db.prepare(
      "INSERT INTO users(email, password_hash, password_salt, password_iterations) VALUES (?, ?, ?, ?)",
    ).run("persist@example.test", "a".repeat(64), "b".repeat(32), PASSWORD_ITERATIONS);
    // Käytämme tietokannan juuri antamaa tunnusta omistajaviittaukseen.
    const ownerId = Number(inserted.lastInsertRowid);
    // Projektin lisääminen olemassa olevalle omistajalle onnistuu.
    db.prepare("INSERT INTO projects(user_id, title) VALUES (?, ?)").run(
      ownerId,
      "Säilyvä projekti",
    );
    // Viiteavain estää projektin luomisen käyttäjälle, jota ei ole.
    assert.throws(() =>
      db.prepare("INSERT INTO projects(user_id, title) VALUES (?, ?)").run(999999, "Orpo projekti")
    );
    // Tietokanta tarkistaa nimen pituuden myös API:n ulkopuolisessa kirjoituksessa.
    assert.throws(() =>
      db.prepare("INSERT INTO projects(user_id, title) VALUES (?, ?)").run(ownerId, "")
    );
    // Suljemme ensimmäisen yhteyden simuloidaksemme palvelimen pysäyttämistä.
    db.close();
    // Uusi yhteys samaan tiedostoon simuloisi seuraavaa käynnistystä.
    db = openDatabase(path);
    // Aiemmin tallennettu projekti on edelleen olemassa.
    assert.equal(db.prepare("SELECT title FROM projects").get()?.title, "Säilyvä projekti");
    // Migraatiokirjanpidossa on yhä vain yksi suoritettu muutos.
    assert.equal(db.prepare("SELECT COUNT(*) AS total FROM schema_migrations").get()?.total, 1);
    // Myös uudessa yhteydessä viiteavainten tarkistus on käytössä.
    assert.throws(() =>
      db.prepare("INSERT INTO tasks(project_id, title) VALUES (?, ?)").run(999999, "Orpo tehtävä")
    );
  } finally {
    // Suljemme SQLite-tiedoston ennen hakemiston poistamista.
    db.close();
    // recursive poistaa vain yllä tämän testin luoman väliaikaisen hakemiston sisältöineen.
    Deno.removeSync(directory, { recursive: true });
  }
});

// HTTPS-evästeen asetusta testataan erikseen ilman oikean TLS-palvelimen käynnistämistä.
Deno.test("HTTPS-origin lisää Secure-määrityksen istuntoevästeeseen", async () => {
  // Kanta on vain tässä testissä tarvittava muistitietokanta.
  const db = openDatabase(":memory:");
  // HTTPS-origin kertoo sovellukselle julkisen palvelun olevan salattu.
  const origin = "https://kurssi.example";
  // Käsittelijä toimii Request-olioilla riippumatta siitä, onko testillä verkkoporttia.
  const app = createApp(db, { origin });
  // Lopussa muistitietokanta suljetaan.
  try {
    // Rekisteröintipyyntö käyttää täsmälleen tähän sovellukseen asetettua originia.
    const response = await app(
      new Request(`${origin}/api/auth/register`, {
        method: "POST",
        headers: { Origin: origin, "Content-Type": "application/json" },
        body: JSON.stringify({ email: "secure@example.test", password: PASSWORD }),
      }),
    );
    // Rekisteröinti onnistuu myös HTTPS-asetuksella.
    assert.equal(response.status, 201);
    // Secure estää selainta lähettämästä istuntotunnistetta salaamattomaan HTTP-yhteyteen.
    assert.match(response.headers.get("set-cookie") ?? "", /; Secure$/);
    // HSTS täydentää HTTPS-palvelun selaimelle antamaa ohjetta.
    assert.equal(response.headers.get("strict-transport-security"), "max-age=31536000");
  } finally {
    // Siivoamme tämän testin kannan.
    db.close();
  }
});
````

#### `esimerkit/04-valmis/seed/admin.ts`

````ts
// Paikallinen ylläpitokomento käyttää samaa tietokantaa ja migraatiota kuin palvelin.
import { openDatabase } from "../db.ts";
// Sama sähköpostin normalisointi estää erilaisten kirjainkokojen aiheuttaman epäselvyyden.
import { requireEmail } from "../http.ts";

// Deno.args sisältää skriptin jälkeen annetut komentoriviargumentit.
if (Deno.args.length !== 1) {
  // Tämä ohje ei sisällä salasanaa; salasanoja ei anneta komentoriviargumentteina.
  console.error(
    "Käyttö: deno task admin opiskelija@example.test. Rekisteröi tili ensin selaimessa.",
  );
  // Exit-koodi 1 kertoo, ettei komento onnistunut.
  Deno.exit(1);
}
// Tarkistamme osoitteen ennen tiedostojen avaamista.
const email = requireEmail(Deno.args[0]);
// Hakemisto luodaan tarvittaessa, mutta olemassa olevaa dataa ei poisteta.
await Deno.mkdir("./data", { recursive: true });
// Tämän tiedoston voi ajaa vain henkilö, jolla on paikallinen pääsy tietokantatiedostoon.
const db = openDatabase("./data/tehtavataulu.sqlite");
// finally varmistaa, että tietokantayhteys suljetaan myös virhetilanteessa.
try {
  // Rooli vaihdetaan nimenomaan paikallisessa CLI:ssä; julkinen API ei tarjoa tätä operaatiota.
  const result = db.prepare("UPDATE users SET role = 'admin' WHERE email = ?").run(email);
  // Jos käyttäjää ei löytynyt, päivitys ei osunut yhteenkään riviin.
  if (Number(result.changes) === 0) {
    // Rekisteröinti pitää tehdä ensin, jotta salasanan käsittely kulkee saman turvallisen polun kautta.
    console.error("Tiliä ei löytynyt. Rekisteröi tili selaimessa ja suorita komento uudelleen.");
    // exitCode asettaa epäonnistumiskoodin suorittamatta välitöntä poistumista ennen finally-lohkoa.
    Deno.exitCode = 1;
  } else {
    // Kerromme onnistumisesta paljastamatta kirjautumissalaisuutta.
    console.log("Ylläpitäjän rooli asetettiin. Päivitä sovelluksen sivu nähdäksesi tilastot.");
  }
} finally {
  // Suljemme yhteyden ennen komennon päättymistä.
  db.close();
}
````

### 12.9 Dockerin pakollinen PostgreSQL-peruslabra

#### `docker-postgres/compose.yaml`

````yaml
# Sama projektinimi tekee harjoituksen kontit ja volumen helposti tunnistettaviksi.
name: tehtavataulu-pg-labra

# Services-osassa luetellaan tällä Compose-tiedostolla käynnistettävät palvelut.
services:
  # db on tietokantapalvelun nimi; toinen saman verkon kontti käyttää sitä osoitteena.
  db:
    # Käytämme PostgreSQL:n pääversiota 17, jonka datakansio on alla kuvattu polku.
    image: postgres:17
    # Environment välittää asetukset käynnistyvälle kontille.
    environment:
      # Tämä tietokanta luodaan, kun datavolume on ensimmäisellä käynnistyksellä tyhjä.
      POSTGRES_DB: kurssilabra
      # Tämä on labran alustava ylläpitotunnus, ei verkkosovelluksen käyttötunnus.
      POSTGRES_USER: lab_owner
      # Compose lukee arvon .env-tiedostosta; tyhjä tai puuttuva arvo estää käynnistyksen.
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:?Aseta POSTGRES_PASSWORD tiedostoon .env}
    # Ports avaa yhteyden oman koneen osoitteesta kontin tietokantaporttiin.
    ports:
      # Vain oma kone: isännän osoite, isännän portti ja kontin portti tässä järjestyksessä.
      - "127.0.0.1:5432:5432"
    # Volumes liittää pysyvän tallennustilan ja tarvittavat harjoitustiedostot konttiin.
    volumes:
      # Nimetty volume säilyttää PostgreSQL 17:n datan myös kontin poistamisen jälkeen.
      - pgdata:/var/lib/postgresql/data
      # PostgreSQL suorittaa alustustiedoston vain, kun sen datakansio on tyhjä; ro on vain luku.
      - ./sql/01-schema.sql:/docker-entrypoint-initdb.d/01-schema.sql:ro
      # Näitä SQL-tiedostoja suoritetaan itse labran aikana; niitä saa vain lukea kontista.
      - ./sql:/lab-sql:ro
    # Healthcheck on automaattisesti toistuva tarkistus palvelun valmiudesta.
    healthcheck:
      # TCP-osoite odottaa varsinaista palvelinta, ei alustuksen väliaikaista paikallista yhteyttä.
      test: ["CMD", "pg_isready", "-h", "127.0.0.1", "-U", "lab_owner", "-d", "kurssilabra"]
      # Tarkistus aloitetaan viiden sekunnin välein.
      interval: 5s
      # Yksi tarkistus saa kestää enintään viisi sekuntia.
      timeout: 5s
      # Kymmenen peräkkäistä epäonnistumista johtaa epäterveeseen tilaan.
      retries: 10
      # Alustukselle annetaan aluksi kymmenen sekunnin käynnistymisaika.
      start_period: 10s

# Tässä määritellään projektin hallinnoimat nimetyt volumet.
volumes:
  # Compose luo volumen, jonka nimessä on projektin nimi ja tämä pgdata-osa.
  pgdata:
````

#### `docker-postgres/.env.example`

````text
# Kopioi tiedosto nimelle .env ja kirjoita yhtäsuuruusmerkin jälkeen oma harjoitussalasana.
# Käytä vain paikalliseen labraan tarkoitettua salasanaa; älä palauta varsinaista .env-tiedostoa.
POSTGRES_PASSWORD=
````

#### `docker-postgres/.gitignore`

````text
# Varsinainen salasana pysyy omalla koneella; mallipohjan saa lisätä versionhallintaan.
.env
````

#### `docker-postgres/sql/01-schema.sql`

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

#### `docker-postgres/sql/02-write.sql`

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

#### `docker-postgres/sql/03-read.sql`

````sql
-- SELECT valitsee luettavat sarakkeet, jotta tulosteessa näkyvät tunniste, teksti ja luontihetki.
SELECT id, label, created_at
-- FROM kertoo, mistä taulusta rivit luetaan.
FROM lab_notes
-- ORDER BY näyttää rivit aina tunnisteen mukaisessa nousevassa järjestyksessä.
ORDER BY id;
````

### 12.10 L2-lähtöpohja: koko SQLite-sovellus konttiin

#### `esimerkit/04-valmis/Dockerfile`

````dockerfile
# Image on valmis pohja, jossa tämän materiaalin testattu Deno-versio on asennettuna.
FROM denoland/deno:2.9.7

# Rakennusvaiheessa valmistellaan kirjoitettava datakansio ylläpitäjän oikeuksin.
USER root

# WORKDIR valitsee kontin sisäisen hakemiston seuraaville komennoille.
WORKDIR /app

# Kopioi lähdekoodi konttiin deno-käyttäjän omistukseen; .dockerignore rajaa datan ja salaisuudet pois.
COPY --chown=deno:deno . .

# Luo tyhjä datakansio ja anna tavalliselle deno-käyttäjälle siihen kirjoitusoikeus.
RUN mkdir -p /app/data && chown deno:deno /app/data

# Välimuisti on väliaikainen; varsinainen SQLite-data tulee eri kansioon pysyvään volumeen.
ENV DENO_DIR=/tmp/deno-cache

# 0.0.0.0 saa ohjelman kuuntelemaan kontin verkkoliitäntöjä; Compose rajaa isännän julkaisun.
ENV APP_HOST=0.0.0.0

# Sovellus ja Compose käyttävät samaa kontin sisäistä porttia.
ENV APP_PORT=8000

# Selain avaa tämän alkuperän isäntäkoneella; tämä ei ole toisen kontin yhteysosoite.
ENV APP_ORIGIN=http://localhost:8000

# Varsinainen palvelin toimii tavallisena käyttäjänä, ei root-käyttäjänä.
USER deno

# EXPOSE kertoo kuunteluportin dokumentointia varten; se ei yksin julkaise porttia isännälle.
EXPOSE 8000

# Käynnistä selitetty start-task; sen Deno-oikeudet on rajattu deno.jsonc-tiedostossa.
CMD ["deno", "task", "start"]
````

#### `esimerkit/04-valmis/compose.sqlite.yaml`

````yaml
# Nimi erottaa tämän SQLite-sovelluksen erillisestä PostgreSQL-peruslabrasta.
name: tehtavataulu-sqlite

# Services sisältää käynnistettävät palvelut; tässä riittää yksi backend-kontti.
services:
  # web on tämän sovelluspalvelun nimi Compose-verkossa.
  web:
    # Rakenna image tämän hakemiston Dockerfilestä ja lähdekoodista.
    build: .
    # Environment välittää nimetyt asetukset kontin Deno-prosessille.
    environment:
      # Kuuntele kontin liitäntöjä, jotta Composen porttiohjaus pääsee ohjelmaan.
      APP_HOST: 0.0.0.0
      # Sama portti on sallittu deno.jsonc-tiedoston verkkoluvassa.
      APP_PORT: "8000"
      # Selaimen tarkka alkuperä säilyy samana kuin paikallisessa Deno-ajossa.
      APP_ORIGIN: http://localhost:8000
    # Ports julkaisee yhden kontin portin vain omalle koneelle.
    ports:
      # Vasemmalla on isännän osoite ja portti, oikealla kontin sisäinen portti.
      - "127.0.0.1:8000:8000"
    # Volumes säilyttää tietokannan myös kontin poistamisen jälkeen.
    volumes:
      # Liitä nimetty taltio siihen hakemistoon, jota main.ts käyttää tietokannalle.
      - sqlite-data:/app/data
    # Palvelimen lähdekoodit ovat ajossa vain luettavia; data-volume on silti kirjoitettava.
    read_only: true
    # Deno tarvitsee välimuistille väliaikaisen kirjoituspaikan; /tmp ei ole pysyvä tietokanta.
    tmpfs:
      # Varaa korkeintaan 64 mebitavua väliaikaisille tiedoille.
      - /tmp:size=64m
    # Pudota ylimääräiset Linuxin erityisoikeudet; tavallinen HTTP-palvelin ei tarvitse niitä.
    cap_drop:
      # ALL tarkoittaa kaikkien pudotettavissa olevien lisäoikeuksien poistamista.
      - ALL
    # Estä prosessia hankkimasta uusia korkeampia käyttöoikeuksia ajon aikana.
    security_opt:
      # Tämä asetus täydentää Dockerfilen tavallista deno-käyttäjää.
      - no-new-privileges:true

# Määrittele Compose-projektin hallinnoima pysyvä taltio.
volumes:
  # Taltio syntyy ensimmäisessä käynnistyksessä; tavallinen down ei poista sitä.
  sqlite-data:
````

#### `esimerkit/04-valmis/.dockerignore`

````text
# Oikeaa sovellusdataa tai väliaikaisia testikopioita ei pakata imageen.
data
# Tietokantatiedostot jätetään pois myös silloin, jos ne on luotu vahingossa väärään kansioon.
*.sqlite*
# Paikallista asetus- ja salaisuustiedostoa ei saa kopioida imageen.
.env
# Versionhallinnan sisäistä historiaa ei tarvita ajettavaan konttiin.
.git
# Editorin paikalliset asetukset eivät kuulu ajettavaan sovellukseen.
.vscode
````

### 12.11 Koko materiaalipaketin versionhallinnan rajaus

#### `.gitignore`

````text
# npm asentaa riippuvuudet uudelleen package-lock.json-tiedoston perusteella.
node_modules/
# VitePressin välimuisti ja tuotantotiedostot syntyvät käynnistys- ja build-komennoilla.
docs/.vitepress/cache/
docs/.vitepress/dist/
# Paikallisia salaisuuksia ei versionhallita; julkinen mallipohja saa kuulua projektiin.
.env
.env.*
!.env.example
# Kurssin harjoitustietokannat ja niiden apuosat eivät ole oppimateriaalin lähdekoodia.
*.sqlite
*.sqlite-*
*.db
*.db-*
**/data/
# Käyttöjärjestelmän paikalliset näkymäasetukset jätetään pois.
.DS_Store
Thumbs.db
````

