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
      'user_details': {...film['user_details'],
        history: film['user_details']['already_watched']
      }
    };

    delete adaptedFilm['user_details']['already_watched'];

    return adaptedFilm;
  };
}
