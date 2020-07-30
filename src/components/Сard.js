export default class Card {
  constructor(
    card,
    templateSelector,
    handleCardClick,
    currentUserId,
    handleDelete,
    handleLike
  ) {
    this._item = card;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDelete = handleDelete;
    this._handleLike = handleLike;
    this._currentUserId = currentUserId;
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
    this._cardLikeCount = this._card.querySelector(".element__like-number");
    this._cardDeleteButton = this._card.querySelector(".element__delete");

    this._cardImage.src = this._item.link;
    this._cardImage.alt = this._item.name;
    this._card.querySelector(".element__name").textContent = this._item.name;
    this._cardLikeCount.textContent = this._item.likes.length;

    if (this._item.likes.find(({ _id }) => _id === this._currentUserId)) {
      this._cardLike.classList.add('element__like_active');
    }

    if (this._currentUserId !== this._item.owner._id) {
      this._cardDeleteButton.remove();
    }

    this._setEventListener();

    return this._card;
  }

  //метод вешает слушателя на созданную карточку
  _setEventListener() {
    this._cardLike.addEventListener("click", () => {
      this._handleLike(this._item._id);
    });

    if (this._cardDeleteButton) {
      this._cardDeleteButton.addEventListener("click", () => {
        this._handleDelete({ card: this, cardId: this._item._id });
      });
    }

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._item.name, this._item.link);
    });
  }

  //метод лайка карточки
  likeCard(likesCount = 0) {
    this._cardLike.classList.toggle("element__like_active");
    this._cardLikeCount.textContent = likesCount;
  }

  isLiked() {
    return this._cardLike.classList.contains("element__like_active");
  }

  //метод удаления карточки
  remove() {
    this._card.remove();
    this._card = null;
  }
}
