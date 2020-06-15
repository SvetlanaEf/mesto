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
const editProfileForm = document.querySelector('.popup__form_edit-profile');
const addCardForm = document.querySelector('.popup__form_add-card');

const elementTemplate = document.querySelector('#element').content;
// Cards
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://images.unsplash.com/photo-1552082331-a9ea6308d1af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1334&q=80'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];
const addCard = (name, link, isPrepend = false) => {
    const cloneElementTmpl = elementTemplate.cloneNode(true);
    const image = cloneElementTmpl.querySelector('.element__image');

    image.addEventListener('click', () => {
        popupCard.classList.toggle('popup-card_opened');
        popupCardImage.src = link;
        popupCardName.innerText = name;
    });
    image.src = link;
    
    cloneElementTmpl.querySelector('.element__name').textContent = name;
    cloneElementTmpl.querySelector('.element__like').addEventListener('click', (evt) => {
        evt.target.classList.toggle('element__like_active');
    });
    cloneElementTmpl.querySelector('.element__delete').addEventListener('click', (evt) => {
        elementsContainer.removeChild(evt.target.parentNode);
    });
    
    if (isPrepend) {
        elementsContainer.prepend(cloneElementTmpl);
    } else {
        elementsContainer.appendChild(cloneElementTmpl);
    }
};
const editProfile = (name, value) => {
    profileTitle.innerText = name;
    profileSubtitle.innerText = value;
}
const popupToggle = (popup) => {
    if (popup.classList.contains('popup_opened')) {
        const popupNameInput = popup.querySelector('.popup__form-input[name="name"]');
        const popupValueInput = popup.querySelector('.popup__form-input[name="value"]');

        popup.classList.remove('popup_opened');
        popupNameInput.value = '';
        popupValueInput.value = '';
    } else {
        popup.classList.add('popup_opened');
    }
};

initialCards.forEach(card => addCard(card.name, card.link));

popupCardClose.addEventListener('click', () => {
    popupCard.classList.toggle ('popup-card_opened');
});

popupCard.addEventListener('click', function(evt) {
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

function enablePopup(params) {
    const popup = document.querySelector(params.popupSelector);
    const popupNameInput = popup.querySelector('.popup__form-input[name="name"]');
    const popupValueInput = popup.querySelector('.popup__form-input[name="value"]');
    const popupForm = popup.querySelector('.popup__form');
    const popupClose = popup.querySelector('.popup__close');
    
    popup.addEventListener('click', function(evt) {
        if (evt.target.classList.contains('popup_opened')) {
            popupToggle(popup);
        }
    })
    popupForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = popupNameInput.value;
        const link = popupValueInput.value;

        if (name && link) {
            params.submitFn(name, link);
            popupToggle(popup);
        }
    });

    popupClose.addEventListener('click', () => popupToggle(popup));
}

document.addEventListener('keydown', function(evt) {
    if (event.keyCode === 27) {
        const popups = Array.from(document.querySelectorAll('.popup_opened'));

        if (popupCard.classList.contains('popup-card_opened')) {
            popupCard.classList.remove('popup-card_opened');
        }

        popups.forEach(function(popup) {
            popupToggle(popup);
        })
    }
})

enablePopup({
    popupSelector: '.popup__add-card',
    submitFn: (name, link) => addCard(name, link, true)
});

enablePopup({
    popupSelector: '.popup__edit-profile',
    submitFn: editProfile
});

