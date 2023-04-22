//редактирование профиля, открытие и закрытие окна редактирования профиля
const profileName = document.querySelector ('.profile__title');
const profileInformation = document.querySelector ('.profile__text');
const profileNameInput = document.querySelector ('.popup__form_type_name');
const profileInformationInput = document.querySelector ('.popup__form_type_information');
const popupCloseButton = document.querySelector ('.popup__close');
const formElement = document.querySelector ('.popup__fieldset');
const editPopup = document.querySelector ('.popup_edit');
const editPopupButton = document.querySelector('.profile__edit');

//универсальная функция открытия
const openPopup = (popup)=>{
  popup.classList.add('popup_opened');
};

//универсальная функция закрытия
const closePopup = (popup)=> {
  popup.classList.remove('popup_opened');
};

editPopupButton.addEventListener ('click', () => {
  openPopup(editPopup);
profileNameInput.value = profileName.textContent;
profileInformationInput.value = profileInformation.textContent;
});

popupCloseButton.addEventListener ('click', () => {
  closePopup(editPopup);
});

editPopup.addEventListener('submit', (evt) => {
  evt.preventDefault(); 
    profileName.textContent = profileNameInput.value;
    profileInformation.textContent = profileInformationInput.value;
    closePopup(editPopup);
});


//массив карточек 
const cards = [
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

//добавление массива карточек
const elementsList = document.querySelector('.elements__list');

const imagePopupOpen = document.querySelector('.popup_open_image');
const imagePopupClose = imagePopupOpen.querySelector('.popup__close_img');
const fullImage = document.querySelector('.popup__image'); 
const captionImage = imagePopupOpen.querySelector('.popup__caption');

const createCard = (card) => {
  const newCard = document.querySelector('#templateCard').content.cloneNode(true);
  newCard.querySelector('.elements__img').src = card.link;
  newCard.querySelector('.elements__text').textContent = card.name;

  newCard.querySelector('.elements__img').addEventListener('click', ()=> {
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
  elementsList.prepend(newCard);
};
cards.forEach(createCard);

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
  const link = form.querySelector('.popup__form_card_image').value;
  const name = form.querySelector('.popup__form_card_name').value;
  const alt = form.querySelector('.popup__form_card_name').value;
  const card = {
    name: name,
    link: link,
    alt: name,
  };
    createCard(card);
    closePopup(addPopup);
};

addPopupButton.addEventListener ('click', () => {
  openPopup(addPopup);
});
popupAddCloseButton.addEventListener ('click', () => {
  closePopup(addPopup);
});
formAddElement.addEventListener('submit', formAddSubmitHandler);

