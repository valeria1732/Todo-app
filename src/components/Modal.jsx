// ── Modal reutilizable para cualquier formulario 
export const Modal = ({ title, onClose, onSubmit, children }) => (
  <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
    <div className="modal-box" role="dialog" aria-modal="true" aria-label={title}>

      {/* Cabecera */}
      <div className="modal-header">
        <h3 className="modal-title">{title}</h3>
        <button className="modal-close" onClick={onClose} aria-label="Cerrar">
          <span className="material-icons">close</span>
        </button>
      </div>

      {/* Contenido del formulario */}
      <form className="modal-form" onSubmit={onSubmit}>
        {children}
      </form>

    </div>
  </div>
);