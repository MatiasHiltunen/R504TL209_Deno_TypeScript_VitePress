---
outline: false
---

# esimerkit/02-frontend-kokeilut/02-tyylit/styles.css

**Ryhmä:** Frontendin pienet kokeilut.

Tiedoston sijainti puretussa projektissa on `esimerkit/02-frontend-kokeilut/02-tyylit/styles.css`. Kopioi koko sisältö kommentteineen tähän tiedostoon. Suorituskomennot ja odotettu tulos ovat asianomaisessa tutoriaaliluvussa.

[Lataa lähdekoodi tekstinä](/koodit/esimerkit/02-frontend-kokeilut/02-tyylit/styles.css.txt) · [Palaa koodipankkiin](/koodipankki/)

````css
/* body valitsee sivun näkyvän sisällön juurielementin. */
body {
  /* Käytetään laitteesta löytyvää selkeää kirjasinta. */
  font-family: system-ui, sans-serif;
  /* Riviväli on 1,6 kertaa kirjasimen koko. */
  line-height: 1.6;
  /* Tumma teksti erottuu vaaleasta taustasta. */
  color: #172b3a;
  /* Tausta on vaalea siniharmaa. */
  background: #f4f7fa;
  /* Sisältö saa yhden peruskirjasinkoon verran tilaa reunoille. */
  padding: 1rem;
}

/* main valitsee pääsisällön alueen. */
main {
  /* Rivistä ei tehdä hyvin pitkää edes suurella näytöllä. */
  max-width: 44rem;
  /* Automaattiset sivumarginaalit keskittävät alueen. */
  margin-inline: auto;
}

/* Piste valitsee kaikki elementit, joilla on class="kortti". */
.kortti {
  /* Kortin tausta on valkoinen. */
  background: #ffffff;
  /* Reuna on yhden pikselin yhtenäinen tumma viiva. */
  border: 1px solid #586577;
  /* Padding jättää tilaa sisällön ja reunuksen väliin. */
  padding: 1rem;
}
````
