import {FilterType, SortType, PointType, buttomState} from './enums';

export const filterTitleMap = {
  [FilterType.EVERYTHING]: 'Everything',
  [FilterType.FUTURE]: 'Future'
};

/**
 * @type {Record<string,FilterCallback<PointAdapter>>}
 */
export const filterCallbackMap = {
  [FilterType.EVERYTHING]: () => true,
  [FilterType.FUTURE]: (item) => Date.now() < item.endDateIsNumber
};

export const sortTitleMap = {
  [SortType.DAY]: 'Day',
  [SortType.EVENT]: 'Event',
  [SortType.TIME]: 'Time',
  [SortType.PRICE]: 'Price',
  [SortType.OFFERS]: 'Offers'
};

export const sortDisabilityMap = {
  [SortType.DAY]: false,
  [SortType.EVENT]: true,
  [SortType.TIME]: true,
  [SortType.PRICE]: false,
  [SortType.OFFERS]: true
};

/**
 * @type {Record<string,SortCallback<PointAdapter>>}
 */
export const sortCallbackMap = {
  [SortType.DAY]: (item, nextItem) => item.startdDateIsNumber - nextItem.startdDateIsNumber,
  [SortType.EVENT]: () => 0,
  [SortType.TIME]: () => 0,
  [SortType.PRICE]: (item, nextItem) => nextItem.basePrice - item.basePrice,
  [SortType.OFFERS]: () => 0
};

export const pointTitleMap = {
  [PointType.TAXI]: 'Taxi',
  [PointType.BUS]: 'Bus',
  [PointType.TRAIN]: 'Train',
  [PointType.SHIP]: 'Ship',
  [PointType.DRIVE]: 'Drive',
  [PointType.FLIGHT]: 'Flight',
  [PointType.CHECK_IN]: 'Check-in',
  [PointType.SIGHTSEEING]: 'Sightseeing',
  [PointType.RESTAURANT]: 'Restaurant'
};

export const saveButtonTextMap = {
  [buttomState.DEFAULT]: 'Save',
  [buttomState.PRESSED]: 'Saving...'
};

export const deleteButtonTextMap = {
  [buttomState.DEFAULT]: 'Delete',
  [buttomState.PRESSED]: 'Deleting...'
};
