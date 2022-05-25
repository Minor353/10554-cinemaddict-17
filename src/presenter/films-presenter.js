import FilmsView from '../view/films-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import NoFilmsView from '../view/no-films-view.js';
import SortFilmsView from '../view/sort-films-view.js';
import FilmPresenter from './film-presenter.js';
import MoreButtonPresenter from './more-button-presenter.js';
import {updateItem} from '../utils/common.js';
import {render} from '../framework/render.js';
import { RATE_FILM_PER_STEP, FILM_COUNT_PER_STEP, FILMS_LIST_CONFIG} from '../utils/const.js';


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
  #myFilms = [];
  #filmPresenter = new Map();
  #commentsModel = null;
  #filmComments = [];
  #renderedFilmCount = FILM_COUNT_PER_STEP;
  #sortFilms = new SortFilmsView();


  constructor(filmsContainer, filmsModel, commentsModel){
    this.#filmsContainer = filmsContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
  }

  init = () => {
    this.#myFilms = [...this.#filmsModel.films];
    this.#filmComments = [...this.#commentsModel.comments];
    this.#renderFilmsBoard();
  };

  #renderFilmsBoard = () => {
    if(this.#myFilms.length === 0 ){
      render(new NoFilmsView(), this.#filmsContainer);
    } else {
      render(this.#sortFilms, this.#filmsContainer);
      render(this.#filmsWrapper, this.#filmsContainer);
      render(this.#mainFilmsList, this.#filmsWrapper.element);
      render(this.#mainFilmsListContainer, this.#mainFilmsList.element);
      for(let i = 0; i < Math.min(this.#myFilms.length, FILM_COUNT_PER_STEP); i++){
        this.#renderFilmCards(this.#myFilms[i], this.#filmComments, this.#mainFilmsListContainer.element);
      }
      render(this.#topRatedFilmsList, this.#filmsWrapper.element);
      render(this.#topRatedFilmsListContainer, this.#topRatedFilmsList.element);
      for(let i = 0; i < Math.min(this.#myFilms.length, RATE_FILM_PER_STEP); i++){
        this.#renderFilmCards(this.#myFilms[i], this.#filmComments, this.#topRatedFilmsListContainer.element);
      }

      render(this.#mostCommentedFilmsList, this.#filmsWrapper.element);
      render(this.#mostCommentedFilmsListContainer, this.#mostCommentedFilmsList.element);
      for(let i = 0; i < Math.min(this.#myFilms.length, RATE_FILM_PER_STEP); i++){
        this.#renderFilmCards(this.#myFilms[i], this.#filmComments, this.#mostCommentedFilmsListContainer.element);
      }
      if (this.#myFilms.length > FILM_COUNT_PER_STEP) {
        this.#renderLoadMoreButton(this.#myFilms, this.#filmComments, this.#mainFilmsListContainer.element, this.#mainFilmsList.element, this.#renderFilmCards);
      }
    }

  };

  #renderFilmCards = (card, comments, container) => {
    const filmPresenter = new FilmPresenter(container, this.#handleFilmChange);
    filmPresenter.init(card, comments);
    this.#filmPresenter.set(card.id, filmPresenter);
  };

  #handleFilmChange = (updatedFilm, comments) => {
    this.#myFilms = updateItem(this.#myFilms, updatedFilm);
    this.#filmPresenter.get(updatedFilm.id).init(updatedFilm, comments);
  };

  #clearFilmList = () => {
    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();
    this.#renderedFilmCount = FILM_COUNT_PER_STEP;
  };

  #renderLoadMoreButton = (films, comments, filmsContainer, buttonContainer, onRenderFilmCards) => {
    const loadMoreButton = new MoreButtonPresenter(films, comments, filmsContainer, buttonContainer, onRenderFilmCards);
    loadMoreButton.init();
  };

}
