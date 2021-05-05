export default class Card {
  constructor(data, cardSelector, handleCardClick) {
      this._name = data.name;
      this._link = data.link;
      this._cardSelector = cardSelector;
      this._handleCardClick = handleCardClick;
  }

  // клонируем темплэйт
  _getTemplate() {
      const cardElement = document
      .querySelector(this._cardSelector).content
      .querySelector('.element').cloneNode(true);
      return(cardElement);
  }

  // наполняем содержимым
  generateCard() {
      this._element = this._getTemplate();
      const cardPic = this._element.querySelector('.element__pic');
      const cardText = this._element.querySelector('.element__pic-name');
      const cardLike = this._element.querySelector('.element__pic-like');
      this._cardLike = cardLike;
      this._cardPic = cardPic;
      cardPic.src = this._link;
      cardPic.alt = this._name;
      cardText.textContent = this._name;
      this._setEventListeners();
      return this._element;
    }

    // слушаем лайки, ремувы, открытие попапа карточки. коллбэком вызываем соответствующие функции
  _setEventListeners() {
    this._cardLike.addEventListener('click', () => {
      this._onCardLike();
    })
    this._element.querySelector('.element__delete').addEventListener('click', () => {
      this._onCardRemove();
    })
    this._cardPic.addEventListener('click', () => {
      this._handleCardClick(this._link, this._name,);
    })
  }

  _onCardLike() {
    this._cardLike.classList.toggle('element__pic-like_active');
  }

  _onCardRemove() {
    this._element.closest('.element').remove();
  }
};

