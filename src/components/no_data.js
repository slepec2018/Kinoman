import Abstract from "./abstract.js";

const getTempNoData = () => {
  return `<h2 class="films-list__title">There are no movies in our database</h2>`;
};

class TempNoData extends Abstract {

  getTemplate() {
    return getTempNoData();
  }
}

export {TempNoData};
