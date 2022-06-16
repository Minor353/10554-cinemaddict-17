import {render, replace, remove} from '../framework/render.js';
import FilterView from '../view/filters-view.js';
import {countFiltersData} from '../utils/filters.js';
import {FilterType, UpdateType} from '../utils/const.js';

export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #filmsModel = null;

  #filterComponent = null;

  constructor(filterContainer, filterModel, filmsModel) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#filmsModel = filmsModel;

    this.#filmsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const films = this.#filmsModel.films;
    const filtersData = countFiltersData(this.#filmsModel);
    return [
      {
        type: FilterType.ALL,
        name: 'All movies',
        count: films.length,
      },
      {
        type: FilterType.WATCH_LIST,
        name: 'Watchlist',
        count: filtersData.watchlist,
      },
      {
        type: FilterType.HISTORY,
        name: 'History',
        count: filtersData.alredyWatched,
      },
      {
        type: FilterType.FAVORITES,
        name: 'Favorites',
        count: filtersData.favorites,
      },
    ];
  }

  init = () => {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterView(filters, this.#filterModel.filter);
    this.#filterComponent.setFilterTypeChangeHandler(this.#handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  };

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
