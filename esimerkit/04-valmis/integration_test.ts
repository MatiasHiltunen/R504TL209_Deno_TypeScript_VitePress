// assert tarjoaa tarkistuksia, jotka keskeyttävät testin, jos todellinen tulos on väärä.
import assert from "node:assert/strict";
// Käytämme testissä samaa sovelluskäsittelijää kuin oikeassa verkkopalvelimessa.
import { createApp } from "./app.ts";
// Jokainen testi saa oman SQLite-kantansa; opiskelijan sovelluskantaa ei avata.
import { openDatabase, type User } from "./db.ts";
// Sama vakio auttaa kokeilemaan juuri sovelluksen istunnon vanhenemisrajaa.
import { hashSessionToken, PASSWORD_ITERATIONS, SESSION_SECONDS } from "./security.ts";

// Testipyyntöjen origin on täsmälleen sama kuin harjoituksen selaimessa käytetty osoite.
const ORIGIN = "http://localhost:8000";
// Tämä on julkinen testisalalause, jota ei pidä käyttää oikean tilin salasanana.
const PASSWORD = "Vain testin pitka salalause 123!";

// Fixture tarkoittaa testin tarvitsemien olioiden valmisteltua kokonaisuutta.
function fixture() {
  // :memory: pitää tämän testin taulut RAM-muistissa vain yhteyden eliniän ajan.
  const db = openDatabase(":memory:");
  // Testikello on erillinen muuttuja, jotta vanhenemista voidaan testata odottamatta kahdeksaa tuntia.
  let time = Date.UTC(2026, 0, 1);
  // Nuolifunktio lukee nykyisen time-arvon joka kutsulla.
  const app = createApp(db, { origin: ORIGIN, now: () => time });
  // request kutsuu HTTP-käsittelijää oikealla Request-oliolla avaamatta verkkoyhteyttä.
  const request = (path: string, options: RequestInit = {}, ip = "127.0.0.1") =>
    app(new Request(ORIGIN + path, options), ip);
  // Palautettava advance-funktio siirtää vain tämän testin kelloa.
  return {
    db,
    request,
    advance: (milliseconds: number) => {
      time += milliseconds;
    },
  };
}

// ReturnType poimii fixture-funktion palauttaman olion tyypin, jotta sitä ei kirjoiteta kahdesti.
type Fixture = ReturnType<typeof fixture>;

// Tämä apufunktio jäljittelee frontendin kirjoittavaa fetch-pyyntöä.
function write(method: string, body: unknown, cookie = ""): RequestInit {
  // Otsakkeet sisältävät testissä käsin Originin; oikea selain asettaa sen itse.
  return {
    method,
    headers: { Origin: ORIGIN, "Content-Type": "application/json", Cookie: cookie },
    body: JSON.stringify(body),
  };
}

// Rekisteröimme käyttäjän oikean API:n kautta, jolloin myös salasanan käsittely ja sessio testautuvat.
async function register(test: Fixture, email: string) {
  // Testin POST-pyyntö sisältää vain API:n sallimat kentät.
  const response = await test.request(
    "/api/auth/register",
    write("POST", { email, password: PASSWORD }),
  );
  // Rekisteröinti on onnistunut vasta, kun tilakoodi on 201.
  assert.equal(response.status, 201);
  // Käyttäjä luetaan JSON-vastauksesta; tämän jälkeen yksittäisiä kenttiä tarkistetaan testissä.
  const data = await response.json() as { user: User };
  // Luemme selaimeen tarkoitetun Set-Cookie-otsakkeen testiasiakkaan muistiksi.
  const setCookie = response.headers.get("set-cookie");
  // assert.ok varmistaa, ettei arvo puutu; TypeScriptkin oppii sen olevan nyt olemassa.
  assert.ok(setCookie);
  // Seuraavaan pyyntöön lähetetään vain nimi=arvo, ei HttpOnly- tai Max-Age-määrityksiä.
  const cookie = setCookie.split(";")[0];
  // Palautamme sekä käyttäjän että evästeen jatkopolkua varten.
  return { user: data.user, cookie, setCookie };
}

// Deno.test rekisteröi testin; async sallii API-pyyntöjen odottamisen sen sisällä.
Deno.test("Rekisteröinti tallentaa suolatun PBKDF2-tiivisteen ja vain istuntotunnisteen tiivisteen", async () => {
  // Jokainen testi luo oman eristetyn tietokannan.
  const test = fixture();
  // finally sulkee yhteyden, vaikka jokin tarkistus epäonnistuisi.
  try {
    // Iso alkukirjain havainnollistaa sähköpostin yhdenmukaistamista.
    const alice = await register(test, "Alice@example.test");
    // Toinen käyttäjä käyttää samaa julkista testisalalausetta.
    const bob = await register(test, "bob@example.test");
    // API kertoo aina palvelimen määrittämän tavallisen roolin.
    assert.equal(alice.user.role, "user");
    // Sähköpostin kirjainkoko on yhdenmukaistettu.
    assert.equal(alice.user.email, "alice@example.test");
    // Julkisen käyttäjän kenttiin ei kuulu salasana tai sen tiiviste.
    assert.deepEqual(Object.keys(alice.user).sort(), ["email", "id", "role"]);
    // Evästeen suojaominaisuudet ovat mukana paikallisessakin kehityksessä.
    assert.match(alice.setCookie, /HttpOnly; SameSite=Strict; Max-Age=28800/);
    // HTTP-localhost ei käytä Secure-määritystä; HTTPS-versio testataan erikseen.
    assert.equal(alice.setCookie.includes("; Secure"), false);
    // Tietokanta luetaan tässä vain testin sisällä, ei julkisesta API:sta.
    const rows = test.db.prepare(
      "SELECT password_hash, password_salt, password_iterations FROM users ORDER BY id",
    ).all();
    // Sama salasana tuottaa eri suolan jokaiselle käyttäjälle.
    assert.notEqual(rows[0].password_salt, rows[1].password_salt);
    // Eri suola tuottaa myös eri tiivisteen samasta salasanasta.
    assert.notEqual(rows[0].password_hash, rows[1].password_hash);
    // Salasana ei saa olla suoraan tallennettu vertailukenttään.
    assert.notEqual(rows[0].password_hash, PASSWORD);
    // Hitaan laskennan työmäärä on sovittu 600000 kierrosta.
    assert.equal(rows[0].password_iterations, PASSWORD_ITERATIONS);
    // Poimimme vain evästeen salaisen arvon nimi=arvo-parista.
    const rawToken = alice.cookie.split("=")[1];
    // Istuntorivi haetaan käyttäjän tunnuksella vain tätä testiä varten.
    const session = test.db.prepare("SELECT token_hash FROM sessions WHERE user_id = ?").get(
      alice.user.id,
    );
    // Tietokannassa ei ole selaimelle annettua raakaa tunnistetta.
    assert.notEqual(session?.token_hash, rawToken);
    // Tallennettu arvo on täsmälleen raakatunnisteen SHA-256-tiiviste.
    assert.equal(session?.token_hash, await hashSessionToken(rawToken));
    // Kahden käyttäjän evästeet ovat erilliset.
    assert.notEqual(alice.cookie, bob.cookie);
  } finally {
    // Muistitietokannan sisältö katoaa, kun tämän testin yhteys suljetaan.
    test.db.close();
  }
});

// Tämä testi todentaa kirjautumisen, tunnisteen vaihdon ja uloskirjautumisen palvelimen puolella.
Deno.test("Login vaihtaa istunnon; logout mitätöi myös kopioidun vanhan evästeen", async () => {
  // Uusi fixture varmistaa, etteivät aiemman testin käyttäjät vaikuta tähän.
  const test = fixture();
  // Yhteys siivotaan onnistumisen ja epäonnistumisen jälkeen.
  try {
    // Suojatun datan lukeminen ilman kirjautumista on kielletty.
    assert.equal((await test.request("/api/projects")).status, 401);
    // Myös ylläpitotilastot vaativat ensin autentikoinnin.
    assert.equal((await test.request("/api/admin/stats")).status, 401);
    // Kirjaudumme aluksi rekisteröimällä uuden käyttäjän.
    const alice = await register(test, "alice@example.test");
    // Nykyisen käyttäjän haku hyväksyy voimassa olevan evästeen.
    assert.equal(
      (await test.request("/api/auth/me", { headers: { Cookie: alice.cookie } })).status,
      200,
    );
    // Onnistunut login saa myös vanhan evästeen, jotta sen korvaaminen tulee testatuksi.
    const login = await test.request(
      "/api/auth/login",
      write("POST", { email: alice.user.email, password: PASSWORD }, alice.cookie),
    );
    // Oikeilla tunnuksilla kirjautuminen onnistuu.
    assert.equal(login.status, 200);
    // Uuden vastauksen evästeestä poimitaan nimi=arvo-osa.
    const newCookie = login.headers.get("set-cookie")!.split(";")[0]; // ! on tyyppivakuutus testin onnistumisoletuksesta.
    // Vanhaa tunnistetta ei käytetä uudelleen.
    assert.notEqual(newCookie, alice.cookie);
    // Kopio aiemmasta evästeestä ei enää tunnista käyttäjää.
    assert.equal(
      (await test.request("/api/auth/me", { headers: { Cookie: alice.cookie } })).status,
      401,
    );
    // Uusi eväste toimii.
    assert.equal(
      (await test.request("/api/auth/me", { headers: { Cookie: newCookie } })).status,
      200,
    );
    // Uloskirjautuminen lähetetään kirjoittavana, Origin-tarkistettuna JSON-pyyntönä.
    const logout = await test.request("/api/auth/logout", write("POST", {}, newCookie));
    // 204 ilmaisee onnistumisen ilman vastausrunkoa.
    assert.equal(logout.status, 204);
    // Selain ohjataan poistamaan eväste.
    assert.match(logout.headers.get("set-cookie") ?? "", /Max-Age=0/);
    // Myöskään käsin talletettu kopio viimeisestä evästeestä ei enää toimi.
    assert.equal(
      (await test.request("/api/auth/me", { headers: { Cookie: newCookie } })).status,
      401,
    );
    // Palvelimen istuntotaulu on tyhjä: kyse ei ollut vain käyttöliittymän piilottamisesta.
    assert.equal(test.db.prepare("SELECT COUNT(*) AS total FROM sessions").get()?.total, 0);
  } finally {
    // Yhteys suljetaan riippumatta assert-tarkistusten tuloksista.
    test.db.close();
  }
});

// Hallittava testikello korvaa oikean kahdeksan tunnin odottamisen.
Deno.test("Istunto vanhenee palvelimella tasan kahdeksan tunnin kohdalla", async () => {
  // Muistissa olevat käyttäjä- ja istuntorivit kuuluvat vain tähän testiin.
  const test = fixture();
  // try/finally pitää resurssien siivouksen varmana.
  try {
    // Luodaan tunnistettu käyttäjä.
    const alice = await register(test, "alice@example.test");
    // Siirrytään yhden millisekunnin päähän vanhenemisesta.
    test.advance(SESSION_SECONDS * 1000 - 1);
    // Juuri ennen rajaa istunto on voimassa.
    assert.equal(
      (await test.request("/api/auth/me", { headers: { Cookie: alice.cookie } })).status,
      200,
    );
    // Saavutetaan tarkka vanhenemishetki.
    test.advance(1);
    // Palvelin hylkää evästeen, vaikka testiasiakas lähettää sen edelleen.
    assert.equal(
      (await test.request("/api/auth/me", { headers: { Cookie: alice.cookie } })).status,
      401,
    );
    // Myös tietokannan vanhentunut rivi poistetaan.
    assert.equal(test.db.prepare("SELECT COUNT(*) AS total FROM sessions").get()?.total, 0);
  } finally {
    // Sulkeminen hävittää tämän testin muistitietokannan.
    test.db.close();
  }
});

// Nämä ovat varsinaiset horisontaalisen käyttöoikeuden kielteiset testit kahdella käyttäjällä.
Deno.test("B ei lue, luo, muuta eikä poista A:n projektin tai tehtävän tietoja", async () => {
  // Testi käyttää oikeita tietokantaviittauksia ja oikeita istuntoja.
  const test = fixture();
  // Lopussa yhteys suljetaan myös mahdollisen tietoturvavirheen paljastuessa.
  try {
    // A ja B ovat kaksi erillistä rekisteröityä tavallista käyttäjää.
    const alice = await register(test, "alice@example.test");
    // Toinen rekisteröinti saa uuden käyttäjätunnuksen ja uuden evästeen.
    const bob = await register(test, "bob@example.test");
    // A luo projektinsa API:n kautta; user_id ei esiinny pyynnössä.
    const createdProject = await test.request(
      "/api/projects",
      write("POST", { title: "A:n projekti" }, alice.cookie),
    );
    // Projektin luomisen pitää onnistua.
    assert.equal(createdProject.status, 201);
    // Otamme talteen uuden projektin tunnuksen seuraavia pyyntöjä varten.
    const { project } = await createdProject.json();
    // A lisää tehtävän omaan projektiinsa.
    const createdTask = await test.request(
      `/api/projects/${project.id}/tasks`,
      write("POST", { title: "A:n tehtävä" }, alice.cookie),
    );
    // Tehtävän luominen palauttaa uuden resurssin.
    assert.equal(createdTask.status, 201);
    // Otamme talteen myös tehtävän tunnuksen.
    const { task } = await createdTask.json();
    // B:n oma projektikokoelma ei sisällä A:n projektia.
    const bList = await test.request("/api/projects", { headers: { Cookie: bob.cookie } });
    // Tyhjä lista ei vuoda edes vieraan projektin nimeä.
    assert.deepEqual(await bList.json(), { projects: [] });
    // Kukin rivi on yksi eri tapa yrittää päästä A:n tietoihin B:n tunnuksilla.
    const attacks: Array<[string, string, unknown]> = [
      ["GET", `/api/projects/${project.id}`, undefined], // Suora projektin luku.
      ["PATCH", `/api/projects/${project.id}`, { title: "B:n muutos" }], // Projektin nimen muutos.
      ["DELETE", `/api/projects/${project.id}`, {}], // Koko projektin poistaminen.
      ["GET", `/api/projects/${project.id}/tasks`, undefined], // Vieraan projektin tehtävälista.
      ["POST", `/api/projects/${project.id}/tasks`, { title: "B:n lisäys" }], // Tehtävän lisääminen vieraaseen projektiin.
      ["GET", `/api/tasks/${task.id}`, undefined], // Yhden vieraan tehtävän luku.
      ["PATCH", `/api/tasks/${task.id}`, { done: true }], // Vieraan tehtävän tilan muutos.
      ["DELETE", `/api/tasks/${task.id}`, {}], // Vieraan tehtävän poistaminen.
    ];
    // Destrukturointi antaa jokaisen testirivin kolme osaa omiksi muuttujikseen.
    for (const [method, path, body] of attacks) {
      // Lukupyyntö tarvitsee vain evästeen; kirjoitus käyttää samaa suojattua JSON-muotoa kuin frontend.
      const options = method === "GET"
        ? { headers: { Cookie: bob.cookie } }
        : write(method, body, bob.cookie);
      // Vieraalle resurssille palautuu 404 riippumatta siitä, onko toiminto luku vai muutos.
      assert.equal((await test.request(path, options)).status, 404, `${method} ${path}`);
    }
    // A pystyy yhä lukemaan tehtävänsä epäonnistuneiden hyökkäysten jälkeen.
    const unchanged = await test.request(`/api/tasks/${task.id}`, {
      headers: { Cookie: alice.cookie },
    });
    // Pelkkä virhetilakoodi ei riitä todisteeksi: tarkistamme myös, ettei data muuttunut.
    assert.deepEqual((await unchanged.json()).task, task);
    // A:n projektissakin on edelleen alkuperäinen nimi.
    const intactProject = await test.request(`/api/projects/${project.id}`, {
      headers: { Cookie: alice.cookie },
    });
    // Tallennettu projekti vastaa ennen hyökkäyksiä luotua projektia.
    assert.deepEqual((await intactProject.json()).project, project);
    // Omistajan sallittu päivitys toimii samasta suojatusta reitistä.
    const changed = await test.request(
      `/api/tasks/${task.id}`,
      write("PATCH", { title: "A:n päivitetty tehtävä", done: true }, alice.cookie),
    );
    // Päivitys onnistuu oikealla käyttäjällä.
    assert.equal(changed.status, 200);
    // Vastauksessa on oikea boolean-arvo.
    assert.equal((await changed.json()).task.done, true);
    // Omistaja saa poistaa oman tehtävänsä.
    assert.equal(
      (await test.request(`/api/tasks/${task.id}`, write("DELETE", {}, alice.cookie))).status,
      204,
    );
    // Poistettu tehtävä ei enää löydy omistajaltakaan.
    assert.equal(
      (await test.request(`/api/tasks/${task.id}`, { headers: { Cookie: alice.cookie } })).status,
      404,
    );
    // Luomme vielä tehtävän, jotta projektin kaskadipoisto voidaan todentaa.
    assert.equal(
      (await test.request(
        `/api/projects/${project.id}/tasks`,
        write("POST", { title: "Poistuu projektin mukana" }, alice.cookie),
      )).status,
      201,
    );
    // Projektin omistajan poistopyyntö onnistuu.
    assert.equal(
      (await test.request(`/api/projects/${project.id}`, write("DELETE", {}, alice.cookie))).status,
      204,
    );
    // Viiteavaimen CASCADE-sääntö poisti myös projektiin kuuluneen tehtävän.
    assert.equal(test.db.prepare("SELECT COUNT(*) AS total FROM tasks").get()?.total, 0);
  } finally {
    // Sulkemme vain tämän testin kannan.
    test.db.close();
  }
});

// Roolin väärentäminen ja toisen omistajan syöttäminen pitää hylätä palvelimella.
Deno.test("Asiakas ei valitse roolia tai omistajaa; admin näkee vain erikseen sallitut yhteismäärät", async () => {
  // Testin tietokanta on aluksi tyhjä.
  const test = fixture();
  // Suljemme tietokannan myös silloin, jos jokin oikeustarkistus on rikki.
  try {
    // Hyökkääjä yrittää lisätä rekisteröintirunkoon admin-roolin.
    const forged = await test.request(
      "/api/auth/register",
      write("POST", { email: "evil@example.test", password: PASSWORD, role: "admin" }),
    );
    // Ylimääräinen kenttä johtaa 400-virheeseen ennen käyttäjän luomista.
    assert.equal(forged.status, 400);
    // Tarkistamme myös sivuvaikutuksen puuttumisen.
    assert.equal(test.db.prepare("SELECT COUNT(*) AS total FROM users").get()?.total, 0);
    // Luomme oikean tavallisen käyttäjän.
    const alice = await register(test, "alice@example.test");
    // Luomme toisen käyttäjän, jonka omistajuutta ei saa jäljitellä.
    const bob = await register(test, "bob@example.test");
    // Tavallinen käyttäjä ei saa ylläpitotilastoja.
    assert.equal(
      (await test.request("/api/admin/stats", { headers: { Cookie: alice.cookie } })).status,
      403,
    );
    // A yrittää tehdä projektin B:n omistukseen lähettämällä ylimääräisen user_id-kentän.
    const forgedOwner = await test.request(
      "/api/projects",
      write("POST", { title: "Väärä omistaja", user_id: bob.user.id }, alice.cookie),
    );
    // Palvelin hylkää koko pyynnön.
    assert.equal(forgedOwner.status, 400);
    // Epäonnistunut pyyntö ei luonut projektia kenellekään.
    assert.equal(test.db.prepare("SELECT COUNT(*) AS total FROM projects").get()?.total, 0);
    // B luo itselleen yhden aidon projektin.
    const bProjectResponse = await test.request(
      "/api/projects",
      write("POST", { title: "B:n yksityinen projekti" }, bob.cookie),
    );
    // Tunnusta käytetään myöhemmin ylläpitäjän oikeuksien rajauksen testiin.
    const { project } = await bProjectResponse.json();
    // Testi jäljittelee paikallista admin-komentoa: rooli muuttuu luotetussa tietokantakäytössä.
    test.db.prepare("UPDATE users SET role = 'admin' WHERE id = ?").run(alice.user.id);
    // Istunnon käyttäjän rooli luetaan palvelimella uudelleen jokaisessa pyynnössä.
    const stats = await test.request("/api/admin/stats", { headers: { Cookie: alice.cookie } });
    // Ylläpitäjä pääsee nimenomaisesti tähän yhteismääräreittiin.
    assert.equal(stats.status, 200);
    // Vastauksessa on vain laskurit: ei salasanoja, sähköposteja tai muiden projektien nimiä.
    assert.deepEqual(await stats.json(), { users: 2, projects: 1, tasks: 0 });
    // Admin-rooli ei ohita omistajuussääntöä tavallisilla projektireiteillä.
    assert.equal(
      (await test.request(`/api/projects/${project.id}`, { headers: { Cookie: alice.cookie } }))
        .status,
      404,
    );
    // Adminin oma projektikokoelma pysyy omana kokoelmana.
    assert.deepEqual(
      await (await test.request("/api/projects", { headers: { Cookie: alice.cookie } })).json(),
      { projects: [] },
    );
  } finally {
    // Siivoamme testin resurssin.
    test.db.close();
  }
});

// CSRF-, kokoraja- ja tyyppitarkistukset kokeillaan suoraan HTTP-pyynnöillä.
Deno.test("Origin, sisältötyyppi, rungon koko ja kenttien tyypit tarkistetaan palvelimella", async () => {
  // Tämä testi ei luota frontendin lomakkeiden rajoituksiin.
  const test = fixture();
  // finally sulkee kannan jokaisella lopputuloksella.
  try {
    // Muodostamme muuten kelvollisen rekisteröintipyynnön.
    const valid = write("POST", { email: "alice@example.test", password: PASSWORD });
    // Vieraan sivuston alkuperä ei kelpaa, vaikka sisältö olisi oikeaa JSONia.
    const foreign = {
      ...valid,
      headers: { Origin: "https://vieras.example", "Content-Type": "application/json" },
    };
    // Hylkäys tapahtuu ennen tilin luomista.
    assert.equal((await test.request("/api/auth/register", foreign)).status, 403);
    // Myös puuttuva Origin on tarkoituksella hylättävä.
    assert.equal(
      (await test.request("/api/auth/register", {
        ...valid,
        headers: { "Content-Type": "application/json" },
      })).status,
      403,
    );
    // localhost ja 127.0.0.1 eivät ole sama origin, vaikka ne voivat osoittaa samalle koneelle.
    assert.equal(
      (await test.request("/api/auth/register", {
        ...valid,
        headers: { Origin: "http://127.0.0.1:8000", "Content-Type": "application/json" },
      })).status,
      403,
    );
    // Oikeakaan origin ei salli tekstilomaketta JSON-API:n kirjoitukseen.
    assert.equal(
      (await test.request("/api/auth/register", {
        ...valid,
        headers: { Origin: ORIGIN, "Content-Type": "text/plain" },
      })).status,
      415,
    );
    // Rikkinäinen JSON tuottaa 400-virheen.
    assert.equal((await test.request("/api/auth/register", { ...valid, body: "{" })).status, 400);
    // Myös kelvollinen JSON voi olla väärää rakennetta: tässä taulukko olion sijaan.
    assert.equal((await test.request("/api/auth/register", write("POST", []))).status, 400);
    // null ei ole lomakedataa kuvaava olio.
    assert.equal((await test.request("/api/auth/register", write("POST", null))).status, 400);
    // Rungon todellinen koko tarkistetaan myös ilman Content-Length-otsaketta.
    assert.equal(
      (await test.request(
        "/api/auth/register",
        write("POST", { email: "a".repeat(17_000), password: PASSWORD }),
      )).status,
      413,
    );
    // Sähköpostin näkymätön NUL-merkki torjutaan jo validoinnissa, ei vasta tietokantavirheenä.
    assert.equal(
      (await test.request(
        "/api/auth/register",
        write("POST", { email: "a\u0000@example.test", password: PASSWORD }),
      )).status,
      400,
    );
    // Hylätyt pyynnöt eivät jättäneet käyttäjärivejä tietokantaan.
    assert.equal(test.db.prepare("SELECT COUNT(*) AS total FROM users").get()?.total, 0);
    // Seuraavaksi käytämme oikeaa kirjautumista datan validoinnin testeissä.
    const alice = await register(test, "alice@example.test");
    // Pelkistä välilyönneistä koostuva projektin nimi on virhe.
    assert.equal(
      (await test.request("/api/projects", write("POST", { title: "   " }, alice.cookie))).status,
      400,
    );
    // Projektin enimmäispituus on 120 merkkiä.
    assert.equal(
      (await test.request("/api/projects", write("POST", { title: "a".repeat(121) }, alice.cookie)))
        .status,
      400,
    );
    // Luomme kelvollisen projektin tehtävätyyppien tarkistusta varten.
    const projectResponse = await test.request(
      "/api/projects",
      write("POST", { title: "Kelvollinen" }, alice.cookie),
    );
    // JSONista poimitaan projektin tunnus.
    const { project } = await projectResponse.json();
    // Tehtävän 200-merkkinen nimi on vielä sallittu.
    const taskResponse = await test.request(
      `/api/projects/${project.id}/tasks`,
      write("POST", { title: "a".repeat(200) }, alice.cookie),
    );
    // Projektin ja tehtävän pituusrajat ovat tarkoituksella erilaiset.
    assert.equal(taskResponse.status, 201);
    // Tallennetaan luodun tehtävän tunnus.
    const { task } = await taskResponse.json();
    // JSON-teksti "false" ei saa vahingossa tulkintua totuudeksi.
    assert.equal(
      (await test.request(`/api/tasks/${task.id}`, write("PATCH", { done: "false" }, alice.cookie)))
        .status,
      400,
    );
    // Tehtävän siirtäminen project_id-kentällä ei kuulu tähän API:in.
    assert.equal(
      (await test.request(
        `/api/tasks/${task.id}`,
        write("PATCH", { project_id: 999 }, alice.cookie),
      )).status,
      400,
    );
    // Kumpikaan hylätty päivitys ei muuttanut tehtävän tilaa.
    assert.equal(test.db.prepare("SELECT done FROM tasks WHERE id = ?").get(task.id)?.done, 0);
  } finally {
    // Suljemme tämän testin erillisen tietokannan.
    test.db.close();
  }
});

// Testi havainnollistaa SQL-parametrien tarkoitusta myös erikoismerkkejä sisältävällä datalla.
Deno.test("Heittomerkit ja HTML-teksti tallentuvat datana ilman SQL-koodin suorittamista", async () => {
  // Uusi tietokanta estää aiempien testien sivuvaikutukset.
  const test = fixture();
  // Lopuksi yhteys suljetaan.
  try {
    // Luomme tavallisen käyttäjän, jolla on oikeus omaan projektiinsa.
    const alice = await register(test, "alice@example.test");
    // Nimi näyttää SQL-lauseelta, mutta sitä pitää käsitellä tavallisena tekstinä.
    const title = "O'Brian'); DROP TABLE users; --";
    // Lähetämme tekstin tavallisessa nimikentässä.
    const response = await test.request("/api/projects", write("POST", { title }, alice.cookie));
    // Projekti saa syntyä, koska välimerkit ovat sallittua nimeä.
    assert.equal(response.status, 201);
    // Tallennettu arvo on sama teksti; sitä ei ole tulkittu SQL-komennoksi.
    assert.equal((await response.json()).project.title, title);
    // users-taulu on edelleen olemassa ja sisältää käyttäjänsä.
    assert.equal(test.db.prepare("SELECT COUNT(*) AS total FROM users").get()?.total, 1);
    // HTML:ltä näyttävä nimiteksti saa myös säilyä datana.
    const html = "<img src=x onerror=alert('xss')>";
    // Turvallinen frontend näyttää arvon textContentilla, ei innerHTML:llä.
    const htmlResponse = await test.request(
      "/api/projects",
      write("POST", { title: html }, alice.cookie),
    );
    // API kertoo sisällön olevan JSONia, jotta selain ei tulkitse sitä HTML-sivuksi.
    assert.match(htmlResponse.headers.get("content-type") ?? "", /^application\/json/);
    // JSONissa teksti on ennallaan; selaimessa suorittamattomuus varmistetaan myös frontend-harjoituksessa.
    assert.equal((await htmlResponse.json()).project.title, html);
  } finally {
    // Suljemme kannan, vaikka injektiotesti paljastaisi virheen.
    test.db.close();
  }
});

// Suojausotsakkeiden ja sallitun tiedostolistan vaikutukset kokeillaan todellisilla poluilla.
Deno.test("Staattinen allowlist ei paljasta lähdekoodia tai tietokantaa ja CSP on käytössä", async () => {
  // Muistitietokanta riittää, koska tiedostoreitit eivät tarvitse käyttäjädataa.
  const test = fixture();
  // Sulkeminen on tämänkin testin vastuulla.
  try {
    // Jokainen näistä tiedostoista on kielletty, vaikka nimi arvataan oikein.
    for (
      const path of [
        "/db.ts",
        "/deno.jsonc",
        "/01_create_schema.sql",
        "/data/tehtavataulu.sqlite",
        "/.env",
        "/%2e%2e/db.ts",
      ]
    ) {
      // Suoraan kirjoitettu tiedostopolku ei muuta palvelimen allowlistiä.
      assert.equal((await test.request(path)).status, 404, path);
    }
    // Oikea etusivu on julkisesti saatavilla.
    const index = await test.request("/");
    // Käynnistyspaketissa pitää olla myös frontend-tiedostot.
    assert.equal(index.status, 200);
    // Skriptejä saa ladata vain samasta originista.
    assert.match(index.headers.get("content-security-policy") ?? "", /script-src 'self'/);
    // CSP ei salli inline-JavaScriptiä.
    assert.equal(
      (index.headers.get("content-security-policy") ?? "").includes("unsafe-inline"),
      false,
    );
    // Sisältötyypin arvaaminen on estetty.
    assert.equal(index.headers.get("x-content-type-options"), "nosniff");
    // Kirjautuneen sovelluksen vastauksia ei tallenneta välimuistiin.
    assert.equal(index.headers.get("cache-control"), "no-store");
    // POST ei voi kirjoittaa julkista CSS-tiedostoa.
    assert.equal((await test.request("/styles.css", write("POST", {}))).status, 405);
    // Myös virhevastaukset saavat samat suojausotsakkeet.
    const denied = await test.request("/api/auth/me");
    // Ulkopuolinen sivusto ei saa kehystää edes kirjautumisvirhettä.
    assert.equal(denied.headers.get("x-frame-options"), "DENY");
  } finally {
    // Suljemme testin kannan.
    test.db.close();
  }
});

// Geneerinen virhe ja yritysraja ovat eri suojauksia; testaamme molemmat.
Deno.test("Väärä ja tuntematon tili saavat saman virheen, ja kirjautumisyrityksiä rajoitetaan", async () => {
  // Uusi sovellus saa uuden, aluksi tyhjän prosessikohtaisen laskurin.
  const test = fixture();
  // Lopuksi yhteys vapautetaan.
  try {
    // Luomme yhden oikean tilin väärän salasanan kokeilua varten.
    const alice = await register(test, "alice@example.test");
    // Tämä salasana täyttää pituussäännön mutta ei vastaa tilin salasanaa.
    const wrongPassword = "Väärä mutta tarpeeksi pitkä salalause";
    // Tunnettu sähköposti ja väärä salasana eivät saa kirjata sisään.
    const known = await test.request(
      "/api/auth/login",
      write("POST", { email: alice.user.email, password: wrongPassword }),
    );
    // Tuntematon tili saa saman laskentapolun ja julkisen virheen.
    const unknown = await test.request(
      "/api/auth/login",
      write("POST", { email: "unknown@example.test", password: wrongPassword }),
    );
    // Molemmat tulkitaan epäonnistuneiksi kirjautumisiksi.
    assert.equal(known.status, 401);
    // Tilakoodi ei paljasta tilin olemassaoloa.
    assert.equal(unknown.status, 401);
    // Myös virheteksti on sama.
    assert.deepEqual(await known.json(), await unknown.json());
    // Yksi A:n epäonnistuminen on jo tehty; neljä lisää täyttää viiden yrityksen rajan.
    for (let count = 0; count < 4; count++) {
      // Kukin sallittujen yritysten sisäinen väärä kirjautuminen saa normaalin 401-virheen.
      assert.equal(
        (await test.request(
          "/api/auth/login",
          write("POST", { email: alice.user.email, password: wrongPassword }),
        )).status,
        401,
      );
    }
    // Kuudes yritys hylätään jo ennen hidasta salasanatyötä, vaikka salasana olisi nyt oikein.
    const limited = await test.request(
      "/api/auth/login",
      write("POST", { email: alice.user.email, password: PASSWORD }),
    );
    // 429 ilmaisee ylittyneen yritysrajan.
    assert.equal(limited.status, 429);
    // Odotusaika ilmoitetaan standardiotsakkeessa sekunteina.
    assert.equal(limited.headers.get("retry-after"), "900");
    // Testikello siirretään seuraavan aikaikkunan alkuun.
    test.advance(15 * 60 * 1000);
    // Rajoitus ei lukitse tiliä loputtomasti: oikea kirjautuminen toimii aikarajan jälkeen.
    assert.equal(
      (await test.request(
        "/api/auth/login",
        write("POST", { email: alice.user.email, password: PASSWORD }),
      )).status,
      200,
    );
  } finally {
    // Suljemme vain tämän testin tietokannan.
    test.db.close();
  }
});

// Tässä kokeillaan aidon tiedoston säilyvyyttä ja tietokannan omia eheyssääntöjä.
Deno.test("SQLite säilyttää datan uudelleenavauksessa, migraatio ei toistu ja viiteavaimet toimivat", () => {
  // Testien väliaikaiset tiedostot rajataan data-hakemiston erilliseen alihakemistoon.
  Deno.mkdirSync("./data", { recursive: true });
  // makeTempDirSync luo yksilöllisen kansion, joten opiskelijan varsinainen kanta ei ole vaarassa.
  const directory = Deno.makeTempDirSync({ dir: "./data", prefix: "test-" });
  // Tämän polun omistaa vain tämä testi.
  const path = `${directory}/test.sqlite`;
  // Ensimmäinen avaus luo tietokannan ja suorittaa migraation 1.
  let db = openDatabase(path);
  // Suljemme viimeisen yhteyden ja poistamme vain oman väliaikaisen kansion.
  try {
    // Tämä suoraan lisätty rivi on vain rakennetestiä varten; API-testit käyttävät oikeaa salasanan laskentaa.
    const inserted = db.prepare(
      "INSERT INTO users(email, password_hash, password_salt, password_iterations) VALUES (?, ?, ?, ?)",
    ).run("persist@example.test", "a".repeat(64), "b".repeat(32), PASSWORD_ITERATIONS);
    // Käytämme tietokannan juuri antamaa tunnusta omistajaviittaukseen.
    const ownerId = Number(inserted.lastInsertRowid);
    // Projektin lisääminen olemassa olevalle omistajalle onnistuu.
    db.prepare("INSERT INTO projects(user_id, title) VALUES (?, ?)").run(
      ownerId,
      "Säilyvä projekti",
    );
    // Viiteavain estää projektin luomisen käyttäjälle, jota ei ole.
    assert.throws(() =>
      db.prepare("INSERT INTO projects(user_id, title) VALUES (?, ?)").run(999999, "Orpo projekti")
    );
    // Tietokanta tarkistaa nimen pituuden myös API:n ulkopuolisessa kirjoituksessa.
    assert.throws(() =>
      db.prepare("INSERT INTO projects(user_id, title) VALUES (?, ?)").run(ownerId, "")
    );
    // Suljemme ensimmäisen yhteyden simuloidaksemme palvelimen pysäyttämistä.
    db.close();
    // Uusi yhteys samaan tiedostoon simuloisi seuraavaa käynnistystä.
    db = openDatabase(path);
    // Aiemmin tallennettu projekti on edelleen olemassa.
    assert.equal(db.prepare("SELECT title FROM projects").get()?.title, "Säilyvä projekti");
    // Migraatiokirjanpidossa on yhä vain yksi suoritettu muutos.
    assert.equal(db.prepare("SELECT COUNT(*) AS total FROM schema_migrations").get()?.total, 1);
    // Myös uudessa yhteydessä viiteavainten tarkistus on käytössä.
    assert.throws(() =>
      db.prepare("INSERT INTO tasks(project_id, title) VALUES (?, ?)").run(999999, "Orpo tehtävä")
    );
  } finally {
    // Suljemme SQLite-tiedoston ennen hakemiston poistamista.
    db.close();
    // recursive poistaa vain yllä tämän testin luoman väliaikaisen hakemiston sisältöineen.
    Deno.removeSync(directory, { recursive: true });
  }
});

// HTTPS-evästeen asetusta testataan erikseen ilman oikean TLS-palvelimen käynnistämistä.
Deno.test("HTTPS-origin lisää Secure-määrityksen istuntoevästeeseen", async () => {
  // Kanta on vain tässä testissä tarvittava muistitietokanta.
  const db = openDatabase(":memory:");
  // HTTPS-origin kertoo sovellukselle julkisen palvelun olevan salattu.
  const origin = "https://kurssi.example";
  // Käsittelijä toimii Request-olioilla riippumatta siitä, onko testillä verkkoporttia.
  const app = createApp(db, { origin });
  // Lopussa muistitietokanta suljetaan.
  try {
    // Rekisteröintipyyntö käyttää täsmälleen tähän sovellukseen asetettua originia.
    const response = await app(
      new Request(`${origin}/api/auth/register`, {
        method: "POST",
        headers: { Origin: origin, "Content-Type": "application/json" },
        body: JSON.stringify({ email: "secure@example.test", password: PASSWORD }),
      }),
    );
    // Rekisteröinti onnistuu myös HTTPS-asetuksella.
    assert.equal(response.status, 201);
    // Secure estää selainta lähettämästä istuntotunnistetta salaamattomaan HTTP-yhteyteen.
    assert.match(response.headers.get("set-cookie") ?? "", /; Secure$/);
    // HSTS täydentää HTTPS-palvelun selaimelle antamaa ohjetta.
    assert.equal(response.headers.get("strict-transport-security"), "max-age=31536000");
  } finally {
    // Siivoamme tämän testin kannan.
    db.close();
  }
});
