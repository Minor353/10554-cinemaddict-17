import {FilterType} from '../utils/const.js';

const countFiltersData = (films) => {
  const filterCounts = {
    favorites: 0,
    watchlist: 0,
    alredyWatched: 0
  };

  const myFilms = [...films.films];

  myFilms.forEach((film) => {
    filterCounts.favorites = (film['user_details'].favorite) ? filterCounts.favorites += 1 : filterCounts.favorites += 0;
    filterCounts.watchlist = (film['user_details'].watchlist) ? filterCounts.watchlist += 1 : filterCounts.watchlist += 0;
    filterCounts.alredyWatched = (film['user_details'].history) ? filterCounts.alredyWatched += 1 : filterCounts.alredyWatched += 0;
  });

  return filterCounts;
};


export const filter = {
  [FilterType.ALL]: (arr) => arr,
  [FilterType.WATCH_LIST]: (arr) => arr.filter((film) => film['user_details'].watchlist),
  [FilterType.HISTORY]: (arr) => arr.filter((film) => film['user_details'].history),
  [FilterType.FAVORITES]: (arr) => arr.filter((film) => film['user_details'].favorite),
};

export {countFiltersData};
