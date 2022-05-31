import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { humanizeReleaseDate, transformIntToHour, humanizeCommentDay } from '../utils/humanize-date.js';
import { nanoid } from 'nanoid';

const createGenreTemplate = (genres) => genres.map((genre) => `<span class="film-details__genre">${genre}</span>`).join('');
const createCommentTemplate = (film, comments) => {
  const listComments = [];
  const idComments = new Set(film.comments);
  comments.forEach((element) => {
    if(idComments.has(element.id)){
      listComments.push(element);
    }
  });

  return listComments.map((comment) => (
    `
    <li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-smile">
            </span>
            <div>
              <p class="film-details__comment-text">${comment.comment}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${comment.author}</span>
                <span class="film-details__comment-day">${humanizeCommentDay(comment.date)}</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>
    `)).join('');
};

const showSelectedEmoji = (emoji) => emoji ? `<img src="${emoji}" width="55" height="55" alt="emoji">` : '';

const showTypedComment = (comment) => comment ? `<textarea class='film-details__comment-input' name='comment'>${comment}</textarea>` : '<textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>';


const createFilmDetailsTemplate = (film, comments, emojiSelected, typedComment) => {
  const genreTemplate = createGenreTemplate(film.film_info.genre);
  const commentTemplate = createCommentTemplate(film, comments);

  return (
    `
  <section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="./${film.film_info.poster}" alt="">

          <p class="film-details__age">${film.film_info.age_rating}+</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${film.film_info.title}</h3>
              <p class="film-details__title-original">${film.film_info.alternative_title}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${film.film_info.total_rating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${film.film_info.director.toString()}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${film.film_info.writers.toString()}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${film.film_info.actors.join(', ')}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${humanizeReleaseDate(film.film_info.release.date)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${transformIntToHour(film.film_info.runtime)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${film.film_info.release.release_country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">
                ${genreTemplate}
              </td>
            </tr>
          </table>

          <p class="film-details__film-description">
            ${film.film_info.description}
          </p>
        </div>
      </div>

      <section class="film-details__controls">
        <button type="button" class="film-details__control-button film-details__control-button--watchlist ${film['user_details'].watchlist && 'film-details__control-button--active'}" id="watchlist" name="watchlist">Add to watchlist</button>
        <button type="button" class="film-details__control-button film-details__control-button--watched ${film['user_details']['already_watched'] && 'film-details__control-button--active'}" id="watched" name="watched">Already watched</button>
        <button type="button" class="film-details__control-button film-details__control-button--favorite ${film['user_details'].favorite && 'film-details__control-button--active'}" id="favorite" name="favorite">Add to favorites</button>
      </section>
    </div>

    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${film.comments.length}</span></h3>

        <ul class="film-details__comments-list">
          ${commentTemplate}
          
        </ul>

        <div class="film-details__new-comment">
          <div class="film-details__add-emoji-label">
          ${showSelectedEmoji(emojiSelected)}
          </div>

          <label class="film-details__comment-label">
          ${showTypedComment(typedComment)}
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>
    </div>
  </form>
</section>
  `
  );};

export default class FilmDetailsView extends AbstractStatefulView {
  constructor(film, comments) {
    super();
    this._state = FilmDetailsView.parseDataToState(film, comments);
    this.#setInnerHandlers();
  }

  get template() {
    return createFilmDetailsTemplate(this._state, this._state.comments, this._state.emojiSelected, this._state.typedComment);
  }

  _restoreHandlers = () => {};

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#clickHandler);
  };

  setWatchlistClickHandler = (callback) => {
    this._callback.watchListClick = callback;
    this.element.querySelector('.film-details__control-button--watchlist').addEventListener('click', this.#watchListClickHandler);
  };

  setWatchedClickHandler = (callback) => {
    this._callback.watchedClick = callback;
    this.element.querySelector('.film-details__control-button--watched').addEventListener('click', this.#watchedClickHandler);
  };

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.film-details__control-button--favorite').addEventListener('click', this.#favoriteClickHandler);
  };

  #watchListClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchListClick();
  };

  #watchedClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchedClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };

  #emojiImageClickHandler = (evt) => {
    const commentText = this.element.querySelector('.film-details__comment-input').value;
    if (evt.target.nodeName === 'IMG') {
      const emojiName = evt.target.src;
      if(this._state.emojiSelected !== emojiName){
        const scrollPosition = this.element.scrollTop;
        this.updateElement({emojiSelected: emojiName, typedComment: commentText});
        this.element.scrollTop = scrollPosition;
      }
    }
  };

  #submitFormHandler = (evt) => {
    if (evt.ctrlKey && evt.code === 'Enter') {
      const scrollPosition = this.element.scrollTop;
      this._state.comments.push(this.#submitFormPressHandler());
      this.updateElement({emojiSelected: null, typedComment: null});
      this.element.scrollTop = scrollPosition;
    }
  };

  #submitFormPressHandler = () =>
    ({
      id: nanoid(),
      author: 'Ilya',
      comment: this.element.querySelector('.film-details__comment-input').value,
      date: humanizeCommentDay(new Date()),
      emotion: this.element.querySelector('.film-details__emoji-item:checked').value
    });

  #setInnerHandlers = () => {
    document.addEventListener('keypress', this.#submitFormHandler);
    this.element.querySelector('.film-details__emoji-list').addEventListener('click', this.#emojiImageClickHandler);
  };

  /*_restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setClickHandler(this._callback.clickHandler);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
    this.setWatchlistClickHandler(this._callback.watchlistClick);
    this.setWatchedClickHandler(this._callback.watchedClick);
  };*/

  static parseCommentToState = (comment) => this._state.comments.push(comment);

  static parseDataToState = (film, comments) => ({...film, comments, emojiSelected: null, typedComment: null});

}
