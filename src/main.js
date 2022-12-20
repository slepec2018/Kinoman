import {getTempMenu} from "./components/menu.js";
import {getTempUserProf} from "./components/user_prof.js";
import {getTempCatalogSort} from "./components/catalog_sort.js";
import {getTempCatalog} from "./components/catalog.js";
import {getTempCard} from "./components/card.js";
import {getTempCardPop} from "./components/card_pop.js";
import {getTempFooterStat} from "./components/footer_stat.js";
import {getTempCatalogButMore} from "./components/catalog_but_more.js";

import {generateCardData} from "./mock/card_mock.js";
import {generateUserProfData} from "./mock/user_prof_mock.js";
import {generateFooterStat} from "./mock/footer_stat_mock.js";

import {addClosePopUp, sortArray, addActiveClass, cleanChildElement} from "./utils.js";

// Переменные основых блоков верстки
const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footer = document.querySelector(`.footer`);
const footerStat = footer.querySelector(`.footer__statistics`);

// Переменная количество карточек в каталоге
const CARD_COUNT = 5;

// Массив сгенерированных карточек товаров
const cards = new Array(CARD_COUNT).fill().map(generateCardData);

// Отсортированные массивы по заданным критериям
const topRatedCards = sortArray(cards, `rating`);
const topCommentsCards = sortArray(cards, `comments`);
const topDateCards = sortArray(cards, `yearCreat`);

// Функция добавления кода html в исходный код
const renderTemp = (container, temp, place) => {
  container.insertAdjacentHTML(place, temp);
};
// Рендеринг данных пользователя в хедере
renderTemp(header, getTempUserProf(generateUserProfData()), `beforeend`);
// Рендеринг меню
renderTemp(main, getTempMenu(), `afterbegin`);
// Рендеринг сортировки каталога карточек
renderTemp(main, getTempCatalogSort(), `beforeend`);
// Рендеринг основго блока каталога
renderTemp(main, getTempCatalog(), `beforeend`);

// Основные переменные каталога
const filmCatalog = main.querySelector(`.films-list`);
const filmCatalogCont = filmCatalog.querySelector(`.films-list__container`);

// Переменные контейнеров  топ блоков каталога
const filmCatalogExtraConts = main.querySelectorAll(`.films-list--extra .films-list__container`);

// Добавление карточек фильмов в топовые блоки каталога
for (let i = 0; i < 2; i++) {
  renderTemp(filmCatalogExtraConts[0], getTempCard(topRatedCards[i]), `beforeend`);
  renderTemp(filmCatalogExtraConts[1], getTempCard(topCommentsCards[i]), `beforeend`);
}

// Функция навешивания события открытия и закрытия попапа
const addPopUpFilmCards = (contSearch, arr) => {
  const filmCards = contSearch.querySelectorAll(`.film-card`);

  for (let i = 0; i < filmCards.length; i++) {
    filmCards[i].addEventListener(`click`, () => {
      renderTemp(footer, getTempCardPop(arr[i]), `afterend`);

      addClosePopUp();
    });
  }
};

// Навешивания попапа на блоки топ каталога
addPopUpFilmCards(filmCatalogExtraConts[0], topRatedCards);
addPopUpFilmCards(filmCatalogExtraConts[1], topCommentsCards);

// Функция добавление карточек фильмов к основной каталог
const addCardsMainCatalog = (arr) => {
  for (let i = CARD_COUNT - 1; i >= 0; i--) {
    renderTemp(filmCatalogCont, getTempCard(arr[i]), `afterbegin`);
  }
};

// Добавление карточек фильмов к основной каталог
addCardsMainCatalog(cards);

// Навешивания попапа на карточки основного каталога
addPopUpFilmCards(filmCatalogCont, cards);

// Ренлеринг кнопки больше в каталоге карточек
renderTemp(filmCatalogCont, getTempCatalogButMore(), `beforeend`);
// Рендеринг счеткика фильмов в футере
renderTemp(footerStat, getTempFooterStat(cards === null ? generateFooterStat() : cards.length), `beforeend`);

// Переменные кнопок сортировок в каталоге карточек фильмов
const sort = main.querySelector(`.sort`);
const sortButtons = sort.querySelectorAll(`.sort__button`);

// Функция навешивания события фильтровки карточек фильмов в основном каталоге
const addSortToFilter = (arr, button) => {
  button.addEventListener(`click`, () => {
    addActiveClass(sortButtons, `sort__button--active`, button);
    cleanChildElement(filmCatalogCont);
    addCardsMainCatalog(arr);
    addPopUpFilmCards(filmCatalogCont, arr);
  });
};
// Навешивания события фильтровки карточек фильмов в основном каталоге, с открытие
// и закрытием попапов
addSortToFilter(cards, sortButtons[0]);
addSortToFilter(topDateCards, sortButtons[1]);
addSortToFilter(topRatedCards, sortButtons[2]);
