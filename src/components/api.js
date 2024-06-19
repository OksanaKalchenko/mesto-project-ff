const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-16',
    headers: {
      authorization: 'da715f51-d906-40c4-afcc-6524bd60b8f9',
      'Content-Type': 'application/json'
    },
  };

  //проверка ответа от сервера
  function checkResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  
  //загрузка информации о пользователе с сервера
  export const getAccountInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
      method: "GET",
      headers: config.headers
    })
    .then(checkResponse);
  }
  
  //загрузка карточек с сервера
  export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
      method: "GET",
      headers: config.headers
    })
    .then(checkResponse);
  }

  //добавление новой карточки
  export const createNewCard = (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
      method: "POST",
      headers: config.headers,
      body: JSON.stringify(name, link),
    })
    .then(checkResponse);
  };
  
  //обновление аватара пользователя
  export const patchAvatar = (link) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        avatar: `${link}`
      })
      })
    .then(checkResponse);
  }
  
  //редактирование профиля
  export const patchProfileInfo = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        name: `${name}`,
        about: `${about}`
      })
      })
      .then(checkResponse)
  }

  //удаление карточки
  export const deleteCardFromServer = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: config.headers,
    })
    .then(checkResponse);
  }

  //убрать лайк
  export const deleteLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: config.headers,
    })
    .then(checkResponse);
  }

  //поставить лайк
  export const addLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: config.headers,
    })
    .then(checkResponse);
  }

 