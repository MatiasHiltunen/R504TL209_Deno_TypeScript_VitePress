// Tämä ohjelma toimii kokonaan selaimessa eikä tee fetch-pyyntöjä tai tallenna tiedostoon.
// const antaa muuttujalle nimen; document kuvaa selaimen muodostamaa sivua.
const form = document.querySelector("#task-form");
// #task-title etsii elementin, jonka HTML:n id on task-title.
const titleInput = document.querySelector("#task-title");
// Tähän ul-elementtiin lisätään tehtävien li-elementit.
const list = document.querySelector("#task-list");
// Tilaviestille on oma p-elementtinsä.
const status = document.querySelector("#status");
// Virheviestille on HTML:ssä valmiina role="alert"-alue.
const error = document.querySelector("#error");

// let sallii muuttujan uuden arvon; [] on aluksi tyhjä tehtävätaulukko.
let tasks = [];
// Seuraava uusi tehtävä saa tämän numerotunnisteen.
let nextId = 1;

// Funktio kokoaa useita rivejä yhdeksi nimellä kutsuttavaksi toiminnoksi.
function announce(message) {
  // textContent kirjoittaa tekstin sellaisenaan eikä tulkitse käyttäjän HTML-merkkejä.
  status.textContent = message;
  // Edellisen toiminnon virhe poistetaan onnistumisen yhteydessä.
  error.textContent = "";
}

// render rakentaa näkymän tasks-taulukon tämänhetkisistä tiedoista.
function render(focusId = "task-title") {
  // Poistetaan edellinen lista; ilman argumentteja replaceChildren jättää sen tyhjäksi.
  list.replaceChildren();
  // for...of käy taulukon tehtävät läpi yksi kerrallaan.
  for (const task of tasks) {
    // document.createElement luo uuden HTML-elementin muistiin.
    const item = document.createElement("li");
    // p on tehtävän nimen ja tilan sisältävä tekstikappale.
    const description = document.createElement("p");
    // Kysymysmerkki valitsee kahdesta tekstistä: true antaa valmis, false antaa kesken.
    description.textContent = `${task.title} (${task.done ? "valmis" : "kesken"})`;
    // Luodaan oikea painike tehtävän tilan vaihtamiseen.
    const toggle = document.createElement("button");
    // button-tyyppi tekee toiminnon, joka ei lähetä lomaketta.
    toggle.type = "button";
    // Yksilöllinen id auttaa palauttamaan kohdistuksen listan uudelleenrakennuksen jälkeen.
    toggle.id = `toggle-${task.id}`;
    // Painikkeen näkyvä nimi kertoo toiminnon ja kohteen.
    toggle.textContent = task.done ? `Merkitse keskeneräiseksi: ${task.title}` : `Merkitse valmiiksi: ${task.title}`;
    // addEventListener liittää tapahtumaan suoritettavan funktion.
    toggle.addEventListener("click", () => {
      // Huutomerkki vaihtaa totuusarvon: true muuttuu falseksi ja false trueksi.
      task.done = !task.done;
      // Piirretään muuttunut lista ja palautetaan kohdistus samaan toimintoon.
      render(`toggle-${task.id}`);
      // Ilmoitetaan muutos myös sanoina tilaviestissä.
      announce(task.done ? "Tehtävä merkitty valmiiksi." : "Tehtävä merkitty keskeneräiseksi.");
    });
    // Form antaa jokaiselle tehtävälle oman nimenmuokkauslomakkeen.
    const editForm = document.createElement("form");
    // Lomakkeelle annetaan sen tehtävän nimeen perustuva saavutettava nimi.
    editForm.setAttribute("aria-label", `Muokkaa tehtävää ${task.title}`);
    // Label antaa muokkauskentälle näkyvän nimen.
    const editLabel = document.createElement("label");
    // htmlFor on JavaScriptin nimi HTML:n for-attribuutille.
    editLabel.htmlFor = `edit-${task.id}`;
    // Pakollisuutta ei ilmaista pelkällä värillä tai tähdellä.
    editLabel.textContent = "Tehtävän nimi (pakollinen)";
    // Input kerää muokatun nimen.
    const editInput = document.createElement("input");
    // Id vastaa labelin htmlFor-arvoa.
    editInput.id = `edit-${task.id}`;
    // Text on tavallinen tekstikenttä.
    editInput.type = "text";
    // Name nimeää kentän lomakkeen sisällä.
    editInput.name = "title";
    // Nykyinen tehtävän nimi asetetaan muokattavaksi arvoksi.
    editInput.value = task.title;
    // Required saa selaimen tarkistamaan, ettei kenttä ole tyhjä.
    editInput.required = true;
    // Enintään 200 merkkiä riittää tämän harjoituksen tehtävän nimeen.
    editInput.maxLength = 200;
    // Luodaan muokkauslomakkeen painike.
    const save = document.createElement("button");
    // Submit käynnistää form-elementin submit-tapahtuman myös Enterillä.
    save.type = "submit";
    // Painikkeen nimi kertoo toiminnon.
    save.textContent = "Tallenna nimi";
    // Kuunnellaan juuri tämän tehtävän lomakkeen lähetystä.
    editForm.addEventListener("submit", (event) => {
      // Estetään selaimen oletuslähetys, joka lataisi sivun ja tyhjentäisi muistimme.
      event.preventDefault();
      // value lukee kentän tekstin; trim poistaa vahingossa syötetyt reunavälilyönnit.
      const newTitle = editInput.value.trim();
      // Pelkät välilyönnit eivät ole kelvollinen nimi.
      if (newTitle.length === 0) {
        // Virhe kerrotaan tekstinä olemassa olevassa alert-alueessa.
        error.textContent = "Kirjoita tehtävän nimi. Pelkät välilyönnit eivät riitä.";
        // Kohdistetaan kenttä, joka käyttäjän täytyy korjata.
        editInput.focus();
        // Return lopettaa tämän käsittelijän ennen tallennusta.
        return;
      }
      // Päivitetään olemassa olevan tehtäväolion title-ominaisuus.
      task.title = newTitle;
      // Rakennetaan päivitetty lista ja kohdistetaan saman tehtävän uusi kenttä.
      render(`edit-${task.id}`);
      // Kerrotaan, että muutos on tehty tämän välilehden muistissa.
      announce("Tehtävän nimi muutettu selaimen muistissa.");
    });
    // Lisätään lomakkeeseen label, kenttä ja tallennuspainike tässä järjestyksessä.
    editForm.append(editLabel, editInput, save);
    // Luodaan poistopainike.
    const remove = document.createElement("button");
    // Painike ei ole lomakkeen lähetyspainike.
    remove.type = "button";
    // Tehtävän nimi erottaa tämän poistopainikkeen muista.
    remove.textContent = `Poista tehtävä: ${task.title}`;
    // Liitetään poistoon click-tapahtuman käsittelijä.
    remove.addEventListener("click", () => {
      // globalThis viittaa selaimen yleiseen ympäristöön; confirm palauttaa false, jos käyttäjä peruuttaa.
      if (!globalThis.confirm(`Poistetaanko tehtävä ”${task.title}”?`)) return;
      // Filter tekee uuden taulukon, jossa ovat vain muut tunnisteet kuin poistettava.
      tasks = tasks.filter((oldTask) => oldTask.id !== task.id);
      // Poistettua painiketta ei enää ole; oletuskohdistus siirtyy uuden tehtävän kenttään.
      render();
      // Myös tyhjäksi tullut lista saa sanallisen tilan.
      announce(tasks.length === 0 ? "Tehtävä poistettu. Lista on nyt tyhjä." : "Tehtävä poistettu.");
    });
    // Kootaan yhden tehtävän osat li-elementtiin.
    item.append(description, toggle, editForm, remove);
    // Lisätään valmis li näkyvälle sivulle ul-elementin lapseksi.
    list.append(item);
  }
  // Haku löytää saman id:n myös juuri rakennetusta uudesta näkymästä.
  const focused = document.getElementById(focusId);
  // Ehto estää focus-kutsun, jos elementtiä ei löytyisi.
  if (focused) focused.focus();
}

// Lomakkeen submit toimii painikkeella sekä Enter-näppäimellä.
form.addEventListener("submit", (event) => {
  // Oletuslähetyksen estäminen pitää harjoituksen samalla sivulla.
  event.preventDefault();
  // Luetaan käyttäjän teksti ja poistetaan turhat reunavälit.
  const title = titleInput.value.trim();
  // Selain estää tyhjän kentän; tässä tarkistetaan lisäksi pelkät välilyönnit.
  if (title.length === 0) {
    // Kerrotaan täsmällinen korjausohje tekstinä.
    error.textContent = "Kirjoita tehtävän nimi. Pelkät välilyönnit eivät riitä.";
    // Palautetaan näppäimistön kohdistus korjattavaan kenttään.
    titleInput.focus();
    // Lopetetaan käsittelijä lisäämättä tehtävää.
    return;
  }
  // Push lisää olion taulukkoon; olion id, title ja done ovat tehtävän ominaisuuksia.
  tasks.push({ id: nextId, title, done: false });
  // Seuraavaa tehtävää varten kasvatetaan tunnistetta yhdellä.
  nextId = nextId + 1;
  // Reset tyhjentää lomakkeen takaisin HTML:n alkuarvoihin.
  form.reset();
  // Näytetään muuttunut lista ja kohdistetaan kenttä seuraavaa tehtävää varten.
  render();
  // Tilaviesti kertoo sekä onnistumisesta että listan määrästä.
  announce(`Tehtävä lisätty. Tehtäviä yhteensä ${tasks.length}.`);
});
