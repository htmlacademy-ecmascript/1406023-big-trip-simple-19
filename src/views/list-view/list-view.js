import View from '../view';
import PointView from '../point-view/point-view';
export default class ListView extends View {
  /**
   * @param {PointViewState[]} states
   */
  setItems(states) {
    const views = states.map((state) => new PointView(state));

    this.replaceChildren(...views);
  }
}

customElements.define(String(ListView), ListView);
