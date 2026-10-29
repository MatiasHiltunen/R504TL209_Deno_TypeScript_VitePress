# Näin käytät ja muokkaat VitePress-materiaalia

Tässä ohjeessa avaat kurssimateriaalin omalla koneellasi ja opit muuttamaan sen tekstiä ja koodiesimerkkejä. **VitePress on työkalu, joka tekee Markdown-tiedostoista selaimella luettavan sivuston.** Markdown on tavallista tekstiä, jossa esimerkiksi otsikot, listat ja koodilohkot merkitään yksinkertaisilla merkeillä. Tiedoston pääte on `.md`.

Tämä esitysmuoto sisältää alkuperäisen **R504TL209 Full Stack -sovelluskehitys: Backend** -opintojakson luvut 00–12 ja kokonaiset kommentoidut lähdekoodit. Koodipankissa on lähtötilanteessa **45 tiedostokohtaista sivua**. Varsinaisen kurssin sisältö ja pakolliset harjoitukset ovat tallella; VitePress tuo niiden ympärille navigoinnin, haun ja muokattavan Markdown-rakenteen.

**Sivustoa ei ole julkaistu internetiin.** Ohjeen palvelimet toimivat omalla koneellasi. Pelkkään lukemiseen voit käyttää myös [täydellistä Markdown-koostetta](./lataukset/R504TL209_Deno_TypeScript_oppimateriaali.md){download} tai [alkuperäistä 19.10.2026-materiaalipakettia](./lataukset/R504TL209_materiaali_2026-10-19.zip).

## 1. Mitä ohjelmat tekevät?

| Käsite tai työkalu | Selitys tässä paketissa |
|---|---|
| **Selain** | Ohjelma, jolla luet sivustoa, esimerkiksi Firefox, Chrome, Edge tai Safari. |
| **Tekstieditori** | Ohjelma, jolla muokkaat lähdetiedostoja. Esimerkiksi Visual Studio Code sopii tähän. Tallenna tavallista tekstiä, älä tekstinkäsittelyohjelman asiakirjaa. |
| **Pääte eli terminal** | Ikkuna, johon kirjoitat komennon ja luet ohjelman vastauksen. Komento suoritetaan päätteessä valittuna olevassa kansiossa. |
| **Projektin juuri** | Puretun `R504TL209_Deno_TypeScript_VitePress`-kansion ylin taso. Tässä kansiossa ovat `package.json`, `package-lock.json`, `docs` ja `esimerkit`. |
| **Node.js eli Node** | JavaScriptin suoritusympäristö. Tässä paketissa se ajaa materiaalin ylläpitoskriptin ja VitePressin. |
| **npm** | Noden mukana tuleva pakettityökalu. Se asentaa materiaalin tarvitsemat ohjelmakirjastot ja käynnistää `package.json`-tiedostossa nimetyt tehtävät. |
| **Riippuvuus** | Ohjelmapaketti, jota tämä projekti tarvitsee. VitePress on tämän materiaaliprojektin riippuvuus. |
| **VitePress** | Markdownista sivuston muodostava työkalu. Tähän pakettiin on valittu täsmällinen versio **1.6.4**. |
| **Deno** | Erillinen JavaScriptin ja TypeScriptin suoritusympäristö, jota käytetään kurssin harjoitusbackendissa. Materiaalisivuston lukeminen ei vielä käynnistä Denoa. |

Projektin `package.json` edellyttää **Node 22:ta tai uudempaa**. Paketin `.nvmrc` sisältää arvon **24**, joten käytä mieluiten Node 24 -sarjaa. `.nvmrc` on versionhallintatyökaluille tarkoitettu version valinta; tiedosto ei itsestään asenna tai vaihda koneesi Nodea. Jos Nodea ei vielä ole koneellasi, sen asennus löytyy [Node.js:n viralliselta sivustolta](https://nodejs.org/en/download).

Tässä ohjeessa komennot on tarkoitettu esimerkiksi Windowsin **PowerShelliin** sekä macOS:n ja Linuxin päätteeseen. `#`-alkuinen rivi on kommentti: se selittää seuraavan komennon. Paina Enter jokaisen varsinaisen komennon jälkeen ja odota, että komento on valmis, ennen seuraavaa vaihetta.

## 2. Käynnistä materiaali ensimmäisen kerran

### Vaihe A: pura paketti ja avaa oikea kansio

Pura koko ZIP tavalliseen kansioon. Avaa purettu `R504TL209_Deno_TypeScript_VitePress`-kansio tekstieditorissa. Avaa editorin pääte, esimerkiksi Visual Studio Codessa valikosta **Terminal → New Terminal**. Tarkista editorin tiedostoluettelosta, että kansion ylimmällä tasolla näkyy `package.json`.

Jos käytät erillistä päätettä, avaa se samaan projektin juurikansioon käyttöjärjestelmäsi toiminnolla. Kaikki tämän luvun npm-komennot suoritetaan tästä kansiosta.

**Odotettu tulos:** näet puretut tiedostot ja pääte on projektin juuressa. Pelkkä ZIPin sisällön selaaminen ei riitä: tiedostojen pitää olla purettuina.

### Vaihe B: tarkista työkalut

```sh
# Näytä asennetun Noden versio; Node 24 -sarjan tulos alkaa v24.
node --version
# Näytä npm:n versio ja varmista samalla, että npm-komento löytyy.
npm --version
```

**Tarkistus:** molemmat komennot tulostavat versionumeron. Node-version pitää olla vähintään 22; paketin suositus on 24. npm:n versionumeron ei tarvitse olla sama kuin Noden.

**Tyypillinen virhe:** pääte ei tunnista `node`- tai `npm`-komentoa. Asenna Node ja avaa sen jälkeen uusi pääte, jotta juuri asennettu ohjelma löytyy.

### Vaihe C: asenna materiaalin riippuvuudet

```sh
# Asenna riippuvuudet mukana olevan package-lock.jsonin määräämillä versioilla.
npm ci
```

`ci` käyttää mukana olevaa lukitustiedostoa eli `package-lock.json`-tiedostoa. Lukitustiedosto kertoo VitePressin ja sen tarvitsemien muiden pakettien tarkat versiot. Asennus luo projektiin `node_modules`-kansion. Ensimmäinen asennus tarvitsee toimivan internetyhteyden.

**Odotettu tulos:** asennus päättyy ja pääte antaa taas kirjoittaa uuden komennon. Jos asennus päättyy virheeseen, lue viimeiset virherivit ennen jatkamista. Pelkkä se, että osa paketeista ehti latautua, ei vielä tarkoita onnistunutta asennusta.

### Vaihe D: käynnistä kehityspalvelin

```sh
# Päivitä koodipankki ja käynnistä materiaalin kehityspalvelin paikallisessa portissa 5173.
npm run docs:dev
```

Avaa selaimessa **`http://127.0.0.1:5173`**. `127.0.0.1` tarkoittaa omaa konettasi. Kaksoispisteen jälkeinen `5173` on **portti**, jonka avulla selain tavoittaa juuri tämän palvelinohjelman.

**Odotettu tulos:** materiaalin etusivu avautuu. Päätteessä näkyy ensin ilmoitus päivitetystä koodipankista ja sen jälkeen kehityspalvelimen osoite. Lähtöpaketissa päivitys tuottaa 45 kommentoitua koodisivua. Jätä pääte käyntiin lukemisen ajaksi: palvelin on käynnissä oleva ohjelma.

**Tarkistus:** avaa etusivulta luku 00 ja sen jälkeen koodipankin tiedostosivu. Jos vakioportti on jo käytössä ja VitePress tulostaa toisen osoitteen, avaa päätteessä ilmoitettu osoite.

Pysäytä palvelin painamalla sen pääteikkunassa **Ctrl+C**. Seuraavalla käyttökerralla riippuvuuksia ei tarvitse asentaa uudelleen, jos projektin riippuvuudet eivät ole muuttuneet. Käynnistä silloin sama `docs:dev`-tehtävä.

## 3. Löydä luku, käsite ja oikea kooditiedosto

Sivuston painike **Hae** avaa suomenkielisen paikallisen haun. Kirjoita esimerkiksi *autorisointi* tai *SQLite*. Haku käyttää selaimeen ladattavaa indeksiä eli materiaalin sisällöstä muodostettua hakemistoa. Erillistä hakupalvelun tiliä ei tarvita. Haku avautuu myös näppäimillä **Ctrl+K** tai Macissa **Cmd+K**. Hakutuloksissa voi liikkua nuolinäppäimillä, valita Enterillä ja sulkea haun Escapella. [VP2]

Leveällä näytöllä lukujen valikko on sivussa. Puhelimella tai kapeassa selainikkunassa avaa **Sisällysluettelo**. Sivun **Tällä sivulla** -luettelo auttaa pitkän luvun sisällä. **Edellinen** ja **Seuraava** siirtävät materiaalin osasta seuraavaan.

Näppäimistöllä liikkuessa alussa on **Siirry sisältöön** -linkki. Se ohittaa toistuvan navigoinnin. Käytä Tabia seuraavaan linkkiin tai painikkeeseen ja Shift+Tabia takaisin. Voit suurentaa selaimen näkymää omaan lukemiseesi sopivaksi. Pitkät koodirivit rivittyvät näytössä. Leveää taulukkoa voit vierittää sen omalla alueella; näppäimistöllä siirry alueelle Tabilla ja käytä nuolinäppäimiä. Teeman näiden toimintojen asetukset on kuvattu version 1.6.4 virallisessa ohjeessa. [VP3]

**Koodipankin sivun otsikko on tiedoston polku**, esimerkiksi `esimerkit/04-valmis/public/app.js`. Polku kertoo, mihin tiedostoon koodi kuuluu. Koodipankin **Kopioi koodi** -painike kopioi koko lohkon. Voit myös ladata saman koodin tekstinä. Tekstilatauksen lopussa oleva `.txt` suojaa HTML-esimerkkiä avautumasta vahingossa toimivana sivuna: kun luot harjoituksen tiedoston, käytä sivun otsikossa annettua oikeaa nimeä, esimerkiksi `app.js`.

Etenemisjärjestys ja harjoitusvaatimukset ovat [aloitusluvussa](/luvut/00-aloita.md) sekä [harjoitusluvussa](/luvut/10-harjoitukset.md). Pelkkä koodipankin läpikäynti ei korvaa näitä ohjeita.

## 4. Materiaalipalvelin ja Deno-backend ovat eri ohjelmia

| Palvelin | Miten se käynnistyy? | Osoite ja käyttötarkoitus |
|---|---|---|
| **Materiaalin kehityspalvelin** | Projektin juuren `docs:dev`-tehtävä. | `http://127.0.0.1:5173`: materiaalin lukeminen ja muokkausten katsominen. |
| **Materiaalin esikatselupalvelin** | Projektin juuren `docs:preview`-tehtävä onnistuneen rakennuksen jälkeen. | `http://127.0.0.1:4173`: rakennetun materiaalin tarkistaminen. |
| **Deno-harjoitusbackend** | Harjoituskansion Deno-tehtävä. | `http://localhost:8000`: Tehtävätaulu-sovellus, sen frontend ja API. |

**API** on tässä harjoitussovelluksen rajapinta, johon frontend lähettää esimerkiksi projektin lisäämistä koskevan pyynnön. VitePressin näyttämä kommentoitu koodi on luettavaa opetusmateriaalia: materiaalipalvelin ei tallenna Tehtävätaulun projekteja eikä kirjaa harjoitussovelluksen käyttäjiä sisään.

Kun olet asentanut Denon kurssin ohjeen mukaan ja edennyt [luvun 07 harjoitukseen](/luvut/07-turvallinen-sovellus.md), avaa **toinen pääte projektin juurikansioon**. Silloin materiaali voi jäädä ensimmäisessä päätteessä käyntiin.

```sh
# Siirry projektin juurikansiosta valmiin Deno-harjoitussovelluksen kansioon.
cd esimerkit/04-valmis
# Käynnistä harjoituksen Deno-palvelin sen oman deno.jsonc-tehtävän avulla.
deno task start
```

Avaa harjoitus **`http://localhost:8000`**-osoitteessa. Käytä tässä harjoituksessa nimenomaan `localhost`-nimeä. Sovelluksen kirjoittavat pyynnöt tarkistavat selaimen ilmoittaman **originin**, joka muodostuu protokollasta, palvelimen nimestä ja portista. Sen sallittu arvo on tässä harjoituksessa `http://localhost:8000`. Osoitteet `http://127.0.0.1:8000` ja materiaalin portti `5173` eivät ole sama origin. Tarkempi käsitteen ja suojauksen selitys on luvussa 07.

## 5. Tiedostokartta: mitä muokataan ja mitä tuotetaan?

| Tiedosto tai kansio | Tarkoitus ja oikea muokkauspaikka |
|---|---|
| `README.md` | Paketin aloitusohje tekstieditorissa luettavaksi. |
| `docs/luvut/00-…md` – `11-…md` | Kurssin muokattavat Markdown-luvut. Tallenna teksti näihin lähdetiedostoihin. |
| `docs/vitepress-kaytto.md` | Tämä VitePressin käyttöohje. |
| `esimerkit/` | Aidot harjoitustiedostot: Deno, TypeScript, frontend ja SQLite-sovellus. |
| `docker-postgres/` | PostgreSQLin Docker-harjoituksen aidot tiedostot. |
| `scripts/koodit.json` | Koodipankin tiedostoluettelo: ryhmät ja niihin kuuluvat tiedostopolut. |
| `scripts/koodipankin-johdanto.md` | Koodipankin yleissivun ja koosteen johdannon muokattava lähde. |
| `scripts/sync-content.mjs` | Nodella ajettava ylläpitoskripti, joka lukee lähteet ja tuottaa koodisivut. |
| `docs/koodipankki/` | Automaattisesti tuotetut tiedostosivut ja koodipankin hakemisto. |
| `docs/luvut/12-koodipankki.md` | Automaattisesti tuotettu linkki koodipankkiin. Tähän tiedostoon tehty muutos ei säily seuraavassa päivityksessä. |
| `docs/.vitepress/config.ts` | VitePressin asetukset, kuten suomenkielinen navigointi, haku ja `base`-polku. |
| `docs/.vitepress/theme/` | Luettavuutta tukevat tyylit sekä oletusteeman apuvälinenimien ja haun kohdistuksen täydennykset. Nämä ovat materiaalin ylläpitotiedostoja. |
| `docs/.vitepress/koodivalikko.ts` | Koodipankin automaattisesti tuotettu sivupalkin valikko. |
| `docs/public/koodit/` | Automaattisesti tuotetut kooditiedostojen `.txt`-lataukset. |
| `docs/public/lataukset/` | Täydellinen Markdown-kooste sekä alkuperäinen 19.10.2026-ZIP. |
| `package.json` ja `package-lock.json` | Materiaaliprojektin riippuvuuksien, versioiden ja käynnistystehtävien tiedot. |
| `node_modules/` | npm:n asentamat riippuvuudet. Asennus tuottaa tämän kansion. |
| `docs/.vitepress/dist/` | Selaimelle valmis sivusto, jonka rakennus tuottaa. |

**Luvut 00–11 ovat muokattavia lähteitä. Luvun 12 tiedosto, koodisivut, koodivalikko, tekstilataukset ja täydellinen kooste tuotetaan uudelleen.** Jos muokkaat tuotettua koodisivua, seuraava päivitys korvaa sen. Tee koodin pysyvä muutos alkuperäiseen `esimerkit`- tai `docker-postgres`-tiedostoon.

### Mitä package.json kertoo?

**JSON ei salli kommentteja.** Siksi tiedoston kentät selitetään tässä taulukossa; älä lisää `#`- tai `//`-kommentteja `package.json`- tai `scripts/koodit.json`-tiedostoon.

| Kenttä tässä package.jsonissa | Selitys |
|---|---|
| `name` | Materiaaliprojektin tekninen nimi npm:lle. |
| `version` | Tämän materiaaliprojektin pakettiversio. Se on eri asia kuin VitePressin tai Noden versio. |
| `private: true` | Estää tämän projektin julkaisemisen npm-pakettina vahingossa. Se ei itsessään julkaise tai suojaa verkkosivustoa. |
| `type: "module"` | Valitsee JavaScriptin ESM-moduulit, joita VitePress käyttää. [VP1] |
| `description` | Lyhyt kuvaus projektin sisällöstä. |
| `engines.node: ">=22.0.0"` | Ilmoittaa tämän projektin Node-version vähimmäisvaatimuksen. |
| `scripts` | Nimetyt tehtävät, jotka käynnistetään muodossa `npm run tehtävän-nimi`. |
| `scripts.content:sync` | Ajaa `scripts/sync-content.mjs`-tiedoston Nodella ja tuottaa koodipankin sekä koosteen. |
| `scripts.docs:dev` | Päivittää sisällön ja käynnistää VitePressin kehityspalvelimen porttiin 5173. |
| `scripts.docs:build` | Päivittää sisällön ja rakentaa valmiin sivuston. |
| `scripts.docs:preview` | Käynnistää valmiiksi rakennetun sivuston esikatselun porttiin 4173. Tämä tehtävä ei rakenna sivuja uudelleen. |
| `devDependencies.vitepress: "1.6.4"` | Lukitsee materiaalin VitePressin juuri versioon 1.6.4. |

`package-lock.json` lukitsee myös riippuvuuksien riippuvuudet. Pidä molemmat tiedostot mukana lähdepaketissa. `.nvmrc` auttaa sopivan Node-sarjan valinnassa, mutta npm-komennot eivät lue siitä asennettavaa Node-versiota.

## 6. Muokkaa lukua tai koodiesimerkkiä

### Tekstimuutos

1. Avaa esimerkiksi `docs/luvut/01-kasitteet.md` tekstieditorissa.
2. Muokkaa haluamaasi virkettä tai lisää oma selvennys. Säilytä otsikoiden järjestys ja koodiesimerkkien kommentit.
3. Tallenna tiedosto, esimerkiksi painamalla Ctrl+S tai Macissa Cmd+S.
4. Katso sama sivu käynnissä olevassa kehityspalvelimessa. VitePress päivittää muokattua Markdown-sivua kehityksen aikana. [VP1]

Markdownissa `#` rivin alussa tarkoittaa pääotsikkoa ja `##` alaotsikkoa. Koodilohkon ympärillä oleva koodiaita erottaa kopioitavan koodin tavallisesta tekstistä. Säilytä aidan aloitus ja lopetus: muuten loppuosa luvusta voi näkyä vahingossa koodina. VitePressin Markdown-ohje kuvaa otsikot, linkit ja koodilohkot. [VP4]

### Koodimuutos

1. Avaa harjoituksen oikea lähdetiedosto, esimerkiksi `esimerkit/02-frontend/app.js`.
2. Tee muutos ja tallenna tiedosto.
3. Avaa toinen pääte projektin juurikansioon, jos kehityspalvelin käyttää ensimmäistä päätettä.
4. Päivitä aineisto seuraavalla komennolla.

```sh
# Lue oikeat lähdetiedostot uudelleen ja päivitä niistä koodipankki sekä Markdown-kooste.
npm run content:sync
```

**Odotettu tulos:** pääte ilmoittaa päivitettyjen koodisivujen määrän. Avaa muutettua tiedostoa vastaava koodipankin sivu ja tarkista, että muutos näkyy myös siellä.

`docs:dev` ja `docs:build` ajavat tämän päivityksen käynnistyessään automaattisesti. Jo käynnissä oleva kehityspalvelin ei kuitenkaan yksin riitä tuomaan `esimerkit`-kansion muutosta koodipankkiin: suorita silloin erikseen `content:sync`. Myös luvun tekstimuutoksesta tulee osa ladattavaa Markdown-koostetta seuraavalla päivitysajolla.

**Päivitys ei testaa harjoitussovelluksen toimintaa.** Se lukee lähdekoodin tekstinä ja näyttää sen materiaalissa. Tarkista ohjelman toiminta kurssin kyseisen harjoituksen ohjeilla.

### Uusi kooditiedosto

Jos lisäät kokonaan uuden tiedoston, pelkkä tallentaminen `esimerkit`-kansioon ei lisää sitä koodipankkiin. Lisää tiedoston projektin juureen suhteutettu polku sopivan ryhmän `files`-listaan tiedostossa `scripts/koodit.json`. Ryhmän `number` on ryhmän numero ja `title` sen otsikko. Käytä JSONissa kaksinkertaisia lainausmerkkejä ja erota listan kohdat pilkulla; viimeisen kohdan jälkeen ei tule pilkkua.

Aja lopuksi sisällön päivitys. Jos luettelon tiedostopolku on väärä tai tiedosto puuttuu, päivitys keskeytyy virheeseen. Korjaa polku ja yritä uudelleen. Näin puuttuvaa lähdekoodia ei korvata huomaamatta tyhjällä sivulla.

## 7. Rakenna valmis sivusto ja tarkista se

**Rakentaminen** tarkoittaa, että VitePress tuottaa muokattavista lähteistä selaimen tarvitsemat HTML-, CSS- ja JavaScript-tiedostot. **Esikatselu** näyttää nämä jo tuotetut tiedostot paikallisen palvelimen kautta. [VP5]

Suorita komennot projektin juurikansiossa. Voit käyttää uutta päätettä tai pysäyttää kehityspalvelimen ensin Ctrl+C:llä.

```sh
# Päivitä koodipankki ja rakenna koko materiaalisivusto hakemistoon docs/.vitepress/dist.
npm run docs:build
# Käynnistä rakennetun sivuston paikallinen esikatselu porttiin 4173.
npm run docs:preview
```

Avaa **`http://127.0.0.1:4173`**. Tarkista ainakin muokkaamasi luku, koodipankin tiedostosivu, haku ja latauslinkit. Esikatselu käyttää viimeisintä onnistunutta rakennusta. Jos muokkaat lähteitä tämän jälkeen, pysäytä esikatselupalvelin Ctrl+C:llä, aja `docs:build` uudelleen ja käynnistä sen jälkeen `docs:preview` uudelleen. Uusi käynnistys ottaa myös muuttuneet rakennustiedostot käyttöön.

Käytä rakennuksen katsomiseen esikatselupalvelinta. Pelkkä `dist/index.html`-tiedoston avaaminen suoraan tiedostona ei vastaa palvelimen kautta käytettävää sivustoa.

### Jos materiaali myöhemmin sijoitetaan alihakemistoon

Tiedoston `docs/.vitepress/config.ts` **`base`** kertoo, minkä polun alta sivusto tarjotaan. Nykyinen arvo on `'/'`, joka tarkoittaa palvelimen juurta. Jos sivuston tuleva osoite olisi esimerkiksi `https://esimerkki.fi/kurssi/`, arvoksi vaihdetaan `'/kurssi/'`. Arvon pitää alkaa ja päättyä kauttaviivaan. [VP5–VP6]

Muuta olemassa olevaa `base`-asetusta ja tallenna tiedosto. Älä korvaa koko asetustiedostoa yhdellä asetusrivillä: samassa tiedostossa ovat myös navigointi ja hakutekstit. Rakenna tämän jälkeen uudelleen ja avaa esikatselussa kyseinen polku, esimerkiksi `http://127.0.0.1:4173/kurssi/`.

**Rakennuskomento ja base-asetuksen muuttaminen eivät julkaise mitään automaattisesti.** Julkaisu valittuun palveluun on erillinen myöhempi toimenpide.

## 8. Mitä jaettavaan pakettiin kuuluu?

Kun jaat muokattavan VitePress-projektin, säilytä lähdetiedostot, asetukset ja ylläpitoskriptit. Mukana pitää olla myös `package-lock.json`, jotta vastaanottaja voi asentaa riippuvuudet samalla `npm ci` -komennolla.

Jätä lähde-ZIPistä pois **`node_modules`**, **`docs/.vitepress/cache`** ja **`docs/.vitepress/dist`**. Ne ovat paikallisesti syntyviä riippuvuuksia, välimuistia ja rakennuksen tulosta. Kun jaat nimenomaan valmiin staattisen verkkosivuston palvelimelle, käytetään sen sijaan `dist`-hakemiston sisältöä; tämä on eri toimitus kuin muokattava lähdeprojekti.

`docs/public/lataukset` sisältää kaksi eri tarkoitukseen kuuluvaa tiedostoa:

- **`R504TL209_Deno_TypeScript_oppimateriaali.md`** on täydellinen yhden tiedoston Markdown-kooste. Sisällön päivitys kirjoittaa siihen nykyiset kurssiluvut ja kokonaiset kommentoidut koodit. Käyttöohje ja tarkistusraportit ovat VitePress-projektissa erillisiä sivuja.
- **`R504TL209_materiaali_2026-10-19.zip`** on alkuperäinen materiaalipaketti. Se säilyy mukana alkuperäisen version vertailua varten; `content:sync` ei päivitä tätä ZIPiä omilla muutoksillasi.

VitePress kopioi `public`-hakemiston tiedostot rakennettuun sivustoon sellaisinaan. [VP6]

## 9. Jos jokin ei toimi

| Havainto | Tarkista ensin |
|---|---|
| Pääte ei tunnista `node`- tai `npm`-komentoa. | Onko Node asennettu ja avasitko asennuksen jälkeen uuden päätteen? |
| npm ei löydä `package.json`-tiedostoa tai tehtävää. | Onko koko ZIP purettu ja oletko projektin juurikansiossa? Tässä kansiossa ovat materiaalin `package.json` ja `docs`. |
| `npm ci` ilmoittaa lukitustiedoston puuttuvan tai olevan ristiriidassa. | Ovatko `package.json` ja `package-lock.json` samasta paketista? Palauta puuttuva tiedosto ennen jatkamista. |
| Selain ei saa yhteyttä materiaalin osoitteeseen. | Onko oikea palvelin käynnissä ja käytätkö päätteessä näkyvää osoitetta? Kehityksen portti on 5173 ja esikatselun 4173. |
| Koodipankki näyttää vanhan esimerkin. | Tallensitko oikean lähdetiedoston ja ajoitko `content:sync`-tehtävän? |
| Koodisivulle tehty muutos katosi. | Muokkasitko automaattisesti tuotettua sivua? Tee muutos vastaavaan lähdetiedostoon ja päivitä sisältö uudelleen. |
| Esikatselu näyttää vanhan tekstin tai rakennuksen jälkeen puuttuvia tiedostoja. | Pysäytä esikatselu, aja `docs:build` ja käynnistä `docs:preview` uudelleen. Esikatselu ei itse rakenna sivuja. |
| Tehtävätaulun kirjoittava pyyntö epäonnistuu väärässä osoitteessa. | Käytätkö harjoitusta osoitteessa `http://localhost:8000` ja onko Deno käynnissä? Katso harjoituksen tarkemmat virheohjeet luvusta 07. |

## 10. Tarkistukset ja lähteet

[Alkuperäisen materiaalin tarkistusraportti](/tarkistus-2026-10-19.md) koskee 19.10.2026-versiota. [VitePress-version tarkistusraportti](/vitepress-tarkistus.md) kertoo tämän esitysmuodon tarkistukset, käytetyt versiot ja tarkistusten rajaukset. Käyttöohjeessa esitetty tarkistusvaihe on opiskelijan työohje; se ei tarkoita, että jokainen mahdollinen selain, käyttöjärjestelmä tai myöhempi oma muutos olisi jo testattu.

Alla olevat VitePress-lähteet on lukittu virallisen repositorion **v1.6.4**-tagiin, jotta tämän paketin ohjeeseen ei sekoitu myöhemmän pääversion asetuksia.

| Viite | Virallinen lähde |
|---|---|
| VP1 | [Asennus, ESM-moduulit, projektin rakenne ja kehityspalvelin](https://github.com/vuejs/vitepress/blob/v1.6.4/docs/en/guide/getting-started.md) |
| VP2 | [Paikallinen haku ja sen käännökset](https://github.com/vuejs/vitepress/blob/v1.6.4/docs/en/reference/default-theme-search.md); [haun pikanäppäinten toteutus](https://github.com/vuejs/vitepress/blob/v1.6.4/src/client/theme-default/components/VPNavBarSearch.vue); [hakudialogin näppäimistötoteutus](https://github.com/vuejs/vitepress/blob/v1.6.4/src/client/theme-default/components/VPLocalSearchBox.vue) |
| VP3 | [Oletusteeman navigointi ja suomennettavat asetukset](https://github.com/vuejs/vitepress/blob/v1.6.4/docs/en/reference/default-theme-config.md) |
| VP4 | [Markdown: otsikot, linkit ja koodilohkot](https://github.com/vuejs/vitepress/blob/v1.6.4/docs/en/guide/markdown.md) |
| VP5 | [Rakentaminen, paikallinen esikatselu ja base-polku](https://github.com/vuejs/vitepress/blob/v1.6.4/docs/en/guide/deploy.md) |
| VP6 | [Staattiset tiedostot, public-hakemisto ja base-polku](https://github.com/vuejs/vitepress/blob/v1.6.4/docs/en/guide/asset-handling.md) |

Paketin omien komentojen, kansioiden ja Node-vaatimuksen lähteet ovat mukana olevat `package.json`, `.nvmrc` ja `scripts/sync-content.mjs`. Ne ovat tämän toimituksen toteutusvalintoja, eivät VitePressin kaikkia projekteja koskevia vähimmäisvaatimuksia.
