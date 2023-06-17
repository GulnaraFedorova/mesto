import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallbackFunction) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__fieldset');
        this._inputs = Array.from(this._form.querySelectorAll('.popup__form'));
        this._submitCallbackFunction = submitCallbackFunction;
    }

    _getInputValues() {
        this._formValues = {};
    
        this._inputs.forEach(input => {
          this._formValues[input.name] = input.value;
        });
        return this._formValues;
      }
    
      getFormValues() {
        return this._getInputValues();
      }
    
      getFormElement() {
        return this._form;
      }
    
      close() {
        this._form.reset();
        super.close();
      }
    
      setEventListener() {
        this._form.addEventListener('submit', (evt) => this._submitCallbackFunction(evt));
        super.setEventListener();
      }
}