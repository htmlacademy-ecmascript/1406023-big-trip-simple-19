import Adapter from './adapter';

export default class offerGroupAdapter extends Adapter {
  /**
   * @param {Partial<OfferGroup>} data
   */
  constructor(data = {}) {
    super();

    this.type = data.type;
    this.offers = data.offers;
  }

  /**
  * @override
  * @return {Partial<OfferGroup>}
  */
  toJSON() {
    return {
      'type' : this.type,
      'offers': this.offers
    };
  }
}
