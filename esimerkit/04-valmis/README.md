# Tehtävätaulu: Deno, TypeScript ja SQLite

Tässä kansiossa on kokonainen paikallisesti ajettava opetussovellus. Luo käyttäjä, kirjaudu sisään,
luo omia projekteja ja lisää niihin tehtäviä. Muokkaa nimiä, merkitse tehtävä valmiiksi ja poista
omaa dataasi. Toinen käyttäjä ei pääse tietoihisi arvaamalla URL-osoitteen tunnuksen.

Backend on palvelimessa suoritettavaa TypeScriptiä. Deno suorittaa sen. Frontend on selaimessa
toimiva HTML-sivu, CSS-tyylitiedosto ja JavaScript-ohjelma. Molemmat tulevat samasta osoitteesta,
joten selain voi tehdä API-pyynnöt suhteellisella polulla kuten `/api/projects`.

## 1. Käynnistä

Asenna kurssin ohjeen mukainen Deno. Tämä paketti on tarkistettu Denolla **2.9.7** ja TypeScriptillä
**6.0.3** Linux-ympäristössä. `node:sqlite` on ollut Denon mukana versiosta 2.2 alkaen; käytä
opetuksessa sovittua versiota, jotta kaikkien ympäristö on samanlainen.
[Denon SQLite-ohje](https://docs.deno.com/examples/sqlite/)

Avaa pääte. Siirry puretun kurssipaketin juuresta tähän kansioon ja suorita komennot yksi
kerrallaan:

```bash
# cd vaihtaa nykyistä kansiota. Tee tämä vain, jos olet nyt kurssipaketin juuressa.
cd esimerkit/04-valmis

# Tarkista, että Deno löytyy ja näet asentamasi version.
deno --version

# Tarkista TypeScriptin tyypit ennen käynnistämistä.
deno task check

# Käynnistä sovellus tämän kansion deno.jsonc-tiedoston start-tehtävällä.
deno task start
```

Avaa selaimeen **[http://localhost:8000](http://localhost:8000)**. Pidä palvelimen pääteikkuna auki.
Kun haluat pysäyttää palvelimen, paina siinä ikkunassa **Ctrl+C**. Uusi käynnistys jatkaa aiemman
tietokannan käyttöä.

Palvelin kuuntelee oletuksena vain tämän koneen osoitetta `127.0.0.1`. Selaimessa käytetään silti
yllä sovittua `localhost`-osoitetta. Näillä nimillä on eri _origin_. Origin on protokollan,
isäntänimen ja portin yhdistelmä, ja palvelin hyväksyy kirjoitukset vain täsmälleen asetetusta
originista.

Ensimmäinen käynnistys luo `data`-kansion, `data/tehtavataulu.sqlite`-tietokannan sekä taulut.
SQLite voi lisäksi luoda `-wal`- ja `-shm`-aputiedostoja. Ne kuuluvat tietokannan toimintaan. Niitä
ei tarjoilla selaimelle.

Käytä harjoittelussa keksittyjä osoitteita, esimerkiksi `opiskelija@example.test`, ja erillistä
harjoitussalasanaa. Rekisteröinti avaa samalla istunnon. Istunto tarkoittaa palvelimella
säilytettävää tietoa siitä, mikä käyttäjä esittää selaimen mukana kulkevaa satunnaista tunnistetta.

## 2. Kokeile koko käyttäjäpolku

1. Valitse rekisteröityminen ja luo käyttäjä. Salasanan pituus on 15–128 merkkiä. Välilyönnit ovat
   sallittuja, eikä salasanaa lyhennetä tai siistitä huomaamatta.
2. Luo projekti. Sen nimessä saa olla 1–120 merkkiä.
3. Lisää projektiin tehtävä. Sen nimessä saa olla 1–200 merkkiä.
4. Muuta projektin ja tehtävän nimiä. Merkitse tehtävä valmiiksi.
5. Päivitä selain. Tietojen pitää säilyä.
6. Kirjaudu ulos ja sitten uudelleen sisään. Samat omat projektit ovat tallella.
7. Avaa erillinen yksityinen selainikkuna tai selainprofiili ja luo toinen käyttäjä. Tavalliset
   välilehdet jakavat saman evästeen; siksi kaksi välilehteä ei yksin riitä kahden käyttäjän
   kokeeseen.
8. Kokeile toisen käyttäjän tunnuksilla ensimmäisen käyttäjän projektin ja tehtävän API-osoitteita.
   Palvelimen pitää estää pääsy. Valmiissa automaattisissa testeissä kokeillaan myös suorat
   muokkaus- ja poistopyynnöt.

Tyhjä projektin nimi, vääränmuotoinen pyyntö tai väärä salasana voi tuottaa virheen. Virhe ei vielä
tarkoita ohjelman rikkoutumista: 400, 401, 403, 404, 409, 413, 415 ja 429 ovat tässä myös
tarkoituksellisia vastauksia.

## 3. Suorita testit

Avaa toinen pääte samaan `04-valmis`-kansioon:

```bash
# Tarkista sovelluksen, testien ja admin-komennon tyypit.
deno task check

# Suorita 11 testiä. Oletustulos tässä paketissa on: 11 passed, 0 failed.
deno task test

# Etsi yleisiä koodivirheitä Denon sisäänrakennetulla tarkistimella.
deno task lint
```

Testit käyttävät oikeaa `Request → Response` -käsittelijää sekä aitoa SQLitea. Useimmat kannat ovat
vain muistissa; pysyvyyttä kokeileva testi luo ja poistaa oman `data/test-...`-alikansionsa.
**Testit eivät avaa opiskelijan `data/tehtavataulu.sqlite`-kantaa.** Testit eivät tarvitse
verkko-oikeuksia.

Testit todentavat salasanan suolan ja tiivisteen, istuntotunnisteen tiivisteen, uuden tunnisteen
kirjautuessa, uloskirjautumisen, kahdeksan tunnin vanhenemisen, kahden käyttäjän omistajuusrajat,
rajatun admin-roolin, JSON-validoinnin, CSRF-suojauksen, rungon kokorajan, SQL-parametrit,
suojausotsakkeet, tiedostojen allowlistin, yritysrajoituksen, levylle tallentumisen, migraation
kertaluonteisuuden sekä viiteavaimet.

Selaimen käyttö, fokus, lomakkeiden ilmoitukset ja koodin mahdolliset saavutettavuuspuutteet
tarkistetaan lisäksi selaimella. HTTP-testi ei yksin todista käyttöliittymää saavutettavaksi.

Kurssin luvussa 09 rakennetaan lisäksi kaksi lyhyttä, kommentoitua opetustestiä. Ne ovat
erillisiä yllä olevista 11 integraatiotestistä. Suorita ne samassa hakemistossa:

```sh
# Aja pieni omistajuuskoe ja CSRF-koe; odotettu yhteistulos on 2 passed, 0 failed.
deno test --no-prompt --allow-read=./01_create_schema.sql oikeuskoe_test.ts csrfkoe_test.ts
```

`oikeuskoe_test.ts` yrittää lisätä B:n tehtävän A:n projektiin. `csrfkoe_test.ts` käyttää
kelvollista omaa istuntoa mutta väärää tai puuttuvaa Origin-otsaketta. Molemmat tarkistavat
estävän vastauksen lisäksi, että alkuperäinen data säilyy.

## 4. Kokeile ylläpitäjän rajattua roolia

Rekisteröi ensin tavallinen käyttäjä selaimessa. Pidä palvelin käynnissä ja suorita toisessa
päätteessä:

```bash
# Anna olemassa olevan harjoituskäyttäjän sähköposti viimeisenä argumenttina.
# Tämä on paikallinen ylläpitotoiminto henkilölle, jolla on pääsy tietokantatiedostoon.
deno task admin opiskelija@example.test
```

Päivitä selaimen sivu. Ylläpitäjän näkymä voi nyt hakea käyttäjien, projektien ja tehtävien
yhteismäärät reitistä `/api/admin/stats`. Tavallinen käyttäjä saa samasta reitistä vastauksen `403`.

`admin`-rooli ei anna yleistä oikeutta muiden projektien tai tehtävien lukemiseen. Kaikkien
tavallisten projektireittien omistajuussäännöt ovat samat molemmille rooleille. Asiakkaan lähettämä
`role`, `user_id` tai muu sopimukseen kuulumaton kenttä hylätään, joten selaimesta ei voi ylentää
itseään.

## 5. Mitä missäkin tiedostossa tapahtuu?

| Tiedosto               | Tehtävä                                                                                            |
| ---------------------- | -------------------------------------------------------------------------------------------------- |
| `01_create_schema.sql` | Taulut, viiteavaimet, rajoitteet ja indeksit.                                                      |
| `db.ts`                | SQLite-yhteys, ensimmäinen migraatio ja tietokantarivien TypeScript-tyypit.                        |
| `security.ts`          | Salasanan laskenta ja vertailu, satunnainen istuntotunniste, eväste sekä yrityslaskuri.            |
| `http.ts`              | HTTP-virheet, JSON-rungon rajattu lukeminen, syötteiden tarkistus ja suojausotsakkeet.             |
| `auth.ts`              | Rekisteröinti, kirjautuminen, istunnosta tunnistaminen ja uloskirjautuminen.                       |
| `projects.ts`          | Projektien ja tehtävien CRUD sekä jokaisen operaation omistajuustarkistus.                         |
| `app.ts`               | Pyynnön reititys, yhteinen suojaus, virheiden käsittely ja staattisten tiedostojen sallittu lista. |
| `main.ts`              | Ympäristöasetukset, tietokannan avaaminen, verkkopalvelimen käynnistys ja sammutus.                |
| `public/index.html`    | Selaimen sivun semanttinen HTML-rakenne.                                                           |
| `public/styles.css`    | Näkyvä esitystapa ja eri näyttöleveyksien asettelu.                                                |
| `public/app.js`        | Lomakkeet, API-pyynnöt ja DOM-päivitykset selaimessa.                                              |
| `seed/admin.ts`        | Olemassa olevan käyttäjän roolin vaihtaminen paikallisesti.                                        |
| `integration_test.ts`  | Oikeaa sovellusta ja tietokantaa käyttävät automaattiset testit.                                   |
| `deno.jsonc`           | Kommentoidut käynnistys-, tarkistus- ja testikomennot rajattuine lupineen.                         |

**CRUD** tarkoittaa neljää perustoimintoa: Create eli luominen, Read eli lukeminen, Update eli
muuttaminen ja Delete eli poistaminen. Sama tallennettava kohde tarvitsee usein kaikki neljä
toimintoa.

## 6. API-sopimus

API tarkoittaa tässä HTTP-rajapintaa, jolle selain lähettää pyyntöjä. Pyyntörunko on JSONia.
Vastauksen nimet ovat englanniksi, jotta käyttöliittymä voi käsitellä niitä vakaina kenttäniminä.
Käyttäjälle näytettävät ilmoitukset ovat suomeksi.

Kaikki kirjoittavat pyynnöt, myös `DELETE` ja logout, tarvitsevat otsakkeet
`Origin: http://localhost:8000` sekä `Content-Type: application/json`. Selain asettaa Originin itse.
Tyhjä kirjoitusrunko on JSON-olio `{}`. Eväste kulkee selaimen samasta originista tekemiin
pyyntöihin automaattisesti; frontend ei lue sen arvoa JavaScriptillä.

| Metodi ja polku                | JSON-pyyntö                  | Onnistunut vastaus                          | Oikeus                                                 |
| ------------------------------ | ---------------------------- | ------------------------------------------- | ------------------------------------------------------ |
| `POST /api/auth/register`      | `email`, `password`          | `201`, `user` ja istuntoeväste              | Julkinen. Rooli on aina `user`.                        |
| `POST /api/auth/login`         | `email`, `password`          | `200`, `user` ja uusi istuntoeväste         | Kelvollinen salasana.                                  |
| `POST /api/auth/logout`        | Tyhjä olio                   | `204`, evästeen poisto                      | Oma eväste, jos sellainen on.                          |
| `GET /api/auth/me`             | Ei runkoa                    | `200`, `user`                               | Voimassa oleva istunto.                                |
| `GET /api/projects`            | Ei runkoa                    | `200`, `projects`-taulukko                  | Vain omat projektit.                                   |
| `POST /api/projects`           | `title`                      | `201`, `project`                            | Uusi projekti kuuluu istunnon käyttäjälle.             |
| `GET /api/projects/:id`        | Ei runkoa                    | `200`, `project`                            | Projektin omistaja.                                    |
| `PATCH /api/projects/:id`      | `title`                      | `200`, `project`                            | Projektin omistaja.                                    |
| `DELETE /api/projects/:id`     | Tyhjä olio                   | `204`                                       | Projektin omistaja. Myös projektin tehtävät poistuvat. |
| `GET /api/projects/:id/tasks`  | Ei runkoa                    | `200`, `tasks`-taulukko                     | Projektin omistaja.                                    |
| `POST /api/projects/:id/tasks` | `title`                      | `201`, `task`                               | Projektin omistaja.                                    |
| `GET /api/tasks/:id`           | Ei runkoa                    | `200`, `task`                               | Tehtävän projektin omistaja.                           |
| `PATCH /api/tasks/:id`         | `title`, `done` tai molemmat | `200`, `task`                               | Tehtävän projektin omistaja.                           |
| `DELETE /api/tasks/:id`        | Tyhjä olio                   | `204`                                       | Tehtävän projektin omistaja.                           |
| `GET /api/admin/stats`         | Ei runkoa                    | `200`, `users`, `projects`, `tasks` lukuina | Vain `admin`.                                          |

`:id` tarkoittaa URLiin sijoitettavaa positiivista kokonaislukua, esimerkiksi `/api/projects/1`.
JSONissa `id` ja `projectId` ovat lukuja. `user` sisältää kentät `id`, `email`, `role`. `project`
sisältää kentät `id`, `title`, `createdAt`. `task` sisältää kentät `id`, `projectId`, `title`,
`done`, `createdAt`. `createdAt` on UTC-aikaa kuvaava ISO 8601 -teksti, esimerkiksi
`2026-10-19T12:34:56.123Z`. `done` on totuusarvo `true` tai `false`.

Virheen runko on aina olio, jossa on `error`-tekstikenttä. Tunnistamattomalle käyttäjälle suojattu
API palauttaa `401`. Tavallinen käyttäjä saa admin-reitistä `403`. Toisen omistamasta tai
puuttuvasta projektista ja tehtävästä palautetaan samalla tavalla `404`.

## 7. Tietoturvan ratkaisut ja opetusesimerkin rajat

Salasanasta lasketaan Web Crypton PBKDF2-HMAC-SHA-256-tiiviste 600 000 kierroksella ja uudella 16
tavun suolalla. Vertailu käyttää `node:crypto`-moduulin `timingSafeEqual`-toimintoa.
Tunnistamattomalle sähköpostillekin tehdään sama hidas työ, ja väärä sähköposti ja väärä salasana
palauttavat saman julkisen virheen. OWASP nostaa Argon2id:n ensisijaiseksi vaihtoehdoksi; PBKDF2
valittiin tähän rajattuun esimerkkiin, koska se on valmiina Web Cryptossa eikä vaadi kolmannen
osapuolen asennusta.
[OWASP: Password Storage](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)

Istuntotunnisteessa on 32 kryptografisesti satunnaista tavua. Vain sen SHA-256-tiiviste tallennetaan
tietokantaan. Satunnaistunniste ja ihmisen valitsema salasana tarvitsevat erilaisen käsittelyn:
nopeasti laskettavaa pelkkää SHA-256:ta ei tässä käytetä salasanan tallennukseen.

Evästeellä on `HttpOnly`, `SameSite=Strict`, `Path=/` ja kahdeksan tunnin `Max-Age`.
`APP_ORIGIN`-asetuksen ollessa HTTPS mukana on myös `Secure`. Palvelin tarkistaa istunnon
vanhenemisen itse, vaihtaa tunnisteen kirjautuessa ja poistaa istunnon uloskirjautuessa. `HttpOnly`
estää selaimen JavaScriptiä lukemasta evästettä; se ei yksin estä hyökkäävää skriptiä tekemästä
pyyntöjä, jos sellainen pääsee suorittumaan sivulla.
[MDN: Set-Cookie](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie)

Kirjoituksissa vaaditaan tarkka sallittu Origin ja JSON-sisältötyyppi. CORS-oikeuksia vieraille
origineille ei avata. Tämä puolustaa tämän saman originin JSON-API:n CSRF-hyökkäyksiä vastaan;
erillinen CSRF-token ei kuulu tämän esimerkin sopimukseen. Origin ei korvaa kirjautumista tai
käyttöoikeustarkistusta.
[OWASP: CSRF Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)

Ohjelma käyttää SQL-parametreja, tarkistaa omistajuuden palvelimella, hylkää ylimääräiset
JSON-kentät ja rajaa pyynnön rungon 16 KiB:iin. Staattisia tiedostoja tarjoillaan vain nimetyltä
listalta. Käyttöliittymän käyttäjädata kirjoitetaan DOMiin tekstinä. CSP, `nosniff`, kehystyksen
esto ja muut suojausotsakkeet täydentävät näitä ratkaisuja.

Rajaukset, jotka on ymmärrettävä ennen esimerkin jatkokehitystä:

- Kirjautumisen yritysrajoitus on yhden palvelinprosessin muistissa: enintään 5 yritystä yhtä
  sähköpostia ja 20 yritystä yhtä IP-osoitetta kohti 15 minuutissa. Rekisteröintejä on enintään 10
  yhtä IP-osoitetta kohti samalla aikajaksolla. Myös onnistuneet yritykset lasketaan. Palvelimen
  uudelleenkäynnistys nollaa laskurit. Jaettu tuotantopalvelu tarvitsee yhteisen laskurivaraston ja
  oman kuormitus- ja estostrategiansa.
- IP-osoite luetaan suoraan verkkoyhteydestä. Käänteisvälityspalvelimen takana kaikki asiakkaat
  voivat näyttää samalta IP:ltä. Älä ratkaise asiaa luottamalla mielivaltaiseen
  `X-Forwarded-For`-otsakkeeseen; suunnittele luotettu välityspalvelinraja erikseen.
- Rekisteröinnin `409` erottaa jo varatun osoitteen uuden tilin onnistumisesta. Sähköpostin
  omistajuuden vahvistus, kadonneen salasanan palautus, vuotaneiden salasanojen estolista,
  monivaiheinen tunnistautuminen, tilin poisto ja salasanojen päivitysmigraatio eivät sisälly tähän
  malliin.
- Kahdeksan tuntia on kiinteä enimmäiskesto. Erillistä toimettomuusaikarajaa, kaikkien laitteiden
  uloskirjautumista tai istuntolistaa ei vielä ole.
- Synkroninen SQLite pitää tietokantavaiheen helposti nähtävänä. Suuret kyselyt estäisivät muiden
  pyyntöjen käsittelyä. Sivutus, projektien ja tehtävien käyttäjäkohtaiset kiintiöt, hitaiden
  asiakkaiden aikakatkaisut, lokien valvonta ja kuormitustestaus ovat jatkokehitystä.
- Tavallinen HTTP on paikallisen harjoituksen asetus. Julkinen palvelu tarvitsee HTTPS:n, oikeat
  palvelin- ja evästeasetukset sekä tarkoitukseen sopivan tunnistautumisratkaisun. Tämä esimerkki ei
  väitä täyttävänsä kaikkia tuotannon tai minkään tietoturvastandardin vaatimuksia.

## 8. Tavallisia ongelmia

| Havainto                                                                   | Tarkista ja toimi                                                                                                                 |
| -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `deno`-komentoa ei löydy                                                   | Asenna Deno kurssin ohjeella ja avaa pääte uudelleen. Kokeile `deno --version`.                                                   |
| `node:sqlite`-moduulia ei löydy                                            | Tarkista Deno-versio. Käytä kurssilla sovittua tuettua versiota.                                                                  |
| Selain ei saa yhteyttä                                                     | Onko `deno task start` yhä käynnissä? Onko osoite täsmälleen `http://localhost:8000`?                                             |
| Kirjoitus antaa `403`                                                      | Tarkista selaimen osoite ja `APP_ORIGIN`. `127.0.0.1` ei ole sama origin kuin `localhost`.                                        |
| Kirjoitus antaa `415`                                                      | Lähetä `Content-Type: application/json`.                                                                                          |
| `400` tyhjässä poistossa                                                   | Lähetä JSON-runko `{}` myös DELETE- ja logout-pyyntöihin.                                                                         |
| `401` sivun avauksessa                                                     | Uudella käyttäjällä ei vielä ole istuntoa. Rekisteröidy tai kirjaudu. Vanheneminen tuottaa saman vastauksen.                      |
| `429` kirjautumisessa                                                      | Odota vastauksen `Retry-After`-sekuntimäärä. Se on tässä enintään 15 minuuttia.                                                   |
| Deno ilmoittaa puuttuvasta luku-, kirjoitus-, verkko- tai ympäristöluvasta | Käytä `deno task start`, joka antaa rajatut luvat. Älä lisää varmuuden vuoksi `-A`-lippua.                                        |
| Portti 8000 on varattu                                                     | Pysäytä aiempi kurssipalvelin. Jos vaihdat portin, muuta kuunteluportti, julkinen origin ja Denon verkkolupa vastaamaan toisiaan. |
| Tauluja muuttanut SQL ei tule uudelleen voimaan                            | Migraatio 1 suoritetaan vain kerran. Tee uusi numeroitu migraatio; älä poista opiskelijan dataa rakenteen päivittämiseksi.        |

Denon käyttöoikeusmalli rajaa ohjelman ympäristöpääsyä. SQL-parametrit, autentikointi ja
autorisointi ratkaisevat muita asioita: esimerkiksi tiedostolupa ei päätä, saako käyttäjä A muuttaa
käyttäjän B tehtävää. [Denon käyttöoikeudet](https://docs.deno.com/runtime/reference/permissions/)
