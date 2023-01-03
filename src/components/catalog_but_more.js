import {createElement} from "../utils.js";

const getTempCatalogButMore = () => {
  return `<button class="films-list__show-more">Show more</button>`;
};

class TempCatalogButMore {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return getTempCatalogButMore();
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

export {TempCatalogButMore};
