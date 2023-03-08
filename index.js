let profileName = document.querySelector ('.profile__title');
let profileInformation = document.querySelector ('.profile__text');
let profileNameInput = document.querySelector ('.popup__input_type_name');
let profileInformationInput = document.querySelector ('.popup__input_type_information');
let popupCloseButton = document.querySelector ('.popup__close');
let formElement = document.querySelector ('.popup__fieldset');
let editPopup = document.querySelector ('.popup');
let editPopupButton = document.querySelector('.profile__edit');

function openPopup () {
    editPopup.classList. add ('popup_opened');
    profileNameInput.value = profileName.textContent;
    profileInformationInput.value = profileInformation.textContent;
};

function closePopup () {
    editPopup.classList.remove ('popup_opened');
}

function formSubmitHandler (evt) {
	evt.preventDefault(); 
    profileName.textContent = profileNameInput.value;
    profileInformation.textContent = profileInformationInput.value;
    closePopup ();
}

editPopupButton.addEventListener ('click', openPopup);
popupCloseButton.addEventListener ('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);
