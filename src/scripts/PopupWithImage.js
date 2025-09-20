import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._popupElement.querySelector('.image-popup__image');
    this._titleElement = this._popupElement.querySelector('.image-popup__title');

    this._closePopupOnEscape = this._closePopupOnEscape.bind(this);
    this._closePopupOnClickOutside = this._closePopupOnClickOutside.bind(this);
  }


open(name, link) {
  this._imageElement.src = link;
  this._imageElement.alt = name;
  this._titleElement.textContent = name;

  super.open();

  this._popupElement.classList.remove('popup_opened');
  this._popupElement.classList.add('image-popup_opened');
  document.body.style.overflow = 'hidden';

  document.addEventListener('keydown', this._closePopupOnEscape);
  document.addEventListener('mousedown', this._closePopupOnClickOutside);
}

close(){
  this._popupElement.classList.remove('image-popup_opened');
  document.body.style.overflow ='auto';

  document.removeEventListener('keydown', this._closePopupOnEscape);
  document.removeEventListener('mousedown', this._closePopupOnClickOutside);

  super.close();
}

_closePopupOnEscape(evt) {
  if (evt.key === 'Escape') {
    this.close();
  }
}

_closePopupOnClickOutside(evt) {
  const isInsidePopup = this._imageElement.contains(evt.target) || this._titleElement.contains(evt.target);
  if (!isInsidePopup) {
    this.close();
  }
}

}


