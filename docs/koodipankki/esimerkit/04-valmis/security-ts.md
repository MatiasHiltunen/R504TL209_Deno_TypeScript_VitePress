---
outline: false
---

# esimerkit/04-valmis/security.ts

**Ryhmä:** Valmiin sovelluksen backend.

Tiedoston sijainti puretussa projektissa on `esimerkit/04-valmis/security.ts`. Kopioi koko sisältö kommentteineen tähän tiedostoon. Suorituskomennot ja odotettu tulos ovat asianomaisessa tutoriaaliluvussa.

[Lataa lähdekoodi tekstinä](/koodit/esimerkit/04-valmis/security.ts.txt) · [Palaa koodipankkiin](/koodipankki/)

````ts
// node:crypto tarjoaa Denon mukana vertailun, joka ei lopeta ensimmäiseen eriävään tavuun.
import { timingSafeEqual } from "node:crypto";

// const on muuttumaton nimi. Alaviiva numeroissa helpottaa lukemista: 600_000 = 600000.
export const PASSWORD_ITERATIONS = 600_000; // PBKDF2-HMAC-SHA-256:n työmäärä.
// Kahdeksan tuntia sekunteina; evästeen Max-Age käyttää sekunteja.
export const SESSION_SECONDS = 8 * 60 * 60;
// Sama evästeen nimi on käytössä sekä luotaessa, luettaessa että poistettaessa.
export const COOKIE_NAME = "tehtavataulu_session";

// Paluuolio sisältää tallennettavat arvot; se ei sisällä alkuperäistä salasanaa.
export interface PasswordDigest {
  hash: string; // 32 tavun laskentatulos 64 heksadesimaalimerkkinä.
  salt: string; // 16 satunnaista tavua 32 heksadesimaalimerkkinä.
  iterations: number; // Hitaan laskennan kierrosten määrä.
}

// Uint8Array on tavujono: kukin alkio on kokonaisluku väliltä 0–255.
function toHex(bytes: Uint8Array): string {
  // Array.from käy tavut läpi; nuoli => määrittelee jokaiselle tavulle tehtävän muunnoksen.
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
  // toString(16) kirjoittaa luvun heksamuotoon; padStart lisää tarvittaessa etunollan.
}

// Tässä luemme vain oman tietokantamme tai oman ohjelmamme tuottamaa heksatekstiä.
function fromHex(hex: string) {
  // Kaksi tekstimerkkiä vastaa yhtä tavua; new varaa tulosta varten uuden tavutaulukon.
  const bytes = new Uint8Array(hex.length / 2);
  // for toistaa lohkon; index++ kasvattaa laskuria yhdellä jokaisen kierroksen jälkeen.
  for (let index = 0; index < bytes.length; index++) {
    // slice ottaa kaksi merkkiä ja parseInt(..., 16) tulkitsee ne heksalukuna.
    bytes[index] = Number.parseInt(hex.slice(index * 2, index * 2 + 2), 16);
  }
  // Palautamme oman uuden taulukon: salainen vertailu tarvitsee tekstin sijaan tavuja.
  return bytes;
}

// async-funktio palauttaa Promisen eli myöhemmin valmistuvan tuloksen.
async function derivePassword(
  password: string,
  salt: string,
  iterations: number,
): Promise<Uint8Array> {
  // TextEncoder muuntaa salasanan Unicode-tekstin UTF-8-tavuiksi.
  const passwordBytes = new TextEncoder().encode(password);
  // await odottaa kryptografisen operaation valmistumista; se ei muuta salasanaa tekstiksi lokiin.
  const key = await crypto.subtle.importKey(
    "raw", // Lähtöarvo annetaan tavujonona.
    passwordBytes, // Tämä on salasanan tavuesitys, jota ei tallenneta kantaan.
    "PBKDF2", // Käytämme salasanoille tarkoitettua hidasta avaimenjohdantoa.
    false, // Avainta ei saa viedä ulos tästä CryptoKey-oliosta.
    ["deriveBits"], // Hakasulkeet muodostavat taulukon sallituista toiminnoista.
  );
  // PBKDF2 tekee paljon työtä jokaiselle arvaukselle, mikä hidastaa salasanojen murtamista.
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", salt: fromHex(salt), iterations }, // Aaltosulut luovat asetusolion.
    key, // Käytämme juuri luotua avainta.
    256, // Laskentatuloksen pituus bitteinä: 256 bittiä = 32 tavua.
  );
  // Muunnamme ArrayBuffer-tuloksen tavutaulukoksi myöhempää käsittelyä varten.
  return new Uint8Array(bits);
}

// Rekisteröinti kutsuu tätä funktiota aina uudella satunnaisella suolalla.
export async function hashPassword(password: string): Promise<PasswordDigest> {
  // getRandomValues käyttää kryptografisesti turvallista satunnaisuutta.
  const salt = toHex(crypto.getRandomValues(new Uint8Array(16)));
  // Sama salasana eri suolalla antaa eri tallennettavan tiivisteen.
  const hash = toHex(await derivePassword(password, salt, PASSWORD_ITERATIONS));
  // Lyhennys {hash} tarkoittaa samaa kuin {hash: hash}.
  return { hash, salt, iterations: PASSWORD_ITERATIONS };
}

// Promise<boolean> tarkoittaa myöhemmin saatavaa tosi/epätosi-vastausta.
export async function verifyPassword(password: string, stored: PasswordDigest): Promise<boolean> {
  // Laskemme syötetystä salasanasta vertailuarvon käyttäen tallennettua suolaa ja työmäärää.
  const candidate = await derivePassword(password, stored.salt, stored.iterations);
  // Palautamme tallennetun heksatekstin takaisin 32 tavuksi.
  const expected = fromHex(stored.hash);
  // && vaatii molemmat ehdot. Vertailun molempien tavujonojen on oltava samanpituisia.
  return candidate.length === expected.length && timingSafeEqual(candidate, expected);
}

// Tuntematon sähköposti tekee saman hitaan salasanatyön kuin olemassa oleva käyttäjä.
// Tämä vähentää ilmeistä ajoituseroa; se ei lupaa koko HTTP-pyynnön vakioaikaisuutta.
export const DUMMY_PASSWORD: PasswordDigest = {
  hash: "0".repeat(64), // Keinotekoinen vertailuarvo, jota ei tallenneta käyttäjälle.
  salt: "0".repeat(32), // Keinotekoinen, oikeanpituinen suola vain tuntemattoman tilin polulle.
  iterations: PASSWORD_ITERATIONS, // Sama työmäärä kuin oikealla käyttäjällä.
};

// Istuntotunniste on arvaamaton salaisuus; sitä ei muodosteta käyttäjän tunnuksesta.
export function newSessionToken(): string {
  // 32 satunnaista tavua antaa 256 bittiä satunnaisuutta; tulos on 64 heksamerkkiä.
  return toHex(crypto.getRandomValues(new Uint8Array(32)));
}

// Tunniste on valmiiksi vahvasti satunnainen, joten sille riittää nopea SHA-256-tiiviste.
// Salasanalle ei riitä: salasanaa ihminen voi käyttää uudelleen tai sen voi arvata.
export async function hashSessionToken(token: string): Promise<string> {
  // digest laskee tiivisteen; se ei salaa tietoa palautettavasti.
  const hash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(token));
  // Tallennamme tietokantaan vain tämän tiivisteen.
  return toHex(new Uint8Array(hash));
}

// Luemme Cookie-otsakkeesta vain sovelluksen oman evästeen.
export function readSessionToken(request: Request): string | null {
  // ?? käyttää tyhjää tekstiä, jos otsaketta ei ole eli tulos on null.
  const cookies = (request.headers.get("cookie") ?? "").split(";");
  // map siistii osat; filter pitää vain omalla nimellä alkavat evästeet.
  const matches = cookies.map((part) => part.trim()).filter((part) =>
    part.startsWith(`${COOKIE_NAME}=`)
  );
  // Hylkäämme myös saman nimiset päällekkäiset evästeet, jotta tulkinta on yksiselitteinen.
  if (matches.length !== 1) return null;
  // slice poistaa nimen ja yhtäsuuruusmerkin arvon edestä.
  const token = matches[0].slice(COOKIE_NAME.length + 1);
  // Säännöllinen lauseke hyväksyy täsmälleen oman 64-merkkisen heksamuotomme.
  return /^[a-f0-9]{64}$/.test(token) ? token : null; // ? : valitsee toisen kahdesta arvosta.
}

// secure on true HTTPS-osoitteessa; localhostin tavallinen HTTP käyttää false-arvoa.
export function sessionCookie(token: string, secure: boolean): string {
  // HttpOnly estää JavaScriptin lukemasta evästettä; SameSite auttaa torjumaan sivustojen välisiä pyyntöjä.
  const base =
    `${COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${SESSION_SECONDS}`;
  // Secure rajaa evästeen lähettämisen HTTPS-yhteyksiin. Domain puuttuu: eväste on isäntäkohtainen.
  return base + (secure ? "; Secure" : "");
}

// Eväste poistetaan samalla nimellä ja polulla, joilla se luotiin.
export function deletedSessionCookie(secure: boolean): string {
  // Max-Age=0 käskee selainta poistamaan evästeen; palvelin poistaa myös tietokannan istunnon.
  return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0${secure ? "; Secure" : ""}`;
}

// Yksi laskuririvi kuvaa yhden IP-osoitteen tai sähköpostin yrityksiä aikajaksolla.
interface AttemptWindow {
  count: number; // Kuinka monta yritystä tähän ikkunaan on laskettu.
  resetAt: number; // Milloin laskuri nollautuu, millisekunteina Unix-epookista.
}

// Funktio palauttaa laskuritoiminnon, joka muistaa oman Map-taulukkonsa kutsujen välillä.
// now-parametri on funktio; testeissä voimme antaa sille hallittavan kellon.
export function createRateLimiter(now: () => number) {
  // Map tallentaa avain–arvo-pareja tämän palvelinprosessin muistiin.
  const windows = new Map<string, AttemptWindow>();
  // Yhden ikkunan kesto on 15 minuuttia millisekunneissa.
  const windowMs = 15 * 60 * 1000;
  // Paluuarvo on nuolifunktio: null sallii yrityksen, luku kertoo odotussekunnit.
  return (key: string, limit: number): number | null => {
    // Kello luetaan kerran, jotta tämän kutsun kaikki vertailut käyttävät samaa aikaa.
    const time = now();
    // Siivoamme vanhentuneet laskurit myös muistista, jotta ne eivät kerry ikuisesti.
    for (const [savedKey, window] of windows) {
      // delete poistaa Map-olion rivin, jos aikaraja on saavutettu.
      if (window.resetAt <= time) windows.delete(savedKey);
    }
    // get hakee olemassa olevan laskurin tai palauttaa undefined-arvon.
    let window = windows.get(key);
    // Uudelle avaimelle tarvitaan uusi aikajakso ja laskuri.
    if (!window) {
      // Kiinteä yläraja estää rajattoman määrän yksilöllisiä laskuriavaimia.
      if (windows.size >= 10_000) return 60;
      // Aloitamme nollasta; hetken päästä myös tämä kutsu lasketaan mukaan.
      window = { count: 0, resetAt: time + windowMs };
      // set tallentaa uuden avaimen ja sen laskurin.
      windows.set(key, window);
    }
    // Jos sallittu määrä on jo käytetty, palautamme jäljellä olevat sekunnit ylöspäin pyöristäen.
    if (window.count >= limit) return Math.ceil((window.resetAt - time) / 1000);
    // Myös onnistuneet yritykset lasketaan; tämän tarkoitus on rajata autentikointityön määrää.
    window.count += 1;
    // null tarkoittaa kutsujalle: tämä yritys saa jatkaa.
    return null;
  };
}
````
