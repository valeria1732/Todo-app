// ── Tabla de tareas 
export const TasksTable = ({ tasks, onEdit, onDelete }) => (
  <div className="table-wrapper">
    <table className="users-table tasks-table">
      <thead>
        <tr>
          <th className="narrow">ID</th>
          <th>Tarea</th>
          <th>Descripción</th>
          <th className="center">Prioridad</th>
          <th className="center">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {tasks.length === 0 ? (
          <tr>
            <td colSpan={5} className="table-empty">No hay tareas pendientes.</td>
          </tr>
        ) : (
          tasks.map(task => (
            <tr key={task.id}>
              <td className="td-id">{task.id}</td>
              <td><span className="td-task-name">{task.name}</span></td>
              <td><span className="td-description">{task.description}</span></td>
              <td className="center">
                {task.priority
                  ? <span className="priority-badge">ALTA</span>
                  : <span className="no-priority">—</span>
                }
              </td>
              <td className="center">
                <div className="td-actions">
                  <span className="material-icons icon-btn edit" onClick={() => onEdit(task)} title="Editar" role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && onEdit(task)}>edit</span>
                  <span className="material-icons icon-btn delete" onClick={() => onDelete(task.id)} title="Eliminar" role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && onDelete(task.id)}>delete_outline</span>
                </div>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);