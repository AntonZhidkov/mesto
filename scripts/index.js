let popup = document.querySelector('.popup');
let openPopupBtn = document.querySelector('.profile__edit-button');
let closePopupBtn = document.querySelector('.popup__close-button');
let savePopupBtn = document.querySelector('.popup__save-button');
let profileName = document.querySelector('.profile__name');
let profileOccupation = document.querySelector('.profile__occupation');


function openPopup () {
    popup.classList.add('popup_visible');
}

function closePopup () {
    popup.classList.remove('popup_visible');
}

openPopupBtn.addEventListener('click', function() {
    openPopup ();
});

closePopupBtn.addEventListener('click', function() {
    closePopup ();
});

savePopupBtn.addEventListener('click', function() {
    editProfile ();
});

function editProfile () {
    let popupName = document.querySelector('.popup__input_type_name');
    let popupOccupation = document.querySelector('.popup__input_type_occupation');
    profileName.textContent = popupName.value;
    profileOccupation.textContent = popupOccupation.value;
    closePopup()
};