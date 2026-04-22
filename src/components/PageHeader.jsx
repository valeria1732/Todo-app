// ── Cabecera de página reutilizable con título y buscador ────────────────────
export const PageHeader = ({ title, searchValue, onSearchChange, onSearch, searchPlaceholder = 'Buscar por ID...' }) => (
  <div className="page-header">
    <h2 className="page-title">{title}</h2>
    <div className="page-search">
      <input
        className="input"
        placeholder={searchPlaceholder}
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSearch()}
        aria-label={searchPlaceholder}
        maxLength={10}
      />
      <button onClick={onSearch} className="btn-primary blue" aria-label="Buscar">
        <span className="material-icons">search</span>
      </button>
    </div>
  </div>
);