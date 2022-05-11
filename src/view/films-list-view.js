import {createElement} from '../render.js';

const createFilmsListTemplate = (listTitle, classListModificator = '', classTitleModificator = '') => (
  `
  <section class="films-list ${classListModificator}">
      <h2 class="films-list__title ${classTitleModificator}">${listTitle}</h2>
  </section>
  `
);

export default class FilmsListView {
  #element = null;
  #listTitle = null;
  #classListModificator = null;
  #classTitleModificator = null;


  constructor(listTitle, classListModificator, classTitleModificator) {
    this.#listTitle = listTitle;
    this.#classListModificator = classListModificator;
    this.#classTitleModificator = classTitleModificator;
  }

  get template() {
    return createFilmsListTemplate(this.#listTitle, this.#classListModificator, this.#classTitleModificator);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
