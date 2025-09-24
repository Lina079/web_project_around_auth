import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register({ onRegister }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await onRegister({ email: form.email.trim(), password: form.password });
    } catch (err) {
      setError(err?.message || 'No se pudo registrar, revisa tus datos');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="auth">
      <h1 className="auth__title">Crear una Cuenta</h1>

      <form className="auth__form" onSubmit={handleSubmit} noValidate>
        <label className="auth__field">
          <span>Email</span>
          <input
            type="email"
            name="email"
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
            value={form.password}
            onChange={handleChange}
            required
            minLength={6}
            autoComplete="new-password"
          />
        </label>

        {error && <p className="auth__error">{error}</p>}

        <button
          className="auth__submit"
          type="submit"
          disabled={loading || !form.email || !form.password}
        >
          {loading ? 'Creando...' : 'Registrarme'}
        </button>
      </form>

      <p className="auth__hint">
        ¿Ya tienes una cuenta? <Link to="/signin">Inicia sesión</Link>
      </p>
    </section>
  );
}