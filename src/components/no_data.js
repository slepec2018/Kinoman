import {createElement} from "../utils.js";

const getTempNoData = () => {
  return `<h2 class="films-list__title">There are no movies in our database</h2>`;
};

class TempNoData {
  constructor(data) {
    this._element = null;
    this._data = data;
  }

  getTemplate() {
    return getTempNoData();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export {TempNoData};
