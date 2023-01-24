import Abstract from "./abstract.js";

const SortType = {
  DEFAULT: `default`,
  SORT_DATE: `sort-by-date`,
  SORT_RATING: `sort-by-rating`
};

const getTempCatalogSort = () => {
  return `<ul class="sort">
  <li><a href="#" class="sort__button sort__button--active" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
  <li><a href="#" class="sort__button" data-sort-type="${SortType.SORT_DATE}">Sort by date</a></li>
  <li><a href="#" class="sort__button" data-sort-type="${SortType.SORT_RATING}">Sort by rating</a></li>
</ul>`;
};

class TempCatalogSort extends Abstract {
  constructor() {
    super();

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  _getActualSortType(actualTag) {
    if (actualTag === this._sortTypeChangeHandler) {
      return true;
    } else {
      return false;
    }
  }

  getTemplate() {
    return getTempCatalogSort();
  }

  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== `A`) {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
    this._sortTypeClassChange(evt.target.dataset.sortType);
  }

  _sortTypeClassChange(elem) {
    this._allButton = this.getElement().querySelectorAll(`.sort__button`);

    for (const item of this._allButton) {
      item.classList.remove(`sort__button--active`);

      if (item.dataset.sortType === elem) {
        item.classList.add(`sort__button--active`);
      }
    }

  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener(`click`, this._sortTypeChangeHandler);
  }
}

export {TempCatalogSort, SortType};
