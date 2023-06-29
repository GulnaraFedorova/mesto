import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallbackFunction) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__fieldset');
        this._inputs = Array.from(this._form.querySelectorAll('.popup__form'));
        this._submitCallbackFunction = submitCallbackFunction;
    }

    _getInputValues() {
      const inputValues = {};
      this._inputs.forEach((input) => {
      inputValues[input.name] = input.value;
     });

    return inputValues;
    }
    
    setEventListeners() {
      super.setEventListeners();
      this._form.addEventListener("submit", (evt) => {
        evt.preventDefault();
        this._submitCallbackFunction(this._getInputValues());
        super.close();
      });
    }

    close() {
      this._form.reset();
      super.close();
    }
} 