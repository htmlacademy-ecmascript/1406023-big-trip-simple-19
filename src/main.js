import FilterView from './views/filter-view/filter-view';
import SortView from './views/sort-view/sort-view';
import ListView from './views/list-view/list-view';
import NewPointEditorView from './views/new-point-editor-view/new-point-editor-view';
import './views/point-view/point-view';
import Store from './store';

import CollectionModel from './models/collection-model';
import PointAdapter from './adapters/point-adapter';
import DestanationAdapter from './adapters/destination-adapter';
import offerGroupAdapter from './adapters/offer-group-adapter';

import { FilterType, SortType } from './enums';
import { filterCallbackMap, sortCallbackMap } from './maps';
import ListPresenter from './presenters/list-presenter';
import FilterPresenter from './presenters/filter-presenter';
import SortPresenter from './presenters/sort-presenter';
import NewPointButtonPresenter from './presenters/new-point-button-presenter';
import NewPointEditorPresenter from './presenters/new-point-editor-presenter';


const BASE = 'https://19.ecmascript.pages.academy/big-trip-simple';
const AUTH = 'Basic frd23sfqw2de';

/**
 * @type {Store<Point>}
 */
const pointsStore = new Store(`${BASE}/points`, AUTH);
const pointsModel = new CollectionModel({
  store: pointsStore,
  adapt: (item) => new PointAdapter(item),
  filter: filterCallbackMap[FilterType.EVERYTHING],
  sort: sortCallbackMap[SortType.DAY],
});

/**
 * @type {Store<Destination>}
 */
const destinationsStore = new Store(`${BASE}/destinations`, AUTH);
const destinationsModel = new CollectionModel({
  store: destinationsStore,
  adapt: (item) => new DestanationAdapter(item)
});
/**
 * @type {Store<OfferGroup>}
 */
const offerGroupsStore = new Store(`${BASE}/offers`, AUTH);
const offerGroupsModel = new CollectionModel({
  store: offerGroupsStore,
  adapt: (item) => new offerGroupAdapter(item)
});

const models = [pointsModel, destinationsModel, offerGroupsModel];
const filterView = document.querySelector(String(FilterView));
const listView = document.querySelector(String(ListView));
const sortView = document.querySelector(String(SortView));
const newPointButtonView = document.querySelector('.trip-main__event-add-btn');
const newPointEditorView = new NewPointEditorView(listView);

const { log } = console;

Promise.all(
  models.map((model) => model.ready())
)
  .then(async () => {
    new FilterPresenter(filterView, models);
    new SortPresenter(sortView, models);
    new ListPresenter(listView, models);
    new NewPointButtonPresenter(newPointButtonView, models);
    new NewPointEditorPresenter(newPointEditorView, models);
  })

  .catch((error) => {
    log(error);
  });

