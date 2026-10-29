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
