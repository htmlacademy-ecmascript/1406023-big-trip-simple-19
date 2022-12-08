import AppEditForm from '../view/app-edit-form';
import AppWaypoint from '../view/app-waypoint';
import AppCreateForm from '../view/app-create-form';
import { render } from '../render';

export default class BoardPresenter {
  appEditForm = new AppEditForm();
  appCreateForm = new AppCreateForm();

  constructor({boardContainer}) {
    this.boardContainer = boardContainer;
  }

  init() {
    render(this.appCreateForm, this.boardContainer);
    render(this.appEditForm, this.boardContainer);

    for (let index = 0; index < 3; index++) {
      render(new AppWaypoint, this.boardContainer);
    }
  }
}
