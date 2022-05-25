import AbstractView from '../framework/view/abstract-view.js';


const createMainNavigationTemplate = (filterCounts) => (
  `
  <nav class="main-navigation">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${filterCounts.watchlist}</span></a>
    <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${filterCounts.alredyWatched}</span></a>
    <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${filterCounts.favorites}</span></a>
  </nav>
  `
);

export default class MainNavigationView extends AbstractView {
  #filterCounts = null;
  constructor(filterCounts) {
    super();
    this.#filterCounts = filterCounts;
  }

  get template() {
    return createMainNavigationTemplate(this.#filterCounts);
  }
}
