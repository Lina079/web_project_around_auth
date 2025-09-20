export default class Api {
  constructor(baseUrl, headers) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }
  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: this.headers,
      }).then((response) => {
        if (response.ok) return response.json();
        return Promise.reject('Error algo salio mal');
        })
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      method: "GET",
      headers: this.headers,
    }).then((response) => {
      if (response.ok) return response.json();
      return Promise.reject('Error algo salio mal');
    })
  }

  updateUserInfo({nameSelector, aboutSelector}) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: nameSelector,
        about: aboutSelector,
      })
    }).then((response) => {
      if (response.ok) return response.json();
      return Promise.reject('Error algo salio mal');
    })
    .then(resolve)
    .catch(reject);
  }, 500);
  });
  }

  createNewCard({name, link}) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link,
      })
    }).then((response) => {
      if (response.ok) return response.json();
      return Promise.reject('Error algo salio mal');
    })
  }

  addLike(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this.headers,
    }).then((response) => {
      if (response.ok) return response.json();
      return Promise.reject(`Error: ${response.status}`);
    })
  }
  removeLike(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this.headers,
    }).then((response) => {
      if (response.ok) return response.json();
      return Promise.reject(`Error: ${response.status}`);
    })
  }
  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    }).then((response) => {
      if (response.ok) return response.json();
      return Promise.reject(`Error: ${response.status}`);
    })
  }
  updateAvatar(avatarLink) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatarLink,
      })
    }).then((response) => {
      if (response.ok) return response.json();
      return Promise.reject(`Error: ${response.status}`);
    })
  }
}

