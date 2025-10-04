import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [touched, setTouched] = useState({ email: false, password: false });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const pwPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  const isPwValid =(v) => pwPattern.test(String(v));


  const canSubmit =
   form.email.trim().length > 3 &&
   form.email.includes("@") &&
   isPwValid(form.password) &&
   !loading;

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleBlur(e) {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true}));
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

  const pwInvalid = touched.password && !isPwValid(form.password);


  return (
    <section className="auth">
      <h1 className="auth__title">Inicia sesión</h1>

      <form className="auth__form" onSubmit={handleSubmit} noValidate>
        <label className="auth__field">
          <span></span>
          <input
            type="email"
            name="email"
            placeholder="Correo Electrónico"
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            autoComplete="email"
            />
        </label>

        <label className="auth__field">
          <span></span>
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            onBlur={handleBlur}
            pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$"
            title="Mín. 6 caracteres, debe incluir al menos una letra y un número."
            required
            minLength={6}
            autoComplete="current-password"
            aria-invalid={pwInvalid}
            aria-describedby="pw-help"
            />
            {pwInvalid && (
              <p id="pw-help" className="auth__error" role="alert">
                Contraseña inválida, intenta de nuevo.
              </p>
            )}
        </label>

        {error && <p className="auth__error">{error}</p>}

        <button
          className="auth__submit"
          type="submit"
          disabled={!canSubmit}
          >
          {loading ? 'Ingresando...' : 'Inicia sesión'}
        </button>
      </form>

      <p className="auth__hint">
        ¿Aún no eres miembro? <Link to="/signup">Regístrate aquí</Link>
      </p>
    </section>
  );
}



