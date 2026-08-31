import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import AdminAlert from './AdminAlert';

const EMPTY_FORM = { title: '', description: '', verificationLink: '' };

const ManageCertificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [alert, setAlert] = useState({ message: '', type: 'success' });

  const fetchCertificates = async () => {
    try {
      const res = await api.get('/certificates');
      setCertificates(res.data);
    } catch (err) {
      setAlert({ message: 'Failed to load certificates.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const openAddForm = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setErrors({});
    setShowForm(true);
  };

  const openEditForm = (cert) => {
    setForm({
      title: cert.title,
      description: cert.description,
      verificationLink: cert.verificationLink || '',
    });
    setEditingId(cert._id);
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
    if (!form.title.trim()) newErrors.title = 'Certificate title is required.';
    if (!form.description.trim()) newErrors.description = 'Description is required.';
    if (form.verificationLink && !/^https?:\/\/.+/.test(form.verificationLink)) {
      newErrors.verificationLink = 'Must be a valid URL starting with http:// or https://';
    }
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
        await api.put(`/certificates/${editingId}`, form);
        setAlert({ message: 'Certificate updated successfully.', type: 'success' });
      } else {
        await api.post('/certificates', form);
        setAlert({ message: 'Certificate added successfully.', type: 'success' });
      }
      closeForm();
      fetchCertificates();
    } catch (err) {
      setAlert({ message: err.response?.data?.message || 'Failed to save certificate.', type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this certificate?')) return;
    try {
      await api.delete(`/certificates/${id}`);
      setAlert({ message: 'Certificate deleted successfully.', type: 'success' });
      fetchCertificates();
    } catch (err) {
      setAlert({ message: err.response?.data?.message || 'Failed to delete certificate.', type: 'error' });
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-1">
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.3rem' }}>Manage Certificates</h2>
          <p style={{ color: 'var(--color-ink-500)' }}>Certifications and credentials you've earned.</p>
        </div>
        {!showForm && (
          <button onClick={openAddForm} className="btn-amber" style={{ border: 'none' }}>
            + Add Certificate
          </button>
        )}
      </div>

      <AdminAlert message={alert.message} type={alert.type} onClose={() => setAlert({ message: '', type: 'success' })} />

      {showForm && (
        <div className="card-elevated p-4 mb-4">
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>{editingId ? 'Edit Certificate' : 'Add New Certificate'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-12">
                <label className="form-label fw-medium">Certificate Title</label>
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
              <div className="col-12">
                <label className="form-label fw-medium">Verification Link (Optional)</label>
                <input
                  type="text"
                  name="verificationLink"
                  className={`form-control ${errors.verificationLink ? 'is-invalid' : ''}`}
                  value={form.verificationLink}
                  onChange={handleChange}
                  placeholder="https://verify.credential.com/your-cert"
                />
                {errors.verificationLink && <div className="invalid-feedback">{errors.verificationLink}</div>}
              </div>
            </div>
            <div className="d-flex gap-2 mt-4">
              <button type="submit" className="btn-amber" disabled={submitting} style={{ border: 'none' }}>
                {submitting ? 'Saving...' : editingId ? 'Update Certificate' : 'Add Certificate'}
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
        ) : certificates.length === 0 ? (
          <p className="empty-state">No certificates added yet.</p>
        ) : (
          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr style={{ fontSize: '0.82rem', color: 'var(--color-ink-500)' }}>
                  <th>Title</th>
                  <th>Verification</th>
                  <th style={{ width: 140 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {certificates.map((cert) => (
                  <tr key={cert._id}>
                    <td style={{ fontWeight: 500 }}>{cert.title}</td>
                    <td style={{ fontSize: '0.85rem' }}>{cert.verificationLink ? 'Link added ✓' : '—'}</td>
                    <td>
                      <button onClick={() => openEditForm(cert)} style={iconBtnStyle('var(--color-amber)')}>Edit</button>
                      <button onClick={() => handleDelete(cert._id)} style={iconBtnStyle('var(--color-danger)')}>Delete</button>
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

export default ManageCertificates;
