import Presenter from './presenter';

/**
 * @extends {Presenter<HTMLParagraphElement>}
 */
export default class EmptyListPresenter extends Presenter {
  constructor() {
    super(...arguments);

    this.pointsModel.addEventListener('add', this.handlePointModelAdd.bind(this));
    this.pointsModel.addEventListener('update', this.handlePointModelUpdate.bind(this));
    this.pointsModel.addEventListener('delete', this.handlePointModelDelete.bind(this));
    this.pointsModel.addEventListener('filter', this.handlePointModelFilter.bind(this));
  }

  updateView() {

  }

  handlePointModelAdd() {
    this.updateView();
  }

  handlePointModelUpdate() {
    this.updateView();
  }

  handlePointModelDelete() {
    this.updateView();
  }

  handlePointModelFilter() {
    this.updateView();
  }
}
