export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

export default class FormValidator {
  constructor(validationConfig, formElement) {
    this._validationConfig = validationConfig
    this._formElement = formElement;
  }

  // сбрасываем ошибки валидации
  removeInputError() {
    this._inputList.forEach((input)=> {
      const errorElement = this._formElement.querySelector(`.${input.id}-error`);
      errorElement.textContent = '';
      input.classList.remove(this._validationConfig.errorClass);
      input.classList.remove(this._validationConfig.inputErrorClass);
    });
  };

  // активируем кнопку сабмита
  activateSubmitButton() {
    const submitButton = this._formElement.querySelector(this._validationConfig.submitButtonSelector);
    submitButton.classList.remove(this._validationConfig.inactiveButtonClass);
    submitButton.disabled = false;
  };
    
  // деактивируем кнопку сабмита
  deactivateSubmitButton() {
    const submitButton = this._formElement.querySelector(this._validationConfig.submitButtonSelector);
    submitButton.classList.add(this._validationConfig.inactiveButtonClass);
    submitButton.disabled = true;
  };

  // добавляем свойства с ошибкой елементу формы
  _showInputError = (input, errorMessage) => {
    const errorElement = this._formElement.querySelector(`.${input.id}-error`); // находим элемент ошибки
    input.classList.add(this._validationConfig.inputErrorClass); // подчёркиваем красным
    errorElement.textContent = errorMessage; // текст сообщения об ошибке
    errorElement.classList.add(this._validationConfig.errorClass); // выводим сообщение об ошибке
  };
  
  // удаляем свойства с ошибкой у элемента формы
  _hideInputError = (input) => {
    const errorElement = this._formElement.querySelector(`.${input.id}-error`);
    input.classList.remove(this._validationConfig.inputErrorClass);
    errorElement.classList.remove(this._validationConfig.errorClass);
    errorElement.textContent = '';
  };
  
  // проверяем валидность инпута и вызываем функцию удаления или добаления свойств с ошибкой
  _isValid = (input) => {
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    }
  };
  
  // ищем инпуты, слушаем и вызываем  isValid на каждый ввод символа
  _setEventListeners() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._validationConfig.inputSelector)); // сводим все инпуты в массив
    const submitButton = this._formElement.querySelector(this._validationConfig.submitButtonSelector);
    this._inputList.forEach((input) => { // проходим по каждому
      input.addEventListener('input', () => { // слушаем
        this._isValid(input) // вызываем проверку на валидность
        this._toggleButtonState(this._inputList, submitButton); // вызываем проверку инпутов и изменение активности кнопки
      });
    });
  };
  
  // слушаем и вызываем setEventListeners 
  enableValidation() {
      this._formElement.addEventListener('submit', (evt) => { // слушаем
        evt.preventDefault(); // отменяем стандартное поведение
      });
      this._setEventListeners(); // вызываем прослушку инпутов
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
      submitButton.disabled = true;
    } else {
      submitButton.classList.remove(this._validationConfig.inactiveButtonClass);
      submitButton.disabled = false;
    }
  };
}