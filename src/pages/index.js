import Card from '../components/card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import Api from '../components/Api.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import {
  config,
  profileName,
  profileInformation,
  profileAvatar,
  profileNameInput,
  profileInformationInput,
  editPopup,
  editPopupOpenButton,
  cardsContainerSelector,
  cardSelector,
  addPopup,
  addPopupButton,
  imagePopupOpen,
  popupDelete,
  avatarPopup,
  avatarOpenButton,
} from '../utils/constants.js';
import '../pages/index.css'

let userId = 0;

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-68',
  headers: {
    authorization: 'd0842d8e-24a3-4e8f-ace1-cf6de81e0f55',
    'Content-Type': 'application/json'
  }
})

//размещение картинок
function createNewCard(data) {
  const card = new Card ({
    data, 
    handleCardClick: (name, link) =>{
     popupOpenImage.open(name, link);
    },
    handleDeleteClick: () =>{
      popupConfirm.open();
      popupConfirm.submitCallback(() => {
        api.deleteCard(card.getId()).then(() => {
          card.handleDelete();
          popupConfirm.close();
        })
        .catch((error) => console.error(`Ошибка в удалении карточки ${error}`))
        .finally(() => popupConfirm.setDefaultButtonText());
      })
    },
    handleDeleteLike: (cardId) => {
        api.deleteLike(cardId).then((data) => {
          card.handleLike(data)
        })
        .catch((error) => console.error(` Ошибка при снятии лайка ${error}`))
    },
    handleSetLike (cardId) {
        api.addLike(cardId).then((data) => {
          card.handleLike(data)
        })
        .catch((error) => console.error(`Ошибка при попытке поставить лайк ${error}`));
    },
  }, cardSelector, userId);
  return card.generateCard(); 
};

const section = new Section({renderer: (data) => {
  section.addItem(createNewCard(data))
}}, cardsContainerSelector);

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
const popupConfirm = new PopupWithConfirm(popupDelete);
popupConfirm.setEventListeners();

//popup добавления картинок
const popupNewPlace = new PopupWithForm (addPopup, handleFormCardAddSubmit)
popupNewPlace.setEventListeners();
function handleFormCardAddSubmit(data) {
  api.addCard(data.nameImg,data.linkImg)
  .then((res) => {
    section.addNewItem(createNewCard(res));
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

//данные юзера
const userInfo = new UserInfo({ 
  selectorUserName: profileName,
  selectorUserAbout: profileInformation,
  selectorUserAvatar: profileAvatar,
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