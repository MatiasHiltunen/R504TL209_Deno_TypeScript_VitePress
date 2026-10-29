---
outline: false
---

# esimerkit/02-frontend-kokeilut/05-lista/index.html

**Ryhmä:** Frontendin pienet kokeilut.

Tiedoston sijainti puretussa projektissa on `esimerkit/02-frontend-kokeilut/05-lista/index.html`. Kopioi koko sisältö kommentteineen tähän tiedostoon. Suorituskomennot ja odotettu tulos ovat asianomaisessa tutoriaaliluvussa.

[Lataa lähdekoodi tekstinä](/koodit/esimerkit/02-frontend-kokeilut/05-lista/index.html.txt) · [Palaa koodipankkiin](/koodipankki/)

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
