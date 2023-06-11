import {cards, config} from './constants.js';
import Card from './card.js';
import FormValidator from './FormValidator.js';

//открытие и закрытие окна редактирования профиля
const profileName = document.querySelector ('.profile__title');
const profileInformation = document.querySelector ('.profile__text');
const profileNameInput = document.querySelector ('.popup__form_type_name');
const profileInformationInput = document.querySelector ('.popup__form_type_information');
const editPopup = document.querySelector ('.popup_edit');
const editFormElement = editPopup.querySelector ('.popup__fieldset_edit');
const editPopupOpenButton = document.querySelector('.profile__edit');
//добавление массива карточек
const elementsList = document.querySelector('.elements__list');
//функция создания карточки
const elementsTemplate = elementsList.querySelector('#templateCard');
const cardNameInput = document.querySelector ('.popup__form_card_name');
const cardImageInput = document.querySelector ('.popup__form_card_image');
const formAddElement = document.querySelector ('.popup__fieldset_add');
const addPopup = document.querySelector ('.popup_add');
const addPopupButton = document.querySelector('.profile__add');
const closeButtons = document.querySelectorAll('.popup__close');
const popupList = document.querySelectorAll('.popup')

const createNewCard = (newCard, openPopup, template) => {
  const card = new Card(newCard, openPopup, template)
  return card.generateCard()
}

const cardFormValidator = new FormValidator (config, formAddElement);
cardFormValidator.enableValidation()

const profileFormValidator = new FormValidator (config, editFormElement);
profileFormValidator.enableValidation()

//универсальная функция открытия
const openPopup = (popup)=>{
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeEscape);
};

//универсальная функция закрытия
const closePopup = (popup)=> {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeEscape);
};

//закрытие формы через ESC
function closeEscape(evt){
  if (evt.key === 'Escape'){
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  };
};

//закрытие при клике на оверлей 
popupList.forEach(function(popup){
  popup.addEventListener('mousedown', (evt) =>{
    if (evt.target.classList.contains('popup')){
      closePopup(popup);
    }
  });
});

// находим все крестики проекта по универсальному селектору
closeButtons.forEach((button) => {
  // находим 1 раз ближайший к крестику попап 
  const popup = button.closest('.popup');
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener('click', () => closePopup(popup));
});

const addCard = (newCard) => {
  elementsList.prepend(newCard);
}

const addCardElement = (newCard) => {
  elementsList.append(newCard)
}

cards.forEach(newCard => {
  addCardElement (createNewCard(newCard, openPopup, elementsTemplate))
})

//редактирование профиля
editPopupOpenButton.addEventListener ('click', () => {
  openPopup(editPopup);
  profileNameInput.value = profileName.textContent;
  profileInformationInput.value = profileInformation.textContent;
  profileFormValidator.enableValidation(editFormElement)
});

editFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault(); //отключить дефолтную отправку
    profileName.textContent = profileNameInput.value;
    profileInformation.textContent = profileInformationInput.value;
    closePopup(editPopup);
});

function handleAddFormSubmit (evt) {
	evt.preventDefault(); 

  const link = cardImageInput.value;
  const name = cardNameInput.value;
  const alt = cardNameInput.value;
  const newCard = {
    name: name,
    link: link,
  };
    addCard(createNewCard(newCard, openPopup, elementsTemplate));
    closePopup(addPopup);
    formAddElement.reset();
};

addPopupButton.addEventListener ('click', () => {
  formAddElement.reset()
  openPopup(addPopup);
  cardFormValidator.enableValidation(formAddElement)
});

formAddElement.addEventListener('submit', handleAddFormSubmit);
