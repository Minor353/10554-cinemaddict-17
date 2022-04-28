import {render} from './render.js';
import ProfileRatingView from './view/profile-rating-view.js';
import NumberOfFilmsView from './view/number-of-films-view.js';
import MainNavigationView from './view/main-navigation-view.js';
import SortFilmsView from './view/sort-films-view.js';
import FilmsPresenter from './presenter/films-presenter.js';

const siteHeaderElement = document.querySelector('.header');
const siteFooterStatisticsElement = document.querySelector('.footer__statistics');
const siteMainElement = document.querySelector('.main');
const filmsPresenter = new FilmsPresenter();

render(new ProfileRatingView(), siteHeaderElement);
render(new MainNavigationView(), siteMainElement);
render(new SortFilmsView(), siteMainElement);
render(new NumberOfFilmsView(), siteFooterStatisticsElement);

filmsPresenter.init(siteMainElement);
