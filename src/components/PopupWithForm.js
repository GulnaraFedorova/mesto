import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__fieldset');
        this._inputs = Array.from(this._form.querySelectorAll('.popup__form'));
        this._handleFormSubmit = handleFormSubmit;
    }

    _getInputValues() {
      const inputValues = {};
      this._inputs.forEach((input) => {
      inputValues[input.name] = input.value;
      });
      return inputValues;
    }

      setEventListener() {
        super.setEventListeners();
        this._form.addEventListener("submit", (evt) => {
          evt.preventDefault();
          this._handleFormSubmit(this._getInputValues());
          this.close();
        });
      }

      close() {
        super.close();
        this._form.reset();
      }
}
////////