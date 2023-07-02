export default class Card {
  constructor (data, handleCardClick, handleSetLike, handleDeleteLike, cardSelector, userId) {
    this._data = data;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleSetLike = handleSetLike;
    this._handleDeleteLike = handleDeleteLike;

    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id;
		this._userId = userId;
		this._ownerId = data.owner._id;
    this._likes = data.likes;
  }

  generateCard () {
    this._cardElement = this._getTemplateElement();
    this._newCardImg = this._cardElement.querySelector('.elements__img');
    this._newCardImg.src = this._link;
    this._newCardImg.alt = this._name;
    this._cardElement.querySelector('.elements__text').textContent = this._name;

    this._likeButton = this._cardElement.querySelector('.elements__like')
    this._deleteButton = this._cardElement.querySelector('.elements__delete')

    this._likeCounter = this._cardElement.querySelector('.elements__like-counter');
    this._likeCounter.textContent = this._likes.length;

    if(this._ownerId !== this._user) {
      this._deleteButton.remove();
    }

    this._checkLikedState();
    this._setEventListeners()
    return this._cardElement
  }

  _getTemplateElement() {
    return document.querySelector(this._cardSelector).content.querySelector('.elements__blok').cloneNode(true);
  }

  _setEventListeners () {
    this._newCardImg.addEventListener('click', () => this._handleCardClick(this._name, this._link))
    this._likeButton.addEventListener('click', () => {
      if (this._likeButton.classList.contains('elements__like_active')) {
        this._handleDeleteLike(this._cardId);
    } else {
        this._handleSetLike(this._cardId);
    }
});
    this._deleteButton.addEventListener('click', () => this._handleDeleteClick());
  }

  handleDelete () {
      this._cardElement.remove();
      this._cardElement = null;
  }

  handleLike (data) {
    this._likes = data.likes;
    this._likeCounter.textContent = this._likes.length;
    this._likeButton.classList.toggle('elements__like_active')
  }

  _checkLikedState() {
    this._data.likes.forEach((like) => {
      if (like._id === this._userId) {
        this._likeButton.classList.add('elements__like_active');
      }
    })
  }

  getId() {
		return this._cardId
	}

}