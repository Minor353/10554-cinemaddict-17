import ApiService from './framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

export default class TasksApiService extends ApiService {
  get films () {
    return  this._load({url: 'movies'})
      .then(ApiService.parseResponse);
  }

  updateFilm = async (film) => {
    const response = await this._load({
      url: `movies/${film.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptFilmToServer(film)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  };

  #adaptFilmToServer = (film) => {
    const adaptedFilm = {
      ...film,
      'user_details': {...film['user_details'],
        'already_watched': film['user_details'].history
      }
    };

    delete adaptedFilm['user_details'].history;

    return adaptedFilm;
  };

  getComments = (filmId) => this._load({url: `comments/${filmId}`})
    .then(ApiService.parseResponse);
}
