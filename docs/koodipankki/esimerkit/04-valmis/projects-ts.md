---
outline: false
---

# esimerkit/04-valmis/projects.ts

**Ryhmä:** Valmiin sovelluksen backend.

Tiedoston sijainti puretussa projektissa on `esimerkit/04-valmis/projects.ts`. Kopioi koko sisältö kommentteineen tähän tiedostoon. Suorituskomennot ja odotettu tulos ovat asianomaisessa tutoriaaliluvussa.

[Lataa lähdekoodi tekstinä](/koodit/esimerkit/04-valmis/projects.ts.txt) · [Palaa koodipankkiin](/koodipankki/)

````ts
// Tietokanta- ja rivityypit auttavat tarkistamaan palvelimen omaa koodia ennen ajoa.
import type { DatabaseSync } from "node:sqlite";
// User tulee kirjautumisistunnosta, ProjectRow ja TaskRow omista SQL-kyselyistämme.
import type { ProjectRow, TaskRow, User } from "./db.ts";
// Validointi ja HTTP-vastaukset ovat yhteisiä kaikille reiteille.
import { allowFields, HttpError, json, type JsonObject, requireId, requireTitle } from "./http.ts";

// Muunnamme tietokantarivin tietoisesti julkisen API-sopimuksen mukaiseksi.
function projectJson(row: ProjectRow) {
  // user_id jää palvelimelle; created_at saa JSONissa nimen createdAt.
  return { id: row.id, title: row.title, createdAt: row.created_at };
}

// Tämä muunnos pitää SQLiten kokonaisluvut erillään JavaScriptin totuusarvoista.
function taskJson(row: TaskRow) {
  // === 1 tuottaa boolean-arvon true tai false; emme lähetä käyttöliittymälle merkkijonoa "false".
  return {
    id: row.id,
    projectId: row.project_id,
    title: row.title,
    done: row.done === 1,
    createdAt: row.created_at,
  };
}

// Autorisointi vastaa kysymykseen: saako juuri tämä käyttäjä käyttää juuri tätä projektia?
function ownedProject(db: DatabaseSync, id: number, ownerId: number): ProjectRow {
  // Molemmat ehdot ovat pakollisia; pelkkä projektin id ei ole käyttöoikeus.
  const row = db.prepare(
    "SELECT id, user_id, title, created_at FROM projects WHERE id = ? AND user_id = ?",
  ).get(id, ownerId) as ProjectRow | undefined;
  // Vastaamme samoin puuttuvaan ja toisen omistamaan projektiin, joten vieraan kohteen olemassaolo ei paljastu.
  if (!row) throw new HttpError(404, "Projektia ei löytynyt.");
  // Vain omistajalle kuuluva rivi palautuu jatkokäsittelyyn.
  return row;
}

// Tehtävän omistaja selvitetään sen projektin kautta: tehtävässä ei ole erillistä käyttäjäkenttää.
function ownedTask(db: DatabaseSync, id: number, ownerId: number): TaskRow {
  // JOIN seuraa viiteavainta tasks.project_id -> projects.id ja tarkistaa projektin omistajan.
  const row = db.prepare(`
    -- tasks.-etuliite kertoo, kumman taulun sarake on kyseessä.
    SELECT tasks.id, tasks.project_id, tasks.title, tasks.done, tasks.created_at
    FROM tasks
    JOIN projects ON projects.id = tasks.project_id
    -- Arvot sidotaan get-kutsussa samassa järjestyksessä kuin kysymysmerkit.
    WHERE tasks.id = ? AND projects.user_id = ?
  `).get(id, ownerId) as TaskRow | undefined;
  // Vieraan tehtävän numeron arvaaminen ei anna oikeutta lukea tai muuttaa sitä.
  if (!row) throw new HttpError(404, "Tehtävää ei löytynyt.");
  // Palautamme vain onnistuneen omistajuustarkistuksen läpäisseen rivin.
  return row;
}

// Tämä reititin käsittelee projektit, tehtävät ja rajatun ylläpitonäkymän.
// Response | null tarkoittaa joko valmista vastausta tai tietoa siitä, ettei reitti kuulu tähän tiedostoon.
export function handleProjects(
  db: DatabaseSync,
  method: string,
  path: string,
  user: User,
  body: JsonObject,
): Response | null {
  // Tällä erillisellä reitillä näytetään vain yhteismääriä; sitä ei käytetä muiden projektien lukemiseen.
  if (path === "/api/admin/stats") {
    // Tilastot ovat vain luettavia; tämä reitti ei muuta dataa.
    if (method !== "GET") throw new HttpError(405, "Tämä reitti hyväksyy vain GET-pyynnön.");
    // Pelkkä kirjautuminen ei riitä: palvelin tarkistaa myös tietokannasta luetun roolin.
    if (user.role !== "admin") throw new HttpError(403, "Toiminto vaatii ylläpitäjän roolin.");
    // Sisäkkäiset SELECT-lauseet laskevat kunkin taulun rivimäärän palauttamatta henkilötietoja.
    const totals = db.prepare(
      "SELECT (SELECT COUNT(*) FROM users) AS users, (SELECT COUNT(*) FROM projects) AS projects, (SELECT COUNT(*) FROM tasks) AS tasks",
    ).get();
    // COUNT palauttaa aina rivin; puuttuminen olisi ohjelman tai tietokannan odottamaton virhe.
    if (!totals) throw new Error("Tilastokysely ei palauttanut riviä.");
    // Number varmistaa, että JSON saa tavallisia lukuja eikä esimerkiksi bigint-arvoja.
    return json({
      users: Number(totals.users),
      projects: Number(totals.projects),
      tasks: Number(totals.tasks),
    });
  }

  // Tämä polku tarkoittaa kirjautuneen käyttäjän projektikokoelmaa.
  if (path === "/api/projects") {
    // GET lukee kokoelman eikä muuta palvelimen dataa.
    if (method === "GET") {
      // WHERE rajaa jo tietokantakyselyn vain kirjautuneen käyttäjän projekteihin.
      const rows = db.prepare(
        "SELECT id, user_id, title, created_at FROM projects WHERE user_id = ? ORDER BY id",
      ).all(user.id) as unknown as ProjectRow[];
      // map muuntaa jokaisen rivin API-olioksi. Tyhjästä kannasta palautuu tyhjä projects-taulukko.
      return json({ projects: rows.map(projectJson) });
    }
    // POST luo tähän kokoelmaan yhden uuden projektin.
    if (method === "POST") {
      // Omistajaa ei hyväksytä rungossa; user_id otetaan palvelimen tunnistamasta käyttäjästä.
      allowFields(body, ["title"]);
      // Projektin nimi on pakollinen ja enintään 120 Unicode-koodipistettä pitkä.
      const title = requireTitle(body.title, 120);
      // Parametrisoitu INSERT käsittelee myös heittomerkit tavallisena nimen tekstinä.
      const result = db.prepare("INSERT INTO projects(user_id, title) VALUES (?, ?)").run(
        user.id,
        title,
      );
      // Haemme luodun projektin, jotta vastauksessa on tietokannan tuottama luontiaika.
      const row = ownedProject(db, Number(result.lastInsertRowid), user.id);
      // 201 kertoo, että uusi projekti luotiin onnistuneesti.
      return json({ project: projectJson(row) }, 201);
    }
    // Tunnettu polku mutta väärä metodi on 405, ei onnistunut operaatio.
    throw new HttpError(405, "Projektikokoelma hyväksyy GET- ja POST-pyynnöt.");
  }

  // Sulkuryhmä ([^/]+) poimii yhden polkuosan projektin tunnukseksi.
  const taskCollection = path.match(/^\/api\/projects\/([^/]+)\/tasks$/);
  // match palauttaa null, jos polku ei täsmää; muussa tapauksessa jatkamme täällä.
  if (taskCollection) {
    // [1] on ensimmäisen sulkuryhmän sisältö; [0] olisi koko osunut teksti.
    const projectId = requireId(taskCollection[1]);
    // Omistajuus tarkistetaan myös tehtävälistan lukemisessa ja uuden tehtävän luomisessa.
    ownedProject(db, projectId, user.id);
    // GET lukee yhden projektin tehtävät.
    if (method === "GET") {
      // JOIN ja user_id-ehto pitävät omistajuusrajauksen mukana myös tässä varsinaisessa datakyselyssä.
      const rows = db.prepare(`
        SELECT tasks.id, tasks.project_id, tasks.title, tasks.done, tasks.created_at
        FROM tasks
        JOIN projects ON projects.id = tasks.project_id
        WHERE tasks.project_id = ? AND projects.user_id = ?
        ORDER BY tasks.id
      `).all(projectId, user.id) as unknown as TaskRow[]; // Tyyppivakuutus koskee omaa SQL-tulosta.
      // Käyttöliittymä saa taulukon, jossa done on true tai false.
      return json({ tasks: rows.map(taskJson) });
    }
    // POST lisää tehtävän polussa yksilöityyn projektiin.
    if (method === "POST") {
      // project_id-kenttää ei hyväksytä rungossa; projekti tulee tarkistetusta URL-polusta.
      allowFields(body, ["title"]);
      // Tehtävän nimessä saa olla 1–200 merkkiä.
      const title = requireTitle(body.title, 200);
      // INSERT ... SELECT lisää rivin vain, jos omistettu projekti on edelleen olemassa.
      const result = db.prepare(
        "INSERT INTO tasks(project_id, title) SELECT id, ? FROM projects WHERE id = ? AND user_id = ?",
      ).run(title, projectId, user.id);
      // Jos projekti olisi poistettu toisen yhteyden kautta, uutta tehtävää ei luoda.
      if (Number(result.changes) !== 1) throw new HttpError(404, "Projektia ei löytynyt.");
      // Haemme luodun tehtävän samalla omistajuuden tarkistavalla apufunktiolla.
      const row = ownedTask(db, Number(result.lastInsertRowid), user.id);
      // 201 ja task-kenttä muodostavat sovitun uuden tehtävän vastauksen.
      return json({ task: taskJson(row) }, 201);
    }
    // Muilla metodeilla ei saa tyhjentää tehtäväkokoelmaa tai ohittaa yksittäisen tehtävän reittejä.
    throw new HttpError(405, "Tehtäväkokoelma hyväksyy GET- ja POST-pyynnöt.");
  }

  // Tämä polku yksilöi yhden projektin.
  const projectItem = path.match(/^\/api\/projects\/([^/]+)$/);
  // Totuusarvoksi tulkittu match-tulos kertoo, löytyikö reitti.
  if (projectItem) {
    // Muunnamme URL-osan turvalliseksi kokonaisluvuksi ennen SQL-kyselyä.
    const id = requireId(projectItem[1]);
    // Jokainen tämän reitin toiminto edellyttää projektin omistajuutta.
    const row = ownedProject(db, id, user.id);
    // GET lukee yhden omistetun projektin.
    if (method === "GET") return json({ project: projectJson(row) });
    // PATCH päivittää nimikentän; omistajan vaihtaminen ei kuulu API-sopimukseen.
    if (method === "PATCH") {
      // Näin käyttäjä ei voi syöttää esimerkiksi toista user_id-arvoa.
      allowFields(body, ["title"]);
      // Uusi nimi käy saman tarkistuksen kuin luomisessa.
      const title = requireTitle(body.title, 120);
      // Päivityksen WHERE tarkistaa uudelleen sekä projektin että omistajan.
      db.prepare("UPDATE projects SET title = ? WHERE id = ? AND user_id = ?").run(
        title,
        id,
        user.id,
      );
      // Vastauksessa on juuri tietokannasta luettu päivitetty tila.
      return json({ project: projectJson(ownedProject(db, id, user.id)) });
    }
    // DELETE poistaa projektin ja viiteavaimen CASCADE-säännöllä sen tehtävät.
    if (method === "DELETE") {
      // Poistopyynnön runko on tyhjä olio {}.
      allowFields(body, []);
      // Omistajuus on mukana myös poistavassa SQL-lauseessa.
      db.prepare("DELETE FROM projects WHERE id = ? AND user_id = ?").run(id, user.id);
      // 204-vastauksessa ei ole JSON-runkoa; selain tarkistaa tilakoodin.
      return new Response(null, { status: 204 });
    }
    // Tunnetun projektireitin muut metodit hylätään.
    throw new HttpError(405, "Projekti hyväksyy GET-, PATCH- ja DELETE-pyynnöt.");
  }

  // Tehtävän reitti sisältää tehtävän oman tunnuksen, ei projektin tunnusta.
  const taskItem = path.match(/^\/api\/tasks\/([^/]+)$/);
  // Vain tähän polkumuotoon osuvat pyynnöt käsitellään tässä lohkossa.
  if (taskItem) {
    // Tunnuksen tyypin ja arvoalueen tarkistus tapahtuu ennen omistajuuskyselyä.
    const id = requireId(taskItem[1]);
    // Omistajuus kulkee tehtävästä projektiin ja projektista kirjautuneeseen käyttäjään.
    const row = ownedTask(db, id, user.id);
    // Myös yhden tehtävän luku on suojattu samalla tarkistuksella.
    if (method === "GET") return json({ task: taskJson(row) });
    // PATCH saa muuttaa nimen, valmistumistilan tai molemmat.
    if (method === "PATCH") {
      // Tehtävää ei voi siirtää toisen käyttäjän projektiin piilotetulla project_id-kentällä.
      allowFields(body, ["title", "done"]);
      // Tyhjä PATCH olisi epäselvä: pyydämme vähintään yhden muutettavan kentän.
      if (Object.keys(body).length === 0) {
        throw new HttpError(400, "Anna uusi nimi tai valmistumistila.");
      }
      // Puuttuva title säilyttää vanhan nimen; annettu nimi validoidaan aina.
      const title = body.title === undefined ? row.title : requireTitle(body.title, 200);
      // Teksti "false" ei ole boolean false: hyväksymme vain aidon JSON-totuusarvon.
      if (body.done !== undefined && typeof body.done !== "boolean") {
        throw new HttpError(400, "done-kentän pitää olla true tai false.");
      }
      // SQLitelle muunnetaan true -> 1 ja false -> 0; puuttuva kenttä säilyttää vanhan arvon.
      const done = body.done === undefined ? row.done : body.done ? 1 : 0;
      // Sisäkkäinen SELECT rajaa päivityksen vain käyttäjän omiin projekteihin.
      db.prepare(
        "UPDATE tasks SET title = ?, done = ? WHERE id = ? AND project_id IN (SELECT id FROM projects WHERE user_id = ?)",
      ).run(title, done, id, user.id);
      // Palautamme tallennetun tilan, jotta frontend voi näyttää oikean lopputuloksen.
      return json({ task: taskJson(ownedTask(db, id, user.id)) });
    }
    // DELETE poistaa yhden omistetun tehtävän.
    if (method === "DELETE") {
      // Tälle toiminnolle ei tarvita lisäkenttiä.
      allowFields(body, []);
      // Myös poistossa omistajuus on osa SQL-lauseen ehtoa.
      db.prepare(
        "DELETE FROM tasks WHERE id = ? AND project_id IN (SELECT id FROM projects WHERE user_id = ?)",
      ).run(id, user.id);
      // Onnistunut poisto palauttaa tyhjän 204-vastauksen.
      return new Response(null, { status: 204 });
    }
    // Esimerkiksi PUT ei korvaa tehtävää huomaamatta kokonaan.
    throw new HttpError(405, "Tehtävä hyväksyy GET-, PATCH- ja DELETE-pyynnöt.");
  }

  // null ilmoittaa app.ts-tiedostolle, ettei mikään tämän tiedoston reiteistä täsmännyt.
  return null;
}
````
