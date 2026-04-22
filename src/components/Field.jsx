// ── Campo de formulario reutilizable con label, validación y contador 
export const Field = ({ label, hint, error, maxLength, value, children }) => {
  const remaining  = maxLength ? maxLength - (value?.length || 0) : null;
  const isNearLimit = remaining !== null && remaining <= 10;
  const isAtLimit   = remaining !== null && remaining === 0;

  return (
    <div className="modal-field">
      <div className="modal-field-header">
        <label className="modal-label">{label}</label>
        {maxLength && (
          <span className={`char-counter${isNearLimit ? ' near' : ''}${isAtLimit ? ' limit' : ''}`}>
            {remaining}
          </span>
        )}
      </div>
      {children}
      {error
        ? <span className="field-error">
            <span className="material-icons">error_outline</span>
            {error}
          </span>
        : hint && <span className="field-hint">{hint}</span>
      }
    </div>
  );
};