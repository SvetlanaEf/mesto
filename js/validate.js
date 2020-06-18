
// Функция, которая добавляет класс с ошибкой
const showInputError = (popupForm, popupInput, errorMessage, params) => {
  const errorElement = popupForm.querySelector(`#${popupInput.id}-error`);
  popupInput.classList.add(params.inputErrorClass);
  errorElement.textContent = errorMessage;
  //Показываем сообщение с ошибкой
  errorElement.classList.add(params.errorClass);
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (popupForm, popupInput, params) => {
  const errorElement = popupForm.querySelector(`#${popupInput.id}-error`);
  popupInput.classList.remove(params.inputErrorClass);
  //Скрываем сообщение с ошибкой
  errorElement.classList.remove(params.errorClass);
  errorElement.textContent = '';
};

// Функция, которая проверяет валидность поля
const isValid = (popupForm, popupInput, params) => {
  if (!popupInput.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(popupForm, popupInput, popupInput.validationMessage, params);
  } else {
    // Если проходит, скроем
    hideInputError(popupForm, popupInput, params);
  }
};

function setEventListeners(popupForm, params) {
  const inputList = Array.from(popupForm.querySelectorAll(params.inputSelector));
  const buttonElement = popupForm.querySelector(params.submitButtonSelector);

  inputList.forEach((popupInput) => {
    popupInput.addEventListener('input', () => {
      isValid(popupForm, popupInput, params);
      toggleButtonState(inputList, buttonElement, params);
    });
    toggleButtonState(inputList, buttonElement, params);
  });
}

function hasInvalidInput(inputList) {
  return inputList.some((popupInput) => {
    return !popupInput.validity.valid;
  })
}

function toggleButtonState(inputList, buttonElement, params) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(params.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(params.inactiveButtonClass);
  }
};

function enableValidation(params) {
  const popupForm = document.querySelectorAll(params.formSelector);

  popupForm.forEach(form => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
    setEventListeners(form, params);
  });
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__form-submit',
  inactiveButtonClass: 'popup__form-submit_disabled',
  inputErrorClass: 'popup__form-input_error',
  errorClass: 'popup__form-input-error_active'
});
