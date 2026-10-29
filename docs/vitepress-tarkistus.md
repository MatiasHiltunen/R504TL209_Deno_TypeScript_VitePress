# VitePress-version tarkistukset

**Versio:** 20.10.2026. Tämä raportti koskee alkuperäisen kurssimateriaalin muuntamista Markdown- ja VitePress-muotoon.

## Rajaus

Tässä versiossa muuttuvat materiaalin tiedostomuoto, navigointi ja sivujen esitystapa. Kurssin `esimerkit`- ja `docker-postgres`-hakemistot säilyttävät alkuperäiset ohjelmat. Backendin aiemmat testiajot ja Dockerin tarkistuksen rajaus on kuvattu [alkuperäisen paketin raportissa](./tarkistus-2026-10-19.md).

## Käytetyt versiot

| Työkalu | Tarkistusympäristön versio |
| --- | --- |
| Node.js | 24.19.0 |
| npm | 11.9.0 |
| VitePress | 1.6.4, lukittu `package.json`- ja `package-lock.json`-tiedostoihin |
| Selain | Chrome for Testing 155.0.8059.84 |
| Selainkokeiden ohjaus | Playwright 1.62.1 |

Projektin Node-vaatimus on vähintään 22. Edellä mainittu 24.19.0 on toteutuneen tarkistuksen versio; kaikkia tuettuja Node-versioita ei ajettu erikseen.

## Sisällön ja koodin säilyminen

| Tarkistus | Tulos |
| --- | --- |
| Luvut 00–11 | Kaikkien 12 luvun opetussisältö säilyy. Muutokset ovat otsikkonumeroinnissa sekä VitePressin jakeluohjeissa. |
| Harjoitukset | P1–P9, L1–L5, M1, arviointiehdot ja vaihtoehtoisen tekniikkapolun yhteiset vaatimukset säilyvät. |
| Varsinaiset harjoitustiedostot | `esimerkit`- ja `docker-postgres`-hakemistojen kaikki 46 tiedostoa ovat tavuidenttisiä alkuperäisen kanssa. |
| Koodipankin tiedostoluettelo | Samat 45 yksilöllistä polkua samassa järjestyksessä kuin aiemmassa koodipankissa. |
| Koodisivut ja tekstilataukset | Kaikkien 45 sivun koodiaita ja `.txt`-lataus vastaavat lähdetiedostoa. |
| Yhden tiedoston Markdown-kooste | Luvut 00–12 sekä kaikkien 45 lähdetiedoston koko sisältö ovat mukana. |

Projektin juuren `.gitignore`-tiedostoon on lisätty VitePressin työ- ja tuloshakemistot. Tämä on koodipankin 45. tiedosto. Sen koodisivu ja lataus vastaavat tämän uuden projektin asetusta. Harjoitushakemistojen omia tiedostoja ei ole muutettu.

[Sisältövertailun yhteenveto ja tiedostojen SHA-256-tiivisteet](/tarkistukset/vitepress-sisalto.json) ovat mukana koneluettavassa muodossa. Tiiviste on tiedoston sisällöstä laskettu tunniste, jota voidaan käyttää tiedostojen muuttumattomuuden vertailuun.

## Asennus ja rakentaminen

Riippuvuudet asentuivat puhtaaseen erilliseen hakemistoon mukana tulevalla lukitustiedostolla ja `npm ci` -komennolla. Tarkistus käytti jo ladattujen npm-pakettien paikallista välimuistia. Ensimmäinen asennus opiskelijan koneelle tarvitsee yleensä internetyhteyden.

`npm run docs:build` valmistui onnistuneesti. Rakentaminen tuottaa **63 sisältösivua ja erillisen 404-sivun**. Sisältösivuista 45 on tiedostokohtaisia koodisivuja. Ladattavaa Markdown-koostetta ei rakenneta toiseksi samansisältöiseksi kurssisivuksi: `public`-hakemisto on rajattu sivulähteiden ulkopuolelle ja kopioidaan latauksina.

Sisäiset sivulinkit tarkistetaan rakennuksen yhteydessä. Asetusten ainoa nimetty poikkeus on `http://localhost:8000`, joka kuuluu kurssin erikseen käynnistettävään Deno-harjoitukseen.

Rakennus ilmoittaa paikallisen hakuindeksin noin 550 kilotavun JavaScript-osasta varoituksena. Rakennus onnistuu, ja hakutoiminto tarkistetaan selaimessa. Hakuindeksi sisältää myös kommentoidun koodipankin tekstiä.

## Selainkokeet

| Tarkistus | Havaittu tulos |
| --- | --- |
| Etusivu | Otsikko ja suomenkielinen sisältö avautuvat 1280 pikselin näkymässä. |
| Haku | Haku sanalla `autorisointi` tuottaa tuloksia, ja Enter avaa valitun tuloksen. |
| Haun sulkeminen | Escape sulkee haun. Kohdistus palautuu avauspainikkeeseen tai pikanäppäintä käytettäessä aiemmin kohdistettuun ohjaimeen. |
| Mobiilinavigointi | `Sisällysluettelo` avaa valikon 320 pikselin näkymässä. Luvun valinta avaa oikean sivun ja sulkee valikon. |
| Ohituslinkki ja fokus | Ensimmäinen Tab tuo näkyviin `Siirry sisältöön` -linkin. Siinä havaitaan 3 pikselin fokusreunus; Enter siirtää kohdistuksen sisältöön. |
| Valikkoryhmien nimet ja käyttö | Apuvälinenimet on suomennettu. Ryhmä ilmoittaa aukiolotilansa ja avautuu myös välilyönnillä. |
| Pitkän koodin kopiointi | `esimerkit/04-valmis/public/app.js` vastaa todelliselta leikepöydältä luettuna lähdettä. Kopiointipainike jättää viimeisen rivinvaihdon pois; muita eroja ei havaittu. |
| HTML-esimerkkisivu | Koodi näkyy tekstinä. Sen esimerkkilomake ei muutu materiaalissa toimivaksi lomakkeeksi. |
| Markdown-lataus | Linkin klikkaus tuottaa aidon `.md`-latauksen. Kaikki 447 021 tavua vastaavat koosteessa olevaa lähdettä. |
| Kooditekstien lataukset | Kahden näytteen, `app.js.txt` ja `index.html.txt`, sisältö vastaa lähdetiedostoja tavuilleen. Sisältötyyppi on `text/plain`. |
| Kapea näkymä ja suurennettu teksti | Luvut 01 ja 10 sekä pitkän JavaScriptin ja HTML:n koodisivut pysyvät 320 pikselin dokumenttileveydessä myös juurifontin ollessa 32 pikseliä. |
| Korjausten jälkeinen selainajo | Tutkitussa haku- ja navigointipolussa ei ole JavaScript-, konsoli- tai HTTP-virheitä. |

Ensimmäisellä kierroksella havaitut englanninkieliset apuvälinenimet ja haun kohdistuksen palautuminen on korjattu kommentoidussa `docs/.vitepress/theme/accessibility.ts`-tiedostossa. Puuttuvasta välilehtikuvakkeesta aiheutunut 404-pyyntö on korjattu asetuksiin sisältyvällä SVG-kuvakkeella. Korjaukset tarkistettiin uudelleen selaimessa.

[Selainkokeiden yhteenveto](/tarkistukset/vitepress-selain.json) kertoo käytetyt näytteet ja korjausten tulokset. Kaikkia sivuja ei käyty selaimessa läpi yksitellen; sisäisten sivulinkkien tarkistus kuuluu rakentamiseen.

## Saavutettavuuden tarkistuksen rajaus

Kapean näkymän tarkistuksessa selainikkuna on 320 CSS-pikseliä leveä. Tekstin suurennuskokeessa HTML-juurielementin fonttikoko muutetaan 16 pikselistä 32 pikseliin. Tämä koe kuvaa käytettyä teknistä mittaustapaa; se ei tarkoita kaikkien selainten kaikkien zoomaus- ja suurennusasetusten tarkistamista.

Leveät taulukot vierivät omalla nimetyllä alueellaan. Koodi on kopioitavaa tekstiä, ja pitkät rivit rivittyvät näytössä. Näppäimistökohdistus merkitään näkyvällä reunuksella. Sivun kieli on `fi-FI`, taulukkojen otsikkosoluilla on sarakkeen ilmoittava `scope`, ja sisältöön siirtyminen ohittaa toistuvan navigoinnin.

Nämä ovat käytännön tarkistuksia. Täydellistä WCAG-auditointia tai ruudunlukijan puheulostulon läpikäyntiä ei tehty. Kurssin luvussa 03 on opiskelijan omalle käyttöliittymälle tarkoitettuja saavutettavuuskokeita.

## Aiemmat ohjelma- ja Docker-tarkistukset

Tämä tiedostomuodon muunnos ei ole uusi backend- tai Docker-testiajo. Alkuperäisen paketin Deno-testitulokset ja siellä ilmoitetut Dockerin sekä Moodle-tuonnin rajaukset ovat edelleen luettavissa [19.10.2026-tarkistusraportissa](./tarkistus-2026-10-19.md). Toimituksen sivustoa käytettiin paikallisessa esikatselussa.
