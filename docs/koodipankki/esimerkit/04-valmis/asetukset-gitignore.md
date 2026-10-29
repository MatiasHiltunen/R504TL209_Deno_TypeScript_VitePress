---
outline: false
---

# esimerkit/04-valmis/.gitignore

**Ryhmä:** Valmiin sovelluksen backend.

Tiedoston sijainti puretussa projektissa on `esimerkit/04-valmis/.gitignore`. Kopioi koko sisältö kommentteineen tähän tiedostoon. Suorituskomennot ja odotettu tulos ovat asianomaisessa tutoriaaliluvussa.

[Lataa lähdekoodi tekstinä](/koodit/esimerkit/04-valmis/.gitignore.txt) · [Palaa koodipankkiin](/koodipankki/)

````text
# data sisältää paikalliset käyttäjät ja istunnot, joten sitä ei tallenneta Gitiin.
data/
# Älä lisää oikeita asetussalaisuuksia; .env.example on vain julkinen mallipohja.
.env
.env.*
!.env.example
# Myös muualle vahingossa luotu tietokanta ja sen apuosat jätetään pois.
*.sqlite
*.sqlite-*
*.db
*.db-*
````
