import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import AdminAlert from './AdminAlert';

const ManageContact = () => {
  const [form, setForm] = useState({ email: '', phone: '', linkedin: '', github: '' });
  const [otherLinks, setOtherLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState({ message: '', type: 'success' });

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await api.get('/contact');
        setForm({
          email: res.data.email || '',
          phone: res.data.phone || '',
          linkedin: res.data.linkedin || '',
          github: res.data.github || '',
        });
        setOtherLinks(res.data.otherLinks && res.data.otherLinks.length > 0 ? res.data.otherLinks : []);
      } catch (err) {
        setAlert({ message: 'Failed to load contact info.', type: 'error' });
      } finally {
        setLoading(false);
      }
    };
    fetchContact();
  }, []);

  const validate = () => {
    const newErrors = {};
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Enter a valid email address.';
    }
    if (form.linkedin && !/^https?:\/\/.+/.test(form.linkedin)) {
      newErrors.linkedin = 'Must be a valid URL.';
    }
    if (form.github && !/^https?:\/\/.+/.test(form.github)) {
      newErrors.github = 'Must be a valid URL.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const addOtherLink = () => setOtherLinks([...otherLinks, { label: '', url: '' }]);

  const updateOtherLink = (idx, field, value) => {
    const updated = [...otherLinks];
    updated[idx] = { ...updated[idx], [field]: value };
    setOtherLinks(updated);
  };

  const removeOtherLink = (idx) => {
    setOtherLinks(otherLinks.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSaving(true);
    try {
      const cleanedLinks = otherLinks.filter((l) => l.url && l.url.trim());
      await api.put('/contact', { ...form, otherLinks: cleanedLinks });
      setAlert({ message: 'Contact information updated successfully.', type: 'success' });
    } catch (err) {
      setAlert({ message: err.response?.data?.message || 'Failed to update contact info.', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p style={{ color: 'var(--color-ink-500)' }}>Loading...</p>;

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '0.3rem' }}>Contact Information</h2>
      <p style={{ color: 'var(--color-ink-500)', marginBottom: '1.6rem' }}>
        How visitors can get in touch with you.
      </p>

      <AdminAlert message={alert.message} type={alert.type} onClose={() => setAlert({ message: '', type: 'success' })} />

      <div className="card-elevated p-4">
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label fw-medium">Email</label>
              <input
                type="text"
                name="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>
            <div className="col-md-6">
              <label className="form-label fw-medium">Phone Number</label>
              <input
                type="text"
                name="phone"
                className="form-control"
                value={form.phone}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-medium">LinkedIn Link</label>
              <input
                type="text"
                name="linkedin"
                className={`form-control ${errors.linkedin ? 'is-invalid' : ''}`}
                value={form.linkedin}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/yourname"
              />
              {errors.linkedin && <div className="invalid-feedback">{errors.linkedin}</div>}
            </div>
            <div className="col-md-6">
              <label className="form-label fw-medium">GitHub Link</label>
              <input
                type="text"
                name="github"
                className={`form-control ${errors.github ? 'is-invalid' : ''}`}
                value={form.github}
                onChange={handleChange}
                placeholder="https://github.com/yourusername"
              />
              {errors.github && <div className="invalid-feedback">{errors.github}</div>}
            </div>
          </div>

          <hr className="my-4" />

          <div className="d-flex justify-content-between align-items-center mb-3">
            <label className="form-label fw-medium m-0">Other Social Links (Optional)</label>
            <button type="button" onClick={addOtherLink} className="btn-outline-slate" style={{ fontSize: '0.85rem', padding: '0.3rem 0.8rem' }}>
              + Add Link
            </button>
          </div>

          {otherLinks.length === 0 ? (
            <p style={{ color: 'var(--color-ink-500)', fontSize: '0.9rem' }}>No additional links added.</p>
          ) : (
            otherLinks.map((link, idx) => (
              <div className="row g-2 mb-2" key={idx}>
                <div className="col-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Label (e.g. Twitter)"
                    value={link.label}
                    onChange={(e) => updateOtherLink(idx, 'label', e.target.value)}
                  />
                </div>
                <div className="col-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="https://..."
                    value={link.url}
                    onChange={(e) => updateOtherLink(idx, 'url', e.target.value)}
                  />
                </div>
                <div className="col-2">
                  <button type="button" onClick={() => removeOtherLink(idx)} className="btn-outline-slate w-100" style={{ color: 'var(--color-danger)', borderColor: 'var(--color-danger)' }}>
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}

          <button type="submit" className="btn-amber mt-4" disabled={saving} style={{ border: 'none' }}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ManageContact;
