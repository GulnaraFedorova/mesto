export default class Section {
  constructor({ renderer }, containerSelector) {
    //this._items = items;
    this._renderer = renderer;
    this._containerSelector = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._containerSelector.append(element);
  }

  renderElements(items) {
    items.forEach((item) => {
        this._renderer(item);
    });
  }

  addNewItem(element) {
    this._containerSelector.prepend(element);
  }
}