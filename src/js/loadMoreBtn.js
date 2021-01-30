export default class LoadMoreBtn {
  constructor({ selector, hidden = false }) {
    this.refs = this.getRefs(selector);

    hidden && this.hide(); //замена if (hidden) {this.hide()}
  }

  getRefs(selector) {
    const refs = {};
    refs.button = document.querySelector(selector);
    refs.loader = refs.button.querySelector('.loader');
    refs.label = refs.button.querySelector('.label');
    return refs;
  }
  enable() {
    this.refs.button.disabled = false;
    this.refs.label.textContent = 'Show more';
    this.refs.loader.classList.add('is-hidden');
  }

  disable() {
    this.refs.button.disabled = true;
    this.refs.label.textContent = 'Loading';
    this.refs.loader.classList.remove('is-hidden');
  }

  show() {
    this.refs.button.classList.remove('is-hidden');
  }

  hide() {
    this.refs.button.classList.add('is-hidden');
  }
}
