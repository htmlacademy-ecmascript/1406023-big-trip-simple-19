import Adapter from './adapter';

export default class PointAdapter extends Adapter {
  /**
   * @param {Point} data
   */
  constructor(data) {
    super();

    this.basePrice = data.base_price;
    this.startDate = data.date_from;
    this.endDate = data.date_to;
    this.distinationId = String(data.destination);
    this.id = data.id;
    this.offerIds = data.offers?.map(String);
    this.type = data.type;
  }

  /**
* @override
* @return {Partial<Point>}
*/
  toJSON() {
    return {
      'base_price': this.basePrice,
      'date_from': this.startDate,
      'date_to': this.endDate,
      'destination': Number(this.distinationId),
      'id': this.id,
      'offers': this.offerIds?.map(Number),
      'type': this.type
    };
  }
}
