---
outline: false
---

# esimerkit/04-valmis/public/styles.css

**Ryhmä:** Valmiin sovelluksen frontend.

Tiedoston sijainti puretussa projektissa on `esimerkit/04-valmis/public/styles.css`. Kopioi koko sisältö kommentteineen tähän tiedostoon. Suorituskomennot ja odotettu tulos ovat asianomaisessa tutoriaaliluvussa.

[Lataa lähdekoodi tekstinä](/koodit/esimerkit/04-valmis/public/styles.css.txt) · [Palaa koodipankkiin](/koodipankki/)

````css
/* Tähti valitsee kaikki elementit. ::before ja ::after ovat CSS:n tuottamia lisäosia. */
*,
*::before,
*::after {
  /* Leveys sisältää täytteet ja reunukset, joten kentät eivät kasva vanhempaansa leveämmiksi. */
  box-sizing: border-box;
}

/* html on koko sivun juurielementti. */
html {
  /* 100 % kunnioittaa selaimen tai käyttäjän valitsemaa tekstin peruskokoa. */
  font-size: 100%;
  /* Tällä sivulla kentille pyydetään vaaleaa käyttöjärjestelmäteemaa. */
  color-scheme: light;
}

/* body määrittää koko näkyvän sivun oletustyylit. */
body {
  /* Poistetaan selaimen oletusmarginaali. */
  margin: 0;
  /* Käytetään laitteen omia kirjasimia ilman ulkoista latausta. */
  font-family: system-ui, sans-serif;
  /* Rivien väliin jätetään tilaa lukemisen helpottamiseksi. */
  line-height: 1.6;
  /* Tumma teksti erottuu vaaleasta taustasta. */
  color: #172b3a;
  /* Vaalea sivutausta erottaa valkoiset sisältökortit. */
  background: #f4f7fa;
  /* Pitkä sana saa katketa, jotta sivu ei levene puhelimessa. */
  overflow-wrap: anywhere;
}

/* Pilkku antaa saman säännön kolmelle sisältöalueelle. */
.page-header,
main,
.page-footer {
  /* Sisältö vie enintään 72 peruskirjasimen levyistä rem-yksikköä mutta jättää reunoille tilaa. */
  width: min(72rem, calc(100% - 2rem));
  /* Automaattiset sivumarginaalit keskittävät alueen. */
  margin-inline: auto;
}

/* Sivun aloitus saa oman pystysuuntaisen täytteensä. */
.page-header {
  /* block tarkoittaa tavanomaisessa suomenkielisessä sivussa ylä- ja alareunaa. */
  padding-block: 2rem 0.5rem;
}

/* Pääotsikko erottuu selkeästi. */
h1 {
  /* clamp säätää kokoa näkymän mukaan mutta pitää minimi- ja maksimikoon. */
  font-size: clamp(2rem, 5vw, 3rem);
  /* Otsikon riviväli on leipätekstiä tiiviimpi. */
  line-height: 1.15;
}

/* Kaikilla otsikkotasoilla on yhteinen ylä- ja alaväli. */
h1,
h2,
h3,
h4 {
  /* Yläpuolelle ei tule oletusmarginaalia; alle jää 0,75 rem. */
  margin-block: 0 0.75rem;
}

/* Alueet erotetaan pystysuunnassa toisistaan. */
section {
  /* margin-block lisää tilaa alueen ylä- ja alapuolelle. */
  margin-block: 1rem;
}

/* Tämä luokka antaa samat korttityylit lomakkeelle ja osiolle. */
.card {
  /* Pienin leveys nolla sallii kortin kaventumisen ruudukossa. */
  min-width: 0;
  /* Sisäreunus jättää tekstille hengitystilaa. */
  padding: 1.25rem;
  /* Selkeä tummahko reunus erottaa kortin taustasta. */
  border: 1px solid #718096;
  /* Hieman pyöristetty reuna on vain ulkoasuvalinta. */
  border-radius: 0.5rem;
  /* Kortin tausta on valkoinen. */
  background: #ffffff;
}

/* Kahden alueen asettelu alkaa yhdestä sarakkeesta pienillä näytöillä. */
.two-columns {
  /* grid käynnistää CSS-ruudukon. */
  display: grid;
  /* Yksi joustava sarake saa tarvittaessa kaventua nollaan. */
  grid-template-columns: minmax(0, 1fr);
  /* gap on sarakkeiden ja rivien välinen tyhjä tila. */
  gap: 1.25rem;
  /* Kunkin kortin yläreuna alkaa samasta kohdasta; kortteja ei venytetä yhtä korkeiksi. */
  align-items: start;
}

/* Vasta riittävän leveässä näkymässä näytetään kaksi saraketta. */
@media (min-width: 52rem) {
  /* Tämä sääntö korvaa vain ruudukon sarakemäärän. */
  .two-columns {
    /* Kaksi yhtä suurta saraketta; fr on osuus vapaasta tilasta. */
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

/* Tunnuksen ja uloskirjautumisen rivi saa tarvittaessa taittua. */
.account-row,
.task-actions {
  /* flex asettelee lapset peräkkäin riville. */
  display: flex;
  /* wrap sallii siirtymisen seuraavalle riville pienessä tilassa. */
  flex-wrap: wrap;
  /* Kohdistetaan lapset pystysuunnassa keskelle. */
  align-items: center;
  /* Jätetään lasten väliin tasainen etäisyys. */
  gap: 0.75rem;
}

/* Lomakkeen kentän nimi näytetään omalla rivillään. */
label {
  /* block käyttää rivin koko leveyden. */
  display: block;
  /* Lihavointi erottaa nimen ohjetekstistä. */
  font-weight: 650;
  /* Annetaan ylä- ja alapuolelle eri kokoiset välit. */
  margin-block: 0.75rem 0.25rem;
}

/* Tavallinen syöte ja painike perivät luettavan kirjasinkoon. */
input,
button {
  /* inherit kopioi ympäröivän sisällön kirjasintyylin. */
  font: inherit;
  /* Vähintään 44 CSS-pikselin korkeus helpottaa osoittamista. */
  min-height: 44px;
  /* Sisätäyte pitää tekstin irti reunoista. */
  padding: 0.55rem 0.8rem;
  /* Näkyvä reunus auttaa erottamaan kentän. */
  border: 2px solid #586577;
  /* Kenttien ja painikkeiden kulmat ovat hieman pyöristetyt. */
  border-radius: 0.35rem;
}

/* Tekstisyötteet täyttävät oman vanhempansa leveyden. */
input {
  /* width huomioi myös reunuksen box-sizing-säännön vuoksi. */
  width: 100%;
  /* Kenttä saa kaventua pienellä näytöllä. */
  min-width: 0;
  /* Teksti on tummaa. */
  color: #172b3a;
  /* Syöttöalueen tausta on valkoinen. */
  background: #ffffff;
}

/* Peruspainike erottuu valkoisella tekstillä tummasta pohjasta. */
button {
  /* Painikkeen teksti on valkoista. */
  color: #ffffff;
  /* Tumma sinivihreä on riittävän selkeä valkoisen tekstin tausta. */
  background: #174e5c;
  /* Reunus käyttää samaa tummaa väriä. */
  border-color: #174e5c;
  /* Painiketta ei pakoteta pysymään yhdellä rivillä. */
  white-space: normal;
  /* Osoitin kertoo hiirikäyttäjälle painettavasta kohteesta. */
  cursor: pointer;
}

/* Lomakkeen suorana lapsena oleva painike saa väliä edeltävään kenttään. */
form > button {
  /* Vain yläreunan marginaalia muutetaan. */
  margin-top: 0.75rem;
}

/* Toissijainen painike näyttää eri toiminnolta mutta säilyttää näkyvän reunuksen. */
button.secondary {
  /* Tumma teksti pysyy luettavana valkoisella. */
  color: #172b3a;
  /* Valkoinen tausta erottaa toissijaisen toiminnon. */
  background: #ffffff;
}

/* Poistopainike erotetaan värin lisäksi aina myös Poista-tekstillä. */
button.danger {
  /* Tumma punainen antaa valkoiselle tekstille vahvan kontrastin. */
  background: #8f1d21;
  /* Reunus vastaa taustaa. */
  border-color: #8f1d21;
}

/* disabled tarkoittaa, ettei toiminto ole juuri nyt käytettävissä. */
button:disabled,
input:disabled {
  /* Harmaa pohja kertoo odottamisesta ilman voimakasta himmennystä. */
  background: #e0e7ed;
  /* Teksti säilyy tummana ja luettavana. */
  color: #334155;
  /* Reunus näkyy myös odotustilassa. */
  border-color: #64748b;
  /* Osoitin näyttää, ettei painaminen juuri nyt onnistu. */
  cursor: wait;
}

/* focus-visible näyttää selaimen tunnistaman näppäimistökohdistuksen kaikissa kohteissa. */
:focus-visible {
  /* Kolmen pikselin tumma sininen ääriviiva erottuu sivun taustasta. */
  outline: 3px solid #005fcc;
  /* Ääriviiva siirretään irti kohteen reunasta. */
  outline-offset: 3px;
}

/* Tila- ja virheviestit saavat yhteisen tilan ympärilleen. */
.message,
.error-message {
  /* Pysty- ja vaakasuuntainen täyte parantaa luettavuutta. */
  padding: 0.75rem 1rem;
  /* Näkyvä vasen reunus erottaa viestin sisällöstä. */
  border-left: 4px solid #174e5c;
  /* Viestin pohja on vaalea sininen. */
  background: #e5eff7;
}

/* Virheellä on myös oma tekstiväri; teksti kertoo aina virheen syyn. */
.error-message {
  /* Tumma punainen teksti sopii vaaleaan virhepohjaan. */
  color: #7e1720;
  /* Reunus käyttää tekstin sävyä. */
  border-color: #7e1720;
  /* Hyvin vaalea punainen erottaa viestityypin. */
  background: #fff2f3;
}

/* Tyhjä virhealue säilyy DOMissa mutta ei tarvitse näkyvää laatikkoa. */
.error-message:empty {
  /* Poistetaan tyhjän viestin marginaalit. */
  margin: 0;
  /* Poistetaan tyhjän viestin täytteet. */
  padding: 0;
  /* Poistetaan tyhjän viestin reunus. */
  border: 0;
}

/* Ohjeet ovat yhtä suuria kuin muu teksti, mutta väriltään hieman hillitympiä. */
.hint {
  /* Tämä tummanharmaa säilyttää hyvän kontrastin valkoiseen. */
  color: #425568;
}

/* Sovelluksen listat saavat korttimaisen ulkoasun. */
.project-list,
.task-list {
  /* Poistetaan vain visuaaliset luettelomerkit; HTML:n role="list" säilyttää listamerkityksen. */
  list-style: none;
  /* Listalla ei ole vasenta sisennystä. */
  padding: 0;
  /* Jätetään listan yläpuolelle tilaa. */
  margin-block: 1rem 0;
}

/* Projektipainike täyttää listarivinsä. */
.project-list button {
  /* Painike ulottuu listan leveydelle. */
  width: 100%;
  /* Nimi alkaa suomen lukusuunnan alusta. */
  text-align: start;
  /* Projektien väliin jää pieni rako. */
  margin-bottom: 0.5rem;
}

/* aria-current kertoo myös avustavalle teknologialle valitun projektin. */
.project-list button[aria-current="true"] {
  /* Valitun projektin nimen alleviivaus on värin lisäksi näkyvä merkki. */
  text-decoration: underline;
  /* Paksumpi teksti korostaa valintaa. */
  font-weight: 750;
}

/* Jokainen tehtävä on listan li-elementti. */
.task-item {
  /* Yläreuna erottaa tehtävät toisistaan. */
  border-top: 1px solid #718096;
  /* Pystysuuntainen täyte tekee tehtävistä erillisiä alueita. */
  padding-block: 1rem;
}

/* Tehtävän valintaruutu ja sen nimi pysyvät samassa joustavassa ryhmässä. */
.task-toggle {
  /* flex asettaa valintaruudun nimen viereen. */
  display: flex;
  /* Kohdistetaan valintaruutu tekstin ensimmäiselle alueelle. */
  align-items: start;
  /* Ruudun ja nimen väliin jätetään tilaa. */
  gap: 0.75rem;
}

/* Vain checkbox-tyyppiset syötteet saavat tämän koon. */
input[type="checkbox"] {
  /* Valintaruutu ei täytä koko rivin leveyttä. */
  width: 1.5rem;
  /* Ruudun korkeus vastaa sen leveyttä. */
  height: 1.5rem;
  /* Ohitetaan muiden syötteiden 44 pikselin vähimmäiskorkeus; suuri label laajentaa painettavaa aluetta. */
  min-height: 1.5rem;
  /* Ruutu ei kutistu pitkän tekstin vieressä. */
  flex-shrink: 0;
  /* Valitun ruudun väri sopii painikkeisiin. */
  accent-color: #174e5c;
}

/* Valintaruudun näkyvä label tarjoaa koko nimialueen painettavaksi. */
.task-toggle label {
  /* Label ottaa riviltä jäljelle jäävän tilan. */
  flex: 1;
  /* Vähimmäiskorkeus pitää painettavan alueen suurena. */
  min-height: 44px;
  /* Poistetaan tekstikenttälabelien marginaali. */
  margin: 0;
}

/* detailsin yhteenveto on selaimen oma avattava painike. */
summary {
  /* Osoitin kertoo lisäosan olevan avattava. */
  cursor: pointer;
  /* Riittävä korkeus helpottaa valintaa. */
  min-height: 44px;
  /* Täyte erottaa tekstin ympäröivästä sisällöstä. */
  padding-block: 0.6rem;
  /* Alleviivaus auttaa tunnistamaan toiminnon. */
  text-decoration: underline;
}

/* Ohituslinkki odottaa sivun alussa näkymän ulkopuolella. */
.skip-link {
  /* Absoluuttinen sijoitus estää piilotettua linkkiä varaamasta tilaa. */
  position: absolute;
  /* Linkki jää vasemman reunan ulkopuolelle, kunnes se saa kohdistuksen. */
  left: -10000px;
  /* Yläreunassa on pieni turvaväli näkyvää tilaa varten. */
  top: 0.5rem;
  /* Vaalea tausta erottaa näkyviin tulevan linkin. */
  background: #ffffff;
  /* Tumma linkkiväri erottuu valkoisesta. */
  color: #174e5c;
  /* Näkyvä linkki saa painettavaa aluetta. */
  padding: 0.75rem;
  /* Linkki näkyy muiden elementtien päällä kohdistettaessa. */
  z-index: 10;
}

/* Myös ohjelmallinen focus tuo ohituslinkin näkyviin. */
.skip-link:focus {
  /* Linkki siirtyy vasempaan reunaan näkyviin. */
  left: 1rem;
}

/* hidden-attribuutti piilottaa sisällön riippumatta muista asettelusäännöistä. */
[hidden] {
  /* important varmistaa, ettei myöhempi display-sääntö vahingossa näytä piilotettua aluetta. */
  display: none !important;
}

/* Sivun loppuun jätetään tilaa myös pienellä näytöllä. */
.page-footer {
  /* Pystysuuntainen täyte erottaa lopputekstin pääsisällöstä. */
  padding-block: 2rem;
}
````
