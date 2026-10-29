---
outline: false
---

# esimerkit/02-frontend-kokeilut/03-painike/app.js

**Ryhmä:** Frontendin pienet kokeilut.

Tiedoston sijainti puretussa projektissa on `esimerkit/02-frontend-kokeilut/03-painike/app.js`. Kopioi koko sisältö kommentteineen tähän tiedostoon. Suorituskomennot ja odotettu tulos ovat asianomaisessa tutoriaaliluvussa.

[Lataa lähdekoodi tekstinä](/koodit/esimerkit/02-frontend-kokeilut/03-painike/app.js.txt) · [Palaa koodipankkiin](/koodipankki/)

````js
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
````
