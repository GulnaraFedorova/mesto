//редактирование профиля, открытие и закрытие окна редактирования профиля
const profileName = document.querySelector ('.profile__title');
const profileInformation = document.querySelector ('.profile__text');
const profileNameInput = document.querySelector ('.popup__form_type_name');
const profileInformationInput = document.querySelector ('.popup__form_type_information');
const editPopup = document.querySelector ('.popup_edit');
const formElement = editPopup.querySelector ('.popup__fieldset_edit');
const editPopupCloseButton = editPopup.querySelector ('.popup__close_edit');
const editPopupOpenButton = document.querySelector('.profile__edit');

//универсальная функция открытия
const openPopup = (popup)=>{
  popup.classList.add('popup_opened');
};

//универсальная функция закрытия
const closePopup = (popup)=> {
  popup.classList.remove('popup_opened');
};

editPopupOpenButton.addEventListener ('click', () => {
  openPopup(editPopup);
  profileNameInput.value = profileName.textContent;
  profileInformationInput.value = profileInformation.textContent;
});

editPopupCloseButton.addEventListener ('click', () => {
  closePopup(editPopup);
});

formElement.addEventListener('submit', (evt) => {
  evt.preventDefault(); 
    profileName.textContent = profileNameInput.value;
    profileInformation.textContent = profileInformationInput.value;
    closePopup(editPopup);
});

//добавление массива карточек
const elementsList = document.querySelector('.elements__list');
const elementsTemplate = elementsList.querySelector('#templateCard');
const imagePopupOpen = document.querySelector('.popup_openimage');//переменная используется далее, не совсем поняла комментарий
const imagePopupClose = imagePopupOpen.querySelector('.popup__close_img');
const fullImage = imagePopupOpen.querySelector('.popup__image'); 
const captionImage = imagePopupOpen.querySelector('.popup__caption');

//метод создания элемента карточки
const createCard = (card) => {
  const newCard = elementsTemplate.content.cloneNode(true);
  const elementsImg = newCard.querySelector ('.elements__img');
  elementsImg.src = card.link;
  newCard.querySelector('.elements__text').textContent = card.name;
  newCard.querySelector('.elements__text').alt = card.name;
  //посмотреть картинку 
  elementsImg.addEventListener('click', ()=> {
    openPopup(imagePopupOpen);
    fullImage.src = card.link;
    captionImage.textContent = card.name;
    fullImage.setAttribute('alt', card.name);
  });
  
  imagePopupClose.addEventListener('click', () => {
    closePopup(imagePopupOpen);
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