import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { humanizeReleaseDate, transformIntToHour, humanizeCommentDay } from '../utils/humanize-date.js';
import he from 'he';

const createGenreTemplate = (genres) => genres.map((genre) => `<span class="film-details__genre">${genre}</span>`).join('');

const createCommentTemplate = (comments) => comments.map((comment) => (
  `
    <li class="film-details__comment" id="${comment.id}">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-smile">
            </span>
            <div>
              <p class="film-details__comment-text">${he.encode(comment.comment)}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${comment.author}</span>
                <span class="film-details__comment-day">${humanizeCommentDay(comment.date)}</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>
    `)).join('');

const showSelectedEmoji = (emoji) => emoji ? `<img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji">` : '';

const showTypedComment = (comment) => comment ? `<textarea class='film-details__comment-input' name='comment'>${comment}</textarea>` : '<textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>';

const setCheckedEmoji = (checkedEmoji, emojiName) => {
  if(checkedEmoji === emojiName){
    return checkedEmoji === emojiName ? 'checked' : '';
  }
};

const createFilmDetailsTemplate = ({film, comments, emojiSelected, typedComment}) => {
  const genreTemplate = createGenreTemplate(film.filmInfo.genre);
  const commentTemplate = createCommentTemplate(comments);

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
          <img class="film-details__poster-img" src="./${film.filmInfo.poster}" alt="">

          <p class="film-details__age">${film.filmInfo.age_rating}+</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${film.filmInfo.title}</h3>
              <p class="film-details__title-original">${film.filmInfo.alternativeTitle}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${film.filmInfo.totalRating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${film.filmInfo.director.toString()}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${film.filmInfo.writers.toString()}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${film.filmInfo.actors.join(', ')}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${humanizeReleaseDate(film.filmInfo.release.date)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${transformIntToHour(film.filmInfo.runtime)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${film.filmInfo.release.release_country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">
                ${genreTemplate}
              </td>
            </tr>
          </table>

          <p class="film-details__film-description">
            ${film.filmInfo.description}
          </p>
        </div>
      </div>

      <section class="film-details__controls">
        <button type="button" class="film-details__control-button film-details__control-button--watchlist ${film.userDetails.watchlist && 'film-details__control-button--active'}" id="watchlist" name="watchlist">Add to watchlist</button>
        <button type="button" class="film-details__control-button film-details__control-button--watched ${film.userDetails.history && 'film-details__control-button--active'}" id="watched" name="watched">Already watched</button>
        <button type="button" class="film-details__control-button film-details__control-button--favorite ${film.userDetails.favorite && 'film-details__control-button--active'}" id="favorite" name="favorite">Add to favorites</button>
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
            <input class="film-details__emoji-item visually-hidden" ${setCheckedEmoji(emojiSelected, 'smile')} name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" ${setCheckedEmoji(emojiSelected, 'sleeping')} name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" ${setCheckedEmoji(emojiSelected, 'puke')} name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" ${setCheckedEmoji(emojiSelected, 'angry')} name="comment-emoji" type="radio" id="emoji-angry" value="angry">
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
    return createFilmDetailsTemplate(this._state);
  }


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
    this.updateElement({emojiSelected: null, typedComment: null});
    this._callback.click();
  };

  #emojiImageClickHandler = (evt) => {
    const commentText = this.element.querySelector('.film-details__comment-input').value;
    if (evt.target.nodeName === 'INPUT') {
      const emojiName = evt.target.value;
      if(this._state.emojiSelected !== emojiName){
        const scrollPosition = this.element.scrollTop;
        this.updateElement({emojiSelected: emojiName, typedComment: commentText});
        this.element.scrollTop = scrollPosition;
      }
    }
  };


  #setInnerHandlers = () => {
    this.element.querySelector('.film-details__emoji-list').addEventListener('click', this.#emojiImageClickHandler);
  };

  setCommentAddHandler = (callback) => {
    this._callback.commentAdd = callback;
    this.element.querySelector('.film-details__comment-input').addEventListener('keydown', this.#commentAddHandler);
  };

  #commentAddHandler = (evt) => {
    if ((evt.ctrlKey && evt.code === 'Enter')) {
      const scrollPosition = this.element.scrollTop;
      this._callback.commentAdd({
        comment: this.element.querySelector('.film-details__comment-input').value,
        emotion: this.element.querySelector('.film-details__emoji-item:checked').value
      });
      this.updateElement({emojiSelected: null, typedComment: null});
      this.element.scrollTop = scrollPosition;
    }
  };

  setCommentDeleteClickHandler = (callback) => {
    this._callback.commentDeleteClick = callback;
    this.element.querySelectorAll('.film-details__comment-delete').forEach((element) => element.addEventListener('click', this.#commentDeleteClickHandler));
  };

  #commentDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.commentDeleteClick(evt.target.closest('.film-details__comment').id);
  };


  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setClickHandler(this._callback.click);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
    this.setWatchlistClickHandler(this._callback.watchlistClick);
    this.setWatchedClickHandler(this._callback.watchedClick);
    this.setCommentDeleteClickHandler(this._callback.commentDeleteClick);
    this.setCommentAddHandler(this._callback.commentAdd);
  };

  static parseCommentToState = (comment) => this._state.comments.push(comment);

  static parseDataToState = (film, comments) => ({film, comments, emojiSelected: null, typedComment: null});

}
