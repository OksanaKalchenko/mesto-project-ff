export function openPopup(popup) {
    popup.classList.add("popup_is-opened");
  
    popup.addEventListener("click", closePopupOverlay);
    document.addEventListener("keydown", closePopupEsc);
  }
  
  export function closePopup(popup) {
    popup.classList.remove("popup_is-opened");
  
    document.removeEventListener("keydown", closePopupEsc)
  }
  
  function closePopupEsc(evt) {
    if (evt.key === "Escape") {
      const popup = document.querySelector(".popup_is-opened");
      if (popup) {
        closePopup(popup);
      }
    }
  }
  
  function closePopupOverlay(evt) {
    if (evt.target === evt.currentTarget) {
      closePopup(evt.currentTarget);
    }
  }