export default class Popup {
    constructor( popupSelector ) {
        this._popup = document.querySelector(popupSelector);
        this._closeButton = this._popup.querySelector('.popup__close');
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('click', this._handleOverlayClose);
        this.setEventListener();
    };

    close() {
        document.removeEventListener('click', this._handleOverlayClose);
        this._popup.classList.remove('popup_opened');
    };

    _handleEscClose = (event) => {
        if (event.keyCode === 27) {
           this.close();
        }
    };

    _handleOverlayClose = (event) => {
        if (event.target.classList.contains('popup_opened')) {
            this.close();
        }
    }

    setEventListener() {
        this._closeButton.addEventListener('click', () => {
            this.close();
        });
    };
}