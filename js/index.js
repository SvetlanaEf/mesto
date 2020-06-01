// Popup
const popup = document.querySelector('.popup');
const popupTitle = document.querySelector('.popup__title');
const popupClose = document.querySelector('.popup__close');
const popupNameInput = document.querySelector('.popup__form-input[name="name"]');
const popupValueInput = document.querySelector('.popup__form-input[name="value"]');
const popupForm = document.querySelector('.popup__form');
const popupSubmitButton = document.querySelector('.popup__form-submit');
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
const popupToggle = () => {
    if (popup.classList.contains('popup_opened')) {
        popup.classList.remove('popup_opened');
        // Чистим значения
        popupNameInput.value = '';
        popupValueInput.value = '';
    } else {
        popup.classList.add('popup_opened');
    }
};

initialCards.forEach(card => addCard(card.name, card.link));

profileEditButton.addEventListener('click', () => {
    activePopup = 'edit';
    popupTitle.innerText = 'Редактировать профиль';
    popupSubmitButton.innerText = 'Сохранить';
    popupNameInput.value = profileTitle.innerText;
    popupValueInput.value = profileSubtitle.innerText;
    popupNameInput.placeholder = 'Имя';
    popupValueInput.placeholder = 'Должность';
    popupForm.onsubmit = (event) => {
        event.preventDefault();
    
        profileTitle.innerText = popupNameInput.value;
        profileSubtitle.innerText = popupValueInput.value;

        popupToggle();
    };

    popupToggle();
});

popupClose.addEventListener('click', popupToggle);

cardAddButton.addEventListener('click', () => {
    activePopup = 'add';
    popupTitle.innerText = 'Новое место';
    popupSubmitButton.innerText = 'Создать';
    popupNameInput.placeholder = 'Название';
    popupValueInput.placeholder = 'Ссылка на картинку';
    popupForm.onsubmit = (event) => {
        event.preventDefault();

        const name = popupNameInput.value;
        const link = popupValueInput.value;

        if (name && link) {
            addCard(name, link, true);
            popupToggle();
        }
    };

    popupToggle();
});

popupCardClose.addEventListener('click', () => {
    popupCard.classList.toggle ('popup-card_opened');
});