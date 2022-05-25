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

export {FILM_COUNT_PER_STEP, RATE_FILM_PER_STEP, FILMS_LIST_CONFIG};
