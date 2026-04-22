export const Button = ({ children, onClick, variant = 'primary' }) => {
  const styles = {
    primary: { backgroundColor: '#3971E2', color: 'white' },
    warning: { backgroundColor: '#F7DD55', color: '#222653' },
  };

  return (
    <button 
      onClick={onClick} 
      style={{ ...styles[variant], padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
    >
      {children}
    </button>
  );
};