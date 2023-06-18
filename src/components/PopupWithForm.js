import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
    constructor(popupSelector, {submitCallbackFunction}) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__fieldset');
        this._inputs = Array.from(this._form.querySelectorAll('.popup__form'));
        this._submitCallbackFunction = submitCallbackFunction;
    }

    _getInputValues() {
      this._inputValues = {};
      this._inputs.forEach((input) => {
        this._inputValues[input.name] = input.value;
      });
      return this._inputValues;
    }
    
      close() {
        this._form.reset();
        super.close();
      }
    
      setEventListener() {
        super.setEventListeners();
        this._form.addEventListener("submit", (evt) => {
          evt.preventDefault();
          this._submitCallbackFunction(this._getInputValues());
          this.close();
        });
      }
}