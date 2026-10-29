---
outline: false
---

# esimerkit/04-valmis/Dockerfile

**Ryhmä:** L2-lähtöpohja: koko SQLite-sovellus konttiin.

Tiedoston sijainti puretussa projektissa on `esimerkit/04-valmis/Dockerfile`. Kopioi koko sisältö kommentteineen tähän tiedostoon. Suorituskomennot ja odotettu tulos ovat asianomaisessa tutoriaaliluvussa.

[Lataa lähdekoodi tekstinä](/koodit/esimerkit/04-valmis/Dockerfile.txt) · [Palaa koodipankkiin](/koodipankki/)

````dockerfile
# Image on valmis pohja, jossa tämän materiaalin testattu Deno-versio on asennettuna.
FROM denoland/deno:2.9.7

# Rakennusvaiheessa valmistellaan kirjoitettava datakansio ylläpitäjän oikeuksin.
USER root

# WORKDIR valitsee kontin sisäisen hakemiston seuraaville komennoille.
WORKDIR /app

# Kopioi lähdekoodi konttiin deno-käyttäjän omistukseen; .dockerignore rajaa datan ja salaisuudet pois.
COPY --chown=deno:deno . .

# Luo tyhjä datakansio ja anna tavalliselle deno-käyttäjälle siihen kirjoitusoikeus.
RUN mkdir -p /app/data && chown deno:deno /app/data

# Välimuisti on väliaikainen; varsinainen SQLite-data tulee eri kansioon pysyvään volumeen.
ENV DENO_DIR=/tmp/deno-cache

# 0.0.0.0 saa ohjelman kuuntelemaan kontin verkkoliitäntöjä; Compose rajaa isännän julkaisun.
ENV APP_HOST=0.0.0.0

# Sovellus ja Compose käyttävät samaa kontin sisäistä porttia.
ENV APP_PORT=8000

# Selain avaa tämän alkuperän isäntäkoneella; tämä ei ole toisen kontin yhteysosoite.
ENV APP_ORIGIN=http://localhost:8000

# Varsinainen palvelin toimii tavallisena käyttäjänä, ei root-käyttäjänä.
USER deno

# EXPOSE kertoo kuunteluportin dokumentointia varten; se ei yksin julkaise porttia isännälle.
EXPOSE 8000

# Käynnistä selitetty start-task; sen Deno-oikeudet on rajattu deno.jsonc-tiedostossa.
CMD ["deno", "task", "start"]
````
