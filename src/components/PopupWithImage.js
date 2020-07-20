import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupName = this._popup.querySelector(".popup-card__name");
    this._popupImage = this._popup.querySelector(".popup-card__image");
  }

  open(cardName, cardLink) {
    this._popupName.textContent = cardName;
    this._popupImage.src = cardLink;
    super.open();
  }
}
