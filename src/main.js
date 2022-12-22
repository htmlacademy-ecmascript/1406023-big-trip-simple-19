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

import { FilterType, SortType } from './enums';
import { filterCallbackMap, sortCallbackMap } from './maps';


const BASE = 'https://19.ecmascript.pages.academy/big-trip-simple';
const AUTH = 'Basic frd23sssd1fqw2de';

/**
 * @type {Store<Point>}
 */
const pointsStore = new Store(`${BASE}/points`, AUTH);
const pointsModel = new CollectionModel({
  store: pointsStore,
  adapt: (item) => new PointAdapter(item),
  filter: filterCallbackMap[FilterType.FUTURE],
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

const { log, table } = console;

Promise.all(
  models.map((model) => model.ready())
)
  .then(() => {
    table(pointsModel.list());
  })

  .catch((error) => {
    log(error);
  });

async function test() {
  const date = new Date().toJSON();
  const item = await pointsStore.add({
    'base_price': 9999,
    'date_from': date,
    'date_to': date,
    'destination': 1,
    'offers': [],
    'type': 'bus'
  });
  item['base_price'] = 200000;
  await pointsStore.update(item);
  await pointsStore.delete(item.id);

  table(pointsModel.listAll());
}

test();

