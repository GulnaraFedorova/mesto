export default class FormValidator {
  constructor (config, form) {
    this._config = config;
    this._form = form;
    this._inputs = Array.from(this._form.querySelectorAll(this._config.inputSelector)); 
    this._submitButton = this._form.querySelector(this._config.submitButtonSelector);
  }

  enableValidation () {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      });
    this._setEventListeners();
  }

  _setEventListeners () { 
    this._toggleButtonValidity(); 

    this._form.addEventListener("reset", () => {
      setTimeout(() => {
        this._toggleButtonValidity();
      }, 0);
    });

    this._inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButtonValidity();
      });
    });
  } 

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  }

  _showInputError = (input) => {
    const errorElement = this._form.querySelector(`#error-${ input.id }`); 
    input.classList.add(this._config.inputErrorClass); 
    errorElement.textContent = input.validationMessage; 
    errorElement.classList.add(this._config.errorSpan); 
  };

  _hideInputError = (input) => {
    const errorElement = this._form.querySelector(`#error-${ input.id }`); 
    input.classList.remove(this._config.inputErrorClass); 
    errorElement.classList.remove(this._config.errorSpan); 
    errorElement.textContent = ''; 
  };

  resetFormError() {
    this._toggleButtonValidity();

    this._inputs.forEach((input) => {
      this._hideInputError(input);
    });
  }

  _hasInvalidInput() {
    return this._inputs.some((input) => {
      return !input.validity.valid;
    });
  }
  
  _toggleButtonValidity () { 
    if (this._hasInvalidInput() ) { 
      this.disableButton(); 
    } else { 
      this.enableButton(); 
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
