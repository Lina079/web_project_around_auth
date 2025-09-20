export default class Popup {
  constructor(popupSelector){
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleMouseDown = this._handleMouseDown.bind(this);
  }

open() {
  this._popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', this._handleEscClose);
  document.addEventListener('mousedown', this._handleMouseDown);
}

close() {
  this._popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', this._handleEscClose);
  document.removeEventListener('mousedown', this._handleMouseDown);
}

_handleEscClose(evt) {
  if (evt.key === 'Escape') {
    this.close();
  }
}

_handleMouseDown(evt) {
  const isInsidePoup = this._popupElement.contains(evt.target);
  const isCloseButton = evt.target.closest('.popup__close-btn');

  if (!isInsidePoup || isCloseButton) {
    this.close();
  }
}

setEventListeners() {
  const closeButton = this._popupElement.querySelector('.popup__close-btn');
  if (closeButton) {
    closeButton.addEventListener('click', () => this.close());
  }
}

}

