import FilmsView from '../view/films-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import NoFilmsView from '../view/no-films-view.js';
import SortFilmsView from '../view/sort-films-view.js';
import FilmPresenter from './film-presenter.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import {render} from '../framework/render.js';
import {sortDateDown, sortRateDown} from '../utils/films.js';
import {SortType, UserAction, UpdateType} from '../utils/const.js';
import { /*RATE_FILM_PER_STEP,*/ FILM_COUNT_PER_STEP, FILMS_LIST_CONFIG} from '../utils/const.js';


export default class FilmsPresenter {
  #filmsWrapper = new FilmsView();
  #mainFilmsList = new FilmsListView(FILMS_LIST_CONFIG.mainFilms.title, '', FILMS_LIST_CONFIG.mainFilms.titleClassName);
  #mainFilmsListContainer = new FilmsListContainerView();
  #topRatedFilmsList = new FilmsListView(FILMS_LIST_CONFIG.topRatedFilms.title, FILMS_LIST_CONFIG.topRatedFilms.containerClassName);
  #topRatedFilmsListContainer = new FilmsListContainerView();
  #mostCommentedFilmsList = new FilmsListView(FILMS_LIST_CONFIG.mostCommentedFilms.title, FILMS_LIST_CONFIG.mostCommentedFilms.containerClassName);
  #mostCommentedFilmsListContainer = new FilmsListContainerView();
  #filmsContainer = null;
  #filmsModel = null;
  #topRatedFilms = [];
  #mostCommentedFilms = [];
  #filmPresenter = new Map();
  #commentsModel = null;
  #filmComments = [];
  #sortFilms = new SortFilmsView();
  #currentSortType = SortType.DEFAULT;
  #renderFilmCount = FILM_COUNT_PER_STEP;
  #showMoreButtonComponent = null;


  constructor(filmsContainer, filmsModel, commentsModel){
    this.#filmsContainer = filmsContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;

    this.#filmsModel.addObserver(this.#handleModelEvent);
  }

  get films() {
    switch (this.#currentSortType) {
      case SortType.DATE_DOWN:
        return  [...this.#filmsModel.films].sort(sortDateDown);
      case SortType.RATING_DOWN:
        return  [...this.#filmsModel.films].sort(sortRateDown);
    }

    return this.#filmsModel.films;
  }

  init = () => {
    this.#topRatedFilms = [...this.#filmsModel.films];
    this.#mostCommentedFilms = [...this.#filmsModel.films];
    this.#filmComments = [...this.#commentsModel.comments];
    this.#renderFilmsBoard();
  };

  #renderFilmsBoard = () => {
    if(this.films.length === 0 ){
      render(new NoFilmsView(), this.#filmsContainer);
    } else {
      this.#renderSort();
      render(this.#filmsWrapper, this.#filmsContainer);
      render(this.#mainFilmsList, this.#filmsWrapper.element);
      render(this.#mainFilmsListContainer, this.#mainFilmsList.element);
      this.#renderMainFilmsList();
      render(this.#topRatedFilmsList, this.#filmsWrapper.element);
      render(this.#topRatedFilmsListContainer, this.#topRatedFilmsList.element);
      /*for(let i = 0; i < Math.min(this.#topRatedFilms.length, RATE_FILM_PER_STEP); i++){
        this.#renderFilmCards(this.#topRatedFilms[i], this.#filmComments, this.#topRatedFilmsListContainer.element);
      }*/

      render(this.#mostCommentedFilmsList, this.#filmsWrapper.element);
      render(this.#mostCommentedFilmsListContainer, this.#mostCommentedFilmsList.element);
      /*for(let i = 0; i < Math.min(this.#mostCommentedFilms.length, RATE_FILM_PER_STEP); i++){
        this.#renderFilmCards(this.#mostCommentedFilms[i], this.#filmComments, this.#mostCommentedFilmsListContainer.element);
      }*/
      if (this.films.length > FILM_COUNT_PER_STEP) {
        this.#renderShowMoreButton();
      }
    }

  };

  #handleModeChange = () => {
    this.#filmPresenter.forEach((presenter) => presenter.resetView());
  };

  #renderFilmCards = (card, comments, container) => {
    const filmPresenter = new FilmPresenter(container, this.#handleViewAction, this.#handleModeChange);
    filmPresenter.init(card, comments);
    this.#filmPresenter.set(card.id, filmPresenter);
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this.#filmsModel.updateFilm(updateType, update);
        break;
      case UserAction.ADD_COMMENT:

        break;
      case UserAction.DELETE_COMMENT:

        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        if (this.#filmPresenter.get(data.id)) {
          this.#filmPresenter.get(data.id).init(data, this.#filmComments);
        }
        break;
      case UpdateType.MINOR:
        break;
      case UpdateType.MAJOR:
        break;
    }
  };

  #clearFilmList = () => {
    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();
    //this.#renderFilmCount = FILM_COUNT_PER_STEP;
  };


  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType){
      return;
    }
    this.#currentSortType = sortType;
    this.#clearFilmList();
    this.#renderMainFilmsList();
  };

  #renderMainFilmsList = () => {
    for(let i = 0; i < Math.min(this.films.length, this.#renderFilmCount); i++){
      this.#renderFilmCards(this.films[i], this.#filmComments, this.#mainFilmsListContainer.element);
    }
  };

  #renderSort = () => {
    render(this.#sortFilms, this.#filmsContainer);
    this.#sortFilms.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #handleShowMoreButtonClick = () => {
    const filmCount = this.films.length;
    const newRenderedFilmCount = Math.min(filmCount, this.#renderFilmCount + FILM_COUNT_PER_STEP);
    const films = this.films.slice(this.#renderFilmCount, newRenderedFilmCount);
    films.forEach((card) => this.#renderFilmCards(card, this.#filmComments, this.#mainFilmsListContainer.element));
    this.#renderFilmCount = newRenderedFilmCount;

    if(this.#renderFilmCount >= filmCount) {
      this.#showMoreButtonComponent.element.remove();
      this.#showMoreButtonComponent.removeElement();
    }
  };

  #renderShowMoreButton = () => {
    this.#showMoreButtonComponent = new ShowMoreButtonView();
    this.#showMoreButtonComponent.setClickHandler(this.#handleShowMoreButtonClick);
    render(this.#showMoreButtonComponent, this.#mainFilmsList.element);
  };

}
