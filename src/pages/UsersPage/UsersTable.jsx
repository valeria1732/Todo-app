import { formatDate } from './useUsers';

// ── Tabla de usuarios 
export const UsersTable = ({ users, canAct, onEdit, onDelete }) => (
  <div className="table-wrapper">
    <table className="users-table">
      <thead>
        <tr>
          <th className="narrow">ID</th>
          <th>Nombre Completo</th>
          <th>Username</th>
          <th>Registro</th>
          <th className="center">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users.length === 0 ? (
          <tr>
            <td colSpan={5} className="table-empty">No se encontraron usuarios.</td>
          </tr>
        ) : (
          users.map(user => (
            <tr key={user.id}>
              <td className="td-id">{user.id}</td>
              <td><span className="td-fullname">{user.name} {user.lastname}</span></td>
              <td><span className="td-username">{user.username}</span></td>
              <td className="td-date">{formatDate(user.create_at)}</td>
              <td>
                <div className="td-actions">
                  {canAct(user.id) ? (
                    <>
                      <span className="material-icons icon-btn edit" onClick={() => onEdit(user)} title="Editar" role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && onEdit(user)}>edit</span>
                      <span className="material-icons icon-btn delete" onClick={() => onDelete(user.id)} title="Eliminar" role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && onDelete(user.id)}>delete_outline</span>
                    </>
                  ) : (
                    <span className="no-actions">—</span>
                  )}
                </div>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);