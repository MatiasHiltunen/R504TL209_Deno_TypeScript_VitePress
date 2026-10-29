---
outline: false
---

# esimerkit/02-frontend-kokeilut/02-tyylit/index.html

**Ryhmä:** Frontendin pienet kokeilut.

Tiedoston sijainti puretussa projektissa on `esimerkit/02-frontend-kokeilut/02-tyylit/index.html`. Kopioi koko sisältö kommentteineen tähän tiedostoon. Suorituskomennot ja odotettu tulos ovat asianomaisessa tutoriaaliluvussa.

[Lataa lähdekoodi tekstinä](/koodit/esimerkit/02-frontend-kokeilut/02-tyylit/index.html.txt) · [Palaa koodipankkiin](/koodipankki/)

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
