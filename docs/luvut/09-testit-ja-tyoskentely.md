# 09 Testaa, selvitä virhe ja luovuta ymmärrettävä työ

**Tavoite:** osoitat toiminnan toistettavalla kokeella ja osaat kertoa, mitä koe todistaa. **Esitiedot:** luku 07 ja käynnistyvä `04-valmis`-sovellus. **Tarkistuspisteet:** `integration_test.ts`, `oikeuskoe_test.ts` ja `csrfkoe_test.ts`.

## Onnistumisen lisäksi testataan kielto

**Testi** on ennalta määritelty koe ja sen odotettu tulos. Pelkkä ”kokeilin ja tuntui toimivan” ei kerro, mitä tarkistettiin. Testi voi olla käsin tehty tai automaattinen. **Testiautomaatio** suorittaa kokeen ohjelmalla niin, että sen voi toistaa samalla tavalla.

**Positiivinen testi** tarkistaa sallitun toiminnon, kuten oman tehtävän muokkauksen. **Negatiivinen testi** tarkistaa estettävän toiminnon, kuten toisen käyttäjän tehtävän muokkauksen. Kielteinen tulos on siis negatiivisessa testissä onnistuminen. Oikeuksien testaaminen pelkän käyttöliittymän kautta ei riitä, koska käyttäjä voi lähettää pyynnön myös suoraan rajapintaan.

**Yksikkötesti** tarkistaa rajatun toiminnon. **Integraatiotesti** tarkistaa, että useat osat toimivat yhdessä; tässä pyynnön käsittely käyttää oikeaa SQL-tietokantaa. **Selainpolun testi** käyttää lisäksi käyttöliittymää selaimessa. Yksi laji ei korvaa kaikkia muita. [Deno: testaus](https://docs.deno.com/runtime/test/).

## Tutoriaali T6A: aja esimerkin testit

Avaa terminaali `04-valmis`-hakemistoon. Tavallisen sovelluksen ei tarvitse olla käynnissä. Testit kutsuvat samaa `createApp`-pyyntökäsittelijää suoraan, joten ne eivät tarvitse vapaata porttia eivätkä verkkolupaa.

```sh
# Tarkista esimerkin päämoduulit ja testien TypeScript-tyypit.
deno task check
# Aja 11 laajempaa integraatiotestiä omilla eristetyillä tietokannoillaan.
deno task test
```

**Odotettu tulos:** lopussa on 11 hyväksyttyä testiä ja 0 epäonnistunutta. Kukin nimetty testikokonaisuus voi sisältää useita tarkistuksia. Testit eivät käytä omien harjoitustiliesi tietokantaa. Pysyvyyden kokeessa luodaan oma väliaikainen alihakemisto `data`-hakemiston alle ja poistetaan vain tämä testin luoma hakemisto.

| Testikokonaisuus | Mitä sillä osoitetaan? |
| --- | --- |
| Rekisteröinti ja tallenteet | Suolatut salasanat ja istuntojen tiivisteet, rajattu julkinen käyttäjävastaus. |
| Kirjautuminen ja uloskirjautuminen | Uusi tunniste syntyy ja vanha lakkaa toimimasta. |
| Istunnon vanheneminen | Käyttö estyy täsmälleen sovitulla aikarajalla. |
| Kaksi käyttäjää | Vieraan projektin tai tehtävän luku, luonti, muutos ja poisto estyvät. |
| Roolit ja omistajan väärentäminen | Asiakas ei saa korottaa oikeuksiaan. |
| Origin, JSON ja koko | Palvelin hylkää väärän alkuperän, väärän muodon ja liian suuren sisällön. |
| SQL:ltä ja HTML:ltä näyttävä teksti | Sisältö säilyy datana eikä muuta SQL:n rakennetta. |
| Julkisten tiedostojen rajaus | Lähdekoodi ja tietokanta eivät ole selaimen ladattavissa. |
| Epäonnistunut kirjautuminen | Yleinen virhe ja yritysrajoitus toimivat. |
| Pysyvyys ja eheys | Uudelleenavaus säilyttää tiedon; migraatio ei toistu ja viiteavaimet toimivat. |
| HTTPS-eväste | Suojatun julkisen alkuperän asetuksessa evästeellä on Secure-lippu. |

SQL-testi ei todista XSS-suojauksen toimivuutta selaimessa. Tee siksi myös P9:n näyttö, jossa HTML:ltä näyttävä teksti näkyy käyttöliittymässä pelkkänä tekstinä eikä synnytä uutta HTML-elementtiä. Secure-lipun testi ei puolestaan todista TLS-palvelimen oikeaa asennusta: ne ovat eri tarkistuksia.

## Tutoriaali T6B: kirjoita pieni oikeustesti mukana

Luo `oikeuskoe_test.ts` ja kopioi koodipankin saman tiedoston koko sisältö. Tämä on pieni erillinen koe, jonka voi käydä läpi rivi riviltä ennen laajaa testitiedostoa. Se luo A:n ja B:n, luo A:lle projektin ja yrittää lisätä siihen tehtävän B:nä.

```sh
# Suorita vain pieni omistajuuskoe; muistikanta ei tarvitse kirjoituslupaa.
deno test --no-prompt --allow-read=./01_create_schema.sql oikeuskoe_test.ts
```

**Odotettu tulos:** yksi testi hyväksytään. Siinä on kolme ajatusta: valmistele tilanne, suorita kokeiltava toiminto ja vertaa tulosta odotukseen. Lopuksi yhteys suljetaan myös mahdollisen virheen jälkeen. `assert.equal` epäonnistuu, jos arvot eroavat, ja `assert.ok` vaatii totuudellisen eli hyväksyttävän arvon.

**Tarkistuspiste:** osoita testistä, missä käytetään A:n evästettä ja missä B:n. Osoita sen jälkeen kaksi eri tarkistusta: estävä HTTP-koodi ja tietokannan muuttumattomuus omistajan uuden lukupyynnön kautta. Virhekoodi yksin ei riittäisi, jos luvaton kirjoitus olisi silti tapahtunut.

**Pieni muutos:** lisää saman testin sisään B:n lukuyritys A:n projektin tehtäviin ja odota 404-vastausta. Älä muuta sovelluksen oikeussääntöjä testin läpäisemiseksi. Seuraava soveltava askel on ulottaa tämä suoja M1-määräpäivään. Laaja testitiedosto on vertailumalli, ei opiskelijan oman muutoksen valmis ratkaisu.

## Tutoriaali T6C: väärä alkuperä kelvollisella istunnolla

Luo `csrfkoe_test.ts` koodipankin mukaan. Tämä koe erottaa CSRF-suojauksen kirjautumisesta ja omistajuudesta. Testillä on kelvollinen istunto ja käyttäjän oma tehtävä, mutta muutospyynnössä on väärä tai puuttuva Origin. Jos testaisimme vain rekisteröintiä ilman istuntoa, emme vielä osoittaisi kirjautuneen käyttäjän tiedon säilymistä tällaisessa tilanteessa.

```sh
# Aja erillinen kirjautuneen käyttäjän CSRF-koe muistitietokannalla.
deno test --no-prompt --allow-read=./01_create_schema.sql csrfkoe_test.ts
```

**Odotettu tulos:** yksi testi hyväksytään. Sekä väärän että puuttuvan Originin PATCH-pyyntö palauttaa 403:n, ja käyttäjän oma uusi GET-pyyntö palauttaa edelleen alkuperäisen nimen sekä keskeneräisen tilan. Koodissa tarkistetaan erikseen nämä kolme havaintoa. Testissä oleva istunto on voimassa koko kokeen ajan.

**Pieni muutos:** laajenna sama ajatus M1-määräpäivään. Selvitä, missä sovelluksen ajonaikainen tarkistus toimii ja missä testin muuttumattomuus todistetaan. P9:n näytön pitää kattaa myös itse lisäämäsi ominaisuus.

## Mikä on testikello?

Istunto kestää kahdeksan tuntia, mutta testissä ei odoteta kahdeksaa tuntia. Sovelluskäsittelijälle voi antaa `now`-funktion. Normaalisti se on `Date.now`. Testissä se palauttaa testin hallitseman luvun. **Riippuvuuden antaminen ulkopuolelta** tarkoittaa tässä juuri tätä: kello saadaan asetuksena, joten sen toimintaa voi hallita muuttamatta oikean käyttäjän koneen aikaa.

Testi tarkistaa ajan juuri ennen vanhenemista ja sen rajalla. Näin voi huomata esimerkiksi sekunnin ja millisekunnin sekoittamisen. **Rajatapaus** on sallittujen ja hylättävien arvojen reunalla oleva koe: tyhjä nimi, pisin sallittu nimi ja yksi merkki liikaa ovat kaikki hyödyllisiä.

## Käsin tehtävä oikeuskoe selkeinä vaiheina

1. Kirjaudu A:na ja luo projekti sekä tehtävä. Kirjaa palautetut numeeriset tunnisteet.
2. Kirjaudu B:nä eri selainprofiilissa. Tee B:n oma projekti varmistaaksesi, että kirjautuminen toimii.
3. Lähetä B:n istunnolla suora pyyntö A:n projektin tunnisteeseen. API-työkalu voi olla oma automaattinen testi tai HTTP-pyyntöihin tarkoitettu ohjelma.
4. Kokeile vieraan projektin listauksen lisäksi lisäystä, tehtävän muokkausta ja poistoa. Käytä oikeita Content-Type- ja Origin-otsakkeita, jotta todella testaat omistajuutta etkä vain väärää pyyntömuotoa.
5. Lue A:n omalla istunnolla projekti uudelleen. Varmista, ettei yksikään estetty toiminto muuttanut tietoa.
6. Toista erikseen väärän Originin koe kelvollisella omalla istunnolla. Näin CSRF-suojaus ja omistajuussuojaus eivät peitä toisiaan.

Jos testaat selaimen kehittäjäkonsolilla, selain asettaa Originin ja lähettää saman alkuperän evästeet itse. Originin tarkoitukselliseen väärentämiseen käytetään tämän vuoksi erillistä HTTP-testiä. Älä tulosta tai liitä palautukseen evästeen raakaa arvoa. P8:n taulukko määrittää kaikki pakolliset omistajuus- ja roolikokeet.

## Kun testi epäonnistuu

Lue ensimmäinen epäonnistunut tarkistus. Kirjoita talteen odotettu tulos ja todellinen tulos. Paikanna sitten vastuu: oliko pyyntö väärä, torjuiko validointi sen ennen oikeuskoetta, puuttuiko istunto vai oliko SQL-ehto puutteellinen? Muuta yhtä asiaa kerrallaan ja suorita sama testi uudelleen.

| Havainto | Mitä se usein tarkoittaa? |
| --- | --- |
| Odotin 404:ää mutta sain 401:n. | Testissä ei ole voimassa olevaa käyttäjäistuntoa. |
| Odotin oikeustestiä mutta sain Origin-virheen. | Pyyntö ei vielä pääse autorisointiin; anna oikea Origin omistajuuskokeessa. |
| Odotin 201:tä mutta sain 400:n. | Syötteen muoto, sallittu kenttä tai pituus ei täsmää sopimukseen. |
| Odotin 200:aa mutta saan 429:n. | Samalla testipalvelimella on jo ylitetty yritysraja. Käytä eristettyä testiä. |
| Muutos näkyy väärässä kannassa. | Komento ajettiin väärässä hakemistossa tai asetettu tiedostopolku eroaa. |
| Tuntematon API-polku antaa kirjautumattomana 401:n. | Koko suojatun API-alueen tunnistaminen tehdään ensin. Testaa 404 kirjautuneena tai julkisella tuntemattomalla polulla. |
| Palvelin toimii mutta nappi ei tee mitään. | Katso selaimen Console sekä Network; backendin terminaali ei näytä kaikkia frontend-virheitä. |

**Regressio** on aiemmin toimineen ominaisuuden rikkoutuminen muutoksessa. Kun lisäät määräpäivän, aja myös vanhat testit. Uusi kenttä ei saa avata omistajuutta tai rikkoa vanhojen rivien lukemista. Lisätehtävä L1 laajentaa opiskelijan omat kokeet automaattiseksi suojaksi. Pakolliset kielteiset kokeet tehdään silti kaikilla poluilla, vaikka kaikkia ei automatisoitaisi.

## Git: tallenna työn vaiheet

**Git** on versionhallintatyökalu. Se säilyttää nimettyjä muutoskokonaisuuksia ja näyttää, mitä muuttui. **Repository eli repositorio** on projektin versionhallittu kokonaisuus. **Commit** on siihen tallennettu muutoskokonaisuus. GitHub ja muut vastaavat palvelut voivat säilyttää Git-repositorioita verkossa; Gitin paikallinen käyttö ei itsessään julkaise työtä.

Asenna Git oman käyttöjärjestelmäsi [virallisen asennusohjeen](https://git-scm.com/install/) mukaan. Tarkista `git --version`. Tee versionhallinta oman työsi hakemistossa, jossa projektin tiedostot ovat. `.gitignore` rajaa esimerkiksi tietokannat ja paikalliset salaisuudet pois uudesta seurannasta. Se ei poista jo historiaan tallennettua salaisuutta.

**Tee ennen seuraavia komentoja:** kopioi puretun materiaalipaketin juuressa oleva `.gitignore` oman `backend-kurssi`-hakemistosi juureen. Lähde on siis paketissa samassa hakemistossa kuin tämä materiaalin README, kohde samassa hakemistossa, jossa aiot suorittaa `git init`. Jos olet rakentanut vain erillisen `04-valmis`-projektin ja versionhallinta tulee sen sisälle, kopioi sen sijaan tiedosto `esimerkit/04-valmis/.gitignore` oman `04-valmis`-hakemistosi juureen. Jos alussa pisteellä alkava tiedosto ei näy tiedostonhallinnassa, avaa sen sisältö koodipankista ja luo editorissa täsmälleen nimetty `.gitignore`. Tallenna tiedosto ennen `git add` -komentoa. Pelkkä toisessa hakemistossa oleva mallipaketin `.gitignore` ei suojaa omaa työtäsi.

```sh
# Luo omaan projektihakemistoosi paikallinen Git-repositorio.
git init
# Aseta tähän repositorioon oma nimesi; korvaa esimerkkiteksti ennen suorittamista.
git config user.name "Oma nimi"
# Aseta oma tähän työhön käyttämäsi sähköposti; tämä on commitin tekijätieto.
git config user.email "oma-osoite@example.test"
# Katso, mitkä tiedostot Git tunnistaa ja varmista, etteivät data tai .env ole mukana.
git status
# Valitse sallitut projektitiedostot seuraavaan tallennukseen .gitignore huomioiden.
git add .
# Tarkista valittujen muutosten sisältö ennen tallennusta; poistu pitkästä näkymästä q-näppäimellä.
git diff --cached
# Tallenna ensimmäinen toimiva vaihe selkeällä viestillä.
git commit -m "Lisää toimiva paikallinen Tehtävätaulu"
# Näytä lyhyt muutoshistoria, josta saat palautuksen tarkistettavan version.
git log --oneline
```

Jos `git status` näyttää tietokannan, `.env`-tiedoston tai salaisuuden, keskeytä ennen committia ja korjaa rajaus. Oppimistyön versionhallinta ei tarvitse suurta komentomäärää: tavoite on, että esimerkiksi tietomallin muutos, sen toteutus ja testit ovat jäljitettävissä. [Git: aloitustutoriaali](https://git-scm.com/docs/gittutorial).

## Dokumentaatio, loki ja luovutus

**README** on projektin aloitusohje. Toinen opiskelija saa sen avulla asennettua, käynnistettyä ja testattua työn. Kirjaa teknologioiden versiot, tiedostorakenne, asetukset ilman salaisuuksia, tietokannan alustus, migraatiot, käynnistys, testit ja tunnetut rajat. Liitä API-taulukko ja tietomallin kuvaus.

**Loki** on ohjelman toiminnasta syntyvää kirjattua tietoa. Loki voi auttaa selvittämään virheen, mutta salasanaa, koko pyyntörunkoa ja istuntotunnistetta ei tulosteta siihen. Esimerkki palauttaa odottamattomasta virheestä yleisen vastauksen eikä sisäistä virhepinoa. **Virhepino** on ohjelman suorituskohtien luettelo, josta voi näkyä sisäisiä tiedostopolkuja.

**CI eli jatkuva integraatio** tarkoittaa muutosten automaattista tarkistusta esimerkiksi versionhallinnan yhteydessä. **CD eli jatkuva toimitus tai julkaisu** tarkoittaa tarkistetun version valmistelua tai viemistä käyttöön sovitulla tavalla. Tässä perussuorituksessa olennaista on toistettava paikallinen tarkistus ja käynnistys. Laajempi julkaisuketju voi olla jatkokehitystä.

Luovutettavaan pakettiin kuuluvat lähdekoodi, kommentoidut asetuspohjat, migraatiot, omat testinäytöt, alkuperäinen design ja oma M1-muutos. Siihen eivät kuulu oikeat salaisuudet tai itse kerätyt oikeiden käyttäjien henkilötiedot. Opettajalle ei tarvitse palauttaa valmista tietokantatiedostoa, jos sama rakenne ja harjoitustiedot syntyvät dokumentoiduilla askelilla.

**Valmis palautukseen, kun:** toinen opiskelija pystyy seuraamaan READMEtä ja sinä pystyt selittämään yhden onnistuvan sekä yhden estetyn pyynnön koko kulun. Luvun 10 tehtäväkohtaiset hyväksymisehdot ratkaisevat, mitä vielä täydennetään.
