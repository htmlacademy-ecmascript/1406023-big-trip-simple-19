import './view/filter-view/filter-view';
import './view/sort-view/sort-view';
import './view/list-view/list-view';
import './view/point-view/point-view';
import './view/new-point-editor-view/new-point-editor-view';
import Store from './store';

import CollectionModel from './models/collection-model';
import PointAdapter from './adapters/point-adapter';
import DestanationAdapter from './adapters/destination-adapter';
import offerGroupAdapter from './adapters/offer-group-adapter';

import {FilterType, SortType} from './enums';
import {filterCallbackMap, sortCallbackMap} from './maps';


const BASE = 'https://19.ecmascript.pages.academy/big-trip-simple';
const AUTH = 'Basic frd23sjd1ade';

/**
 * @type {Store<Point>}
 */
const pointsStore = new Store(`${BASE}/points`, AUTH);
const pointsModel = new CollectionModel({
  store: pointsStore,
  adapt: (item) => new PointAdapter(item),
  filter: filterCallbackMap[FilterType.EVERYTHING],
  sort: sortCallbackMap[SortType.DAY]
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

const { log, table } = console;

Promise.all(
  models.map((model) => model.ready())
)
  .then(() => {
    table(pointsModel.list());
    log('Points', pointsModel.listAll());
    log('Points: item', pointsModel.item(0));
    log('Points: findBy', pointsModel.findBy('basePrice', 300));
    log('Points: findById', pointsModel.findById('0'));
    log('Destinations', destinationsModel.listAll());
    log('Offer groups', offerGroupsModel.listAll());
  })

  .catch((error) => {
    log(error);
  });
