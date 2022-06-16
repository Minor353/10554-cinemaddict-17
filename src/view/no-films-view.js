import AbstractView from '../framework/view/abstract-view.js';
import {FilterType} from '../utils/const.js';

const NoTasksTextType = {
  [FilterType.ALL]: 'There are no movies in our database',
  [FilterType.WATCH_LIST]: 'There are no movies in the watch list',
  [FilterType.HISTORY]: 'There are no movies in the history',
  [FilterType.FAVORITES]: 'There are no movies in the favorites',
};

const createNoFilmsTemplate = (filterType) => {
  const noTaskTextValue = NoTasksTextType[filterType];
  return (`<h2 class="films-list__title">${noTaskTextValue}</h2>`);
};

export default class NoFilmsView extends AbstractView {
  #filterType = null;

  constructor(filterType) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoFilmsTemplate(this.#filterType);
  }
}
