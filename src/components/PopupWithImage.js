import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
    constructor(popupElement) {
      super(popupElement);
      this._popupImage = this._popup.querySelector('.popup__image');
      this._popupName = this._popup.querySelector('.popup__caption');
    }
    
    open(item) {
      this._popupImage.src = item.link;
      this._popupImage.alt = item.name;
      this._popupName.textContent = item.name;
  
      super.open();
    }
}

