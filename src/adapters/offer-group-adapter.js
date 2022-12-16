import Adapter from './adapter';

export default class offerGroupAdapter extends Adapter {
  /**
   * @param {OfferGroup} data
   */
  constructor(data) {
    super();

    this.type = data.type;
    this.items = data.offers.map((item) => ({
      ...item,
      id: String(item.id)
    }));
  }

}
