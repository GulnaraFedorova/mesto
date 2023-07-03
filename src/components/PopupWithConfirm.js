/*import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
	constructor(popupSelector, handleButtonConfirm) {
		super(popupSelector);
        this._form = this._popup.querySelector('.popup__fieldset');
		this._submitButton = this._form.querySelector('.popup__button_confirmation');
		this._buttonDefaultValue = this._submitButton.textContent;
		this._handleButtonConfirm = handleButtonConfirm;
	}

	setEventListeners() {
		super.setEventListeners();
		this._form.addEventListener('click', () => {
			this._handleButtonConfirm();
			this._submitButton.textContent = "Удаление..."
		});
	}
	
	setDefaultButtonText() {
		this._submitButton.textContent = this._buttonDefaultValue;
	}

	close() {
      this._form.reset();
      super.close();
    }
}*/

import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
	constructor(popupSelector) {
		super(popupSelector);
		this._form = this._popup.querySelector('.popup__fieldset');
		this._submitButton = this._form.querySelector('.popup__button_confirmation');
		this._buttonDefaultValue = this._submitButton.textContent;

	}

	submitCallback(del) {
		this._handleSubmit = del;
	}

	setEventListeners() {
		super.setEventListeners();
		this._form.addEventListener('submit', (evt) => {
			evt.preventDefault();
			this._submitButton.textContent = "Удаление..."
			this._handleSubmit();
		});
	}

	setDefaultButtonText() {
		this._submitButton.textContent = this._buttonDefaultValue;
	}
}