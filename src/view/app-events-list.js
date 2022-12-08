import { createElement } from '../render';

function createAppEventsList() {
  return (
    `
    <ul class="trip-events__list">

    </ul>
    `
  );
}

export default class AppEventsList {
  getTemplate() {
    return createAppEventsList();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
