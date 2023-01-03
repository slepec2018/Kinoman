import {TempMenu} from "./components/menu.js";
import {TempUserProf} from "./components/user_prof.js";
import {TempCatalogSort} from "./components/catalog_sort.js";
import {TempCatalog} from "./components/catalog.js";
import {TempCard} from "./components/card.js";
import {TempCardPop} from "./components/card_pop.js";
import {TempFooterStat} from "./components/footer_stat.js";
import {TempCatalogButMore} from "./components/catalog_but_more.js";
import {TempTopRated} from "./components/top_rated.js";
import {TempMostCommented} from "./components/most_commented.js";
import {TempNoData} from "./components/no_data.js";

import {generateCardData} from "./mock/card_mock.js";
import {generateUserProfData} from "./mock/user_prof_mock.js";
import {generateFooterStat} from "./mock/footer_stat_mock.js";

import {
  addClosePopUp,
  sortArray,
  addActiveClass,
  cleanChildElement,
  render,
  RenderPosition,
  onEscKeyDown
} from "./utils.js";

// Переменные основых блоков верстки
const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footer = document.querySelector(`.footer`);
const footerStat = footer.querySelector(`.footer__statistics`);

// Переменная количество карточек в каталоге
const CARD_COUNT = 14;
const TASK_COUNT_PER_STEP = 5;

// Массив сгенерированных карточек фильмов
const cards = new Array(CARD_COUNT).fill().map(generateCardData);

// Отсортированные массивы по заданным критериям
const topRatedCards = sortArray(cards, `rating`);
const topCommentsCards = sortArray(cards, `comments`);
const topDateCards = sortArray(cards, `yearCreat`);

// Функция навешивания события открытия и закрытия попапа
const addPopUpFilmCards = (contSearch, arr) => {
  const filmCards = contSearch.querySelectorAll(`.film-card`);

  const giveClosePopUp = (item, count) => {
    item.addEventListener(`click`, () => {

      render(footer, new TempCardPop(arr[count]).getElement(), RenderPosition.AFTERBEGIN);

      addClosePopUp();
    });
  };

  for (let i = 0; i < filmCards.length; i++) {
    const imgCard = filmCards[i].querySelector(`.film-card__poster`);
    const titleCard = filmCards[i].querySelector(`.film-card__title`);
    const commentCard = filmCards[i].querySelector(`.film-card__comments`);

    giveClosePopUp(imgCard, i);
    giveClosePopUp(titleCard, i);
    giveClosePopUp(commentCard, i);
  }

  document.addEventListener(`keydown`, onEscKeyDown);
};

// Функция добавление карточек фильмов к основной каталог
const addCardsMainCatalog = (arr) => {
  for (let i = 0; i < Math.min(arr.length, TASK_COUNT_PER_STEP); i++) {
    render(filmCatalogBasicCont, new TempCard(arr[i]).getElement(), RenderPosition.BEFOREEND);
  }
};

// Функция проверки длины массива карточек фильмов с последующим навешиванием
// кнопки еще и добавлением карточек фильмов с попапом для этих карточек

const addButtonMoreCards = (arr) => {
  if (arr.length > TASK_COUNT_PER_STEP) {
    let renderedTaskCount = TASK_COUNT_PER_STEP;

    render(filmCatalogBasic, new TempCatalogButMore().getElement(), RenderPosition.BEFOREEND);

    const loadMoreButton = filmCatalogBasic.querySelector(`.films-list__show-more`);

    loadMoreButton.addEventListener(`click`, (evt) => {
      evt.preventDefault();

      const diff = renderedTaskCount + TASK_COUNT_PER_STEP >= arr.length;

      for (let i = renderedTaskCount; i < (diff ? arr.length : renderedTaskCount + TASK_COUNT_PER_STEP); i++) {
        render(filmCatalogBasicCont, new TempCard(arr[i]).getElement(), RenderPosition.BEFOREEND);
      }

      const filmCards = filmCatalogBasicCont.querySelectorAll(`.film-card`);

      for (let i = renderedTaskCount; i < (diff ? arr.length : renderedTaskCount + TASK_COUNT_PER_STEP); i++) {
        filmCards[i].addEventListener(`click`, () => {
          render(footer, new TempCardPop(arr[i]).getElement(), RenderPosition.AFTERBEGIN);

          addClosePopUp();
        });
      }

      renderedTaskCount += TASK_COUNT_PER_STEP;

      if (renderedTaskCount >= arr.length) {
        loadMoreButton.remove();
      }
    });
  }
};

// Рендеринг данных пользователя в хедере
render(header, new TempUserProf(generateUserProfData()).getElement(), RenderPosition.BEFOREEND);
// renderTemp(header, getTempUserProf(generateUserProfData()), `beforeend`);
// Рендеринг меню
render(main, new TempMenu().getElement(), RenderPosition.AFTERBEGIN);
// Рендеринг сортировки каталога карточек
render(main, new TempCatalogSort().getElement(), RenderPosition.BEFOREEND);
// Рендеринг основго блока каталога
render(main, new TempCatalog().getElement(), RenderPosition.BEFOREEND);


// Основные переменные каталога
const filmCatalog = main.querySelector(`.films`);
const filmCatalogBasic = filmCatalog.querySelector(`.films-list`);
const filmCatalogBasicCont = filmCatalogBasic.querySelector(`.films-list__container`);

// Переменные контейнеров  топ блоков каталога
// const filmCatalogExtraConts = main.querySelectorAll(`.films-list--extra .films-list__container`);
const filmCatalogTopRated = new TempTopRated().getElement();
const filmCatalogMostCommented = new TempMostCommented().getElement();

if (cards.length > 0) {
  render(filmCatalog, filmCatalogTopRated, RenderPosition.BEFOREEND);
  render(filmCatalog, filmCatalogMostCommented, RenderPosition.BEFOREEND);

  const filmCatalogTopRatedCont = filmCatalogTopRated.querySelector(`.films-list__container`);
  const filmCatalogTMostCommentedCont = filmCatalogMostCommented.querySelector(`.films-list__container`);

  // Добавление карточек фильмов в топовые блоки каталога
  for (let i = 0; i < (cards.length >= 2 ? 2 : cards.length); i++) {
    render(filmCatalogTopRatedCont, new TempCard(topRatedCards[i]).getElement(), RenderPosition.BEFOREEND);
    render(filmCatalogTMostCommentedCont, new TempCard(topCommentsCards[i]).getElement(), RenderPosition.BEFOREEND);
  }

  // Навешивания попапа на блоки топ каталога
  addPopUpFilmCards(filmCatalogTopRatedCont, topRatedCards);
  addPopUpFilmCards(filmCatalogTMostCommentedCont, topCommentsCards);

  // Добавление карточек фильмов к основной каталог
  addCardsMainCatalog(cards);

  // Навешивания попапа на карточки основного каталога
  addPopUpFilmCards(filmCatalogBasicCont, cards);

  addButtonMoreCards(cards);
} else {
  render(filmCatalogBasicCont, new TempNoData().getElement(), RenderPosition.BEFOREEND);
}


// Рендеринг счеткика фильмов в футере
render(footerStat, new TempFooterStat(cards === null ? generateFooterStat() : cards.length).getElement(), RenderPosition.BEFOREEND);

// Переменные кнопок сортировок в каталоге карточек фильмов
const sort = main.querySelector(`.sort`);
const sortButtons = sort.querySelectorAll(`.sort__button`);

// Функция навешивания события фильтровки карточек фильмов в основном каталоге
const addSortToFilter = (arr, button) => {
  button.addEventListener(`click`, () => {
    addActiveClass(sortButtons, `sort__button--active`, button);
    cleanChildElement(filmCatalogBasicCont);
    if (filmCatalogBasic.querySelector(`.films-list__show-more`)) {
      filmCatalogBasic.querySelector(`.films-list__show-more`).remove();
    }
    addCardsMainCatalog(arr);
    addPopUpFilmCards(filmCatalogBasicCont, arr);
    addButtonMoreCards(arr);
  });
};
// Навешивания события фильтровки карточек фильмов в основном каталоге, с открытие
// и закрытием попапов
addSortToFilter(cards, sortButtons[0]);
addSortToFilter(topDateCards, sortButtons[1]);
addSortToFilter(topRatedCards, sortButtons[2]);
