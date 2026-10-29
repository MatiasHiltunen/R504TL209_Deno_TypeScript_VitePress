# 03 Frontend: selaimessa näkyvä ja käytettävä osa

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

## 3.1 Aloitetaan sanoista

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

### Miksi frontendissä on JavaScriptiä, vaikka kurssi käyttää TypeScriptiä?

Kurssin backend rakennetaan Denolla ja TypeScriptillä. Tässä ensimmäisessä frontendissä käytetään suoraan selaimen suorittamaa JavaScriptiä, jotta voit ensin nähdä, miten selain toimii. TypeScriptin tyyppimerkintöjä ei kopioida sellaisinaan `app.js`-tiedostoon. Valmiissa frontend-esimerkissä ei tarvita erillistä käännös- tai paketointityökalua. Myöhemmin voit valita myös TypeScriptillä rakennettavan frontendin, kun selität sen käännösvaiheen. HTML:n, CSS:n, DOMin ja HTTP:n perusteet säilyvät samoina. [F1, F20]

## 3.2 Työtapa: tiedosto, tallennus ja selaimen päivitys

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

### Kommentti on ihmiselle kirjoitettu selitys

HTML-kommentti alkaa merkeillä `<!--` ja päättyy merkkeihin `-->`. CSS-kommentti alkaa `/*` ja päättyy `*/`. JavaScriptissä `//` aloittaa loppurivin kommentin. Kommentit auttavat lukemaan koodia; niitä ei suoriteta ohjelman käskyinä. Niitä ei myöskään käytetä salaisuuksien piilottamiseen. [F4]

## 3.3 Kokeilu 1: kokonainen HTML-sivu

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

### Elementti, tagi ja attribuutti

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

## 3.4 Kokeilu 2: CSS muuttaa ulkoasua

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

### Miten CSS-sääntö luetaan?

**Valitsin** kertoo, mihin elementtiin sääntö kohdistuu. `body` valitsee elementin nimen perusteella, `.kortti` luokan perusteella ja `#status` id:n perusteella. Aaltosulkeiden sisällä ovat **ominaisuudet** ja niiden **arvot**. Rivillä `color: #172b3a;` ominaisuus on `color`, kaksoispiste erottaa arvon ja puolipiste päättää määrityksen. [F3]

`margin` tarkoittaa elementin ulkopuolista tyhjää tilaa. `padding` on elementin sisäpuolinen tila. `border` on reunus niiden välissä. `rem` perustuu sivun juurielementin kirjasinkokoon, ja `%` on suhteellinen osuus. Tavallisissa tekstisivuissa joustavat leveydet helpottavat näkymän käyttöä eri kokoisilla näytöillä. [F3, F12]

## 3.5 Kokeilu 3: painike ja JavaScript

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

### DOM on selaimen muistissa oleva sivurakenne

Kun selain lukee HTML:n, se muodostaa siitä muistissa rakenteen nimeltä **DOM**, Document Object Model. Sen kautta ohjelma voi etsiä elementtejä, lukea niiden sisältöjä ja muuttaa sivua. `document` viittaa tähän dokumenttiin. `querySelector` etsii ensimmäisen annetun CSS-valitsimen täyttävän elementin. [F6]

DOMin muuttaminen ei muuta editorissa olevaa HTML-tiedostoa. Tässä kokeilussa `textContent` muutti selaimen tämänhetkistä näkymää. Kun lataat sivun uudelleen, selain lukee alkuperäisen tiedoston uudelleen.

**Tapahtuma** on selaimen ilmoitus siitä, että jotakin tapahtui. Esimerkkejä ovat `click`, `submit` ja `change`. **Tapahtumankuuntelija** liittää tapahtumaan suoritettavan funktion. `addEventListener("click", tervehdi)` sanoo: ”kun tästä painikkeesta tulee click-tapahtuma, suorita tervehdi”. Tavallisen HTML-painikkeen aktivointi näppäimistöllä voi käynnistää saman toiminnon. [F7, F11]

Viimeisellä rivillä lukee `tervehdi`, ilman sulkeita. Se antaa kuuntelijalle funktion myöhemmin kutsuttavaksi. `tervehdi()` kutsuisi funktiota heti kyseisellä rivillä. Tätä eroa kannattaa kokeilla kopiossa ja palauttaa toimiva versio sen jälkeen.

## 3.6 JavaScriptin merkit ja sanat ennen suurempaa esimerkkiä

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

## 3.7 Kokeilu 4: lomake lukee käyttäjän tekstin

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

### `id`, `name` ja näkyvä nimi ovat eri asioita

`id="tehtava"` yksilöi elementin sivulla ja yhdistää sen labeliin. `name="title"` antaa kentän tiedolle nimen lomakkeen sisällä. Näkyvä label ”Tehtävän nimi” kertoo ihmiselle, mitä pitää kirjoittaa. Kaikilla kolmella on oma tehtävänsä. `placeholder`-vihje kentän sisällä ei korvaa pysyvää labelia: vihje katoaa kirjoitettaessa. [F8]

Valmis sovellus lukee osan lomakkeista `FormData`-oliolla. `new FormData(lomake)` kokoaa kenttien arvot `name`-nimien perusteella. Se **ei vielä lähetä niitä verkkoon**. Lähetys tehdään erikseen `fetch`-kutsulla. `disabled`-tilassa olevat kentät jäävät FormDatan ulkopuolelle, joten arvot kerätään ennen lomakkeen asettamista odotustilaan. Tätä järjestystä on kommentoitu valmiissa `app.js`:ssä. [F13]

### Miksi `textContent` on tärkeä?

Syötä tehtävän nimeksi teksti `<strong>Hei</strong>`. Tämän luvun esimerkeissä sen pitää näkyä kulmasulkeineen tavallisena tekstinä. `textContent` ei tulkitse merkkijonoa HTML-merkintänä. Käyttäjän tekstin sijoittaminen `innerHTML`-ominaisuuteen voi sen sijaan avata tien selaimessa suoritettavaan haitalliseen koodiin eli XSS-haavoittuvuuteen. [F14]

Tämä ei poista palvelimen validoinnin tarvetta. **Validointi** on syötteen tarkistamista sovittuja sääntöjä vastaan: esimerkiksi onko nimi olemassa ja pysyykö se pituusrajan sisällä. Frontendin validointi auttaa käyttäjää huomaamaan virheen nopeasti. Backendin validointi suojaa sovelluksen tallentamaa tietoa myös silloin, kun pyyntö tulee muualta kuin omalta lomakkeeltamme.

## 3.8 Kokeilu 5: olio, taulukko ja näkyvä lista

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

## 3.9 Seuraa mukana: kolmen tiedoston muistissa toimiva Tehtävätaulu

Nyt käytät mukana toimitettua kokonaisuutta **`esimerkit/02-frontend/`**. Se sisältää kolme tiedostoa: `index.html`, `styles.css` ja `app.js`. Jokainen HTML-elementti, attribuutti, CSS-sääntö ja JavaScriptin toiminnallinen rivi on kommentoitu suomeksi. Myös sulkeiden ryhmittelyä ja rivien tarkoitusta selitetään lähellä koodia.

Tämä vaihe yhdistää lisäämisen, lukemisen, muokkaamisen ja poistamisen. Näistä käytetään lyhennettä **CRUD**: Create, Read, Update ja Delete. Siinä ei vielä ole kirjautumista, oikeaa tallennusta, tietokantaa tai HTTP-pyyntöjä. Tiedot elävät vain tämän yhden välilehden muistissa.

### Vaihe A: varmista, että oikea kokonaisuus on auki

1. Kopioi koko `esimerkit/02-frontend` omaan harjoituskansioosi.
2. Avaa kopion kansio editorissa. Varmista, että sen sisällä näkyvät kaikki kolme tiedostoa.
3. Avaa kopion `index.html` selaimessa. Tässä vaiheessa `file:///...`-osoite on tarkoituksellinen.
4. Lue sivun alun teksti: sen tulee kertoa, että tiedot ovat vain selaimen muistissa.

**Odotettu tulos:** näet otsikon, uuden tehtävän kentän, painikkeen ja tyhjän listan ohjeen.

**Tarkistus:** avaa `index.html` editorissa ja etsi rivit `href="styles.css"` ja `src="app.js"`. Näet, miten HTML yhdistää kaksi muuta tiedostoa.

**Tavallinen virhe:** HTML on kopioitu, mutta CSS ja JavaScript jäivät toiseen kansioon. Kopioi kaikki kolme samaan kansioon. Kirjautumislomake puolestaan tarkoittaa, että avasit vahingossa myöhemmän vaiheen tiedoston.

### Vaihe B: lisää ja lue kaksi tehtävää

1. Kirjoita ”Lue HTML:n otsikkotasot” ja paina Enter.
2. Kirjoita ”Kokeile sovellusta ilman hiirtä” ja paina Enter.
3. Tarkista, että molemmat näkyvät ja kummankin kohdalla lukee ”kesken”.
4. Etsi `app.js`:stä `tasks.push`. Lue sitä edeltävä kommentti ja katso, mitä `id`, `title` ja `done` saavat arvoikseen.

**Odotettu tulos:** kaksi erillistä tehtävää ja onnistumisviesti. Kenttä tyhjenee lisäyksen jälkeen ja saa kohdistuksen takaisin seuraavaa nimeä varten.

**Tarkistus:** listassa on kaksi tehtävää, vaikka antaisit niille saman nimen. Id erottaa tehtävät; nimi ei ole tunniste.

**Tavallinen virhe:** selain lataa sivun Enteristä ja lista katoaa. Tarkista, ettei `event.preventDefault()` ole poistunut lomakkeen kuuntelijasta.

### Vaihe C: vaihda tila, nimeä uudelleen ja poista

1. Merkitse ensimmäinen tehtävä valmiiksi. Sen näkyvä tila muuttuu sanaksi ”valmis”.
2. Vaihda tila takaisin keskeneräiseksi.
3. Muuta toisen tehtävän nimikentän tekstiä ja paina ”Tallenna nimi”.
4. Poista ensimmäinen tehtävä. Peruuta ensin vahvistus ja varmista, että tehtävä säilyy. Tee poisto uudelleen ja vahvista se.
5. Poista jäljelle jäävä tehtävä. Sivun pitää kertoa, että lista on nyt tyhjä.

**Odotettu tulos:** nimimuutos koskee oikeaa tehtävää. Poiston jälkeen kohdistus palaa olemassa olevaan kenttään eikä jää poistettuun painikkeeseen.

**Tarkistus:** etsi ohjelmasta `task.done = !task.done`, `task.title = newTitle` ja `tasks.filter`. Selitä parille kunkin rivin vaikutus. Lue selitys kommentista, jos et vielä muista syntaksia.

**Tavallinen virhe:** vaihdat muuttujan arvon, mutta teksti ei päivity. Tarkista `render()`-kutsu. Selaimen näkyvä DOM ei automaattisesti muutu vain siksi, että JavaScriptin tavallisen olion ominaisuus muuttui.

### Vaihe D: huomaa tallennuksen puuttuminen

1. Lisää yksi tehtävä.
2. Päivitä sivu selaimen latauspainikkeella.
3. Tarkista, että lista on tyhjä.
4. Avaa sama tiedosto toiseen välilehteen: sillä on oma tyhjä muistinsa.

**Odotettu tulos:** tiedot katoavat. Tämä on tämän harjoitusvaiheen tarkoituksellinen ominaisuus, joka perustuu muuttujien säilyttämiseen vain välilehden muistissa.

**Pysähdy selittämään:** ”Näin tehtävän ruudulla” ei vielä tarkoita ”tehtävä tallentui tietokantaan”. Backend- ja tietokantavaiheessa tallennus tehdään palvelimelle, ja haemme samat tiedot takaisin sivun lataamisen jälkeen.

## 3.10 Verkkopyyntö, JSON ja selaimen sekä palvelimen sopimus

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

## 3.11 Promise sekä `async` ja `await`

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

### Näytettävät tilat eivät ole sama asia kuin HTTP-status

| Käyttöliittymän tila | Esimerkkiteksti | Mitä käyttäjä voi tehdä? |
|---|---|---|
| Alku- tai tyhjä tila | ”Sinulla ei vielä ole projekteja. Luo ensimmäinen projekti yllä.” | Aloittaa ensimmäisen kohteen luomisen. |
| Odotus | ”Tallennetaan uutta tehtävää…” | Ymmärtää, että pyyntö on kesken. Uusi lähetys estetään hetkeksi. |
| Onnistuminen | ”Tehtävä lisätty.” | Jatkaa seuraavaan tehtävään. |
| Virhe | ”Nimen pitää sisältää 1–200 merkkiä.” | Korjaa syötteen. |
| Yhteyden katkeaminen | ”Palvelimeen ei saatu yhteyttä.” | Tarkistaa palvelimen käynnissäolon ja yrittää uudelleen. |
| Vanhentunut kirjautuminen | ”Kirjautuminen on vanhentunut. Kirjaudu uudelleen.” | Palaa tunnistautumiseen. |

Tilaviesti sijoitetaan jo valmiiksi HTML:ssä olevaan `role="status"`-alueeseen. Virheille on erillinen `role="alert"`-alue. Viestiä ei kerrota vain värillä tai pienellä kuvakkeella. `aria-live="polite"` pyytää avustavaa teknologiaa ilmoittamaan tavallisen päivityksen sopivassa tauossa. [F16]

## 3.12 Kokeilu 6: hae tietoa oikealta palvelimelta

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

## 3.13 Seuraa mukana: koko frontend yhdistyy Deno-backendiin

Valmis kokonaisuus on kansiossa **`esimerkit/04-valmis/`**. Sen frontend-tiedostot ovat `public/index.html`, `public/styles.css` ja `public/app.js`. Käynnistä backendin ohjeen mukaan palvelin. Avaa käyttöliittymä osoitteesta **`http://localhost:8000`**. Frontendin ja backendin pitää olla tässä esimerkissä samassa alkuperässä.

Tästä vaiheesta lähtien tiedot tallentuvat backendin kautta oikeaan tietokantaan. Tehtävän onnistuneesta tallennuksesta kerrotaan vasta palvelimen vastauksen jälkeen. Sovellus ei säilytä salasanaa tai istuntotunnistetta `localStorage`-tallennuksessa. Kirjautuminen perustuu backendin asettamaan `HttpOnly`-istuntoevästeeseen. Selain lähettää evästeen pyynnössä automaattisesti, mutta frontendin JavaScript ei lue sitä. `HttpOnly` suojaa evästeen lukemiselta JavaScriptistä; se ei yksin estä kaikkia selaimessa tapahtuvia hyökkäyksiä. [F17]

### Miksi valmiin sovelluksen pituustarkistus eroaa pienestä lomakekokeilusta?

**Unicode** on tekstin merkkien yhteinen standardi. **Koodipiste** tarkoittaa yhtä sen numeroitua kohtaa. JavaScriptin merkkijono käyttää sisäisesti UTF-16-esitystä: esimerkiksi `😀` vie kaksi UTF-16-koodiyksikköä, vaikka se on yksi Unicode-koodipiste. Tavallinen merkkijonon `.length` ja HTML:n `maxlength` laskevat UTF-16-yksiköitä. Pienten kokeilujen `maxlength` havainnollistaa selaimen omaa kenttärajaa. [F25, F26]

Valmis Tehtävätaulu sopii backendin kanssa rajat **Unicode-koodipisteinä**: projektin nimi 1–120, tehtävän nimi 1–200 ja salasana 15–128. Frontend käyttää niiden tarkistamiseen `Array.from(teksti).length`-laskentaa kuten backendkin. Sen nimissä ja salasanoissa ei käytetä ristiriitaista HTML:n `maxlength`- tai `minlength`-rajaa. Kenttien `required`-pakollisuus säilyy. Pituusvirhe näytetään tekstinä; palvelin tarkistaa säännön aina uudelleen. Sähköpostin erillinen 254 yksikön raja säilyy samana selaimessa ja palvelimella.

Yksi käyttäjän näkemä kirjoitusmerkki voi muodostua myös useasta koodipisteestä, esimerkiksi yhdistellyssä emojissa. Siksi koodipisteiden määrä ei kaikissa teksteissä ole sama kuin silmällä laskettu merkkien määrä. Tässä harjoituksessa olennaista on, että frontend ja backend käyttävät keskenään samaa laskutapaa. [F26]

### Mitä tiedostoista kannattaa lukea ensin?

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

### Vaihe A: tunnistautuminen ja oma työtila

1. Tarkista, että sivulla näkyy ”Kirjaudu sisään” ja ”Luo tunnus”.
2. Luo tunnus keksityllä osoitteella ja 15–128 merkin harjoitussalasanalla. Salasanan alun tai lopun välilyöntejä ei ohjelmassa poisteta.
3. Varmista, että kirjautuneen käyttäjän osoite näkyy ja tyhjä projektilista neuvoo luomaan ensimmäisen projektin.
4. Kirjaudu ulos. Työtilan ja siihen ladattujen projektitietojen pitää poistua näkymästä.
5. Yritä kirjautua väärällä salasanalla. Virheen pitää näkyä tekstinä. Korjaa salasana ja kirjaudu onnistuneesti.

**Odotettu tulos:** kirjautuminen vaihtaa näkyvän työtilan ja uloskirjautuminen päättää myös palvelimen istunnon. Pelkkä näkymän piilottaminen ei olisi uloskirjautuminen.

**Tarkistus:** avaa Network-näkymä ja etsi `/api/auth/register`, `/api/auth/login`, `/api/auth/logout` tai `/api/auth/me`. Älä lisää salasanan tulostusta konsoliin. Katso pyynnön tarkoitusta, vastauskoodia ja sitä, että frontend toimii palvelimen vahvistaman käyttäjän perusteella.

**Tavallinen virhe:** uloskirjautumisen jälkeen seuraava käyttäjä näkee vanhan projektin tekstin. Valmis `showGuest` tyhjentää muistissa olevat projektit ja tehtävät sekä niistä rakennetun näkymän. Tarkista tämä toiminto, jos muokkaat koodia.

### Vaihe B: projektin kaikki neljä perustoimintoa

1. Luo projekti ”Web-ohjelmoinnin harjoitukset”.
2. Luo toinen projekti ”Viikon suunnitelma”.
3. Avaa ensimmäinen projekti sen omasta painikkeesta.
4. Muuta projektin nimi muokkauskentässä ja paina ”Tallenna projektin nimi”.
5. Avaa sivu uudelleen tai päivitä se. Avaa sama projekti ja tarkista tallennettu nimi.
6. Avaa toinen projekti, avaa ”Projektin poistaminen” ja poista se vahvistuksen kautta.

**Odotettu tulos:** molemmat projektit näkyvät listassa, nimimuutos säilyy latauksen yli ja poistettu projekti katoaa. Valittu projekti näkyy listassa myös tekstillä ”valittu”.

**Tarkistus:** erotat POST-luonnin, GET-luvun, PATCH-muokkauksen ja DELETE-poiston Network-näkymästä. Projektin id ei vaihdu sen nimenmuutoksen vuoksi.

**Tavallinen virhe:** vaihdat CSS:llä näkyvää otsikkoa tai JavaScriptin paikallista tekstiä, mutta nimi palautuu latauksessa. Pysyvä muutos vaatii onnistuneen palvelinpyynnön ja tietokantatallennuksen.

### Vaihe C: tehtävän kaikki perustoiminnot

1. Avaa jäljellä oleva projekti.
2. Lisää kaksi tehtävää. Uuden tehtävän nimi on 1–200 merkkiä; projektin nimen raja on 1–120 merkkiä.
3. Valitse ensimmäisen tehtävän valintaruutu. Tilateksti muuttuu sanaksi ”valmis”.
4. Avaa tehtävän ”Muokkaa tai poista” -osa. Vaihda tehtävän nimeä ja tallenna.
5. Päivitä sivu, avaa projekti uudelleen ja varmista, että nimi ja valmiustila säilyivät.
6. Poista toinen tehtävä vahvistuksen kautta. Peruuta ensin ja tarkista, ettei peruuttaminen poista tietoa.

**Odotettu tulos:** tallennettu tehtävä palaa näkyviin sivun lataamisen jälkeen. Samaa tehtävän nimeä saa käyttää eri tehtävissä; kohde valitaan id:n perusteella.

**Tarkistus:** avaa muokkausosa näppäimistöllä, siirry nimikenttään, tallenna Enterillä ja varmista, että kohdistus pysyy samassa tehtävässä. Tehtävän valintaruutua voi vaihtaa välilyönnillä.

**Tavallinen virhe:** muokkaus lähettää tyhjän nimen, vaikka kentässä on tekstiä. Jos käytät `FormData`a, kerää arvot ennen `disabled`-tilaa. Valmis tehtävän muokkausapu lukee kentän `value`-arvon suoraan myös disabled-tilassa. Palvelimen virhe pitää näyttää käyttäjälle. [F13]

### Vaihe D: odotuksen, virheen ja uuden yrityksen kokeilu

1. Avaa Network-näkymä ja ota käyttöön selaimen tarjoama hitaamman yhteyden simulointi, jos se on käytettävissä.
2. Luo tehtävä. Huomaa odotusviesti ja hetkellisesti pois käytöstä olevat kentät sekä painikkeet.
3. Tarkista, että käyttö vapautuu vastauksen jälkeen.
4. Pysäytä oma Deno-palvelimesi sen pääteikkunassa ja yritä tallentaa uusi tehtävä jo avoimella sivulla.
5. Tarkista tekstinä näkyvä yhteysvirhe. Käynnistä palvelin uudelleen ja yritä uudelleen.
6. Palauta selaimen yhteysasetukset normaaliksi kokeilun jälkeen.

**Odotettu tulos:** virhe ei jätä käyttöliittymää pysyvästi estettyyn tilaan. `runAction` vapauttaa kentät `finally`-osassa ja palauttaa kohdistuksen, kun alkuperäinen elementti on edelleen käytettävissä.

**Tarkistus:** `response.ok` on olemassa sekä valmiin `api`-funktion koodissa että omassa pienessä verkkokokeilussasi. Valmiin esimerkin 15 sekunnin aikaraja estää odotustilan jatkumisen loputtomiin. Jos yhteys katkesi tallennushetkellä, lataa sivu ja tarkista tieto ennen samaa tallennusta uudelleen: palvelin saattoi ehtiä tehdä muutoksen, vaikka vastaus ei saapunut selaimeen.

**Tavallinen virhe:** kentät jäävät harmaiksi. Tarkista, että `setBusy(false)` on `finally`-osassa. Vain onnistumisen perässä oleva vapautus ei riitä virhetilanteisiin.

## 3.14 Saavutettavuus kuuluu perustoimintaan

**Saavutettavuus** tarkoittaa tässä, että erilaiset käyttäjät pystyvät havaitsemaan sisällön, ymmärtämään sitä ja käyttämään toimintoja. Käyttäjä voi esimerkiksi suurentaa tekstiä, käyttää näppäimistöä tai kuunnella sivua ruudunlukijalla. **Ruudunlukija** on avustava ohjelma, joka välittää käyttöliittymän rakennetta ja sisältöä puheena tai muuna käyttäjälle sopivana esityksenä. [F11]

**Kohdistus** eli focus kertoo, mihin näppäimistön seuraava toiminto kohdistuu. Pelkkä hiiren osoittimen sijainti ei ole sama asia. `:focus-visible`-tyyli tekee kohdistuksen näkyväksi, kun käyttäjä liikkuu näppäimistöllä. Kohdistusviivaa ei poisteta ilman toimivaa korvaavaa merkkiä. [F18]

**Kontrasti** tarkoittaa tekstin ja taustan välisen vaaleuseron suhdetta. WCAG 2.2:n AA-tason tavallisen tekstin vähimmäiskontrasti on 4,5:1; riittävän suurelle tekstille 3:1. Käytä kontrastin tarkistamiseen mittaavaa työkalua silmämääräisen arvion lisäksi. Tehtävän valmiutta tai virhettä ei välitetä vain värillä: tekstissä kerrotaan ”valmis”, ”kesken” tai virheen syy. [F19]

**Responsiivinen** käyttöliittymä sopeutuu käytettävissä olevaan tilaan. Valmis esimerkki käyttää pienellä näytöllä yhtä saraketta ja suuremmalla kahta. Se ei kiinnitä lomaketta satoja pikselejä leveämmäksi kuin näkymä. Tekstin suurentaminen pitää sallia, eikä viewport-asetuksessa poisteta käyttäjän zoomausmahdollisuutta. [F12]

### Tee nämä kokeet kummallekin frontendille

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

### Käytä oikeaa elementtiä ennen ARIA-lisäyksiä

HTML:n oma `button`, `input`, `label`, `form` ja `details` sisältävät valmiita toimintoja, joihin selaimet ja avustavat teknologiat voivat tukeutua. `div` on yleinen ryhmittelyelementti. Sen ulkoasun muuttaminen painikkeen näköiseksi ei tee siitä automaattisesti näppäimistöllä toimivaa painiketta. [F11]

**ARIA** tarkoittaa lisämerkintöjä, jotka kertovat käyttöliittymän merkityksistä tai tiloista avustaville teknologioille. Esimerkkejä ovat `aria-live`, `aria-labelledby` ja `aria-busy`. Ne eivät automaattisesti toteuta puuttuvaa toiminnallisuutta. `aria-labelledby="projects-title"` nimeää alueen viittaamalla olemassa olevaan otsikkoon, jonka id on `projects-title`. [F8, F16]

**`hidden` ei ole käyttöoikeussuoja.** Se piilottaa käyttöliittymän osan. Tavallinen käyttäjä voi omassa selaimessaan poistaa hidden-attribuutin, jolloin esimerkiksi ylläpidon painike saattaa näkyä. Valmiin sovelluksen palvelin silti estää tavallisen käyttäjän ylläpitopyynnön. Käyttöliittymän näkyvyys ja palvelimen tekemä autorisointi ovat eri asioita.

## 3.15 Harjoitukset tästä eteenpäin

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

## 3.16 Kun jokin ei toimi

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

## 3.17 Lähteet ja tarkistuspäivä

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
