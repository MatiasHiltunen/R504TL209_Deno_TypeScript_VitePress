# Materiaalipaketin tarkistusraportti

**Versio ja tarkistuspäivä:** 19.10.2026. **Opintojakso:** R504TL209 Full Stack -sovelluskehitys: Backend.

Tässä raportissa erotetaan toteutuneet ajot tiedostojen rakenteen tarkistuksista. Tarkistus kohdistuu toimitettuun mallisovellukseen ja materiaalin kyseiseen versioon. Se ei automaattisesti hyväksy opiskelijan myöhempää M1-muutosta tai omaa toteutusta.

## 1. Tarkistettu kokonaisuus

Materiaali sisältää 13 lukua (00–12), yhdeksän pakollista tehtävää P1–P9, viisi lisätehtäväryhmää L1–L5 ja 45 kommentoitua koodi- tai asetustiedostoa koodipankissa. Moodle-sisältöpaketissa on 13 osiota, 32 moduulia, yhdeksän arvioitavan tehtävän kuvausta ja 11 pienempää koodipankkisivua. Pisteytysehdotuksen enimmäispistemäärä on 100.

Lukujen 00–11 määrä on noin 24 700 välilyönneillä erotettua sanaa, kun myös niissä olevat koodiesimerkit lasketaan. Koodipankki tulee tämän lisäksi. Luvut on tarkoitettu pieniin opetuskertoihin ja myöhemmin käytettäväksi hakuteokseksi; koko aineistoa ei lueta yhdellä luennolla.

## 2. Deno- ja tietokanta-ajot

Ajot tehtiin Linuxissa Denolla **2.9.7**. Sen ilmoittama TypeScript-versio oli **6.0.3**. Esimerkit käyttävät Denon mukana tulevia rajapintoja; backendin suorittaminen ei tarvitse erillisen Node-asennuksen tai npm-pakettien asentamista.

| Kohde | Toteutunut tarkistus | Tulos |
| --- | --- | --- |
| `00-kieli/hei.ts` | `deno run --check hei.ts` | Tulostaa ohjeen mukaisen tervehdyksen ja päättyy. |
| `00-kieli/kieli.ts` | Suoritus tyyppitarkistuksineen | Muuttujat, oliot, silmukka, suodatus, ajonaikainen tarkistus ja async/await-esimerkki toimivat. |
| `01-palvelin/main.ts` | Todellinen paikallinen HTTP-ajo | Juuri ja `/api/health` palauttavat 200; puuttuva reitti 404. Palvelin suljettiin kokeen jälkeen. |
| `03-tietokanta/db_demo.ts` | Lisää, erillinen uusi prosessi ja luku, valmis-tilan muutos, uusi luku, poisto, uusi luku | SQLite säilyttää muutokset prosessien välillä; lopuksi koerivi on poistettu. |
| `04-valmis` | `deno task check` | Läpäisi: backend, integraatiotestit ja ylläpitäjäkomento. |
| `04-valmis` | `deno task lint` | Läpäisi lopullisella frontendillä ja 13 tarkistettavalla tiedostolla. |
| `04-valmis/integration_test.ts` | `deno task test` | **11 läpäisi, 0 epäonnistui.** |
| `oikeuskoe_test.ts` ja `csrfkoe_test.ts` | Kaksi erillistä testitutoriaalia | **2 läpäisi, 0 epäonnistui.** |
| `security_demo.ts` | Erillinen tyyppitarkistettu suoritus | Suola ja tiiviste eroavat saman salasanan eri laskentakerroilla; oikea salasana hyväksytään ja väärä hylätään. |
| Koko valmis sovellus | Todellinen `deno task start`, HTTP-pyynnöt ja ylläpitäjän CLI-komento | HTML/CSS/JS, rekisteröinti, CRUD, admin-esto, ylennys, rajattu admin-näkymä ja uloskirjautuminen toimivat. |

Yhteensä mukana toimitetut 13 nimettyä Deno-testiä ajettiin onnistuneesti. Niiden sisältö kattaa salasanan ja istunnon käsittelyn, 8 tunnin vanhenemisen, uloskirjautumisen mitätöinnin, omistajuus- ja roolirajat, syötteen ja sisältötyypin tarkistukset, rungon kokorajan, SQL-parametrit, tiedostojen tarjoilun rajauksen, turvaotsakkeet, yritysrajoituksen, tietojen pysyvyyden, migraation kertaluonteisuuden ja viiteavaimet.

Pieni CSRF-opetustesti käyttää **kelvollista istuntoa ja käyttäjän omaa tehtävää**, mutta väärää tai puuttuvaa Origin-otsaketta. Se tarkistaa myös, ettei tehtävän nimi tai tila muuttunut. Näin tulosta ei selitetä vahingossa puuttuvalla kirjautumisella tai vieraan resurssin omistajuusrajalla.

Testit käyttävät eristettyä koedataa. Toimituksessa ei ole testikäyttäjien tietokantaa, todellista `.env`-tiedostoa, salasanalokia tai istuntotunnisteiden tulosteita. Koodissa näkyvät harjoitusarvot ovat julkisia, itse keksittyjä testiarvoja.

## 3. Todelliset selainkokeet

Selain oli **Chromium 155.0.8059.84**. Käyttöliittymiä käytettiin paikallisesti oikeaa backendia vasten silloin, kun kokeessa tarvittiin palvelinta.

| Kohde | Kokeet | Tulos |
| --- | --- | --- |
| Frontendin viisi pientä kokeilua | HTML-rakenne, CSS:n latautuminen, painike Tab–Enterillä, lomakkeen virhe ja palautuminen, turvallinen tekstitulostus, listan uudelleenpiirto | Kaikki 5 kokonaisuutta läpäisivät. Lähdetiedostot vastaavat luvun 03 koodilohkoja. |
| Selaimen muistissa toimiva Tehtävätaulu | Lisääminen, lukeminen, muokkaus, tilan vaihto, poisto ja peruutus, näppäimistö, kohdistus ja tietojen katoaminen sivulatauksessa | Läpäisi. |
| Valmis Tehtävätaulu | Rekisteröinti, oikea ja väärä kirjautuminen, logout, projektien ja tehtävien kaikki CRUD-toiminnot sekä pysyvyys uuden sivulatauksen jälkeen | Läpäisi. |
| Odotus- ja virhetilat | Todellinen lataustila, kenttien disabled-tila, validointivirhe ja verkkovirhe sekä mahdollisuus yrittää uudelleen | Läpäisi. |
| Käyttöoikeudet ja roolit | A/B-istuntojen erottelu, luvattomien pyyntöjen estot, admin-estot ja rajattu admin-tilasto | Läpäisi. |
| XSS-koesyöte | Tehtävän nimi sisältää kuvaelementiltä näyttävää tekstiä; siitä ei saa syntyä elementtiä tai suoritettavaa koodia | Näkyi kirjaimellisena tekstinä; kuvaelementtiä ja JavaScript-hälytystä ei syntynyt. |
| Molempien Tehtävätaulujen näkymä | 320 CSS-pikseliä sekä erillinen juuritekstikoon kaksinkertaistus | Ei sivun vaakasuuntaista ylivuotoa; toiminnot käytettävissä. |
| Unicode-pituusrajat | Salasanan 14/15, projektin 100/120/121 ja tehtävän 200/201 emojin rajatapaukset | Kuusi kohdennettua tarkistusta läpäisi. Frontend ja backend käyttävät nimissä ja salasanoissa samaa koodipistelaskentaa. |

Näissä selainajoissa havaittiin **0 JavaScript-suoritusvirhettä**. Koneelliset tulosyhteenvedot ovat `tarkistukset/frontend.json`, `minikokeilut.json` ja `unicode.json`.

## 4. HTML-oppaan saavutettavuus ja rakenne

HTML-oppaassa on suomen kielimääritys, yksi pääotsikko, johdonmukainen otsikkohierarkia, luvun sisäinen navigointi ja näppäimistöllä käytettävä ohituslinkki. Koodia ei ole kuvina. Pakollisuus kerrotaan tekstinä. Laaja taulukko voi vierittyä omassa näppäimistöllä kohdistettavassa alueessaan, ja muu sivu rivittyy kapealle näytölle.

Todellinen selainkoe läpäisi työpöytänäkymän, 320 CSS-pikselin näkymän, koodipankin kapean näkymän, kaksinkertaisen juuritekstikoon, ohituslinkin ja luvun navigoinnin näppäimistökäytön. Kaikki sisäiset linkkikohteet löytyivät. Oppaan sekä Moodle-katkelmien yhteensä 33 HTML-tiedostosta tarkistettiin tunnisteiden yksilöllisyys, sisäiset linkit, ARIA-viitteet ja otsikkotasot.

Oppaan keskeisten tekstivärien lasketut kontrastisuhteet ovat päätekstissä 14,55:1, linkissä valkoista vasten 7,05:1, kansitekstissä 12,83:1 ja koodissa 13,16:1. Näkymistä tarkastettiin myös kuvat silmämääräisesti. Tulosyhteenveto on `tarkistukset/html-opas.json`.

**Rajaus:** ruudunlukijan puheilmoituksia ei kuunneltu tässä ympäristössä. Tekstin suurennuskoe toteutettiin juuritekstikoon kaksinkertaistamisena; se on erotettu erillisestä 320 CSS-pikselin reflow-kokeesta. Nämä tarkistukset eivät ole täydellinen WCAG-auditointi. Opettajan ja opiskelijan käytännön saavutettavuuskokeet on annettu luvussa 03. Mittausperiaatteiden tausta: [W3C, Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html), [W3C, tekstikontrasti](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) ja [W3C, lomakkeiden nimeäminen](https://www.w3.org/WAI/tutorials/forms/labels/).

## 5. Docker ja Moodle: mitä ei ole vielä ajettu

Molemmat Compose-tiedostot jäsentyvät YAMLina. Niistä tarkistettiin palvelut, localhostiin rajatut portit, nimetyt taltiot ja paikallisten SQL-tiedostojen polut. PostgreSQL 17:n datataltion sijainti sekä Denon Docker-kuvan käyttäjä- ja käynnistyskäytäntö tarkistettiin virallisista ohjeista ja kuvan lähteestä.

**Docker-moottoria ei ollut tässä ympäristössä. PostgreSQL-kontin käynnistystä, sen datan pysyvyyskierrosta tai vapaaehtoisen L2:n sovellusimagen rakentamista ei ole ajettu.** Opettajan käyttöönottotesti on suorittaa luvun 08 komennot sekä mahdollinen L2 omassa Docker-ympäristössään ennen opetusta. Peruslabra P6 säilyy opiskelijoille pakollisena. L2 on vapaaehtoinen.

Moodle-JSON on jäsennetty ja sen osiot, moduulit, tehtävät, tunnisteet sekä 100 pisteen summa tarkistettu. Se käyttää aiemman materiaalin sisältöpaketin rakennetta. **Tuontia varsinaiseen Moodleen tai aiempaan tuontityökaluun ei ole tehty eikä testattu.** Tiedosto ei ole Moodlen natiivi varmuuskopio. README kuvaa käytön samalla tuontiratkaisulla tai erillisten HTML-sisältöjen avulla. Opettaja vahvistaa ehdotetut arviointiasetukset ja kaikki yhdeksän ydinhyväksyntää.

## 6. Pedagoginen ristiintarkistus

Lähtökäsitteet, tutoriaalien tiedostopolut ja komentojen hakemistot on verrattu ajettavaan koodiin. Frontendin myöhemmin tehtävät backend-kokeet on merkitty erikseen. Pakolliset tehtävät, omalla tekniikalla annettavat näytöt ja vapaaehtoiset lisätehtävät on ristiintarkistettu. M1 vaatii itsenäisen design-, skeema-, migraatio-, API-, frontend- ja testimuutoksen; sen malliratkaisua ei ole toimitettu valmiina.

Versionhallintaohjeessa on nimenomainen vaihe `.gitignore`-tiedoston siirtämiseen oman repositorion juureen ennen tiedostojen valintaa. Aiemman osaamisen ja vaihtoehtoisen backendin poluilla samat ydintavoitteet säilyvät. Täydet pisteet ovat mahdollisia ilman vaikeita lisätehtäviä.
