import Abstract from "./abstract.js";

const getTempCatalog = () => {
  return `<section class="films">
  <section class="films-list">
    <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

    <div class="films-list__container">
    </div>
  </section>
</section>`;
};

class TempCatalog extends Abstract {

  getTemplate() {
    return getTempCatalog();
  }
}

export {TempCatalog};
