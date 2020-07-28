import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popup.querySelector(".popup__form");
  }

  open(submitParams = {}) {
    super.open();
    this._submitParams = submitParams;
  }

  _getInputValues() {
    this._inputList = this._popupForm.querySelectorAll(".popup__form-input");
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListener() {
    super.setEventListener();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues(), this._submitParams);
    });
  }

  clearForm() {
    this._popupForm.reset();
  }
}
