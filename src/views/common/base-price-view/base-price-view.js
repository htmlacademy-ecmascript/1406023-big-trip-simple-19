import View from '../../view';
import {html} from '../../../utils';

export default class BasePriceView extends View {
  constructor() {
    super();

    this.classList.add('event__field-group', 'event__field-group--price');
  }

  /**
   * @override
   */
  createHtml() {
    return html`
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        €
      </label>
      <input
        class="event__input  event__input--price"
        id="event-price-1"
        type="number"
        name="base_price"
        min="1"
      >
    `;
  }

  /**
   * @param {number} state
   */
  setValue(state) {
    this.querySelector('input').valueAsNumber = state;
  }

  getValue() {
    return this.querySelector('input').valueAsNumber;
  }
}

customElements.define(String(BasePriceView), BasePriceView);
