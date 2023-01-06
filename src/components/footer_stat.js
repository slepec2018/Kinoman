import Abstract from "./abstract.js";

const getTempFooterStat = (arr) => {
  return `<section class="footer__statistics">
  <p>${arr} movies inside</p>
</section>`;
};

class TempFooterStat extends Abstract {
  constructor(data) {
    super();
    this._data = data;
  }

  getTemplate() {
    return getTempFooterStat(this._data);
  }
}

export {TempFooterStat};
