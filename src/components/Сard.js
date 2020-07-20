export default class Card {
  constructor(image, text, templateSelector, handleCardClick) {
    this._image = image;
    this._text = text;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  //метод создает карточку
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._card = this._getTemplate();
    this._cardImage = this._card.querySelector(".element__image");
    this._cardLike = this._card.querySelector(".element__like");

    this._cardImage.src = this._image;
    this._cardImage.alt = this._text;
    this._card.querySelector(".element__name").textContent = this._text;

    this._setEventListener();

    return this._card;
  }

  //метод вешает слушателя на созданную карточку
  _setEventListener() {
    this._cardLike.addEventListener("click", () => {
      this._likeCard();
    });
    this._card
      .querySelector(".element__delete")
      .addEventListener("click", () => {
        this._deleteCard();
      });
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._text, this._image);
    });
  }

  //метод лайка карточки
  _likeCard() {
    this._cardLike.classList.toggle("element__like_active");
  }

  //метод удаления карточки
  _deleteCard() {
    this._card.remove();
    this._card = null;
  }
}
