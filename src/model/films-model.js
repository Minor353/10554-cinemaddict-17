import Observable from '../framework/observable';
import { UpdateType } from '../utils/const.js';

export default class FilmsModel extends Observable {
  #films = [];
  #apiService = null;

  constructor(apiService) {
    super();
    this.#apiService = apiService;

  }

  get films() {
    return this.#films;
  }

  init = async () => {
    try {
      const films = await this.#apiService.films;
      this.#films = films.map(this.#adaptFilmToClient);
    } catch(err) {
      this.#films = [];
    }
    this._notify(UpdateType.INIT);
  };

  updateFilm = async (updateType, update) => {
    const index = this.#films.findIndex((film) => film.id === update.id);

    if(index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    try {
      const response = await this.#apiService.updateFilm(update);
      const updatedTask = this.#adaptFilmToClient(response);
      this.#films = [
        ...this.#films.slice(0, index),
        updatedTask,
        ...this.#films.slice(index + 1),
      ];
      this._notify(updateType, updatedTask);
    } catch(err) {
      throw new Error('Can\'t update task');
    }
  };

  #adaptFilmToClient = (film) => {
    const adaptedFilm = {
      ...film,
      userDetails: {...film['user_details'],
        history: film['user_details']['already_watched']
      },
      filmInfo: {
        ...film['film_info'],
        ageRating: film['film_info']['age_rating'],
        alternativeTitle: film['film_info']['alternative_title'],
        totalRating: film['film_info']['total_rating']
      }
    };

    delete adaptedFilm['user_details']['already_watched'];
    delete adaptedFilm['film_info']['age_rating'];
    delete adaptedFilm['film_info']['alternative_title'];
    delete adaptedFilm['film_info']['total_rating'];
    delete adaptedFilm['film_info'];
    delete adaptedFilm['user_details'];

    return adaptedFilm;
  };
}
