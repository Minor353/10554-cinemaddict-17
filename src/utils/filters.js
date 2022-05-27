
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
    filterCounts.alredyWatched = (film['user_details']['already_watched']) ? filterCounts.alredyWatched += 1 : filterCounts.alredyWatched += 0;
  });

  return filterCounts;
};

export {countFiltersData};
