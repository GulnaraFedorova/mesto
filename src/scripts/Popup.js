export default class Popup {
    constructor(popupSelector) {
        this._popup = popupSelector;
        this._closeButton = this._popup.querySelector('.popup__close');
        this._closeEscape = this._closeEscape.bind(this);
    }
    //универсальная функция открытия
    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener("keydown", this._closeEscape);
    }
    //универсальная функция закрытия
    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener("keydown", this._closeEscape);
    }
    //закрытие формы через ESC
    _closeEscape(event) {
        if (event.key === 'Escape') {
            this.close()};
    }

    setEventListeners() {
        this._closeButton.addEventListener('click', () => {
            this.close()
        });
        
        this._popup.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup')) {
                this.close()
        }})
    }
}
