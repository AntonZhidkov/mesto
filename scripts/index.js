/*const popup = document.querySelector('.popup');*/
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
const spotElements = document.createDocumentFragment();
const spots = document.querySelector('.elements');
/*const elementPic = document.querySelector('.element__pic');
const elementPicLike = document.querySelector('.element__pic-like');
const elementPicName = document.querySelector('.element__pic-name');*/

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

// форма добавления новой карточки
function formSubmitHandlerAdd (evt) {
  evt.preventDefault();
  const spotValue = popupSoptName.value;
  const linkValue = popupSpotUrl.value;
  const spotElement = createCard({ name: spotValue, link: linkValue});
  spots.prepend(spotElement);
  closePopup(popupSpot);
  popupFormSpot.reset();
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
openPopupSpotBtn.addEventListener('click', () => openPopup(popupSpot));
closePopupBtn.addEventListener('click', () => closePopup(popupEdit));
closePopupCard.addEventListener('click', () => closePopup(popupCard));
closePopupSpotBtn.addEventListener('click', () => closePopup(popupSpot));
popupForm.addEventListener('submit', formSubmitHandler);
popupFormSpot.addEventListener('submit', formSubmitHandlerAdd);




/*
function onCardLike(event) {
  // Тут ставите/снимаете лайк с иконки. Иконка находится в event.target, т.к. на ней и установлен слушатель.
}
function onCardImagePopup(event) {
  // Тут открываете попап с большой картинкой. Картинка находится в event.target, , т.к. на ней и установлен слушатель.
}
// Общая функция, которая создаёт DOM-элемент с карточкой и возращает его.
function createCard(cardData) {
  // Находим шаблон и клонируем его
  const element = document.querySelector('.template').cloneNode(true);
  // Находим элементы в **клонированном шаблоне**, с которыми будем работать.
  const titleElement = element.querySelector('.card__title');
  const imageElement = element.querySelector('.card__image');
  const likeIconElement = element.querySelector('.card__like');
  const removeIconElement = element.querySelector('.card__remove');
  // Устанавливаем заголовок и URL картинки из объекта параметров (аргумента функции)
  titleElement.textContent = cardData.title;
  imageElement.src = cardData.link;
  // Устанавливаем слушатели нажатий.
  likeIconElement.addEventListener('click', onCardLike);
  removeIconElement.addEventListener('click', onCardImagePopup);
  // Возвращаем готовый элемент DOM.
  // Обратите внимание, мы его никуда не вставили на страницу, в DOM его нет.
  // Он пока хранится в переменной в памяти и нигде больше.
  return element;
}
// Массив первоначальных карточек
const cards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
];
// Элемент, куда будем вставлять карточки.
const cardsContainer = document.querySelector('.cards');
// Итерируемся по карточкам в цикле. Для каждой карточки создаем элемент DOM из шаблона и вставляем его в страницу.
cards.forEach((card) => {
  // Создали DOM элемент (его возвращает функция).
  const cardElement = createCard(card);
  // Вставили его на страницу.
  cardsContainer.append(cardElement);
});
// Форма добавления новой карточки.
const formElement = document.querySelector('.form');
// Инпуты с данными этой формы
const formInputName = formElement.querySelector('form__name');
const formInputImage = formElement.querySelector('form__image');
// Функция-коллбэк события отправки формы.
function onFormSubmit(event) {
  // Предотвращаем перезагрузку страницы при реальной отправке формы.
  event.preventDefault();
  // Достаём значения из инпутов.
  const name = formInputName.value;
  const imageSrc = formInputImage.value;
  // Создаём объект для передачи в функцию создания элемента-карточки.
  // Она на входе ожидает объект, а у нас пока только 2 строки есть.
  const cardData = {
    name: name,
    link: imageSrc
  };
  // Получаем DOM-элемент из функции.
  const cardElement = createCard(cardData);
  // Вставляем его в DOM, но первым ребёнком, а не в конце, как первоначальные карточки.
  cardsContainer.prepend(cardElement);
}
// Слушаем отправку формы
formElement.addEventListener('submit', onFormSubmit);*/
