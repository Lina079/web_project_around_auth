import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const pwPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

  const canSubmit =
   form.email.trim().length > 3 &&
   form.email.includes("@") &&
   pwPattern.test(form.password) &&
   !loading;

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    setError('');
    try {
      await onLogin({ email: form.email.trim(), password: form.password });
    } catch (err) {
      setError(err?.message || 'Error al iniciar sesión.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="auth">
      <h1 className="auth__title">Inicia sesión</h1>

      <form className="auth__form" onSubmit={handleSubmit} noValidate>
        <label className="auth__field">
          <span>Email</span>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="email"
            />
        </label>

        <label className="auth__field">
          <span>Contraseña</span>
          <input
            type="password"
            name="password"
            placeholder="6 caracteres mín. letras y números."
            value={form.password}
            onChange={handleChange}
            pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$"
            title="Mín. 6 caracteres, debe incluir al menos una letra y un número."
            required
              minLength={6}
            autoComplete="current-password"
            />
        </label>

        {error && <p className="auth__error">{error}</p>}

        <button
          className="auth__submit"
          type="submit"
          disabled={!canSubmit}
          >
          {loading ? 'Ingresando...' : 'Iniciar sesión'}
        </button>
      </form>

      <p className="auth__hint">
        ¿No tienes una cuenta? <Link to="/signup">Regístrate</Link>
      </p>
    </section>
  );
}

