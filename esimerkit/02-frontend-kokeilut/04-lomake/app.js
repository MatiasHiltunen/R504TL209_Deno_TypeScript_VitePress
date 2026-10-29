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
