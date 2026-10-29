# 02 Työkalut, terminaali, Deno ja TypeScript

**Tavoite:** käynnistät oman ohjelman ja ymmärrät sen ensimmäiset rakennuspalikat. **Esitiedot:** luku 01. **Työhakemisto:** ensin itse luomasi `backend-kurssi`, sitten sen alihakemistot. **Valmis tarkistuspiste:** `esimerkit/00-kieli/kieli.ts`.

## Kolme työpaikkaa ruudulla

Editorissa kirjoitetaan ja tallennetaan lähdekoodia. Terminaalissa käynnistetään ohjelma ja luetaan sen tulostus. Selaimessa käytetään valmista käyttöliittymää. Terminaalin komento ei kuulu TypeScript-tiedostoon, eikä TypeScript-koodi kuulu selaimen osoiteriville.

Voit käyttää esimerkiksi VS Codea tai muuta tekstieditoria. VS Coden Deno-laajennus voi näyttää koodin tyypitykseen liittyvät virheet jo kirjoittaessa. Se ei korvaa itse Deno-ohjelman asennusta. Avaa editoriin harjoituksen **koko hakemisto**, jotta sen tiedostot pysyvät yhdessä. Älä käytä muotoiltua tekstinkäsittelyohjelmaa lähdekoodin kirjoittamiseen.

**Terminaali** on ikkuna tekstikomennoille. **Komentotulkki eli shell** on ohjelma, joka tulkitsee nämä komennot. Windowsissa tässä materiaalissa käytetään PowerShelliä. Linuxissa ja macOS:ssa käytetään tavallista komentotulkkia, kuten Bashia tai Zsh:ta. Terminaalin alussa näkyvä kehote, esimerkiksi `PS C:\...>` tai `$`, ei kuulu kopioitavaan komentoon.

## Asenna ja tarkista Deno

Deno suorittaa JavaScriptiä ja TypeScriptiä. Kurssipaketti on tarkistettu Deno-versiolla **2.9.7**, johon sisältyy TypeScript **6.0.3**. Uudempi vakaa Deno 2 -versio voi toimia, mutta tarkista esimerkit ennen yhteistä opetuskertaa. Version lukitseminen tekee luokan ongelmien selvittelystä toistettavaa; se ei tarkoita päivitysten jättämistä pysyvästi tekemättä. [Deno: asennus](https://docs.deno.com/runtime/getting_started/installation/) ja [julkaisut](https://github.com/denoland/deno/releases).

### Windows ja PowerShell

Avaa Windows Terminalin PowerShell-välilehti. Seuraava komento käyttää Windowsin pakettien asennustyökalua WinGetiä. Jos koulun laitetta hallinnoidaan keskitetysti eikä asennus onnistu, käytä oppilaitoksen valmista Deno-ympäristöä tai pyydä asennus sen käytännön mukaisesti.

```powershell
# Asenna Deno Windowsin paketinhallinnalla; tätä ei kirjoiteta .ts-tiedostoon.
winget install DenoLand.Deno
```

Sulje ja avaa terminaali uudelleen asennuksen jälkeen. Tarkista komennolla alla. Jos WinGet puuttuu, virallinen Deno-asennussivu tarjoaa Windowsille myös muun asennustavan.

### macOS tai Linux

Jos macOS:ssa on jo Homebrew, voit käyttää sen komentoa `brew install deno`. Muussa tapauksessa käytä Denon virallista asennusohjetta. Alla lataus ja suoritus on erotettu, jotta näet, mitä tiedostoa olet suorittamassa. `curl` on lataustyökalu; `sh` suorittaa komentotulkin skriptin.

```sh
# Lataa Denon virallinen asennusskripti tiedostoksi nykyiseen hakemistoon.
curl -fsSL https://deno.land/install.sh -o deno-install.sh
# Näytä skripti, jotta voit verrata sitä viralliseen ohjeeseen ennen suorittamista.
cat deno-install.sh
# Suorita tarkastettu asennusskripti tavallisen käyttäjän oikeuksin.
sh deno-install.sh
```

Noudata asennuksen lopussa tulostuvaa ohjetta Denon lisäämisestä `PATH`-asetukseen. **PATH** on käyttöjärjestelmän luettelo hakemistoista, joista komentojen ohjelmia etsitään. Älä arvaa asetusta: käyttöjärjestelmä ja asennustapa voivat vaikuttaa sen muotoon. Avaa terminaali uudelleen.

### Kaikki käyttöjärjestelmät

```sh
# Tulosta Deno-, JavaScript-moottori- ja TypeScript-versio.
deno --version
```

**Odotettu tulos:** kolme versiota sisältävää riviä. Jos tulos on *command not found* tai *not recognized*, ohjelmaa ei löydy komennon hakupolusta. Tämä ei ole TypeScript-koodin virhe. Tarkista asennus ja uuden terminaalin avaaminen ennen jatkamista.

## Luo ensimmäinen työhakemisto

Seuraavat komennot toimivat PowerShellissä ja tässä esitetyissä Unix-komentotulkeissa. Aloita esimerkiksi omassa Dokumentit-hakemistossasi. Hakemiston voi luoda myös tiedostonhallinnassa.

```sh
# Luo yksi uusi hakemisto omalle kurssityöllesi.
mkdir backend-kurssi
# Siirry sinne; seuraavat suhteelliset tiedostopolut tulkitaan tästä paikasta.
cd backend-kurssi
# Näytä nykyinen hakemisto ja tarkista, että nimi päättyy backend-kurssi-osaan.
pwd
# Tee kieliharjoitukselle oma paikka.
mkdir 00-kieli
# Siirry kieliharjoituksen hakemistoon.
cd 00-kieli
```

`cd ..` siirtyy yhden hakemiston ylöspäin. `.` tarkoittaa nykyistä hakemistoa. Suhteellinen polku kuten `./kieli.ts` tarkoittaa tiedostoa nykyisessä hakemistossa; täydellinen polku kertoo sijainnin alusta asti. Tiedostonnimen isot ja pienet kirjaimet voivat olla eri nimiä käyttöjärjestelmästä riippuen. Käytä tässä ohjeiden kirjoitusasua.

## Tutoriaali T1: ensimmäinen oma rivi

Luo editorissa `hei.ts`. Kopioi molemmat rivit ja tallenna.

```ts
// console.log tulostaa sulkeisiin annetun tekstin terminaaliin.
console.log("Hei! Minun ohjelmani toimii.");
```

Suorita terminaalissa hakemistossa `00-kieli`:

```sh
# Tarkista tyypit ja suorita tallennettu TypeScript-tiedosto.
deno run --check hei.ts
```

**Odotettu tulos:** `Hei! Minun ohjelmani toimii.`. Terminaalin kehote palautuu: ohjelma päättyi. **Pieni muutos:** vaihda teksti omaksi tervehdykseksesi, tallenna ja aja uudelleen. Jos vanha teksti toistuu, tarkista tallennus ja se, minkä tiedoston käynnistit.

**Koodi** on tietokoneelle annettuja ohjeita. **Merkkijono** on lainausmerkkien sisällä oleva teksti. **Funktiokutsu** pyytää nimettyä toimintoa tekemään työnsä: tässä toimintona on `console.log`. **Argumentti** on kutsulle annettu syöte. **Kommentti** on ihmiselle tarkoitettu selitys; `//`-merkeillä alkava teksti ei ole suoritettava ohje.

## TypeScript ei ole sama asia kuin Deno

TypeScript on ohjelmointikieli, joka lisää JavaScriptiin muun muassa tyyppikuvauksia. Deno on ajoympäristö ja työkalukokonaisuus. **Tyyppi** kertoo, minkä muotoista arvoa koodissa odotetaan: esimerkiksi tekstiä, lukua tai totuusarvoa. Deno osaa suorittaa `.ts`-tiedoston suoraan, mutta `deno run` ja tyyppien tarkistaminen ovat eri toimintoja. Siksi käytämme oppimisvaiheessa `--check`-valitsinta. [Deno: TypeScriptin suoritus ja tyyppitarkistus](https://docs.deno.com/runtime/fundamentals/typescript/).

Tyyppitarkistus ei tarkista verkkopyyntöjen sisältöä ohjelman ollessa käynnissä. Jos kirjoitat tyypin `title: string`, vieras asiakas voi silti lähettää numeron tai jättää kentän pois. Backendissä tarvitaan erillinen ajonaikainen tarkistus. **Ajonaikainen** tarkoittaa aikaa, jolloin ohjelma todella käsittelee arvoja.

## Tutoriaali T2: arvot, oliot ja toisto

Luo `kieli.ts`. Sen kokonainen kommentoitu sisältö on koodipankissa kohdassa `esimerkit/00-kieli/kieli.ts` ja samassa tiedostossa ZIP-paketissa. Kirjoita aluksi koko aloituslohko tiedoston alusta viimeiseen `console.log("Tehty:", tehty, "Tavoite:", tavoite, "Valmis:", valmis);` -riviin asti. Mukaan kuuluvat myös `tehty`-arvon kasvatus ja `valmis`-muuttujan määrittely. Tarkista toiminta. Lisää sen jälkeen `Tehtava`-tyyppi ja taulukko, sitten funktio ja silmukka ja lopuksi kaksi viimeistä esimerkkiä. Näin uusi käsite tulee näkyviin pieninä annoksina.

```sh
# Suorita koko kieliharjoitus tyyppitarkistuksen kanssa.
deno run --check kieli.ts
```

**Odotettu tulos:** opiskelijan nimi on Aino, tehtyjen määrä 2 ja tavoite 3. Ohjelma tulostaa yhden tehdyn ja yhden keskeneräisen tehtävän, keskeneräisten määrän 1 ja lopuksi tekstin `Perusteet toimivat!`.

| Merkintä | Mitä se tarkoittaa? | Mitä opiskelija kokeilee? |
| --- | --- | --- |
| `const` | Nimeä arvo, jota ei sijoiteta myöhemmin uudelleen tähän muuttujaan. Olion sisältö voi silti muuttua. | Vaihda nimen alkuarvo. |
| `let` | Nimeä arvo, joka saa muuttua myöhemmin. | Muuta tehtyjen alkuarvoa. |
| `string`, `number`, `boolean` | Teksti, luku, tosi/epätosi. | Selitä miksi `"2"` ja `2` eivät ole sama tyyppi. |
| `=` ja `===` | Sijoitus ja tarkka yhtäsuuruusvertailu. | Selvitä, kumpi muuttaa muuttujaa. |
| `{ ... }` | Olion kentät tai ohjelmalohko, asiayhteyden mukaan. | Etsi tiedostosta molemmat käyttötavat. |
| `[ ... ]` | Taulukon eli järjestetyn joukon arvot. | Lisää kolmas tehtävä. |
| `function` ja `return` | Määrittele toiminto ja palauta sen tulos. | Vaihda tehdyn tehtävän tulostusteksti. |
| `if` | Tee jotakin vain ehdon toteutuessa. | Vaihda yhden tehtävän valmis-arvo. |
| `for...of` | Käsittele jokainen taulukon arvo vuorollaan. | Tarkista, tulostuuko lisäämäsi tehtävä. |
| `=>` | Nuolifunktion merkintä: syötteet vasemmalla, tehtävä työ oikealla. | Selitä `filter`-ehdon `!`-merkki. |
| `unknown` | Arvon todellista tyyppiä ei vielä tunneta. | Vaihda ulkoinen arvo numeroksi ja tarkkaile tarkistusta. |
| `async`, `await`, `Promise` | Asynkroninen toiminto, sen tuloksen odotus ja tulosta kuvaava lupaus. | Etsi, millä rivillä tervehdys valmistuu. |

Lähde termeille: [TypeScript Handbook, tavalliset tyypit](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html). Esimerkin tehtävä ja selitykset on kirjoitettu tätä opintojaksoa varten.

## Virhettä saa kokeilla hallitusti

Vaihda `const tavoite: number = 3;` niin, että arvo on lainausmerkeissä. Suorita `deno check kieli.ts`. Tarkistimen pitää kertoa, ettei teksti käy numeron paikalle. Palauta toimiva arvo. Älä peitä virhettä `any`-tyypillä tai ohituskommentilla. **any** käytännössä ohittaa osan tyyppien tarkistuksesta, joten se ei ratkaise ymmärtämisen ongelmaa.

**Syntaksivirhe** tarkoittaa, ettei koodin kirjoitusasu noudata kielen sääntöjä; esimerkiksi lainausmerkki puuttuu. **Tyyppivirhe** tarkoittaa, että arvoa käytetään väärän tyyppisenä. **Ajonaikainen virhe** tapahtuu ohjelman käydessä, esimerkiksi tiedostoa ei löydy. **Looginen virhe** tarkoittaa, että koodi toimii mutta tekee väärän asian, kuten näyttää myös toisen käyttäjän tiedot.

## Deno-työkalut ja oikeudet

```sh
# Tarkista tyypit suorittamatta ohjelmaa.
deno check kieli.ts
# Tarkista tavallisia koodin ongelmia; tätä kutsutaan lint-tarkistukseksi.
deno lint kieli.ts
# Muotoile sisennykset ja välit johdonmukaisiksi; tämä muuttaa tiedoston ulkoasua.
deno fmt kieli.ts
```

Deno pyytää erikseen oikeuksia esimerkiksi tiedostojen ja verkon käyttöön. `--allow-net=127.0.0.1:8000` sallii nimetyn verkko-osoitteen. `--allow-read=./data` sallii nimetyn hakemiston lukemisen ja `--allow-write=./data` kirjoittamisen. Nämä ovat ohjelman suoritusympäristön oikeuksia. Ne eivät korvaa sovelluksen käyttäjien autorisointia. [Deno: oikeudet](https://docs.deno.com/runtime/reference/permissions/).

Perusteissa ei käytetä `-A`-valitsinta, joka myöntää laajat oikeudet. Jos saat oikeusvirheen, lue mitä ohjelma yritti tehdä ja vertaa sitä ohjeen käynnistyskomentoon. Komentojen valitsimet kuuluvat ennen suoritettavan tiedoston nimeä. Luvun 06 komentoriviargumentit puolestaan tulevat tiedostonimen jälkeen, koska ne annetaan omalle ohjelmalle.

**Valmis jatkamaan, kun:** osaat käynnistää tiedoston oikeassa hakemistossa, löydät sen tulostuksen ja erotat Deno-työkalun TypeScript-kielestä. Sinun ei tarvitse vielä kirjoittaa kaikkea ulkomuistista.
