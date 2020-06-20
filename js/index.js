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
// Forms
const formEditProfile = document.querySelector('.popup__edit-profile .popup__form');
const formAddCard = document.querySelector('.popup__add-card .popup__form');

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
    popupCardImage.src = imageSrc;
    popupCardName.innerText = name;
    openPopup(popupCard);
};
const insertCard = (container, card, isPrepend) => {
    if (isPrepend) {
        container.prepend(card);
    }

    container.appendChild(card);
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
const closePopup = (popup) => {
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
const openPopup = (popup) => {
    const popupClose = popup.querySelector('.popup__close');

    document.addEventListener('keydown', closePopupOnEsc);
    popup.addEventListener('click', closePopupOnOverlay);
    popupClose.addEventListener('click', () => closePopup(popup), {once: true});

    popup.classList.add('popup_opened');
};

initialCards.forEach(card => addCard(card.name, card.link));

profileEditButton.addEventListener('click', () => {
    const popupNameInput = formEditProfile.querySelector('.popup__form-input[name="name"]');
    const popupValueInput = formEditProfile.querySelector('.popup__form-input[name="value"]');

    clearFormErrors(formEditProfile);

    popupNameInput.value = profileTitle.innerText;
    popupValueInput.value = profileSubtitle.innerText;

    openPopup(popupEditProfile);
});

cardAddButton.addEventListener('click', () => {
    const formSubmit = formAddCard.querySelector('.popup__form-submit');
    const popupNameInput = formAddCard.querySelector('.popup__form-input[name="name"]');
    const popupValueInput = formAddCard.querySelector('.popup__form-input[name="value"]');

    formSubmit.classList.add('popup__form-submit_disabled');
    clearFormErrors(formAddCard);

    popupNameInput.value = '';
    popupValueInput.value = '';

    openPopup(popupAddCard);
});

function getFormValues(form) {
    const popupNameInput = form.querySelector('.popup__form-input[name="name"]');
    const popupValueInput = form.querySelector('.popup__form-input[name="value"]');

    return { name: popupNameInput.value, value: popupValueInput.value };
}

formEditProfile.addEventListener('submit', event => {
    event.preventDefault();
    const popup = event.target.closest('.popup');
    const formValues = getFormValues(event.target);

    if (formValues.name && formValues.value) {
        editProfile(formValues.name, formValues.value);
        closePopup(popup);
    }
});

formAddCard.addEventListener('submit', event => {
    event.preventDefault();
    const popup = event.target.closest('.popup');
    const popupNameInput = event.target.querySelector('.popup__form-input[name="name"]');
    const popupValueInput = event.target.querySelector('.popup__form-input[name="value"]');

    const name = popupNameInput.value;
    const link = popupValueInput.value;

    if (name && link) {
        addCard(name, link, true);
        closePopup(popup);
    }
});
