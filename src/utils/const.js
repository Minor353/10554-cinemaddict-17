const FILM_COUNT_PER_STEP = 5;
const RATE_FILM_PER_STEP = 2;

const FILMS_LIST_CONFIG = {
  mainFilms: {
    title: 'All movies. Upcoming',
    titleClassName: 'visually-hidden'
  },
  topRatedFilms: {
    title: 'Top rated',
    containerClassName: 'films-list--extra'
  },
  mostCommentedFilms: {
    title: 'Most commented',
    containerClassName: 'films-list--extra'
  },
};

const SortType = {
  DEFAULT: 'default',
  DATE_DOWN: 'date-down',
  RATING_DOWN: 'reting-down',
};

const UserAction = {
  UPDATE_FILM: 'UPDATE_FILM',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
  UPDATE_POPUP: 'UPDATE_POPUP',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

const FilterType = {
  ALL: 'all',
  WATCH_LIST: 'watchlist',
  HISTORY: 'history',
  FAVORITES: 'favorite',
};

export {FILM_COUNT_PER_STEP, RATE_FILM_PER_STEP, FILMS_LIST_CONFIG, SortType, UserAction, UpdateType, FilterType};
