/* кодим профиль-попап */
const popup = document.querySelector('.popup');
const popupEdit = document.querySelector('.popup_edit');
const popupForm = document.querySelector('.popup__form');
const openPopupBtn = document.querySelector('.profile__edit-button');
const closePopupBtn = document.querySelector('.popup__close-button');
const popupName = document.querySelector('.popup__input_type_name');
const popupOccupation = document.querySelector('.popup__input_type_occupation');
const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');

function openPopup (popup) {
    popup.classList.add('popup_visible');
};

function openPopupEdit () {
  openPopup(popupEdit);
  popupName.value = profileName.textContent;
  popupOccupation.value = profileOccupation.textContent;
}

function closePopupEdit () {
    popupEdit.classList.remove('popup_visible');
};

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = popupName.value;
    profileOccupation.textContent = popupOccupation.value;
    closePopupEdit()
};

openPopupBtn.addEventListener('click', openPopupEdit);
closePopupBtn.addEventListener('click', closePopupEdit);
popupForm.addEventListener('submit', formSubmitHandler);


/* кодим попап для добавления карточек */

const popupSpot = document.querySelector('.popup_spot');
const popupFormSpot = popupSpot.querySelector('.popup__form');
const openPopupSpotBtn = document.querySelector('.profile__add-button');
const closePopupSpotBtn = popupSpot.querySelector('.popup__close-button');
const popupSoptName = popupSpot.querySelector('.popup__input_type_name');
const popupSpotUrl = popupSpot.querySelector('.popup__input_type_occupation');

function openPopupSpot () {
    openPopup(popupSpot);
};

function closePopupSpot () {
    popupSpot.classList.remove('popup_visible');
};

openPopupSpotBtn.addEventListener('click', openPopupSpot);
closePopupSpotBtn.addEventListener('click', closePopupSpot);


/* кодим карточки "из коробки", лайки, ремувы, открытие попапа карточки*/

const popupCard = document.querySelector('.popup-card');
const popupImg = document.querySelector('.popup-card__img');
const popupCaption = document.querySelector('.popup-card__caption');
const elements = document.querySelector('.elements');
const templateCard = document.querySelector('.template-card').content;
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

initialCards.forEach(function (element) {
    const spotElement = templateCard.cloneNode(true);
    spotElement.querySelector('.element__pic').src = element.link;
    spotElement.querySelector('.element__pic').alt = element.name;
    spotElement.querySelector('.element__pic-name').textContent = element.name;
    spotElement.querySelector('.element__pic-like').addEventListener('click', function (evt) {
      evt.target.classList.toggle('element__pic-like_active');
    });
    spotElement.querySelector('.element__delete').addEventListener('click', function (evt) {
      evt.target.closest('.element').remove();
    });
    spotElement.querySelector('.element__pic').addEventListener('click', function (evt) {
      console.log('click!')
      openPopup(popupCard);
      popupImg.src = evt.target.src;
      popupImg.alt = element.name;
      popupCaption.textContent = element.name;
    });
    elements.append(spotElement);
});

