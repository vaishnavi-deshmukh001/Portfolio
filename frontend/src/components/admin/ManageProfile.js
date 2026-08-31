import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import AdminAlert from './AdminAlert';

const ManageProfile = () => {
  const [form, setForm] = useState({
    name: '',
    designation: '',
    shortIntro: '',
    resumeLink: '',
    aboutDescription: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState({ message: '', type: 'success' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/profile');
        setForm({
          name: res.data.name || '',
          designation: res.data.designation || '',
          shortIntro: res.data.shortIntro || '',
          resumeLink: res.data.resumeLink || '',
          aboutDescription: res.data.aboutDescription || '',
        });
      } catch (err) {
        setAlert({ message: 'Failed to load profile data.', type: 'error' });
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required.';
    if (!form.designation.trim()) newErrors.designation = 'Designation is required.';
    if (!form.shortIntro.trim()) newErrors.shortIntro = 'Short introduction is required.';
    if (!form.aboutDescription.trim()) newErrors.aboutDescription = 'About description is required.';
    if (form.resumeLink && !/^https?:\/\/.+/.test(form.resumeLink)) {
      newErrors.resumeLink = 'Resume link must be a valid URL starting with http:// or https://';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSaving(true);
    try {
      await api.put('/profile', form);
      setAlert({ message: 'Profile updated successfully. Changes are now live on the portfolio.', type: 'success' });
    } catch (err) {
      setAlert({ message: err.response?.data?.message || 'Failed to update profile.', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p style={{ color: 'var(--color-ink-500)' }}>Loading...</p>;

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '0.3rem' }}>Profile &amp; Hero Section</h2>
      <p style={{ color: 'var(--color-ink-500)', marginBottom: '1.6rem' }}>
        This information appears in the Hero and About sections of your portfolio.
      </p>

      <AdminAlert message={alert.message} type={alert.type} onClose={() => setAlert({ message: '', type: 'success' })} />

      <div className="card-elevated p-4">
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label fw-medium">Name</label>
              <input
                type="text"
                name="name"
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                value={form.name}
                onChange={handleChange}
              />
              {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>
            <div className="col-md-6">
              <label className="form-label fw-medium">Designation</label>
              <input
                type="text"
                name="designation"
                className={`form-control ${errors.designation ? 'is-invalid' : ''}`}
                value={form.designation}
                onChange={handleChange}
                placeholder="e.g. Full Stack Developer"
              />
              {errors.designation && <div className="invalid-feedback">{errors.designation}</div>}
            </div>
            <div className="col-12">
              <label className="form-label fw-medium">Short Introduction</label>
              <textarea
                name="shortIntro"
                rows={3}
                className={`form-control ${errors.shortIntro ? 'is-invalid' : ''}`}
                value={form.shortIntro}
                onChange={handleChange}
                placeholder="A brief introduction shown in the Hero section"
              />
              {errors.shortIntro && <div className="invalid-feedback">{errors.shortIntro}</div>}
            </div>
            <div className="col-12">
              <label className="form-label fw-medium">Resume Link (Optional)</label>
              <input
                type="text"
                name="resumeLink"
                className={`form-control ${errors.resumeLink ? 'is-invalid' : ''}`}
                value={form.resumeLink}
                onChange={handleChange}
                placeholder="https://drive.google.com/your-resume-link"
              />
              {errors.resumeLink && <div className="invalid-feedback">{errors.resumeLink}</div>}
              <small style={{ color: 'var(--color-ink-500)' }}>
                Leave blank to hide the "View Resume" button on the portfolio.
              </small>
            </div>
            <div className="col-12">
              <label className="form-label fw-medium">About Description</label>
              <textarea
                name="aboutDescription"
                rows={5}
                className={`form-control ${errors.aboutDescription ? 'is-invalid' : ''}`}
                value={form.aboutDescription}
                onChange={handleChange}
                placeholder="Tell visitors more about yourself - this appears in the About section"
              />
              {errors.aboutDescription && <div className="invalid-feedback">{errors.aboutDescription}</div>}
            </div>
          </div>

          <button type="submit" className="btn-amber mt-4" disabled={saving} style={{ border: 'none' }}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ManageProfile;
