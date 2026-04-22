import './LoginPage.css';
import { useLogin } from './useLogin';
import { LoginForm } from './LoginForm';

// ── Página de login — solo estructura visual 
export const LoginPage = ({ onLogin }) => {
  const loginProps = useLogin(onLogin);

  return (
    <div className="login-wrapper">
      <div className="login-card">

        {/* Logo */}
        <div className="login-logo">
          <span className="material-icons">account_balance</span>
        </div>

        {/* Títulos */}
        <h1 className="login-title">EDM</h1>
        <p className="login-subtitle">Sistema de Gestión</p>

        {/* Formulario */}
        <LoginForm {...loginProps} />

      </div>
    </div>
  );
};