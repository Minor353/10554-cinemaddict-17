import {render} from './framework/render.js';
import ProfileRatingView from './view/profile-rating-view.js';
import NumberOfFilmsView from './view/number-of-films-view.js';

import FilterModel from './model/filter-model.js';
import FilmsPresenter from './presenter/films-presenter.js';
import FilmsModel from './model/films-model.js';
import CommentsModel from './model/comments-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilmsApiService from './films-api-service.js';

const AUTHORIZATION = 'Basic hS2sf35344wcl1deq2j';
const END_POINT = 'https://17.ecmascript.pages.academy/cinemaddict';


const siteHeaderElement = document.querySelector('.header');
const siteFooterStatisticsElement = document.querySelector('.footer__statistics');
const siteMainElement = document.querySelector('.main');
const filterModel = new FilterModel();
const filmsModel = new FilmsModel(new FilmsApiService(END_POINT, AUTHORIZATION));
const commentsModel = new CommentsModel(new FilmsApiService(END_POINT, AUTHORIZATION));
const filmsPresenter = new FilmsPresenter(siteMainElement, filmsModel, commentsModel, filterModel);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, filmsModel);

render(new ProfileRatingView(), siteHeaderElement);
render(new NumberOfFilmsView(), siteFooterStatisticsElement);
filmsModel.init();
filmsPresenter.init();
filterPresenter.init();
