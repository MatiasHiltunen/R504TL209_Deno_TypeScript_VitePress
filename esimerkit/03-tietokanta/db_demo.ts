// import tuo kirjastosta nimetyn toiminnon käyttöömme tässä tiedostossa.
// node:sqlite on Denon mukana tuleva SQLite-yhteensopivuusmoduuli: Nodea ei asenneta.
import { DatabaseSync } from "node:sqlite";

// new avaa tietokannan ja luo tiedoston, jos sitä ei vielä ole.
// Polku alkaa pisteellä, joten se on suhteessa terminaalin nykyiseen hakemistoon.
const db = new DatabaseSync("./harjoitus.sqlite");

// try...finally varmistaa, että yhteys suljetaan myös virheen sattuessa.
try {
  // exec suorittaa kiinteän SQL-lauseen ilman käyttäjältä tulevaa sisältöä.
  // PRAGMA on SQLite-asetus; foreign_keys ottaa viiteavaimien valvonnan käyttöön.
  db.exec("PRAGMA foreign_keys = ON;");
  // Monirivinen merkkijono kirjoitetaan takamerkkien eli `-merkkien väliin.
  db.exec(`
    -- CREATE TABLE luo taulun. IF NOT EXISTS säilyttää jo olevan taulun ja sen tiedot.
    CREATE TABLE IF NOT EXISTS notes (
      -- INTEGER PRIMARY KEY antaa jokaiselle riville yksilöllisen numeron.
      id INTEGER PRIMARY KEY,
      -- TEXT on tekstiä, NOT NULL vaatii arvon ja CHECK rajaa sallitun pituuden.
      title TEXT NOT NULL CHECK(length(title) BETWEEN 1 AND 200),
      -- SQLite käyttää tässä totuusarvoon 0:aa tai 1:tä; DEFAULT 0 on alkuarvo.
      done INTEGER NOT NULL DEFAULT 0 CHECK(done IN (0, 1))
    );
  `);
  // Deno.args sisältää tiedostonimen jälkeiset komentoriviargumentit.
  // ?? antaa oletusarvon, jos pyydettyä alkiota ei ole.
  const command = Deno.args[0] ?? "list";
  // if valitsee lisäyskomennon perusteella suoritettavan lohkon.
  if (command === "add") {
    // slice ottaa argumentit indeksistä 1 alkaen; join yhdistää sanat välilyönnein.
    const title = Deno.args.slice(1).join(" ").trim();
    // Tarkistamme rajat myös ennen SQL-kyselyä, jotta virhe on opiskelijalle selkeä.
    if (title.length < 1 || title.length > 200) {
      // Error on virheolio; throw keskeyttää tämän työn ja siirtää virheen kutsujalle.
      throw new Error("Otsikon pituuden pitää olla 1–200 merkkiä.");
    }
    // ? on paikkamerkki. Teksti annetaan run-metodille erillisenä arvona.
    // Tämän vuoksi tekstin heittomerkki ei voi muuttaa SQL-lauseen rakennetta.
    const result = db.prepare("INSERT INTO notes (title) VALUES (?)").run(title);
    // lastInsertRowid kertoo juuri lisätyn rivin tunnisteen.
    console.log("Lisätty tunnisteella", result.lastInsertRowid);
  } else if (command === "done" || command === "delete") {
    // Number muuttaa argumentin numeroksi; puuttuvasta arvosta tulee NaN.
    const id = Number(Deno.args[1]);
    // Turvallinen kokonaisluku on kokonaisluku JavaScriptin tarkasti esitettävällä alueella.
    if (!Number.isSafeInteger(id) || id < 1) {
      // Selkeä virhe auttaa korjaamaan komentoa arvaamisen sijaan.
      throw new Error("Anna positiivinen kokonaislukutunniste, esimerkiksi done 1.");
    }
    // Ehdollinen lauseke ? : valitsee kahdesta kiinteästä SQL-lauseesta yhden.
    const sql = command === "done"
      // UPDATE muuttaa olemassa olevan rivin; WHERE rajaa muutoksen yhteen tunnisteeseen.
      ? "UPDATE notes SET done = 1 WHERE id = ?"
      // DELETE poistaa rivin; parametrin käyttö rajaa kohteen täsmällisesti.
      : "DELETE FROM notes WHERE id = ?";
    // Myös numeerinen tunniste annetaan paikkamerkkiin erillään SQL-tekstistä.
    const result = db.prepare(sql).run(id);
    // changes kertoo muutettujen rivien määrän, ei koko taulun kokoa.
    console.log("Muutettuja rivejä:", result.changes);
  } else if (command !== "list") {
    // Tuntematon komento ei saa vahingossa tehdä muuta tietokantatyötä.
    throw new Error("Komennot: list, add Otsikko, done TUNNISTE, delete TUNNISTE.");
  }
  // SELECT hakee rivejä; ORDER BY pitää tulostusjärjestyksen samana.
  const rows = db.prepare("SELECT id, title, done FROM notes ORDER BY id").all();
  // console.table näyttää haetut rivit luettavana taulukkona terminaalissa.
  console.table(rows);
} finally {
  // close vapauttaa tietokantayhteyden. Tiedosto säilyy seuraavaa suoritusta varten.
  db.close();
}
