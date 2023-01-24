import {TempCatalogSort, SortType} from "../components/catalog_sort.js";
import {TempCatalog} from "../components/catalog.js";
import {TempCatalogButMore} from "../components/catalog_but_more.js";
import {TempTopRated} from "../components/top_rated.js";
import {TempMostCommented} from "../components/most_commented.js";
import {TempNoData} from "../components/no_data.js";
import {render, RenderPosition, remove} from "../utils/render.js";
import {updateItem} from "../utils/common.js";
import {sortByDate, sortByRating} from "../utils/task.js";

import {Card} from "./card.js";

const TASK_COUNT_PER_STEP = 5;

export class Board {
  constructor(boardContainer) {
    this._boardContainer = boardContainer;
    this._renderedCardCount = TASK_COUNT_PER_STEP;
    this._cardPresenter = {};
    this._idDopPresenter = 0;
    this._currentSortType = SortType.DEFAULT;

    this._sortComponent = new TempCatalogSort();
    this._boardMainComponent = new TempCatalog();
    this._boardTopRatedComponent = new TempTopRated();
    this._boardMostCommentedComponent = new TempMostCommented();
    this._noFilmComponent = new TempNoData();
    this._loadMoreButtonComponent = new TempCatalogButMore();

    this._handleTaskChange = this._handleTaskChange.bind(this);
    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(boardCards, topRatedCards, topCommentsCards) {
    this._boardCards = boardCards.slice();
    this._topRatedCards = topRatedCards.slice();
    this._topCommentsCards = topCommentsCards.slice();

    this._sourcedBoardTasks = boardCards.slice();

    this._renderSort();
    render(this._boardContainer, this._boardMainComponent, RenderPosition.BEFOREEND);

    this._renderMainBoard();
  }

  _handleTaskChange(updatedTask) {
    this._boardTasks = updateItem(this._boardCards, updatedTask);
    this._cardPresenter[updatedTask.id].init(updatedTask);
  }

  _sortTasks(sortType) {
    // 2. Этот исходный массив задач необходим,
    // потому что для сортировки мы будем мутировать
    // массив в свойстве _boardTasks
    switch (sortType) {
      case SortType.SORT_DATE:
        this._boardCards.sort(sortByDate);
        break;
      case SortType.SORT_RATING:
        this._boardCards.sort(sortByRating);
        break;
      default:
        // 3. А когда пользователь захочет "вернуть всё, как было",
        // мы просто запишем в _boardTasks исходный массив
        this._boardCards = this._sourcedBoardTasks.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    // - Сортируем задачи
    // - Очищаем список
    // - Рендерим список заново

    if (this._currentSortType === sortType) {
      return;
    }

    this._sortTasks(sortType);

    this._clearTaskList();
    this._renderCardList();
    this._renderCards(0, 2, `TopRated`, this._topRatedCards);
    this._renderCards(0, 2, `MostCommented`, this._topCommentsCards);
  }

  _renderSort() {
    render(this._boardContainer, this._sortComponent, RenderPosition.BEFOREEND);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderCard(card, block = `main`) {
    const cardPresenter = new Card(
        this._boardContainer,
        this._catalogMainForCard,
        this._catalogTopRatedComponent,
        this._catalogMostCommentedComponent,
        block,
        this._handleTaskChange
    );

    if (block === `main`) {
      this._cardPresenter[card.id] = cardPresenter;
    } else {
      this._cardPresenter[++this._idDopPresenter] = cardPresenter;
    }

    cardPresenter.init(card);
  }

  _renderCards(from, to, block, data = this._boardCards) {
    data
      .slice(from, to)
      .forEach((boardCard) => this._renderCard(boardCard, block));
  }

  _renderNoFilm() {
    render(this._boardMainComponent, this._noFilmComponent, RenderPosition.AFTERBEGIN);
  }

  _handleLoadMoreButtonClick() {
    this._renderCards(this._renderedCardCount, this._renderedCardCount + TASK_COUNT_PER_STEP);

    this._renderedCardCount += TASK_COUNT_PER_STEP;

    if (this._renderedCardCount >= this._boardCards.length) {
      remove(this._loadMoreButtonComponent);
    }
  }

  _renderLoadMoreButton() {
    render(this._catalogFilm, this._loadMoreButtonComponent, RenderPosition.BEFOREEND);

    this._loadMoreButtonComponent.setClickHandler(this._handleLoadMoreButtonClick);
  }

  _clearTaskList() {
    Object
      .values(this._cardPresenter)
      .forEach((presenter) => presenter.destroy());
    this._cardPresenter = {};
    this._renderedCardCount = TASK_COUNT_PER_STEP;
    remove(this._loadMoreButtonComponent);
  }

  _renderCardList() {
    this._renderCards(0, Math.min(this._boardCards.length, TASK_COUNT_PER_STEP));

    if (this._boardCards.length > TASK_COUNT_PER_STEP) {
      this._renderLoadMoreButton();
    }
  }

  _renderMainBoard() {
    if (this._boardCards.length <= 0) {
      this._renderNoFilm();
      return;
    }

    this._catalogFilmContainer = this._boardContainer.querySelector(`.films`);
    this._catalogFilm = this._catalogFilmContainer.querySelector(`.films-list`);
    this._catalogMainForCard = this._catalogFilmContainer.querySelector(`.films-list__container`);
    this._renderTopRatedBoard();
    this._renderMostCommentedBoard();

    this._renderCardList();
  }

  _renderTopRatedBoard() {
    render(this._catalogFilmContainer, this._boardTopRatedComponent, RenderPosition.BEFOREEND);

    this._catalogTopRatedComponent = this._boardTopRatedComponent.getElement().querySelector(`.films-list__container`);

    this._renderCards(0, 2, `TopRated`, this._topRatedCards);
  }

  _renderMostCommentedBoard() {
    render(this._catalogFilmContainer, this._boardMostCommentedComponent, RenderPosition.BEFOREEND);

    this._catalogMostCommentedComponent = this._boardMostCommentedComponent.getElement().querySelector(`.films-list__container`);

    this._renderCards(0, 2, `MostCommented`, this._topCommentsCards);
  }

}
