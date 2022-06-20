import FilmsView from '../view/films-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import NoFilmsView from '../view/no-films-view.js';
import {filter} from '../utils/filters.js';
import SortFilmsView from '../view/sort-films-view.js';
import FilmPresenter from './film-presenter.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import LoadingView from '../view/loading-view.js';
import {render, remove, RenderPosition} from '../framework/render.js';
import {sortDateDown, sortRateDown} from '../utils/films.js';
import {SortType, UserAction, UpdateType, FilterType} from '../utils/const.js';
import { /*RATE_FILM_PER_STEP,*/ FILM_COUNT_PER_STEP, FILMS_LIST_CONFIG} from '../utils/const.js';


export default class FilmsPresenter {
  #filmsWrapper = new FilmsView();
  #mainFilmsList = new FilmsListView(FILMS_LIST_CONFIG.mainFilms.title, '', FILMS_LIST_CONFIG.mainFilms.titleClassName);
  #mainFilmsListContainer = new FilmsListContainerView();
  #topRatedFilmsList = new FilmsListView(FILMS_LIST_CONFIG.topRatedFilms.title, FILMS_LIST_CONFIG.topRatedFilms.containerClassName);
  #topRatedFilmsListContainer = new FilmsListContainerView();
  #mostCommentedFilmsList = new FilmsListView(FILMS_LIST_CONFIG.mostCommentedFilms.title, FILMS_LIST_CONFIG.mostCommentedFilms.containerClassName);
  #mostCommentedFilmsListContainer = new FilmsListContainerView();
  #loadingComponent = new LoadingView();
  #filmsContainer = null;
  #filmsModel = null;
  #topRatedFilms = [];
  #mostCommentedFilms = [];
  #filmPresenter = new Map();
  #commentsModel = null;
  #filmComments = [];
  #currentSortType = SortType.DEFAULT;
  #renderFilmCount = FILM_COUNT_PER_STEP;
  #filterType = FilterType.ALL;
  #showMoreButtonComponent = null;
  #sortComponent = null;
  #filterComponent = null;
  #filterModel = null;
  #noFilmsComponent = null;
  #isLoading = true;


  constructor(filmsContainer, filmsModel, commentsModel, filterModel){
    this.#filmsContainer = filmsContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.#filterModel = filterModel;

    this.#filmsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get films() {

    this.#filterType = this.#filterModel.filter;
    const films = [...this.#filmsModel.films];
    const filteredFilms = filter[this.#filterType](films);
    switch (this.#currentSortType) {
      case SortType.DATE_DOWN:
        return filteredFilms.sort(sortDateDown);
      case SortType.RATING_DOWN:
        return filteredFilms.sort(sortRateDown);
    }

    return filteredFilms;
  }

  init = () => {
    this.#renderBoard();
  };

  #renderBoard = () => {
    render(this.#mainFilmsList, this.#filmsWrapper.element, RenderPosition.AFTERBEGIN);

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if(this.films.length === 0 ){
      this.#renderNoFilms();
    } else {
      this.#renderSort();
      render(this.#filmsWrapper, this.#filmsContainer);
      render(this.#mainFilmsListContainer, this.#mainFilmsList.element);
      for(let i = 0; i < Math.min(this.films.length, this.#renderFilmCount); i++){
        this.#renderFilmCards(this.films[i], this.#commentsModel, this.#mainFilmsListContainer.element);
      }
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
    const filmPresenter = new FilmPresenter(container, this.#handleViewAction, this.#handleModeChange, this.#commentsModel);
    filmPresenter.init(card, comments);
    this.#filmPresenter.set(card.id, filmPresenter);
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this.#filmsModel.updateFilm(updateType, update);
        break;
      case UserAction.ADD_COMMENT:
        this.#filmsModel.updateFilm(updateType, update);
        break;
      case UserAction.DELETE_COMMENT:
        this.#filmsModel.updateFilm(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        if (this.#filmPresenter.get(data.id)) {
          this.#filmPresenter.get(data.id).init(data, this.#commentsModel.comments);
        }
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetRenderedFilmCount: true, resetSortType: true});
        this.#renderBoard();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderBoard();
        break;
    }
  };


  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType){
      return;
    }
    this.#currentSortType = sortType;
    this.#clearBoard({resetRenderedFilmCount: true});
    this.#renderBoard();
  };

  #renderSort = () => {
    this.#sortComponent = new SortFilmsView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#sortComponent, this.#filmsContainer);
  };

  #handleShowMoreButtonClick = () => {
    const filmCount = this.films.length;
    const newRenderedFilmCount = Math.min(filmCount, this.#renderFilmCount + FILM_COUNT_PER_STEP);
    const films = this.films.slice(this.#renderFilmCount, newRenderedFilmCount);
    films.forEach((card) => this.#renderFilmCards(card, this.#commentsModel, this.#mainFilmsListContainer.element));
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

  #renderNoFilms = () => {
    this.#noFilmsComponent = new NoFilmsView(this.#filterType);
    render(this.#noFilmsComponent, this.#mainFilmsList.element);
  };

  #renderLoading = () => {
    render(this.#loadingComponent, this.#mainFilmsList.element, RenderPosition.AFTERBEGIN);
  };

  #clearBoard = ({resetRenderedFilmCount = false, resetSortType = false} = {}) => {
    const filmCount = this.films.length;

    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();

    remove(this.#loadingComponent);
    remove(this.#sortComponent);
    remove(this.#filterComponent);
    remove(this.#showMoreButtonComponent);
    if (this.#noFilmsComponent) {
      remove(this.#noFilmsComponent);
    }

    if (resetRenderedFilmCount) {
      this.#renderFilmCount = FILM_COUNT_PER_STEP;
    } else {
      this.#renderFilmCount = Math.min(filmCount, this.#renderFilmCount);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  };


}
