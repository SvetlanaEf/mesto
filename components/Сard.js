
export default class Card {
    constructor(image, text, templateSelector, handleCardClick) {
        this._image = image;
        this._text = text;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
    };

    //метод создает карточку
    _getTemplate() {
        const cardElement = document
        .querySelector(this._templateSelector)
        .content
        .querySelector('.element')
        .cloneNode(true);
        
        return cardElement;
    };

    generateCard() {
        this._card = this._getTemplate();

        this._card.querySelector('.element__image').src = this._image;
        this._card.querySelector('.element__name').textContent = this._text;

        this._setEventListener();

        return this._card;
    };

    //метод вешает слушателя на созданную карточку
    _setEventListener() {
        this._card.querySelector('.element__like').addEventListener('click', () => {
            this._likeCard();
        });
        this._card.querySelector('.element__delete').addEventListener('click', () => {
            this._deleteCard();
        });
        this._card.querySelector('.element__image').addEventListener('click', () => {
            this._handleCardClick(this._text, this._image);
        })
    };

    //метод лайка карточки
    _likeCard() {
        this._card.querySelector('.element__like').classList.toggle('element__like_active');
    };
    
    //метод удаления карточки
    _deleteCard() {
        this._card.remove();
    };
}

