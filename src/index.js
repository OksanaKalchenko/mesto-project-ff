import "./pages/index.css";
import { createCard, likeCard } from "./components/card";
import { openPopup, closePopup } from "./components/modal";
import { clearValidation, enableValidation } from "./components/validation";
import { getAccountInfo, getInitialCards, createNewCard, patchAvatar, patchProfileInfo,deleteCardFromServer } from "./components/api"

const cardTemplate = document.querySelector("#card-template").content;
const cardList = document.querySelector(".places__list");

const popupProfileEdit = document.querySelector(".popup_type_edit");
const popupNewCardAdd = document.querySelector(".popup_type_new-card");
const popupDeleteCard = document.querySelector(".popup_type_delete-card");
const popupTypeImage = document.querySelector(".popup_type_image");
const popupTypeEditAvatar = document.querySelector(".popup_type_edit-avatar");

const popupImage = popupTypeImage.querySelector(".popup__image");
const popupImageCaption = popupTypeImage.querySelector(".popup__caption");

const buttonProfileEdit = document.querySelector(".profile__edit-button");
const buttonProfileAdd = document.querySelector(".profile__add-button");
const buttonsPopupClose = document.querySelectorAll(".popup__close");


const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");

const inputTypeImageName = document.querySelector(".popup__input_type_card-name");
const inputTypeImageUrl = document.querySelector(".popup__input_type_url");
const inputTypeAvatarUrl = document.querySelector(".popup__input_type_avatar-url");

const formPopupEditProfile = document.forms["edit-profile"];
const formPopupNewCardAdd = document.forms["new-place"];
const formPopupEditAvatar = document.forms["edit-avatar"];
const formPopupDeleteCard = document.forms["delete-card"];

const cardHandlers = {
  deleteCard,
  openPopupImage,
  likeCard,
};

//настройка валидации форм
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
};

//обработчик отправки формы редактирования профиля
function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();  // отмена стандартного поведения
  const name = formPopupEditProfile.name.value;
  const about = formPopupEditProfile.description.value;
  renderSaving(true)

  patchProfileInfo(name, about)
  .then((data) => {
    profileTitle.textContent = data.name;
    profileDescription.textContent = data.about;
    closePopup(popupProfileEdit); //закрытие попапа редактирования профиля
  })
  .catch((err) => 
    console.log("Ошибка", err))
  .finally(() => {
    renderSaving(false);
  });
};

formPopupEditProfile.addEventListener("submit", handleEditProfileFormSubmit); //отправка формы на сервер


//обработчик отправки формы добавления новой карточки
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();  // отмена стандартного поведения
  const name = inputTypeImageName.value;
  const link = inputTypeImageUrl.value;
  renderSaving(true);

  createNewCard({ name, link })
  .then((cardData) => {
    const newCard = createCard(cardData, cardTemplate, cardHandlers, cardData.owner._id);
    cardList.prepend(newCard); //добавление новой карточки в начало списка
    formPopupNewCardAdd.reset();  //сброс введенного текста в форму каждый раз при добавлении новой карточки
    closePopup(popupNewCardAdd); //закрытие попапа добавления карточки
  })
  .catch((err) => {
    console.log("Ошибка", err);
  })
  .finally(() => {
    renderSaving(false);
  });
};

formPopupNewCardAdd.addEventListener("submit", handleAddCardFormSubmit); //отправка формы на сервер

formPopupDeleteCard.addEventListener("submit", confirmDeleteCard);  //отправка формы на сервер

//обработчик отправки формы изменения аватара
function handleEditAvatarFormSubmit(evt) {
  evt.preventDefault();  // отмена стандартного поведения

  renderSaving(true);
  patchAvatar(inputTypeAvatarUrl.value)
    .then((res) => {
      profileImage.style.backgroundImage = `url(${res.avatar})`;
      formPopupEditAvatar.reset();
      closePopup(popupTypeEditAvatar);  //закрытие попапа изменения профиля
    })
    .catch((err) => {
      console.log("Ошибка", err);
    })
    .finally(() => {
      renderSaving(false);
    });
};

formPopupEditAvatar.addEventListener("submit", handleEditAvatarFormSubmit);  //отправка формы на сервер


buttonsPopupClose.forEach(function (btn) {
  const closestPopup = btn.closest(".popup");

  btn.addEventListener("click", function () {
    closePopup(closestPopup)}); //закрытие попапов
});


profileImage.addEventListener("click", () => {
  clearValidation(formPopupEditAvatar, validationConfig);
  formPopupEditAvatar.reset();
  openPopup(popupTypeEditAvatar);  //открытие попапа изменения аватара
});


buttonProfileEdit.addEventListener("click", () => {
  clearValidation(formPopupEditProfile, validationConfig);  //валидация форм
  formPopupEditProfile.name.value = profileTitle.textContent;
  formPopupEditProfile.description.value = profileDescription.textContent;
  formPopupEditProfile.reset();
  openPopup(popupProfileEdit);
});


buttonProfileAdd.addEventListener("click", function() {
  openPopup(popupNewCardAdd); //открытие попапа добавления новой карточки
  clearValidation(formPopupNewCardAdd, validationConfig);
  formPopupNewCardAdd.reset(); 
});

//попап увеличения картинки
function openPopupImage(card) {
  popupImage.src = card.link;
  popupImage.alt = card.name;
  popupImageCaption.textContent = card.name;

  openPopup(popupTypeImage); //открытие попапа картинки
}

document.querySelectorAll(".popup").forEach(function (element) {
  element.classList.add("popup_is-animated"); //форич перебирает массив карточек и добавляет функцию анимации на каждом элементе массива
});


enableValidation(validationConfig);

//текст кнопки при выполнении запроса на сервер
function renderSaving(isSaving) {
  const popupIsOpened = document.querySelector(".popup_is-opened");
  if (popupIsOpened) {
    const submitButton = popupIsOpened.querySelector(".popup__button");

    if (isSaving) {
      submitButton.textContent = "Сохранение...";
    } else {
      submitButton.textContent = "Сохранить";
    }
  }
};

//отображение массива карточек и профиля
Promise.all([getAccountInfo(), getInitialCards()])
  .then(([userData, cardsData]) => {
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url(${userData.avatar})`;

    cardsData.forEach(function (card) {
      const newCard = createCard(
        card,
        cardTemplate,
        cardHandlers,
        userData._id
      );
      cardList.append(newCard);
    })
  })
  .catch((err) => {
    console.log("Ошибка", err);
  });

let cardForRemove = null;
let cardForRemoveId = null;
  

function deleteCard(card, cardId) {
  cardForRemove = card;
  cardForRemoveId = cardId;
  openPopup(popupDeleteCard);
}

function confirmDeleteCard() {
  if (cardForRemove && cardForRemoveId) {
    deleteCardFromServer(cardForRemoveId)
      .then(() => {
        cardForRemove.remove();
        closePopup(popupDeleteCard);
        })
      .catch((err) => {
        console.log('Ошибка', err);
        });
    }
  }
