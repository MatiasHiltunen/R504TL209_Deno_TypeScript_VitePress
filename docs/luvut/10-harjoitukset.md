# 10 Harjoitukset, suorituspolut ja arviointi

## 10.1 Etenet mallin mukana ja siirryt omaan ratkaisuun

Harjoituksissa on kolme vaihetta: **toista**, **muuta** ja **perustele itsenäisesti**. Alussa saat kopioida kommentoidun mallin. Aja pieni osa kerrallaan ja vertaa tulosta ohjeeseen. Muuta sen jälkeen yhtä asiaa. Lopussa toteutat oman designmuutoksen ja osoitat myös, mitä sovellus kieltäytyy tekemästä.

P1–P9 ovat kaikki pakollisia. L1–L5 ovat vaativampia lisätehtäviä. Lisätehtävä ei korvaa puuttuvaa tietoturvaa, tietomallia, tietokantaa, autentikaatiota, autorisointia, frontendia tai Docker-osaamista. Valmiin sovelluksen käynnistäminen aloittaa työn; oma muutos, testinäyttö ja selitykset osoittavat oppimisen.

**Hyväksyntätesti** on ennalta kerrottu koe, jolla tarkistetaan toiminto. **Kielteinen testi** eli negatiivinen testi yrittää toimintoa, jonka pitää epäonnistua. HTTP-testissä palautetaan pyynnön menetelmä ja reitti, tarvittavat testiarvot, vastauskoodi, olennainen vastaus sekä tieto siitä, muuttuiko tietokanta. Poista salasanat ja istuntotunnukset palautettavista tulosteista.

Palautus voi olla saavutettava tekstiraportti, jota täydentävät kuvakaappaukset tai lyhyt tekstitetty video. Pelkkää videota tai pelkkiä kuvia ei edellytetä. Koodin ja ohjeiden pitää olla tekstinä luettavissa. Kirjaa jokaiseen tehtävään käyttämäsi tiedostot ja todelliset testitulokset; jos koe epäonnistui, kerro korjaus ja uusinnan tulos.

## P1. Selitä yhden pyynnön matka — toista ja nimeä

**Tavoite:** erotat selaimen, palvelimen ja tietokannan tehtävät. Enimmäispisteet 5.

**Tee:** käynnistä ensimmäinen HTTP-esimerkki ja avaa se selaimessa. Selitä omin sanoin frontend, backend, client, server, HTTP, URL, portti, API, JSON ja tietokanta. Kuvaa, mitä tapahtuu, kun käyttäjä painaa ”Lisää tehtävä”. Käytä esimerkkinä omaa ajettua sovellusta.

**Palauta:** noin yhden sivun sanasto ja pyynnön eteneminen numeroituina vaiheina. Lisää yhden todellisen pyynnön menetelmä, osoite ja vastauskoodi.

**Hyväksyntätestit:** pystyt nimeämään, missä HTML näytetään, missä käyttöoikeus tarkistetaan ja missä tieto säilytetään. Osaat erottaa server-ohjelman sitä ajavasta tietokoneesta. Selvität myös, miksi TypeScript-tyyppi ei yksin tarkista internetistä tulevan JSONin sisältöä.

**Arvioinnissa:** täsmällinen mutta omalla kielellä annettu selitys on tärkeämpi kuin englanninkielisten määritelmien muistaminen.

## P2. Tee käytettävä frontend — toista ja muuta

**Tavoite:** rakennat toimivan ja saavutettavan selaimen käyttöliittymän. Enimmäispisteet 10.

**Tee:** toteuta kolme lähtödesignin näkymää. Käytä HTML:ää rakenteeseen, CSS:ää ulkoasuun ja JavaScriptiä tapahtumiin sekä HTTP-pyyntöihin. Voit harjoitella ensin esimerkkidatalla; lopullisessa palautuksessa näkymät käyttävät oikeaa backendia. Muuta mallista vähintään ohjetekstiä ja yhtä ulkoasun ominaisuutta ja selitä muutokset.

**Palauta:** frontendin tiedostot, lyhyt selitys kolmesta tekniikasta sekä saavutettavuustarkistuksen tulokset.

**Hyväksyntätestit:** kirjautuminen, projektin luominen sekä tehtävän lisääminen, nimeäminen, valmis-tilan vaihtaminen ja poistaminen toimivat selaimessa. Lomakekentillä on näkyvät, ohjelmallisesti yhdistetyt nimet. Toiminnot onnistuvat näppäimistöllä ja kohdistus näkyy. Virheistä sekä tyhjästä listasta kerrotaan tekstinä. 200 prosentin suurennus säilyttää olennaisen sisällön ja toiminnot. Käyttäjän kirjoittama teksti näytetään tekstinä.

**Arvioinnissa:** arvioidaan toimintaa ja ymmärrettävyyttä. Frontend-kehys ei itsessään tuo lisäpisteitä. Lomakekenttien nimeämisen tausta: [W3C WAI](https://www.w3.org/WAI/tutorials/forms/labels/). Suurennuksen tausta: [WCAG 2.2, tekstin suurentaminen](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html).

## P3. Vastaa selaimen pyyntöihin — toista ja kokeile

**Tavoite:** ymmärrät HTTP-rajapinnan toiminnan. Enimmäispisteet 10.

**Tee:** rakenna palvelin ja reitit mallin mukana. **Reitti** tarkoittaa tässä HTTP-menetelmän ja osoitepolun yhdistelmää. Kirjoita taulukko käytettävistä reiteistä, vastaanotettavasta JSONista ja vastauksista. Lähetä sama pyyntö sekä selaimesta että HTTP-testityökalulla.

**Palauta:** reittitaulukko, ajettava backend ja vähintään neljä pyyntö–vastausnäyttöä: onnistuva luku, onnistuva luonti, virheellinen syöte ja tuntematon reitti.

**Hyväksyntätestit:** onnistuva toiminto palauttaa tarkoitukseen sopivan 2xx-koodin; virheellinen JSON tai väärä kentän tyyppi hallitun 4xx-vastauksen; puuttuva reitti 404-vastauksen. Virheellinen pyyntö ei kaada palvelinta. Rajapinnan virhe ei paljasta salaisuuksia tai sisäistä virhepinoa. Lopullisessa työssä suojatut reitit käyttävät P7:n ja P8:n tarkistuksia.

**Arvioinnissa:** osaat yhdistää pyynnön palvelimen reittiin ja siitä lähetettyyn vastaukseen. Testityökalun nimi ei vaikuta pisteisiin.

## P4. Johda tietomalli designistä — sovella

**Tavoite:** mallinnat datan todellisesta käyttöliittymätarpeesta. Enimmäispisteet 15.

**Tee:** aloita luvun 5 tekstidesignistä. Tee oma jäljitettävyystaulukko ennen mallivastauksen tarkastamista. Kuvaa entiteetit, kentät, tietotyypit, pääavaimet, viiteavaimet, kardinaliteetit ja rajoitteet. Lisää pakollinen muutoskortti M1: tehtävän vapaaehtoinen määräpäivä, jota voi muuttaa ja tyhjentää.

**Palauta:** alkuperäinen design tai sen tekstiviite, oma malli, kenttäkohtainen jäljitettävyys ja M1:n päivitetty näkymäkuvaus. Kaavio on sallittu, mutta suhteet on kerrottava myös tekstinä. Merkitse vertailussa tekemäsi korjaukset.

**Hyväksyntätestit:** jokaiselle tallennetulle kentälle löytyy perusteltu tarve. Tehtävän projektin ja omistajan selvittäminen onnistuu mallista. Puuttuva määräpäivä erotetaan virheellisestä. Samannimiset projektit eri käyttäjillä toimivat. Poistojen vaikutus on päätetty. Salasana ei esiinny mallissa selväkielisenä tallennettavana kenttänä.

**Arvioinnissa:** malli palvelee designiä ja oikeussääntöjä. Kaavion koristeellisuus ei vaikuta pisteisiin. M1:n perusteltu itsenäinen ratkaisu nostaa osaamisen mallin toistamista pidemmälle.

## P5. Tallenna pysyvästi ja toteuta M1 — sovella koko ketjuun

**Tavoite:** käytät oikeaa tietokantaa ja viet designmuutoksen käyttöliittymästä tallennukseen asti. Enimmäispisteet 15.

**Tee:** valitse SQLite tai PostgreSQL Dockerissa. Toteuta projektien luominen ja lukeminen sekä tehtävien CRUD: luominen, lukeminen, muuttaminen ja poistaminen. Lisää M1:n määräpäivä skeemaan, backendin tarkistuksiin, rajapintaan ja frontendiin. Tee skeemamuutos migraationa, joka säilyttää olemassa olevat käyttäjät, projektit ja tehtävät.

**Palauta:** skeema, migraatio, muutetut tiedostot, käynnistysohje sekä ennen–jälkeen-näyttö datasta. Osoita koodista vähintään yksi parametrisoitu luku ja yksi parametrisoitu kirjoitus. Parametrisoidussa kyselyssä käyttäjän arvo annetaan erillään SQL-komennon tekstistä.

**Hyväksyntätestit:** luotu ja muutettu tehtävä säilyy backendin uudelleenkäynnistyksen jälkeen. Poistettu tehtävä ei palaa. Viiteavaimet estävät viittauksen puuttuvaan projektiin. Migraatio säilyttää vanhan datan. Määräpäivän voi asettaa arvoon `2030-12-31`, muuttaa ja tyhjentää. Päivä `2030-02-30` hylätään palvelimella. Sama tieto näkyy uuden sivulatauksen jälkeen. Muutos ei anna oikeutta toisen käyttäjän tehtävään.

**Arvioinnissa:** tiedon kulku ja säilyminen ratkaisevat. Pelkkä muistissa oleva taulukko, `localStorage` tai tietokannan kuva ei täytä vaatimusta. ORM eli oliomallin ja tietokannan välinen kirjasto on sallittu omalla tekniikkapolulla, mutta opiskelija selittää sen muodostaman mallin ja turvallisen kyselyn.

## P6. Käynnistä kontti ja säilytä data — toista ja selitä

**Tavoite:** osaat Dockerin peruskäsitteet ja palvelun elinkaaren. Enimmäispisteet 5.

**Tee:** suorita luvun 8 PostgreSQL-labra. Jos oma sovelluksesi käyttää jo PostgreSQLiä Dockerissa, voit osoittaa samat kokeet sen kehitystietokannalla. SQLite ja vaihtoehtoinen backend-kieli eivät vapauta Docker-harjoituksesta.

**Palauta:** kommentoitu Compose-tiedosto ilman salasanaa, `up`-, `ps`-, `logs`- ja `exec`-komentojen olennaiset tulokset sekä näyttö datasta ennen `down`–`up`-kierrosta ja sen jälkeen. Selitä myös imagen, kontin, Dockerfilen, portin, volumen, verkon ja ympäristömuuttujan tehtävä.

**Hyväksyntätestit:** palvelu käynnistyy, lokit löytyvät, SQL-komento suoritetaan kontissa ja sama data löytyy kontin uudelleenluonnin jälkeen. Portti on rajattu paikalliseen kehityskäyttöön. Todellinen `.env` ei ole palautuksessa. Osaat kertoa eron isännän `localhost`-osoitteen ja toisen kontin palvelunimen välillä sekä sen, miksi `down -v` olisi tuhoava toimenpide.

**Arvioinnissa:** käytännön näyttö ja oma selitys tarvitaan yhdessä. Oman backendin kontittaminen on lisätehtävä; tämän peruslabran osaaminen on pakollista.

## P7. Tunnista käyttäjä — kokoa ohjeista

**Tavoite:** toteutat autentikaation eli käyttäjän tunnistamisen. Enimmäispisteet 10.

**Tee:** toteuta rekisteröityminen, kirjautuminen, kirjautuneen käyttäjän tunnistaminen ja uloskirjautuminen. Käytä turvallista salasanamenetelmää tai kehyksen siihen tarkoitettua kirjastoa. Palvelin tarkistaa istunnon tai vastaavan tunnisteen jokaisessa suojatussa pyynnössä. Kerro, miten istunto vanhenee ja miten uloskirjautuminen mitätöi sen.

**Palauta:** toimivat käyttäjänäkymät, salasanan tallennusmenetelmän perustelu ja testit. Älä palauta testissä käytettyä istuntosalaisuutta. Näytä tietokannan rakenne ja salasanan tarkistamiseen käytettävä koodi tai kirjastokutsu.

**Hyväksyntätestit:** uusi tunnus voidaan luoda, oikea salasana toimii ja väärä ei. Sama normalisoitu sähköposti ei luo toista tunnusta. Tietokannassa ei ole selväkielistä salasanaa. Kirjautumaton pyyntö suojattuun resurssiin palauttaa 401. Uloskirjautumisen jälkeen vanhan istunnon uudelleenkäyttö epäonnistuu. Vanhentunut istunto hylätään; vanhenemisen voi osoittaa hallitulla testikellolla tai eristetyllä testidatalla.

**Arvioinnissa:** osaat selittää, mitä selain säilyttää ja mitä palvelin tarkistaa. Pelkkä käyttöliittymän ”kirjautunut”-muuttuja ei täytä vaatimusta. Valmiin turvallisuuskirjaston käyttäminen on hyväksytty toteutustapa.

## P8. Rajaa käyttäjän oikeudet — testaa itsenäisesti

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

## P9. Perustele ja koettele tietoturvaa — yhdistä ja arvioi

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

## 10.2 Vaihtoehtoinen suorituspolku: valitse oma backend-tekniikka

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

## 10.3 Vaativammat lisätehtävät L1–L5

Lisätehtävissä toimiva ja turvallinen ydin pidetään mukana. Tee ensin P1–P9. Valitse lisätehtäviä oman kiinnostuksen mukaan.

| Tehtävä | Tavoite ja tehtävä | Palautus ja hyväksyntä |
|---|---|---|
| L1: Automaattinen regressiosuoja | Muuta käsin tehdyt olennaiset testit automaattisiksi. Regressio tarkoittaa aiemmin toimineen asian rikkoutumista muutoksessa. | Toistettava testikomento ja tulokset. Kaksi käyttäjää, vanhentunut istunto ja M1:n rajatapaukset katetaan eristetyllä testidatalla. |
| L2: Koko sovellus konttiin | Tee backendille Dockerfile ja Compose-käynnistys. SQLite-polulla liitä myös sovelluksen datakansio pysyvään volumeen. | Käynnistysohje, rajatut oikeudet, salaisuuksista vapaa image ja koko sovelluksen datan säilymiskoe. Pohja löytyy kansiosta `esimerkit/04-valmis`. |
| L3: Varmuuskopio ja palautus | Tee tietokannalle toistettava varmuuskopiointi ja palautus erilliseen testiympäristöön. | Palauta kopio ja osoita rivien sekä suhteiden säilyminen. Kerro, mitä tapahtuu kirjoituksille kopioinnin aikana. Harjoituksen alkuperäinen data säilytetään. |
| L4: Samanaikaiset muutokset | Estä kahden käyttäjäikkunan vanhojen tietojen aiheuttama tahaton ylikirjoitus esimerkiksi versionumerolla. | Kahden rinnakkaisen muutoksen testi: toinen hyväksytään ja ristiriita kerrotaan toiselle. Käyttöliittymästä voi palautua tilanteesta tietoja menettämättä. |
| L5: Jaetut projektit | Lisää projektin jäsenyys ja eritasoiset oikeudet, esimerkiksi lukija ja muokkaaja. Laajenna malli ja uhkamalli. | Migraatio, muuttunut design, jäsenyysmalli ja kattava oikeusmatriisi. Oikeuden poistaminen estää seuraavan pyynnön. Arvioi ratkaisun toimintaa käyttäjämäärän kasvaessa. |

Lisätehtävät eivät ole automaattisia lisäpisteitä, eikä suurinta arvosanaa sidota niiden tekemiseen. Niistä saatava näyttö voi vahvistaa samoja arvioitavia taitoja enintään arviointimatriisin kokonaispistemäärään asti.

## 10.4 Ehdotus arviointimatriisiksi: 0–100 pistettä

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

## 10.5 Ehdotus työmäärän jakamiseksi

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
