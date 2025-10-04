const BASE_URL = import.meta.env.VITE_AUTH_BASE || 'https://se-register-api.en.tripleten-services.com/v1';

const jsonHeaders = {
  'Content-Type': 'application/json',
};

async function handleResponse(response) {
  // error
  if (!response.ok) {
    let detail = '';

    try {
      const data = await response.json();
      if (data?.message) detail = data.message;
    } catch {
      try {
        const text = await response.text();
        if (text) detail = text;
      } catch {}
    }
    const FRIENDLY = {
      400: 'Datos inválidos. Revisa los campos.',
      401: 'Por favor, inténtalo de nuevo.',
      403: 'No tienes permisos para realizar esta acción.',
      404: 'Recurso no encontrado.',
      409: 'Conflicto con la petición (p. ej., ya existe).',
      500: 'Error en el servidor. Intenta más tarde.',
    };

    const message = FRIENDLY[response.status] || detail || 'Ocurrió un error. Intenta de nuevo.';
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

