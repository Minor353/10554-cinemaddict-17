import FilmsView from '../view/films-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import FilmCardView from '../view/film-card-view.js';
import FilmDetailsView from '../view/film-details-view.js';
import NoFilmsView from '../view/no-films-view.js';
import SortFilmsView from '../view/sort-films-view.js';
import {render} from '../render.js';

const FILM_COUNT_PER_STEP = 5;
const siteMainElement = document.querySelector('.main');

const FILMS_LIST_CONFIG = {
  mainFilms: {
    title: 'All movies. Upcoming',
    titleClassName: 'visually-hidden'
  },
  topRatedFilms: {
    title: 'Top rated',
    containerClassName: 'films-list--extra'
  },
  mostCommentedFilms: {
    title: 'Most commented',
    containerClassName: 'films-list--extra'
  },
};

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
  #commentsModel = null;
  #filmComments = [];
  #sortFilms = new SortFilmsView();
  #loadMoreButtonComponent = new ShowMoreButtonView();
  #renderedTaskCount = FILM_COUNT_PER_STEP;

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
      render(new NoFilmsView(), siteMainElement);
    } else {
      render(this.#sortFilms, siteMainElement);
      render(this.#filmsWrapper, this.#filmsContainer);
      render(this.#mainFilmsList, this.#filmsWrapper.element);
      render(this.#mainFilmsListContainer, this.#mainFilmsList.element);
      for(let i = 0; i < Math.min(this.#myFilms.length, FILM_COUNT_PER_STEP); i++){
        this.#renderFilmCards(this.#myFilms[i], this.#filmComments, this.#mainFilmsListContainer.element);
      }
      render(this.#topRatedFilmsList, this.#filmsWrapper.element);
      render(this.#topRatedFilmsListContainer, this.#topRatedFilmsList.element);
      for(let i = 0; i < 2; i++){
        this.#renderFilmCards(this.#myFilms[i], this.#filmComments, this.#topRatedFilmsListContainer.element);
      }

      render(this.#mostCommentedFilmsList, this.#filmsWrapper.element);
      render(this.#mostCommentedFilmsListContainer, this.#mostCommentedFilmsList.element);
      for(let i = 0; i < 2; i++){
        this.#renderFilmCards(this.#myFilms[i], this.#filmComments, this.#mostCommentedFilmsListContainer.element);
      }
      if (this.#myFilms.length > FILM_COUNT_PER_STEP) {
        render(this.#loadMoreButtonComponent, this.#mainFilmsList.element);

        this.#loadMoreButtonComponent.element.addEventListener('click', this.#handleLoadMoreButtonClick);
      }
    }

  };

  #handleLoadMoreButtonClick = (evt) => {
    evt.preventDefault();
    this.#myFilms
      .slice(this.#renderedTaskCount, this.#renderedTaskCount + FILM_COUNT_PER_STEP)
      .forEach((card) => this.#renderFilmCards(card, this.#filmComments, this.#mainFilmsListContainer.element));

    this.#renderedTaskCount += FILM_COUNT_PER_STEP;

    if (this.#renderedTaskCount >= this.#myFilms.length) {
      this.#loadMoreButtonComponent.element.remove();
      this.#loadMoreButtonComponent.removeElement();
    }
  };

  #renderFilmCards = (card, comments, container) => {
    const filmComponent = new FilmCardView(card);
    const filmDetailsComponent = new FilmDetailsView(card, comments);


    const showFilmDetailsPopup = () => {
      document.body.appendChild(filmDetailsComponent.element);
      document.body.classList.add('hide-overflow');
    };

    const hideFilmDetailsPopup = () => {
      document.body.removeChild(filmDetailsComponent.element);
      document.body.classList.remove('hide-overflow');
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        hideFilmDetailsPopup();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    filmComponent.element.querySelector('.film-card__link').addEventListener('click', (evt) => {
      evt.preventDefault();
      showFilmDetailsPopup();
      document.addEventListener('keydown', onEscKeyDown);
    });

    filmDetailsComponent.element.querySelector('.film-details__close-btn').addEventListener('click', () => {
      hideFilmDetailsPopup();
      document.removeEventListener('keydown', onEscKeyDown);
    });


    render(filmComponent, container);
  };
}
