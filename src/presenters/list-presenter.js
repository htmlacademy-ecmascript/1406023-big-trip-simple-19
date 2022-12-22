import { PointIconMap } from '../enums';
import { formatDate, formatNumber, formatTime } from '../utils';
import Presenter from './presenter';
import { pointTitleMap } from '../maps';

/**
 * @extends {Presenter<ListView>}
 */
export default class ListPresenter extends Presenter {
  constructor() {
    super(...arguments);

    this.updateView();
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
    const offerViewState = offerGroup
      .items
      .filter((item) => point.offerIds.includes(item.id))
      .map((item) => (
        {
          id: item.id,
          title: item.title,
          price: formatNumber(item.price)
        }
      ));

    return {
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
}
