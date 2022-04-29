import {createElement} from '../render.js';

const createNumberOfFilmsTemplate = () => '<p>130 291 movies inside</p>';

export default class NumberOfFilmsView {
  getTemplate() {
    return createNumberOfFilmsTemplate();
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
