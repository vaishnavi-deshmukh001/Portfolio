import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import AdminAlert from './AdminAlert';

const EMPTY_FORM = { companyName: '', role: '', duration: '', description: '' };

const ManageExperience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [alert, setAlert] = useState({ message: '', type: 'success' });

  const fetchExperiences = async () => {
    try {
      const res = await api.get('/experience');
      setExperiences(res.data);
    } catch (err) {
      setAlert({ message: 'Failed to load experience entries.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const openAddForm = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setErrors({});
    setShowForm(true);
  };

  const openEditForm = (exp) => {
    setForm({
      companyName: exp.companyName,
      role: exp.role,
      duration: exp.duration,
      description: exp.description,
    });
    setEditingId(exp._id);
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
    if (!form.companyName.trim()) newErrors.companyName = 'Company name is required.';
    if (!form.role.trim()) newErrors.role = 'Role is required.';
    if (!form.duration.trim()) newErrors.duration = 'Duration is required.';
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
        await api.put(`/experience/${editingId}`, form);
        setAlert({ message: 'Experience updated successfully.', type: 'success' });
      } else {
        await api.post('/experience', form);
        setAlert({ message: 'Experience added successfully.', type: 'success' });
      }
      closeForm();
      fetchExperiences();
    } catch (err) {
      setAlert({ message: err.response?.data?.message || 'Failed to save experience.', type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this experience entry?')) return;
    try {
      await api.delete(`/experience/${id}`);
      setAlert({ message: 'Experience deleted successfully.', type: 'success' });
      fetchExperiences();
    } catch (err) {
      setAlert({ message: err.response?.data?.message || 'Failed to delete experience.', type: 'error' });
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-1">
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.3rem' }}>Manage Experience</h2>
          <p style={{ color: 'var(--color-ink-500)' }}>Your professional work history.</p>
        </div>
        {!showForm && (
          <button onClick={openAddForm} className="btn-amber" style={{ border: 'none' }}>
            + Add Experience
          </button>
        )}
      </div>

      <AdminAlert message={alert.message} type={alert.type} onClose={() => setAlert({ message: '', type: 'success' })} />

      {showForm && (
        <div className="card-elevated p-4 mb-4">
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>{editingId ? 'Edit Experience' : 'Add New Experience'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label fw-medium">Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  className={`form-control ${errors.companyName ? 'is-invalid' : ''}`}
                  value={form.companyName}
                  onChange={handleChange}
                />
                {errors.companyName && <div className="invalid-feedback">{errors.companyName}</div>}
              </div>
              <div className="col-md-6">
                <label className="form-label fw-medium">Role</label>
                <input
                  type="text"
                  name="role"
                  className={`form-control ${errors.role ? 'is-invalid' : ''}`}
                  value={form.role}
                  onChange={handleChange}
                />
                {errors.role && <div className="invalid-feedback">{errors.role}</div>}
              </div>
              <div className="col-md-6">
                <label className="form-label fw-medium">Duration</label>
                <input
                  type="text"
                  name="duration"
                  className={`form-control ${errors.duration ? 'is-invalid' : ''}`}
                  value={form.duration}
                  onChange={handleChange}
                  placeholder="e.g. Jan 2023 - Present"
                />
                {errors.duration && <div className="invalid-feedback">{errors.duration}</div>}
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
                {submitting ? 'Saving...' : editingId ? 'Update Experience' : 'Add Experience'}
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
        ) : experiences.length === 0 ? (
          <p className="empty-state">No experience entries added yet.</p>
        ) : (
          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr style={{ fontSize: '0.82rem', color: 'var(--color-ink-500)' }}>
                  <th>Company</th>
                  <th>Role</th>
                  <th>Duration</th>
                  <th style={{ width: 140 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {experiences.map((exp) => (
                  <tr key={exp._id}>
                    <td style={{ fontWeight: 500 }}>{exp.companyName}</td>
                    <td>{exp.role}</td>
                    <td style={{ fontSize: '0.85rem', color: 'var(--color-ink-500)' }}>{exp.duration}</td>
                    <td>
                      <button onClick={() => openEditForm(exp)} style={iconBtnStyle('var(--color-amber)')}>Edit</button>
                      <button onClick={() => handleDelete(exp._id)} style={iconBtnStyle('var(--color-danger)')}>Delete</button>
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

export default ManageExperience;
