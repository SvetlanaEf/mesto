/*
const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};
  
function toggleButtonState(inputList, buttonElement, inactiveClass) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveClass);
  } else {
    buttonElement.classList.remove(inactiveClass);
  }
};

const enableValidation = ({
  formSelector,
  inputSelector,
  submitButtonSelector, 
  inactiveButtonClass, 
  inputErrorClass, 
  errorClass
}) => {
  const formElement = document.querySelector(formSelector);
  const inputList = document.querySelector(inputSelector);
  const buttonElement = document.querySelector(submitButtonSelector);

  formElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
  });

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__form-submit',
  inactiveButtonClass: 'popup__form-submit_disabled',
  inputErrorClass: 'popup__form-input_type_error',
  errorClass: 'popup__form-input_error'
});
*/
// const formError = popupForm.querySelector(`#${popupNameInput.id}-error`);
// Функция, которая добавляет класс с ошибкой
const showInputError = (popupForm, popupInput, errorMessage, parems) => {
  const errorElement = popupForm.querySelector(`#${popupInput.id}-error`);
  popupInput.classList.add(parems.inputErrorClass);
  errorElement.textContent = errorMessage;
  //Показываем сообщение с ошибкой
  errorElement.classList.add(parems.errorClass);
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (popupForm, popupInput, parems) => {
  const errorElement = popupForm.querySelector(`#${popupInput.id}-error`);
  popupInput.classList.remove(parems.inputErrorClass);
  //Скрываем сообщение с ошибкой
  errorElement.classList.remove(parems.errorClass);
  errorElement.textContent = '';
};

// Функция, которая проверяет валидность поля
const isValid = (popupForm, popupInput, parems) => {
  if (!popupInput.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(popupForm, popupInput, popupInput.validationMessage, parems);
  } else {
    // Если проходит, скроем
    hideInputError(popupForm, popupInput, parems);
  }
};

function setEventListeners(popupForm, parems) {
  const inputList = Array.from(popupForm.querySelectorAll(parems.inputSelector));
  const buttonElement = popupForm.querySelector(parems.submitButtonSelector);

  inputList.forEach((popupInput) => {
    popupInput.addEventListener('input', () => {
      isValid(popupForm, popupInput, parems);
      toggleButtonState(inputList, buttonElement, parems);
    });
  });
}

function hasInvalidInput(inputList) {
  return inputList.some((popupInput) => {
    return !popupInput.validity.valid;
  })
}

function toggleButtonState(inputList, buttonElement, parems) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(parems.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(parems.inactiveButtonClass);
  }
};

function enableValidation(parems) {
  const popupForm = document.querySelector(parems.formSelector);

  popupForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
  })
  setEventListeners(popupForm, parems);
}

enableValidation({
  formSelector: '.popup__edit-profile .popup__form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__form-submit',
  inactiveButtonClass: 'popup__form-submit_disabled',
  inputErrorClass: 'popup__form-input_error',
  errorClass: 'popup__form-input-error_active'
});

enableValidation({
  formSelector: '.popup__add-card .popup__form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__form-submit',
  inactiveButtonClass: 'popup__form-submit_disabled',
  inputErrorClass: 'popup__form-input_error',
  errorClass: 'popup__form-input-error_active'
});


