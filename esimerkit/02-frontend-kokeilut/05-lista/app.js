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
