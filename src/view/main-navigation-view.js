import AbstractView from '../framework/view/abstract-view.js';

const filterCounts = {
  favorites: 0,
  watchlist: 0,
  alredyWatched: 0
};

const filtersDataCounter = (films) => {
  films.forEach((film) => {
    filterCounts.favorites = (film['user_details'].favorites === true) ? filterCounts.favorites += 1 : filterCounts.favorites += 0;
    filterCounts.watchlist = (film['user_details'].watchlist === true) ? filterCounts.watchlist += 1 : filterCounts.watchlist += 0;
    filterCounts.alredyWatched = (film['user_details']['already_watched'] === true) ? filterCounts.alredyWatched += 1 : filterCounts.alredyWatched += 0;
  });
};

const createMainNavigationTemplate = (films) => {
  filtersDataCounter(films);
  return (
    `
  <nav class="main-navigation">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${filterCounts.watchlist}</span></a>
    <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${filterCounts.alredyWatched}</span></a>
    <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${filterCounts.favorites}</span></a>
  </nav>
  `
  );};

export default class MainNavigationView extends AbstractView {
  #films = null;

  constructor(filmsModel) {
    super();
    this.#films = [...filmsModel.films];
  }

  get template() {
    return createMainNavigationTemplate(this.#films);
  }
}
