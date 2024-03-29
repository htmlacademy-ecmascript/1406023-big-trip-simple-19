
import NewPointEditorView from '../new-point-editor-view/new-point-editor-view';
import {html} from '../../utils';
import {deleteButtonTextMap} from '../../maps';


export default class PointEditorView extends NewPointEditorView {
  constructor() {
    super(...arguments);

    this.pointView = null;
    this.awaitDelete(false);

    this.querySelector('header')
      .insertAdjacentHTML('beforeend', this.createCloseButtonHtml());
  }

  /**
   * @override
   */
  open() {
    super.open();

    this.pointView = this.listView.findById(this.dataset.id);
    this.pointView.replaceWith(this);

    this.addEventListener('click', this.handleViewClick);
  }

  /**
   * @override
   */
  close() {
    this.replaceWith(this.pointView);
    this.pointView?.fadeInLeft();
    this.pointView = null;

    super.close(...arguments);
  }

  createCloseButtonHtml() {
    return html`
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Close event</span>
      </button>
    `;
  }

  /**
   * @param {boolean} flag
   */
  awaitDelete(flag) {
    const text = deleteButtonTextMap[Number(flag)];

    this.querySelector('.event__reset-btn').textContent = text;
    this.uiBlockerView.toggle(flag);

    return text;
  }

  /**
   * @param {MouseEvent & {target: Element}} event
   */
  handleViewClick(event) {
    if (event.target.closest('.event__rollup-btn')) {
      this.close();
    }
  }
}

customElements.define(String(PointEditorView), PointEditorView);

