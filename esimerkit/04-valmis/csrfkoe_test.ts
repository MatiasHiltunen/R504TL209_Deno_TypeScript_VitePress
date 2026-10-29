// assert vertaa testin todellista tulosta etukäteen päätettyyn tulokseen.
import assert from "node:assert/strict";
// Sama pyyntökäsittelijä toimii testissä ja oikeassa verkkopalvelimessa.
import { createApp } from "./app.ts";
// Muistikanta erottaa kokeen opiskelijan omasta sovellusdatasta.
import { openDatabase } from "./db.ts";

// Tällä kertaa testataan kirjautuneen käyttäjän oman kohteen CSRF-suojausta.
Deno.test("CSRF-koe: väärä ja puuttuva Origin eivät muuta omaa tehtävää", async () => {
  // Jokainen testi saa omat taulunsa vain tämän yhteyden ajaksi.
  const db = openDatabase(":memory:");
  // Backend hyväksyy muutospyynnöille vain tämän täsmällisen alkuperän.
  const origin = "http://localhost:8000";
  // Tuotamme oikean sovelluskäsittelijän omalla tietokannalla.
  const app = createApp(db, { origin });
  // Apufunktio muodostaa aluksi sallitut POST-pyynnöt testidatan luomista varten.
  function post(path: string, data: unknown, cookie = ""): Request {
    // Request-olioon laitetaan sama muoto, jota toimiva frontend käyttää.
    return new Request(origin + path, {
      // POST on tässä luomiseen käytetty HTTP-metodi.
      method: "POST",
      // Cookie tunnistaa käyttäjän; Origin ja sisältötyyppi liittyvät eri tarkistuksiin.
      headers: { "Origin": origin, "Content-Type": "application/json", "Cookie": cookie },
      // Olio muutetaan verkon JSON-tekstiesitykseksi.
      body: JSON.stringify(data),
    });
  }
  // finally vapauttaa kannan myös odottamattomassa testivirheessä.
  try {
    // Luomme oman testikäyttäjän oikean rekisteröintitoiminnon kautta.
    const registered = await app(post("/api/auth/register", {
      // Tämä keksitty osoite kuuluu vain eristettyyn paikalliseen testiin.
      email: "csrf@example.test",
      // Julkinen testisalalause ei ole oikean tilin salasana.
      password: "Vain eristetyn CSRF-kokeen salalause!",
    }));
    // Valmistelun pitää onnistua ennen varsinaista turvallisuuskoetta.
    assert.equal(registered.status, 201);
    // Säilytämme kelvollisen istuntoevästeen testin sisällä tulostamatta sitä.
    const cookie = registered.headers.get("set-cookie")?.split(";")[0];
    // Tämä varmistaa, ettei testissä vahingossa käytetä kirjautumatonta pyyntöä.
    assert.ok(cookie);
    // Testikäyttäjä luo itselleen projektin oikealla alkuperällä.
    const projectResponse = await app(post("/api/projects", { title: "Oma projekti" }, cookie));
    // Vaadimme onnistuneen luomisen.
    assert.equal(projectResponse.status, 201);
    // Poimimme oikean projektitunnisteen sovelluksen vastauksesta.
    const project = await projectResponse.json() as { project: { id: number } };
    // Lisäämme projektiin tehtävän, jonka pitäisi säilyä estetyissä kokeissa ennallaan.
    const taskResponse = await app(
      post(`/api/projects/${project.project.id}/tasks`, { title: "Säilyvä nimi" }, cookie),
    );
    // Tehtävänkin luonnin on onnistuttava.
    assert.equal(taskResponse.status, 201);
    // Luemme tehtävän tunnisteen vastaussopimuksen mukaisesta oliosta.
    const task = await taskResponse.json() as { task: { id: number } };
    // Tätä täsmälleen samaa omaa tehtävää sekä muutetaan että tarkistetaan.
    const taskUrl = origin + `/api/tasks/${task.task.id}`;
    // Kokeile sekä väärää alkuperää että puuttuvaa otsaketta.
    for (const invalidOrigin of ["https://vieras.example", null]) {
      // Tunnistautuminen ja JSON-muoto ovat kunnossa; muutamme vain alkuperää.
      const headers = new Headers({ "Content-Type": "application/json", "Cookie": cookie });
      // null-tapauksessa Origin jätetään tarkoituksella kokonaan pois.
      if (invalidOrigin !== null) headers.set("Origin", invalidOrigin);
      // PATCH yrittää muuttaa nykyisen tehtävän nimeä ja tilaa samalla pyynnöllä.
      const blocked = await app(
        new Request(taskUrl, {
          // Metodi ja runko ovat muuten kelvollisia, joten epäonnistumisen syy voidaan rajata Originiin.
          method: "PATCH",
          // Käytämme juuri rakennettuja otsakkeita, joissa oikea istunto on yhä mukana.
          headers,
          // Nämä muutokset eivät saa päätyä tietokantaan.
          body: JSON.stringify({ title: "Luvaton muutos", done: true }),
        }),
      );
      // Virhe kertoo, että muutospyyntö pysäytettiin.
      assert.equal(blocked.status, 403);
      // Luemme tiedon uudelleen oikealla istunnolla; GET ei muuta sovelluksen tehtävätietoa.
      const readBack = await app(new Request(taskUrl, { headers: { Cookie: cookie } }));
      // Oma kelvollinen istunto toimii yhä, joten koe ei onnistunut vahingossa logoutin vuoksi.
      assert.equal(readBack.status, 200);
      // Tulkitsemme tehtävän nimen ja valmiustilan sovelluksen JSON-vastauksesta.
      const unchanged = await readBack.json() as { task: { title: string; done: boolean } };
      // Estävä koodi ei riitä: myös alkuperäisen nimen on säilyttävä.
      assert.equal(unchanged.task.title, "Säilyvä nimi");
      // Samalla tarkistetaan, ettei valmis-tila muuttunut taustalla.
      assert.equal(unchanged.task.done, false);
    }
  } finally {
    // Hävitetään vain tätä koetta varten avattu muistikanta.
    db.close();
  }
});
