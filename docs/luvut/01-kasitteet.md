# 01 Verkkosovellus rautalangasta

**Tavoite:** osaat nimetä verkkosovelluksen osat ja selittää, miksi niitä tarvitaan. **Esitiedot:** ei ohjelmoinnin esitietoja. **Tarkistuspiste:** kuvailet omilla sanoillasi, mitä tapahtuu, kun käyttäjä lisää tehtävän.

## Aloitetaan arkisesta tilanteesta

Kuvittele tehtävävihko, jota käytät tietokoneella. Haluat kirjoittaa siihen tehtävän, sulkea selaimen ja löytää tehtävän huomenna uudelleen. Haluat myös, ettei toinen opiskelija näe omaa listaasi.

Tarvitsemme kolme vastuuta. Jonkin on näytettävä kenttä ja painike. Jonkin on päätettävä, onko lisäys sallittu ja onko teksti kelvollinen. Jonkin on säilytettävä hyväksytty tieto. Nämä vastuut ovat käyttöliittymä, palvelinpuolen ohjelma ja tietokanta.

**Frontend** on sovelluksen käyttäjälle näkyvä ja hänen kanssaan toimiva osa. Tässä se suoritetaan selaimessa. Se piirtää lomakkeen, ottaa vastaan kirjoituksesi, lähettää pyynnön ja näyttää vastauksen. Frontend ei saa päättää lopullisesti, mitä tietoja sinulla on oikeus käsitellä.

**Backend** on palvelinpuolen toiminta. Se vastaanottaa pyynnöt, tarkistaa tiedot ja oikeudet, käyttää tietokantaa ja muodostaa vastaukset. Backend voi toimia omalla kannettavallasi kehityksen aikana. Se ei tarkoita automaattisesti pilvipalvelua eikä tietokantaa.

**Tietokanta** on tietojen järjestetty säilytyspaikka ja sen käsittelyyn käytetty järjestelmä. Tässä tieto on tauluissa. Käyttäjän, projektin ja tehtävän tiedot erotetaan toisistaan ja yhdistetään tunnisteilla. Tietokanta säilyttää tietoja myös ohjelman sulkemisen jälkeen, kun käytämme tiedostoa tai pysyvää taltiota.

## Asiakas ja palvelin ovat rooleja

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

## Mitä yksi painallus tekee?

Käyttäjä kirjoittaa tehtävän nimen ja painaa Lisää-painiketta. Selain lukee lomakkeen arvon ja muodostaa HTTP-pyynnön. Backend tarkistaa kirjautumisen, projektin omistajan ja tekstin pituuden. Kun tarkistukset onnistuvat, backend tallentaa rivin tietokantaan. Se palauttaa vastauksen, jossa on uuden tehtävän tunniste. Selain näyttää uuden rivin ja kertoo tallennuksen onnistuneen.

Jos käyttöoikeus puuttuu, tietokantaan ei kirjoiteta mitään. Jos palvelin ei vastaa, käyttöliittymä näyttää virheen. **Painikkeen painaminen ei vielä todista, että tieto tallentui.** Siksi lataustila, onnistumisviesti ja virheilmoitus kuuluvat toimivaan käyttöliittymään.

Tietokanta ei ole avoin suoraan selaimelle. Tietokannan salasanaa ei laiteta HTML:ään tai selaimen JavaScriptiin. Selain saa vain ne tiedot ja toiminnot, jotka backendin rajapinta antaa sille.

## HTTP, pyyntö ja vastaus

**HTTP** on yhteisesti sovittu tapa lähettää verkkopyyntöjä ja vastauksia. **Request eli pyyntö** kertoo, mitä asiakas haluaa tehdä. **Response eli vastaus** kertoo, miten kävi ja mitä tietoa palautetaan. **HTTPS** suojaa HTTP-yhteyden TLS-salauksella. Suojaus koskee tiedon kulkemista yhteydessä; se ei itsessään tarkista käyttäjän oikeuksia. [Lähde: MDN, HTTP:n yleiskuva](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview).

Pyynnössä ovat esimerkiksi metodi, osoite, otsakkeet ja mahdollinen sisältö. **Metodi** on toiminnon laji: `GET` hakee, `POST` luo tai käynnistää toiminnon, `PATCH` muuttaa osaa tiedosta ja `DELETE` poistaa. **Header eli otsake** kertoo viestin ominaisuudesta, kuten sisältötyypistä. **Body eli viestin runko** sisältää lähetettävän datan, esimerkiksi uuden tehtävän nimen.

Vastauksessa on **statuskoodi**, esimerkiksi `200` onnistumisesta tai `404` puuttuvasta kohteesta. Virhekoodi ei ole vain ohjelmoijalle tarkoitettu numerointi: frontend käyttää sitä päättäessään, näytetäänkö tulos, kirjautumispyyntö vai korjausohje.

## Osoite purettuna osiin

Käytämme osoitetta `http://localhost:8000/api/projects`.

| Osa | Merkitys |
| --- | --- |
| `http` | Yhteyden käytäntö eli protokolla. Paikallisessa harjoituksessa käytetään HTTP:tä. |
| `localhost` | Tällä hetkellä käyttämäsi tietokone verkkoyhteyden näkökulmasta. |
| `8000` | Portti, jossa oma palvelinohjelmamme kuuntelee. |
| `/api/projects` | Polku, jonka avulla backend valitsee käsiteltävän toiminnon. |

**IP-osoite** tunnistaa verkkolaitteen tai verkkoliitännän. `127.0.0.1` on tämän koneen IPv4-silmukkaosoite. **DNS** yhdistää verkkotunnuksen IP-osoitteeseen. **Portti** erottaa samalla koneella kuuntelevia palveluita. Kaksi palvelinta ei yleensä voi kuunnella yhtä aikaa samaa osoite-portti-yhdistelmää.

**Origin eli alkuperä** muodostuu protokollasta, nimestä ja portista yhdessä. `http://localhost:8000` ja `http://localhost:3000` ovat eri alkuperiä. Myös `http://127.0.0.1:8000` ja `http://localhost:8000` ovat eri alkuperiä. Tässä kurssissa käytetään lopulliselle sovellukselle johdonmukaisesti osoitetta `http://localhost:8000`. Docker-luvussa huomataan, että kontin `localhost` tarkoittaa konttia itseään.

## Rajapinta ei ole sama asia kuin käyttöliittymä

**API eli ohjelmointirajapinta** on sovittu tapa, jolla ohjelma pyytää toiselta ohjelmalta tietoa tai toimintaa. Tällä kurssilla API kulkee HTTP:n yli. **Endpoint eli rajapinnan toiminto-osoite** tarkoittaa esimerkiksi yhdistelmää `GET /api/projects`. Sama polku eri metodilla voi tarkoittaa eri toimintoa.

**Reitti** on backendin sääntö, joka yhdistää metodin ja polun koodiin. **Resurssi** on rajapinnassa käsiteltävä asia, esimerkiksi projekti. **CRUD** tarkoittaa luontia, lukemista, päivittämistä ja poistamista: Create, Read, Update, Delete.

**JSON** on tekstimuoto tietojen vaihtamiseen. JavaScript-olio on muistissa oleva tietorakenne, JSON taas sitä muistuttava sovittu tekstiesitys. Verkon yli kulkee esitys. HTTP-vastauksen vastaanottaja jäsentää eli tulkitsee tekstin omaksi tietorakenteekseen. JSON ei sisällä kommentteja; materiaalin JSON-vastaukset ovat dataa, ja niiden kentät selitetään vieressä. Ohjelmakoodimme sen sijaan kommentoidaan.

## Missä tieto asuu?

| Paikka | Esimerkki | Säilyykö sulkemisen jälkeen? | Voiko siihen luottaa oikeuksien lähteenä? |
| --- | --- | --- | --- |
| Selaimen muuttuja | Näytöllä oleva tehtävätaulukko | Ei yleensä sivun uudelleenlatauksen yli. | Ei. Käyttäjä voi muuttaa sitä. |
| Selaimen localStorage | Sivustokohtaisesti selaimeen tallennettu teksti | Usein kyllä, kunnes tiedot poistetaan. | Ei. Se on asiakkaan hallinnassa. |
| Backendin muuttuja | Hetkellinen välitulos | Ei prosessin uudelleenkäynnistyksen yli. | Ei korvaa pysyvää tallennusta. |
| SQLite-tiedosto | `data/tehtavataulu.sqlite` | Kyllä, jos tiedosto säilyy. | Backend tarkistaa sen tiedot ja säännöt. |
| PostgreSQL:n taltio | Dockerin nimetty taltio | Kyllä, jos taltiota ei poisteta. | Backend käyttää sitä hallitusti. |

Tietokanta ei yksin tee sovelluksesta turvallista. Backend päättää, millä ehdoilla tietokannan rivejä saa hakea. Käyttäjä voi lähettää pyynnön myös muulla ohjelmalla kuin sovelluksen omalla käyttöliittymällä. Tämän vuoksi piilotettu painike tai lomakkeen `required`-asetus ei ole käyttöoikeustarkistus.

## Kirjautuminen ja oikeudet ovat kaksi eri kysymystä

**Autentikaatio eli autentikointi** selvittää, kuka pyynnön tekijä on. Tässä se tehdään käyttäjätunnuksella ja salasanalla sekä kirjautumisen jälkeen istunnolla. **Autorisointi eli valtuutus** ratkaisee, saako tunnistettu käyttäjä tehdä pyytämänsä toiminnon juuri tähän kohteeseen. Aino voi olla kirjautunut mutta silti vailla oikeutta Boriksen projektiin.

**Istunto eli sessio** yhdistää peräkkäiset pyynnöt samaan kirjautumiseen. **Cookie eli eväste** on pieni tieto, jonka selain säilyttää ja lähettää soveltuvissa pyynnöissä. Tässä eväste sisältää satunnaisen istuntotunnisteen. Käyttäjän salasanaa ei tallenneta evästeeseen.

## Ensimmäinen harjoitus ilman koodausta

Piirrä paperille tai kirjoita tekstinä käyttäjä, selain, backend ja tietokanta. Kuvaa seuraavat kolme tilannetta: uuden tehtävän onnistunut lisäys, lisäys ilman kirjautumista ja toisen käyttäjän tehtävän poistoyritys. Kirjoita jokaiseen tilanteeseen, missä kohdassa päätös syntyy.

**Odotettu tulos:** oikeuspäätös on backendissä; pysyvä tallennus on tietokannassa; käyttöliittymä kertoo päätöksen käyttäjälle. **Muuta yhtä asiaa:** korvaa selain puhelimen sovelluksella. Backendin samojen sääntöjen pitää edelleen päteä.

**Tarkista ymmärrys:** Voiko selain toimia backendin asiakkaana, vaikka molemmat ovat samalla koneella? Kyllä. Voiko sisään kirjautunut käyttäjä saada käyttöoikeusvirheen? Kyllä. Onko Docker sama asia kuin Deno? Ei: Docker suorittaa kontteja ja Deno ohjelmakoodia kontin sisällä tai suoraan koneella.
