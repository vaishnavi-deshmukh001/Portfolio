import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import AdminAlert from './AdminAlert';

const EMPTY_FORM = { degree: '', collegeName: '', year: '', description: '' };

const ManageEducation = () => {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [alert, setAlert] = useState({ message: '', type: 'success' });

  const fetchEducation = async () => {
    try {
      const res = await api.get('/education');
      setEducation(res.data);
    } catch (err) {
      setAlert({ message: 'Failed to load education entries.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEducation();
  }, []);

  const openAddForm = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setErrors({});
    setShowForm(true);
  };

  const openEditForm = (edu) => {
    setForm({
      degree: edu.degree,
      collegeName: edu.collegeName,
      year: edu.year,
      description: edu.description || '',
    });
    setEditingId(edu._id);
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
    if (!form.degree.trim()) newErrors.degree = 'Degree is required.';
    if (!form.collegeName.trim()) newErrors.collegeName = 'College name is required.';
    if (!form.year.trim()) newErrors.year = 'Year is required.';
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
        await api.put(`/education/${editingId}`, form);
        setAlert({ message: 'Education updated successfully.', type: 'success' });
      } else {
        await api.post('/education', form);
        setAlert({ message: 'Education added successfully.', type: 'success' });
      }
      closeForm();
      fetchEducation();
    } catch (err) {
      setAlert({ message: err.response?.data?.message || 'Failed to save education.', type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this education entry?')) return;
    try {
      await api.delete(`/education/${id}`);
      setAlert({ message: 'Education deleted successfully.', type: 'success' });
      fetchEducation();
    } catch (err) {
      setAlert({ message: err.response?.data?.message || 'Failed to delete education.', type: 'error' });
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-1">
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.3rem' }}>Manage Education</h2>
          <p style={{ color: 'var(--color-ink-500)' }}>Your academic background.</p>
        </div>
        {!showForm && (
          <button onClick={openAddForm} className="btn-amber" style={{ border: 'none' }}>
            + Add Education
          </button>
        )}
      </div>

      <AdminAlert message={alert.message} type={alert.type} onClose={() => setAlert({ message: '', type: 'success' })} />

      {showForm && (
        <div className="card-elevated p-4 mb-4">
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>{editingId ? 'Edit Education' : 'Add New Education'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label fw-medium">Degree</label>
                <input
                  type="text"
                  name="degree"
                  className={`form-control ${errors.degree ? 'is-invalid' : ''}`}
                  value={form.degree}
                  onChange={handleChange}
                  placeholder="e.g. B.Tech in Computer Science"
                />
                {errors.degree && <div className="invalid-feedback">{errors.degree}</div>}
              </div>
              <div className="col-md-6">
                <label className="form-label fw-medium">College Name</label>
                <input
                  type="text"
                  name="collegeName"
                  className={`form-control ${errors.collegeName ? 'is-invalid' : ''}`}
                  value={form.collegeName}
                  onChange={handleChange}
                />
                {errors.collegeName && <div className="invalid-feedback">{errors.collegeName}</div>}
              </div>
              <div className="col-md-6">
                <label className="form-label fw-medium">Year</label>
                <input
                  type="text"
                  name="year"
                  className={`form-control ${errors.year ? 'is-invalid' : ''}`}
                  value={form.year}
                  onChange={handleChange}
                  placeholder="e.g. 2020 - 2024"
                />
                {errors.year && <div className="invalid-feedback">{errors.year}</div>}
              </div>
              <div className="col-12">
                <label className="form-label fw-medium">Description (Optional)</label>
                <textarea
                  name="description"
                  rows={3}
                  className="form-control"
                  value={form.description}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="d-flex gap-2 mt-4">
              <button type="submit" className="btn-amber" disabled={submitting} style={{ border: 'none' }}>
                {submitting ? 'Saving...' : editingId ? 'Update Education' : 'Add Education'}
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
        ) : education.length === 0 ? (
          <p className="empty-state">No education entries added yet.</p>
        ) : (
          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr style={{ fontSize: '0.82rem', color: 'var(--color-ink-500)' }}>
                  <th>Degree</th>
                  <th>College</th>
                  <th>Year</th>
                  <th style={{ width: 140 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {education.map((edu) => (
                  <tr key={edu._id}>
                    <td style={{ fontWeight: 500 }}>{edu.degree}</td>
                    <td>{edu.collegeName}</td>
                    <td style={{ fontSize: '0.85rem', color: 'var(--color-ink-500)' }}>{edu.year}</td>
                    <td>
                      <button onClick={() => openEditForm(edu)} style={iconBtnStyle('var(--color-amber)')}>Edit</button>
                      <button onClick={() => handleDelete(edu._id)} style={iconBtnStyle('var(--color-danger)')}>Delete</button>
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

export default ManageEducation;
