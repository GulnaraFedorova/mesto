import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallbackFunction) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__fieldset');
        this._inputs = Array.from(this._form.querySelectorAll('.popup__form'));
        this._submitCallbackFunction = submitCallbackFunction;
        this._submitButton = this._form.querySelector('.popup__button');
        this._buttonDefaultValue = this._submitButton.textContent;
    }

    _getInputValues() {
      const inputValues = {};
      this._inputs.forEach((input) => {
        inputValues[input.name] = input.value;
     });

      return inputValues;
    }

    changeSubmitHandler(newSubmitHandler) {
      this._submitCallbackFunction = newSubmitHandler
    }
    
    setEventListeners() {
      super.setEventListeners();
      this._form.addEventListener("submit", (evt) => {
        evt.preventDefault();
        this._submitButton.textContent = "Сохранение..."
        this._submitCallbackFunction(this._getInputValues());
        //super.close();
      });
    }

    setDefaultButtonText() {
      this._submitButton.textContent = this._buttonDefaultValue;
    }

    close() {
      this._form.reset();
      super.close();
    }
} 