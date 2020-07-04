import Card from './Сard.js';
import {initialCards} from './initialCard.js';
import FormValidator from './FormValidator.js';
import {closePopup, openPopup} from './utils.js';

// Popup
const popupEditProfile = document.querySelector('.popup__edit-profile');
const popupAddCard = document.querySelector('.popup__add-card');

// Popup Card
const templateSelector = '#element';
const elementsContainer = document.querySelector('.elements');

// Profile
const profileEditButton = document.querySelector('.profile__edit-button');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const cardAddButton = document.querySelector('.profile__add-button');

// Forms
const formEditProfile = document.querySelector('.popup__edit-profile .popup__form');
const formAddCard = document.querySelector('.popup__add-card .popup__form');

const editProfile = (name, value) => {
    profileTitle.innerText = name;
    profileSubtitle.innerText = value;
}; 

const insertCard = (container, card, isPrepend = false) => {
    container[isPrepend ? 'prepend' : 'appendChild'](card);
};
const clearFormErrors = (form) => {
    const errorInputs = form.querySelectorAll('.popup__form-input_error');

    errorInputs.forEach(input => {
        input.classList.remove('popup__form-input_error');
        const errorElement = form.querySelector(`#${input.id}-error`);

        errorElement.classList.remove('.popup__form-input-error_active');
        errorElement.textContent = '';
    });
};

initialCards.forEach(item => {
    const card = new Card(item.link, item.name, templateSelector)
    const cardTemplate = card.generateCard();
    insertCard(elementsContainer, cardTemplate);
});

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
        const card = new Card(link, name, templateSelector)
        const cardTemplate = card.generateCard();

        insertCard(elementsContainer, cardTemplate, true);
        closePopup(popup);
    }
});

const formSelectors = {
    inputSelector: '.popup__form-input',
    submitButtonSelector: '.popup__form-submit',
    inactiveButtonClass: 'popup__form-submit_disabled',
    inputErrorClass: 'popup__form-input_error',
    errorClass: 'popup__form-input-error_active'
};
const editProfileFormValidator = new FormValidator(formSelectors, formEditProfile);
const addCardFormValidator = new FormValidator(formSelectors, formAddCard);


editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();