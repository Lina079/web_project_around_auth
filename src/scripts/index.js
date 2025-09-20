import Section from './Section.js';
import Card from './Card.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import FormValidator from './formValidator.js'
import UserInfoProject from './UserInfoProject.js';
import PopupWithConfirmation from './PopupWithConfirmation.js';
import Api from './Api.js';


document.addEventListener('DOMContentLoaded', () => {
  const openEditProfileButton = document.getElementById('open-edit');
  const openAddCardButton = document.getElementById("addButton-elements");

  const nameInput = document.querySelector("#name");
  const aboutInput = document.querySelector("#about");
  const titleInput = document.querySelector("#title");
  const placeInput = document.querySelector("#place");

  const openAvatarButton = document.querySelector('.profile__avatar-pencil');

  const api = new Api("https://around-api.es.tripleten-services.com/v1", {
      authorization: "6f3b5cfb-f567-4462-befe-fb5c9c2b0d52",
      "Content-Type": "application/json",
    })

  const userInfoProject = new UserInfoProject({
    nameSelector: '.profile__name',
    aboutSelector: '.profile__description',
    avatarSelector: '.profile__avatar-image',
  });

  api.getUserInfo()
  .then((data)=>{
    userInfoProject.setUserInfoProject({
      nameSelector: data.name,
      aboutSelector: data.about,
      avatarSelector: data.avatar
    });
  })
  .catch((err) => console.log(err));

  api.getInitialCards()
  .then(cardsFromServer => {
    const section = new Section({
      items: cardsFromServer,
        renderer: (cardData) => {
        const cardElement = createCard ({
        name: cardData.name,
        link: cardData.link,
        _id: cardData._id,
        isLiked: cardData.isLiked,
        });
        section.addItem(cardElement);
        }
      }, '.elements');
        section.renderItems();

    const addCardPopup = new PopupWithForm({
    popupSelector: '#popup-elements',
      handleFormSubmit: (formValues) => {
      api.createNewCard({
        name: formValues.title,
        link: formValues.place
        }).then((data) => {
          const newCardElement = createCard({
          name: data.name,
          link: data.link,
          _id: data._id,
          isLiked: false,
          });
          section.addItem(newCardElement);
          addCardPopup.close();
          })
          .catch((err) => console.log(err));
        }
      });

    addCardPopup.setEventListeners();
    openAddCardButton.addEventListener('click', () => {
    addCardPopup.open();
    });
  }).catch((err) => console.log(err));

  const popupWithImage = new PopupWithImage('.image-popup');
  popupWithImage.setEventListeners();

  function createCard(cardData) {
    const card = new Card(
      {
        name: cardData.name,
        link: cardData.link,
        _id: cardData._id,
        isLiked: cardData.isLiked,
      }, '#element-template',
      (name, link) => {
        popupWithImage.open(name, link);
      },
      (cardId, isLiked, cardInstance) => {
        if (!isLiked) {
          api.addLike(cardId)
          .then((updatedCardData) => {
            cardInstance.updateLikeState(updatedCardData.isLiked);
          })
          .catch((err) => console.log(err));
        } else {
          api.removeLike(cardId)
          .then((updatedCardData) => {
            cardInstance.updateLikeState(updatedCardData.isLiked);
          })
          .catch((err) => console.log(err));
        }
      },
      (cardId, cardInstance) => {
        popupWithConfirmation.open(cardId, cardInstance);
      }
    );
    return card.generateCard();
  }

   /* Función que maneja el clic en una tarjeta (abre la imagen)
   function handleCardClick(name, link) {
    popupWithImage.open(name, link);
  }*/

  const editProfilePopup = new PopupWithForm({
    popupSelector: '#popup-form',
    handleFormSubmit: (formValues) => {
      editProfilePopup.renderLoading(true);
      api.updateUserInfo({
        nameSelector: formValues.name,
        aboutSelector: formValues.about
      })
      .then((data) => {
        userInfoProject.setUserInfoProject({
          nameSelector: data.name,
          aboutSelector: data.about,
          avatarSelector: data.avatar
      });
      editProfilePopup.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        editProfilePopup.renderLoading(false);
      });
    }
  });
  editProfilePopup.setEventListeners();

  openEditProfileButton.addEventListener('click', () => {
    profileFormValidator._resetValidation();
    editProfilePopup.open();
  });

  const activeColor = 'black';
  const inactiveColor = '#c4c4c4';

  function handleInputColor(input) {
    input.style.color = input.value.trim() ? activeColor : inactiveColor;
  }

  [titleInput, placeInput, nameInput, aboutInput].forEach((input) => {
    input.addEventListener('input', () => handleInputColor(input));
  });

  const popupWithConfirmation = new PopupWithConfirmation("#popup-delete", () => {
    api.deleteCard(popupWithConfirmation._cardId)
    .then(() => {
      popupWithConfirmation._cardInstance._element.remove();
      popupWithConfirmation.close();
    })
    .catch((err) => console.log(err));
  }
  );
  popupWithConfirmation.setEventListeners();

  const avatarPopup = new PopupWithForm({
    popupSelector: '#popup-avatar',
    handleFormSubmit: (formValues) => {
      api.updateAvatar(formValues.avatar)
      .then((data) => {
        userInfoProject.setUserInfoProject({
          nameSelector: data.name,
          aboutSelector: data.about,
          avatarSelector: data.avatar
        });
        avatarPopup.close();
      })
      .catch((err) => console.log(err));
    }
  });
  avatarPopup.setEventListeners();

  openAvatarButton.addEventListener('click', () => {
    avatarPopup.open();
  });

  const formValidatorSettings = {
    formSelector: ".popup__form",
    inputSelector: ".popup__form-input",
    submitButtonSelector: ".popup__form-btn",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__form-input-error",
    errorClass: "popup__error_visible"
  };

  const editForm = document.querySelector('#editform');
  const addCardForm = document.querySelector('#editform-elements');
  const avatarForm = document.querySelector('#avatar-form');

  // Validación para el formulario de editar perfil
  const profileFormValidator = new FormValidator(formValidatorSettings, editForm);
  profileFormValidator.enableValidation();

  // Validación para el formulario de agregar tarjeta
  const elementsFormValidator = new FormValidator(formValidatorSettings, addCardForm);
  elementsFormValidator.enableValidation();

  // Validación para el formulario de avatar
  const avatarFormValidator = new FormValidator(formValidatorSettings, avatarForm);
  avatarFormValidator.enableValidation();

});
