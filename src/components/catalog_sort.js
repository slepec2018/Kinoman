import Abstract from "./abstract.js";

const getTempCatalogSort = () => {
  return `<ul class="sort">
  <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
  <li><a href="#" class="sort__button">Sort by date</a></li>
  <li><a href="#" class="sort__button">Sort by rating</a></li>
</ul>`;
};

class TempCatalogSort extends Abstract {

  getTemplate() {
    return getTempCatalogSort();
  }
}

export {TempCatalogSort};
