import FilmsView from '../view/films-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import FilmCardView from '../view/film-card-view.js';
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
  filmsWrapper = new FilmsView();
  mainFilmsList = new FilmsListView(FILMS_LIST_CONFIG.mainFilms.title, '', FILMS_LIST_CONFIG.mainFilms.titleClassName);
  mainFilmsListContainer = new FilmsListContainerView();
  topRatedFilmsList = new FilmsListView(FILMS_LIST_CONFIG.topRatedFilms.title, FILMS_LIST_CONFIG.topRatedFilms.containerClassName);
  topRatedFilmsListContainer = new FilmsListContainerView();
  mostCommentedFilmsList = new FilmsListView(FILMS_LIST_CONFIG.mostCommentedFilms.title, FILMS_LIST_CONFIG.mostCommentedFilms.containerClassName);
  mostCommentedFilmsListContainer = new FilmsListContainerView();

  init = (filmsContainer, filmsModel) => {
    this.filmsContainer = filmsContainer;
    this.filmsModel = filmsModel;
    this.myFilms = [...this.filmsModel.getFilms()];

    render(this.filmsWrapper, this.filmsContainer);

    render(this.mainFilmsList, this.filmsWrapper.getElement());
    render(this.mainFilmsListContainer, this.mainFilmsList.getElement());
    for(let i = 0; i < this.myFilms.length; i++){
      render(new FilmCardView(this.myFilms[i]), this.mainFilmsListContainer.getElement());
    }
    render(new ShowMoreButtonView(), this.mainFilmsList.getElement());

    render(this.topRatedFilmsList, this.filmsWrapper.getElement());
    render(this.topRatedFilmsListContainer, this.topRatedFilmsList.getElement());
    for(let i = 0; i < 2; i++){
      render(new FilmCardView(this.myFilms[i]), this.topRatedFilmsListContainer.getElement());
    }

    render(this.mostCommentedFilmsList, this.filmsWrapper.getElement());
    render(this.mostCommentedFilmsListContainer, this.mostCommentedFilmsList.getElement());
    for(let i = 0; i < 2; i++){
      render(new FilmCardView(this.myFilms[i]), this.mostCommentedFilmsListContainer.getElement());
    }
  };
}
