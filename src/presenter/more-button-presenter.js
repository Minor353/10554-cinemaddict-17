import ShowMoreButtonView from '../view/show-more-button-view.js';
import {render} from '../framework/render.js';
import { FILM_COUNT_PER_STEP} from '../utils/const.js';

export default class MoreButtonPresenter {
  #loadMoreButtonComponent = null;
  #renderedTaskCount = null;
  #filmsContainer = null;
  #myFilms = null;
  #filmComments = null;
  #buttonContainer = null;
  #onRenderFilmCards = null;

  constructor(films, comments, filmsContainer, buttonContainer, onRenderFilmCards){
    this.#filmsContainer = filmsContainer;
    this.#buttonContainer = buttonContainer;
    this.#myFilms = films;
    this.#filmComments = comments;
    this.#onRenderFilmCards = onRenderFilmCards;
  }

  init = () => {
    this.#loadMoreButtonComponent = new ShowMoreButtonView();
    this.#renderedTaskCount = FILM_COUNT_PER_STEP;

    render(this.#loadMoreButtonComponent, this.#buttonContainer);
    this.#loadMoreButtonComponent.setClickHandler(this.#handleLoadMoreButtonClick);
  };


  #handleLoadMoreButtonClick = () => {
    this.#myFilms
      .slice(this.#renderedTaskCount, this.#renderedTaskCount + FILM_COUNT_PER_STEP)
      .forEach((card) => this.#onRenderFilmCards(card, this.#filmComments, this.#filmsContainer));

    this.#renderedTaskCount += FILM_COUNT_PER_STEP;

    if (this.#renderedTaskCount >= this.#myFilms.length) {
      this.#loadMoreButtonComponent.element.remove();
      this.#loadMoreButtonComponent.removeElement();
    }
  };
}

