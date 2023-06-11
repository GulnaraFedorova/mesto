export default class Card {
    constructor (newCard, openPopup, template) {
      this._newCard = newCard
      this._openPopup = openPopup
      this._card = template.content.querySelector('.elements__blok').cloneNode(true)
      this._newCardName = this._card.querySelector('.elements__text')
      this._newCardImg = this._card.querySelector('.elements__img')
      this._likeButton = this._card.querySelector('.elements__like')
      this._deleteButton = this._card.querySelector('.elements__delete')
      this._imagePopupOpen = document.querySelector('.popup_openimage')
      this._fullImage = this._imagePopupOpen.querySelector('.popup__image')
      this._captionImage = this._imagePopupOpen.querySelector('.popup__caption')
    }
  
    generateCard () {
      this._newCardName.textContent = this._newCard.name
      this._newCardImg.src = this._newCard.link
      this._newCardImg.alt = this._newCard.name
      this._setEventListeners()
      return this._card
    }
  
    _setEventListeners () {
      this._newCardImg.addEventListener('click', () => this._handleImageOpen())
      this._likeButton.addEventListener('click', () => this._handleLike())
      this._deleteButton.addEventListener('click', () => this._handleDelete())
    }
  
    _handleImageOpen () {
      this._openPopup(this._imagePopupOpen)
      this._fullImage.src = this._newCard.link
      this._fullImage.alt = this._newCard.name
      this._captionImage.textContent = this._newCard.name
    }
  
    _handleLike () {
      this._likeButton.classList.toggle('elements__like_active')
    }
  
    _handleDelete () {
      this._card.remove()
    }
  }
