---
outline: false
---

# esimerkit/04-valmis/seed/admin.ts

**Ryhmä:** Turvatoimintojen kokeet, testit ja ylläpitäjä.

Tiedoston sijainti puretussa projektissa on `esimerkit/04-valmis/seed/admin.ts`. Kopioi koko sisältö kommentteineen tähän tiedostoon. Suorituskomennot ja odotettu tulos ovat asianomaisessa tutoriaaliluvussa.

[Lataa lähdekoodi tekstinä](/koodit/esimerkit/04-valmis/seed/admin.ts.txt) · [Palaa koodipankkiin](/koodipankki/)

````ts
// Paikallinen ylläpitokomento käyttää samaa tietokantaa ja migraatiota kuin palvelin.
import { openDatabase } from "../db.ts";
// Sama sähköpostin normalisointi estää erilaisten kirjainkokojen aiheuttaman epäselvyyden.
import { requireEmail } from "../http.ts";

// Deno.args sisältää skriptin jälkeen annetut komentoriviargumentit.
if (Deno.args.length !== 1) {
  // Tämä ohje ei sisällä salasanaa; salasanoja ei anneta komentoriviargumentteina.
  console.error(
    "Käyttö: deno task admin opiskelija@example.test. Rekisteröi tili ensin selaimessa.",
  );
  // Exit-koodi 1 kertoo, ettei komento onnistunut.
  Deno.exit(1);
}
// Tarkistamme osoitteen ennen tiedostojen avaamista.
const email = requireEmail(Deno.args[0]);
// Hakemisto luodaan tarvittaessa, mutta olemassa olevaa dataa ei poisteta.
await Deno.mkdir("./data", { recursive: true });
// Tämän tiedoston voi ajaa vain henkilö, jolla on paikallinen pääsy tietokantatiedostoon.
const db = openDatabase("./data/tehtavataulu.sqlite");
// finally varmistaa, että tietokantayhteys suljetaan myös virhetilanteessa.
try {
  // Rooli vaihdetaan nimenomaan paikallisessa CLI:ssä; julkinen API ei tarjoa tätä operaatiota.
  const result = db.prepare("UPDATE users SET role = 'admin' WHERE email = ?").run(email);
  // Jos käyttäjää ei löytynyt, päivitys ei osunut yhteenkään riviin.
  if (Number(result.changes) === 0) {
    // Rekisteröinti pitää tehdä ensin, jotta salasanan käsittely kulkee saman turvallisen polun kautta.
    console.error("Tiliä ei löytynyt. Rekisteröi tili selaimessa ja suorita komento uudelleen.");
    // exitCode asettaa epäonnistumiskoodin suorittamatta välitöntä poistumista ennen finally-lohkoa.
    Deno.exitCode = 1;
  } else {
    // Kerromme onnistumisesta paljastamatta kirjautumissalaisuutta.
    console.log("Ylläpitäjän rooli asetettiin. Päivitä sovelluksen sivu nähdäksesi tilastot.");
  }
} finally {
  // Suljemme yhteyden ennen komennon päättymistä.
  db.close();
}
````
