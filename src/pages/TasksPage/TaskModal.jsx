import { Modal } from '../../components/Modal';
import { Field } from '../../components/Field';
import { sanitizeText, sanitizeDescription } from '../../utils/sanitize';

// ── Modal compartido para crear y editar tareas 
export const TaskFormModal = ({ title, form, setForm, touched, setTouched, errors, onClose, onSubmit }) => (
  <Modal title={title} onClose={onClose} onSubmit={onSubmit}>

    {/* Título */}
    <Field label="Título" hint="Mínimo 3 caracteres" error={errors.name} maxLength={50} value={form.name}>
      <input
        className={`input modal-input${errors.name ? ' input-invalid' : ''}`}
        placeholder="Ej: Revisar informe"
        value={form.name}
        onChange={e => setForm(f => ({ ...f, name: sanitizeText(e.target.value.trimStart()) }))}
        onBlur={() => setTouched(t => ({ ...t, name: true }))}
        maxLength={50}
        required
      />
    </Field>

    {/* Descripción */}
    <Field label="Descripción" hint="Mínimo 5 caracteres" error={errors.description} maxLength={200} value={form.description}>
      <textarea
        className={`input modal-input${errors.description ? ' input-invalid' : ''}`}
        placeholder="Ej: Revisar el informe del trimestre..."
        value={form.description}
        onChange={e => setForm(f => ({ ...f, description: sanitizeDescription(e.target.value.trimStart()) }))}
        onBlur={() => setTouched(t => ({ ...t, description: true }))}
        maxLength={200}
        required
      />
    </Field>

    {/* Prioridad */}
    <label className="modal-label checkbox-label">
      <input
        type="checkbox"
        checked={form.priority}
        onChange={e => setForm(f => ({ ...f, priority: e.target.checked }))}
      />
      Prioridad Alta
    </label>

    <div className="modal-actions">
      <button type="button" className="btn-secondary" onClick={onClose}>Cancelar</button>
      <button type="submit" className="btn-primary">
        {title === 'Nueva Tarea' ? 'Crear Tarea' : 'Actualizar'}
      </button>
    </div>
  </Modal>
);