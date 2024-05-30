import "./pages/index.css";
import { createCard, deleteCard, likeCard } from "./components/card";
import { initialCards } from "./components/cards";
import { openPopup, closePopup } from "./components/modal";

const cardTemplate = document.querySelector("#card-template").content;
const cardList = document.querySelector(".places__list");

const popupProfileEdit = document.querySelector(".popup_type_edit");
const popupNewCardAdd = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");

const popupImage = popupTypeImage.querySelector(".popup__image");
const popupImageCaption = popupTypeImage.querySelector(".popup__caption");

const buttonProfileEdit = document.querySelector(".profile__edit-button");
const buttonProfileAdd = document.querySelector(".profile__add-button");
const buttonsPopupClose = document.querySelectorAll(".popup__close");

const formPopupEditProfile = document.forms["edit-profile"]; // получаем форму
const formPopupNewCardAdd = document.forms["new-place"]; // получаем форму

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const cardHandlers = {
  deleteCard,
  openPopupImage,
  likeCard,
}

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();  // отменим стандартное поведение

  profileTitle.textContent = formPopupEditProfile.name.value; //значение формы, которое потом отправляется на сервер
  profileDescription.textContent = formPopupEditProfile.description.value; //значение формы, которое потом отправляется на сервер

  closePopup(popupProfileEdit); //закрытие попапа редактирования профиля
}

formPopupEditProfile.addEventListener("submit", handleEditProfileFormSubmit); //отправка формы на сервер

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();  // отменим стандартное поведение

  const newCardData = {
    name: formPopupNewCardAdd['place-name'].value, //название места, которое потом отправляется на сервер
    link: formPopupNewCardAdd.link.value, //ссылка на картинку, которая потом отправляется на сервер
  } //значения новой карточки

  const newCard = createCard(newCardData, cardTemplate, cardHandlers); //берем значения уже имеющихся карточек

  cardList.prepend(newCard); //добавление новой карточки в начало списка

  formPopupNewCardAdd.reset();  //сброс введенного текста в форму каждый раз при добавлении новой карточки 

  closePopup(popupNewCardAdd); //закрытие попапа добавления карточки
}

formPopupNewCardAdd.addEventListener("submit", handleAddCardFormSubmit); //отправка формы на сервер

document.querySelectorAll(".popup").forEach(function (element) {
  element.classList.add("popup_is-animated"); //форич перебирает массив карточек и добавляет функцию анимации на каждом элементе массива
});

buttonsPopupClose.forEach(function (btn) {
  const closestPopup = btn.closest(".popup");

  btn.addEventListener("click", function () {
    closePopup(closestPopup)}); //закрытие попапов по кнопке крестика
});

initialCards.forEach(function (card) {
  const newCard = createCard(
    card,
    cardTemplate,
    cardHandlers
  );

  cardList.append(newCard); //позволяет добавлять несколько карточек (аппенд)
});

buttonProfileEdit.addEventListener("click", function () {
  formPopupEditProfile.name.value = profileTitle.textContent;
  formPopupEditProfile.description.value = profileDescription.textContent;
  
  openPopup(popupProfileEdit); //открытие попапа по кнопке редактирование профиля
});

buttonProfileAdd.addEventListener("click", function() {
  openPopup(popupNewCardAdd); //открытие попапа добавления новой карточки
});

function openPopupImage(card) {
  popupImage.src = card.link;
  popupImage.alt = card.name;
  popupImageCaption.textContent = card.name;

  openPopup(popupTypeImage); //открытие попапа картинки
}
