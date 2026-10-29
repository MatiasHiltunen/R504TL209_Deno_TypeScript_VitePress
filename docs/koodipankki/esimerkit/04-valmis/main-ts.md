---
outline: false
---

# esimerkit/04-valmis/main.ts

**Ryhmä:** Valmiin sovelluksen backend.

Tiedoston sijainti puretussa projektissa on `esimerkit/04-valmis/main.ts`. Kopioi koko sisältö kommentteineen tähän tiedostoon. Suorituskomennot ja odotettu tulos ovat asianomaisessa tutoriaaliluvussa.

[Lataa lähdekoodi tekstinä](/koodit/esimerkit/04-valmis/main.ts.txt) · [Palaa koodipankkiin](/koodipankki/)

````ts
// createApp kokoaa HTTP-käsittelijän; sen import ei vielä käynnistä palvelinta.
import { createApp } from "./app.ts";
// openDatabase avaa SQLite-kannan ja suorittaa puuttuvan ensimmäisen migraation.
import { openDatabase } from "./db.ts";

// Ympäristömuuttuja on käynnistyksen asetus. ?? antaa oletuksen, jos arvo puuttuu.
const hostname = Deno.env.get("APP_HOST") ?? "127.0.0.1";
// Oletuksena kuunnellaan vain oman tietokoneen IPv4-osoitetta; Dockerissa tarvitaan 0.0.0.0.
const port = Number(Deno.env.get("APP_PORT") ?? "8000");
// Selain käyttää tätä täsmällistä osoitetta. Esimerkiksi localhost ja 127.0.0.1 ovat eri origineja.
const origin = Deno.env.get("APP_ORIGIN") ?? "http://localhost:8000";
// Väärää porttiasetusta ei hyväksytä hiljaisesti.
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error("APP_PORT pitää olla kokonaisluku 1–65535.");
}
// Pilkomme julkisen osoitteen voidaksemme rajata HTTP-käytön paikalliseen harjoitteluun.
const publicUrl = new URL(origin);
// HTTP ilman salausta sallitaan vain paikalliselle palvelulle; etäkäyttö tarvitsee HTTPS:n.
if (
  publicUrl.protocol === "http:" &&
  !["localhost", "127.0.0.1", "[::1]"].includes(publicUrl.hostname)
) {
  // HTTPS voidaan toteuttaa esimerkiksi oikein asetetussa käänteisvälityspalvelimessa.
  throw new Error("Käytä etäpalvelun APP_ORIGIN-asetuksessa HTTPS-osoitetta.");
}
// recursive sallii jo olemassa olevan hakemiston: aiempaa opiskelijan dataa ei poisteta.
await Deno.mkdir("./data", { recursive: true });
// Tietokanta ja sen mahdolliset WAL-aputiedostot pysyvät data-hakemistossa.
const db = openDatabase("./data/tehtavataulu.sqlite");
// Annamme saman tietokannan ja sallitun originin kaikille pyynnöille.
const app = createApp(db, { origin });
// Deno.serve avaa verkkokuuntelun. Parametrin infosta luetaan todellinen yhdistäneen asiakkaan osoite.
const server = Deno.serve(
  { hostname, port },
  (request, info) => app(request, info.remoteAddr.hostname),
);
// Tämä loki auttaa avaamaan juuri Origin-tarkistuksen hyväksymän osoitteen.
console.log(`Avaa selain osoitteeseen ${origin}. Lopeta painamalla Ctrl+C.`);
// Tämä lippu estää kahden samanaikaisen sammutuspyynnön käynnistämisen.
let closing = false;
// Signaalikäsittelijä kutsutaan esimerkiksi Ctrl+C-painalluksesta.
function shutdown(): void {
  // Uusi sammutus aloitetaan vain, jos edellinen ei ole jo käynnissä.
  if (!closing) {
    // Tallennamme tilan ennen asynkronista sammutusta.
    closing = true;
    // void kertoo, että emme odota Promisea tässä synkronisessa signaalikäsittelijässä.
    void server.shutdown();
  }
}
// SIGINT on keskeytyssignaali, jonka Ctrl+C tavallisesti lähettää.
Deno.addSignalListener("SIGINT", shutdown);
// Windows ei tue samaa SIGTERM-signaalia; Dockerin Linux-ympäristössä se sammuttaa kontin siististi.
if (Deno.build.os !== "windows") Deno.addSignalListener("SIGTERM", shutdown);
// Odotamme, että palvelin on oikeasti päättänyt pyyntöjen käsittelyn.
try {
  // Top-level await on Denossa sallittu: päämoduuli voi odottaa Promisea.
  await server.finished;
} finally {
  // Poistamme rekisteröidyn signaalikäsittelijän ennen poistumista.
  Deno.removeSignalListener("SIGINT", shutdown);
  // Poistamme myös Linuxissa tai macOS:ssä lisätyn SIGTERM-käsittelijän.
  if (Deno.build.os !== "windows") Deno.removeSignalListener("SIGTERM", shutdown);
  // Yhteys suljetaan vasta palvelimen pysähdyttyä.
  db.close();
}
````
