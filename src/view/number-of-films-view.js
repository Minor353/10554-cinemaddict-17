import AbstractView from '../framework/view/abstract-view.js';

const createNumberOfFilmsTemplate = () => '<p>130 291 movies inside</p>';

export default class NumberOfFilmsView extends AbstractView{
  get template() {
    return createNumberOfFilmsTemplate();
  }
}
