let popup = document.querySelector('.popup');
let popupForm = document.querySelector('.popup__form');
let openPopupBtn = document.querySelector('.profile__edit-button');
let closePopupBtn = document.querySelector('.popup__close-button');
let popupName = document.querySelector('.popup__input_type_name');
let popupOccupation = document.querySelector('.popup__input_type_occupation');
let profileName = document.querySelector('.profile__name');
let profileOccupation = document.querySelector('.profile__occupation');


function openPopup () {
    popup.classList.add('popup_visible');
    popupName.value = profileName.textContent;
    popupOccupation.value = profileOccupation.textContent;
};

function closePopup () {
    popup.classList.remove('popup_visible');
};

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = popupName.value;
    profileOccupation.textContent = popupOccupation.value;
    closePopup()
};


openPopupBtn.addEventListener('click', openPopup);

closePopupBtn.addEventListener('click', closePopup);

popupForm.addEventListener('submit', formSubmitHandler);

