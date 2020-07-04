import {openPopup} from './utils.js';

export default class Card {
    constructor(image, text, templateSelector) {
        this._image = image;
        this._text = text;
        this._templateSelector = templateSelector;
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
            const popup = document.querySelector('.popup-card');

            popup.querySelector('.popup-card__image').src = this._image;
            popup.querySelector('.popup-card__name').textContent = this._text;
            openPopup(popup);
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

