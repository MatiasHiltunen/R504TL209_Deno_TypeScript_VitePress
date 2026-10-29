// Tietokannan tyyppi ei avaa yhteyttä: yhteys annetaan main.ts-tiedostosta tai testistä.
import type { DatabaseSync } from "node:sqlite";
// Kirjautumistoiminnot sijaitsevat omassa moduulissaan.
import { createAuth } from "./auth.ts";
// Näillä apufunktioilla luemme pyynnön turvallisesti ja muodostamme yhtenäisen vastauksen.
import {
  checkWriteRequest,
  HttpError,
  isWriteMethod,
  json,
  type JsonObject,
  readJsonObject,
  secureResponse,
} from "./http.ts";
// Projektien ja tehtävien omistajuustarkistukset ovat tämän reitittimen vastuulla.
import { handleProjects } from "./projects.ts";

// Valinnat kuvaavat tämän sovellusinstanssin asetuksia.
export interface AppOptions {
  origin: string; // Selaimessa käytetty tarkka alkuperä, esimerkiksi http://localhost:8000.
  now?: () => number; // ? tekee asetuksesta vapaaehtoisen; testi voi antaa oman kellon.
}

// createApp ei avaa verkkoporttia: se tuottaa Request -> Promise<Response> -käsittelijän.
// Siksi samaa oikeaa sovelluskoodia voidaan testata ilman ulkoista verkkopalvelua.
export function createApp(db: DatabaseSync, options: AppOptions) {
  // new URL pilkkoo originin protokollaan, isäntänimeen ja porttiin.
  const configuredUrl = new URL(options.origin);
  // Originissa ei ole polkua tai loppuviivaa. Tarkka muoto välttää epäselvän hyväksyttyjen osoitteiden listan.
  if (
    configuredUrl.origin !== options.origin || !["http:", "https:"].includes(configuredUrl.protocol)
  ) {
    // Tämä on käynnistyksen asetusvirhe, ei käyttäjän HTTP-pyynnön virhe.
    throw new Error(
      "APP_ORIGIN pitää antaa originina, esimerkiksi http://localhost:8000, ilman loppuviivaa.",
    );
  }
  // HTTPS-osoitteessa sessioeväste saa Secure-määrityksen.
  const https = configuredUrl.protocol === "https:";
  // ?? käyttää oikeaa kelloa, ellei testi antanut toista; Date.now on tässä funktio eikä sen tulos.
  const now = options.now ?? Date.now;
  // Kirjautumistoiminnot ja yrityslaskurit luodaan kerran palvelinta kohden.
  const auth = createAuth(db, https, now);
  // Allowlist tarkoittaa nimenomaisesti sallittuja tiedostoja; pyydettyä polkua ei liitetä tiedostopolkuun.
  const staticFiles = new Map<string, { file: string; type: string }>([
    ["/", { file: "index.html", type: "text/html; charset=utf-8" }], // Etusivu.
    ["/index.html", { file: "index.html", type: "text/html; charset=utf-8" }], // Sama etusivu nimellään.
    ["/styles.css", { file: "styles.css", type: "text/css; charset=utf-8" }], // Selaimen tyylit.
    ["/app.js", { file: "app.js", type: "text/javascript; charset=utf-8" }], // Selaimessa ajettava JavaScript.
  ]);

  // Varsinainen reititys tuottaa vastauksen tai heittää selitetyn HTTP-virheen.
  async function dispatch(request: Request, clientIp: string): Promise<Response> {
    // pathname on esimerkiksi /api/projects; URLin kyselyosa ei kuulu tähän reittinimeen.
    const path = new URL(request.url).pathname;
    // method on HTTP-verbi kuten GET, POST, PATCH tai DELETE.
    const method = request.method;
    // Tavallisen lukupyynnön runkona käytämme tyhjää oliota.
    let body: JsonObject = {};
    // Kirjoittavien pyyntöjen suojaus tehdään ennen yhtään API:n tietokantamuutosta.
    if (isWriteMethod(method)) {
      // Tarkka Origin + JSON-sisältötyyppi suojaavat myös login-, register- ja logout-pyynnöt.
      checkWriteRequest(request, options.origin);
      // Rungon koko ja JSON-olion muoto tarkistetaan ennen kenttien käyttöä.
      body = await readJsonObject(request);
    }

    // Rekisteröinti on tarkoituksella käytettävissä ilman aiempaa istuntoa.
    if (path === "/api/auth/register") {
      // Sama URL ei tarjoa käyttäjälistaa GET-pyynnöllä.
      if (method !== "POST") throw new HttpError(405, "Rekisteröinti käyttää POST-pyyntöä.");
      // Palautamme rekisteröinnin vastauksen: julkinen käyttäjä ja istuntoeväste.
      return await auth.register(request, body, clientIp);
    }
    // Login tarkistaa olemassa olevan käyttäjän salasanan.
    if (path === "/api/auth/login") {
      // Salasanaa ei saa lähettää GET-osoitteen kyselyosassa.
      if (method !== "POST") throw new HttpError(405, "Kirjautuminen käyttää POST-pyyntöä.");
      // IP-osoite välitetään palvelimen yhteystiedoista yritysrajoitusta varten.
      return await auth.login(request, body, clientIp);
    }
    // Logoutin pitää myös toimia tilanteessa, jossa istunto on jo vanhentunut.
    if (path === "/api/auth/logout") {
      // Uloskirjautuminen muuttaa istuntotilaa, joten GET ei ole sallittu.
      if (method !== "POST") throw new HttpError(405, "Uloskirjautuminen käyttää POST-pyyntöä.");
      // Palvelimen istunnon poisto ja selaimen evästeen vanhentaminen tehdään yhdessä toiminnossa.
      return await auth.logout(request, body);
    }
    // Me tarkoittaa tässä nykyisen istunnon käyttäjää.
    if (path === "/api/auth/me") {
      // Nykyisen käyttäjän lukeminen on GET-operaatio.
      if (method !== "GET") {
        throw new HttpError(405, "Nykyisen käyttäjän haku käyttää GET-pyyntöä.");
      }
      // currentUser heittää 401-virheen, jos voimassa olevaa kirjautumista ei ole.
      return json({ user: await auth.currentUser(request) });
    }

    // Kaikki loput API-reitit vaativat kirjautumisen ennen datan lukemista tai muuttamista.
    if (path.startsWith("/api/")) {
      // Autentikointi tunnistaa käyttäjän; projects.ts tarkistaa tämän jälkeen oikeuden juuri pyydettyyn kohteeseen.
      const user = await auth.currentUser(request);
      // Reititin saa palvelimen tunnistaman käyttäjän, ei selaimen ehdottamaa käyttäjää.
      const response = handleProjects(db, method, path, user, body);
      // Jos reititin tunnisti pyynnön, palautamme sen vastauksen.
      if (response) return response;
      // Tuntemattomalle API-polulle ei tarjoilla HTML-etusivua vahingossa.
      throw new HttpError(404, "API-reittiä ei löytynyt.");
    }

    // Julkisiin tiedostoihin ei tarvita istuntoa, jotta kirjautumissivun voi avata.
    const asset = staticFiles.get(path);
    // Esimerkiksi /db.ts, /.env ja /data/tehtavataulu.sqlite eivät ole sallittujen listalla.
    if (!asset) throw new HttpError(404, "Sivua ei löytynyt.");
    // Julkiset tiedostot ovat vain luettavia GET-pyynnöillä.
    if (method !== "GET") throw new HttpError(405, "Tiedostot hyväksyvät vain GET-pyynnön.");
    // Tiedostonimi tulee yllä olevasta omasta Mapista, ei käyttäjän URLista.
    const contents = await Deno.readFile(new URL(`./public/${asset.file}`, import.meta.url));
    // Response lähettää tiedoston tavut oikealla sisältötyypillä.
    return new Response(contents, { headers: { "Content-Type": asset.type } });
  }

  // Palautettava nuolifunktio on se toiminto, jonka Deno.serve kutsuu jokaiselle pyynnölle.
  return async (request: Request, clientIp = "local-test"): Promise<Response> => {
    // Yksi try/catch keskittää virheiden käsittelyn ja pitää vastausten muodon yhtenäisenä.
    try {
      // Kaikki onnistuneetkin vastaukset saavat suojaavat HTTP-otsakkeet.
      return secureResponse(await dispatch(request, clientIp), https);
    } catch (error) {
      // instanceof erottaa omat käyttäjälle tarkoitetut virheemme odottamattomista ohjelmavirheistä.
      if (error instanceof HttpError) {
        // Virhesopimus on aina JSON {error: string}; mukana voi olla esimerkiksi Retry-After.
        return secureResponse(json({ error: error.message }, error.status, error.headers), https);
      }
      // Emme tulosta salasanoja, istuntotunnisteita tai koko pyyntörunkoa lokiin.
      console.error("Pyynnön käsittelyssä tapahtui odottamaton palvelinvirhe.");
      // Asiakas ei saa tietokantavirheen yksityiskohtia tai palvelimen tiedostopolkuja.
      return secureResponse(
        json({ error: "Palvelin ei pystynyt käsittelemään pyyntöä." }, 500),
        https,
      );
    }
  };
}
