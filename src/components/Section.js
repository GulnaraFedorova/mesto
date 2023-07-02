export default class Section {
  constructor({ renderer }, containerSelector) {
    //this._items = items;
    this._renderer = renderer;
    this._containerSelector = document.querySelector(containerSelector);
  }

  renderElements(items, userId) {
    items.forEach((item) => {
        this._renderer(item, userId);
    });
  }

  addItem(element) {
    this._containerSelector.prepend(this._renderer(element));
  }
}