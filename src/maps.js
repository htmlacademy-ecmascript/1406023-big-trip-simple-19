import {FilterType, SortType} from './enums';

/**
 * @type {Record<string,FilterCallback<PointAdapter>>}
 */
export const filterCallbackMap = {
  [FilterType.EVERYTHING]: () => true,
  [FilterType.FUTURE]: (item) => Date.now() <= Date.parse(item.startDate)
};

/**
 * @type {Record<string,SortCallback<PointAdapter>>}
 */
export const sortCallbackMap = {
  [SortType.DAY]: (a, b) => Date.parse(a.startDate) - Date.parse(b.startDate),
  [SortType.EVENT]: () => 0,
  [SortType.TIME]: () => 0,
  [SortType.PRICE]: (a, b) => b.basePrice - a.basePrice,
  [SortType.OFFERS]: () => 0
};
