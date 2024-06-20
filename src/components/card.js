
import { deleteLike, addLike } from "./api"

export function createCard(
    cardData,
    cardTemplate,
    handlers, 
    userId
  ) {
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    const deleteButton = cardElement.querySelector(".card__delete-button");
    const cardImage = cardElement.querySelector(".card__image");
    const likeButton = cardElement.querySelector(".card__like-button");
    const likesCounter = cardElement.querySelector(".card__like-counter");
  
    cardElement.querySelector(".card__title").textContent = cardData.name;
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;

    if (cardData.owner._id === userId) {
    deleteButton.addEventListener("click", function () {
        handlers.deleteCard(cardElement, cardData._id)
  });
    } else {
      deleteButton.remove();
    }
  

    likesCounter.textContent = cardData.likes.length;

    
    if (cardData.likes.some((like) => like._id === userId)) {
      likeButton.classList.add("card__like-button_is-active");
    }
  
    likeButton.addEventListener("click", (evt) =>
      handlers.likeCard(evt, cardData._id, likesCounter)
    );


    cardImage.addEventListener("click", function () {
      handlers.openPopupImage(cardData);
});
  
    return cardElement;
  }

  export function likeCard(likeButton, cardId, likesCounter) {
    const isLiked = likeButton.target.classList.contains("card__like-button_is-active");
    const likeMethod = isLiked ? deleteLike : addLike;
    likeMethod(cardId)
   
      .then((res) => {
        
        likeButton.target.classList.toggle("card__like-button_is-active");
        likesCounter.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log('Ошибка', err)
    });
  }
