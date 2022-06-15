import {generateComment} from '../mock/comment.js';
import Observable from '../framework/observable';


export default class CommentsModel extends Observable {
  #comments = Array.from({length: 18}, generateComment);

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
