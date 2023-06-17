export default class Card {
    constructor (data, cardSelector, handleCardClick) {
      this._newCard = data
      this._cardSelector = cardSelector;
      this._handleCardClick = handleCardClick;
      //this._openPopup = openPopup
      //this._cardElement = cardSelector.content.querySelector('.elements__blok').cloneNode(true)
    }

    generateCard () {
      this._cardElement = this._getTemplateElement();
      this._newCardImg = this._cardElement.querySelector('.elements__img');
      this._newCardImg.src = this._newCard.link;
      this._newCardImg.alt = this._newCard.name;
      this._cardElement.querySelector('.elements__text').textContent = this._newCard.name;

      this._likeButton = this._cardElement.querySelector('.elements__like')
      this._deleteButton = this._cardElement.querySelector('.elements__delete')

      this._setEventListeners()
      return this._cardElement
    }

    _getTemplateElement() {
      return document.querySelector(this._cardSelector).content.querySelector('.elements__blok').cloneNode(true);
    }
  
    _setEventListeners () {
      this._newCardImg.addEventListener('click', () => this._handleCardClick(this._newCard.link, this._newCard.name))
      this._likeButton.addEventListener('click', () => this._handleLike())
      this._deleteButton.addEventListener('click', () => this._handleDelete())
    }
  
    _handleLike () {
      this._likeButton.classList.toggle('elements__like_active')
    }
  
    _handleDelete () {
      this._cardElement.remove()
      this._cardElement = null;
    }
  }
