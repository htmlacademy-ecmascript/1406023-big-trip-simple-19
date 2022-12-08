import BoardPresenter from './presenter/board-presenter';
import AppEventsList from './view/app-events-list';
import AppSort from './view/app-sort';
import AppFilter from './view/app-filter';
import { render } from './render';

const siteMainElement = document.querySelector('.trip-events');
const filters = document.querySelector('.trip-controls__filters');

render(new AppFilter(), filters);
render(new AppSort(), siteMainElement);
render(new AppEventsList(), siteMainElement);

const boardContainer = siteMainElement.querySelector('.trip-events__list');

const boardPresenter = new BoardPresenter({boardContainer: boardContainer});

boardPresenter.init();


