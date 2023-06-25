import {initialItems, config} from '../../src/components/constants.js';
import Card from '../components/card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';

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

//popup
const popupOpenImage = new PopupWithImage (imagePopupOpen);
popupOpenImage.setEventListeners();

//размещение картинок
function createNewCard(item) {
  return new Card (item, cardSelector, () =>{
    popupOpenImage.open (item);
  }).generateCard();
};

const section = new Section({items: initialItems, renderer: createNewCard}, cardsContainerSelector);
section.renderElements();


//добавления картинок
const popupNewPlace = new PopupWithForm (addPopup, handleFormCardAddSubmit);
popupNewPlace.setEventListeners();

function handleFormCardAddSubmit() {
  const card = {
    name: cardNameInput.value,
    link: cardImageInput.value,
  };
  section.addItem(card);
}

addPopupButton.addEventListener ('click', () => {
  popupNewPlace.open();
  cardFormValidator.resetFormError();
});

const cardFormValidator = new FormValidator (config, addPopup);
cardFormValidator.enableValidation();

//данные юзера
const userInfo = new UserInfo({ 
  profileName,
  profileInformation,
});

//редактирование профиля
const popupProfile = new PopupWithForm (editPopup, handleFormSubmit)
popupProfile.setEventListeners();

function handleFormSubmit({ userName, userDescription }) {
  userInfo.setUserInfo({ userName, userDescription });
  popupProfile.close();
  }

editPopupOpenButton.addEventListener ('click', () => {
  profileFormValidator.resetFormError();
  popupProfile.open();
  const userInfoData = userInfo.getUserInfo();
  profileNameInput.value = userInfoData.userName;
  profileInformationInput.value = userInfoData.userDescription;
});

const profileFormValidator = new FormValidator (config, editPopup);
profileFormValidator.enableValidation();

/////////////