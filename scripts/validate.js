// валидируем формы

export default class FormValidator {
  constructor(validationConfig) {
    this._validationConfig = validationConfig

  }

  // добавляем свойства с ошибкой елементу формы
  _showInputError = (form, input, errorMessage) => {
    const errorElement = form.querySelector(`.${input.id}-error`); // находим элемент ошибки
    input.classList.add(this._validationConfig.inputErrorClass); // подчёркиваем красным
    errorElement.textContent = errorMessage; // текст сообщения об ошибке
    errorElement.classList.add(this._validationConfig.errorClass); // выводим сообщение об ошибке
  };
  
  // удаляем свойства с ошибкой у элемента формы
  _hideInputError = (form, input) => {
    const errorElement = form.querySelector(`.${input.id}-error`);
    input.classList.remove(this._validationConfig.inputErrorClass);
    errorElement.classList.remove(this._validationConfig.errorClass);
    errorElement.textContent = '';
  };
  
  // проверяем валидность инпута и вызываем функцию удаления или добаления свойств с ошибкой
  _isValid = (form, input) => {
    if (!input.validity.valid) {
      this._showInputError(form, input, input.validationMessage);
    } else {
      this._hideInputError(form, input);
    }
  };
  
  // ищем инпуты, слушаем и вызываем  isValid на каждый ввод символа
  _setEventListeners = (form) => {
    const inputList = Array.from(form.querySelectorAll(this._validationConfig.inputSelector)); // сводим все инпуты в массив
    const submitButton = form.querySelector(this._validationConfig.submitButtonSelector);
    inputList.forEach((input) => { // проходим по каждому
      input.addEventListener('input', () => { // слушаем
        this._isValid(form, input) // вызываем проверку на валидность
        this._toggleButtonState(inputList, submitButton); // вызываем проверку инпутов и изменение активности кнопки
      });
    });
  };
  
  // ищем формы, слушаем и вызываем setEventListeners 
  enableValidation = () => {
    const formList = Array.from(document.querySelectorAll(this._validationConfig.formSelector)); // сводим все формы в массив
    formList.forEach((form) => { // проходим по каждой
      form.addEventListener('submit', (evt) => { // слушаем
        evt.preventDefault(); // отменяем стандартное поведение
      });
      this._setEventListeners(form); // вызываем прослушку инпутов
    });
  };
  
  // принимаем массив инпутов и валидируем каждый
  _hasInvalidInput = (inputList) => {
    return inputList.some((input) => {
      return !input.validity.valid;
    })
  };
  
  // проверяем инпуты и делаем кнопку сабмита активной или неактивной
  _toggleButtonState = (inputList, submitButton) => {
    if (this._hasInvalidInput(inputList)) {
      submitButton.classList.add(this._validationConfig.inactiveButtonClass);
    } else {
      submitButton.classList.remove(this._validationConfig.inactiveButtonClass);
    }
  };
}



// Версия кода до рефакторинга в классы

// объект с настройками валидации
/*const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
  }
  
  // добавляем свойства с ошибкой елементу формы
  const showInputError = (form, input, errorMessage) => {
    const errorElement = form.querySelector(`.${input.id}-error`); // находим элемент ошибки
    input.classList.add(validationConfig.inputErrorClass); // подчёркиваем красным
    errorElement.textContent = errorMessage; // текст сообщения об ошибке
    errorElement.classList.add(validationConfig.errorClass); // выводим сообщение об ошибке
  };
  
  // удаляем свойства с ошибкой у элемента формы
  const hideInputError = (form, input) => {
    const errorElement = form.querySelector(`.${input.id}-error`);
    input.classList.remove(validationConfig.inputErrorClass);
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.textContent = '';
  };
  
  // проверяем валидность инпута и вызываем функцию удаления или добаления свойств с ошибкой
  const isValid = (form, input) => {
    if (!input.validity.valid) {
      showInputError(form, input, input.validationMessage);
    } else {
      hideInputError(form, input);
    }
  };
  
  // ищем инпуты, слушаем и вызываем  isValid на каждый ввод символа
  const setEventListeners = (form) => {
    const inputList = Array.from(form.querySelectorAll(validationConfig.inputSelector)); // сводим все инпуты в массив
    const submitButton = form.querySelector(validationConfig.submitButtonSelector);
    inputList.forEach((input) => { // проходим по каждому
      input.addEventListener('input', () => { // слушаем
        isValid(form, input) // вызываем проверку на валидность
        toggleButtonState(inputList, submitButton); // вызываем проверку инпутов и изменение активности кнопки
      });
    });
  };
  
  // ищем формы, слушаем и вызываем setEventListeners 
  const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector)); // сводим все формы в массив
    formList.forEach((form) => { // проходим по каждой
      form.addEventListener('submit', (evt) => { // слушаем
        evt.preventDefault(); // отменяем стандартное поведение
      });
      setEventListeners(form); // вызываем прослушку инпутов
    });
  };
  
  enableValidation(validationConfig);
  
  // принимаем массив инпутов и валидируем каждый
  const hasInvalidInput = (inputList) => {
    return inputList.some((input) => {
      return !input.validity.valid;
    })
  };
  
  // проверяем инпуты и делаем кнопку сабмита активной или неактивной
  const toggleButtonState = (inputList, submitButton) => {
    if (hasInvalidInput(inputList)) {
      submitButton.classList.add(validationConfig.inactiveButtonClass);
    } else {
      submitButton.classList.remove(validationConfig.inactiveButtonClass);
    }
  };*/
  