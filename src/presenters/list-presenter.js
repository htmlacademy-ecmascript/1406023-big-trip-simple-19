import {PointIconMap} from '../enums';
import {formatDate, formatNumber, formatTime} from '../utils';
import Presenter from './presenter';
import {pointTitleMap} from '../maps';

/**
 * @extends {Presenter<ListView>}
 */
export default class ListPresenter extends Presenter {
  constructor() {
    super(...arguments);

    this.updateView();
    this.view.addEventListener('edit', this.handleViewEdit.bind(this));
    this.pointsModel.addEventListener('filter', this.handlePointsModelFilter.bind(this));
    this.pointsModel.addEventListener('sort', this.handlePointsModelSort.bind(this));
    this.pointsModel.addEventListener('add', this.handlePointsModelAdd.bind(this));
    this.pointsModel.addEventListener('update', this.handlePointsModelUpdate.bind(this));
    this.pointsModel.addEventListener('delete', this.handlePointsModelDelete.bind(this));
  }

  updateView() {
    this.view.setItems(
      this.pointsModel
        .list()
        .map(this.createPointViewState, this)
    );
  }

  /**
   * @param {PointAdapter} point
   */
  createPointViewState(point) {
    const destination = this.destinationsModel.findById(point.destinationId);
    const offerGroup = this.offerGroupsModel.findById(point.type);

    const offerViewState = offerGroup.items
      .filter((offer) => point.offerIds.includes(offer.id))
      .map((offer) => (
        {
          title: offer.title,
          price: formatNumber(offer.price)
        }
      ));

    return {
      id: point.id,
      date: formatDate(point.startDate),
      icon: PointIconMap[point.type],
      title: `${pointTitleMap[point.type]} ${destination.name}`,
      startTime: formatTime(point.startDate),
      startDate: formatDate(point.endDate),
      endTime: formatTime(point.endDate),
      endDate: formatTime(point.endDate),
      basePrice: formatNumber(point.basePrice),
      offers: offerViewState
    };
  }

  handlePointsModelFilter() {
    this.updateView();
  }

  handlePointsModelSort() {
    this.updateView();
  }

  handlePointsModelAdd() {
    this.updateView();
  }

  handlePointsModelUpdate() {
    this.updateView();
  }

  handlePointsModelDelete() {
    this.updateView();
  }

  /**
   * @param {CustomEvent & {target: PointView}} event
   */
  handleViewEdit(event) {
    this.navigate('/edit', event.target.dataset);
  }
}
