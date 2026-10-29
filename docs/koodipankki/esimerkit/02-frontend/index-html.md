---
outline: false
---

# esimerkit/02-frontend/index.html

**Ryhmä:** Frontend selaimen muistissa.

Tiedoston sijainti puretussa projektissa on `esimerkit/02-frontend/index.html`. Kopioi koko sisältö kommentteineen tähän tiedostoon. Suorituskomennot ja odotettu tulos ovat asianomaisessa tutoriaaliluvussa.

[Lataa lähdekoodi tekstinä](/koodit/esimerkit/02-frontend/index.html.txt) · [Palaa koodipankkiin](/koodipankki/)

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
