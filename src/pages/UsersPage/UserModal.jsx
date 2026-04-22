import { Modal }   from '../../components/Modal';
import { Field }   from '../../components/Field';
import { sanitizeText, sanitizeUsername } from '../../utils/sanitize';

// ── Modal compartido para crear y editar usuarios
export const UserFormModal = ({ title, form, setForm, touched, setTouched, errors, onClose, onSubmit, isCreate = false }) => (
  <Modal title={title} onClose={onClose} onSubmit={onSubmit}>

    {/* Nombre */}
    <Field label="Nombre" hint="Entre 3 y 20 caracteres" error={errors.name} maxLength={20} value={form.name}>
      <input
        className={`input modal-input${errors.name ? ' input-invalid' : ''}`}
        placeholder="Ej: Juan"
        value={form.name}
        onChange={e => setForm(f => ({ ...f, name: sanitizeText(e.target.value.trimStart()) }))}
        onBlur={() => setTouched(t => ({ ...t, name: true }))}
        maxLength={20}
        required
      />
    </Field>

    {/* Apellido */}
    <Field label="Apellido" hint="Entre 3 y 25 caracteres" error={errors.lastname} maxLength={25} value={form.lastname}>
      <input
        className={`input modal-input${errors.lastname ? ' input-invalid' : ''}`}
        placeholder="Ej: García"
        value={form.lastname}
        onChange={e => setForm(f => ({ ...f, lastname: sanitizeText(e.target.value.trimStart()) }))}
        onBlur={() => setTouched(t => ({ ...t, lastname: true }))}
        maxLength={25}
        required
      />
    </Field>

    {/* Username */}
    <Field label="Usuario" hint="Entre 3 y 20 caracteres" error={errors.username} maxLength={20} value={form.username}>
      <input
        className={`input modal-input${errors.username ? ' input-invalid' : ''}`}
        placeholder="Ej: jgarcia"
        value={form.username}
        onChange={e => setForm(f => ({ ...f, username: sanitizeUsername(e.target.value.trimStart()) }))}
        onBlur={() => setTouched(t => ({ ...t, username: true }))}
        maxLength={20}
        required
      />
    </Field>

    {/* Contraseña — solo al crear */}
    {isCreate && (
      <Field label="Contraseña" hint="Entre 8 y 25 caracteres" error={errors.password} maxLength={25} value={form.password}>
        <input
          className={`input modal-input${errors.password ? ' input-invalid' : ''}`}
          type="password"
          placeholder="••••••••"
          value={form.password}
          onChange={e => setForm(f => ({ ...f, password: e.target.value.trimStart() }))}
          onBlur={() => setTouched(t => ({ ...t, password: true }))}
          maxLength={25}
          required
        />
      </Field>
    )}

    <div className="modal-actions">
      <button type="button" className="btn-secondary" onClick={onClose}>Cancelar</button>
      <button type="submit" className="btn-primary">
        {isCreate ? 'Guardar' : 'Actualizar'}
      </button>
    </div>
  </Modal>
);