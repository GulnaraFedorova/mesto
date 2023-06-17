import {initialItems, config} from './constants.js';
import Card from './card.js';
import FormValidator from './FormValidator.js';
import PopupWithForm from './PopupWithForm.js'
import PopupWithImage from './PopupWithImage.js';
import UserInfo from './UserInfo.js';
import Section from './Section.js';

import '../pages/index.css';

//открытие и закрытие окна редактирования профиля
const profileName = '.profile__title';
const profileInformation = '.profile__text';
const profileNameInput = document.querySelector ('.popup__form_type_name');
const profileInformationInput = document.querySelector ('.popup__form_type_information');
const editPopup = document.querySelector ('.popup_edit');
const editFormElement = editPopup.querySelector ('.popup__fieldset_edit');
const editPopupOpenButton = document.querySelector('.profile__edit');
//добавление массива карточек
const cardsContainerSelector = '.elements__list';
//функция создания карточки
const cardSelector = '#templateCard';
const cardNameInput = document.querySelector ('.popup__form_card_name');
const cardImageInput = document.querySelector ('.popup__form_card_image');
const formAddElement = document.querySelector ('.popup__fieldset_add');
const addPopup = document.querySelector ('.popup_add');
const addPopupButton = document.querySelector('.profile__add');
const closeButtons = document.querySelectorAll('.popup__close');
const popupList = document.querySelectorAll('.popup');
const elementsImg = document.querySelector('.popup__image');
const imagePopupOpen  = document.querySelector ('.popup_openimage');

//данные юзера
const userInfo = new UserInfo({ profileName, profileInformation });

//popup
const popupOpenImage = new PopupWithImage (imagePopupOpen);
popupOpenImage.setEventListeners();

//размещение картинок
function createNewCard(item) {
return new Card (item, cardSelector, () =>{
  popupOpenImage.open (item.link, item.name);
}).generateCard();
};

const section = new Section(
  { items: initialItems, renderer: createNewCard}, cardsContainerSelector);
section.renderElements();

//добавления картинок
const popupNewPlace = new PopupWithForm(addPopup, handleAddFormSubmit);
popupNewPlace.setEventListeners();

function handleAddFormSubmit() {
  const newCard = {
    name: cardNameInput.value,
    link: cardImageInput.value,
    alt: cardNameInput.value,
  };
  section.addItem(newCard);
  formAddElement.reset(newCard);
}

const cardFormValidator = new FormValidator (config, popupNewPlace.getFormElement());
cardFormValidator.enableValidation()

addPopupButton.addEventListener ('click', () => {
  popupNewPlace.open();
  cardFormValidator.disableButton(formAddElement);
});

//редактирование профиля
const popupProfile = new PopupWithForm(editPopup, editFormElement);
popupProfile.setEventListeners();

editFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault(); //отключить дефолтную отправку
    const formValues = popupProfile.getFormValues();
    userInfo.setUserInfo({ userName: formValues.title, userDescription: formValues.subtitle });
    popupProfile.close();
});

const profileFormValidator = new FormValidator (config, popupProfile.getFormElement());
profileFormValidator.enableValidation()

editPopupOpenButton.addEventListener ('click', () => {
  const userInfoData = userInfo.getUserInfo();
  const profileForm = popupProfile.getFormElement();
  profileForm.elements.name.value = userInfoData.userName;
  //profileForm.elements.description.value = userInfoData.userDescription;
  popupProfile.open();
});

//formAddElement.addEventListener('submit', handleAddFormSubmit);
