// import tuo toisessa moduulissa määritellyn nimen tähän tiedostoon.
// node:sqlite on Denon mukana tuleva yhteensopivuusmoduuli, ei npm-asennus.
import { DatabaseSync } from "node:sqlite";

// export sallii muiden tiedostojen käyttää tätä tyyppiä; type ei luo ajettavaa koodia.
export type Role = "user" | "admin"; // Pystyviiva tarkoittaa: jompikumpi näistä arvoista.

// interface kuvaa olion muodon TypeScriptille; se ei tarkista selaimen lähettämää dataa.
export interface User {
  id: number; // number on JavaScriptin lukutyyppi.
  email: string; // string on merkkijono eli teksti.
  role: Role; // Rooli on yllä määritelty user tai admin.
} // Aaltosulku päättää tämän tyypin kentät.

// extends lisää User-tyypin kenttien rinnalle tietokannassa tarvittavat salasanatiedot.
export interface UserRow extends User {
  password_hash: string; // Tiiviste heksadesimaalisena tekstinä.
  password_salt: string; // Satunnainen suola heksadesimaalisena tekstinä.
  password_iterations: number; // PBKDF2-laskennan kierrosten määrä.
}

// Tietokannan sarakkeissa käytämme alaviivaa; JSONissa muunnetaan camelCase-muotoon.
export interface ProjectRow {
  id: number; // Projektin tietokantatunnus.
  user_id: number; // Projektin omistajan tunnus; sitä ei oteta asiakaspyynnöstä.
  title: string; // Projektin nimi.
  created_at: string; // Luontiaika UTC-ajassa.
}

// Tämä tyyppi kuvaa tehtävän yhden tietokantarivin.
export interface TaskRow {
  id: number; // Tehtävän oma tunnus.
  project_id: number; // Viittaus projektiin.
  title: string; // Tehtävän nimi.
  done: number; // SQLite käyttää arvoa 0 tai 1; API palauttaa boolean-arvon.
  created_at: string; // Tehtävän luontiaika.
}

// function määrittelee toiminnon; path-parametri on tietokantatiedoston polku.
// Paluutyypin DatabaseSync merkitys: kutsuja saa avatun tietokantayhteyden.
export function openDatabase(path: string): DatabaseSync {
  // new luo olion. Erityinen polku :memory: luo testille vain muistissa olevan kannan.
  const db = new DatabaseSync(path);
  // try aloittaa lohkon, jonka virheet käsitellään alempana catch-lohkossa.
  try {
    // Viiteavaimet on otettava käyttöön erikseen jokaisessa SQLite-yhteydessä.
    db.exec("PRAGMA foreign_keys = ON;");
    // WAL on kirjoitusloki; tiedostokanta voi luoda myös -wal- ja -shm-tiedostoja.
    db.exec("PRAGMA journal_mode = WAL;");
    // Lyhyt lukitus odottaa enintään 5 sekuntia ennen tietokantavirhettä.
    db.exec("PRAGMA busy_timeout = 5000;");
    // Muutoskirjanpito on erillinen taulu, jonka voi turvallisesti varmistaa joka käynnistyksellä.
    db.exec(`
      -- IF NOT EXISTS jättää jo olemassa olevan taulun rauhaan.
      CREATE TABLE IF NOT EXISTS schema_migrations (
        -- Yksi rivi tarkoittaa yhtä jo suoritettua migraatiota.
        version INTEGER PRIMARY KEY,
        -- Tallennamme myös muutoksen suoritusajan.
        applied_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
      );
    `); // Kenoviivan sijaan nämä monirivisen tekstin rajat ovat gravismerkkejä `.
    // BEGIN IMMEDIATE varaa kirjoituksen: kaksi käynnistystä ei suorita samaa muutosta yhtä aikaa.
    db.exec("BEGIN IMMEDIATE;");
    // Sisempi try antaa mahdollisuuden perua keskeneräinen rakenteen muutos.
    try {
      // prepare valmistelee SQL-lauseen; get hakee yhden rivin tai undefined-arvon.
      const applied = db.prepare("SELECT version FROM schema_migrations WHERE version = ?").get(1);
      // Huutomerkki tarkoittaa negaatiota: jos riviä ei löydy, muutos on tekemättä.
      if (!applied) {
        // import.meta.url on tämän tiedoston osoite, joten polku ei riipu kutsujan hakemistosta.
        const schema = Deno.readTextFileSync(new URL("./01_create_schema.sql", import.meta.url));
        // Tässä exec suorittaa oman SQL-tiedostomme, ei koskaan käyttäjältä tullutta SQL-tekstiä.
        db.exec(schema);
        // Kysymysmerkki on parametrin paikka; run sitoo arvon 1 erillään SQL-koodista.
        db.prepare("INSERT INTO schema_migrations(version) VALUES (?)").run(1);
      }
      // COMMIT vahvistaa sekä taulut että muutoskirjanpidon yhtenä kokonaisuutena.
      db.exec("COMMIT;");
    } catch (error) { // Virhe siirtää suorituksen tähän; error on saatu virheolio.
      // ROLLBACK peruu keskeneräisen tapahtuman, jotta kantaan ei jää puolikasta rakennetta.
      db.exec("ROLLBACK;");
      // throw välittää virheen kutsujalle eikä väitä käynnistyksen onnistuneen.
      throw error;
    }
    // return päättää funktion ja antaa avatun yhteyden kutsujan käytettäväksi.
    return db;
  } catch (error) {
    // Jos alustus epäonnistuu, yhteyttä ei jätetä avoimeksi.
    db.close();
    // Kutsuja saa alkuperäisen virheen ja voi pysäyttää käynnistyksen.
    throw error;
  }
}
