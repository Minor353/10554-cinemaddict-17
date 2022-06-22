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

  set comments(comments) {
    this.#comments = comments;
  }


  deleteComment = async (id) => {
    const index = this.#comments.findIndex((comment) => comment.id === id);
    if (index === -1) {
      throw new Error('Can\'t detele unexisting comment');
    }

    try {
      await this.#apiService.deleteComment(id);
      this.#comments = [
        ...this.#comments.slice(0, index),
        ...this.#comments.slice(index + 1),
      ];
    } catch {
      throw new Error('Can\'t detele comment');
    }
  };

  addComment = async (filmId, update) => {
    try {
      const updatedData = await this.#apiService.addComment(filmId, update);
      this.#comments = updatedData.comments;
      return updatedData.movie;
    } catch {
      throw new Error('Can\'t add comment');
    }
  };

}
