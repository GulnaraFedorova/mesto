import {config} from '../../src/components/constants.js';
import Card from '../components/card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import Api from '../components/Api.js';
//import PopupWithConfirm from '../components/PopupWithConfirm.js';

import '../pages/index.css'

//открытие и закрытие окна редактирования профиля
const profileName = '.profile__title';
const profileInformation = '.profile__text';
const profileAvatar = '.profile__avatar';

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

const popupDelete = document.querySelector('.popup_confirmation');
const avatarPopup = document.querySelector ('.popup_avatar');
const avatarOpenButton = document.querySelector('.profile__edit-avatar');
const editFormAvatar = editPopup.querySelector ('.popup__fieldset_avatar');
let userId = 0;

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-68',
  headers: {
    authorization: 'd0842d8e-24a3-4e8f-ace1-cf6de81e0f55',
    'Content-Type': 'application/json'
  }
})

//данные юзера
const userInfo = new UserInfo({ 
  profileName,
  profileInformation,
  profileAvatar,
});


//размещение картинок
function createNewCard(item, userId) {
  const card = new Card (
    item, 
    cardSelector,
    () =>{
     popupOpenImage.open(item)
    },
    (id) =>{
      //console.log('id', id)
      popupConfirm.open( )
      popupConfirm.changeSubmitHandler(() => {
        api.deleteCard(id).then(() => {
          card.handleDelete();
          popupConfirm.close();
        })
        .catch((error) => console.error(`Ошибка в удалении карточки ${error}`))
        .finally(() => popupConfirm.setDefaultButtonText());
      })
    },
    (id) => {
      if(card.isLiked()){
        api.deleteLike(id).then(res => {
          card.handleLike(res.likes)
          .catch((error) => console.error(`Ошибка при снятии лайка ${error}`))
        })
      } else {
        api.addLike(id).then(res => {
          card.handleLike(res.likes)
          .catch((error) => console.error(`Ошибка при попытке поставить лайк ${error}`));
        })
      }
    }, userId
  );
  return card.generateCard();
};

const section = new Section({renderer: createNewCard}, cardsContainerSelector);

Promise.all([api.getUser(), api.getCards()])
    .then(([data, cards]) => {
      userId = data._id;
      userInfo.setUserInfo(data);
      section.renderElements(cards);
    })
    .catch((error) =>
        console.error(`Ошибка при загрузке данных с сервера - ${error}`)
    );
   
//popup открытие попапа просмотра изображения
const popupOpenImage = new PopupWithImage (imagePopupOpen);
popupOpenImage.setEventListeners();

//popup открытие попапа подтверждения удаления
const popupConfirm = new PopupWithForm(popupDelete);
popupConfirm.setEventListeners();

//popup добавления картинок
const popupNewPlace = new PopupWithForm (addPopup, handleFormCardAddSubmit)
popupNewPlace.setEventListeners();
function handleFormCardAddSubmit(data) {
  api.addCard(data.nameImg,data.linkImg)
  .then((res) => {
    section.addItem(createNewCard(res));
    popupNewPlace.close();
  })
  .catch((error => console.error(`Ошибка при попытке создать карточку ${error}`)))
  .finally(() => popupNewPlace.setDefaultButtonText());
} 
const cardFormValidator = new FormValidator (config, addPopup);
cardFormValidator.enableValidation();
addPopupButton.addEventListener ('click', () => {
  popupNewPlace.open();
  cardFormValidator.resetFormError();
});

//редактирование профиля
const popupProfile = new PopupWithForm (editPopup, handleFormSubmit)
popupProfile.setEventListeners();
function handleFormSubmit(data) {
  return api.updateProfileInfo(data)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupProfile.close()
    })
    .catch((error => console.error(`Ошибка редактирования профиль ${error}`)))
    .finally(() => popupProfile.setDefaultButtonText());
}
const profileFormValidator = new FormValidator (config, editPopup);
profileFormValidator.enableValidation();
editPopupOpenButton.addEventListener ('click', () => {
  popupProfile.open();
  profileFormValidator.resetFormError();
  const inputText = userInfo.getUserInfo();
  profileNameInput.value = inputText.name;
  profileInformationInput.value = inputText.about;
});

//редактирование аватара
const popupAvatar = new PopupWithForm(avatarPopup, handleEditAvatar);
popupAvatar.setEventListeners();
function handleEditAvatar(data) {
  api.updateAvatar(data)
      .then((res) => {
				userInfo.setUserInfo(res)
        popupAvatar.close();
      })
  .catch((error => console.error(`Ошибка смены аватара ${error}`)))
  .finally(() => popupAvatar.setDefaultButtonText());
}
const avatarFormValidator = new FormValidator(config, avatarPopup );
avatarFormValidator.enableValidation();
avatarOpenButton.addEventListener('click', () => {
  popupAvatar.open();
  avatarFormValidator.resetFormError();
});