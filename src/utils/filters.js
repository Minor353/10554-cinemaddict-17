import {FilterType} from '../utils/const.js';

const countFiltersData = (films) => {
  const filterCounts = {
    favorites: 0,
    watchlist: 0,
    alredyWatched: 0
  };

  const myFilms = [...films.films];

  myFilms.forEach((film) => {
    filterCounts.favorites = (film.userDetails.favorite) ? filterCounts.favorites += 1 : filterCounts.favorites += 0;
    filterCounts.watchlist = (film.userDetails.watchlist) ? filterCounts.watchlist += 1 : filterCounts.watchlist += 0;
    filterCounts.alredyWatched = (film.userDetails.history) ? filterCounts.alredyWatched += 1 : filterCounts.alredyWatched += 0;
  });

  return filterCounts;
};


export const filter = {
  [FilterType.ALL]: (arr) => arr,
  [FilterType.WATCH_LIST]: (arr) => arr.filter((film) => film.userDetails.watchlist),
  [FilterType.HISTORY]: (arr) => arr.filter((film) => film.userDetails.history),
  [FilterType.FAVORITES]: (arr) => arr.filter((film) => film.userDetails.favorite),
};

export {countFiltersData};
