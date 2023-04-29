//открытие и закрытие окна редактирования профиля
const profileName = document.querySelector ('.profile__title');
const profileInformation = document.querySelector ('.profile__text');
const profileNameInput = document.querySelector ('.popup__form_type_name');
const profileInformationInput = document.querySelector ('.popup__form_type_information');
const editPopup = document.querySelector ('.popup_edit');
const editFormElement = editPopup.querySelector ('.popup__fieldset_edit');
const editPopupCloseButton = editPopup.querySelector ('.popup__close_edit');
const editPopupOpenButton = document.querySelector('.profile__edit');

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
const popupList =document.querySelectorAll('.popup')
popupList.forEach(function(popup){
  popup.addEventListener('mousedown', (evt) =>{
    if (evt.target.classList.contains('popup')){
      closePopup(popup);
    }
  });
});

//редактирование профиля
editPopupOpenButton.addEventListener ('click', () => {
  openPopup(editPopup);
  profileNameInput.value = profileName.textContent;
  profileInformationInput.value = profileInformation.textContent;
});

// находим все крестики проекта по универсальному селектору
const closeButtons = document.querySelectorAll('.popup__close');

closeButtons.forEach((button) => {
  // находим 1 раз ближайший к крестику попап 
  const popup = button.closest('.popup');
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener('click', () => closePopup(popup));
});


editFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault(); //отключить дефолтную отправку
    profileName.textContent = profileNameInput.value;
    profileInformation.textContent = profileInformationInput.value;
    closePopup(editPopup);
});

//добавление массива карточек
const elementsList = document.querySelector('.elements__list');
const elementsTemplate = elementsList.querySelector('#templateCard');
const imagePopupOpen = document.querySelector('.popup_openimage');
const imagePopupClose = imagePopupOpen.querySelector('.popup__close_img');
const fullImage = imagePopupOpen.querySelector('.popup__image'); 
const captionImage = imagePopupOpen.querySelector('.popup__caption');

//метод создания элемента карточки
const createCard = (card) => {
  const newCard = elementsTemplate.content.cloneNode(true);
  const elementsImg = newCard.querySelector ('.elements__img');
  elementsImg.src = card.link;
  newCard.querySelector('.elements__text').textContent = card.name;
  elementsImg.alt = card.name;
  //посмотреть картинку 
  elementsImg.addEventListener('click', ()=> {
    openPopup(imagePopupOpen);
    fullImage.src = card.link;
    captionImage.textContent = card.name;
    fullImage.setAttribute('alt', card.name);
  });

//удаление карточки
  const deleteButton = newCard.querySelector('.elements__delete');
  deleteButton.addEventListener('click', (evt) => {
    const button = evt.target;
    const card = button.closest('.elements__blok');
    card.remove();
  });
//лайк
  const likeButton = newCard.querySelector('.elements__like');
  likeButton.addEventListener('click', () =>
  likeButton.classList.toggle('elements__like_active'));

  return newCard;
};
//метод создания карточки
const addCard = (card) => {
  const newCard = createCard(card);
  elementsList.prepend(newCard);
}
cards.forEach(addCard);


//функция создания карточки
const cardNameInput = document.querySelector ('.popup__form_card_name');
const cardImageInput = document.querySelector ('.popup__form_card_image');
const popupAddCloseButton = document.querySelector ('.popup__close_add');
const formAddElement = document.querySelector ('.popup__fieldset_add');
const addPopup = document.querySelector ('.popup_add');
const addPopupButton = document.querySelector('.profile__add');

function formAddSubmitHandler (evt) {
	evt.preventDefault(); 
  const form = evt.target;
  const link = cardImageInput.value;
  const name = cardNameInput.value;
  const alt = cardNameInput.value;
  const card = {
    name: name,
    link: link,
  };
    addCard(card);
    closePopup(addPopup);
    form.reset();
};

addPopupButton.addEventListener ('click', () => {
  openPopup(addPopup);
});
popupAddCloseButton.addEventListener ('click', () => {
  closePopup(addPopup);
});

formAddElement.addEventListener('submit', formAddSubmitHandler);