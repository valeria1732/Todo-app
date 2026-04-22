import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

// ── Elemento de navegación ───────────────────────────────────────────────────
const NavLink = ({ to, icon, label, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`sidebar-link${isActive ? ' active' : ''}`}
      onClick={onClick}
    >
      <span className="material-icons">{icon}</span>
      {label}
    </Link>
  );
};

// ── Botón de cerrar sesión ───────────────────────────────────────────────────
const LogoutButton = () => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <button className="sidebar-logout" onClick={handleLogout}>
      <span className="material-icons">logout</span>
      Cerrar Sesión
    </button>
  );
};

// ── Sidebar principal ────────────────────────────────────────────────────────
export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeSidebar = () => setIsOpen(false);
  const toggleSidebar = () => setIsOpen(o => !o);

  return (
    <>
      {/* Botón hamburguesa — solo visible en móvil */}
      <button
        className="sidebar-toggle"
        onClick={toggleSidebar}
        aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
      >
        <span className="material-icons">
          {isOpen ? 'close' : 'menu'}
        </span>
      </button>

      {/* Overlay oscuro al abrir en móvil */}
      {isOpen && (
        <div className="sidebar-overlay" onClick={closeSidebar} />
      )}

      {/* Panel lateral */}
      <aside className={`sidebar${isOpen ? ' open' : ''}`}>

        {/* Logo y nombre */}
        <div className="sidebar-brand">
          <h2>EDM</h2>
          <div className="sidebar-brand-line" />
        </div>

        {/* Rutas de navegación */}
        <nav className="sidebar-nav">
          <NavLink to="/tasks" icon="dashboard" label="Tareas"   onClick={closeSidebar} />
          <NavLink to="/users" icon="group"     label="Usuarios" onClick={closeSidebar} />
        </nav>

        {/* Cerrar sesión */}
        <LogoutButton />

      </aside>
    </>
  );
};