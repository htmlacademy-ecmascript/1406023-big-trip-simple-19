import View from '../view';
import {html} from '../../utils';
import PointTypeView from '../common/point-type-view/point-type-view';
import DestinationView from '../common/destination-view/destination-view';
import DateView from '../common/date-view/date-view';
import BasePriceView from '../common/base-price-view/base-price-view';
import OffersView from '../common/offers-view/offers-view';
import DestinationDetailsView from '../common/destination-details-view/destination-details-view';

export default class NewPointEditorView extends View {
  constructor() {
    super();

    this.classList.add('trip-events__item');
  }

  /**
   * @override
   */
  createHtml() {
    return html`
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <${PointTypeView}></${PointTypeView}>
          <${DestinationView}></${DestinationView}>
          <${DateView}></${DateView}>
          <${BasePriceView}></${BasePriceView}>
          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Cancel</button>
        </header>
        <section class="event__details">
          <${OffersView}></${OffersView}>
          <${DestinationDetailsView}></${DestinationDetailsView}>
        </section>
      </form>
    `;
  }
}

customElements.define(String(NewPointEditorView), NewPointEditorView);
