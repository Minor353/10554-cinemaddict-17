import {createElement} from '../render.js';

const createFilmsListTemplate = (listTitle, classListModificator = '', classTitleModificator = '') => (
  `
  <section class="films-list ${classListModificator}">
      <h2 class="films-list__title ${classTitleModificator}">${listTitle}</h2>
  </section>
  `
);

export default class FilmsListView {
  constructor(listTitle, classListModificator, classTitleModificator) {
    this.listTitle = listTitle;
    this.classListModificator = classListModificator;
    this.classTitleModificator = classTitleModificator;
  }

  getTemplate() {
    return createFilmsListTemplate(this.listTitle, this.classListModificator, this.classTitleModificator);
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
