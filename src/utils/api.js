const BASE_URL = (import.meta.env.VITE_AROUND_BASE || 'https://around-api.en.tripleten-services.com/v1').replace(/\/+$/, '');

const API_KEY = import.meta.env.VITAE_ARAUND_BASE_KEY || '6f3b5cfb-f567-4462-befe-fb5c9c2b0d52';



class Api {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  //Encabezados base JSON
  get _json() {
    return {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
  }

  //Encabezados con JWT
  _headers(){
    const base = this._json;
    return { ...base, Authorization: API_KEY };
  }
// Manejo de respuestas
async _handleResponse(res) {
  const contentType = res.headers.get('content-type') || '';
  let payload;
  try {
    payload = contentType.includes('application/json')
    ? await res.json() : await res.text();
  } catch {
    payload = {};
  }
  if (!res.ok) {
    const message =
    (payload && typeof payload === 'object' && payload.message) ||
    (typeof payload === 'string' && payload) ||
    `Error: ${res.status}`;
    console.error('API error:', res.status, res.url, payload);
    throw new Error(message);
  }
  return payload;
}

  // Usuarios

  getUserInfo () {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers(),
    }).then((res) => this._handleResponse(res));
  }

  updateUserInfo({ name, about}) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers(),
      body: JSON.stringify({ name, about }),
    }).then((res) => this._handleResponse(res));
  }

  setUserAvatar({ avatar }) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers(),
      body: JSON.stringify({ avatar }),
    }).then((res) => this._handleResponse(res));
  }

  // Cards

  getCardList() {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers(),
    }).then((res) => this._handleResponse(res));
  }

  addCard({ name, link }) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers(),
      body: JSON.stringify({ name, link }),
    }).then((res) => this._handleResponse(res));
  }

  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers(),
    }).then((res) => this._handleResponse(res));
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? 'PUT' : 'DELETE',
      headers: this._headers(),
    }).then((res) => this._handleResponse(res));
  }
}

const api = new Api(BASE_URL);

export default api;




