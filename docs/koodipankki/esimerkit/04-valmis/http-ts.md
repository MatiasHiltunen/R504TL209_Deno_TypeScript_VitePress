---
outline: false
---

# esimerkit/04-valmis/http.ts

**Ryhmä:** Valmiin sovelluksen backend.

Tiedoston sijainti puretussa projektissa on `esimerkit/04-valmis/http.ts`. Kopioi koko sisältö kommentteineen tähän tiedostoon. Suorituskomennot ja odotettu tulos ovat asianomaisessa tutoriaaliluvussa.

[Lataa lähdekoodi tekstinä](/koodit/esimerkit/04-valmis/http.ts.txt) · [Palaa koodipankkiin](/koodipankki/)

````ts
// Record<string, unknown> tarkoittaa oliota, jonka kenttien arvoja ei vielä tunneta.
// unknown pakottaa tarkistamaan arvon ennen käyttöä: selaimen JSON ei ole luotettua.
export type JsonObject = Record<string, unknown>;

// extends Error tekee omasta virheestämme tavallisen JavaScript-virheen alityypin.
export class HttpError extends Error {
  status: number; // Esimerkiksi 400 = virheellinen pyyntö tai 401 = kirjautuminen puuttuu.
  headers: Record<string, string>; // Esimerkiksi Retry-After kertoo odotusajan sekunteina.

  // constructor suoritetaan, kun muu koodi kutsuu new HttpError(...).
  constructor(status: number, message: string, headers: Record<string, string> = {}) {
    // super kutsuu Error-yliluokan alustusta ja tallettaa virheilmoituksen.
    super(message);
    // this tarkoittaa juuri luotavaa virheoliota; tallennamme sille omat kentät.
    this.status = status;
    // Parametrin oletus {} tarkoittaa tyhjää oliota, jos otsakkeita ei anneta.
    this.headers = headers;
  }
}

// Yksi apufunktio varmistaa, että kaikki JSON-vastaukset ilmoittavat sisältötyyppinsä.
export function json(
  data: unknown,
  status = 200,
  extraHeaders: Record<string, string> = {},
): Response {
  // JSON.stringify muuttaa JavaScript-arvon JSON-tekstiksi; Response on HTTP-vastaus.
  return new Response(JSON.stringify(data), {
    status, // Kentän lyhyt muoto käyttää samannimisen parametrin arvoa.
    headers: { "Content-Type": "application/json; charset=utf-8", ...extraHeaders }, // ... kopioi lisäotsakkeet.
  });
}

// Kirjoittava pyyntö voi muuttaa tietoa; myös kirjautuminen ja uloskirjautuminen kuuluvat tähän.
export function isWriteMethod(method: string): boolean {
  // includes palauttaa true, jos metodi löytyy tästä sallittujen kirjoitusmetodien taulukosta.
  return ["POST", "PUT", "PATCH", "DELETE"].includes(method);
}

// CSRF tarkoittaa hyökkäystä, jossa toinen sivusto yrittää tehdä pyynnön käyttäjän evästeellä.
export function checkWriteRequest(request: Request, allowedOrigin: string): void {
  // Origin koostuu protokollasta, isäntänimestä ja portista; selaimen JavaScript ei voi vapaasti asettaa sitä.
  if (request.headers.get("origin") !== allowedOrigin) {
    // Puuttuva Origin hylätään myös. Esimerkiksi curl-harjoituksessa se on lisättävä itse.
    throw new HttpError(403, "Pyynnön alkuperää ei hyväksytty.");
  }
  // Otsakkeessa voi olla myös charset; erotamme varsinaisen mediatyypin ennen puolipistettä.
  const contentType = request.headers.get("content-type")?.split(";")[0].trim().toLowerCase();
  // JSON-vaatimus estää tavallisen vieraan sivuston HTML-lomakkeen käyttämisen API:n kirjoituksiin.
  if (contentType !== "application/json") {
    // 415 kertoo, ettei pyynnön sisältötyyppi ole tuettu.
    throw new HttpError(415, "Käytä Content-Type: application/json -otsaketta.");
  }
}

// Luemme enintään 16 KiB, vaikka asiakas jättäisi Content-Length-otsakkeen pois tai valehtelisi sen.
export async function readJsonObject(request: Request): Promise<JsonObject> {
  // Tämä tavuraja koskee koko JSON-runkoa, ei vain yhtä kenttää.
  const limit = 16 * 1024;
  // Number muuntaa pituusotsakkeen luvuksi; puuttuva otsake tuottaa tässä nollan.
  const declaredLength = Number(request.headers.get("content-length") ?? "0");
  // Selvästi liian pitkän pyynnön voi hylätä jo ennen rungon lukemista.
  if (declaredLength > limit) {
    // ?. kutsuu cancel-metodia vain, jos body on olemassa; peruminen lopettaa lisäluennan.
    await request.body?.cancel();
    // 413 ilmaisee liian suuren pyynnön.
    throw new HttpError(413, "Pyynnön sisältö saa olla enintään 16 KiB.");
  }
  // Myös poistossa lähetetään JSON-olio {}: pyyntö ei jää sisällöltään tulkinnanvaraiseksi.
  if (!request.body) throw new HttpError(400, "Lähetä JSON-olio, esimerkiksi {}.");
  // getReader antaa pääsyn rungon tavupaloihin yksi pala kerrallaan.
  const reader = request.body.getReader();
  // Tämä taulukko pitää vastaanotetut palat, kunnes tiedämme kokonaispituuden.
  const chunks: Uint8Array[] = [];
  // let sallii arvon muuttamisen: koko kasvaa jokaisesta uudesta palasta.
  let total = 0;
  // finally-lohko alempana vapauttaa lukijan myös virheessä.
  try {
    // while toistaa lukemista, kunnes break päättää silmukan.
    while (true) {
      // Destrukturointi {value, done} poimii kaksi kenttää lukutuloksesta.
      const { value, done } = await reader.read();
      // done kertoo, että koko pyyntörunko on luettu.
      if (done) break;
      // byteLength mittaa todellisia tavuja; merkkimäärä voisi olla tätä pienempi.
      total += value.byteLength;
      // Tarkistamme todellisen koon ennen kuin tallennamme tämän palan.
      if (total > limit) {
        // Lopetamme rungon lukemisen heti, kun raja ylittyy.
        await reader.cancel();
        // Heitetty virhe muutetaan app.ts-tiedostossa selkeäksi JSON-vastaukseksi.
        throw new HttpError(413, "Pyynnön sisältö saa olla enintään 16 KiB.");
      }
      // push lisää yhden palan taulukon loppuun.
      chunks.push(value);
    }
  } finally {
    // Lukijan lukko ei saa jäädä varatuksi onnistumisen tai virheen jälkeen.
    reader.releaseLock();
  }
  // Varaamme täsmälleen lukemamme kokoisen yhteisen tavutaulukon.
  const bytes = new Uint8Array(total);
  // offset kertoo, mihin kohtaan seuraava pala kirjoitetaan.
  let offset = 0;
  // for...of käy läpi tallennetut palat niiden alkuperäisessä järjestyksessä.
  for (const chunk of chunks) {
    // set kopioi palan tavut oikeaan kohtaan.
    bytes.set(chunk, offset);
    // Seuraava pala alkaa juuri kirjoitetun palan jälkeen.
    offset += chunk.byteLength;
  }
  // JSON.parse voi heittää virheen; sen tulos on aluksi tarkoituksella unknown.
  let parsed: unknown;
  // Käsittelemme virheellisen UTF-8-tekstin ja virheellisen JSONin samalla ymmärrettävällä virheellä.
  try {
    // fatal=true torjuu rikkinäiset UTF-8-tavut; parse tulkitsee tekstin JSON-arvoksi.
    parsed = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
  } catch {
    // 400 kertoo, että pyyntö ei ole kelvollista JSONia.
    throw new HttpError(400, "Pyynnön sisältö ei ole kelvollista JSONia.");
  }
  // typeof null on myös object, joten null pitää sulkea erikseen pois; taulukko ei ole lomakeolio.
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    // || tarkoittaa: ainakin yksi näistä hylkäysehdoista toteutuu.
    throw new HttpError(400, "JSONin ylimmän tason pitää olla olio.");
  }
  // as kertoo TypeScriptille juuri tarkistetun rakenteen; yksittäiset kentät ovat yhä unknown.
  return parsed as JsonObject;
}

// Torjumme ylimääräiset kentät kuten role, user_id ja project_id, ellei reitti nimenomaan salli niitä.
export function allowFields(body: JsonObject, allowed: string[]): void {
  // Object.keys palauttaa olion omien kenttien nimet.
  for (const field of Object.keys(body)) {
    // Syöte ei saa laajentaa reitin toimivaltaa lisäämällä omia kenttiään.
    if (!allowed.includes(field)) {
      throw new HttpError(400, "Pyynnössä on kenttä, jota tämä toiminto ei hyväksy.");
    }
  }
}

// Sähköpostin tarkistus on palvelimella pakollinen, vaikka selainkin tarkistaa lomaketta.
export function requireEmail(value: unknown): string {
  // typeof tekee ajonaikaisen tyyppitarkistuksen; TypeScript-tyyppi yksin ei tee sitä.
  if (typeof value !== "string") throw new HttpError(400, "Anna sähköpostiosoite tekstinä.");
  // trim poistaa reunavälilyönnit ja toLowerCase yhdenmukaistaa tilin nimen.
  const email = value.trim().toLowerCase();
  // Tämä on kurssin muototarkistus; osoitteen omistajuus vaatisi erillisen vahvistusviestin.
  // Myös näkymätön NUL torjutaan, jotta tietokannan tekstipituuden tulkinta ei poikkea tarkistuksesta.
  if (
    email.length > 254 || email.includes("\u0000") ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    // Virhe ei kerro, onko osoitteella olemassa tiliä.
    throw new HttpError(400, "Anna sähköpostiosoite muodossa nimi@example.test.");
  }
  // Kutsuja saa yhdenmukaistetun osoitteen, ei alkuperäistä tarkistamatonta arvoa.
  return email;
}

// Salasanassa sallitaan välilyönnit ja pitkät salalauseet, eikä sitä koskaan trimmailla.
export function requirePassword(value: unknown): string {
  // Vain merkkijono kelpaa; esimerkiksi numerosta ei tehdä salasanaa automaattisesti.
  if (typeof value !== "string") throw new HttpError(400, "Anna salasana tekstinä.");
  // Array.from laskee Unicode-koodipisteet; esimerkiksi moni emoji on useampi tällainen piste.
  const length = Array.from(value).length;
  // 15–128 merkkiä on tämän harjoitussovelluksen salasanakäytäntö ilman MFA:ta.
  if (length < 15 || length > 128) {
    throw new HttpError(400, "Salasanassa pitää olla 15–128 merkkiä.");
  }
  // Salasanan sisältöä ei muuteta huomaamatta tarkistuksen yhteydessä.
  return value;
}

// Sama nimitarkistus toimii projekteille ja tehtäville eri enimmäispituuksilla.
export function requireTitle(value: unknown, maxLength: number): string {
  // JSON voi sisältää myös taulukon tai numeron; torjumme ne tässä.
  if (typeof value !== "string") throw new HttpError(400, "Anna nimi tekstinä.");
  // Nimen reunoilla olevat tyhjät merkit eivät kuulu tallennettavaan nimeen.
  const title = value.trim();
  // Unicode-koodipisteiden laskenta vastaa tavallisen SQLite-tekstin length-tarkistuksen tarkoitusta.
  const length = Array.from(title).length;
  // Kieltämällä NUL-merkin vältämme SQLite length -funktion ja JavaScriptin erilaisen NUL-tulkinnan.
  if (length < 1 || length > maxLength || title.includes("\u0000")) {
    // ${...} sijoittaa muuttujan arvon gravismerkkien rajaamaan tekstipohjaan.
    throw new HttpError(400, `Nimessä pitää olla 1–${maxLength} merkkiä eikä NUL-merkkiä.`);
  }
  // Vain tarkistettu teksti jatkaa tietokantakerrokseen.
  return title;
}

// Polun :id-osa saapuu tekstinä; tietokanta tarvitsee positiivisen kokonaisluvun.
export function requireId(value: string): number {
  // Pelkät numeromerkit kelpaavat; esimerkiksi 1abc tai -2 eivät kelpaa.
  if (!/^\d+$/.test(value)) throw new HttpError(404, "Kohdetta ei löytynyt.");
  // Number tulkitsee kokonaisen merkkijonon luvuksi.
  const id = Number(value);
  // SafeInteger estää JavaScriptin tarkkuusrajan ylittävät tunnukset.
  if (!Number.isSafeInteger(id) || id <= 0) throw new HttpError(404, "Kohdetta ei löytynyt.");
  // Palautamme tyypitetyn ja tarkistetun numeron.
  return id;
}

// Asetamme samat suojaavat otsakkeet myös virhevastauksille ja staattisille tiedostoille.
export function secureResponse(response: Response, https: boolean): Response {
  // CSP rajaa sivun oman originin skripteihin, tyyleihin, kuviin ja verkkopyyntöihin.
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'none'; script-src 'self'; style-src 'self'; connect-src 'self'; img-src 'self'; base-uri 'none'; form-action 'self'; frame-ancestors 'none'",
  );
  // Selain ei saa arvata esimerkiksi JSON-tekstin olevan suoritettavaa JavaScriptiä.
  response.headers.set("X-Content-Type-Options", "nosniff");
  // Sivun kehystys estetään myös tätä vanhempaa otsaketta tukevissa selaimissa.
  response.headers.set("X-Frame-Options", "DENY");
  // Linkin seuraaminen ei paljasta lähtösivun osoitetta Referer-otsakkeessa.
  response.headers.set("Referrer-Policy", "no-referrer");
  // Vastausten välimuistiin tallennus kielletään etenkin kirjautuneen käyttäjän datan vuoksi.
  response.headers.set("Cache-Control", "no-store");
  // Tämän sivun vastauksia ei ole tarkoitettu vieraan originin resursseiksi.
  response.headers.set("Cross-Origin-Resource-Policy", "same-origin");
  // Sovellus ei tarvitse kameraa, mikrofonia eikä sijaintitietoa.
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  // HSTS ohjaa HTTPS-käyttöön vain silloin, kun sovelluksen julkinen osoite on HTTPS.
  if (https) response.headers.set("Strict-Transport-Security", "max-age=31536000");
  // Response-olion sisältö pysyy samana; olemme täydentäneet sen otsakkeet.
  return response;
}
````
