import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register({ onRegister }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [touched, setTouched] = useState({ email: false, password:false });
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
      await onRegister({ email: form.email.trim(), password: form.password });
    } catch (err) {
      setError(err?.message || 'No se pudo registrar, revisa tus datos');
    } finally {
      setLoading(false);
    }
  }

  const pwInvalid = touched.password && !isPwValid(form.password);

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
            onBlur={handleBlur}
            required
            autoComplete="email"
          />
        </label>

        <label className="auth__field">
          <span>Contraseña</span>
          <input
            type="password"
            name="password"
            placeholder="6 caracteres mínimo, letras y números."
            value={form.password}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            minLength={6}
            pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$"
            title="Mínimo 6 caracteres, debe incluir al menos una letra y un número."
            autoComplete="new-password"
            aria-invalid={pwInvalid}
            aria-describedby="pw-help"
          />
          {pwInvalid && (
            <p id="pw-help" className="auth__error" role="alert">
              Contraseña inválida: debe ser alfanumérica y contener al menos 6 caracteres.
            </p>
          )}
        </label>

        {error && <p className="auth__error">{error}</p>}

        <button
          className="auth__submit"
          type="submit"
          disabled={!canSubmit}
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

