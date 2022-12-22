import './views/filter-view/filter-view';
import './views/sort-view/sort-view';
import ListView from './views/list-view/list-view';
import './views/point-view/point-view';
import './views/new-point-editor-view/new-point-editor-view';
import Store from './store';

import CollectionModel from './models/collection-model';
import PointAdapter from './adapters/point-adapter';
import DestanationAdapter from './adapters/destination-adapter';
import offerGroupAdapter from './adapters/offer-group-adapter';

import { FilterType, SortType } from './enums';
import { filterCallbackMap, sortCallbackMap } from './maps';
import ListPresenter from './presenters/list-presenter';


const BASE = 'https://19.ecmascript.pages.academy/big-trip-simple';
const AUTH = 'Basic frd23sssfqw2de';

/**
 * @type {Store<Point>}
 */
const pointsStore = new Store(`${BASE}/points`, AUTH);
const pointsModel = new CollectionModel({
  store: pointsStore,
  adapt: (item) => new PointAdapter(item),
  filter: filterCallbackMap[FilterType.FUTURE],
  sort: sortCallbackMap[SortType.EVENT],
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
const listView = document.querySelector(String(ListView));

const { log } = console;

Promise.all(
  models.map((model) => model.ready())
)
  .then(async () => {
    new ListPresenter(listView, models);
  })

  .catch((error) => {
    log(error);
  });

