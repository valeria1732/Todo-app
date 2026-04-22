import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { TasksPage } from './pages/TasksPage/TasksPage';
import { UsersPage } from './pages/UsersPage/UsersPage';

function App() {
  // Estado para controlar si hay sesión
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem('token'));

  // Escuchar cambios en el almacenamiento 
  useEffect(() => {
    const checkToken = () => {
      setIsAuth(!!localStorage.getItem('token'));
    };
    
    // Polling o evento manual para actualizar el estado tras el login
    window.addEventListener('storage', checkToken);
    return () => window.removeEventListener('storage', checkToken);
  }, []);

  return (
    <Router>
      <Routes>
        {/* Si ya está autenticado, no lo dejes entrar al login, mándalo a tasks */}
        <Route 
          path="/login" 
          element={isAuth ? <Navigate to="/tasks" /> : <LoginPage onLogin={() => setIsAuth(true)} />} 
        />
        
        {/* Rutas Protegidas */}
        <Route 
          path="/tasks" 
          element={isAuth ? <TasksPage /> : <Navigate to="/login" />} 
        />
        
        <Route 
          path="/users" 
          element={isAuth ? <UsersPage /> : <Navigate to="/login" />} 
        />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;