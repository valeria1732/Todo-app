import { Alert } from '../../components/Alert';
import { useState } from 'react';

// ── Reglas de validación del login 
const loginRules = {
  username: (v) => !v.trim() ? 'El usuario es obligatorio.' : null,
  password: (v) => !v ? 'La contraseña es obligatoria.' : v.length < 8 ? 'Mínimo 8 caracteres.' : null,
};

// ── Campo individual del login 
const LoginField = ({ id, label, icon, type = 'text', value, onChange, onBlur, error, placeholder, autoComplete, maxLength }) => (
  <div className="login-field">
    <label className="login-label" htmlFor={id}>{label}</label>
    <div className="login-input-wrapper">
      <span className="material-icons login-input-icon">{icon}</span>
      <input
        id={id}
        type={type}
        className={`login-input${error ? ' input-invalid' : ''}`}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        autoComplete={autoComplete}
        maxLength={maxLength}
      />
    </div>
    {error && (
      <span className="field-error">
        <span className="material-icons">error_outline</span>
        {error}
      </span>
    )}
  </div>
);

// ── Formulario completo de login 
export const LoginForm = ({ username, setUsername, password, setPassword, loading, error, setError, handleSubmit }) => {
  const [touched, setTouched] = useState({ username: false, password: false });
  const markTouched = (field) => setTouched(t => ({ ...t, [field]: true }));

  const fieldErrors = {
    username: touched.username ? loginRules.username(username) : null,
    password: touched.password ? loginRules.password(password) : null,
  };

  return (
    <>
      <Alert message={error} type="error" onClose={() => setError('')} />

      <form onSubmit={handleSubmit} noValidate>
        <LoginField
          id="login-username"
          label="Usuario"
          icon="person"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onBlur={() => markTouched('username')}
          error={fieldErrors.username}
          placeholder="Nombre de usuario"
          autoComplete="username"
          maxLength={20}
        />

        <LoginField
          id="login-password"
          label="Contraseña"
          icon="lock"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => markTouched('password')}
          error={fieldErrors.password}
          placeholder="••••••••••••"
          autoComplete="current-password"
          maxLength={25}
        />

        <button type="submit" className="login-button" disabled={loading}>
          {loading ? 'Verificando...' : 'Iniciar Sesión'}
        </button>
      </form>
    </>
  );
};