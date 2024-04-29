// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const content = document.querySelector('.content');
const cardList = document.querySelector('.places__list');

// @todo: Функция создания карточки

function createCard (element, deleteCard) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__title').textContent = element.name;

    cardElement.querySelector('.card__image').src = element.link;

    const deleteButton = cardElement.querySelector('.card__delete-button');
      deleteButton.addEventListener('click', deleteCard);

    return cardElement;
};

// @todo: Функция удаления карточки

function removeCard (evt) {
    const card = evt.target.closest('.card');
    card.remove();
}

// @todo: Вывести карточки на страницу

function renderInitialCards() {
    initialCards.forEach((element) => {
      cardList.append(createCard(element, removeCard));
    });
  }
  
  renderInitialCards();