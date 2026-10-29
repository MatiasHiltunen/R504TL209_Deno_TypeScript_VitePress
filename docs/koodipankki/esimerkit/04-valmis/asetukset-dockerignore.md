---
outline: false
---

# esimerkit/04-valmis/.dockerignore

**Ryhmä:** L2-lähtöpohja: koko SQLite-sovellus konttiin.

Tiedoston sijainti puretussa projektissa on `esimerkit/04-valmis/.dockerignore`. Kopioi koko sisältö kommentteineen tähän tiedostoon. Suorituskomennot ja odotettu tulos ovat asianomaisessa tutoriaaliluvussa.

[Lataa lähdekoodi tekstinä](/koodit/esimerkit/04-valmis/.dockerignore.txt) · [Palaa koodipankkiin](/koodipankki/)

````text
# Oikeaa sovellusdataa tai väliaikaisia testikopioita ei pakata imageen.
data
# Tietokantatiedostot jätetään pois myös silloin, jos ne on luotu vahingossa väärään kansioon.
*.sqlite*
# Paikallista asetus- ja salaisuustiedostoa ei saa kopioida imageen.
.env
# Versionhallinnan sisäistä historiaa ei tarvita ajettavaan konttiin.
.git
# Editorin paikalliset asetukset eivät kuulu ajettavaan sovellukseen.
.vscode
````
