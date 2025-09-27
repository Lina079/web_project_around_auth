import { token as authToken } from './auth';

const BASE_URL = "https://around-api.en.tripleten-services.com/v1";
const API_KEY = '6f3b5cfb-f567-4462-befe-fb5c9c2b0d52';

class Api {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }
 get _json() {
    return {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
  }
// Headers con token de autorización

__headersWithJwt() {
  const jwt = authToken.get();
  return jwt
   ? { ...this._json, Authorization: `Bearer ${jwt}` }
   : this._json;
}

_headersWithApikey(){
  return { ... this._json, Authorization: API_KEY };
}


// Manejo de respuestas
  async _handleResponse(res) {
    if (res.status === 204) return {}; // No content
    const text = await res.text();
    const data = text ? JSON.parse(text) : {};
    if (!res.ok) {
      throw new Error(data.message || `Error: ${res.status}`);
    }
    return data;
  }

  // Usuarios

  getUserInfo () {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headersWithApikey(),
    }).then((res) => this._handleResponse(res));
  }

  updateUserInfo({ name, about}) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headersWithApikey(),
      body: JSON.stringify({ name, about }),
    }).then((res) => this._handleResponse(res));
  }

  setUserAvatar({ avatar }) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headersWithApikey(),
      body: JSON.stringify({ avatar }),
    }).then((res) => this._handleResponse(res));
  }

  // Cards

  getCardList() {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'GET',
      headers: this._headersWithApikey(),
    }).then((res) => this._handleResponse(res));
  }

  addCard({ name, link }) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this._headersWithApikey(),
      body: JSON.stringify({ name, link }),
    }).then((res) => this._handleResponse(res));
  }

  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headersWithApikey(),
    }).then((res) => this._handleResponse(res));
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? 'PUT' : 'DELETE',
      headers: this._headersWithApikey(),
    }).then((res) => this._handleResponse(res));
  }
}

const api = new Api (BASE_URL);

export default api;




