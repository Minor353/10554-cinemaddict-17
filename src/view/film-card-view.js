import AbstractView from '../framework/view/abstract-view.js';
import { humanizeYear, transformIntToHour } from '../utils/humanize-date.js';
import { checkControlStatus } from '../utils/films.js';

const createFilmCardTemplate = (film) => (
  `
    <article class="film-card">
        <a class="film-card__link">
        <h3 class="film-card__title">${film.film_info.title}</h3>
        <p class="film-card__rating">${film.film_info.total_rating}</p>
        <p class="film-card__info">
            <span class="film-card__year">${humanizeYear(film.film_info.release.date)}</span>
            <span class="film-card__duration">${transformIntToHour(film.film_info.runtime)}</span>
            <span class="film-card__genre">${film.film_info.genre.join(', ')}</span>
        </p>
        <img src="./${film.film_info.poster}" alt="" class="film-card__poster">
        <p class="film-card__description">${film.film_info.description}</p>
        <span class="film-card__comments">5 comments</span>
        </a>
        <div class="film-card__controls">
        <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${checkControlStatus(film['user_details'].watchlist, 'film-card__controls-item--active')}" type="button">Add to watchlist</button>
        <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${checkControlStatus(film['user_details']['already_watched'], 'film-card__controls-item--active')}" type="button">Mark as watched</button>
        <button class="film-card__controls-item film-card__controls-item--favorite ${checkControlStatus(film['user_details'].favorites, 'film-card__controls-item--active')}" type="button">Mark as favorite</button>
        </div>
    </article>
  `
);

export default class FilmCardView extends AbstractView {
  #film = null;

  constructor(film) {
    super();
    this.#film = film;
  }

  get template() {
    return createFilmCardTemplate(this.#film);
  }

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.film-card__link').addEventListener('click', this.#clickHandler);
  };

  setWatchlistClickHandler = (callback) => {
    this._callback.watchListClick = callback;
    this.element.querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this.#watchListClickHandler);
  };

  setWatchedClickHandler = (callback) => {
    this._callback.watchedClick = callback;
    this.element.querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this.#watchedClickHandler);
  };

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.film-card__controls-item--favorite').addEventListener('click', this.#favoriteClickHandler);
  };

  #watchListClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchListClick();
  };

  #watchedClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchedClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };
}
