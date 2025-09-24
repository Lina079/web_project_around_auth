const BASE_URL = 'https://se-register-api.en.tripleten-services.com/v1';

async function handleResponse(response) {
  const data = await response.json().catch(() => ({}));
  if (response.ok) return data;

  let message = data?.message || 'Error de servidor';
  if (response.status === 400) message = 'Campos inválidos o incompletos';
  if (response.status === 401) message = 'Credenciales inválidas';

  const err = new Error(message);
  err.status =response.status;
  err.payload = data;
  throw err;
}

// POST / signup -> { data: { email, _id}}
export function register({ email, password }) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  }).then(handleResponse);
}

// POST / signin -> { token }
export function login({ email, password }) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  }).then(handleResponse);
}

// GET / users/me ( requiere token ) -> { data: { email, _id }}
export function checkToken(token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  }).then(handleResponse);
}

// Helper para manejar el token en localStorage
export const token = {
  get: () => localStorage.getItem('jwt'),
  set: (t) => localStorage.setItem('jwt', t),
  clear: () => localStorage.removeItem('jwt'),
}