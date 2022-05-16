import AbstractView from '../framework/view/abstract-view.js';

const createFilmsListTemplate = (listTitle, classListModificator = '', classTitleModificator = '') => (
  `
  <section class="films-list ${classListModificator}">
      <h2 class="films-list__title ${classTitleModificator}">${listTitle}</h2>
  </section>
  `
);

export default class FilmsListView extends AbstractView {
  #listTitle = null;
  #classListModificator = null;
  #classTitleModificator = null;


  constructor(listTitle, classListModificator, classTitleModificator) {
    super();
    this.#listTitle = listTitle;
    this.#classListModificator = classListModificator;
    this.#classTitleModificator = classTitleModificator;
  }

  get template() {
    return createFilmsListTemplate(this.#listTitle, this.#classListModificator, this.#classTitleModificator);
  }

}
