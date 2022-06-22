import FilmCardView from '../view/film-card-view.js';
import FilmDetailsView from '../view/film-details-view.js';
import {render, replace, remove} from '../framework/render.js';
import { UserAction, UpdateType } from '../utils/const.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  OPENED: 'OPENED',
};

export default class FilmPresenter {
  #card = null;
  #comments = null;
  #container = null;
  #filmComponent = null;
  #filmDetailsComponent = null;
  #changeData = null;
  #changeMode = null;
  #mode = Mode.DEFAULT;
  #commentModel = null;

  constructor(container, changeData, changeMode, commentModel){
    this.#container = container;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
    this.#commentModel = commentModel;
  }

  init = (card) => {
    this.#card = card;
    this.#comments = this.#commentModel.comments;
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

    this.#filmDetailsComponent.setWatchlistClickHandler(this.#handleWatchListClick);
    this.#filmDetailsComponent.setWatchedClickHandler(this.#handleWatchedClick);
    this.#filmDetailsComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#filmDetailsComponent.setCommentDeleteClickHandler(this.#handleCommentDeleteClick);
    this.#filmDetailsComponent.setCommentAddHandler(this.#handleCommentAdd);

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

    if (this.#mode === Mode.OPENED) {
      replace(this.#filmDetailsComponent, prevFilmDetailsComponent);
    }


    remove(prevFilmComponent);
    remove(prevFilmDetailsComponent);

  };

  #getCommentsAndUpdateDetails = async () => {
    const comments = await this.#commentModel.getCommentsById(this.#card.id);

    this.prevFilmDetailsComponent = this.#filmDetailsComponent;
    this.#replaceFilmDetailsComponent(comments);
  };

  #replaceFilmDetailsComponent = (comments) => {
    this.#filmDetailsComponent = new FilmDetailsView(this.#card, comments);
    this.#setFilmDetailsHandlers();
    replace(this.#filmDetailsComponent, this.prevFilmDetailsComponent);
    remove(this.prevFilmDetailsComponent);
  };

  #setFilmDetailsHandlers = () => {
    this.#filmDetailsComponent.setClickHandler(this.#hideFilmDetailsPopup);
    this.#filmDetailsComponent.setWatchlistClickHandler(this.#handleWatchListClick);
    this.#filmDetailsComponent.setWatchedClickHandler(this.#handleWatchedClick);
    this.#filmDetailsComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#filmDetailsComponent.setCommentDeleteClickHandler(this.#handleCommentDeleteClick);
    this.#filmDetailsComponent.setCommentAddHandler(this.#handleCommentAdd);
  };

  #handleCommentDeleteClick = (commentId) => {
    this.#commentModel.deleteComment(
      commentId
    );
    this.#changeData(
      UserAction.DELETE_COMMENT,
      UpdateType.PATCH,
      {
        ...this.#card,
        comments: this.#card.comments.filter((filmCommentId) => filmCommentId !== commentId),
      }
    );
  };

  #handleCommentAdd = (update) => {
    this.#commentModel.addComment(
      this.#card.id,
      update,
    );
    this.#changeData(
      UserAction.ADD_COMMENT,
      UpdateType.PATCH,
      {
        ...this.#card,
        comments: [...this.#card.comments, update.id],
      }
    );
  };


  destroy = () => {
    remove(this.#filmComponent);
    remove(this.#filmDetailsComponent);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#hideFilmDetailsPopup();
      document.body.classList.add('hide-overflow');
    }
  };

  #showFilmDetailsPopup = () => {
    document.body.appendChild(this.#filmDetailsComponent.element);
    document.body.classList.add('hide-overflow');
    this.#changeMode();
    this.#mode = Mode.OPENED;
    this.#getCommentsAndUpdateDetails();
  };

  #hideFilmDetailsPopup = () => {
    document.body.removeChild(this.#filmDetailsComponent.element);
    document.body.classList.remove('hide-overflow');
    this.#mode = Mode.DEFAULT;
  };

  #handleWatchListClick = () => {
    this.#changeData(
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      {
        ...this.#card,
        'user_details': {
          ...this.#card['user_details'],
          watchlist: !this.#card['user_details'].watchlist
        }
      }, this.#comments);
  };

  #handleWatchedClick = () => {
    this.#changeData(
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      {
        ...this.#card,
        'user_details': {
          ...this.#card['user_details'],
          history: !this.#card['user_details'].history
        }
      }, this.#comments);
  };

  #handleFavoriteClick = () => {
    this.#changeData(
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      {
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
