import "./index.css";
import Card from "../components/Сard.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

// Popup
const popupEditProfile = new PopupWithForm(
  ".popup__edit-profile",
  submitEditProfile
);
const popupAddCard = new PopupWithForm(".popup__add-card", submitAddCard);
const popupCard = new PopupWithImage(".popup-card");
const popupDelete = new PopupWithForm(".popup__delete", deleteCard);
const popupAvatar = new PopupWithForm(".popup__avatar", updateAvatar);

popupEditProfile.setEventListener();
popupAddCard.setEventListener();
popupCard.setEventListener();
popupDelete.setEventListener();
popupAvatar.setEventListener();

// Popup Card
const templateSelector = "#element";
const elementsContainer = document.querySelector(".elements");

const userInfo = new UserInfo(
  ".profile__title",
  ".profile__subtitle",
  ".profile__avatar"
);

// Profile
const profileEditButton = document.querySelector(".profile__edit-button");
const cardAddButton = document.querySelector(".profile__add-button");

// Forms
const formEditProfile = document.querySelector(
  ".popup__edit-profile .popup__form"
);
const formEditNameInput = formEditProfile.querySelector(
  '.popup__form-input[name="name"]'
);
const formEditValueInput = formEditProfile.querySelector(
  '.popup__form-input[name="value"]'
);
const formAvatar = document.querySelector(".popup__avatar .popup__form");
const formEditProfileSubmit = document.querySelector(
  ".popup__edit-profile .popup__form-submit"
);
const formAvatarSubmit = document.querySelector(
  ".popup__avatar .popup__form-submit"
);

const formAddCard = document.querySelector(".popup__add-card .popup__form");
const formAddCardSubmit = formAddCard.querySelector(".popup__form-submit");
const formAddNameInput = formAddCard.querySelector(
  '.popup__form-input[name="name"]'
);
const formAddValueInput = formAddCard.querySelector(
  '.popup__form-input[name="value"]'
);
const profileAvatar = document.querySelector(".profile__avatar");

const insertCard = (container, card, isPrepend = false) => {
  container[isPrepend ? "prepend" : "appendChild"](card);
};

const openEditProfile = () => {
  const { name, info } = userInfo.getUserInfo();

  editProfileFormValidator.clearFormErrors();

  formEditNameInput.value = name;
  formEditValueInput.value = info;

  popupEditProfile.open();
};
let currentUserId = null;

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-13",
  headers: {
    authorization: "92793e11-3eaf-472b-8353-57e23ae30eee",
    "Content-Type": "application/json",
  },
});

profileEditButton.addEventListener("click", openEditProfile);

const openCardAdd = () => {
  formAddCardSubmit.classList.add("popup__form-submit_disabled");
  formAddCardSubmit.disabled = true;
  addCardFormValidator.clearFormErrors();

  formAddNameInput.value = "";
  formAddValueInput.value = "";

  popupAddCard.open();
};

cardAddButton.addEventListener("click", openCardAdd);

function submitEditProfile({ name, value }) {
  if (name && value) {
    formEditProfileSubmit.disabled = true;
    formEditProfileSubmit.textContent = "Загрузка...";

    api.editUser(name, value).then((response) => {
      userInfo.setUserInfo({ name: response.name, info: response.about });
      popupEditProfile.close();
      popupEditProfile.clearForm();
      formEditProfileSubmit.disabled = false;
      formEditProfileSubmit.textContent = "Сохранить";
    });
  }
}

function submitAddCard({ name, value }) {
  if (name && value) {
    formAddCardSubmit.disabled = true;
    formAddCardSubmit.textContent = "Загрузка...";

    api.addNewCard(name, value).then((response) => {
      const handleDelete = (params) => popupDelete.open(params);
      const handleLike = (cardId) => {
        const method = card.isLiked() ? "unLikeCard" : "likeCard";

        api[method](cardId).then((data) => {
          card.likeCard(data.likes.length);
        });
      };
      const card = new Card(
        response,
        templateSelector,
        handleCardClick,
        currentUserId,
        handleDelete,
        handleLike
      );
      const cardTemplate = card.generateCard();

      insertCard(elementsContainer, cardTemplate, true);
      popupAddCard.close();
      popupAddCard.clearForm();
      formAddCardSubmit.disabled = false;
      formAddCardSubmit.textContent = "Сохранить";
    });
  }
}

function deleteCard(_, params) {
  api.deleteCard(params.cardId).then(() => {
    params.card.remove();
    popupDelete.close();
  });
}

const formSelectors = {
  inputSelector: ".popup__form-input",
  submitButtonSelector: ".popup__form-submit",
  inactiveButtonClass: "popup__form-submit_disabled",
  inputErrorClass: "popup__form-input_error",
  errorClass: "popup__form-input-error_active",
};
const editProfileFormValidator = new FormValidator(
  formSelectors,
  formEditProfile
);
const addCardFormValidator = new FormValidator(formSelectors, formAddCard);

editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

function handleCardClick(image, text) {
  popupCard.open(image, text);
}

profileAvatar.addEventListener("click", () => {
  profileAvatarValidator.clearFormErrors();
  popupAvatar.clearForm();
  popupAvatar.open();
});

const profileAvatarValidator = new FormValidator(formSelectors, formAvatar);

profileAvatarValidator.enableValidation();

function updateAvatar({ avatar }) {
  formAvatarSubmit.disabled = true;
  formAvatarSubmit.textContent = "Загрузка...";
  api.updateAvatar(avatar).then((response) => {
    userInfo.setUserAvatar(response.avatar);
    popupAvatar.close();
    popupAvatar.clearForm();
    formAvatarSubmit.disabled = false;
    formAvatarSubmit.textContent = "Сохранить";
  });
}

api
  .getUser()
  .then((response) => {
    currentUserId = response._id;
    userInfo.setUserInfo({ name: response.name, info: response.about });
    userInfo.setUserAvatar(response.avatar);
    return response;
  })
  .then(() => {
    api.getInitialCards().then((initialCards) => {
      const cardList = new Section(
        {
          items: initialCards, //передаем массив
          renderer: (item) => {
            const handleDelete = (params) => popupDelete.open(params);
            const handleLike = (cardId) => {
              const method = card.isLiked() ? "unLikeCard" : "likeCard";

              api[method](cardId).then((data) => {
                card.likeCard(data.likes.length);
              });
            };
            const card = new Card(
              item,
              templateSelector,
              handleCardClick,
              currentUserId,
              handleDelete,
              handleLike
            );
            const cardElement = card.generateCard(); //создаем карточки
            return cardElement;
          },
        },
        ".elements"
      );

      cardList.renderItems();
    });
  });
