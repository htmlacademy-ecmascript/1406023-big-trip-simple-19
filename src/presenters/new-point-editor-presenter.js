import { pointTitleMap } from '../maps';
import Presenter from './presenter';
import { PointType } from '../enums';

/**
 * @extends {Presenter<NewPointEditorView>}
 */
export default class NewPointEditorPresenter extends Presenter {
  constructor() {
    super(...arguments);

    const pointTypeOptions =
      Object.entries(pointTitleMap)
        .map(([value, title]) => ({ title, value }));

    const destinationOption =
      this.destinationsModel
        .listAll()
        .map((item) => ({
          title: '',
          value: item.name
        }));

    this.view.pointTypeView.setOptions(pointTypeOptions);
    this.view.pointTypeView.addEventListener('change', this.handlePointTypeViewChange.bind(this));

    this.view.destinationView.setOptions(destinationOption);

    this.view.addEventListener('submit', this.handleViewSubmit.bind(this));
    this.view.addEventListener('reset', this.handleViewReset.bind(this));
    this.view.addEventListener('close', this.handleViewClose.bind(this));
  }

  /**
   *
   * @param {PointAdapter} point
   */
  updateView(point) {
    const destination = this.destinationsModel.findById(point.destinationId);

    this.view.pointTypeView.setValue(point.type);
    this.view.destinationView.setLabel(pointTitleMap[point.type]);
    this.view.destinationView.setValue(destination.name);

    this.updateOffersView(point.offerIds);
  }

  /**
   * @param {string[]} offerIds
   */
  updateOffersView(offerIds = []) {
    const pointType = this.view.pointTypeView.getValue();

    offerIds = this.offerGroupsModel.findBy('type', pointType).items
      .map((item) => (`${item.id}`));

    if (offerIds.length === 0) {
      this.view.offersView.hidden = true;
    }

    else {
      this.view.offersView.hidden = false;


      const offers = this.offerGroupsModel.findBy('type', pointType).items
        .map((item) => ({
          id: item.id,
          price: String(item.price),
          title: item.title,
          checked: false
        }));

      this.view.offersView.setOptions(offers);
    }
  }

  /**
   * @override
   */
  handleNavigation() {
    if (this.location.pathname === '/new') {
      const point = this.pointsModel.item(0);

      point.type = PointType.TRAIN;
      point.destinationId = this.destinationsModel.item(0).id;
      point.startDate = new Date().toJSON();
      point.endDate = point.startDate;
      point.basePrice = 175;

      this.view.open();
      this.updateView(point);
    }
    else {
      this.view.close(false);
    }
  }

  /**
   * @param {SubmitEvent} event
   */
  handleViewSubmit(event) {
    event.preventDefault();
  }

  handleViewReset() {
    this.view.close();
  }

  handleViewClose() {
    this.navigate('/');
  }

  handlePointTypeViewChange() {
    const pointType = this.view.pointTypeView.getValue();

    this.view.destinationView.setLabel(pointTitleMap[pointType]);

    this.updateOffersView();
  }
}
