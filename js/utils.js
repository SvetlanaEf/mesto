export const openPopup = (popup) => {
    const popupClose = popup.querySelector('.popup__close');

    document.addEventListener('keydown', closePopupOnEsc);
    popup.addEventListener('click', closePopupOnOverlay);
    popupClose.addEventListener('click', () => closePopup(popup), {once: true});

    popup.classList.add('popup_opened');
};

export const closePopup = (popup) => {
    document.removeEventListener('keydown', closePopupOnEsc);
    popup.removeEventListener('click', closePopupOnOverlay);
    popup.classList.remove('popup_opened');
};

const closePopupOnEsc = (event) => {
    if (event.keyCode === 27) {
        const popup = document.querySelector('.popup_opened');

        closePopup(popup);
    }
};

const closePopupOnOverlay = (event) => {
    if (event.target.classList.contains('popup_opened')) {
        closePopup(event.target);
    }
};