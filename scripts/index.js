import {initialCards} from './cards.js';
import FormValidator from './FormValidator.js';
import {validationConfig} from './FormValidator.js';
import Card from './Card.js';

const popupEdit = document.querySelector('.popup_edit');
const popupForm = document.querySelector('.popup__form');
const openEditProfilePopupBtn = document.querySelector('.profile__edit-button');
const closeEditProfileBtn = document.querySelector('.popup__close-button');
const popupName = document.querySelector('.popup__input_type_name');
const popupOccupation = document.querySelector('.popup__input_type_occupation');
const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');
const popupImg = document.querySelector('.popup-card__img');
const popupCaption = document.querySelector('.popup-card__caption');
const popupSpot = document.querySelector('.popup_spot');
const popupFormSpot = popupSpot.querySelector('.popup__form');
const openPopupSpotBtn = document.querySelector('.profile__add-button');
const closePopupSpotBtn = popupSpot.querySelector('.popup__close-button');
const popupCard = document.querySelector('.popup-card');
const closePopupCard = popupCard.querySelector('.popup__close-button');
const inputCardTitle = popupSpot.querySelector('.popup__input_type_spot-name');
const inputCardUrl = popupSpot.querySelector('.popup__input_type_spot-url');
const spots = document.querySelector('.elements');
const submitButton = popupSpot.querySelector('.popup__save-button');
const saveButton = popupEdit.querySelector('.popup__save-button');
const addCardFormValidator = new FormValidator(validationConfig, popupSpot);
const editProfileFormValidator = new FormValidator(validationConfig, popupEdit);
editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();
const cardTemplateSelector = '.template-card';

// открываем попап
function openPopup (popup) {
  popup.classList.add('popup_visible');
  document.addEventListener('keydown', escapeClosePopup); // слушаем нажатие на Escape
  document.addEventListener('click', overlayClosePopup); // слушаем клик по оверлэй
};

// закрываем попап
function closePopup (popup) {
  popup.classList.remove('popup_visible');
  document.removeEventListener('keydown', escapeClosePopup);
  document.removeEventListener('click', overlayClosePopup);
};

// закрываем попап эскейпом
function escapeClosePopup (evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_visible');
    closePopup(openedPopup);
  }
};

// закрываем попап кликом на оверлэй
function overlayClosePopup (evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
};

// открываем профиль-попап с юзер-данными 
function openPopupEdit () {
  popupName.value = profileName.textContent;
  popupOccupation.value = profileOccupation.textContent;
  openPopup(popupEdit);
}

// форма редактирования/добавления юзера в профиль-попапе
function formEditProfileSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileOccupation.textContent = popupOccupation.value;
  closePopup(popupEdit);
};

// создаём экземпляр карточки при помощи класса Card
function createCard(data) {
  const cardElement = new Card(data, cardTemplateSelector, handleCardClick);
  return cardElement.generateCard();
};

//форма добавления новой карточки
function formAddCardSubmitHandler (evt) {
  evt.preventDefault();
  const spotValue = inputCardTitle.value;
  const linkValue = inputCardUrl.value;
  spots.prepend(createCard({ name: spotValue, link: linkValue}));
  closePopup(popupSpot);
  popupFormSpot.reset();
};

// открываем попап карточки
function handleCardClick(link, name) {
  popupImg.src = link;
  popupImg.alt = name;
  popupCaption.textContent = name;
  openPopup(popupCard);
};

// подключаем карточки 'из коробки'
const cardsContainer = document.querySelector('.elements');
initialCards.forEach((item) => {
  cardsContainer.append(createCard(item));
});

// слушаем открытие, сбрасываем предыдущие ошибки, валидируем
openEditProfilePopupBtn.addEventListener('click', () => {
  editProfileFormValidator.removeInputError();
  editProfileFormValidator.activateSubmitButton();
  openPopupEdit();
});

// слушаем открытие, сбрасываем предыдущие ошибки, валидируем
openPopupSpotBtn.addEventListener('click', () => {
  addCardFormValidator.removeInputError();
  addCardFormValidator.deactivateSubmitButton();
  popupFormSpot.reset(); 
  openPopup(popupSpot);
});

// слушаем закрытие попапов
closeEditProfileBtn.addEventListener('click', () => closePopup(popupEdit));
closePopupSpotBtn.addEventListener('click', () => closePopup(popupSpot));
closePopupCard.addEventListener('click', () => closePopup(popupCard));

// слушаем события в формах редактирования пользователя и добаления карточки
popupForm.addEventListener('submit', formEditProfileSubmitHandler);
popupFormSpot.addEventListener('submit', formAddCardSubmitHandler);
