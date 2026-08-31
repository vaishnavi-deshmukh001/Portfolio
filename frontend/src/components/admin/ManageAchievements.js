import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import AdminAlert from './AdminAlert';

const EMPTY_FORM = { title: '', description: '' };

const ManageAchievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [alert, setAlert] = useState({ message: '', type: 'success' });

  const fetchAchievements = async () => {
    try {
      const res = await api.get('/achievements');
      setAchievements(res.data);
    } catch (err) {
      setAlert({ message: 'Failed to load achievements.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  const openAddForm = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setErrors({});
    setShowForm(true);
  };

  const openEditForm = (item) => {
    setForm({ title: item.title, description: item.description });
    setEditingId(item._id);
    setErrors({});
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setForm(EMPTY_FORM);
    setEditingId(null);
    setErrors({});
  };

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = 'Achievement title is required.';
    if (!form.description.trim()) newErrors.description = 'Description is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      if (editingId) {
        await api.put(`/achievements/${editingId}`, form);
        setAlert({ message: 'Achievement updated successfully.', type: 'success' });
      } else {
        await api.post('/achievements', form);
        setAlert({ message: 'Achievement added successfully.', type: 'success' });
      }
      closeForm();
      fetchAchievements();
    } catch (err) {
      setAlert({ message: err.response?.data?.message || 'Failed to save achievement.', type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this achievement?')) return;
    try {
      await api.delete(`/achievements/${id}`);
      setAlert({ message: 'Achievement deleted successfully.', type: 'success' });
      fetchAchievements();
    } catch (err) {
      setAlert({ message: err.response?.data?.message || 'Failed to delete achievement.', type: 'error' });
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-1">
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.3rem' }}>Manage Achievements</h2>
          <p style={{ color: 'var(--color-ink-500)' }}>Awards and recognitions you've received.</p>
        </div>
        {!showForm && (
          <button onClick={openAddForm} className="btn-amber" style={{ border: 'none' }}>
            + Add Achievement
          </button>
        )}
      </div>

      <AdminAlert message={alert.message} type={alert.type} onClose={() => setAlert({ message: '', type: 'success' })} />

      {showForm && (
        <div className="card-elevated p-4 mb-4">
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>{editingId ? 'Edit Achievement' : 'Add New Achievement'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-12">
                <label className="form-label fw-medium">Achievement Title</label>
                <input
                  type="text"
                  name="title"
                  className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                  value={form.title}
                  onChange={handleChange}
                />
                {errors.title && <div className="invalid-feedback">{errors.title}</div>}
              </div>
              <div className="col-12">
                <label className="form-label fw-medium">Description</label>
                <textarea
                  name="description"
                  rows={3}
                  className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                  value={form.description}
                  onChange={handleChange}
                />
                {errors.description && <div className="invalid-feedback">{errors.description}</div>}
              </div>
            </div>
            <div className="d-flex gap-2 mt-4">
              <button type="submit" className="btn-amber" disabled={submitting} style={{ border: 'none' }}>
                {submitting ? 'Saving...' : editingId ? 'Update Achievement' : 'Add Achievement'}
              </button>
              <button type="button" onClick={closeForm} className="btn-outline-slate">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="card-elevated p-4">
        {loading ? (
          <p style={{ color: 'var(--color-ink-500)' }}>Loading...</p>
        ) : achievements.length === 0 ? (
          <p className="empty-state">No achievements added yet.</p>
        ) : (
          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr style={{ fontSize: '0.82rem', color: 'var(--color-ink-500)' }}>
                  <th>Title</th>
                  <th>Description</th>
                  <th style={{ width: 140 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {achievements.map((item) => (
                  <tr key={item._id}>
                    <td style={{ fontWeight: 500 }}>{item.title}</td>
                    <td style={{ fontSize: '0.85rem', color: 'var(--color-ink-500)' }}>
                      {item.description.length > 60 ? item.description.slice(0, 60) + '...' : item.description}
                    </td>
                    <td>
                      <button onClick={() => openEditForm(item)} style={iconBtnStyle('var(--color-amber)')}>Edit</button>
                      <button onClick={() => handleDelete(item._id)} style={iconBtnStyle('var(--color-danger)')}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
  fontSize: '0.85rem',
  fontWeight: 600,
  cursor: 'pointer',
  padding: '0.3rem 0.6rem',
});

export default ManageAchievements;
