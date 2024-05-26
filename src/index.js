import "./pages/index.css";
import { createCard, deleteCard, likeCard } from "./components/card";
import { initialCards } from "./components/cards";
import { openPopup, closePopup } from "./components/modal";

const cardTemplate = document.querySelector("#card-template").content;
const CardList = document.querySelector(".places__list");

const popupProfileEdit = document.querySelector(".popup_type_edit");
const popupNewCardAdd = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");

const popupImage = popupTypeImage.querySelector(".popup__image");
const PopupImageCaption = popupTypeImage.querySelector(".popup__caption");

const buttonProfileEdit = document.querySelector(".profile__edit-button");
const buttonProfileAdd = document.querySelector(".profile__add-button");
const buttonsPopupClose = document.querySelectorAll(".popup__close");

const formPopupEditProfile = document.forms["edit-profile"];
const formPopupNewCardAdd = document.forms["new-place"];

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const cardHandlers = {
  deleteCard,
  openPopupImage,
  likeCard,
}

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = formPopupEditProfile.name.value;
  profileDescription.textContent = formPopupEditProfile.description.value;

  closePopup(popupProfileEdit);
}

formPopupEditProfile.addEventListener("submit", handleEditProfileFormSubmit);

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  const newCardData = {
    name: formPopupNewCardAdd['place-name'].value,
    link: formPopupNewCardAdd.link.value,
  }

  const newCard = createCard(newCardData, cardTemplate, cardHandlers);

  CardList.prepend(newCard);

  formPopupNewCardAdd.reset();

  closePopup(popupNewCardAdd);
}

formPopupNewCardAdd.addEventListener("submit", handleAddCardFormSubmit);

document.querySelectorAll(".popup").forEach(function (element) {
  element.classList.add("popup_is-animated");
});

buttonsPopupClose.forEach(function (btn) {
  const closestPopup = btn.closest(".popup");

  btn.addEventListener("click", function () {
    closePopup(closestPopup)});
});

initialCards.forEach(function (card) {
  const newCard = createCard(
    card,
    cardTemplate,
    cardHandlers
  );

  CardList.append(newCard);
});

buttonProfileEdit.addEventListener("click", function () {
  formPopupEditProfile.name.value = profileTitle.textContent;
  formPopupEditProfile.description.value = profileDescription.textContent;
  
  openPopup(popupProfileEdit);
});

buttonProfileAdd.addEventListener("click", function() {
  openPopup(popupNewCardAdd);
});

function openPopupImage(card) {
  popupImage.src = card.link;
  popupImage.alt = card.name;
  PopupImageCaption.textContent = card.name;

  openPopup(popupTypeImage);
}
