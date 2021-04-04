const popupEdit = document.querySelector('.popup_edit');
const popupForm = document.querySelector('.popup__form');
const openPopupBtn = document.querySelector('.profile__edit-button');
const closePopupBtn = document.querySelector('.popup__close-button');
const popupName = document.querySelector('.popup__input_type_name');
const popupOccupation = document.querySelector('.popup__input_type_occupation');
const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');
const templateCard = document.querySelector('.template-card').content;
const popupSpot = document.querySelector('.popup_spot');
const popupFormSpot = popupSpot.querySelector('.popup__form');
const openPopupSpotBtn = document.querySelector('.profile__add-button');
const closePopupSpotBtn = popupSpot.querySelector('.popup__close-button');
const popupCard = document.querySelector('.popup-card');
const closePopupCard = popupCard.querySelector('.popup__close-button');
const popupSoptName = popupSpot.querySelector('.popup__input_type_name');
const popupSpotUrl = popupSpot.querySelector('.popup__input_type_occupation');
const spots = document.querySelector('.elements');
const popupImg = document.querySelector('.popup-card__img');
const popupCaption = document.querySelector('.popup-card__caption');

// открываем попап
function openPopup (popup) {
  popup.classList.add('popup_visible');
};

// закрываем попап
function closePopup (popup) {
  popup.classList.remove('popup_visible');
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
  const spotElement = createCard({ name: spotValue, link: linkValue});
  spots.prepend(spotElement);
  closePopup(popupSpot);
  popupFormSpot.reset();
};

//ставим/снимаем лайки
function onCardLike (evt) {
  evt.target.classList.toggle('element__pic-like_active');
};

//удаляем карточку
function onCardRemove (evt) {
  evt.target.closest('.element').remove();
};

// функция создания карточки
function createCard (cardInfo) {
  const spotElement = templateCard.cloneNode(true);
  const elementPic = spotElement.querySelector('.element__pic');
  const elementPicName = spotElement.querySelector('.element__pic-name');
  const elementPicLike = spotElement.querySelector('.element__pic-like');
  const elementDelete = spotElement.querySelector('.element__delete');
  elementPic.src = cardInfo.link;
  elementPic.alt = cardInfo.name;
  elementPicName.textContent = cardInfo.name;
  // слушаем лайки и ремувы
  elementPicLike.addEventListener('click', onCardLike);
  elementDelete.addEventListener('click', onCardRemove);
  // слушаем клик по картинке и открываем попап карточки с данными из cardInfo
  elementPic.addEventListener('click', function () {
    openPopup(popupCard);
    popupImg.src = cardInfo.link;
    popupImg.alt = cardInfo.name;
    popupCaption.textContent = cardInfo.name;
  });
  return spotElement;
};

// подключаем карточки 'из коробки'
const cardsContainer = document.querySelector('.elements');
initialCards.forEach((card) => {
  const cardElement = createCard(card);
  cardsContainer.append(cardElement);
});

// слушаем открытие попапов
openPopupBtn.addEventListener('click', openPopupEdit);
openPopupSpotBtn.addEventListener('click', () => openPopup(popupSpot));

// слушаем закрытие попапов
closePopupBtn.addEventListener('click', () => closePopup(popupEdit));
closePopupSpotBtn.addEventListener('click', () => closePopup(popupSpot));
closePopupCard.addEventListener('click', () => closePopup(popupCard));

// слушаем события в формах редактирования пользователя и добаления карточки
popupForm.addEventListener('submit', formSubmitHandler);
popupFormSpot.addEventListener('submit', formSubmitHandlerAdd);