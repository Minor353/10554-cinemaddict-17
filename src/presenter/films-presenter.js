import FilmsView from '../view/films-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import FilmCardView from '../view/film-card-view.js';
import {render} from '../render.js';

export default class FilmsPresenter {
  filmsWrapper = new FilmsView();
  mainFilmsList = new FilmsListView('All movies. Upcoming', ' ', 'visually-hidden');
  mainFilmsListContainer = new FilmsListContainerView();
  topRatedFilmsList = new FilmsListView('Top rated', 'films-list--extra');
  topRatedFilmsListContainer = new FilmsListContainerView();
  mostCommentedFilmsList = new FilmsListView('Most commented', 'films-list--extra');
  mostCommentedFilmsListContainer = new FilmsListContainerView();

  init = (filmsContainer) => {
    this.filmsContainer = filmsContainer;

    render(this.filmsWrapper, this.filmsContainer);

    render(this.mainFilmsList, this.filmsWrapper.getElement());
    render(this.mainFilmsListContainer, this.mainFilmsList.getElement());
    for(let i = 0; i < 5; i++){
      render(new FilmCardView(), this.mainFilmsListContainer.getElement());
    }
    render(new ShowMoreButtonView(), this.mainFilmsList.getElement());

    render(this.topRatedFilmsList, this.filmsWrapper.getElement());
    render(this.topRatedFilmsListContainer, this.topRatedFilmsList.getElement());
    for(let i = 0; i < 2; i++){
      render(new FilmCardView(), this.topRatedFilmsListContainer.getElement());
    }

    render(this.mostCommentedFilmsList, this.filmsWrapper.getElement());
    render(this.mostCommentedFilmsListContainer, this.mostCommentedFilmsList.getElement());
    for(let i = 0; i < 2; i++){
      render(new FilmCardView(), this.mostCommentedFilmsListContainer.getElement());
    }
  };
}
