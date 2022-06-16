import AbstractView from '../framework/view/abstract-view.js';
import {SortType} from '../utils/const.js';

const createSortFilmsTemplate = (currentSortType) => (
  `
  <ul class="sort">
    <li><a href="#" class="sort__button ${currentSortType === SortType.DEFAULT ? 'sort__button--active' : ''}" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
    <li><a href="#" class="sort__button ${currentSortType === SortType.DATE_DOWN ? 'sort__button--active' : ''}" data-sort-type="${SortType.DATE_DOWN}">Sort by date</a></li>
    <li><a href="#" class="sort__button ${currentSortType === SortType.RATING_DOWN ? 'sort__button--active' : ''}" data-sort-type="${SortType.RATING_DOWN}">Sort by rating</a></li>
  </ul>
  `
);

export default class SortFilmsView extends AbstractView {
  #currentSortType = null;

  constructor(currentSortType) {
    super();
    this.#currentSortType = currentSortType;
  }

  get template() {
    return createSortFilmsTemplate(this.#currentSortType);
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  };

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'A') {
      return;
    }
    this.element.querySelector('.sort__button--active').classList.remove('sort__button--active');
    evt.target.classList.add('sort__button--active');
    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  };
}
