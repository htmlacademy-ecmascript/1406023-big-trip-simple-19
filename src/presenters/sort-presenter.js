import Presenter from './presenter';
import {sortDisabilityMap, sortTitleMap, sortCallbackMap} from '../maps';
import {SortType} from '../enums';
import {findKey} from '../utils';

/**
 * @extends {Presenter<SortView>}
 */
export default class SortPresenter extends Presenter {
  constructor() {
    super(...arguments);

    const options = Object.entries(sortTitleMap).map(([value, title]) => ({title, value}));

    this.view.setOptions(options);
    this.view.setDisability(Object.values(sortDisabilityMap));
    this.updateViewValue();
    this.updateViewVisibility();
    this.view.addEventListener('change', this.handleViewChange.bind(this));

    this.pointsModel.addEventListener('add', this.handlePointModelAdd.bind(this));
    this.pointsModel.addEventListener('update', this.handlePointModelUpdate.bind(this));
    this.pointsModel.addEventListener('delete', this.handlePointModelDelete.bind(this));
    this.pointsModel.addEventListener('filter', this.handlePointModelFilter.bind(this));
  }

  updateViewValue() {
    const sort = this.pointsModel.getSort();
    const sortType = findKey(sortCallbackMap, sort);

    this.view.setValue(sortType);
  }

  updateViewVisibility() {
    this.view.hidden = !this.pointsModel.list().length;
  }

  handleViewChange() {
    const sortType = this.view.getValue();

    this.navigate('/');
    this.pointsModel.setSort(sortCallbackMap[sortType]);
  }

  handlePointModelAdd() {
    this.updateViewVisibility();
  }

  handlePointModelUpdate() {
    this.updateViewVisibility();
  }

  handlePointModelDelete() {
    this.updateViewVisibility();
  }

  handlePointModelFilter() {
    this.pointsModel.setSort(sortCallbackMap[SortType.DAY], false);

    this.updateViewValue();
    this.updateViewVisibility();
  }
}
