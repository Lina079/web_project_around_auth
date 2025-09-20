export default class Card {
  constructor({ name, link, _id, isLiked },
    templateSelector, handleCardClick, handleLikeClick, handleCardDelete)
    {
    this._name = name;
    this._link = link;
    this._id = _id;
    this.isLiked = isLiked;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleCardDelete = handleCardDelete;
  }

  _getTemplate(){
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.element__container')
    .cloneNode(true);

    return cardElement;
  }

  _handleOpenImage() {
    this._handleCardClick(this._name, this._link);
  }

  _handleDeleteCard(){
    this._element.remove();
    this._element = null;
  }

 _setEventListeners() {
  // Clic en la imagen para abrir popup
  this._element
    .querySelector('.element__container-photo')
    .addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });

  // Clic en el ícono de basura para eliminar tarjeta
  this._element
    .querySelector('.element__trash-icon')
    .addEventListener('click', () => {
      if (this._handleCardDelete) {
        this._handleCardDelete(this._id, this);
      }
    });

  // Clic en el ícono de corazón para dar "like"
  this._element.querySelector('.heart-icon')
    .addEventListener('click', () => {
      this._handleLikeClick(this._id, this.isLiked, this);
    });
}

  generateCard (){
    this._element = this._getTemplate();
    this._element.querySelector('.element__container-name-place')
    .textContent = this._name;

    if (this.isLiked){
      this._element.querySelector('.heart-icon')
      .classList.add('active');
    }

    const photoElement = this._element.querySelector('.element__container-photo');
    photoElement.src = this._link;
    photoElement.alt = this._name;

    this._setEventListeners();

    return this._element;
  }

  updateLikeState(isLiked) {
    this.isLiked = isLiked;
    const heartIcon = this._element.querySelector('.heart-icon');
    if (this.isLiked) {
      heartIcon.classList.add('active');
    } else {
      heartIcon.classList.remove('active');
    }
  }
}