import Abstract from "./abstract.js";

const getTempUserProf = (arr) => {
  return `<section class="header__profile profile">
  <p class="profile__rating">${arr}</p>
  <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
</section>`;
};

class TempUserProf extends Abstract {
  constructor(data) {
    super();
    this._data = data;
  }

  getTemplate() {
    return getTempUserProf(this._data);
  }
}

export {TempUserProf};
