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