
let editPopup = document.querySelector('.popup');
 
let editPopupOpenButton = document.querySelector('.profile__edit');
editPopupOpenButton.addEventListener('click', function () {
    editPopup.classList.add('popup_opened');
});

let editPopupCloseButton = document.querySelector('.popup__close');
editPopupCloseButton.addEventListener('click', function () {
    editPopup.classList.remove('popup_opened');
});

function openPopup (popup) {
    popup.classList. add ('popup_opened"');
};

function closePopup (popup) {
    popup.classList.remove ('popup_opened');
}

let userName = 'Жак-Ив Кусто';
let userInformation = 'Исследователь океана';

let userNameElement = document.querySelector('.profile__title');
userNameElement.textContent = userName;

let userInformationElement = document.querySelector('.profile__text');
userInformationElement.textContent = userInformation;

let userNameInput = document.querySelector('.popup__form_name');
userNameInput.value = userName;

let userInformationInput = document.querySelector('.popup__form_information');
userInformationInput.value = userInformation;


userNameInput.addEventListener('input', function (evt) {
    const value = evt.target.value;
    userNameElement.textContent = value;
});

userInformationInput.addEventListener('input', function (evt) {
    const value = evt.target.value;
    userInformationElement.textContent = value;
});



let formElement = document.querySelector('.popup__fieldset');
function formSubmitHandler (evt) {
	evt.preventDefault(); 
    let userNameInput = document.querySelector('.popup__form_name');
    let userInformationInput = document.querySelector('.popup__form_information');
    userName.textContent = userNameInput.value
    userInformation.textContent = userInformationInput.value
}


formElement.addEventListener('submit', formSubmitHandler);