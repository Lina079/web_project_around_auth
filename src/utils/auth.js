const BASE_URL = 'https://se-register-api.en.tripleten-services.com/v1';

const jsonHeaders = {
  'Content-Type': 'application/json',
};

async function handleResponse(response) {
  // error
  if (!response.ok) {
    let message = `HTTP ${response.status}`;

    try {
      const data = await response.json();
      if (data?.message) message = data.message;
    } catch {
      try {
        const text = await response.text();
        if (text) message = text;
      } catch {}
    }
    throw new Error(message);
  }
  // exito
  try {
    return await response.json();
  } catch {
    return {};
  }
}

// POST / signup -> { data: { email, _id}}
export function register({ email, password }) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: jsonHeaders,
    body: JSON.stringify({ email, password }),
  }).then(handleResponse);
}

// POST / signin -> { token }
export function login({ email, password }) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: jsonHeaders,
    body: JSON.stringify({ email, password }),
  }).then(handleResponse);
}

// GET / users/me ( requiere token ) -> { data: { email, _id }}
export function checkToken(token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      ...jsonHeaders,
      Authorization: `Bearer ${token}`,
    }
  }).then(handleResponse);
}

// Helper para manejar el token en localStorage
export const token = {
  get: () => localStorage.getItem('jwt'),
  set: (t) => localStorage.setItem('jwt', t),
  clear: () => localStorage.removeItem('jwt'),
};

