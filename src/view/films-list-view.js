import {createElement} from '../render.js';

const createFilmsListTemplate = (listTitle, classListModificator = ' ', classTitleModificator = ' ') => (
  `
  <section class="films-list ${classListModificator}">
      <h2 class="films-list__title ${classTitleModificator}">${listTitle}</h2>
  </section>
  `
);

export default class FilmsListView {
  constructor(listTitle, classModificator) {
    this.listTitle = listTitle;
    this.classModificator = classModificator;
  }

  getTemplate() {
    return createFilmsListTemplate(this.listTitle, this.classModificator);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
