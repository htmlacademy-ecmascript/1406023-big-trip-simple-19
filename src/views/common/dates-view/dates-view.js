import View from '../../view';
import { html } from '../../../utils';
import createCalendar from 'flatpickr';
import 'flatpickr/dist/flatpickr.css';

export default class DatesView extends View {
  /**
 * @type {Calendar}
 */
  #startDateCalendar;

  /**
   * @type {CalendarConfig}
   */
  #startDateConfig;

  /**
   * @type {Calendar}
   */
  #endDateCalendar;

  /**
   * @type {CalendarConfig}
   */
  #endDateConfig;

  constructor() {
    super();

    this.classList.add('event__field-group', 'event__field-group--time');
  }

  /**
   * @override
   */
  createHtml() {
    return html`
			<label class="visually-hidden" for="event-start-time-1">From</label>
			<input
        class="event__input  event__input--time"
        id="event-start-time-1"
        type="text"
        name="event-start-time"
      >
      —
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input
        class="event__input  event__input--time"
        id="event-end-time-1"
        type="text"
        name="event-end-time"
      >
    `;
  }

  /**
   * @param {CalendarConfig} config
   */
  setConfig(config) {
    const defaultConfig = {
      allowInput: true,
      enableTime: true,
      monthSelectorType: 'static',
      // disableMobile: true
    };

    //@ts-ignore
    this.#startDateConfig = {
      onChange: ([value]) => {
        this.#endDateCalendar.set('minDate', value);
      },
      ...defaultConfig,
      ...config
    };
    //@ts-ignore
    this.#endDateConfig = {
      ...defaultConfig,
      ...config
    };
  }

  createCalendars() {
    const [startDateView, endDateView] = this.querySelectorAll('input');

    this.#startDateCalendar = createCalendar(startDateView, this.#startDateConfig);
    this.#endDateCalendar = createCalendar(endDateView, this.#endDateConfig);
  }

  destroyCalebdars() {
    this.#startDateCalendar?.destroy();
    this.#endDateCalendar?.destroy();
  }

  /**
   * @param {string[]} dates
   */
  setValues(dates) {
    const [startDate, endDate] = dates;

    this.#startDateCalendar.setDate(startDate);
    this.#endDateCalendar.setDate(endDate);
  }

  getValues() {
    return [
      this.#startDateCalendar.selectedDates[0]?.toJSON(),
      this.#endDateCalendar.selectedDates[0]?.toJSON()
    ];
  }
}

customElements.define(String(DatesView), DatesView);
