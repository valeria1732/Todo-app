import React, { useEffect } from 'react';

export const Alert = ({ message, type = 'error', onClose, onConfirm }) => {
  // Auto-cerrado para errores y éxitos (no para confirmaciones)
  useEffect(() => {
    if (message && type !== 'confirm') {
      const timer = setTimeout(() => {
        onClose();
      }, 4000); // 4 segundos de duración

      return () => clearTimeout(timer);
    }
  }, [message, type, onClose]);

  if (!message) return null;

  const isConfirm = type === 'confirm';

  const styles = {
    overlay: {
      position: 'fixed',
      top: isConfirm ? 0 : '20px', // Si es confirmación, centrado; si no, arriba
      right: isConfirm ? 0 : '20px', // A la derecha
      width: isConfirm ? '100%' : 'auto',
      height: isConfirm ? '100%' : 'auto',
      // CRITICO: Permite hacer click a lo que hay debajo si no es una confirmación
      pointerEvents: isConfirm ? 'all' : 'none', 
      backgroundColor: isConfirm ? 'rgba(0,0,0,0.6)' : 'transparent',
      display: 'flex',
      justifyContent: isConfirm ? 'center' : 'flex-end',
      alignItems: isConfirm ? 'center' : 'flex-start',
      zIndex: 1000,
      transition: 'all 0.5s ease'
    },
    container: {
      // Re-activamos los clicks solo para el cuadro de la alerta
      pointerEvents: 'all', 
      padding: '16px 24px',
      borderRadius: '12px',
      display: 'flex',
      flexDirection: 'row', // Mejor en línea para notificaciones
      alignItems: 'center',
      gap: '15px',
      backgroundColor:
        type === 'error'
          ? '#ff6b6b'
          : type === 'confirm'
          ? '#1e1e2f'
          : '#A4C1FD',
      color: type === 'error' ? 'white' : type === 'confirm' ? 'white' : '#222653',
      fontWeight: '600',
      boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
      minWidth: isConfirm ? '350px' : '280px',
      animation: 'slideIn 0.3s ease-out'
    },
    actions: {
      display: 'flex',
      gap: '10px',
      marginLeft: '10px'
    },
    btn: {
      padding: '8px 16px',
      borderRadius: '8px',
      cursor: 'pointer',
      border: 'none',
      fontWeight: 'bold',
      fontSize: '12px',
      textTransform: 'uppercase'
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.container}>
        {/* Iconos rápidos para identificar el tipo */}
        <span className="material-icons" style={{ fontSize: '20px' }}>
          {type === 'error' ? 'error_outline' : type === 'confirm' ? 'help_outline' : 'check_circle'}
        </span>
        
        <span style={{ flex: 1 }}>{message}</span>

        {isConfirm ? (
          <div style={styles.actions}>
            <button
              style={{ ...styles.btn, background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              style={{ ...styles.btn, background: '#F7DD55', color: '#1a1d3d' }}
              onClick={onConfirm}
            >
              Confirmar
            </button>
          </div>
        ) : (
          <button 
            onClick={onClose} 
            style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', opacity: 0.7, fontSize: '18px' }}
          >
            ✕
          </button>
        )}
      </div>

      {/* Animación simple */}
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>  
  );
};