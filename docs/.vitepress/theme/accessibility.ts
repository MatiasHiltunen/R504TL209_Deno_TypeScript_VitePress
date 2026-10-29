// Tämä lisäys täydentää VitePress 1.6.4:n valikkonimiä ja haun kohdistuksen palautusta.
// Se toimii materiaalin käyttöliittymässä; harjoitussovellusten koodia se ei muuta.
export function installAccessibility() {
  // Muista elementti, josta käyttäjä avasi haun, ja avaushetken osoite.
  let opener: HTMLElement | null = null;
  let openingUrl = '';
  // Näillä arvoilla havaitaan hakunäkymän sulkeutuminen ja voidaan perua keskeneräinen kohdistus.
  let searchWasOpen = false;
  let focusFrame = 0;

  // Vakiopaikka kohdistukselle on näkyvä Hae-painike.
  const searchButton = () => document.querySelector<HTMLElement>('.VPNavBarSearch .DocSearch-Button');
  // Oletusteema lisää hakudialogin tähän elementtiin vain sen ollessa auki.
  const searchDialog = () => document.querySelector('.VPLocalSearchBox');

  // Avauspiste tallennetaan ennen kuin VitePress siirtää kohdistuksen hakukenttään.
  function rememberOpener(target: HTMLElement | null) {
    // body ei ole varsinainen käyttöliittymän ohjain, joten sen tilalla käytetään hakupainiketta.
    opener = target && target !== document.body ? target : searchButton();
    // Jos käyttäjä valitsee tuloksen ja siirtyy toiselle sivulle, tätä paikkaa ei palauteta.
    openingUrl = window.location.href;
  }

  // Hiirellä ja kosketuksella avattu haku palaa omaan avauspainikkeeseensa.
  function onClick(event: MouseEvent) {
    // closest löytää painikkeen myös, kun käyttäjä osuu sen sisällä olevaan kuvakkeeseen.
    const target = event.target instanceof Element ? event.target.closest<HTMLElement>('.DocSearch-Button') : null;
    // Jo avoimen hakunäkymän sisäisiä napsautuksia ei käsitellä uutena avauksena.
    if (target && !searchDialog()) rememberOpener(target);
  }

  // Kuuntele näppäimistön avauskomentoja muuttamatta VitePressin omaa hakutoimintoa.
  function onKeydown(event: KeyboardEvent) {
    // Tekstikentän vinoviiva kuuluu sen tekstiin, joten se ei ole tässä haun avauskomento.
    const target = event.target instanceof HTMLElement ? event.target : null;
    const isEditing = target?.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target?.tagName || '');
    // Haku avautuu Ctrl/Cmd+K:lla tai vinoviivalla tekstikenttien ulkopuolella.
    const opensSearch = (event.key.toLowerCase() === 'k' && (event.ctrlKey || event.metaKey)) || (event.key === '/' && !isEditing);
    // Tallenna kohdistus ennen oletusteeman samalle tapahtumalle tekemää käsittelyä.
    if (!searchDialog() && opensSearch) rememberOpener(document.activeElement as HTMLElement | null);
    // Sivupalkin painikeroolilla oleva ryhmä toimii Enterin lisäksi myös välilyönnillä.
    const group = target?.closest<HTMLElement>('.VPSidebarItem > .item[role="button"]');
    if (event.key === ' ' && group) {
      // Estä tässä näppäimessä sivun vieritys ja käytä samaa toimintoa kuin napsautuksessa.
      event.preventDefault();
      group.click();
    }
  }

  // Päivitä ne oletusteeman nimet, joille versiossa 1.6.4 ei ole asetuskenttää.
  function updateUi() {
    // Mobiilin päävalikon nimi kertoo toiminnon suomeksi myös ruudunlukijalle.
    document.querySelector('.VPNavBarHamburger')?.setAttribute('aria-label', 'Avaa tai sulje päävalikko');
    // Sivupalkin ryhmien nuolipainikkeet saavat nimen sekä ryhmän nykyisen aukiolotilan.
    document.querySelectorAll<HTMLElement>('.VPSidebarItem .caret[role="button"]').forEach(control => {
      // Lähin ryhmä ja sen otsikko erottavat tämän ohjaimen muista samanlaisista nuolista.
      const group = control.closest('.VPSidebarItem');
      const heading = group?.querySelector(':scope > .item .text')?.textContent?.trim() || 'sisällysluettelo';
      const expanded = String(!group?.classList.contains('collapsed'));
      // Nimeä nuoli; aria-expanded kertoo avustavalle teknologialle ryhmän tilan.
      control.setAttribute('aria-label', `Avaa tai sulje osio: ${heading}`);
      control.setAttribute('aria-expanded', expanded);
      // Myös otsikkorivin koko painike ilmoittaa saman tilan.
      group?.querySelector(':scope > .item[role="button"]')?.setAttribute('aria-expanded', expanded);
    });
    // Näkymän poistuminen DOMista kertoo, että haku on suljettu.
    const searchIsOpen = Boolean(searchDialog());
    if (searchWasOpen && !searchIsOpen && window.location.href === openingUrl) {
      // Odota seuraavaa piirtokierrosta, jotta hakudialogin omat lopetustoimet ovat valmiit.
      focusFrame = window.requestAnimationFrame(() => {
        // Älä siirrä käyttäjän kohdistusta, jos hän ehti jo valita toisen ohjaimen.
        if (!searchDialog() && window.location.href === openingUrl && document.activeElement === document.body) {
          // Sivulle jäänyt näkyvä avaaja on ensisijainen; muutoin palataan Hae-painikkeeseen.
          const target = opener?.isConnected && opener.getClientRects().length ? opener : searchButton();
          target?.focus({ preventScroll: true });
        }
      });
    }
    // Seuraava päivitys vertaa uutta tilannetta tähän havaintoon.
    searchWasOpen = searchIsOpen;
  }

  // Capture-vaiheessa avauspaikka ehditään muistaa ennen hakukentän kohdistumista.
  document.addEventListener('click', onClick, true);
  document.addEventListener('keydown', onKeydown, true);
  // Reittimuutokset, avattavat ryhmät ja hakunäkymä muuttavat sivun rakennetta tai luokkia.
  const observer = new MutationObserver(updateUi);
  observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
  // Nimeä myös ensimmäisen sivun valmiit ohjaimet.
  updateUi();

  // Teema kutsuu siivouksen poistuessaan, jotta kuuntelijat eivät kerry uudelleenlatauksessa.
  return () => {
    document.removeEventListener('click', onClick, true);
    document.removeEventListener('keydown', onKeydown, true);
    observer.disconnect();
    window.cancelAnimationFrame(focusFrame);
  };
}
