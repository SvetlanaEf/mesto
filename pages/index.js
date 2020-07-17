import Card from '../components/Сard.js';
import {initialCards} from '../js/initialCard.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PicturePopup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
// Popup
const popupEditProfile = new PopupWithForm('.popup__edit-profile', submitEditProfile);
const popupAddCard = new PopupWithForm('.popup__add-card', submitAddCard);
const popupCard = new PopupWithImage('.popup-card');

// Popup Card
const templateSelector = '#element';
const elementsContainer = document.querySelector('.elements');

const userInfo = new UserInfo('.profile__title', '.profile__subtitle');

// Profile
const profileEditButton = document.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__add-button');

// Forms
const formEditProfile = document.querySelector('.popup__edit-profile .popup__form');
const formAddCard = document.querySelector('.popup__add-card .popup__form');

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

profileEditButton.addEventListener('click', () => {
    const { name, info } = userInfo.getUserInfo();
    const popupNameInput = formEditProfile.querySelector('.popup__form-input[name="name"]');
    const popupValueInput = formEditProfile.querySelector('.popup__form-input[name="value"]');

    clearFormErrors(formEditProfile);

    popupNameInput.value = name;
    popupValueInput.value = info;

    popupEditProfile.open();
});

cardAddButton.addEventListener('click', () => {
    const formSubmit = formAddCard.querySelector('.popup__form-submit');
    const popupNameInput = formAddCard.querySelector('.popup__form-input[name="name"]');
    const popupValueInput = formAddCard.querySelector('.popup__form-input[name="value"]');

    formSubmit.classList.add('popup__form-submit_disabled');
    clearFormErrors(formAddCard);

    popupNameInput.value = '';
    popupValueInput.value = '';

    popupAddCard.open();
});

function submitEditProfile({ name, value }) {
    if (name && value) {
        userInfo.setUserInfo({ name, info: value });
        popupEditProfile.close();
    }
};

function submitAddCard({ name, value }) {
    if (name && value) {
        const card = new Card(value, name , templateSelector, handleCardClick);
        const cardTemplate = card.generateCard();

        insertCard(elementsContainer, cardTemplate, true);
        popupAddCard.close();
    };
}
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

function handleCardClick(image, text) {
    popupCard.open(image, text);
} 
const cardList = new Section({
    items: initialCards, //передаем массив
    renderer: (item) => {
        const card = new Card(item.link, item.name, templateSelector, handleCardClick);
        const cardElement = card.generateCard(); //создаем карточки
        return cardElement;
    }
}, '.elements' );

cardList.renderItems();