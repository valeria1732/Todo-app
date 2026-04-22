import './TasksPage.css';
import '../../styles/validaciones.css';
import { useState } from 'react';
import { Sidebar }      from '../../components/Sidebar';
import { Alert }        from '../../components/Alert';
import { PageHeader }   from '../../components/PageHeader';
import { TasksTable }   from './TasksTable';
import { TaskFormModal } from './TaskModal';
import { useTasks }     from './useTasks';

// ── Calcula errores en tiempo real para un formulario de tarea 
const getTaskErrors = (form, touched) => ({
  name:        touched.name        && (!form.name?.trim()        || form.name.trim().length < 3)        ? 'Mínimo 3 caracteres.' : null,
  description: touched.description && (!form.description?.trim() || form.description.trim().length < 5) ? 'Mínimo 5 caracteres.' : null,
});

// ── Página de gestión de tareas 
export const TasksPage = () => {
  const {
    tasks, searchId, setSearchId, error, setError, successMessage,
    showCreateModal, setShowCreateModal,
    showEditModal,   setShowEditModal,
    newTask, setNewTask, editForm, setEditForm,
    confirmMessage, confirmDelete, cancelDelete,
    handleCreate, handleUpdate, handleDelete, handleSearch, startEdit,
  } = useTasks();

  const [createTouched, setCreateTouched] = useState({});
  const [editTouched,   setEditTouched]   = useState({});

  const createErrors = getTaskErrors(newTask,  createTouched);
  const editErrors   = getTaskErrors(editForm, editTouched);

  const closeCreateModal = () => { setShowCreateModal(false); setCreateTouched({}); setNewTask({ name: '', description: '', priority: false }); };
  const closeEditModal   = () => { setShowEditModal(false);   setEditTouched({}); };

  return (
    <div className="tasks-container">
      <Sidebar />
      <main className="tasks-main">

        {/* Cabecera y buscador */}
        <PageHeader
          title="Gestión de Tareas"
          searchValue={searchId}
          onSearchChange={setSearchId}
          onSearch={handleSearch}
          searchPlaceholder="ID de tarea..."
        />

        {/* Mensaje de éxito */}
        {successMessage && (
          <div className="success-bar">
            <span className="material-icons">check_circle</span>
            {successMessage}
          </div>
        )}

        {/* Alertas */}
        <div className="alert-bar">
          <Alert message={error} type="error" onClose={() => setError(null)} />
          <Alert message={confirmMessage} type="confirm" onClose={cancelDelete} onConfirm={confirmDelete} />
        </div>

        {/* Botón nueva tarea */}
        <div className="users-action-bar">
          <button className="btn-primary" onClick={() => setShowCreateModal(true)}>
            <span className="material-icons">add_task</span>
            Nueva Tarea
          </button>
        </div>

        {/* Tabla */}
        <TasksTable tasks={tasks} onEdit={startEdit} onDelete={handleDelete} />

        {/* Modal crear */}
        {showCreateModal && (
          <TaskFormModal
            title="Nueva Tarea"
            form={newTask}
            setForm={setNewTask}
            touched={createTouched}
            setTouched={setCreateTouched}
            errors={createErrors}
            onClose={closeCreateModal}
            onSubmit={handleCreate}
          />
        )}

        {/* Modal editar */}
        {showEditModal && (
          <TaskFormModal
            title="Editar Tarea"
            form={editForm}
            setForm={setEditForm}
            touched={editTouched}
            setTouched={setEditTouched}
            errors={editErrors}
            onClose={closeEditModal}
            onSubmit={handleUpdate}
          />
        )}

      </main>
    </div>
  );
};