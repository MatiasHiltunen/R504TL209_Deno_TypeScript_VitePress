// Tuomme vain omat nimetyt turvatoimintomme; import ei käynnistä HTTP-palvelinta.
import { hashPassword, hashSessionToken, newSessionToken, verifyPassword } from "./security.ts";

// Tämä on julkinen kokeiluteksti, ei oikean tilin salasana. Älä käytä sitä oikeassa palvelussa.
const kokeilusana = "Harjoitellaan vain omalla koneella!";
// Ensimmäinen laskenta tuottaa satunnaisen suolan ja hitaan PBKDF2-tiivisteen.
const ensimmainen = await hashPassword(kokeilusana);
// Toinen laskenta saa saman salasanan mutta arpoo uuden suolan.
const toinen = await hashPassword(kokeilusana);
// !== tarkoittaa erisuuruusvertailua. Tulostamme vain kokeen tuloksen, emme salasanaa.
console.log("Sama salasana, eri suola:", ensimmainen.salt !== toinen.salt);
// Eri suola muuttaa myös tallennettavan tiivisteen, vaikka salasana on sama.
console.log("Sama salasana, eri tiiviste:", ensimmainen.hash !== toinen.hash);
// Tarkistus käyttää ensimmäisen tuloksen suolaa ja kierrosmäärää.
console.log("Oikea salasana hyväksytään:", await verifyPassword(kokeilusana, ensimmainen));
// Väärällä salasanalla vertailu palauttaa false-arvon.
console.log(
  "Väärä salasana hyväksytään:",
  await verifyPassword("Tämä on eri pitkä kokeilusana!", ensimmainen),
);
// Istuntotunniste arvotaan eri menetelmällä kuin ihmisen valitsema salasana.
const tunniste = newSessionToken();
// Tietokantaan tallennettava istuntotiiviste lasketaan tunnisteesta.
const tiiviste = await hashSessionToken(tunniste);
// Näytämme vain vertailun. Itse istuntotunniste on salaisuus, jota ei tarvita lokiin.
console.log("Istunnon tallenne eroaa raakatunnisteesta:", tiiviste !== tunniste);
