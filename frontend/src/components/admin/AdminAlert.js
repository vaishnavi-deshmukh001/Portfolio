import React, { useEffect } from 'react';

const AdminAlert = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => onClose(), 3500);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  const isError = type === 'error';

  return (
    <div
      style={{
        backgroundColor: isError ? '#FBE2DC' : '#E3F1EA',
        color: isError ? 'var(--color-danger)' : 'var(--color-success)',
        padding: '0.8rem 1.2rem',
        borderRadius: 'var(--radius-sm)',
        fontSize: '0.9rem',
        marginBottom: '1.2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <span>{message}</span>
      <button
        onClick={onClose}
        style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontWeight: 700 }}
      >
        ×
      </button>
    </div>
  );
};

export default AdminAlert;
