import Observable from '../framework/observable';


export default class CommentsModel extends Observable {
  #comments = [];
  #apiService = null;

  constructor(apiService) {
    super();
    this.#apiService = apiService;

  }

  getCommentsById = async (filmId) => {
    try {
      const comments = await this.#apiService.getComments(filmId);
      this.#comments = comments;
    } catch {
      this.#comments = [];
      throw new Error('Can\'t get comments by film ID');
    }

    return this.#comments;
  };

  get comments() {
    return this.#comments;
  }

  addComment = (updateType, update) => {
    this.#comments.push(update);
    this._notify(updateType, update);
  };

  deleteComment = (updateType, id) => {
    this.#comments = this.#comments.filter((comment) => comment.id !== id);

    this._notify(updateType, id);
  };

}
