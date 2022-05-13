import {createElement} from '../render.js';
import { humanizeYear, transformIntToHour } from '../utils.js';

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
        <button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
        <button class="film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
        <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
        </div>
    </article>
  `
);

export default class FilmCardView {
  #element = null;
  #film = null;

  constructor(film) {
    this.#film = film;
  }

  get template() {
    return createFilmCardTemplate(this.#film);
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
