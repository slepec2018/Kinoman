import Abstract from "./abstract.js";

const getTempTopRated = () => {
  return `<section class="films-list--extra">
  <h2 class="films-list__title">Top rated</h2>

  <div class="films-list__container">
  </div>
</section>`;
};

class TempTopRated extends Abstract {

  getTemplate() {
    return getTempTopRated();
  }
}

export {TempTopRated};
