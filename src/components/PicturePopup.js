import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

   open(cardName, cardLink) {
        this._popup.querySelector('.popup-card__name').textContent = cardName;
        this._popup.querySelector('.popup-card__image').src = cardLink;
        super.open();
    }
}