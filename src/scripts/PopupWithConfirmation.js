import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleConfirm ) {
    super(popupSelector);
    this._handleConfirm = handleConfirm;
    this._confirmButton = this._popupElement.querySelector('.popup__confirm-btn');
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener('click', () => {
      this._handleConfirm();
    });
  }

    open (cardId, cardInstance) {
      this._cardId = cardId;
      this._cardInstance = cardInstance;
      super.open();
    }

    close() {
      super.close();
      this._cardId = null;
      this._cardInstance = null;
    }
  }

