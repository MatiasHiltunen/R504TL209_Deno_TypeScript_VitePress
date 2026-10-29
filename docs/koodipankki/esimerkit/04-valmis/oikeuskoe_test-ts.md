---
outline: false
---

# esimerkit/04-valmis/oikeuskoe_test.ts

**Ryhmä:** Turvatoimintojen kokeet, testit ja ylläpitäjä.

Tiedoston sijainti puretussa projektissa on `esimerkit/04-valmis/oikeuskoe_test.ts`. Kopioi koko sisältö kommentteineen tähän tiedostoon. Suorituskomennot ja odotettu tulos ovat asianomaisessa tutoriaaliluvussa.

[Lataa lähdekoodi tekstinä](/koodit/esimerkit/04-valmis/oikeuskoe_test.ts.txt) · [Palaa koodipankkiin](/koodipankki/)

````ts
// assert.equal vertaa kahta arvoa ja epäonnistuu, jos ne eivät ole samat.
import assert from "node:assert/strict";
// Käytämme samaa HTTP-käsittelijää kuin Deno.serve käyttää valmiissa sovelluksessa.
import { createApp } from "./app.ts";
// openDatabase luo testille oman kannan, kun polkuna annetaan :memory:.
import { openDatabase } from "./db.ts";

// Deno.test nimeää kokeen; async sallii hitaiden toimintojen await-odotuksen.
Deno.test("Pieni oikeuskoe: B ei lisää tehtävää A:n projektiin", async () => {
  // Muistikanta ei kirjoita opiskelijan data/tehtavataulu.sqlite-tiedostoon.
  const db = openDatabase(":memory:");
  // Origin on sama täsmällinen alkuperä kuin selaimen käyttöpolussa.
  const origin = "http://localhost:8000";
  // Luomme pyyntökäsittelijän avaamatta oikeaa verkkoporttia.
  const app = createApp(db, { origin });
  // Paikallinen apufunktio kokoaa jokaisen kirjoituspyynnön samalla sovitulla tavalla.
  function pyynto(polku: string, data: unknown, cookie = ""): Request {
    // Request on oikea HTTP-pyynnön olio, jonka palvelin osaa käsitellä.
    return new Request(origin + polku, {
      // Tässä pienessä kokeessa kaikki kirjoitukset ovat POST-pyyntöjä.
      method: "POST",
      // Selain asettaisi Originin itse; testiohjelma antaa sen tarkoituksella käsin.
      headers: { "Origin": origin, "Content-Type": "application/json", "Cookie": cookie },
      // JSON.stringify muuttaa annetun olion JSON-tekstiksi.
      body: JSON.stringify(data),
    });
  }
  // try/finally vapauttaa tietokannan myös silloin, kun jokin vertailu epäonnistuu.
  try {
    // Tämä julkinen testiteksti ei ole oikean käyttäjän salasana.
    const password = "Vain taman paikallisen testin salasana!";
    // Vaihe 1: valmistele A tavallisen rekisteröintirajapinnan kautta.
    const a = await app(pyynto("/api/auth/register", { email: "a@example.test", password }));
    // Varmistamme, että valmistelu todella onnistui, ennen kuin tulkitsemme evästettä.
    assert.equal(a.status, 201);
    // Set-Cookie sisältää nimen, arvon ja määreet. Seuraavaan pyyntöön riittää nimi=arvo.
    const aCookie = a.headers.get("set-cookie")?.split(";")[0];
    // Tämä tarkistus varmistaa evästeen olemassaolon ja kaventaa myös TypeScript-tyypin.
    assert.ok(aCookie);
    // Valmistele B erillisenä käyttäjänä, jolla on oma istunto.
    const b = await app(pyynto("/api/auth/register", { email: "b@example.test", password }));
    // Rekisteröinnin pitää onnistua myös toiselle käyttäjälle.
    assert.equal(b.status, 201);
    // Luemme B:n oman istunnon evästeen mutta emme tulosta salaista arvoa.
    const bCookie = b.headers.get("set-cookie")?.split(";")[0];
    // Ilman erillistä B:n evästettä emme testaisi eri käyttäjän oikeutta.
    assert.ok(bCookie);
    // A luo projektin omalla istunnollaan. Omistajaa ei anneta JSONissa.
    const luotu = await app(pyynto("/api/projects", { title: "A:n projekti" }, aCookie));
    // Uuden projektin onnistumiskoodi on 201.
    assert.equal(luotu.status, 201);
    // Luemme oman sovelluksemme vastaussopimuksen mukaisen tunnisteen.
    const data = await luotu.json() as { project: { id: number } };
    // Tekstipohja ${...} sijoittaa oikean tunnisteen polkuun, joten numeroa ei arvata.
    const polku = `/api/projects/${data.project.id}/tasks`;
    // Vaihe 2: yritä lisätä B:n evästeellä tehtävä A:n projektiin.
    const estetty = await app(pyynto(polku, { title: "B:n luvaton lisäys" }, bCookie));
    // Vaihe 3: varmista estävä vastaus. Tämä malli käyttää vieraille kohteille 404:ää.
    assert.equal(estetty.status, 404);
    // Varmista myös seuraukset lukemalla A:n tehtävät uudella A:n omalla pyynnöllä.
    const tarkistus = await app(new Request(origin + polku, { headers: { Cookie: aCookie } }));
    // Omistajan luku toimii edelleen.
    assert.equal(tarkistus.status, 200);
    // Tuloksen on oltava yhä tyhjä: luvaton kirjoitus ei saanut muuttaa tietokantaa.
    const lista = await tarkistus.json() as { tasks: unknown[] };
    // Nolla todistaa, ettei B:n lisäämää tehtävää syntynyt taustalla virhevastauksesta huolimatta.
    assert.equal(lista.tasks.length, 0);
  } finally {
    // Sulkeminen hävittää vain tämän erillisen muistikannan.
    db.close();
  }
});
````
