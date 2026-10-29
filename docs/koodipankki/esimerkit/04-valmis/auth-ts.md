---
outline: false
---

# esimerkit/04-valmis/auth.ts

**Ryhmä:** Valmiin sovelluksen backend.

Tiedoston sijainti puretussa projektissa on `esimerkit/04-valmis/auth.ts`. Kopioi koko sisältö kommentteineen tähän tiedostoon. Suorituskomennot ja odotettu tulos ovat asianomaisessa tutoriaaliluvussa.

[Lataa lähdekoodi tekstinä](/koodit/esimerkit/04-valmis/auth.ts.txt) · [Palaa koodipankkiin](/koodipankki/)

````ts
// import type tuo vain tyyppitiedon; tätä tuontia ei tarvita ohjelman ajossa.
import type { DatabaseSync } from "node:sqlite";
// User on julkinen käyttäjätieto; UserRow sisältää myös salasanan vertailutiedot.
import type { User, UserRow } from "./db.ts";
// HTTP-apufunktiot tarkistavat tuntemattoman JSONin ennen sen käyttämistä.
import {
  allowFields,
  HttpError,
  json,
  type JsonObject,
  requireEmail,
  requirePassword,
} from "./http.ts";
// Turvatoiminnot on erotettu omaan tiedostoonsa, jotta niiden tehtävät näkyvät selvästi.
import {
  createRateLimiter,
  deletedSessionCookie,
  DUMMY_PASSWORD,
  hashPassword,
  hashSessionToken,
  newSessionToken,
  readSessionToken,
  SESSION_SECONDS,
  sessionCookie,
  verifyPassword,
} from "./security.ts";

// Tehdasfunktio kokoaa tämän yhden palvelimen kirjautumistoiminnot ja yhteisen yrityslaskurin.
export function createAuth(db: DatabaseSync, secureCookies: boolean, now: () => number) {
  // Sulkeuma muistaa laskurit, vaikka yksi HTTP-pyyntö päättyisi.
  const consumeAttempt = createRateLimiter(now);

  // Sisäinen apufunktio muuttaa ylitetyn rajan käyttäjälle näkyväksi HTTP-virheeksi.
  function checkAttempts(key: string, maximum: number): void {
    // Paluuarvo null tarkoittaa sallittua yritystä; numero on odotussekuntien määrä.
    const retryAfter = consumeAttempt(key, maximum);
    // !== vertaa arvoja ilman automaattista tyyppimuunnosta.
    if (retryAfter !== null) {
      // 429 kertoo liian monista yrityksistä; Retry-After kertoo, milloin voi yrittää uudelleen.
      throw new HttpError(429, "Liian monta yritystä. Odota ja yritä uudelleen.", {
        "Retry-After": String(retryAfter),
      });
    }
  }

  // Tämä tarkistus lukee käyttäjän aina palvelimen istunnosta, ei pyynnön user_id-kentästä.
  async function currentUser(request: Request): Promise<User> {
    // Evästeen arvo on salainen satunnaistunniste, ei käyttäjän rooli tai käyttäjätunnus.
    const token = readSessionToken(request);
    // Puuttuva tai vääränmuotoinen eväste ei riitä kirjautumiseen.
    if (!token) throw new HttpError(401, "Kirjaudu ensin sisään.");
    // Tietokannasta haetaan tunnisteen tiivisteellä; raakaa tunnistetta ei tallenneta.
    const tokenHash = await hashSessionToken(token);
    // Poistamme myös palvelimen puolella vanhentuneet istunnot ennen käyttöoikeustarkistusta.
    db.prepare("DELETE FROM sessions WHERE expires_at <= ?").run(now());
    // JOIN yhdistää voimassa olevan istunnon käyttäjään; rooli luetaan tämänhetkisestä käyttäjärivistä.
    const user = db.prepare(`
      -- Palautamme vain julkiseen User-tyyppiin kuuluvat kentät.
      SELECT users.id, users.email, users.role
      FROM sessions
      JOIN users ON users.id = sessions.user_id
      -- Molemmat ehdot vaaditaan: oikea tunniste ja tulevaisuudessa oleva vanhenemisaika.
      WHERE sessions.token_hash = ? AND sessions.expires_at > ?
    `).get(tokenHash, now()) as User | undefined; // as kuvaa oman SQL-kyselymme tuloksen TypeScriptille.
    // Tuntematon, poistettu tai vanhentunut istunto tuottaa saman 401-virheen.
    if (!user) throw new HttpError(401, "Kirjaudu ensin sisään.");
    // Paluuolio ei sisällä salasanatietoja eikä istuntotunnistetta.
    return user;
  }

  // Jokainen onnistunut kirjautuminen ja rekisteröinti saa uuden satunnaistunnisteen.
  async function beginSession(request: Request, user: User, status: number): Promise<Response> {
    // Luomme uuden tunnisteen; emme jatka selaimen mahdollisesti lähettämällä vanhalla arvolla.
    const token = newSessionToken();
    // Laskemme uuden tunnisteen tietokantaan tallennettavan tiivisteen.
    const tokenHash = await hashSessionToken(token);
    // Luemme vanhan evästeen, jotta tämän selaimen aikaisempi istunto voidaan mitätöidä.
    const oldToken = readSessionToken(request);
    // ? : tekee vanhan tunnisteen tiivisteen vain, jos tunniste oli olemassa.
    const oldHash = oldToken ? await hashSessionToken(oldToken) : null;
    // Tässä Date.now-yksikkö on millisekunti; kerromme evästeen sekunnit tuhannella.
    const expiresAt = now() + SESSION_SECONDS * 1000;
    // Istunnon vaihto on yksi tietokantatapahtuma: vanha poistuu ja uusi lisätään yhdessä.
    db.exec("BEGIN IMMEDIATE;");
    // try/catch varmistaa, ettei epäonnistunut vaihto jää puolikkaaksi.
    try {
      // Mahdollinen aiempi eväste ei jää toimivaksi uuden kirjautumisen jälkeen.
      if (oldHash) db.prepare("DELETE FROM sessions WHERE token_hash = ?").run(oldHash);
      // Siivoamme vanhentuneet istunnot myös kirjautumisen yhteydessä.
      db.prepare("DELETE FROM sessions WHERE expires_at <= ?").run(now());
      // Parametrit annetaan run-kutsussa; niitä ei liitetä SQL-tekstiin.
      db.prepare("INSERT INTO sessions(token_hash, user_id, expires_at) VALUES (?, ?, ?)").run(
        tokenHash,
        user.id,
        expiresAt,
      );
      // Vahvistamme kaikki tapahtuman muutokset.
      db.exec("COMMIT;");
    } catch (error) {
      // Virheessä palautamme tietokannan ennen tapahtumaa vallinneeseen tilaan.
      db.exec("ROLLBACK;");
      // app.ts muuttaa odottamattoman virheen yleiseksi palvelinvirheeksi.
      throw error;
    }
    // Set-Cookie on HTTP-vastausotsake: selain tallentaa sen automaattisesti omaksi evästeekseen.
    return json({ user }, status, { "Set-Cookie": sessionCookie(token, secureCookies) });
  }

  // Rekisteröinti luo tavallisen käyttäjän ja avaa tälle istunnon.
  async function register(request: Request, body: JsonObject, clientIp: string): Promise<Response> {
    // Asiakas saa lähettää vain sähköpostin ja salasanan; role-kenttä hylätään.
    allowFields(body, ["email", "password"]);
    // Tarkistamme ja yhdenmukaistamme sähköpostiosoitteen.
    const email = requireEmail(body.email);
    // Tarkistamme salasanan pituuden muuttamatta sen sisältöä.
    const password = requirePassword(body.password);
    // Yksi IP saa tässä opetuspalvelimessa tehdä enintään 10 rekisteröintiyritystä 15 minuutissa.
    checkAttempts(`register:ip:${clientIp}`, 10);
    // Salasanan hidas laskenta tehdään ennen tietokantaan tallentamista.
    const digest = await hashPassword(password);
    // Rooli on kovakoodattu user-arvoksi; käyttäjä ei voi valita admin-roolia.
    const result = db.prepare(`
      -- Salasana-arvot ovat erillisiä parametreja, eivät SQL-koodin osia.
      INSERT INTO users(email, password_hash, password_salt, password_iterations, role)
      VALUES (?, ?, ?, ?, 'user')
      -- UNIQUE-rajoite suojaa myös kahta samanaikaista samalla osoitteella tehtyä rekisteröintiä.
      ON CONFLICT(email) DO NOTHING
    `).run(email, digest.hash, digest.salt, digest.iterations);
    // changes kertoo muutettujen rivien määrän; nolla tarkoittaa varattua sähköpostia.
    if (Number(result.changes) === 0) {
      throw new HttpError(409, "Rekisteröinti ei onnistunut näillä tiedoilla.");
    }
    // Muodostamme vain selaimelle sopivan julkisen käyttäjäolion.
    const user: User = { id: Number(result.lastInsertRowid), email, role: "user" };
    // 201 on uuden resurssin luomista tarkoittava HTTP-tila.
    return await beginSession(request, user, 201);
  }

  // Kirjautumisessa tunnistetaan käyttäjä olemassa olevan salasanan avulla.
  async function login(request: Request, body: JsonObject, clientIp: string): Promise<Response> {
    // Reitti ei hyväksy esimerkiksi roolia, istunnon tunnistetta tai käyttäjän numeerista tunnusta.
    allowFields(body, ["email", "password"]);
    // Samaa normalisointia käytetään rekisteröinnissä ja kirjautumisessa.
    const email = requireEmail(body.email);
    // Salasanaan ei tehdä trim- eikä kirjainkoon muutosta.
    const password = requirePassword(body.password);
    // IP tulee Deno.serve-yhteyden tiedoista, ei asiakkaan X-Forwarded-For-otsakkeesta.
    checkAttempts(`login:ip:${clientIp}`, 20);
    // Lisäksi yhden sähköpostin arvailuja rajataan viiteen yritykseen 15 minuutissa.
    checkAttempts(`login:email:${email}`, 5);
    // Kysely etsii tiliä parametrina annetulla sähköpostilla.
    const row = db.prepare(
      "SELECT id, email, role, password_hash, password_salt, password_iterations FROM users WHERE email = ?",
    ).get(email) as UserRow | undefined;
    // Olemassa olevalta tililtä käytetään sen omaa suolaa; tuntemattomalle tehdään sama laskentatyö.
    const stored = row
      ? { hash: row.password_hash, salt: row.password_salt, iterations: row.password_iterations }
      : DUMMY_PASSWORD;
    // Tämä vertailu tapahtuu myös silloin, kun sähköpostiosoitetta ei löydy.
    const matches = await verifyPassword(password, stored);
    // Sama viesti ja tilakoodi peittävät sen, oliko sähköposti vai salasana väärä.
    if (!row || !matches) throw new HttpError(401, "Sähköposti tai salasana on väärä.");
    // Salasanan tiivistettä tai suolaa ei sisällytetä selaimelle palautettavaan olioon.
    const user: User = { id: row.id, email: row.email, role: row.role };
    // Onnistunut kirjautuminen vaihtaa istunnon uuteen tunnisteeseen.
    return await beginSession(request, user, 200);
  }

  // Uloskirjautuminen mitätöi palvelimen istunnon, vaikka eväste olisi kopioitu talteen.
  async function logout(request: Request, body: JsonObject): Promise<Response> {
    // Logoutin JSON-runko on tyhjä olio {}.
    allowFields(body, []);
    // Istunnon puuttuminen ei estä uloskirjautumisen loppuun viemistä.
    const token = readSessionToken(request);
    // Käytämme tietokantahakuun vain tiivistettä.
    if (token) {
      db.prepare("DELETE FROM sessions WHERE token_hash = ?").run(await hashSessionToken(token));
    }
    // 204 tarkoittaa onnistumista ilman vastausrunkoa; null on tällöin pakollinen sisältö.
    return new Response(null, {
      status: 204,
      headers: { "Set-Cookie": deletedSessionCookie(secureCookies) },
    });
  }

  // Tehdas antaa kutsujalle neljä nimettyä toimintoa, joilla on sama tietokanta ja laskuri.
  return { currentUser, register, login, logout };
}
````
