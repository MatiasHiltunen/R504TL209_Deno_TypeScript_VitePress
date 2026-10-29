// Tämä tiedosto on selaimen JavaScriptiä. Backendin TypeScript suoritetaan erikseen Denossa.
// Tiukka tila auttaa huomaamaan esimerkiksi vahingossa luodut nimeämättömät muuttujat.
"use strict";

// state on olio: yhteen nimettyyn kokonaisuuteen kerätään käyttöliittymän tämänhetkiset tiedot.
const state = {
  // null tarkoittaa, ettei kirjautunutta käyttäjää ole vielä tiedossa.
  user: null,
  // Tyhjä taulukko [] pitää myöhemmin sisällään palvelimen palauttamat projektit.
  projects: [],
  // Tähän taulukkoon ladataan vain valitun projektin tehtävät.
  tasks: [],
  // Valitun projektin kokonaislukutunniste tallennetaan tähän; aluksi valintaa ei ole.
  selectedProjectId: null,
  // busy kertoo, odotetaanko verkkopyynnön valmistumista.
  busy: false,
};

// ui-olion ominaisuuksiin tallennetaan viittaukset HTML-elementteihin.
const ui = {
  // querySelector etsii CSS-valitsimella; # tarkoittaa HTML:n id-attribuuttia.
  status: document.querySelector("#status"),
  // Virheviesti näytetään tekstinä tässä jo HTML:ssä olevassa alert-alueessa.
  error: document.querySelector("#error"),
  // Tämä alue sisältää kirjautumisen ja rekisteröinnin.
  auth: document.querySelector("#auth-section"),
  // Kirjautumislomakkeeseen liitetään myöhemmin submit-kuuntelija.
  login: document.querySelector("#login-form"),
  // Rekisteröintilomakkeella on oma kuuntelijansa.
  register: document.querySelector("#register-form"),
  // Työtila näytetään vasta onnistuneen tunnistautumisen jälkeen.
  workspace: document.querySelector("#workspace"),
  // Tähän tulostetaan kirjautuneen käyttäjän sähköpostiosoite.
  account: document.querySelector("#account-email"),
  // Uloskirjautumispainike päättää palvelimen istunnon.
  logout: document.querySelector("#logout-button"),
  // Projektin luontilomake pitää sisällään uuden nimen.
  projectCreate: document.querySelector("#project-create-form"),
  // Projektirivit lisätään tähän ul-listaan.
  projectList: document.querySelector("#project-list"),
  // Tyhjän projektilistan ohje voidaan näyttää ja piilottaa.
  projectEmpty: document.querySelector("#project-empty"),
  // Valitun projektin sisältö on omassa osiossaan.
  detail: document.querySelector("#project-detail"),
  // Otsikko päivittyy valitun projektin nimen mukaan.
  projectTitle: document.querySelector("#project-title"),
  // Tämä lomake muuttaa olemassa olevan projektin nimeä.
  projectRename: document.querySelector("#project-rename-form"),
  // Tämä painike poistaa valitun projektin kaikkine tehtävineen.
  projectDelete: document.querySelector("#project-delete-button"),
  // Tehtävän luontilomake kuuluu aina valittuun projektiin.
  taskCreate: document.querySelector("#task-create-form"),
  // Tehtävärivit lisätään tähän ul-listaan.
  taskList: document.querySelector("#task-list"),
  // Tässä kerrotaan tehtävien määrä tai tyhjän listan ohje.
  taskSummary: document.querySelector("#task-summary"),
  // Ylläpidon alue piilotetaan tavalliselta käyttäjältä käytettävyyden vuoksi.
  admin: document.querySelector("#admin-section"),
  // Tämä painike pyytää palvelimelta käyttöoikeuksilla suojatun koosteen.
  statsButton: document.querySelector("#stats-button"),
  // Kooste näytetään tekstinä tässä kappaleessa.
  statsOutput: document.querySelector("#stats-output"),
};

// Funktio on nimetty toimintokokonaisuus; message-parametri saa kutsujan antaman tekstin.
function announce(message) {
  // textContent käsittelee sisällön tekstinä, joten käyttäjän syöte ei muutu HTML-koodiksi.
  ui.status.textContent = message;
  // Uusi tilaviestintä poistaa edellisen toiminnon virheen.
  ui.error.textContent = "";
}

// Näytetään käyttäjälle ymmärrettävä virhe ilman palvelimen sisäisten tietojen lisäämistä.
function showError(error) {
  // Verkkovirhe ja vääränmuotoinen vastaus erotetaan API:n tarkoituksellisesta virhetekstistä.
  let message = error instanceof Error ? error.message : "Tuntematon virhe. Yritä uudelleen.";
  // TypeError syntyy fetchissä esimerkiksi verkkoyhteyden puuttuessa.
  if (error instanceof TypeError) {
    // Teknisen virhetekstin sijaan kerrotaan mitä käyttäjä voi tarkistaa.
    message = "Palvelimeen ei saatu yhteyttä. Tarkista, että Deno-palvelin on käynnissä, ja yritä uudelleen.";
  }
  // JSON-jäsennyksen virhe kertoo, ettei palvelin palauttanut sovittua tietomuotoa.
  if (error instanceof SyntaxError) {
    // Tämän harjoituksen käyttäjä voi yrittää latausta uudelleen.
    message = "Palvelimen vastausta ei voitu lukea. Lataa sivu uudelleen.";
  }
  // Aikarajan ylitys saa oman selkokielisen viestinsä.
  if (error instanceof Error && (error.name === "AbortError" || error.name === "TimeoutError")) {
    // Pyyntö saattoi jo ehtiä palvelimelle; ensin tarkistetaan tämänhetkinen tieto.
    message = "Palvelin vastasi liian hitaasti. Lataa sivu uudelleen ja tarkista tiedot ennen uutta tallennusta.";
  }
  // Tila-alue ei jää virhetilanteessa näyttämään odottamista.
  ui.status.textContent = "Toiminto ei valmistunut normaalisti.";
  // Virhe ilmoitetaan näkyvänä tekstinä sekä HTML:n role="alert"-alueella.
  ui.error.textContent = `Virhe: ${message}`;
}

// Odotustila ehkäisee saman lomakkeen tahattomat kaksoislähetykset.
function setBusy(busy) {
  // Tallennetaan true- tai false-arvo yhteiseen tilaan.
  state.busy = busy;
  // querySelectorAll palauttaa kaikki painikkeet ja kentät; forEach käy ne yksitellen läpi.
  document.querySelectorAll("button, input").forEach((control) => {
    // disabled estää toiminnon odotuksen ajaksi; false palauttaa käytön.
    control.disabled = busy;
  });
  // ARIA-attribuutti odottaa tekstiä, joten String muuttaa totuusarvon tekstiksi.
  ui.workspace.setAttribute("aria-busy", String(busy));
  // Myös tunnistautumisalue kertoo avustavalle teknologialle odottamisesta.
  ui.auth.setAttribute("aria-busy", String(busy));
}

// Kohdistetaan olemassa oleva elementti; tätä kutsutaan vasta kun disabled on poistettu.
function focusId(id) {
  // Etsitään elementti sen yksilöivällä id-arvolla.
  const element = document.getElementById(id);
  // Ehto estää puuttuvan elementin käytön.
  if (element) {
    // focus siirtää näppäimistön kohdistuksen tähän kohteeseen.
    element.focus();
  }
}

// async-funktio voi odottaa verkkopyyntöä; oletusmenetelmä on tietoa lukeva GET.
async function api(path, method = "GET", body = undefined) {
  // Headers kokoaa pyynnön otsakkeet; Accept pyytää JSON-muotoista vastausta.
  const headers = new Headers({ Accept: "application/json" });
  // Vain tietoja muuttavat pyynnöt tarvitsevat tässä JSON-rungon.
  if (method !== "GET") {
    // Palvelin edellyttää kirjoituksilta tätä tyyppiä myös CSRF-suojauksensa osana.
    headers.set("Content-Type", "application/json");
  }
  // AbortController osaa keskeyttää tämän yhden verkkopyynnön.
  const controller = new AbortController();
  // setTimeout kutsuu keskeytystä 15 sekunnin päästä, jos vastausta ei ehdi tulla.
  const timeout = setTimeout(() => controller.abort(), 15000);
  // finally-osio vapauttaa ajastimen riippumatta siitä, onnistuuko pyyntö.
  try {
    // fetch lähettää pyynnön; await odottaa vastausta estämättä koko selaimen käyttöä.
    const response = await fetch(path, {
      // method on esimerkiksi GET, POST, PATCH tai DELETE.
      method,
      // Lähetetään samalle alkuperälle kuuluva istuntoeväste automaattisesti.
      credentials: "same-origin",
      // Käyttäjäkohtaisia API-vastauksia ei haeta selaimen HTTP-välimuistista.
      cache: "no-store",
      // Liitetään yllä koottu otsakeolio pyyntöön.
      headers,
      // GETillä ei ole runkoa; muulloin JSON.stringify muuttaa olion siirrettäväksi tekstiksi.
      body: method === "GET" ? undefined : JSON.stringify(body ?? {}),
      // Liitetään pyynnön keskeytysmahdollisuus tähän fetchiin.
      signal: controller.signal,
    });
    // 204 tarkoittaa onnistumista ilman runkoa; muut vastaukset luetaan JSONina.
    const payload = response.status === 204 ? null : await response.json();
    // fetch ei itsessään pidä HTTP 400/401/403/404/500 -vastauksia verkkovirheinä.
    if (!response.ok) {
      // Palvelimen turvallinen error-teksti otetaan mukaan, jos se on olemassa.
      const error = new Error(payload?.error ?? `Pyyntö epäonnistui (HTTP ${response.status}).`);
      // Tallennetaan status virheen ominaisuudeksi, jotta 401 voidaan käsitellä erikseen.
      error.status = response.status;
      // throw siirtää käsittelyn lähimpään catch-lohkoon.
      throw error;
    }
    // return antaa palvelimen tiedot funktiota odottavalle kutsujalle.
    return payload;
  } finally {
    // Ajastin poistetaan myös virheessä, ettei se jää turhaan odottamaan.
    clearTimeout(timeout);
  }
}

// Tämä apufunktio hoitaa kaikille käyttöliittymätoiminnoille yhteisen odotus- ja virhetilan.
async function runAction(loadingMessage, action) {
  // Jo käynnissä olevan toiminnon aikana ei aloiteta toista.
  if (state.busy) return false;
  // Tallennetaan kohdistettu elementti ennen kuin disabled voisi siirtää kohdistuksen pois siitä.
  const focusedBefore = document.activeElement;
  // Estetään painikkeet ja kentät odotuksen ajaksi.
  setBusy(true);
  // Kerrotaan näkyvästi, mitä juuri nyt odotetaan.
  announce(loadingMessage);
  // try tarkoittaa, että seuraavan toiminnon virheet käsitellään catchissa.
  try {
    // action on kutsujan antama funktio; await odottaa myös sen sisäiset verkkopyynnöt.
    await action();
    // true kertoo tapahtumankäsittelijälle onnistumisesta.
    return true;
  } catch (error) {
    // 401 kirjautuneena tarkoittaa esimerkiksi vanhentunutta tai toisessa välilehdessä poistettua istuntoa.
    if (error.status === 401 && state.user !== null) {
      // Poistetaan vanhat käyttäjätiedot näkymästä ja näytetään kirjautuminen.
      showGuest();
      // Kerrotaan uudelleenkirjautumisen tarve.
      error.message = "Kirjautuminen on vanhentunut. Kirjaudu uudelleen.";
    }
    // Virhe tulee sivulle, jotta pelkkää kehittäjäkonsolia ei tarvitse osata lukea.
    showError(error);
    // false kertoo käsittelijälle, ettei sen pidä näyttää onnistumista.
    return false;
  } finally {
    // Lomakkeet vapautetaan sekä onnistumisen että virheen jälkeen.
    setBusy(false);
    // Palautetaan kohdistus, jos alkuperäinen elementti on yhä näkyvän näkymän DOMissa.
    if (focusedBefore instanceof HTMLElement && focusedBefore.isConnected && !focusedBefore.closest("[hidden]")) {
      // Varsinainen käsittelijä voi tämän jälkeen kohdistaa uuteen onnistumisen kohteeseen.
      focusedBefore.focus();
    } else if (state.user === null) {
      // Vanhentunut istunto saattoi piilottaa vanhan kohteen; tällöin tarjotaan kirjautumiskenttä.
      focusId("login-email");
    }
  }
}

// Luetaan lomakkeelta nimikenttä ja tarkistetaan tavallinen kirjoitusvirhe jo selaimessa.
function readTitle(form, maximum) {
  // elements.namedItem löytää lomakkeen name="title"-kentän myös disabled-tilassa; value lukee sen tekstin ja trim poistaa reunavälit.
  const title = form.elements.namedItem("title").value.trim();
  // Array.from laskee Unicode-koodipisteet kuten backend; tavallinen .length laskisi UTF-16-yksiköt ja esimerkiksi 😀 kahdesti.
  const length = Array.from(title).length;
  // Tyhjäksi jäänyt tai liian pitkä nimi pysäyttää toiminnon.
  if (length === 0 || length > maximum) {
    // Palvelin tarkistaa saman asian uudelleen, koska selaimen tarkistuksen voi ohittaa.
    throw new Error(`Nimen pitää sisältää 1–${maximum} merkkiä. Pelkät välilyönnit eivät riitä.`);
  }
  // Palautetaan siistitty nimi kutsujalle.
  return title;
}

// Kirjautumaton näkymä tyhjentää myös edellisen käyttäjän selaimeen ladatut tiedot.
function showGuest() {
  // Tunnistautuneen käyttäjän tietoa ei enää säilytetä.
  state.user = null;
  // Projektit poistetaan muistista; tietokantaan ei tehdä tässä muutoksia.
  state.projects = [];
  // Myös ladatut tehtävät poistetaan muistista.
  state.tasks = [];
  // Valinta puretaan.
  state.selectedProjectId = null;
  // Tunnistautumislomakkeet näytetään.
  ui.auth.hidden = false;
  // Kirjautuneen työtila piilotetaan.
  ui.workspace.hidden = true;
  // Ylläpitonäkymä piilotetaan varmuuden vuoksi erikseen.
  ui.admin.hidden = true;
  // Näkyvästä otsikkorivistä poistetaan edellisen käyttäjän osoite.
  ui.account.textContent = "";
  // Tyhjennetään molempien lomakkeiden syötetyt arvot, myös salasanat.
  ui.login.reset();
  // Rekisteröintilomakkeen salasanakin tyhjennetään.
  ui.register.reset();
  // Tilastot eivät jää seuraavan kirjautujan selaintilaan.
  ui.statsOutput.textContent = "Lukumääriä ei ole vielä haettu.";
  // Piirretään tyhjentyneet projektit ja poistetaan tehtävien näkyvä sisältö.
  renderProjects();
  // Valinnan puute piilottaa projektin yksityiskohdat ja tyhjentää tehtävälistan.
  renderProjectDetail();
}

// Näytetään palvelimen vahvistaman käyttäjän työtila.
function showWorkspace(user) {
  // Käyttäjän id, email ja role tulivat palvelimen vastauksesta.
  state.user = user;
  // Tunnistautumislomakkeita ei tarvita kirjautuneessa näkymässä.
  ui.auth.hidden = true;
  // Oman työtilan sisältö voidaan nyt näyttää.
  ui.workspace.hidden = false;
  // Näytetään osoite tekstinä; mahdollinen HTML-merkistö ei suorita koodia.
  ui.account.textContent = `Kirjautunut: ${user.email}`;
  // Roolitieto ohjaa vain näkymää; palvelin tarkistaa ylläpito-oikeuden jokaisella pyynnöllä.
  ui.admin.hidden = user.role !== "admin";
  // Salasanaa ei jätetä kirjautumislomakkeeseen onnistumisen jälkeen.
  ui.login.reset();
  // Myös rekisteröintilomakkeen salasana tyhjennetään.
  ui.register.reset();
}

// Ladataan projektit vasta tunnistautumisen jälkeen.
async function loadProjects() {
  // GET hakee tiedot muuttamatta niitä.
  const result = await api("/api/projects");
  // Palvelimen projects-ominaisuus sisältää käyttäjän omat projektit.
  state.projects = result.projects;
  // Täytetään lista ladatuilla tiedoilla.
  renderProjects();
}

// Piirtäminen tarkoittaa tässä HTML-elementtien päivittämistä state-olion tiedoista.
function renderProjects() {
  // replaceChildren ilman argumentteja poistaa vanhat listarivit turvallisesti.
  ui.projectList.replaceChildren();
  // Tyhjän listan ohje näkyy vain, kun projektitaulukon pituus on nolla.
  ui.projectEmpty.hidden = state.projects.length !== 0;
  // for...of toistaa lohkon jokaiselle taulukon projektille.
  for (const project of state.projects) {
    // Luodaan listan yksi li-elementti muistiin.
    const item = document.createElement("li");
    // Luodaan oikea painike, jolla on selaimen valmiit näppäimistöominaisuudet.
    const button = document.createElement("button");
    // Painike ei lähetä lomaketta.
    button.type = "button";
    // Yksilöllinen id mahdollistaa kohdistuksen palauttamisen uudelleenpiirron jälkeen.
    button.id = `project-button-${project.id}`;
    // secondary käyttää CSS:n vaaleaa painiketyyliä.
    button.className = "secondary";
    // Verrataan numerotunnisteita; === ei muuta arvojen tietotyyppejä.
    const selected = project.id === state.selectedProjectId;
    // Valinta kerrotaan avustavalle teknologialle tekstiarvona.
    button.setAttribute("aria-current", String(selected));
    // Myös näkyvä teksti kertoo valitun projektin; käyttäjän nimi tulostetaan turvallisesti.
    button.textContent = selected ? `${project.title} (valittu)` : `Avaa projekti: ${project.title}`;
    // Uusikin painike noudattaa parhaillaan voimassa olevaa odotustilaa.
    button.disabled = state.busy;
    // Nuolifunktio käynnistää projektin avaamisen vasta click-tapahtuman tullessa.
    button.addEventListener("click", () => selectProject(project.id));
    // Lisätään painike li-elementin lapseksi.
    item.append(button);
    // Lisätään valmis li sivulla olevaan ul-listaan.
    ui.projectList.append(item);
  }
}

// Avaa projekti hakemalla sen tehtävät palvelimelta.
async function selectProject(projectId) {
  // runAction kertoo odottamisesta ja ottaa kiinni mahdollisen virheen.
  const success = await runAction("Ladataan projektin tehtäviä…", async () => {
    // Numerotunniste liitetään API:n polkuun; palvelin tarkistaa omistajuuden.
    const result = await api(`/api/projects/${projectId}/tasks`);
    // Valinta muutetaan vasta onnistuneen haun jälkeen.
    state.selectedProjectId = projectId;
    // Aiemman projektin tehtävät korvataan uudella listalla.
    state.tasks = result.tasks;
    // Päivitetään projektipainikkeiden valintamerkinnät.
    renderProjects();
    // Täytetään projektin nimi ja tehtävät.
    renderProjectDetail();
    // Onnistuminen kerrotaan myös ruudunlukijan tilaviestinä.
    announce("Projekti avattu. Voit lisätä, muokata ja poistaa sen tehtäviä.");
  });
  // Onnistumisen jälkeen kohdistus siirtyy uuteen sisältöön, virheessä takaisin avauspainikkeeseen.
  focusId(success ? "project-title" : `project-button-${projectId}`);
}

// Päivitetään valitun projektin kortti.
function renderProjectDetail() {
  // find palauttaa ensimmäisen ehdon täyttävän projektin tai undefined-arvon.
  const project = state.projects.find((item) => item.id === state.selectedProjectId);
  // Jos projektia ei ole valittu, korttia ei näytetä.
  if (!project) {
    // hidden poistaa kortin myös näppäimistön kohdistusjärjestyksestä.
    ui.detail.hidden = true;
    // Vanhoja tehtäviä ei jätetä piilotettuun DOMiin.
    ui.taskList.replaceChildren();
    // Vanhasta projektista ei säilytetä nimeä kentässä.
    document.querySelector("#project-name").value = "";
    // Myös piilotettu otsikko palautetaan lähtötilaan.
    ui.projectTitle.textContent = "Valitse projekti";
    // return päättää tämän funktion suorittamisen tähän.
    return;
  }
  // Valitun projektin kortti tuodaan näkyviin.
  ui.detail.hidden = false;
  // Nimi asetetaan otsikkoon tekstinä.
  ui.projectTitle.textContent = project.title;
  // value asettaa syötekentän nykyisen arvon; se ei tulkitse HTML-koodia.
  document.querySelector("#project-name").value = project.title;
  // Piirretään juuri tälle projektille ladatut tehtävät.
  renderTasks();
}

// Piirretään tehtävälista; openTaskId kertoo mahdollisen muokkausosan, jonka haluamme pitää auki.
function renderTasks(openTaskId = null) {
  // Poistetaan vanhat rivit ennen uuden listan rakentamista.
  ui.taskList.replaceChildren();
  // filter tekee uuden taulukon vain valmiista tehtävistä; length kertoo niiden määrän.
  const completed = state.tasks.filter((task) => task.done).length;
  // Tyhjä tila saa oman toimintaan ohjaavan tekstinsä.
  ui.taskSummary.textContent = state.tasks.length === 0
    // Kolmioperaattorin ?-haara käytetään, kun tehtäviä ei ole.
    ? "Projektilla ei vielä ole tehtäviä. Lisää ensimmäinen tehtävä yllä."
    // :-haara kertoo olemassa olevien ja valmiiden tehtävien määrät.
    : `Tehtäviä yhteensä ${state.tasks.length}. Valmiita ${completed}.`;
  // Jokainen tehtävä muutetaan omaksi saavutettavaksi listarivikseen.
  for (const task of state.tasks) {
    // Luodaan yksi tehtävän li-elementti.
    const item = document.createElement("li");
    // className yhdistää tehtävärivin CSS:n tyyliin.
    item.className = "task-item";
    // div ryhmittelee valintaruudun ja sen näkyvän nimen.
    const toggleRow = document.createElement("div");
    // Tämä luokka asettelee valintaruudun nimen viereen.
    toggleRow.className = "task-toggle";
    // Luodaan selaimen oma input-elementti.
    const checkbox = document.createElement("input");
    // checkbox-tyyppi toimii hiirellä sekä välilyöntinäppäimellä.
    checkbox.type = "checkbox";
    // Jokaiselle tehtävälle muodostetaan yksilöllinen valintaruudun tunniste.
    checkbox.id = `task-done-${task.id}`;
    // checked kuvaa totuusarvona, onko valintaruutu valittu.
    checkbox.checked = task.done;
    // Vastaluotu valintaruutu noudattaa odotustilaa.
    checkbox.disabled = state.busy;
    // label on ruudun näkyvä ja ohjelmallisesti yhdistetty nimi.
    const label = document.createElement("label");
    // htmlFor vastaa HTML:n for-attribuuttia ja yhdistyy checkboxin id:hen.
    label.htmlFor = checkbox.id;
    // Tilan nimi kerrotaan sanoin; sisältö käsitellään tavallisena tekstinä.
    label.textContent = `${task.title} (${task.done ? "valmis" : "kesken"})`;
    // Muutoskuuntelija suoritetaan, kun käyttäjä vaihtaa valintaruudun tilaa.
    checkbox.addEventListener("change", async () => {
      // Otetaan käyttäjän pyytämä uusi tila talteen ennen verkkopyyntöä.
      const requestedDone = checkbox.checked;
      // PATCH muuttaa vain sovittua done-ominaisuutta.
      const success = await runAction("Tallennetaan tehtävän tilaa…", async () => {
        // Lähetetään palvelimelle uusi totuusarvo JSON-oliona.
        const result = await api(`/api/tasks/${task.id}`, "PATCH", { done: requestedDone });
        // map käy tehtävät läpi ja korvaa vain muuttuneen tehtävän palvelimen vastauksella.
        state.tasks = state.tasks.map((oldTask) => oldTask.id === task.id ? result.task : oldTask);
        // Piirretään vahvistettu tila palvelimen tiedoista.
        renderTasks();
        // Ilmoitetaan uusi tila nimeltä.
        announce(result.task.done ? "Tehtävä merkitty valmiiksi." : "Tehtävä merkitty keskeneräiseksi.");
      });
      // Virheessä palautetaan alkuperäinen ruutu palvelimen viimeksi vahvistamaan tilaan.
      if (!success) checkbox.checked = task.done;
      // Uudelleenpiirto loi uuden elementin, joten kohdistus etsitään vakaalla id:llä.
      focusId(`task-done-${task.id}`);
    });
    // Valintaruutu ja nimi lisätään samaan ryhmään.
    toggleRow.append(checkbox, label);
    // details tekee muokkauksesta selaimen omilla toiminnoilla avattavan osion.
    const details = document.createElement("details");
    // Aiemmin muokattu tehtävä pidetään tarvittaessa avoinna.
    details.open = task.id === openTaskId;
    // summary on avattavan osion näppäimistöllä toimiva otsikko.
    const summary = document.createElement("summary");
    // Tehtävän nimi erottaa tämän toiminnon muiden tehtävien toiminnoista.
    summary.textContent = `Muokkaa tai poista: ${task.title}`;
    // form mahdollistaa muokatun nimen lähettämisen myös Enterillä.
    const form = document.createElement("form");
    // Lomakkeelle annetaan sitä kuvaava saavutettava nimi.
    form.setAttribute("aria-label", `Muokkaa tehtävää ${task.title}`);
    // Kentän nimi on oma label-elementtinsä.
    const nameLabel = document.createElement("label");
    // Label yhdistetään kohta luotavaan nimikenttään.
    nameLabel.htmlFor = `task-name-${task.id}`;
    // Pakollisuus ilmaistaan sanallisesti.
    nameLabel.textContent = "Tehtävän uusi nimi (pakollinen)";
    // input kerää tehtävän uuden nimen.
    const input = document.createElement("input");
    // text on tavallinen yhden rivin tekstikenttä.
    input.type = "text";
    // Yksilöllinen id yhdistää kentän labeliin ja kohdistukseen.
    input.id = `task-name-${task.id}`;
    // name on avain, jolla FormData hakee kentän arvon.
    input.name = "title";
    // Selain tarkistaa, että kenttä on täytetty.
    input.required = true;
    // Pituus tarkistetaan readTitle-funktiossa koodipisteinä; HTML:n maxLength käyttäisi erilaista UTF-16-laskentaa.
    // Nykyinen nimi näytetään muokattavana arvona.
    input.value = task.title;
    // Myös tämä kenttä noudattaa yhteistä odotustilaa.
    input.disabled = state.busy;
    // Luodaan tallennuspainike.
    const save = document.createElement("button");
    // submit käynnistää tätä lomaketta kuuntelevan käsittelijän.
    save.type = "submit";
    // Toissijainen tyyli erottaa muokkauksen uuden tehtävän luomisesta.
    save.className = "secondary";
    // Näkyvä teksti kertoo suoraan toiminnon.
    save.textContent = "Tallenna tehtävän nimi";
    // Uusi painike pysyy odotuksessa estettynä.
    save.disabled = state.busy;
    // Lomakkeen submit-tapahtuma kokoaa tallentamisen yhteen paikkaan.
    form.addEventListener("submit", async (event) => {
      // Estetään selaimen oletustoiminto, joka lataisi sivun uudelleen.
      event.preventDefault();
      // Hoidetaan odotus ja virhe yhteisellä apufunktiolla.
      const success = await runAction("Tallennetaan tehtävän nimeä…", async () => {
        // readTitle tarkistaa nimen; palvelimelle lähetetään vain title-ominaisuus.
        const result = await api(`/api/tasks/${task.id}`, "PATCH", { title: readTitle(form, 200) });
        // Korvataan muokattu tehtävä palvelimen vahvistamalla tiedolla.
        state.tasks = state.tasks.map((oldTask) => oldTask.id === task.id ? result.task : oldTask);
        // Pidetään tämän tehtävän muokkausosa auki uudelleenpiirrossa.
        renderTasks(task.id);
        // Ilmoitetaan tallennuksen onnistumisesta.
        announce("Tehtävän nimi tallennettu.");
      });
      // Onnistumisen jälkeen kohdistetaan uusi samanniminen kenttä.
      if (success) focusId(`task-name-${task.id}`);
    });
    // Lomakkeen elementit lisätään siinä järjestyksessä kuin niitä luetaan ja käytetään.
    form.append(nameLabel, input, save);
    // Luodaan tehtävän poistopainike.
    const remove = document.createElement("button");
    // button estää tahattoman lomakelähetyksen.
    remove.type = "button";
    // danger valitsee poistamisen punaisen ulkoasun.
    remove.className = "danger";
    // Nimi erottaa poistotoiminnot myös ruudunlukijan painikelistassa.
    remove.textContent = `Poista tehtävä: ${task.title}`;
    // Poistoa ei voi aloittaa kesken toisen pyynnön.
    remove.disabled = state.busy;
    // Poistaminen käynnistyy painikkeen click-tapahtumasta.
    remove.addEventListener("click", async () => {
      // globalThis viittaa selaimen yleiseen ympäristöön; confirm avaa sen oman poistovahvistuksen.
      if (!globalThis.confirm(`Poistetaanko tehtävä ”${task.title}”? Tätä ei voi perua.`)) return;
      // Varsinainen DELETE tehdään vasta myönteisen vahvistuksen jälkeen.
      const success = await runAction("Poistetaan tehtävää…", async () => {
        // api lisää DELETEen Content-Type-otsakkeen ja tyhjän JSON-rungon.
        await api(`/api/tasks/${task.id}`, "DELETE");
        // filter säilyttää kaikki muut kuin juuri poistetun tehtävän.
        state.tasks = state.tasks.filter((oldTask) => oldTask.id !== task.id);
        // Päivitetään lista sekä tyhjä tila tai lukumäärä.
        renderTasks();
        // Poiston onnistuminen kerrotaan tekstinä.
        announce("Tehtävä poistettu.");
      });
      // Poistettu painike ei enää ole sivulla; siirretään kohdistus uuden tehtävän kenttään.
      if (success) focusId("new-task-title");
    });
    // Div ryhmittelee poistopainikkeen omaan toimintoriviinsä.
    const actions = document.createElement("div");
    // task-actions antaa riville joustavan asettelun.
    actions.className = "task-actions";
    // Liitetään poistopainike toimintoriviin.
    actions.append(remove);
    // Avattavaan osioon lisätään ensin otsikko, sitten lomake ja poistotoiminto.
    details.append(summary, form, actions);
    // Tehtävärivi koostuu valintaruudusta ja muokkausosasta.
    item.append(toggleRow, details);
    // Lisätään valmis tehtävä sivun listaan.
    ui.taskList.append(item);
  }
}

// Yhteinen kirjautumis- ja rekisteröintitoiminto vähentää saman koodin toistamista.
async function authenticate(event, path) {
  // Estetään HTML-lomakkeen tavallinen sivunvaihto.
  event.preventDefault();
  // currentTarget on se lomake, johon kuuntelija on liitetty; se talletetaan ennen awaitia.
  const form = event.currentTarget;
  // FormData kerää kenttien arvot niiden name-attribuuttien perusteella.
  const data = new FormData(form);
  // Odotuksen aikana koko näkymä estää kaksoislähetykset.
  const success = await runAction("Tarkistetaan tunnusta…", async () => {
    // Luetaan salasana aiemmin kerätystä FormDatasta; välilyöntejä ei poisteta.
    const password = String(data.get("password") ?? "");
    // Käytetään täsmälleen backendin Unicode-koodipisteisiin perustuvaa pituuslaskentaa.
    const passwordLength = Array.from(password).length;
    // Alle 15 tai yli 128 koodipisteen salasana saa näkyvän virheen ennen verkkopyyntöä.
    if (passwordLength < 15 || passwordLength > 128) {
      // runAction näyttää tämän viestin sivun virhealueella ja vapauttaa lomakkeen uudelleen.
      throw new Error("Salasanassa pitää olla 15–128 merkkiä.");
    }
    // Palvelimelle lähetetään vain sähköposti ja salasana, ei käyttäjän pyytämää roolia.
    const result = await api(path, "POST", {
      // Sähköpostin reunoilta voi poistaa vahingossa syötetyt välilyönnit.
      email: String(data.get("email") ?? "").trim(),
      // Lähetetään alkuperäinen salasana muuttamatta sen sisältöä.
      password,
    });
    // Selain säilyttää HttpOnly-istuntoevästeen; JavaScript ei lue sitä eikä tallenna salasanaa.
    showWorkspace(result.user);
    // Nyt tunnistautuneen käyttäjän omat projektit voidaan hakea.
    await loadProjects();
    // Kerrotaan onnistuneesta kirjautumisesta.
    announce("Kirjautuminen onnistui. Luo projekti tai avaa oma projektisi.");
  });
  // Seuraava luonteva kohde on projektin luontikenttä.
  if (success) focusId("new-project-title");
}

// Kirjautumislomakkeen submit käyttää login-osoitetta.
ui.login.addEventListener("submit", (event) => authenticate(event, "/api/auth/login"));
// Rekisteröintilomakkeen submit käyttää register-osoitetta.
ui.register.addEventListener("submit", (event) => authenticate(event, "/api/auth/register"));

// Uloskirjautuminen on palvelimella tehtävä istunnon poisto.
ui.logout.addEventListener("click", async () => {
  // Näytetään odotus ja odotetaan vastausta.
  const success = await runAction("Kirjaudutaan ulos…", async () => {
    // Pelkkä käyttöliittymän piilottaminen ei riittäisi; palvelimen istunto poistetaan.
    await api("/api/auth/logout", "POST", {});
    // Palvelimen vahvistuksen jälkeen poistetaan paikalliset käyttäjätiedot.
    showGuest();
    // Kerrotaan kirjautumattomasta tilasta.
    announce("Olet kirjautunut ulos.");
  });
  // Kirjautumislomakkeen ensimmäinen kenttä on nyt mielekäs kohdistuskohde.
  if (success) focusId("login-email");
});

// Projektin luonti käsitellään lomakkeella, joten Enter toimii kuten painikkeen painaminen.
ui.projectCreate.addEventListener("submit", async (event) => {
  // Estetään sivun uudelleenlataus.
  event.preventDefault();
  // Aloitetaan palvelimelle tallentava toiminto.
  const success = await runAction("Luodaan projektia…", async () => {
    // readTitle lukee kentän myös disabled-tilassa ja tarkistaa 1–120 koodipistettä; palvelin tarkistaa saman sekä omistajan.
    const result = await api("/api/projects", "POST", { title: readTitle(ui.projectCreate, 120) });
    // push lisää palvelimen palauttaman projektin taulukon loppuun.
    state.projects.push(result.project);
    // Juuri luotu projekti valitaan suoraan.
    state.selectedProjectId = result.project.id;
    // Uudella projektilla ei ole vielä tehtäviä.
    state.tasks = [];
    // Tyhjennetään luontikenttä seuraavaa projektia varten.
    ui.projectCreate.reset();
    // Päivitetään projektien lista.
    renderProjects();
    // Näytetään uuden projektin tyhjä tehtäväalue.
    renderProjectDetail();
    // Kerrotaan onnistumisesta ja seuraavasta mahdollisesta toiminnosta.
    announce("Projekti luotu. Lisää sille ensimmäinen tehtävä.");
  });
  // Kohdistus siirtyy uuden projektin tehtäväkenttään.
  if (success) focusId("new-task-title");
});

// Olemassa olevan projektin nimenmuutos.
ui.projectRename.addEventListener("submit", async (event) => {
  // Estetään lomakkeen oletuslähetys.
  event.preventDefault();
  // Lähetetään muutos palvelimelle.
  const success = await runAction("Tallennetaan projektin nimeä…", async () => {
    // PATCH muokkaa olemassa olevaa projektia; readTitle tarkistaa nimen samalla 120 koodipisteen rajalla kuin backend.
    const result = await api(`/api/projects/${state.selectedProjectId}`, "PATCH", { title: readTitle(ui.projectRename, 120) });
    // Korvataan vain muokattu projekti; muut säilyvät ennallaan.
    state.projects = state.projects.map((oldProject) => oldProject.id === result.project.id ? result.project : oldProject);
    // Listassa näytetään palvelimen vahvistama uusi nimi.
    renderProjects();
    // Myös otsikko ja muokkauskenttä päivitetään.
    renderProjectDetail();
    // Ilmoitetaan onnistumisesta.
    announce("Projektin nimi tallennettu.");
  });
  // Kohdistetaan nimen kenttä uudelleen.
  if (success) focusId("project-name");
});

// Projektin poistaminen poistaa backendissä myös projektiin kuuluvat tehtävät.
ui.projectDelete.addEventListener("click", async () => {
  // Etsitään valittu projekti vahvistusviestin nimeä varten.
  const project = state.projects.find((item) => item.id === state.selectedProjectId);
  // Ilman valittua projektia toiminnolla ei ole kohdetta.
  if (!project) return;
  // globalThis.confirm avaa selaimen vahvistuksen ennen pyyntöä; Peruuta lopettaa funktion heti.
  if (!globalThis.confirm(`Poistetaanko projekti ”${project.title}” ja kaikki sen tehtävät? Tätä ei voi perua.`)) return;
  // Käynnistetään verkkotoiminto.
  const success = await runAction("Poistetaan projektia ja sen tehtäviä…", async () => {
    // DELETE poistaa juuri tämän omistetun projektin.
    await api(`/api/projects/${project.id}`, "DELETE");
    // Poistetaan vahvistetusti poistunut projekti paikallisesta listasta.
    state.projects = state.projects.filter((item) => item.id !== project.id);
    // Poistettu projekti ei voi enää olla valittu.
    state.selectedProjectId = null;
    // Sen tehtävät poistetaan käyttöliittymän muistista.
    state.tasks = [];
    // Päivitetään jäljellä olevat projektit ja tarvittaessa tyhjä tila.
    renderProjects();
    // Piilotetaan poistuneen projektin kortti.
    renderProjectDetail();
    // Kerrotaan poistamisen laajuus myös onnistumisviestissä.
    announce("Projekti ja sen tehtävät poistettu.");
  });
  // Poistunut painike korvataan kohdistuksessa projektin luontikentällä.
  if (success) focusId("new-project-title");
});

// Uusi tehtävä lisätään juuri valittuun projektiin.
ui.taskCreate.addEventListener("submit", async (event) => {
  // Estetään sivun tavallinen uudelleenlataus.
  event.preventDefault();
  // Odotetaan palvelimen vahvistusta ennen listan muuttamista.
  const success = await runAction("Tallennetaan uutta tehtävää…", async () => {
    // readTitle tarkistaa 1–200 koodipistettä; palvelin tarkistaa saman sekä tämän projektin omistajuuden.
    const result = await api(`/api/projects/${state.selectedProjectId}/tasks`, "POST", { title: readTitle(ui.taskCreate, 200) });
    // Lisätään palvelimen luoma id ja muut tiedot tehtävätaulukkoon.
    state.tasks.push(result.task);
    // Tyhjennetään tehtäväkenttä seuraavaa tehtävää varten.
    ui.taskCreate.reset();
    // Piirretään lista, joka sisältää myös uuden tehtävän.
    renderTasks();
    // Ilmoitetaan onnistumisesta näkyvästi.
    announce("Tehtävä lisätty.");
  });
  // Tehtäviä voi lisätä peräkkäin näppäimistöllä ilman ylimääräistä siirtymistä.
  if (success) focusId("new-task-title");
});

// Ylläpidon koosteen lukeminen on suojattu myös palvelimella.
ui.statsButton.addEventListener("click", async () => {
  // Toiminto käsitellään samoilla lataus- ja virhetiloilla kuin muut pyynnöt.
  await runAction("Haetaan ylläpidon lukumääriä…", async () => {
    // GET ei muuta mitään; tavallinen käyttäjä saisi tästä palvelimelta 403-vastauksen.
    const stats = await api("/api/admin/stats");
    // Tiedot näytetään ymmärrettävänä tekstinä, ei pelkkinä irrallisina numeroina.
    ui.statsOutput.textContent = `Käyttäjiä ${stats.users}, projekteja ${stats.projects}, tehtäviä ${stats.tasks}.`;
    // Onnistumisviesti kertoo haun valmistuneen.
    announce("Ylläpidon lukumäärät haettu.");
  });
  // Palautetaan näppäimistön kohdistus toiminnon painikkeeseen.
  focusId("stats-button");
});

// Sivun käynnistys tarkistaa, onko selaimella jo voimassa oleva istuntoeväste.
async function initialize() {
  // Alun lataustila käyttää samaa apufunktiota kuin käyttäjän käynnistämät toiminnot.
  await runAction("Tarkistetaan kirjautumista…", async () => {
    // 401 on aloituksessa tavallinen kirjautumattoman käyttäjän tila.
    try {
      // JavaScript ei lue evästettä; selain liittää sen pyyntöön automaattisesti.
      const result = await api("/api/auth/me");
      // Palvelimen vahvistama käyttäjä näytetään työtilassa.
      showWorkspace(result.user);
      // Ladataan tämän käyttäjän projektit.
      await loadProjects();
      // Kerrotaan onnistuneesta valmistumisesta.
      announce("Oma työtila ladattu. Valitse projekti tai luo uusi.");
    } catch (error) {
      // Myös verkkovirheessä näytetään kirjautumisnäkymä, jotta käyttäjä voi yrittää uudelleen.
      showGuest();
      // 401 käsitellään tavallisena aloitustilana eikä punaisena virheenä.
      if (error.status === 401) {
        // Kerrotaan seuraavat vaihtoehdot selvästi.
        announce("Kirjaudu sisään tai luo uusi tunnus.");
      } else {
        // Muut virheet siirretään runActionin yhteiseen virhekäsittelyyn.
        throw error;
      }
    }
  });
}

// Käynnistetään alustus vasta kun defer-skriptin HTML-elementit ovat käytettävissä.
initialize();
