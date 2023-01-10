import Presenter from './presenter';
import { filterTitleMap, filterCallbackMap } from '../maps';
import { findKey } from '../utils';

/**
 * @extends {Presenter<FilterView>}
 */
export default class FilterPresenter extends Presenter {
  constructor() {
    super(...arguments);

    const options = Object.entries(filterTitleMap).map(([value, title]) => ({title, value}));

    this.view.setOptions(options);
    this.updateNewValue();
    this.view.addEventListener('change', this.handleViewChange.bind(this));
  }

  updateNewValue() {
    const filter = this.pointsModel.getFilter();
    const filterType = findKey(filterCallbackMap, filter);

    this.view.setValue(filterType);
  }

  handleViewChange() {
    const filterType = this.view.getValue();

    this.navigate('/');
    this.pointsModel.setFilter(filterCallbackMap[filterType]);
  }
}
