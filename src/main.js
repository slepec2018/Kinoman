import {getTempMenu} from "./components/menu.js";
import {getTempUserProf} from "./components/user_prof.js";
import {getTempCatalogSort} from "./components/catalog_sort.js";
import {getTempCatalog} from "./components/catalog.js";
import {getTempCard} from "./components/card.js";
// import {getTempCardPop} from "./components/card_pop.js";
import {getTempFooterStat} from "./components/footer_stat.js";
import {getTempCatalogButMore} from "./components/catalog_but_more.js";

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footer = document.querySelector(`.footer`);
const footerStat = footer.querySelector(`.footer__statistics`);

const renderTemp = (container, temp, place) => {
  container.insertAdjacentHTML(place, temp);
};

renderTemp(header, getTempUserProf(), `beforeend`);
renderTemp(main, getTempMenu(), `afterbegin`);
renderTemp(main, getTempCatalogSort(), `beforeend`);
renderTemp(main, getTempCatalog(), `beforeend`);

const filmCatalog = main.querySelector(`.films-list`);
const filmCatalogCont = filmCatalog.querySelector(`.films-list__container`);

const filmCatalogExtra = main.querySelectorAll(`.films-list--extra`);

for (const item of filmCatalogExtra) {
  const filmCatalogExtraCont = item.querySelector(`.films-list__container`);

  renderTemp(filmCatalogExtraCont, getTempCard(), `afterbegin`);
  renderTemp(filmCatalogExtraCont, getTempCard(), `afterbegin`);
}

for (let i = 0; i < 5; i++) {
  renderTemp(filmCatalogCont, getTempCard(), `afterbegin`);
}

renderTemp(filmCatalogCont, getTempCatalogButMore(), `beforeend`);
renderTemp(footerStat, getTempFooterStat(), `beforeend`);
// renderTemp(footer, getTempCardPop(), `afterend`);
