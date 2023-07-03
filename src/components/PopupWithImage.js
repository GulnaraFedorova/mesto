import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
    constructor(popupElement) {
      super(popupElement);
      this._popupImage = this._popup.querySelector('.popup__image');
      this._popupName = this._popup.querySelector('.popup__caption');
    }
    
    open(name, link) {
      this._popupImage.src = link;
      this._popupImage.alt = name;
      this._popupName.textContent = name;
  
      super.open();
    }
}

