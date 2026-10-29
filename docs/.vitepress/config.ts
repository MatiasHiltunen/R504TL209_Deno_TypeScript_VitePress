// defineConfig tarkistaa VitePress-asetusten rakennetta ja auttaa editorin täydennyksissä.
import { defineConfig } from 'vitepress';
// Koodisivujen valikko tuotetaan lähdetiedostoluettelosta komennolla npm run content:sync.
import { koodivalikko } from './koodivalikko';

// export default antaa tämän tiedoston asetukset VitePressin käyttöön.
export default defineConfig({
  // Kieli auttaa selainta ja ruudunlukijaa käsittelemään suomenkielistä tekstiä.
  lang: 'fi-FI',
  // Nimi näkyy selaimen välilehdessä varsinaisen sivuotsikon yhteydessä.
  title: 'R504TL209 · Backend ja frontend',
  // Kuvaus kertoo sivuston sisällön myös sivun metatiedoissa.
  description: 'Full Stack -sovelluskehitys: Backend. Deno, TypeScript, frontend, tietokannat, Docker ja turvallinen verkkosovellus aloittelijalle.',
  // Paikallisen sivuston juuri on /. Jos julkaiset alihakemistoon, vaihda esimerkiksi /kurssi/.
  base: '/',
  // .html-osoitteet toimivat tavallisessa staattisessa tiedostopalvelussa.
  cleanUrls: false,
  // public on latauksia varten: sen Markdown-koostetta ei rakenneta toiseksi kurssisivuksi.
  srcExclude: ['public/**'],
  // Sisäiset sivulinkit tarkistetaan; tämä yksi osoite kuuluu erikseen käynnistettävään Deno-harjoitukseen.
  ignoreDeadLinks: ['http://localhost:8000'],
  // Päiväys kerrotaan materiaalissa; se ei riipu tämän paketin Git-historiasta.
  lastUpdated: false,
  // Pieni paikallinen välilehtikuvake on mukana datana eikä tarvitse erillistä verkkopyyntöä.
  head: [['link', {
    rel: 'icon',
    type: 'image/svg+xml',
    // encodeURIComponent muuttaa SVG-tekstin data-osoitteeseen sopivaksi merkkijonoksi.
    href: 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="6" fill="#174a80"/><path d="M9 24V8h7a5 5 0 0 1 0 10h-3v6zm4-10h3a1 1 0 0 0 0-2h-3zm3 3 8 7h-6l-5-7z" fill="white"/></svg>'),
  }]],

  // Markdownin esittämiseen liittyvät asetukset koskevat kaikkia lukuja.
  markdown: {
    // Painikkeen suomenkielinen nimi kertoo sen toiminnon myös apuvälineille.
    codeCopyButtonTitle: 'Kopioi koodi',
    // Sama koodi saa vaaleaan ja tummaan ulkoasuun sopivan syntaksivärityksen.
    theme: { light: 'github-light', dark: 'github-dark' },
    // Tällä lisäyksellä annamme taulukoille nimettyjä, näppäimistöllä vieritettäviä alueita.
    config(md) {
      // Taulukon aloitus saa ympärilleen vieritysalueen; itse taulukko säilyttää rakenteensa.
      md.renderer.rules.table_open = (tokens, index, options, env, renderer) => {
        // Jos taulukkoa ennen ei ole otsikkoa, käytetään yleistä nimeä.
        let heading = 'Kurssimateriaalin taulukko';
        // Etsi taulukkoa lähin edeltävä otsikko sen alueen ymmärrettäväksi nimeksi.
        for (let cursor = index - 1; cursor >= 0; cursor -= 1) {
          // Otsikon teksti on otsikon avaavan merkin seuraavassa tokenissa.
          if (tokens[cursor].type === 'heading_open') {
            heading = tokens[cursor + 1]?.content || heading;
            break;
          }
        }
        // Escaping estää otsikon lainausmerkkejä muuttamasta HTML-attribuuttia.
        const label = md.utils.escapeHtml(`Taulukko: ${heading}. Vieritä tarvittaessa nuolinäppäimillä.`);
        // Vain ympäröivä alue on sarkaimella kohdistettava; vältetään kaksi peräkkäistä pysähdystä.
        return `<div class="course-table-region" role="region" aria-label="${label}" tabindex="0">\n` + renderer.renderToken(tokens, index, options);
      };
      // Taulukon päätyttyä suljetaan myös sen vieritysalue.
      md.renderer.rules.table_close = (tokens, index, options, env, renderer) => renderer.renderToken(tokens, index, options) + '</div>\n';
      // Markdown-taulukon ensimmäinen rivi toimii sarakeotsikkoina.
      md.renderer.rules.th_open = (tokens, index, options, env, renderer) => {
        // scope yhdistää kunkin otsikon sen alla oleviin tietosoluihin.
        tokens[index].attrSet('scope', 'col');
        // Muut mahdolliset soluasetukset säilyvät tavallisen renderöinnin mukana.
        return renderer.renderToken(tokens, index, options);
      };
      // Säilytä VitePressin linkkien käsittely, mukaan lukien base-polun lisääminen.
      const originalLink = md.renderer.rules.link_open;
      // Otsikoiden pysyvien linkkien apuvälinenimi vaihdetaan suomeksi.
      md.renderer.rules.link_open = (tokens, index, options, env, renderer) => {
        // Tarkistus koskee vain VitePressin lisäämiä otsikkolinkkejä.
        if (tokens[index].attrGet('class')?.split(' ').includes('header-anchor')) {
          // Valmis englanninkielinen nimi sisältää otsikon lainausmerkkien välissä.
          const label = tokens[index].attrGet('aria-label') || '';
          // Korvaa ainoastaan vakiomuotoinen aloitus ja säilytä otsikon oma teksti.
          tokens[index].attrSet('aria-label', label.replace(/^Permalink to /, 'Pysyvä linkki otsikkoon '));
        }
        // Alkuperäinen käsittelijä huolehtii edelleen sisäisistä ja ulkoisista osoitteista.
        return originalLink ? originalLink(tokens, index, options, env, renderer) : renderer.renderToken(tokens, index, options);
      };
    },
  },

  // Oletusteema tarjoaa valikot, lukukohtaisen sisällysluettelon ja hakunäkymän.
  themeConfig: {
    // Yläpalkin lyhyt nimi jättää tilaa haulle ja valikolle.
    siteTitle: 'R504TL209',
    // Yläpalkin linkit vievät yleisimmin tarvittaviin osiin.
    nav: [
      { text: 'Aloita', link: '/luvut/00-aloita' },
      { text: 'Harjoitukset', link: '/luvut/10-harjoitukset' },
      { text: 'Koodipankki', link: '/koodipankki/' },
      { text: 'Käyttöohje', link: '/vitepress-kaytto' },
    ],
    // Sivupalkin järjestys seuraa kurssin etenemistä perusteista soveltamiseen.
    sidebar: [
      {
        text: 'Aloita perusteista',
        items: [
          { text: '00 Aloita tästä', link: '/luvut/00-aloita' },
          { text: '01 Käsitteet rautalangasta', link: '/luvut/01-kasitteet' },
          { text: '02 Deno ja TypeScript', link: '/luvut/02-deno-typescript' },
          { text: '03 Frontendin perusteet', link: '/luvut/03-frontend' },
        ],
      },
      {
        text: 'Rakenna verkkosovellus',
        items: [
          { text: '04 HTTP ja ensimmäinen palvelin', link: '/luvut/04-http' },
          { text: '05 Designistä tietomalliksi', link: '/luvut/05-tietomalli' },
          { text: '06 SQLite ja pysyvä tieto', link: '/luvut/06-sqlite' },
          { text: '07 Turvallinen sovellus', link: '/luvut/07-turvallinen-sovellus' },
          { text: '08 Dockerin perusteet', link: '/luvut/08-docker' },
          { text: '09 Testit ja työskentely', link: '/luvut/09-testit-ja-tyoskentely' },
        ],
      },
      {
        text: 'Sovella ja osoita osaaminen',
        items: [
          { text: '10 Harjoitukset ja arviointi', link: '/luvut/10-harjoitukset' },
/*           { text: '11 Opettajalle', link: '/luvut/11-opettajalle' }, */
          { text: '11 Koodipankin hakemisto', link: '/koodipankki/' },
        ],
      },
      {
        text: 'Koodit tiedostoittain',
        collapsed: true,
        // Samasta lähdeluettelosta syntyvät sekä nämä linkit että niiden kohdesivut.
        items: koodivalikko,
      },
      {
        text: 'Materiaalin käyttö ja tarkistukset',
        collapsed: true,
        items: [
          { text: 'VitePress-käyttöohje', link: '/vitepress-kaytto' },
          { text: 'VitePress-version tarkistukset', link: '/vitepress-tarkistus' },
          { text: 'Alkuperäisen paketin tarkistukset', link: '/tarkistus-2026-10-19' },
        ],
      },
    ],
    // Näytä sivun toinen ja kolmas otsikkotaso omassa sisällysluettelossaan.
    outline: { level: [2, 3], label: 'Tällä sivulla' },
    // Sivun lopun siirtymät seuraavat edellä määriteltyä opetusjärjestystä.
    docFooter: { prev: 'Edellinen', next: 'Seuraava' },
    // Mobiilivalikon ja näppäimistöohituksen nimet esitetään suomeksi.
    sidebarMenuLabel: 'Sisällysluettelo',
    returnToTopLabel: 'Palaa alkuun',
    skipToContentLabel: 'Siirry sisältöön',
    // Ulkoasun vaihtajalla on suomenkielinen nimi ja selite molemmissa tiloissa.
    darkModeSwitchLabel: 'Ulkoasu',
    lightModeSwitchTitle: 'Vaihda vaaleaan teemaan',
    darkModeSwitchTitle: 'Vaihda tummaan teemaan',
    // Puuttuva sivu tarjoaa ymmärrettävän paluun etusivulle.
    notFound: {
      title: 'Sivua ei löytynyt',
      quote: 'Valitse luku sisällysluettelosta tai palaa etusivulle.',
      linkLabel: 'Palaa kurssimateriaalin etusivulle',
      linkText: 'Kurssimateriaalin etusivulle',
    },
    // Haku käyttää sivuston omaa indeksiä selaimessa eikä edellytä hakupalvelun tiliä.
    search: {
      provider: 'local',
      options: {
        // root tarkoittaa tämän yksikielisen sivuston oletuskieltä.
        locales: {
          root: {
            translations: {
              button: { buttonText: 'Hae', buttonAriaLabel: 'Hae kurssimateriaalista' },
              modal: {
                displayDetails: 'Näytä hakutulosten lisätiedot',
                resetButtonTitle: 'Tyhjennä haku',
                backButtonTitle: 'Sulje haku',
                noResultsText: 'Ei hakutuloksia hakusanalla',
                footer: {
                  selectText: 'valitse',
                  selectKeyAriaLabel: 'Enter',
                  navigateText: 'siirry',
                  navigateUpKeyAriaLabel: 'Nuoli ylös',
                  navigateDownKeyAriaLabel: 'Nuoli alas',
                  closeText: 'sulje',
                  closeKeyAriaLabel: 'Escape',
                },
              },
            },
          },
        },
      },
    },
  },
});
