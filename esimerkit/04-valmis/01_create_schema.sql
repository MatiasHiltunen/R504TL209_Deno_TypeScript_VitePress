-- Migraatio on tietokannan rakenteen numeroitu muutos. Tämä on muutos numero 1.
-- db.ts suorittaa tämän tiedoston vain, jos muutosta 1 ei ole vielä kirjattu.
-- Älä muuta jo käytetyn migraation sisältöä. Tee myöhemmin uusi migraatio.

-- CREATE TABLE luo taulun: yksi rivi vastaa yhtä käyttäjää.
CREATE TABLE users (
  -- INTEGER PRIMARY KEY antaa riville yksilöllisen kokonaislukutunnuksen.
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  -- NOT NULL vaatii arvon; UNIQUE estää saman sähköpostin kahdesti.
  email TEXT NOT NULL UNIQUE CHECK (length(email) BETWEEN 3 AND 254),
  -- Tallennamme salasanasta hitaan PBKDF2-tiivisteen, emme salasanaa.
  password_hash TEXT NOT NULL CHECK (length(password_hash) = 64),
  -- Salt on käyttäjäkohtainen satunnainen suola, joka ei ole salaisuus.
  password_salt TEXT NOT NULL CHECK (length(password_salt) = 32),
  -- Myös tiivistyksen työmäärä tallennetaan mahdollista myöhempää muutosta varten.
  password_iterations INTEGER NOT NULL CHECK (password_iterations >= 600000),
  -- DEFAULT antaa oletuksen; CHECK sallii vain nämä kaksi roolia.
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  -- UTC-aika tallennetaan tekstinä muodossa 2026-10-19T12:34:56.123Z.
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

-- Projektin omistaja on yksi käyttäjä; käyttäjällä voi olla monta projektia.
CREATE TABLE projects (
  -- Projektilla on oma tunnus: se ei ole sama asia kuin omistajan tunnus.
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  -- FOREIGN KEY -viittaus estää viittauksen käyttäjään, jota ei ole.
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  -- Myös tietokanta torjuu tyhjän tai liian pitkän nimen.
  title TEXT NOT NULL CHECK (length(trim(title)) BETWEEN 1 AND 120),
  -- DEFAULT laskee ajan, kun uusi projekti lisätään.
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

-- Tehtävä kuuluu yhteen projektiin; projektiin voi kuulua monta tehtävää.
CREATE TABLE tasks (
  -- PRIMARY KEY yksilöi juuri tämän tehtävän.
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  -- CASCADE poistaa tehtävät samalla, kun niiden projekti poistetaan.
  project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  -- Tehtävän nimi saa olla projektin nimeä pidempi: enintään 200 merkkiä.
  title TEXT NOT NULL CHECK (length(trim(title)) BETWEEN 1 AND 200),
  -- SQLitessä käytämme kokonaislukuja 0 = kesken ja 1 = valmis.
  done INTEGER NOT NULL DEFAULT 0 CHECK (done IN (0, 1)),
  -- Tekstimuotoinen UTC-aika helpottaa ajan lähettämistä JSON-vastauksessa.
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

-- Istunto yhdistää satunnaisen kirjautumistunnisteen yhteen käyttäjään.
CREATE TABLE sessions (
  -- Tallennamme tunnisteesta vain SHA-256-tiivisteen. Raaka tunniste on evästeessä.
  token_hash TEXT PRIMARY KEY NOT NULL CHECK (length(token_hash) = 64),
  -- Käyttäjän poistaminen mitätöi samalla hänen istuntonsa.
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  -- Millisekunnit Unix-epookista: sama aikayksikkö kuin JavaScriptin Date.now().
  expires_at INTEGER NOT NULL
);

-- Indeksi nopeuttaa omistajan projektien hakua; se ei itsessään anna käyttöoikeutta.
CREATE INDEX projects_owner_index ON projects(user_id);
-- Indeksi nopeuttaa yhden projektin tehtävien hakua.
CREATE INDEX tasks_project_index ON tasks(project_id);
-- Indeksi nopeuttaa käyttäjään liittyvien istuntojen käsittelyä.
CREATE INDEX sessions_user_index ON sessions(user_id);
-- Indeksi nopeuttaa vanhentuneiden istuntojen siivousta.
CREATE INDEX sessions_expiry_index ON sessions(expires_at);
