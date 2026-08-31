import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import AdminAlert from './AdminAlert';

const ManageSkills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newSkillName, setNewSkillName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingValue, setEditingValue] = useState('');
  const [error, setError] = useState('');
  const [alert, setAlert] = useState({ message: '', type: 'success' });
  const [submitting, setSubmitting] = useState(false);

  const fetchSkills = async () => {
    try {
      const res = await api.get('/skills');
      setSkills(res.data);
    } catch (err) {
      setAlert({ message: 'Failed to load skills.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newSkillName.trim()) {
      setError('Skill name cannot be empty.');
      return;
    }
    setError('');
    setSubmitting(true);
    try {
      await api.post('/skills', { name: newSkillName.trim() });
      setNewSkillName('');
      setAlert({ message: 'Skill added successfully.', type: 'success' });
      fetchSkills();
    } catch (err) {
      setAlert({ message: err.response?.data?.message || 'Failed to add skill.', type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  const startEdit = (skill) => {
    setEditingId(skill._id);
    setEditingValue(skill.name);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingValue('');
  };

  const saveEdit = async (id) => {
    if (!editingValue.trim()) {
      setAlert({ message: 'Skill name cannot be empty.', type: 'error' });
      return;
    }
    try {
      await api.put(`/skills/${id}`, { name: editingValue.trim() });
      setEditingId(null);
      setAlert({ message: 'Skill updated successfully.', type: 'success' });
      fetchSkills();
    } catch (err) {
      setAlert({ message: err.response?.data?.message || 'Failed to update skill.', type: 'error' });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this skill?')) return;
    try {
      await api.delete(`/skills/${id}`);
      setAlert({ message: 'Skill deleted successfully.', type: 'success' });
      fetchSkills();
    } catch (err) {
      setAlert({ message: err.response?.data?.message || 'Failed to delete skill.', type: 'error' });
    }
  };

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '0.3rem' }}>Manage Skills</h2>
      <p style={{ color: 'var(--color-ink-500)', marginBottom: '1.6rem' }}>
        Add the skills you want visitors to see on your portfolio.
      </p>

      <AdminAlert message={alert.message} type={alert.type} onClose={() => setAlert({ message: '', type: 'success' })} />

      <div className="card-elevated p-4 mb-4">
        <form onSubmit={handleAdd} className="d-flex gap-2 flex-wrap">
          <input
            type="text"
            className={`form-control ${error ? 'is-invalid' : ''}`}
            style={{ maxWidth: 320 }}
            placeholder="e.g. React.js"
            value={newSkillName}
            onChange={(e) => {
              setNewSkillName(e.target.value);
              setError('');
            }}
          />
          <button type="submit" className="btn-amber" disabled={submitting} style={{ border: 'none' }}>
            {submitting ? 'Adding...' : 'Add Skill'}
          </button>
        </form>
        {error && <div style={{ color: 'var(--color-danger)', fontSize: '0.85rem', marginTop: '0.4rem' }}>{error}</div>}
      </div>

      <div className="card-elevated p-4">
        {loading ? (
          <p style={{ color: 'var(--color-ink-500)' }}>Loading...</p>
        ) : skills.length === 0 ? (
          <p className="empty-state">No skills added yet. Use the form above to add your first skill.</p>
        ) : (
          <div className="d-flex flex-wrap gap-2">
            {skills.map((skill) => (
              <div
                key={skill._id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  backgroundColor: 'var(--color-bg)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '999px',
                  padding: '0.35rem 0.4rem 0.35rem 1rem',
                }}
              >
                {editingId === skill._id ? (
                  <>
                    <input
                      type="text"
                      value={editingValue}
                      onChange={(e) => setEditingValue(e.target.value)}
                      style={{ border: 'none', background: 'transparent', outline: 'none', width: 120, fontSize: '0.9rem' }}
                      autoFocus
                    />
                    <button onClick={() => saveEdit(skill._id)} style={iconBtnStyle('var(--color-success)')}>✓</button>
                    <button onClick={cancelEdit} style={iconBtnStyle('var(--color-ink-500)')}>✕</button>
                  </>
                ) : (
                  <>
                    <span style={{ fontSize: '0.9rem' }}>{skill.name}</span>
                    <button onClick={() => startEdit(skill)} style={iconBtnStyle('var(--color-amber)')}>Edit</button>
                    <button onClick={() => handleDelete(skill._id)} style={iconBtnStyle('var(--color-danger)')}>Delete</button>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const iconBtnStyle = (color) => ({
  background: 'none',
  border: 'none',
  color,
  fontSize: '0.8rem',
  fontWeight: 600,
  cursor: 'pointer',
  padding: '0.2rem 0.4rem',
});

export default ManageSkills;
