# 04 Ensimmäinen backend ja HTTP-rajapinta

**Tavoite:** käynnistät palvelimen, pyydät siltä tietoa ja löydät pyynnön sekä vastauksen selaimen kehittäjätyökaluista. **Esitiedot:** luvut 01–03. **Tarkistuspiste:** `esimerkit/01-palvelin/main.ts`.

## Ensin ymmärrys, sitten palvelin

Tavallinen terminaaliohjelmamme suoritti rivit ja päättyi. Palvelin jää käyntiin odottamaan pyyntöjä. Se ei siis ole jumissa, vaikka terminaalin kehote ei palaa näkyviin. Selaimen avaaminen lähettää sille pyynnön. Pyynnön käsittelijä palauttaa vastauksen. Denon sisäänrakennettu `Deno.serve` huolehtii HTTP-yhteydestä, jotta harjoituksessa voimme keskittyä käsittelysääntöön. [Deno: HTTP-palvelin](https://docs.deno.com/api/deno/http-server/).

**Reititys** tarkoittaa sopivan käsittelyn valitsemista metodin ja polun perusteella. Aluksi tarvitsemme vain kolme sääntöä: `/` näyttää tervehdyksen, `/api/health` palauttaa toimivuustiedon ja tuntematon polku tuottaa virheen. Tässä vaiheessa ei kirjoiteta käyttäjätietoja eikä tallenneta mitään.

## Tutoriaali T3: palvelin vastaa

1. Palaa oman `backend-kurssi`-hakemistosi tasolle. Jos olet `00-kieli`-hakemistossa, komento `cd ..` riittää.
2. Luo `01-palvelin`-hakemisto ja avaa se editoriin.
3. Luo tiedosto `main.ts`.
4. Kopioi koodipankin **esimerkit/01-palvelin/main.ts** kokonaisuudessaan. Mukana ovat kaikki kommentit ja kaikki kolme reittiä.
5. Tallenna. Suorita alla oleva komento terminaalissa `01-palvelin`-hakemistossa.

```sh
# Salli vain oman koneen portti 8000, tarkista tyypit ja käynnistä HTTP-palvelin.
deno run --check --allow-net=127.0.0.1:8000 main.ts
```

**Odotettu tulos:** terminaali kertoo kuuntelevansa osoitteessa `http://127.0.0.1:8000/`. Avaa selaimen osoiteriviltä `http://localhost:8000/`. Näet tekstin, joka alkaa `Hei! Palvelin toimii.`. Älä avaa `main.ts`-tiedostoa selaimella: Deno suorittaa sen ja selain käyttää sen tarjoamaa HTTP-osoitetta.

Pidä terminaali auki. Avaa selaimeen `http://localhost:8000/api/health`. Näet JSON-dataa, jonka `status`-kentän arvo on `ok` ja `viesti`-kentän arvo on `Backend vastasi.`. Selain voi näyttää JSONin muotoiltuna tai yhdellä rivillä. Molemmat ovat oikein.

**Tarkistuspiste:** avaa `http://localhost:8000/ei-ole`. Näet JSON-virheen. Avaa kehittäjätyökalut seuraavan kohdan mukaisesti ja varmista, että vastauksen status on `404`. Sivulla näkyvä virheteksti yksin ei vielä varmista oikeaa statuskoodia.

## Katso, mitä verkossa tapahtuu

Avaa selaimen valikosta Kehittäjätyökalut / Developer tools. Useissa selaimissa näppäin on F12, mutta valikko toimii myös silloin, kun tietokone varaa näppäimen muuhun käyttöön. Valitse **Network / Verkko**. Päivitä sivu, koska ennen työkalun avaamista tehtyä pyyntöä ei välttämättä näy.

Siirry takaisin osoitteeseen `http://localhost:8000/api/health` ja valitse Network-listasta polun `api/health` rivi. Etsi Request Method, Status Code, Response Headers ja Response. Niiden suomenkieliset nimet vaihtelevat selaimittain. Kirjoita havaintoon: metodi GET, status 200, sisältötyyppi application/json ja palautettu viesti. Kehittäjätyökalujen Console-välilehti näyttää frontendin JavaScript-virheet; terminaali näyttää backendin tulostuksen. Kyseessä ovat eri paikat.

**Pieni muutos:** vaihda palvelimen viesti, tallenna, pysäytä ohjelma terminaalissa Ctrl+C:llä ja suorita sama komento uudelleen. Päivitä selain. Vaihda myöhemmin käynnistyskomentoon `--watch`, jolloin Deno käynnistää ohjelman uudelleen lähdekoodin muuttuessa. Backendin uudelleenkäynnistys ei automaattisesti päivitä jo auki olevaa selaimen sivua.

```sh
# Tarkkaile tiedoston muutoksia ja käynnistä palvelin tarvittaessa uudelleen.
deno run --watch --check --allow-net=127.0.0.1:8000 main.ts
```

## Lue palvelimen koodi yksi vastuu kerrallaan

`Deno.serve` saa asetusolion ja käsittelijäfunktion. Asetukset kertovat missä kuunnellaan. Käsittelijä saa yhden `Request`-olion, joka edustaa saapunutta pyyntöä. `new URL(request.url)` tulkitsee osoitteen. `request.method` kertoo metodin ja `url.pathname` polun. `if`-ehdot valitsevat vastauksen. `return` lopettaa juuri tämän pyynnön käsittelyn.

`Response.json` muodostaa JSON-vastauksen. `new Response` voi puolestaan sisältää tavallista tekstiä tai muuta sisältöä. `Content-Type` kertoo vastaanottajalle, miten sisältö tulkitaan. `charset=utf-8` kertoo tekstin merkistön. Kommenttien `Request`- ja `Response`-nimet ovat tyyppien nimiä; pienellä kirjoitettu `request` on valitsemamme muuttujan nimi.

Yhtä käsittelijää kutsutaan monelle eri pyynnölle. Älä ajattele, että koko palvelin kuuluu yhdelle opiskelijalle: samalle palvelimelle voi tulla pyyntöjä monelta käyttäjältä. Siksi kirjautuneen käyttäjän tunnistetta ei myöhemmin laiteta yhteen kaikille yhteiseen muuttujaan.

## HTTP-sopimus ennen isoa toteutusta

Lopullisen sovelluksen sopimus näyttää tältä. **Sopimus** tarkoittaa dokumentoitua yhteisymmärrystä pyynnöistä, vastauksista ja virheistä. Frontendin ja backendin tekijä voivat työskennellä rinnakkain, kun sopimus on sama.

| Metodi ja polku | Tarkoitus | Tavallinen onnistuminen |
| --- | --- | --- |
| `POST /api/auth/register` | Luo harjoitustili ja istunto. | 201 ja käyttäjän perustiedot. |
| `POST /api/auth/login` | Tarkista tunnus ja salasana sekä luo istunto. | 200 ja käyttäjän perustiedot. |
| `POST /api/auth/logout` | Mitätöi nykyinen istunto. | 204, ei sisältöä. |
| `GET /api/auth/me` | Hae oman istunnon käyttäjä. | 200 ja käyttäjä. |
| `GET /api/projects` | Listaa käyttäjän omat projektit. | 200 ja projektitaulukko. |
| `POST /api/projects` | Luo oma projekti. | 201 ja uusi projekti. |
| `GET /api/projects/{id}` | Hae yksi oma projekti. | 200 ja projekti. |
| `PATCH /api/projects/{id}` | Muuta oman projektin nimeä. | 200 ja päivitetty projekti. |
| `DELETE /api/projects/{id}` | Poista oma projekti ja sen tehtävät. | 204. |
| `GET /api/projects/{id}/tasks` | Listaa oman projektin tehtävät. | 200 ja tehtävätaulukko. |
| `POST /api/projects/{id}/tasks` | Lisää tehtävä omaan projektiin. | 201 ja tehtävä. |
| `GET /api/tasks/{id}` | Hae yksi oman projektin tehtävä. | 200 ja tehtävä. |
| `PATCH /api/tasks/{id}` | Muuta oman tehtävän nimeä tai valmis-tilaa. | 200 ja päivitetty tehtävä. |
| `DELETE /api/tasks/{id}` | Poista oma tehtävä. | 204. |
| `GET /api/admin/stats` | Hae yhteiset lukumäärätilastot ylläpitäjänä. | 200 ja kolme lukumäärää. |

Merkintä `{id}` on dokumentoinnin paikkamerkki. Oikeaan pyyntöön kirjoitetaan esimerkiksi `/api/projects/1/tasks`. Palvelin antaa tunnisteen luontivastauksessa: käyttäjän tai frontendin ei tarvitse arvailla sitä. JSON-vastauksessa projektit ovat kentässä `projects`, tehtävät kentässä `tasks` ja yksittäinen luotu kohde kentässä `project` tai `task`.

Kirjoittavassa pyynnössä ilmoitetaan `Content-Type: application/json` ja sallitun alkuperän `Origin`. Myös `DELETE`- ja logout-pyynnöissä lähetetään JSON-runko `{}`; pelkkä tyhjä HTTP-runko ei täytä tämän esimerkin sopimusta. Selain asettaa Originin itse. Projektin luontiin lähetetään `title`, tehtävän luontiin `title` ja tehtävän muutokseen `title`, `done` tai molemmat. Kirjautumiseen lähetetään `email` ja `password`. **Asiakas ei valitse omistajaa eikä roolia.** Ne ratkaistaan backendissä.

## Tilakoodit, jotka pitää osata lukea

| Koodi | Merkitys tässä materiaalissa | Mitä frontend tekee? |
| --- | --- | --- |
| 200 | Pyyntö onnistui ja vastauksessa on tietoa. | Näyttää tiedot. |
| 201 | Uusi kohde luotiin. | Lisää tai hakee listan uudelleen. |
| 204 | Pyyntö onnistui ilman vastausrunkoa. | Ei yritä lukea tyhjää runkoa JSONiksi. |
| 400 | Syöte on virheellinen. | Näyttää selkeän korjausviestin. |
| 401 | Käyttäjää ei ole tunnistettu kelvollisella istunnolla. | Pyytää kirjautumaan. |
| 403 | Toimintoon ei ole oikeutta tai pyynnön alkuperä ei ole sallittu. | Näyttää eston, ei yritä kiertää sitä. |
| 404 | Kohdetta tai reittiä ei löydy käyttäjän käytettävissä olevista tiedoista. | Näyttää puuttuvan kohteen. |
| 405 | Reitti ei salli käytettyä metodia. | Korjaa ohjelman pyynnön. |
| 409 | Luonti on ristiriidassa olemassa olevan tiedon kanssa. | Pyytää korjaamaan tiedot. |
| 413 | Pyynnön runko on liian suuri. | Pyytää lyhentämään syötettä. |
| 415 | Sisältötyyppiä ei tueta. | Korjaa Content-Type-otsakkeen. |
| 429 | Yrityksiä tuli liikaa lyhyessä ajassa. | Ohjaa odottamaan. |
| 500 | Palvelin kohtasi odottamattoman virheen. | Kertoo epäonnistumisesta paljastamatta palvelimen sisäisiä tietoja. |

Vieraan käyttäjän projektista palautetaan tässä sovelluksessa 404 myös silloin, kun tiedämme sen olevan tietokannassa. Näin vastaus ei paljasta ulkopuoliselle kohteen olemassaoloa. Roolilla suojatulla ylläpito-osoitteella tavallinen käyttäjä saa 403. Yleiset merkitykset: [MDN, HTTP-vastauskoodit](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status).

## Frontend hakee tietoa

Frontendin `fetch` tekee pyynnön. Luvun 03 lyhyt esimerkki opettaa sen askelittain; lopullinen `public/app.js` käyttää samaa ajatusta kaikissa toiminnoissa. `await fetch(...)` odottaa vastausta, `response.ok` tarkistaa onnistuneen HTTP-tilan ja `await response.json()` tulkitsee vastausrungon. Verkkoyhteyden katkeaminen ja HTTP-virhevastaus ovat eri tilanteita: `fetch` ei automaattisesti heitä virhettä pelkän 404- tai 500-koodin vuoksi.

**Sama alkuperä** helpottaa harjoittelua. Lopullinen backend tarjoaa sekä käyttöliittymän että API:n portista 8000, ja frontend käyttää suhteellisia polkuja, kuten `/api/projects`. **CORS** on selaimen sääntöihin kuuluva tapa sallia toisen alkuperän vastauksen lukeminen. CORS-asetus ei tunnista käyttäjää eikä anna oikeutta tietokannan riveihin. Tässä harjoituksessa emme tarvitse avointa CORS-asetusta.

## Kun jokin ei toimi

| Havainto | Ensimmäinen tarkistus |
| --- | --- |
| Selain ei saa yhteyttä. | Onko palvelin edelleen käynnissä terminaalissa? Ovatko osoite ja portti oikein? |
| Address already in use. | Onko toinen harjoitus tai vanha palvelin portissa 8000? Pysäytä se Ctrl+C:llä. |
| Sivu näyttää vanhan tekstin. | Tallensitko oikean tiedoston, käynnistitkö oikean ohjelman ja päivititkö selaimen? |
| Deno ilmoittaa verkko-oikeuden puuttuvan. | Sisältääkö komento tarkan `--allow-net`-asetuksen? |
| API-pyynnön sijasta avautuu hakukone. | Kirjoititko alkuun `http://` selaimen osoiterivillä? |

**Valmis jatkamaan, kun:** saat 200- ja 404-vastaukset ja osaat näyttää niiden metodin, polun ja tilakoodin kehittäjätyökaluissa. Pysäytä harjoituspalvelin ennen myöhempää Tehtävätaulun käynnistämistä.
