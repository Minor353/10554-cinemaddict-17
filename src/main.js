import {render} from './framework/render.js';
import ProfileRatingView from './view/profile-rating-view.js';
import NumberOfFilmsView from './view/number-of-films-view.js';
import MainNavigationView from './view/main-navigation-view.js';

import FilmsPresenter from './presenter/films-presenter.js';
import FilmsModel from './model/films-model.js';
import CommentsModel from './model/comments-model.js';

const siteHeaderElement = document.querySelector('.header');
const siteFooterStatisticsElement = document.querySelector('.footer__statistics');
const siteMainElement = document.querySelector('.main');
const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel();
const filmsPresenter = new FilmsPresenter(siteMainElement, filmsModel, commentsModel);

render(new ProfileRatingView(), siteHeaderElement);
render(new MainNavigationView(filmsModel), siteMainElement);

render(new NumberOfFilmsView(), siteFooterStatisticsElement);

filmsPresenter.init();
