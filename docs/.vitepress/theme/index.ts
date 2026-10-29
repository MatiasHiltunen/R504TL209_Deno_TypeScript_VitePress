// VitePressin oletusteema sisältää sivupalkin, mobiilinavigoinnin ja paikallisen haun käyttöliittymän.
import DefaultTheme from 'vitepress/theme';
// Vue käynnistää pienet käyttöliittymätäydennykset vasta, kun sivu on avattu selaimessa.
import { defineComponent, h, onMounted, onUnmounted } from 'vue';
// Suomenkieliset apuvälinenimet ja haun kohdistus täydentävät oletusteeman asetuksia.
import { installAccessibility } from './accessibility';
// Tämä pieni tyylilisäys parantaa pitkien koodien, tiedostopolkujen ja taulukoiden luettavuutta.
import './custom.css';
// Säilytä oletusteeman toiminnot ja lisää sen ympärille elinkaaren hallinta.
export default {
  ...DefaultTheme,
  // Tämä komponentti käyttää edelleen VitePressin valmista sivuasettelua.
  Layout: defineComponent({
    setup() {
      // Siivousfunktio asetetaan vasta selaimessa tapahtuvassa käynnistyksessä.
      let cleanup: (() => void) | undefined;
      onMounted(() => { cleanup = installAccessibility(); });
      // Poista lisäyksen kuuntelijat, jos asettelu puretaan.
      onUnmounted(() => { cleanup?.(); });
      // h muodostaa saman oletusasettelun ilman ylimääräistä HTML-käärettä.
      return () => h(DefaultTheme.Layout);
    },
  }),
};
