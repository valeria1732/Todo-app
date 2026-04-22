import { useState, useEffect } from 'react';
import { getUsers, createUser, getUserById, updateUser, deleteUser } from '../../api/users';
import { parseError } from '../../api/parseError';
import { useAuth } from '../../hooks/useAuth';
import { getProfile } from '../../api/auth';

export const formatDate = (dateString) => {
  if (!dateString) return '---';
  return new Date(dateString).toLocaleDateString('es-ES', {
    day: '2-digit', month: 'short', year: 'numeric'
  });
};

// Validaciones según los DTOs del backend
export const validateCreateUser = ({ name, lastname, username, password }) => {
  if (!name || name.length < 3 || name.length > 20)
    return 'Nombre: entre 3 y 20 caracteres.';
  if (!lastname || lastname.length < 3 || lastname.length > 25)
    return 'Apellido: entre 3 y 25 caracteres.';
  if (!username || username.length < 3 || username.length > 20)
    return 'Usuario: entre 3 y 20 caracteres.';
  if (!password || password.length < 8 || password.length > 25)
    return 'Contraseña: entre 8 y 25 caracteres.';
  return null;
};

export const validateUpdateUser = ({ name, lastname, username }) => {
  if (name !== undefined && (name.length < 3 || name.length > 20))
    return 'Nombre: entre 3 y 20 caracteres.';
  if (lastname !== undefined && (lastname.length < 3 || lastname.length > 25))
    return 'Apellido: entre 3 y 25 caracteres.';
  if (username !== undefined && (username.length < 3 || username.length > 20))
    return 'Usuario: entre 3 y 20 caracteres.';
  return null;
};

export const useUsers = () => {
  const { profile } = useAuth();

  const [users, setUsers] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [confirmId, setConfirmId] = useState(null);
  const [confirmMessage, setConfirmMessage] = useState(null);

  // Modal de crear
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', lastname: '', username: '', password: '' });

  // Modal de editar
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', lastname: '', username: '' });

  const showSuccess = (msg) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const fetchUsers = async () => {
    try {
      const [data, me] = await Promise.all([getUsers(), getProfile()]);
      const list = Array.isArray(data) ? data : [];
      const alreadyIn = list.some(u => u.id === me.id);
      setUsers(alreadyIn ? list : [me, ...list]);
    } catch (err) {
      setError(parseError(err));
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    // Trimea antes de validar y enviar al backend
    const payload = {
      name:     newUser.name.trim(),
      lastname: newUser.lastname.trim(),
      username: newUser.username.trim(),
      password: newUser.password, // la contraseña no se trimea
    };
    const validationError = validateCreateUser(payload);
    if (validationError) return setError(validationError);
    try {
      await createUser(payload);
      setNewUser({ name: '', lastname: '', username: '', password: '' });
      setShowCreateModal(false);
      showSuccess('Usuario creado correctamente.');
      fetchUsers();
    } catch (err) {
      setError(parseError(err));
    }
  };

  const handleSearch = async () => {
    if (!searchId) return fetchUsers();
    try {
      const user = await getUserById(searchId);
      setUsers(user ? [user] : []);
    } catch (err) {
      setError(parseError(err));
      setUsers([]);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (editingId !== profile?.id) return setError('Solo puedes editar tu propio usuario.');
    // Trimea antes de validar y enviar al backend
    const payload = {
      name:     editForm.name.trim(),
      lastname: editForm.lastname.trim(),
      username: editForm.username.trim(),
    };
    const validationError = validateUpdateUser(payload);
    if (validationError) return setError(validationError);
    try {
      await updateUser(editingId, payload);
      setShowEditModal(false);
      setEditingId(null);
      showSuccess('Usuario actualizado correctamente.');
      fetchUsers();
    } catch (err) {
      setError(parseError(err));
    }
  };

  const handleDelete = (id) => {
    if (id !== profile?.id) return setError('Solo puedes eliminar tu propio usuario.');
    const userTasks = users.find(u => u.id === id)?.tasks;
    if (userTasks?.length > 0)
      return setError('No puedes eliminar tu usuario mientras tengas tareas asignadas.');
    setConfirmId(id);
    setConfirmMessage('¿Eliminar tu usuario? Esta acción no se puede deshacer.');
  };

  const confirmDelete = async () => {
    try {
      await deleteUser(confirmId);
      localStorage.clear();
      window.location.href = '/login';
    } catch (err) {
      setError(parseError(err));
    } finally {
      setConfirmId(null);
      setConfirmMessage(null);
    }
  };

  const cancelDelete = () => {
    setConfirmId(null);
    setConfirmMessage(null);
  };

  const startEdit = (user) => {
    if (user.id !== profile?.id) return setError('Solo puedes editar tu propio usuario.');
    setEditingId(user.id);
    setEditForm({ name: user.name, lastname: user.lastname, username: user.username });
    setShowEditModal(true);
  };

  const canAct = (id) => id === profile?.id;

  return {
    users, searchId, setSearchId, error, setError,
    successMessage,
    newUser, setNewUser, editForm, setEditForm,
    showCreateModal, setShowCreateModal,
    showEditModal, setShowEditModal,
    confirmMessage, confirmDelete, cancelDelete,
    handleCreate, handleSearch, handleUpdate, handleDelete, startEdit,
    profile, canAct
  };
};