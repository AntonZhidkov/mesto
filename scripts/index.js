const popup = document.querySelector('.popup');
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
const closePopupCard = document.querySelector('.popup-card__close-button');
const popupSoptName = popupSpot.querySelector('.popup__input_type_name');
const popupSpotUrl = popupSpot.querySelector('.popup__input_type_occupation');
const spotElements = document.createDocumentFragment();
const spots = document.querySelector('.elements');
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
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
  openPopup(popupEdit);
  popupName.value = profileName.textContent;
  popupOccupation.value = profileOccupation.textContent;
}

// форма редактирования/добавления юзера в профиль-попапе
function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileOccupation.textContent = popupOccupation.value;
  closePopup(popupEdit);
};

// форма добавления новой карточки
function formSubmitHandlerAdd (evt) {
  evt.preventDefault();
  const spotValue = popupSoptName.value;
  const linkValue = popupSpotUrl.value;
  const spotArr = { name: spotValue, link: linkValue};
  const spotElement = createCard(spotArr);
  spots.prepend(spotElement);
  closePopup(popupSpot);
  popupSoptName.value = '', popupSpotUrl.value = '';
};

// функция создания карточки 
function createCard (cardInfo) {
  const spotElement = templateCard.cloneNode(true);
  const popupImg = document.querySelector('.popup-card__img');
  const popupCaption = document.querySelector('.popup-card__caption');
  spotElement.querySelector('.element__pic').src = cardInfo.link;
  spotElement.querySelector('.element__pic').alt = cardInfo.name;
  spotElement.querySelector('.element__pic-name').textContent = cardInfo.name;
  spotElement.querySelector('.element__pic-like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__pic-like_active');
  });
  spotElement.querySelector('.element__delete').addEventListener('click', function (evt) {
    evt.target.closest('.element').remove();
  });
  spotElement.querySelector('.element__pic').addEventListener('click', function (evt) {
    openPopup(popupCard);
    popupImg.src = evt.target.src;
    popupImg.alt = cardInfo.name;
    popupCaption.textContent = cardInfo.name;
  });
  return spotElement;
};

// подключаем карточки 'из коробки' 
initialCards.forEach(function (spotElement) {
  spotElements.append(createCard(spotElement));
});
spots.append(spotElements);

openPopupBtn.addEventListener('click', openPopupEdit);
closePopupBtn.addEventListener('click', () => closePopup(popupEdit));
popupForm.addEventListener('submit', formSubmitHandler);
openPopupSpotBtn.addEventListener('click', () => openPopup(popupSpot));
closePopupSpotBtn.addEventListener('click', () => closePopup(popupSpot));
popupFormSpot.addEventListener('submit', formSubmitHandlerAdd);
closePopupCard.addEventListener('click', () => closePopup(popupCard));
