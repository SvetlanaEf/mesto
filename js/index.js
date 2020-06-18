// Popup
const popupEditProfile = document.querySelector('.popup__edit-profile');
const popupAddCard = document.querySelector('.popup__add-card');
// Popup Card
const popupCard = document.querySelector('.popup-card');
const popupCardClose = document.querySelector('.popup-card__close');
const popupCardImage = document.querySelector('.popup-card__image');
const popupCardName = document.querySelector('.popup-card__name');
const elementsContainer = document.querySelector('.elements');
// Profile
const profileEditButton = document.querySelector('.profile__edit-button');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const cardAddButton = document.querySelector('.profile__add-button');

const elementTemplate = document.querySelector('#element').content;
const addCard = (name, link, isPrepend = false) => {
    const cloneElementTmpl = elementTemplate.cloneNode(true);
    const image = cloneElementTmpl.querySelector('.element__image');

    image.addEventListener('click', () => openCardPopup(name, link));
    image.src = link;
    
    cloneElementTmpl.querySelector('.element__name').textContent = name;
    cloneElementTmpl.querySelector('.element__like').addEventListener('click', toggleLikeCard);
    cloneElementTmpl.querySelector('.element__delete').addEventListener('click', deleteCard);

    insertCard(elementsContainer, cloneElementTmpl, isPrepend);
};
const deleteCard = (evt) => {
    elementsContainer.removeChild(evt.target.parentNode);
};
const toggleLikeCard = (evt) => {
    evt.target.classList.toggle('element__like_active');
};
const editProfile = (name, value) => {
    profileTitle.innerText = name;
    profileSubtitle.innerText = value;
}
const openCardPopup = (name, imageSrc) => {
    popupCard.classList.toggle('popup-card_opened');
    popupCardImage.src = imageSrc;
    popupCardName.innerText = name;
};
const insertCard = (container, card, isPrepend) => {
    if (isPrepend) {
        return container.prepend(card);
    }

    return container.appendChild(card);
}
const clearFormErrors = (form) => {
    const errorInputs = form.querySelectorAll('.popup__form-input_error');

    errorInputs.forEach(input => {
        input.classList.remove('popup__form-input_error');
        const errorElement = form.querySelector(`#${input.id}-error`);

        errorElement.classList.remove('.popup__form-input-error_active');
        errorElement.textContent = '';
    });
};
const popupToggle = (popup) => {
    const isCardPopup = popup.classList.contains('popup-card');
    const openedClass = isCardPopup ? 'popup-card_opened' : 'popup_opened';
    const popupClose = popup.querySelector('.popup__close');
    const popupForm = popup.querySelector('.popup__form');
    const isOpened = popup.classList.contains(openedClass);
    const close = () => popup.classList.remove(openedClass);
    const clodeOnEsc = (event) => {
        if (event.keyCode === 27) {
            close();
        }
    };
    const closeOnOverlay = (event) => {
        if (event.target.classList.contains(openedClass)) {
            close();
        }
    };

    if (isOpened) {
        document.removeEventListener('keydown', clodeOnEsc);
        popup.removeEventListener('click', closeOnOverlay);
        popupClose.removeEventListener('click', close);
    } else {
        document.addEventListener('keydown', clodeOnEsc);
        popup.addEventListener('click', closeOnOverlay);
        popupClose.addEventListener('click', close);

        if (popupForm) {
            clearFormErrors(popupForm);
        }
    }

    popup.classList.toggle(openedClass);
};

initialCards.forEach(card => addCard(card.name, card.link));

popupCardClose.addEventListener('click', () => {
    popupCard.classList.toggle ('popup-card_opened');
});

popupCard.addEventListener('mousedown', function(evt) {
    if (evt.target.classList.contains('popup-card_opened')) {
        evt.target.classList.remove('popup-card_opened');
    }
});

profileEditButton.addEventListener('click', () => {
    const popupNameInput = popupEditProfile.querySelector('.popup__form-input[name="name"]');
    const popupValueInput = popupEditProfile.querySelector('.popup__form-input[name="value"]');

    popupNameInput.value = profileTitle.innerText;
    popupValueInput.value = profileSubtitle.innerText;

    popupToggle(popupEditProfile);
});

cardAddButton.addEventListener('click', () => {
    popupToggle(popupAddCard);
});

const forms = document.querySelectorAll('form');

forms.forEach(form => {
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const popup = event.target.closest('.popup');
        const isEditProfileForm = popup.classList.contains('popup__edit-profile');
        const isAddCardForm = popup.classList.contains('popup__add-card');
        const popupNameInput = event.target.querySelector('.popup__form-input[name="name"]');
        const popupValueInput = event.target.querySelector('.popup__form-input[name="value"]');

        const name = popupNameInput.value;
        const link = popupValueInput.value;

        if (name && link) {
            if (isAddCardForm) {
                addCard(name, link, true);
            }

            if (isEditProfileForm) {
                editProfile(name, link);
            }

            popupNameInput.value = '';
            popupValueInput.value = '';

            popupToggle(popup);
        }
    });
});
