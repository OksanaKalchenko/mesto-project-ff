export function createCard(
    cardData,
    cardTemplate,
    handlers
  ) {
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    const deleteButton = cardElement.querySelector(".card__delete-button");
    const cardImage = cardElement.querySelector(".card__image");
    const likeButton = cardElement.querySelector(".card__like-button");
  
    cardElement.querySelector(".card__title").textContent = cardData.name;
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;

    deleteButton.addEventListener("click", function () {
        handlers.deleteCard(cardElement)
  });
  
    cardImage.addEventListener("click", function () {
        handlers.openPopupImage(cardData);
  });

    likeButton.addEventListener("click", handlers.likeCard);
  
    return cardElement;
  }
  
  export function deleteCard(card) {
    card.remove();
  }
  
  export function likeCard(evt) {
    evt.target.classList.toggle("card__like-button_is-active");
  }