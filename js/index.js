const editProfileButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupClose = document.querySelector('.popup__close');
const popupNameInput = document.querySelector('.popup__form-input[name="name"]');
const popupPostInput = document.querySelector('.popup__form-input[name="post"]');
const popupForm = document.querySelector('.popup__form');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

editProfileButton.addEventListener('click', () => {
    popup.classList.add('popup_opened');
    popupNameInput.setAttribute('value', profileTitle.innerText);
    popupPostInput.setAttribute('value', profileSubtitle.innerText);
});

popupClose.addEventListener('click', () => {
    popup.classList.remove('popup_opened');
});

popupForm.addEventListener('submit', event => {
    event.preventDefault();
    profileTitle.innerText = popupNameInput.value;
    profileSubtitle.innerText = popupPostInput.value;
    popup.classList.remove('popup_opened');
});