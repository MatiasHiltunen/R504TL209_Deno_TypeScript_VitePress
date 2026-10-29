# 07 Rakennetaan koko sovellus turvallisesti

**Tavoite:** yhdistät frontendin, backendin ja tietokannan toimivaksi Tehtävätauluksi. Opit kirjautumisen ja käyttöoikeuksien eron sekä näytät, että väärä toiminto todella estetään. **Esitiedot:** luvut 01–06. **Tarkistuspiste:** `esimerkit/04-valmis` kokonaisuudessaan.

Tämä on materiaalin pisin ohjattu työ. Jaa se useaan työskentelykertaan. Tarkoitus ei ole kirjoittaa koko kirjautumisjärjestelmää yhdellä istumalla tai muistaa kryptografian yksityiskohtia ulkoa. Kirjoitat selitetyt tiedostot vaiheittain, suoritat tarkistukset ja seuraat yhtä pyyntöä koodin läpi.

## Ensin kaksi erillistä päätöstä

**Autentikaatio:** kuka lähettää pyynnön? Syötetty salasana tarkistetaan. Onnistumisen jälkeen palvelin antaa satunnaisen istuntotunnisteen. Seuraavissa pyynnöissä tunniste yhdistetään palvelimella käyttäjään.

**Autorisointi:** saako tämä käyttäjä suorittaa tämän toiminnon tähän kohteeseen? Kirjautumisen jälkeenkin projektin omistaja tarkistetaan. Tavallisella käyttäjällä ei ole ylläpitoroolia. Tällä kurssilla ylläpitäjä saa lukea yhteisiä lukumääriä, mutta ei automaattisesti kaikkien projektien sisältöjä.

**Omistajuus** on yhteys tiedon ja käyttäjän välillä. **Rooli** on nimetty oikeusryhmä, kuten `user` tai `admin`. Omistajuus ratkaisee pääsyn omiin projekteihin. Rooli ratkaisee pääsyn erilliseen tilastotoimintoon. [OWASP: autorisoinnin periaatteet](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html).

## Salasana ei kuulu tietokantaan sellaisenaan

**Tiiviste eli hash** on laskettu esitys tiedosta. Salasanan tallentamiseen tarvitaan siihen tarkoitettu hidas menetelmä. **Suola eli salt** on jokaista tallennusta varten arvottu lisäarvo, joka erottaa saman salasanan eri tallenteet. Suola ei ole salaisuus. **Työmäärä** tarkoittaa, kuinka paljon laskentaa yksi salasanan tarkistaminen vaatii.

Tässä riippuvuudettomassa opetusesimerkissä käytetään ajoympäristön Web Crypto -rajapinnan **PBKDF2-HMAC-SHA-256**-toimintoa, 600 000 kierrosta ja satunnaista 16 tavun suolaa. Salausalgoritmia ei kirjoiteta itse. Tuotantoratkaisun menetelmä valitaan sen uhkamallin ja ajantasaisten ohjeiden perusteella; OWASP suosittelee uusille ratkaisuille ensisijaisesti Argon2id:tä. PBKDF2-esimerkki ei tarkoita, että se olisi kaikkien uusien palvelujen ensisijainen valinta tai että käyttämämme ympäristö olisi FIPS-sertifioitu. [OWASP: salasanojen tallennus](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html).

Kirjautumisessa lasketaan käyttäjän syöttämästä salasanasta uusi tulos samalla tallennetulla suolalla ja työmäärällä. Sitä verrataan tallenteeseen valmiilla `timingSafeEqual`-toiminnolla. **Vakioaikaisen vertailun** tarkoitus on välttää vertailun katkeaminen ensimmäiseen eroavaan tavuun. Se ei tee koko HTTP-pyynnöstä täsmälleen samanpituista.

Sama lyhyt SHA-256-tiivistys ilman tarkoituksenmukaista hidasta salasanamenetelmää ei riitä ihmisen salasanalle. Sen sijaan vahvasti satunnaiselle 32 tavun istuntotunnisteelle käytetään SHA-256-tiivistettä: satunnaista tunnistetta ei arvata samalla tavalla kuin ihmisen valitsemaa sanaa. Tietokannassa on istunnosta vain tiiviste ja voimassaoloaika, selaimessa raaka tunniste.

## Eväste ja istunto käytännössä

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

## Mikä on CSRF ja miksi Origin tarkistetaan?

**CSRF** tarkoittaa yritystä saada käyttäjän selain lähettämään muutos omilla evästeillään toiselta sivustolta. Tässä API hyväksyy muutospyynnön vain, kun `Origin` on täsmälleen asetettu `http://localhost:8000` ja sisältötyyppi on JSON. Puuttuva alkuperä ja arvo `null` hylätään myös. Tämä koskee rekisteröintiä, kirjautumista, uloskirjautumista ja kaikkia tietojen muutoksia.

Selaimen oma JavaScript ei voi vapaasti väärentää `Origin`-otsaketta. Erillinen HTTP-työkalu voi asettaa sen, joten Origin ei todista käyttäjän henkilöllisyyttä: autentikaatio ja autorisointi tarvitaan lisäksi. Tämä on tarkoituksella rajattu samaa alkuperää käyttävän JSON-API:n suojausmalli. Jos arkkitehtuuriin lisätään tavallisia HTML-lomakekirjoituksia, useita alkuperiä tai muita tunnistetapoja, CSRF-ratkaisu arvioidaan uudelleen; esimerkiksi istuntoon sidottu CSRF-tunniste on toinen tavallinen ratkaisu. [OWASP: CSRF:n torjunta](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html).

## Tutoriaali T5A: tee projektille oma paikka

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

## Tutoriaali T5B: lisää syötteiden tarkistus ja sovellussäännöt

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

## Tutoriaali T5C: kytke osat yhteen

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

## Tutoriaali T5D: kokeile käyttäjän koko polku

1. Luo harjoitustili A, esimerkiksi `aino@example.test`. Valitse vain tähän paikalliseen harjoitukseen tarkoitettu vähintään 15 merkin salasana.
2. Tarkista, että kirjautuneen käyttäjän tieto näkyy. Rekisteröinti kirjautuu tässä esimerkissä automaattisesti sisään.
3. Luo projekti nimeltä `Backend-harjoitukset` ja avaa sen tehtävät.
4. Lisää tehtävä `Selitä frontend ja backend`. Muuta nimeä, merkitse tehtävä valmiiksi ja tarkista muuttunut tila.
5. Päivitä selain. Tiedon pitää edelleen löytyä. Luo vielä toinen tehtävä ja poista se.
6. Pysäytä backend Ctrl+C:llä ja käynnistä uudelleen. Säilytetyn tehtävän pitää löytyä edelleen.
7. Kirjaudu ulos. Omien projektien ei pidä enää näkyä, ja suojattu API ilman istuntoa antaa 401-vastauksen.

**Odotettu tulos:** luonti, muutos, luku ja poisto toimivat. **Jos 403 ilmestyy heti:** tarkista selaimen alkuperä. **Jos 415 ilmestyy:** tarkista JSON-sisältötyyppi. **Jos 429 ilmestyy:** yritysraja on ylittynyt, lue odotusohje. Älä korjaa näitä poistamalla turvatarkistuksia.

Yritysrajoitus sallii tässä paikallisessa esimerkissä enintään 5 kirjautumisyritystä samaa sähköpostia kohti ja 20 samaa IP-osoitetta kohti 15 minuutissa. Rekisteröintejä sallitaan 10 samasta IP-osoitteesta samassa ajassa. Onnistuneetkin yritykset lasketaan. Laskurit ovat yhden prosessin muistissa. Tuotannossa on arvioitava jaettu laskurivarasto, usean palvelimen toiminta, yhteisen IP-osoitteen käyttäjät ja palvelunestotilanteet.

## Tutoriaali T5E: toinen käyttäjä ja ylläpitäjä

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

## Turvasanasto sidottuna omaan koodiin

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

## Mitä tästä vielä puuttuu laajassa oikeassa palvelussa?

Esimerkki opettaa aidon kirjautumisen ja käyttöoikeudet paikallisessa oppimisympäristössä. Mukana ei ole sähköpostiosoitteen vahvistamista, salasanan palauttamista, monivaiheista tunnistamista, jaettua yritysrajoitusta tai tuotantoympäristön HTTPS-asennusta. Rekisteröinnin ristiriitavastaus voi antaa vihjeen tunnuksen olemassaolosta, vaikka kirjautumisvirhe on yleinen. Näitä rajoja arvioidaan P9:ssa.

Synkroninen SQLite ja yhden prosessin muistitilat ovat tarkoituksenmukainen aloitus. Kasvavan palvelun työmäärä, rinnakkaisuus, varmuuskopiot, seuranta ja tunnistuspalvelun valinta vaativat erilliset päätökset. Pakollinen harjoitus on tunnistaa oman ratkaisun raja ja perustella seuraava parannus. Kaikkea tuotantopalvelun infrastruktuuria ei tarvitse toteuttaa hyväksyttyyn perussuoritukseen.

**Valmis jatkamaan, kun:** oma sovellus toimii selaimessa, tunnet vähintään kahden käyttäjän eri tietojen rajat ja osaat osoittaa salasanan, istunnon, validoinnin ja omistajuuden tarkistukset koodista. Seuraavaksi samat havainnot muutetaan toistettavaksi testinäytöksi.
