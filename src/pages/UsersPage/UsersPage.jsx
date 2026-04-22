import './UsersPage.css';
import '../../styles/validaciones.css';
import { useState } from 'react';
import { Sidebar }       from '../../components/Sidebar';
import { Alert }         from '../../components/Alert';
import { PageHeader }    from '../../components/PageHeader';
import { UsersTable }    from './UsersTable';
import { UserFormModal } from './UserModal';
import { useUsers }      from './useUsers';

// ── Calcula errores en tiempo real para un formulario de usuario 
const getUserErrors = (form, touched, isCreate = false) => ({
  name:     touched.name     && (!form.name?.trim()     || form.name.trim().length < 3)     ? 'Mínimo 3 caracteres.' : null,
  lastname: touched.lastname && (!form.lastname?.trim() || form.lastname.trim().length < 3) ? 'Mínimo 3 caracteres.' : null,
  username: touched.username && (!form.username?.trim() || form.username.trim().length < 3) ? 'Mínimo 3 caracteres.' : null,
  ...(isCreate && {
    password: touched.password && (!form.password || form.password.length < 8) ? 'Mínimo 8 caracteres.' : null,
  }),
});

// ── Página de gestión de usuarios 
export const UsersPage = () => {
  const {
    users, searchId, setSearchId, error, setError, successMessage,
    showCreateModal, setShowCreateModal,
    showEditModal,   setShowEditModal,
    newUser, setNewUser, editForm, setEditForm,
    confirmMessage, confirmDelete, cancelDelete,
    handleCreate, handleSearch, handleUpdate, handleDelete, startEdit,
    canAct,
  } = useUsers();

  const [createTouched, setCreateTouched] = useState({});
  const [editTouched,   setEditTouched]   = useState({});

  const createErrors = getUserErrors(newUser,  createTouched, true);
  const editErrors   = getUserErrors(editForm, editTouched,   false);

  const closeCreateModal = () => { setShowCreateModal(false); setCreateTouched({}); setNewUser({ name: '', lastname: '', username: '', password: '' }); };
  const closeEditModal   = () => { setShowEditModal(false);   setEditTouched({}); };

  return (
    <div className="users-container">
      <Sidebar />
      <main className="users-main">

        {/* Cabecera y buscador */}
        <PageHeader
          title="Gestión de Usuarios"
          searchValue={searchId}
          onSearchChange={setSearchId}
          onSearch={handleSearch}
          searchPlaceholder="Buscar por ID..."
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

        {/* Botón nuevo usuario */}
        <div className="users-action-bar">
          <button className="btn-primary" onClick={() => setShowCreateModal(true)}>
            <span className="material-icons">person_add</span>
            Nuevo Usuario
          </button>
        </div>

        {/* Tabla */}
        <UsersTable users={users} canAct={canAct} onEdit={startEdit} onDelete={handleDelete} />

        {/* Modal crear */}
        {showCreateModal && (
          <UserFormModal
            title="Nuevo Usuario"
            form={newUser}
            setForm={setNewUser}
            touched={createTouched}
            setTouched={setCreateTouched}
            errors={createErrors}
            onClose={closeCreateModal}
            onSubmit={handleCreate}
            isCreate
          />
        )}

        {/* Modal editar */}
        {showEditModal && (
          <UserFormModal
            title="Editar Usuario"
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