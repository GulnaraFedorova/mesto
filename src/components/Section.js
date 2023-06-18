export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerSelector = document.querySelector(containerSelector);
  }

  renderElements() {
    this._items.forEach((item) => {
      this._containerSelector.append(this._renderer(item));
    });
  }

  addItem(element) {
    this._containerSelector.prepend(this._renderer(element));
  }
}