// Deno.serve käynnistää HTTP-palvelimen. Deno on ajossa olevan ympäristön nimi.
// Ensimmäinen argumentti on asetusolio, toinen argumentti pyyntöä käsittelevä funktio.
Deno.serve(
  {
    // hostname rajaa kuuntelun oman tietokoneen IPv4-osoitteeseen.
    hostname: "127.0.0.1",
    // port kertoo palvelimen käyttämän oven eli portin numeron.
    port: 8000,
  },
  // request sisältää yhden HTTP-pyynnön; => aloittaa käsittelijäfunktion.
  (request: Request): Response => {
    // URL tulkitsee osoitetekstin olioksi, josta voidaan lukea esimerkiksi polku.
    const url = new URL(request.url);
    // Tässä ensimmäisessä harjoituksessa sallitaan vain lukemiseen tarkoitettu GET.
    if (request.method !== "GET") {
      // 405 kertoo, että osoitteessa ei hyväksytä pyydettyä toimintoa.
      return new Response("Tässä harjoituksessa sallitaan vain GET.", {
        // status asettaa HTTP-vastauksen numerokoodin.
        status: 405,
        // Allow kertoo asiakkaalle, mitä HTTP-metodia osoite tukee.
        headers: { "Allow": "GET", "Content-Type": "text/plain; charset=utf-8" },
      });
    }
    // pathname on osoitteen polku, esimerkiksi /api/health.
    if (url.pathname === "/api/health") {
      // Response.json muuttaa olion JSON-tekstiksi ja asettaa sen sisältötyypin.
      return Response.json({ status: "ok", viesti: "Backend vastasi." });
    }
    // / tarkoittaa sivuston juurta eli osoitetta ilman erillistä polkua.
    if (url.pathname === "/") {
      // new luo uuden Response-olion, josta Deno lähettää HTTP-vastauksen selaimelle.
      return new Response("Hei! Palvelin toimii. Avaa seuraavaksi /api/health.", {
        // UTF-8 varmistaa, että ääkköset tulkitaan oikeina kirjaimina.
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }
    // Jos mikään yllä oleva reitti ei täsmännyt, palautetaan selkeä 404-virhe.
    return Response.json({ error: "Osoitetta ei löydy." }, { status: 404 });
  }, // Pyyntöä käsittelevä funktio päättyy; Deno kutsuu sitä uudelleen seuraavalle pyynnölle.
); // Deno.serve-kutsu päättyy. Prosessi jää odottamaan pyyntöjä.
