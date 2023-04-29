//работа с input
function setInputValidState({inputErrorClass, errorSpan}, input, errorElement) {
  input.classList.remove(inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(errorSpan);
};

function setInputInvalidState({inputErrorClass, errorSpan}, input, errorElement) {
  input.classList.add(inputErrorClass);
  errorElement.textContent = input.validationMessage;
  errorElement.classList.add(errorSpan);
};

//функция проверки инпута
function checkInputValidity ({inputErrorClass, errorSpan }, input) {
  const errorElement = document.querySelector(`#error-${input.id}`);
  if (input.checkValidity()) {
    setInputValidState ({inputErrorClass, errorSpan}, input, errorElement);
  } else {
    setInputInvalidState ({inputErrorClass, errorSpan}, input, errorElement);
  };
};

//работа с формой редактирования
function disableButton (inactiveButtonClass, button) {
  button.setAttribute('disabled', '');
  button.classList.add(inactiveButtonClass);
}
function enableButton (inactiveButtonClass, button) {
  button.removeAttribute('disabled');
  button.classList.remove(inactiveButtonClass);
};

//функция проверки формы
function toggleButtonValidity ({ submitButtonSelector, inactiveButtonClass}, formOne) {
  const editButton = formOne.querySelector(submitButtonSelector);
  if (formOne.checkValidity()) {
    enableButton(inactiveButtonClass, editButton);
  } else {
    disableButton(inactiveButtonClass, editButton);
  }; 
};

function enableValidation ({ formSelector, inputSelector, ...rest}) {
  const formList = document.querySelectorAll(formSelector);
  const formListArray = Array.from(formList);
  
  formListArray.forEach ((formOne) => {
    formOne.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    toggleButtonValidity(rest, formOne);
    formOne.addEventListener('reset', (evt) => {
      evt.preventDefault();
      inputListArray.forEach(input => input.value = '');
      toggleButtonValidity(rest, formOne);
    }); 
    
    const inputList = formOne.querySelectorAll(inputSelector);
    const inputListArray = Array.from(inputList);
    inputListArray.forEach ((input) => {
      input.addEventListener('input', () => {
        checkInputValidity(rest, input);
        toggleButtonValidity(rest, formOne);
      });
    });
  });
};

enableValidation ({
    formSelector: '.popup__fieldset',
    inputSelector: '.popup__form',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_type_error',
    inputErrorClass: 'popup__form_invalid',
    errorSpan: 'popup__input_type_error'
  });