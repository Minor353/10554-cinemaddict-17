import FilmsView from '../view/films-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import FilmCardView from '../view/film-card-view.js';
import FilmDetailsView from '../view/film-details-view.js';
import {render} from '../render.js';

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

  init = (filmsContainer, filmsModel, commentsModel) => {
    this.#filmsContainer = filmsContainer;
    this.#filmsModel = filmsModel;
    this.#myFilms = [...this.#filmsModel.films];
    this.#commentsModel = commentsModel;
    this.#filmComments = [...this.#commentsModel.comments];


    render(this.#filmsWrapper, this.#filmsContainer);

    render(this.#mainFilmsList, this.#filmsWrapper.element);
    render(this.#mainFilmsListContainer, this.#mainFilmsList.element);
    for(let i = 0; i < this.#myFilms.length; i++){
      this.#renderFilmCards(this.#myFilms[i], this.#filmComments, this.#mainFilmsListContainer.element);
    }
    render(new ShowMoreButtonView(), this.#mainFilmsList.element);

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
      }
    };

    filmComponent.element.querySelector('.film-card__link').addEventListener('click', (evt) => {
      evt.preventDefault();
      showFilmDetailsPopup();
      document.addEventListener('keydown', onEscKeyDown);
    });

    filmDetailsComponent.element.querySelector('.film-details__close-btn').addEventListener('click', () => {
      hideFilmDetailsPopup();
    });


    render(filmComponent, container);
  };
}
