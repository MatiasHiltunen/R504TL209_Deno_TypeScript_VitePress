---
outline: false
---

# esimerkit/04-valmis/compose.sqlite.yaml

**Ryhmä:** L2-lähtöpohja: koko SQLite-sovellus konttiin.

Tiedoston sijainti puretussa projektissa on `esimerkit/04-valmis/compose.sqlite.yaml`. Kopioi koko sisältö kommentteineen tähän tiedostoon. Suorituskomennot ja odotettu tulos ovat asianomaisessa tutoriaaliluvussa.

[Lataa lähdekoodi tekstinä](/koodit/esimerkit/04-valmis/compose.sqlite.yaml.txt) · [Palaa koodipankkiin](/koodipankki/)

````yaml
# Nimi erottaa tämän SQLite-sovelluksen erillisestä PostgreSQL-peruslabrasta.
name: tehtavataulu-sqlite

# Services sisältää käynnistettävät palvelut; tässä riittää yksi backend-kontti.
services:
  # web on tämän sovelluspalvelun nimi Compose-verkossa.
  web:
    # Rakenna image tämän hakemiston Dockerfilestä ja lähdekoodista.
    build: .
    # Environment välittää nimetyt asetukset kontin Deno-prosessille.
    environment:
      # Kuuntele kontin liitäntöjä, jotta Composen porttiohjaus pääsee ohjelmaan.
      APP_HOST: 0.0.0.0
      # Sama portti on sallittu deno.jsonc-tiedoston verkkoluvassa.
      APP_PORT: "8000"
      # Selaimen tarkka alkuperä säilyy samana kuin paikallisessa Deno-ajossa.
      APP_ORIGIN: http://localhost:8000
    # Ports julkaisee yhden kontin portin vain omalle koneelle.
    ports:
      # Vasemmalla on isännän osoite ja portti, oikealla kontin sisäinen portti.
      - "127.0.0.1:8000:8000"
    # Volumes säilyttää tietokannan myös kontin poistamisen jälkeen.
    volumes:
      # Liitä nimetty taltio siihen hakemistoon, jota main.ts käyttää tietokannalle.
      - sqlite-data:/app/data
    # Palvelimen lähdekoodit ovat ajossa vain luettavia; data-volume on silti kirjoitettava.
    read_only: true
    # Deno tarvitsee välimuistille väliaikaisen kirjoituspaikan; /tmp ei ole pysyvä tietokanta.
    tmpfs:
      # Varaa korkeintaan 64 mebitavua väliaikaisille tiedoille.
      - /tmp:size=64m
    # Pudota ylimääräiset Linuxin erityisoikeudet; tavallinen HTTP-palvelin ei tarvitse niitä.
    cap_drop:
      # ALL tarkoittaa kaikkien pudotettavissa olevien lisäoikeuksien poistamista.
      - ALL
    # Estä prosessia hankkimasta uusia korkeampia käyttöoikeuksia ajon aikana.
    security_opt:
      # Tämä asetus täydentää Dockerfilen tavallista deno-käyttäjää.
      - no-new-privileges:true

# Määrittele Compose-projektin hallinnoima pysyvä taltio.
volumes:
  # Taltio syntyy ensimmäisessä käynnistyksessä; tavallinen down ei poista sitä.
  sqlite-data:
````
