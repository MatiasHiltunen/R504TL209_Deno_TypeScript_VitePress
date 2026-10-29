# R504TL209 – Deno, TypeScript ja frontend rautalangasta

Tämä paketti sisältää **R504TL209 Full Stack -sovelluskehitys: Backend** -opintojakson oppimateriaalin muokattavana Markdownina ja paikallisesti ajettavana VitePress-sivustona. Mukana ovat alkuperäisen materiaalin luvut 00–12, kokonaiset kommentoidut harjoituskoodit sekä **45 kooditiedoston omaa sivua**. Kurssin sisältöä tai pakollisia harjoituksia ei ole lyhennetty tätä esitysmuotoa varten.

Materiaali etenee backendin ja frontendin käsitteistä Deno- ja TypeScript-ohjelmointiin, HTML:ään, CSS:ään, selaimen JavaScriptiin, tietomalliin, tietokantoihin, tietoturvaan, autentikaatioon, autorisointiin ja Dockerin perusteisiin. Vaihtoehtoinen backend-tekniikka on edelleen mahdollinen kurssin samoilla vaatimuksilla. Varsinaiset suoritusvaatimukset löytyvät [harjoitusluvusta](docs/luvut/10-harjoitukset.md).

**Sivustoa ei ole julkaistu verkkoon.** Alla olevat komennot käynnistävät materiaalin omalla koneellasi.

## Aloita tästä

1. Pura koko ZIP-paketti tavalliseen kansioon. Älä käynnistä työkaluja ZIPin sisältä.
2. Asenna Node.js. Tämän projektin vaatimus on **Node 22 tai uudempi**, ja paketin `.nvmrc` suosittelee **Node 24** -sarjaa. npm on Noden mukana tuleva pakettityökalu.
3. Avaa purettu `R504TL209_Deno_TypeScript_VitePress`-kansio tekstieditorissa. Avaa pääte eli ikkuna, johon kirjoitat komentoja, samaan kansioon. Tunnistat oikean kansion tiedostosta `package.json`.
4. Suorita alla olevat komennot yksi kerrallaan. `#`-alkuiset rivit ovat selittäviä kommentteja; komentorivit toimivat esimerkiksi Windowsin PowerShellissä sekä macOS:n ja Linuxin päätteessä.

```sh
# Näytä Noden versio; paketin suosituksen mukainen tulos alkaa v24.
node --version
# Tarkista, että Noden pakettityökalu npm löytyy koneelta.
npm --version
# Asenna package-lock.jsoniin lukitut riippuvuudet; ensimmäinen asennus tarvitsee internetyhteyden.
npm ci
# Päivitä koodipankki ja käynnistä materiaalin paikallinen kehityspalvelin.
npm run docs:dev
```

Avaa selaimessa `http://127.0.0.1:5173`. Jätä pääte käyntiin lukemisen ajaksi. Voit pysäyttää palvelimen painamalla sen pääteikkunassa **Ctrl+C**. Jos pääte ilmoittaa eri portin, käytä sen tulostamaa osoitetta.

**Hae** avaa suomenkielisen haun. Kapealla näytöllä **Sisällysluettelo** avaa lukujen valikon. Aloita sivuston luvusta 00. Tarkempi ohje löytyy tiedostosta [docs/vitepress-kaytto.md](docs/vitepress-kaytto.md) ja samalta sivulta käynnissä olevassa materiaalissa.

## Kaksi eri palvelinta

| Palvelin | Osoite | Tarkoitus |
|---|---|---|
| VitePressin kehityspalvelin | `http://127.0.0.1:5173` | Oppimateriaalin lukeminen ja Markdown-tekstin muokkaaminen. |
| VitePressin esikatselupalvelin | `http://127.0.0.1:4173` | Valmiiksi rakennetun oppimateriaalin tarkistaminen. |
| Deno-harjoitussovellus | `http://localhost:8000` | Kurssilla rakennettavan Tehtävätaulun frontend, API ja tietokanta. Käynnistetään erikseen luvun 07 ohjeella. |

**npm-komennot eivät käynnistä Deno-harjoitusbackendia.** VitePress käyttää Nodea materiaalin työkaluna; varsinainen opetettava backend käyttää Denoa. Tehtävätaulua käytetään nimenomaan `localhost:8000`-osoitteessa, koska sen kirjoittavat pyynnöt tarkistavat sallitun alkuperän eli originin.

## Muokkaa lähteitä ja päivitä materiaalit

| Sijainti | Mitä täällä tehdään? |
|---|---|
| `docs/luvut/00-…md` – `11-…md` | Muokkaa varsinaisten lukujen tekstiä Markdownina. |
| `esimerkit/` ja `docker-postgres/` | Muokkaa harjoitusten oikeita lähdetiedostoja. |
| `scripts/koodit.json` | Ylläpidä koodipankin tiedostoluetteloa ja ryhmien järjestystä. JSON ei salli kommentteja. |
| `scripts/koodipankin-johdanto.md` | Muokkaa koodipankin johdantoa. |
| `docs/koodipankki/` | Täällä olevat koodisivut syntyvät lähdetiedostoista. Tee pysyvät muutokset yllä mainittuihin lähteisiin. |
| `docs/.vitepress/config.ts` | Muokkaa sivuston nimeä, navigointia, hakua ja `base`-polkua. |

```sh
# Päivitä lähdetiedostoista koodisivut, koodivalikko, tekstilataukset ja täydellinen Markdown-kooste.
npm run content:sync
```

`docs:dev` ja `docs:build` tekevät päivityksen myös käynnistyessään. Jos muokkaat esimerkkikoodia jo käynnissä olevan kehityspalvelimen aikana, aja `content:sync` toisessa päätteessä projektin juurikansiosta. Myös `docs/luvut/12-koodipankki.md` on automaattisesti tuotettu tiedosto.

## Rakenna ja tarkista paikallisesti

```sh
# Päivitä sisällöt ja rakenna selaimelle valmis sivusto hakemistoon docs/.vitepress/dist.
npm run docs:build
# Tarjoile juuri rakennettu sivusto paikallisesti osoitteessa http://127.0.0.1:4173.
npm run docs:preview
```

Rakentaminen ei julkaise sivustoa. Oletuspolku on `/`. Jos sivusto myöhemmin viedään esimerkiksi `/kurssi/`-alihakemistoon, muuta `base` tiedostossa `docs/.vitepress/config.ts` arvoon `'/kurssi/'` **ennen uutta rakentamista**. Tarkempi selitys on käyttöohjeessa.

Jaettavaan lähdepakettiin kuuluvat `package.json` ja `package-lock.json`. Jätä omasta lähde-ZIPistä pois `node_modules`, `docs/.vitepress/cache` ja `docs/.vitepress/dist`: ne syntyvät asentamalla tai rakentamalla. Säilytä varsinaiset luvut, lähdekoodit, asetukset, ylläpitoskriptit ja ladattavat materiaalit.

## Myös luettavissa ilman VitePressiä

- [Täydellinen Markdown-kooste](docs/public/lataukset/R504TL209_Deno_TypeScript_oppimateriaali.md) sisältää luvut ja kaikki 45 kommentoitua kooditiedostoa yhdessä tiedostossa. Se päivittyy komennolla `content:sync`.
- [Alkuperäinen materiaalipaketti 19.10.2026](docs/public/lataukset/R504TL209_materiaali_2026-10-19.zip) on mukana alkuperäisen version vertailua ja käyttöä varten. Sisällön päivityskomento ei muuta tätä ZIPiä.
- [Alkuperäisen aineiston tarkistukset](docs/tarkistus-2026-10-19.md) ja [VitePress-version tarkistusraportti](docs/vitepress-tarkistus.md) kertovat, mitä kyseisissä versioissa on tarkistettu ja millä rajauksilla.

## Viralliset VitePress 1.6.4 -lähteet

Ohjeen versiosidonnaiset lähteet on lukittu virallisen repositorion `v1.6.4`-tagiin:

- [Asennus, ESM ja paikallinen käynnistys](https://github.com/vuejs/vitepress/blob/v1.6.4/docs/en/guide/getting-started.md)
- [Markdownin ominaisuudet](https://github.com/vuejs/vitepress/blob/v1.6.4/docs/en/guide/markdown.md)
- [Paikallinen rakentaminen, esikatselu ja base-polku](https://github.com/vuejs/vitepress/blob/v1.6.4/docs/en/guide/deploy.md)

Tämän paketin VitePress-versio on **1.6.4**. Todelliset käynnistyskomennot ja Node-vaatimus löytyvät aina mukana olevasta [package.json-tiedostosta](package.json).

## Notes

Remove the teacher's module from the materials 29.10.