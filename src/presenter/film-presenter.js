import FilmCardView from '../view/film-card-view.js';
import FilmDetailsView from '../view/film-details-view.js';
import {render, replace, remove} from '../framework/render.js';

export default class FilmPresenter {
  #card = null;
  #comments = null;
  #container = null;
  #filmComponent = null;
  #filmDetailsComponent = null;
  #changeData = null;

  constructor(container, changeData){
    this.#container = container;
    this.#changeData = changeData;
  }

  init = (card, comments) => {
    this.#card = card;
    this.#comments = comments;

    const prevFilmComponent = this.#filmComponent;
    const prevFilmDetailsComponent = this.#filmDetailsComponent;

    this.#filmComponent = new FilmCardView(this.#card);
    this.#filmDetailsComponent = new FilmDetailsView(this.#card, this.#comments);

    this.#filmComponent.setClickHandler(() => {
      this.#showFilmDetailsPopup();
      document.addEventListener('keydown', this.#onEscKeyDown);
    });

    this.#filmComponent.setWatchlistClickHandler(this.#handleWatchListClick);
    this.#filmComponent.setWatchedClickHandler(this.#handleWatchedClick);
    this.#filmComponent.setFavoriteClickHandler(this.#handleFavoriteClick);

    this.#filmDetailsComponent.setClickHandler(() => {
      this.#hideFilmDetailsPopup();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    });

    if (prevFilmComponent === null || prevFilmDetailsComponent === null) {
      render(this.#filmComponent, this.#container);
      return;
    }

    if (this.#container.contains(prevFilmComponent.element)) {
      replace(this.#filmComponent, prevFilmComponent);
    }

    if (document.body.contains(prevFilmDetailsComponent.element)) {
      replace(this.#filmDetailsComponent, prevFilmDetailsComponent);
    }


    remove(prevFilmComponent);
    remove(prevFilmDetailsComponent);

  };

  destroy = () => {
    remove(this.#filmComponent);
    remove(this.#filmDetailsComponent);
  };

  #showFilmDetailsPopup = () => {
    document.body.appendChild(this.#filmDetailsComponent.element);
    document.body.classList.add('hide-overflow');
  };

  #hideFilmDetailsPopup = () => {
    document.body.removeChild(this.#filmDetailsComponent.element);
    document.body.classList.remove('hide-overflow');
  };

  #handleWatchListClick = () => {
    this.#changeData({
      ...this.#card,
      'user_details': {
        ...this.#card['user_details'],
        watchlist: !this.#card['user_details'].watchlist
      }
    }, this.#comments);
  };

  #handleWatchedClick = () => {
    this.#changeData({
      ...this.#card,
      'user_details': {
        ...this.#card['user_details'],
        ['already_watched']: !this.#card['user_details']['already_watched']
      }
    }, this.#comments);
  };

  #handleFavoriteClick = () => {
    this.#changeData({
      ...this.#card,
      'user_details': {
        ...this.#card['user_details'],
        favorite: !this.#card['user_details'].favorite
      }
    }, this.#comments);
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#hideFilmDetailsPopup();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };
}
