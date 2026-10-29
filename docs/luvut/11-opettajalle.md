# 11 Opettajalle: toteutus ja palautettavat näytöt

## Materiaalin pedagoginen käyttö

Materiaali on rakennettu R504TL209 Full Stack -sovelluskehitys: Backend -opintojakson viiden opintopisteen kokonaisuuteen. Mitoitus on 135 tuntia, joista 30 on ohjattua opetusta ja 105 itsenäistä tai ryhmässä tehtävää opiskelutyötä. Luvun 10 tuntijako on toteutusehdotus. Se ei muuta lukujärjestyksen varauksia tai oppilaitoksen opetustunnin määritelmää.

Uusi oppija kohtaa samanaikaisesti tiedostonhallinnan, komentotulkin, ohjelmointikielen ja verkkosovelluksen käsitteet. Pidä ensin onnistumisen vaatima muutos pienenä. Näytä ruudulta aina, missä olet: editori, terminaali vai selain. Lue ensimmäisellä kerralla myös komentojen valitsimet ääneen merkityksineen. Vältä piiloon jääviä hiirellä tehtyjä muutoksia ja valmiiksi oletettuja asennuksia.

Yhden ohjatun työjakson toimiva rytmi on: lyhyt arkinen selitys, opettajan näyttämä pieni muutos, opiskelijan toisto, yhteinen tarkistuspiste, yhden asian muuntaminen ja omin sanoin kertominen. Toistamista ei tarvitse perustella pois. Se on tämän materiaalin ensimmäinen vaihe, josta siirrytään vähitellen soveltamiseen.

## Ehdotus opetuskertojen ydinkysymyksiksi

| Kerta | Kysymys, johon opiskelija osaa lopuksi vastata | Näytettävä asia |
| --- | --- | --- |
| 1 | Missä pyyntö alkaa ja missä päätös tehdään? | Ensimmäinen Deno-ohjelma, selainpyyntö ja vastaus. |
| 2 | Miten HTML, CSS ja JavaScript jakavat työn? | Selaimen muistissa toimiva, näppäimistöllä käytettävä lista. |
| 3 | Miten API-pyyntö päätyy omaan funktiooni? | Deno.serve, reitti, JSON, status ja hallittu virhe. |
| 4 | Mitä designin toteuttaminen vaatii tiedolta? | Kenttien jäljitettävyys, relaatiot ja SQL-kokeet. |
| 5 | Miten uusi kenttä lisätään rikkomatta vanhaa dataa? | SQLite, migraatio ja M1:n suunnittelu sekä toteutus. |
| 6 | Miten käyttäjä tunnistetaan ja kontti käynnistetään? | Pieni turvatoimintojen koe, istunto ja Docker-peruslabra. |
| 7 | Miksi toinen käyttäjä ei saa tehdä tätä muutosta? | Omistajuus, roolit, CSRF ja muuttumattomuuden tarkistus. |
| 8 | Mistä toinen henkilö tietää työn toimivan? | Henkilökohtainen näyttö, toistettava ajo ja ratkaisun rajat. |

Docker voidaan käsitellä ennen SQLitea, jos ryhmän ympäristö on siihen valmis. Uuden tekniikan opetus alkaa taas ohjatusta pienestä kokeesta, vaikka projektin kokonaisuus etenee kohti itsenäistä työtä. Vaikeustaso kasvaa lopun omissa sovelluksissa, oikeustesteissä ja lisätehtävissä.

## Mitä jaetaan opiskelijoille?

VitePress-versiossa opiskelija lukee tämän sivuston lukuja. Käynnistys, muokkaaminen ja staattisen sivuston rakentaminen on kuvattu [VitePress-käyttöohjeessa](../vitepress-kaytto.md). Seuraavat kappaleet kuvaavat myös aiemman HTML- ja Moodle-toimituksen käyttöä. [Aiempi materiaalipaketti](/lataukset/R504TL209_materiaali_2026-10-19.zip) on saatavana samojen sisältöjen vaihtoehtoiseen jakeluun.

Jaettava HTML-opas on luettavissa ilman kirjautumista paikallisena tiedostona. ZIP-paketissa ovat samat luvut muokattavina Markdown-lähteinä, täydelliset esimerkit ja erilliset Moodle-sivujen HTML-sisällöt. Koodipankki sisältää kokonaiset tiedostot. Sisällön perusteella opiskelijalta ei edellytetä verkkosivulta löytyvän muuttuvan esimerkin kopioimista.

Kurssin JSON-tiedosto käyttää aiemman materiaalin `metadata`-, `sections`- ja `modules`-rakennetta. Se on **sisältöpaketti samaan rakenteeseen perustuvalle tuontiratkaisulle**, ei Moodlen natiivi `.mbz`-varmuuskopio. Yleiseen Moodleen sisältö voidaan lisätä sivu kerrallaan paketissa olevasta HTML:stä ja tehtävien kuvauksista. JSONin kenttien tuki tarkistetaan käytössä olevasta tuontiratkaisusta ennen sen ajoa.

Tämä toimitus ei ole tehnyt muutoksia käynnissä olevaan Moodle-kurssiin. Tehtävien deadlinet, ryhmäasetukset ja käyttöoikeudet asetetaan toteutuksen aikataulun mukaan. Luvun 10 pisteytys on ehdotus, joka viestitään opiskelijoille ennen arvioitavaa työtä.

## Saavutettavuuden käytännön ohjeet opetustilanteeseen

Säilytä otsikkotasot ja kuvaavat linkkitekstit. Älä muuta koodia kuvaksi tai piilota ydinohjeita pelkkään tallenteeseen. Jos tallennat opetuksen, huolehdi tekstityksestä ja anna rinnalle samat tiedostot sekä tekstiohjeet. Luennon kuvallinen piirros selitetään myös puheena tai tekstinä.

Varaa aikaa näppäimistöllä etenemiseen ja anna opiskelijan avata kommentoitu koodi omassa editorissaan. Tiiviimpi editorin näkymä on mahdollista asetuksilla; kommenttien poistamista ei vaadita. Arvioi ymmärrystä ja toimintaa, älä kirjoitusnopeutta, englannin taitoa tai ulkoasun koristeellisuutta.

Käyttöliittymän automaattinen tarkistin tai selainkoe ei osoita kaikkea saavutettavuutta. Opiskelijan tehtävässä tarvitaan myös näppäimistökoe, näkyvien nimien ja virheiden tarkistus sekä suurennuksen kokeilu. Ruudunlukijalla tehtävää arviointia voi käyttää lisänä ja palautteen lähteenä. Dokumentoi todelliset havainnot väitteen ”täysin saavutettava” sijaan.

## Henkilökohtainen osaaminen ryhmätyössä

Ryhmä saa tehdä yhteisen sovelluksen. Jokainen opiskelija palauttaa omat näyttöviitteensä ja selittää ainakin yhden onnistuvan sekä yhden estettävän pyynnön. Commitien määrä ei yksin osoita oppimista. Yhteisestä työstä voi arvioida eri opiskelijoilta eri osuuksia, kun kaikki ydintavoitteet tulevat henkilökohtaisesti osoitetuiksi.

Lyhyt henkilökohtainen näyttö voidaan toteuttaa keskusteluna, saavutettavana tekstinä tai muulla sovitulla tavalla. Anna tehtävänanto ennakkoon: opiskelija näyttää oman työnsä, tekee pienen muutoksen tai jäljittää olemassa olevan toiminnon ja selittää, miten hän varmisti sen. Muistinvarainen syntaksikoe ei ole tämän materiaalin tarkoitus.

## Työpohja A: oma polku

Täytä yksi sivu ennen itsenäistä työtä:

| Kohta | Opiskelijan vastaus |
| --- | --- |
| Käyttämäni backend-kieli ja ajoympäristö | Kirjoita nimi ja versio. |
| Frontendin tekniikka | Kirjoita HTML/CSS/JS tai valittu vastaava toteutustapa. |
| Tietokanta | SQLite tai PostgreSQL Dockerissa; perustele valinta. |
| Docker-näyttö | Kerro, missä osoitat P6:n kontti- ja pysyvyyskokeet. |
| Käyttäjien tunnistaminen | Nimeä käyttämäsi menetelmä ja kirjasto tai kurssin malliratkaisu. |
| Käyttöoikeussäännöt | Kirjoita käyttäjän, omistajan ja ylläpitäjän sallitut toiminnot. |
| M1-muutoksen suunnitelma | Kerro, mihin näkymään, kenttään, reittiin ja tauluun muutos tulee. |
| Näytön toimitus | Kerro lähdekoodin versio sekä ohjeiden ja testitulosten sijainti. |

Oman tekniikan polulla ei edellytetä Denoa vastaavaa tiedostojakoa, käsin kirjoitettua salaustoimintoa tai tiettyä HTTP-kirjastoa. Turvallisen valmiin ratkaisun käyttö hyväksytään. Tunnistautumismenetelmän on kuitenkin täytettävä sama vanhenemisen, väärän tunnisteen torjunnan ja uloskirjautumisen mitätöinnin vaatimus. Esimerkiksi JWT:n käyttö ei yksin todista, että uloskirjautuminen estäisi jo myönnetyn tunnisteen uudelleenkäytön.

## Työpohja B: designistä toteutukseen

| Designin näkymä ja käyttäjän tarve | Tallennettava kenttä ja tyyppi | Rajoite ja oletus | API-pyyntö/vastaus | Hyväksyntäkoe |
| --- | --- | --- | --- | --- |
| Kirjoita oma havainto. | Nimeä taulu ja kenttä. | Kerro myös puuttuvan arvon käsittely. | Nimeä tarkka toiminto. | Kerro syöte ja odotettu tulos. |

M1:n määräpäivä on kalenteripäivä, ei kellonaika. Päätä, erotatko API:ssa kentän puuttumisen, arvon `null` ja tyhjän tekstin. Esimerkiksi PATCH-pyynnön puuttuva kenttä voi tarkoittaa ”älä muuta”, kun `null` tarkoittaa ”tyhjennä”. Perustele valinta, toteuta se johdonmukaisesti ja testaa oikea päivämäärä. Pelkkä muodon `vuosi-kuukausi-päivä` tarkistus ei havaitse helmikuun 30. päivää.

## Työpohja C: testinäyttö

| Tunnus ja vaatimus | Lähtötilanne ja käyttäjä | Pyyntö tai käyttötoiminto | Odotettu tulos | Todellinen tulos | Tietokannan tila ja näyttöviite |
| --- | --- | --- | --- | --- | --- |
| Esimerkiksi P8, vieras muokkaus. | B on kirjautunut; tehtävän omistaa A. | Kirjoita metodi, reitti ja ei-salainen syöte. | Estävä vastaus ja muuttumaton tieto. | Kirjaa havaittu tulos. | Viittaa uuteen omistajan lukupyyntöön ja koodin versioon. |

Pelkkä tulosteen `passed`-sana ei korvaa kuvausta siitä, mitä testi tekee. Opiskelija valitsee vähintään yhden testin ja selittää valmistelun, toiminnon, vertailun ja siivouksen. Näyttöön ei kopioida istuntotunnisteita tai salasanoja.

## Työpohja D: lähteet ja tekoälyn käyttö

Kirjaa, mistä sait teknisen ohjeen, mitä siitä käytit, miten tarkistit sen ja mikä päätös jäi omaksesi. Jos käytät tekoälyä, nimeä käyttötarkoitus ja varmennus: esimerkiksi koodirivin selitys, virheen selvittäminen tai vaihtoehtoisen mallin arviointi. Käytä julkista tai itse keksittyä harjoitusdataa. Noudata lisäksi toteutuksen erikseen annettua tekoälyohjetta; tämä materiaali ei luo uusia oppilaitoksen virallisia käyttöehtoja.

## Arvioinnin toteutus

Käy ensin läpi kaikki P1–P9-ydinehdot. Puuttuva autentikaatio, autorisointi tai muu pakollinen näyttö merkitään täydennettäväksi. Laske laatupisteet vasta saman yhteisen matriisin perusteella. Yhden tekniikan asennusvaikeudet tai valitun kehyksen nimi eivät saa tuottaa automaattista arvosanakattoa.

Korkeassa arvioinnissa opiskelija perustelee oman mallinsa, näyttää turvallisuuden kokeilla ja arvioi toimivuuden sekä skaalautuvuuden rajoja. Tätä voi osoittaa perusteellisella ydintyöllä. Lisätehtävien lukumäärä ei korvaa puuttuvaa ymmärrystä, eikä vaikeimman lisätehtävän tekeminen ole korkeimman arvosanan ehto.

## Lisätehtävä L2:n valmis lähtöpohja

Paketin `04-valmis/Dockerfile` ja `compose.sqlite.yaml` ovat kommentoitu lähtöpohja koko SQLite-sovelluksen kontittamiseen. Ne ovat erillisiä pakollisesta PostgreSQL-peruslabrasta. Pysäytä ensin mahdollinen paikallinen Deno-palvelin portista 8000. Suorita seuraavat komennot `04-valmis`-hakemistossa vain Dockerin ollessa käytettävissä:

```sh
# Rakenna sovellusimage ja käynnistä SQLite-sovellus omassa kontissa.
docker compose -f compose.sqlite.yaml up --build -d
# Tarkista, että web-palvelu on käynnissä.
docker compose -f compose.sqlite.yaml ps
# Lue sovelluksen loki ja avaa sen jälkeen http://localhost:8000 selaimessa.
docker compose -f compose.sqlite.yaml logs web
```

Luo kontissa toimivaan sovellukseen omat harjoitustiedot. Paikallisen Deno-ajon tiedostoja ei kopioida automaattisesti kontin tietokantaan. Compose käyttää omaa nimettyä taltiota. Näytä datan säilyminen seuraavalla kierroksella:

```sh
# Poista tämän Compose-projektin kontti säilyttäen nimetty tietokantataltio.
docker compose -f compose.sqlite.yaml down
# Luo kontti uudelleen samaan taltion sisältöön kytkettynä.
docker compose -f compose.sqlite.yaml up -d
```

**Odotettu tulos:** aiemmin luodut tilit, projektit ja tehtävät löytyvät kirjautumisen jälkeen. **Arvioitava lisänäyttö:** opiskelija selittää Dockerfilen kerrokset, prosessin tavallisen käyttäjän, portin, väliaikaisen välimuistin ja pysyvän tietokannan eri sijainnit. Kuvan rakentamisen onnistuminen ei yksin osoita käyttöliittymän, tietokannan ja kirjautumisen toimivuutta.

Docker-esimerkkien rakenne ja polut on tarkistettu materiaalia laadittaessa. Konttien varsinaista käynnistystä ei ole voitu varmentaa tämän toimituksen ympäristössä, koska Docker-moottori puuttuu. Opettajan käyttöönottokoe on ajaa sekä P6:n PostgreSQL-labra että mahdollinen L2 ennen niitä käsittelevää opetuskertaa. Deno- ja selainkokeiden toteutuneet tulokset on koottu paketin tarkistusraporttiin.
