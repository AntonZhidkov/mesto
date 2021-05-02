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
      cardPic.src = this._link;
      cardPic.alt = this._name;
      cardText.textContent = this._name;
      this._SetEventListeners();
      return this._element;
    }

    // слушаем лайки, ремувы, открытие попапа карточки. коллбэком вызываем соответствующие функции
  _SetEventListeners() {
    this._element.querySelector('.element__pic-like').addEventListener('click', () => {
      this._onCardLike();
    })
    this._element.querySelector('.element__delete').addEventListener('click', () => {
      this._onCardRemove();
    })
    this._element.querySelector('.element__pic').addEventListener('click', () => {
      this._handleCardClick(this._link, this._name,);
    })
  }

  _onCardLike() {
    this._element.querySelector('.element__pic-like').classList.toggle('element__pic-like_active');
  }

  _onCardRemove() {
    this._element.closest('.element').remove();
  }
};

