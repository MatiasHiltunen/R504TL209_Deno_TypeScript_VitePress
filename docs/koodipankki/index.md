# 11 Täydellinen kommentoitu koodipankki

Tässä ovat toimituksen kokonaiset esimerkkitiedostot. Samat tiedostot löytyvät ZIP-paketista samoilla poluilla. Kopioi yhden tiedoston koko sisältö siihen nimettyyn tiedostoon; älä kopioi tiedostonimen otsikkoa tai koodilohkon rajausmerkkejä. Kommentit ovat osa opetusta ja ne saa säilyttää omassa työssä.

Suorituskomennot, oikea työhakemisto ja odotettu tulos löytyvät kyseisestä tutoriaaliluvusta. Kaikki tiedostot eivät käynnisty itsenäisesti: esimerkiksi `auth.ts` käyttää muita valmiin backendin tiedostoja. `04-valmis` käynnistetään sen omasta hakemistosta komennolla `deno task start`.

Valmis esimerkki ei sisällä opiskelijan omaa M1-määräpäiväratkaisua. Kaksi pientä testitutoriaalia täydentävät 11 integraatiotestin kokonaisuutta. PostgreSQL-peruslabra on pakollinen P6, koko sovelluksen Dockerfile on lisätehtävän L2 lähtöpohja.



Jokaisella tiedostolla on oma sivu. Koodi näkyy kokonaisena ja sen voi kopioida tai ladata tekstinä.

## 11.1 Ensimmäinen ohjelma ja TypeScript

- [`esimerkit/00-kieli/hei.ts`](./esimerkit/00-kieli/hei-ts.md)
- [`esimerkit/00-kieli/kieli.ts`](./esimerkit/00-kieli/kieli-ts.md)

## 11.2 Ensimmäinen Deno-palvelin

- [`esimerkit/01-palvelin/main.ts`](./esimerkit/01-palvelin/main-ts.md)

## 11.3 Frontendin pienet kokeilut

- [`esimerkit/02-frontend-kokeilut/01-ensimmainen-sivu.html`](./esimerkit/02-frontend-kokeilut/01-ensimmainen-sivu-html.md)
- [`esimerkit/02-frontend-kokeilut/02-tyylit/index.html`](./esimerkit/02-frontend-kokeilut/02-tyylit/index-html.md)
- [`esimerkit/02-frontend-kokeilut/02-tyylit/styles.css`](./esimerkit/02-frontend-kokeilut/02-tyylit/styles-css.md)
- [`esimerkit/02-frontend-kokeilut/03-painike/app.js`](./esimerkit/02-frontend-kokeilut/03-painike/app-js.md)
- [`esimerkit/02-frontend-kokeilut/03-painike/index.html`](./esimerkit/02-frontend-kokeilut/03-painike/index-html.md)
- [`esimerkit/02-frontend-kokeilut/04-lomake/app.js`](./esimerkit/02-frontend-kokeilut/04-lomake/app-js.md)
- [`esimerkit/02-frontend-kokeilut/04-lomake/index.html`](./esimerkit/02-frontend-kokeilut/04-lomake/index-html.md)
- [`esimerkit/02-frontend-kokeilut/05-lista/app.js`](./esimerkit/02-frontend-kokeilut/05-lista/app-js.md)
- [`esimerkit/02-frontend-kokeilut/05-lista/index.html`](./esimerkit/02-frontend-kokeilut/05-lista/index-html.md)

## 11.4 Frontend selaimen muistissa

- [`esimerkit/02-frontend/index.html`](./esimerkit/02-frontend/index-html.md)
- [`esimerkit/02-frontend/styles.css`](./esimerkit/02-frontend/styles-css.md)
- [`esimerkit/02-frontend/app.js`](./esimerkit/02-frontend/app-js.md)

## 11.5 SQLite ensimmäistä kertaa

- [`esimerkit/03-tietokanta/db_demo.ts`](./esimerkit/03-tietokanta/db_demo-ts.md)
- [`esimerkit/03-tietokanta/.gitignore`](./esimerkit/03-tietokanta/asetukset-gitignore.md)

## 11.6 Valmiin sovelluksen backend

- [`esimerkit/04-valmis/01_create_schema.sql`](./esimerkit/04-valmis/01_create_schema-sql.md)
- [`esimerkit/04-valmis/db.ts`](./esimerkit/04-valmis/db-ts.md)
- [`esimerkit/04-valmis/security.ts`](./esimerkit/04-valmis/security-ts.md)
- [`esimerkit/04-valmis/http.ts`](./esimerkit/04-valmis/http-ts.md)
- [`esimerkit/04-valmis/auth.ts`](./esimerkit/04-valmis/auth-ts.md)
- [`esimerkit/04-valmis/projects.ts`](./esimerkit/04-valmis/projects-ts.md)
- [`esimerkit/04-valmis/app.ts`](./esimerkit/04-valmis/app-ts.md)
- [`esimerkit/04-valmis/main.ts`](./esimerkit/04-valmis/main-ts.md)
- [`esimerkit/04-valmis/deno.jsonc`](./esimerkit/04-valmis/deno-jsonc.md)
- [`esimerkit/04-valmis/.gitignore`](./esimerkit/04-valmis/asetukset-gitignore.md)

## 11.7 Valmiin sovelluksen frontend

- [`esimerkit/04-valmis/public/index.html`](./esimerkit/04-valmis/public/index-html.md)
- [`esimerkit/04-valmis/public/styles.css`](./esimerkit/04-valmis/public/styles-css.md)
- [`esimerkit/04-valmis/public/app.js`](./esimerkit/04-valmis/public/app-js.md)

## 11.8 Turvatoimintojen kokeet, testit ja ylläpitäjä

- [`esimerkit/04-valmis/security_demo.ts`](./esimerkit/04-valmis/security_demo-ts.md)
- [`esimerkit/04-valmis/oikeuskoe_test.ts`](./esimerkit/04-valmis/oikeuskoe_test-ts.md)
- [`esimerkit/04-valmis/csrfkoe_test.ts`](./esimerkit/04-valmis/csrfkoe_test-ts.md)
- [`esimerkit/04-valmis/integration_test.ts`](./esimerkit/04-valmis/integration_test-ts.md)
- [`esimerkit/04-valmis/seed/admin.ts`](./esimerkit/04-valmis/seed/admin-ts.md)

## 11.9 Dockerin pakollinen PostgreSQL-peruslabra

- [`docker-postgres/compose.yaml`](./docker-postgres/compose-yaml.md)
- [`docker-postgres/.env.example`](./docker-postgres/asetukset-env-example.md)
- [`docker-postgres/.gitignore`](./docker-postgres/asetukset-gitignore.md)
- [`docker-postgres/sql/01-schema.sql`](./docker-postgres/sql/01-schema-sql.md)
- [`docker-postgres/sql/02-write.sql`](./docker-postgres/sql/02-write-sql.md)
- [`docker-postgres/sql/03-read.sql`](./docker-postgres/sql/03-read-sql.md)

## 11.10 L2-lähtöpohja: koko SQLite-sovellus konttiin

- [`esimerkit/04-valmis/Dockerfile`](./esimerkit/04-valmis/Dockerfile.md)
- [`esimerkit/04-valmis/compose.sqlite.yaml`](./esimerkit/04-valmis/compose-sqlite-yaml.md)
- [`esimerkit/04-valmis/.dockerignore`](./esimerkit/04-valmis/asetukset-dockerignore.md)

## 11.11 Koko materiaalipaketin versionhallinnan rajaus

- [`.gitignore`](./asetukset-gitignore.md)
