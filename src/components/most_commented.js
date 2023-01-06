import Abstract from "./abstract.js";

const getTempMostCommented = () => {
  return `<section class="films-list--extra">
  <h2 class="films-list__title">Most commented</h2>

  <div class="films-list__container">
  </div>
</section>`;
};

class TempMostCommented extends Abstract {

  getTemplate() {
    return getTempMostCommented();
  }
}

export {TempMostCommented};
