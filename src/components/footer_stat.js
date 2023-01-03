import {createElement} from "../utils.js";

const getTempFooterStat = (arr) => {
  return `<section class="footer__statistics">
  <p>${arr} movies inside</p>
</section>`;
};

class TempFooterStat {
  constructor(data) {
    this._element = null;
    this._data = data;
  }

  getTemplate() {
    return getTempFooterStat(this._data);
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

export {TempFooterStat};
