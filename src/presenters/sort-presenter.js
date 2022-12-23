import Presenter from './presenter';
import { sortDisabilityMap, sortTitleMap, sortCallbackMap } from '../maps';
import { findKey } from '../utils';

/**
 * @extends {Presenter<SortView>}
 */
export default class SortPresenter extends Presenter {
  constructor() {
    super(...arguments);

    const options = Object.entries(sortTitleMap).map(([value, title]) => ({title, value}));

    this.view.setOptions(options);
    this.view.setDisability(Object.values(sortDisabilityMap));
    this.updateNewValue();
    this.view.addEventListener('change', this.handleViewSort.bind(this));
  }

  updateNewValue() {
    const sort = this.pointsModel.getSort();
    const sortType = findKey(sortCallbackMap, sort);

    this.view.setValue(sortType);
  }

  handleViewSort() {
    const sortType = this.view.getValue();
    this.pointsModel.setSort(sortCallbackMap[sortType]);
  }
}
