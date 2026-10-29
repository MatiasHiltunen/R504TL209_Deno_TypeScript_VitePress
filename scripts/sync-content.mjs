// Tämä ylläpitoskripti suoritetaan Nodella ennen materiaalin käynnistystä ja rakentamista.
// Se kopioi lähdekoodin tekstinä sivuille; se ei käynnistä tai suorita harjoitussovellusta.
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
// path ratkaisee tiedostojen polut myös Windowsissa ilman käsin lisättyjä kauttaviivoja.
import path from 'node:path';
// fileURLToPath muuttaa tämän moduulin file-osoitteen käyttöjärjestelmän tiedostopoluksi.
import { fileURLToPath } from 'node:url';

// Projektin juuri on tämän scripts-hakemiston yläpuolella.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
// docs sisältää VitePressin sivut ja public sellaisenaan jaettavat tiedostot.
const docs = path.join(root, 'docs');
// Kooditiedostojen järjestys ja ryhmät on lueteltu erillisessä JSON-asetuksessa.
const groups = JSON.parse(await readFile(path.join(root, 'scripts/koodit.json'), 'utf8'));

// Kirjoittaminen luo tarvittavat alihakemistot ja tallentaa aina UTF-8-tekstiä.
async function save(relativePath, text) {
  // resolve muodostaa projektin juureen nähden täydellisen tiedostopolun.
  const target = path.resolve(root, relativePath);
  // recursive sallii myös usean vielä puuttuvan alihakemiston luomisen.
  await mkdir(path.dirname(target), { recursive: true });
  // Uudelleenajo päivittää saman johdetun tiedoston.
  await writeFile(target, text, 'utf8');
}

// Yksinkertainen nimi toimii sivun URLissa myös pisteellä alkaville asetustiedostoille.
function pageName(file) {
  // Polun jokaisen osan pisteet vaihdetaan viivoiksi; lähdetiedoston nimi ei muutu.
  return file.split('/').map(part => part.replace(/^\./, 'asetukset-').replaceAll('.', '-')).join('/');
}

// Koodiaidan kieli valitaan tiedoston perusteella syntaksin väritystä varten.
function language(file) {
  // Dockerfilellä ei ole päätettä, joten se käsitellään ensin.
  if (path.basename(file) === 'Dockerfile') return 'dockerfile';
  // Pisteellä alkava asetus näytetään tavallisena tekstinä.
  if (path.basename(file).startsWith('.')) return 'text';
  // Tuntematon tiedostopääte saa turvallisen text-oletusarvon.
  return { '.ts': 'ts', '.js': 'js', '.html': 'html', '.css': 'css', '.sql': 'sql', '.yaml': 'yaml', '.jsonc': 'jsonc' }[path.extname(file)] ?? 'text';
}

// Riittävän pitkä koodiaita estää lähdekoodin omia takamerkkejä päättämästä lohkoa.
function fenceFor(text) {
  // Etsi peräkkäisten takamerkkien pisin jakso, tai käytä arvoa nolla.
  const longest = Math.max(0, ...Array.from(text.matchAll(/`+/g), match => match[0].length));
  // Käytämme vähintään neljää takamerkkiä ja aina yhtä enemmän kuin lähdekoodissa.
  return '`'.repeat(Math.max(4, longest + 1));
}

// Johdanto on erillinen Markdown-lähde, jota opettaja voi muokata.
const intro = await readFile(path.join(root, 'scripts/koodipankin-johdanto.md'), 'utf8');
// indexParts muodostaa koodipankin yleissivun; completeParts myös täydellisen Markdown-koosteen.
const indexParts = [intro, '\nJokaisella tiedostolla on oma sivu. Koodi näkyy kokonaisena ja sen voi kopioida tai ladata tekstinä.\n'];
const completeParts = [intro];
// Sivupalkin koodiryhmät muodostetaan samasta luettelosta kuin sivut.
const codeSidebar = [];
// Tämä laskuri näkyy lopun tulosteessa, jotta puuttuva tiedosto huomataan.
let count = 0;

// Käy opetuksen mukaisessa järjestyksessä jokainen koodiryhmä läpi.
for (const group of groups) {
  // Ryhmän otsikko tulee sekä hakemistoon että täydelliseen koosteeseen.
  const heading = `## 12.${group.number} ${group.title}\n`;
  indexParts.push(heading);
  completeParts.push(heading);
  // Kukin sivupalkin ryhmä on avattava kokonaisuus, jonka lähtötila on suljettu.
  const sidebarGroup = { text: group.title, collapsed: true, items: [] };
  // Tiedostot säilyttävät luettelossa annetun opetuksellisen järjestyksen.
  for (const file of group.files) {
    // Tiedoston puuttuminen keskeyttää rakennuksen; sisältöä ei korvata tyhjällä mallilla.
    const source = await readFile(path.join(root, file), 'utf8');
    // Lähdetiedosto säilyttää aidon nimensä, mutta dokumenttisivu saa siistin URLin.
    const route = pageName(file);
    // Lataa-kohteessa .txt varmistaa, että HTML-esimerkki näytetään lähdekoodina.
    const download = `/koodit/${file}.txt`;
    // Koodiaita suojaa myös HTML:n ja Vue-merkinnät suoritukselta dokumentissa.
    const fence = fenceFor(source);
    const block = `${fence}${language(file)}\n${source}${source.endsWith('\n') ? '' : '\n'}${fence}\n`;
    // Koodisivun kaikki ohjeet ja ohjelma ovat tavallista Markdownia.
    const page = `---\noutline: false\n---\n\n# ${file}\n\n**Ryhmä:** ${group.title}.\n\nTiedoston sijainti puretussa projektissa on \`${file}\`. Kopioi koko sisältö kommentteineen tähän tiedostoon. Suorituskomennot ja odotettu tulos ovat asianomaisessa tutoriaaliluvussa.\n\n[Lataa lähdekoodi tekstinä](${download}) · [Palaa koodipankkiin](/koodipankki/)\n\n${block}`;
    // Julkaisemme koodisivun ja erillisen tekstilatauksen samasta alkuperäisestä sisällöstä.
    await save(`docs/koodipankki/${route}.md`, page);
    await save(`docs/public/koodit/${file}.txt`, source);
    // Luettelon linkki ja sivupalkin linkki osoittavat juuri luotuun sivuun.
    indexParts.push(`- [\`${file}\`](./${route}.md)`);
    sidebarGroup.items.push({ text: file, link: `/koodipankki/${route}` });
    // Täydellinen Markdown-kooste saa lähdekoodin sisäänsä, ei pelkkää tiedostoviittausta.
    completeParts.push(`### \`${file}\`\n\n${block}`);
    count += 1;
  }
  // Tyhjä rivi erottaa ryhmät oikein Markdownissa.
  indexParts.push('');
  codeSidebar.push(sidebarGroup);
}

// Koodipankin etusivu kokoaa kaikki tiedostosivut.
await save('docs/koodipankki/index.md', indexParts.join('\n'));
// Luvun 12 vanha osoite säilyy navigointisivuna, jotta lukujen numerointi pysyy selvänä.
await save('docs/luvut/12-koodipankki.md', '# 12 Täydellinen kommentoitu koodipankki\n\n[Koodipankin hakemisto](../koodipankki/index.md) sisältää kaikki kokonaiset lähdetiedostot omilla sivuillaan.\n\nTiedostot löytyvät myös puretun projektin `esimerkit`- ja `docker-postgres`-hakemistoista.\n');
// Kommentoitu TypeScript-vienti voidaan tuoda suoraan VitePressin asetustiedostoon.
await save('docs/.vitepress/koodivalikko.ts', '// Tämä valikko syntyy komennolla npm run content:sync. Muokkaa scripts/koodit.json-luetteloa.\nexport const koodivalikko = ' + JSON.stringify(codeSidebar, null, 2) + ';\n');

// Otsikkotasojen muunnos jättää koodiaitojen sisällä olevat #-kommentit koskemattomiksi.
function shiftHeadings(markdown, portable = false) {
  // fence muistaa avoimen koodiaidan merkin ja pituuden, tai on null tekstissä.
  let fence = null;
  // Muunna vain tavalliset otsikkorivit yksi taso alemmas koosteen pääotsikon alle.
  return markdown.split('\n').map(line => {
    // Tarkista rivin alusta mahdollinen Markdownin koodiaita.
    const mark = line.match(/^\s{0,3}(`{3,}|~{3,})(.*)$/);
    if (mark) {
      // Ensimmäinen aita avaa koodin; samanmerkkinen riittävän pitkä tyhjä aita sulkee sen.
      if (!fence) fence = mark[1];
      else if (mark[1][0] === fence[0] && mark[1].length >= fence.length && !mark[2].trim()) fence = null;
      return line;
    }
    // Koodin sisäisiin riveihin ei tehdä otsikko- eikä linkkimuunnoksia.
    if (fence) return line;
    // Yhden tiedoston koosteessa VitePressin sisäiset erityislinkit selitetään tekstinä.
    const text = portable ? line.replace(/\[([^\]]+)\]\((?:\.\.\/|\/)(?!\/)[^)]+\)/g, '$1 (katso saman materiaalipaketin vastaava osa)') : line;
    // Tekstin otsikoihin lisätään yksi merkki koosteen pääotsikon alapuolelle.
    return text.replace(/^(#{1,5}) /, '#$1 ');
  }).join('\n');
}

// Kokonainen kooste on julkinen lataus; sitä ei lisätä erilliseksi hakutuloksia toistavaksi sivuksi.
const chapters = (await readdir(path.join(docs, 'luvut'))).filter(name => /^\d{2}-.*\.md$/.test(name) && !name.startsWith('12-')).sort();
// Koosteen pääotsikko ja versiotieto auttavat tunnistamaan tiedoston ilman sivustoa.
const combined = ['# R504TL209 – Backend ja frontend rautalangasta\n\n**Markdown- ja VitePress-versio 20.10.2026.** Täydellinen kurssimateriaali sisältää luvut 00–12 ja kaikki kommentoidut koodit.\n'];
// Lukuja kopioitaessa sivuston sisäiset erityislinkit muutetaan lukijan ymmärtämiksi viitteiksi.
for (const name of chapters) {
  const chapter = await readFile(path.join(docs, 'luvut', name), 'utf8');
  // Sivuston linkit säilyvät VitePress-versiossa; yhden tiedoston koosteessa tarvittava sisältö on jo mukana.
  combined.push(shiftHeadings(chapter, true));
}
// Viimeiseksi liitetään kokonainen koodipankki otsikkotasoja siirtäen.
combined.push(shiftHeadings(completeParts.join('\n')));
await save('docs/public/lataukset/R504TL209_Deno_TypeScript_oppimateriaali.md', combined.join('\n\n---\n\n') + '\n');
// Tuloste kertoo valmistuneiden koodisivujen määrän, muttei mitään salaisuuksia.
console.log(`Päivitetty ${count} kommentoitua koodisivua ja täydellinen Markdown-kooste.`);
