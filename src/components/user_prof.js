import {createElement} from "../utils.js";

const getTempUserProf = (arr) => {
  return `<section class="header__profile profile">
  <p class="profile__rating">${arr}</p>
  <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
</section>`;
};

class TempUserProf {
  constructor(data) {
    this._element = null;
    this._data = data;
  }

  getTemplate() {
    return getTempUserProf(this._data);
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

export {TempUserProf};
