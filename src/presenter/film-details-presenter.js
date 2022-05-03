import {render} from '../render.js';
import FilmDetailsView from '../view/film-details-view.js';

export default class FilmDetailsPresenter {

  init = (filmDetailsContainer, filmsModel, commentsModel) => {
    this.filmDetailsContainer = filmDetailsContainer;
    this.filmsModel = filmsModel;
    this.myFilms = [...this.filmsModel.getFilms()];
    this.commentsModel = commentsModel;
    this.comments = [...this.commentsModel.getComments()];
    render(new FilmDetailsView(this.myFilms[0], this.comments), this.filmDetailsContainer);
  };
}
