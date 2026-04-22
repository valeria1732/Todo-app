import { useState, useEffect } from 'react';
import { getTasks, createTask, getTaskById, updateTask, deleteTask } from '../../api/tasks';
import { parseError } from '../../api/parseError';

export const validateTask = ({ name, description }) => {
  if (!name || name.length < 3 || name.length > 50)
    return 'El título debe tener entre 3 y 50 caracteres.';
  if (!description || description.length < 5 || description.length > 200)
    return 'La descripción debe tener entre 5 y 200 caracteres.';
  return null;
};

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Modales
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [confirmId, setConfirmId] = useState(null);
  const [confirmMessage, setConfirmMessage] = useState(null);

  // Forms
  const [newTask, setNewTask] = useState({ name: '', description: '', priority: false });
  const [editForm, setEditForm] = useState({ id: null, name: '', description: '', priority: false });

  const showSuccess = (msg) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(parseError(err));
    }
  };

  useEffect(() => { fetchTasks(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    // Trimea antes de validar y enviar al backend
    const payload = {
      name:        newTask.name.trim(),
      description: newTask.description.trim(),
      priority:    newTask.priority,
    };
    const valError = validateTask(payload);
    if (valError) return setError(valError);
    try {
      await createTask(payload);
      setNewTask({ name: '', description: '', priority: false });
      setShowCreateModal(false);
      showSuccess('Tarea creada correctamente.');
      fetchTasks();
    } catch (err) {
      setError(parseError(err));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    // Trimea antes de validar y enviar al backend
    const payload = {
      name:        editForm.name.trim(),
      description: editForm.description.trim(),
      priority:    editForm.priority,
    };
    const valError = validateTask(payload);
    if (valError) return setError(valError);
    try {
      await updateTask(editForm.id, payload);
      setShowEditModal(false);
      showSuccess('Tarea actualizada.');
      fetchTasks();
    } catch (err) {
      setError(parseError(err));
    }
  };

  const handleDelete = (id) => {
    setConfirmId(id);
    setConfirmMessage(`¿Estás seguro de eliminar la tarea #${id}?`);
  };

  const confirmDelete = async () => {
    try {
      await deleteTask(confirmId);
      showSuccess('Tarea eliminada.');
      fetchTasks();
    } catch (err) {
      setError(parseError(err));
    } finally {
      setConfirmId(null);
      setConfirmMessage(null);
    }
  };

  const startEdit = (task) => {
    setEditForm({ ...task });
    setShowEditModal(true);
  };

  const handleSearch = async () => {
    if (!searchId) return fetchTasks();
    try {
      const data = await getTaskById(searchId);
      setTasks(data ? [data] : []);
    } catch (err) {
      setError(parseError(err));
      setTasks([]);
    }
  };

  return {
    tasks, searchId, setSearchId, error, setError, successMessage,
    showCreateModal, setShowCreateModal, showEditModal, setShowEditModal,
    newTask, setNewTask, editForm, setEditForm,
    confirmMessage, confirmDelete, cancelDelete: () => { setConfirmId(null); setConfirmMessage(null); },
    handleCreate, handleUpdate, handleDelete, handleSearch, startEdit
  };
};