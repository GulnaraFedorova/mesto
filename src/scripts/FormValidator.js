export default class FormValidator {
  constructor (config, form) {
    this._config = config;
    this._form = form;
    //this._inputs = Array.from(this._form.querySelectorAll(`.${this._config.inputSelector}`));
    //this._submitButton = this._form.querySelector(`.${this._config.submitButtonSelector}`);
    this._inputs = Array.from(this._form.querySelectorAll(this._config.inputSelector)); 
    this._submitButton = this._form.querySelector(this._config.submitButtonSelector);
  }

  enableValidation () {
    this._setEventListeners();
  }

  _setEventListeners () { 
    this._inputs.forEach((input) => {
      input.addEventListener('input', () => { 
        this._checkInputValidity (input); 
        this._toggleButtonValidity(); 
      }); 
    }); 
  } 
       
  _checkInputValidity (input) { 
    const errorElement = this._form.querySelector(`#error-${ input.id }`); 
  
    if (input.checkValidity() ) { 
      input.classList.remove(this._config.inputErrorClass); 
      errorElement.classList.remove(this._config.errorSpan); 
      errorElement.textContent = ''; 
    } else { 
      input.classList.add(this._config.inputErrorClass); 
      errorElement.textContent = input.validationMessage; 
      errorElement.classList.add(this._config.errorSpan); 
    } 
  } 
  /* 
  resetFormError() { 
    this._inputs.forEach(input => { 
      const errorElement = this._form.querySelector(`#error-${ input.id }`); 
      _hideError(input, errorElement); 
    }); 
  } */ 
  
  _toggleButtonValidity () { 
    if (this._form.checkValidity() ) { 
      this.enableButton(); 
    } else { 
      this.disableButton(); 
    } 
  } 
  
  disableButton () { 
    this._submitButton.setAttribute('disabled', ''); 
    this._submitButton.classList.add(this._config.inactiveButtonClass) 
    }; 
  
  enableButton () { 
    this._submitButton.removeAttribute('disabled'); 
    this._submitButton.classList.remove(this._config.inactiveButtonClass) 
    }; 
};
