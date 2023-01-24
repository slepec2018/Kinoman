import {TempMenu} from "./components/menu.js";
import {TempUserProf} from "./components/user_prof.js";
import {TempFooterStat} from "./components/footer_stat.js";

import {Board} from "./presenter/board.js";

import {generateCardData} from "./mock/card_mock.js";
import {generateUserProfData} from "./mock/user_prof_mock.js";
import {generateFooterStat} from "./mock/footer_stat_mock.js";

import {render, RenderPosition} from "./utils/render.js";
import {sortArray} from "./utils/common.js";

// Переменные основых блоков верстки
const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footer = document.querySelector(`.footer`);
const footerStat = footer.querySelector(`.footer__statistics`);

// Переменная количество карточек в каталоге
const CARD_COUNT = 14;

// Массив сгенерированных карточек фильмов
const cards = new Array(CARD_COUNT).fill().map(generateCardData);

// Отсортированные массивы по заданным критериям
const topRatedCards = sortArray(cards, `rating`);
const topCommentsCards = sortArray(cards, `comments`);
// const topDateCards = sortArray(cards, `yearCreat`);

// Рендеринг данных пользователя в хедере
render(header, new TempUserProf(generateUserProfData()).getElement(), RenderPosition.BEFOREEND);
// renderTemp(header, getTempUserProf(generateUserProfData()), `beforeend`);
// Рендеринг меню
render(main, new TempMenu().getElement(), RenderPosition.AFTERBEGIN);

const boardPresenter = new Board(main);

boardPresenter.init(cards, topRatedCards, topCommentsCards);

// Рендеринг счеткика фильмов в футере
render(footerStat, new TempFooterStat(cards === null ? generateFooterStat() : cards.length).getElement(), RenderPosition.BEFOREEND);
