import {initialCards} from './cards.js';
import FormValidator from './validate.js';
const popupEdit = document.querySelector('.popup_edit');
const popupForm = document.querySelector('.popup__form');
const openPopupBtn = document.querySelector('.profile__edit-button');
const closePopupBtn = document.querySelector('.popup__close-button');
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
const popupSoptName = popupSpot.querySelector('.popup__input_type_name');
const popupSpotUrl = popupSpot.querySelector('.popup__input_type_occupation');
const spots = document.querySelector('.elements');
const submitButton = popupSpot.querySelector('.popup__save-button');
//const templateCard = document.querySelector('.template-card').content;

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
function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileOccupation.textContent = popupOccupation.value;
  closePopup(popupEdit);
};

//форма добавления новой карточки
function formSubmitHandlerAdd (evt) {
  evt.preventDefault();
  const spotValue = popupSoptName.value;
  const linkValue = popupSpotUrl.value;
  const spotElement = new Card({ name: spotValue, link: linkValue}, '.template-card');
  spots.prepend(spotElement.generateCard({ name: spotValue, link: linkValue}));
  closePopup(popupSpot);
  popupFormSpot.reset();
};

//ставим/снимаем лайки
/*function onCardLike (evt) {
  evt.target.classList.toggle('element__pic-like_active');
};*/

//удаляем карточку
/*function onCardRemove (evt) {
  evt.target.closest('.element').remove();
};*/

/* открываем попап карточки
function handleCardClick(data) {
  popupImg.src = data.link;;
  popupImg.alt = data.name;
  popupCaption.textContent = data.name;
  openPopup(popupCard);
};*/



// функция создания карточки
/*
function createCard (data) {
  const spotElement = templateCard.cloneNode(true);
  const elementPic = spotElement.querySelector('.element__pic');
  const elementPicName = spotElement.querySelector('.element__pic-name');
  const elementPicLike = spotElement.querySelector('.element__pic-like');
  const elementDelete = spotElement.querySelector('.element__delete');
  elementPic.src = data.link;
  elementPic.alt = data.name;
  elementPicName.textContent = data.name;
  // слушаем лайки, ремувы и открытие попапа карточки
  elementPicLike.addEventListener('click', onCardLike);
  elementDelete.addEventListener('click', onCardRemove);
  elementPic.addEventListener('click', () => handleCardClick(data));
  return spotElement;
};*/

class Card {
  constructor(data, cardSelector, handleCardClick) {
      this._name = data.name;
      this._link = data.link;
      this._cardSelector = cardSelector;
      this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
      const cardElement = document
      .querySelector(this._cardSelector).content
      .querySelector('.element').cloneNode(true);
      return(cardElement);
  }

  generateCard() {
      this._element = this._getTemplate();
      const cardPic = this._element.querySelector('.element__pic');
      const cardText = this._element.querySelector('.element__pic-name');
      cardPic.src = this._link;
      cardPic.alt = this._name;
      cardText.textContent = this._name;
      this._SetEventListeners();
      return this._element;
    }

  _SetEventListeners() {
    this._element.querySelector('.element__pic-like').addEventListener('click', () => {
      this._onCardLike();
    })
    this._element.querySelector('.element__delete').addEventListener('click', () => {
      this._onCardRemove();
    })
    this._element.querySelector('.element__pic').addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    })
  }

  _onCardLike() {
    this._element.querySelector('.element__pic-like').classList.toggle('element__pic-like_active');
  }

  _onCardRemove() {
    this._element.closest('.element').remove();
  }
};

function handleCardClick(link, name) {
  popupImg.src = link;
  popupImg.alt = name;
  popupCaption.textContent = name;
  openPopup(popupCard);
};


// подключаем карточки 'из коробки'
const cardsContainer = document.querySelector('.elements');
initialCards.forEach((item/*сard*/) => {
  const cardElement = new Card(item, '.template-card');/*createCard(сard);*/
  const cardReady = cardElement.generateCard();
  cardsContainer.append(cardReady);
});

// слушаем открытие попапов
openPopupBtn.addEventListener('click', openPopupEdit);
openPopupSpotBtn.addEventListener('click', function () {
  submitButton.classList.add('popup__save-button_inactive'); // отключаем кнопку сабмита перед открытием попапа
  openPopup(popupSpot);
});

// слушаем закрытие попапов
closePopupBtn.addEventListener('click', () => closePopup(popupEdit));
closePopupSpotBtn.addEventListener('click', () => closePopup(popupSpot));
closePopupCard.addEventListener('click', () => closePopup(popupCard));

// слушаем события в формах редактирования пользователя и добаления карточки
popupForm.addEventListener('submit', formSubmitHandler);
popupFormSpot.addEventListener('submit', formSubmitHandlerAdd);


const form = new FormValidator({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
});

form.enableValidation();
