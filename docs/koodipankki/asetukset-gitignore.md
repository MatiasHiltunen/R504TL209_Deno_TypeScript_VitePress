---
outline: false
---

# .gitignore

**Ryhmä:** Koko materiaalipaketin versionhallinnan rajaus.

Tiedoston sijainti puretussa projektissa on `.gitignore`. Kopioi koko sisältö kommentteineen tähän tiedostoon. Suorituskomennot ja odotettu tulos ovat asianomaisessa tutoriaaliluvussa.

[Lataa lähdekoodi tekstinä](/koodit/.gitignore.txt) · [Palaa koodipankkiin](/koodipankki/)

````text
# npm asentaa riippuvuudet uudelleen package-lock.json-tiedoston perusteella.
node_modules/
# VitePressin välimuisti ja tuotantotiedostot syntyvät käynnistys- ja build-komennoilla.
docs/.vitepress/cache/
docs/.vitepress/dist/
# Paikallisia salaisuuksia ei versionhallita; julkinen mallipohja saa kuulua projektiin.
.env
.env.*
!.env.example
# Kurssin harjoitustietokannat ja niiden apuosat eivät ole oppimateriaalin lähdekoodia.
*.sqlite
*.sqlite-*
*.db
*.db-*
**/data/
# Käyttöjärjestelmän paikalliset näkymäasetukset jätetään pois.
.DS_Store
Thumbs.db
````
