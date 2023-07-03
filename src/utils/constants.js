//массив карточек 
export const initialItems = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

export const config = {
    formSelector: '.popup__fieldset',
    inputSelector: '.popup__form',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_type_error',
    inputErrorClass: 'popup__form_invalid',
    errorSpan: 'popup__input-error',
}

//открытие и закрытие окна редактирования профиля
export const profileName = document.querySelector('.profile__title');
export const profileInformation = document.querySelector('.profile__text');
export const profileAvatar = document.querySelector('.profile__avatar');

export const profileNameInput = document.querySelector ('.popup__form_type_name');
export const profileInformationInput = document.querySelector ('.popup__form_type_information');
export const editPopup = document.querySelector ('.popup_edit');
export const editFormElement = editPopup.querySelector ('.popup__fieldset_edit');
export const editPopupOpenButton = document.querySelector('.profile__edit');
//добавление массива карточек
export const cardsContainerSelector = '.elements__list';
//функция создания карточки
export const cardSelector = '#templateCard';
export const cardNameInput = document.querySelector ('.popup__form_card_name');
export const cardImageInput = document.querySelector ('.popup__form_card_image');
export const formAddElement = document.querySelector ('.popup__fieldset_add');
export const addPopup = document.querySelector ('.popup_add');
export const addPopupButton = document.querySelector('.profile__add');
export const closeButtons = document.querySelectorAll('.popup__close');
export const popupList = document.querySelectorAll('.popup');
export const elementsImg = document.querySelector('.popup__image');
export const imagePopupOpen  = document.querySelector ('.popup_openimage');

export const popupDelete = document.querySelector('.popup_confirmation');
export const avatarPopup = document.querySelector ('.popup_avatar');
export const avatarOpenButton = document.querySelector('.profile__edit-avatar');
export const editFormAvatar = editPopup.querySelector ('.popup__fieldset_avatar');

