import React, { useState } from 'react';
import api from '../../utils/api';
import AdminAlert from './AdminAlert';

const ManageAccount = () => {
  const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [alert, setAlert] = useState({ message: '', type: 'success' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const newErrors = {};
    if (!form.currentPassword) newErrors.currentPassword = 'Current password is required.';
    if (!form.newPassword) {
      newErrors.newPassword = 'New password is required.';
    } else if (form.newPassword.length < 6) {
      newErrors.newPassword = 'New password must be at least 6 characters long.';
    }
    if (form.newPassword !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      await api.put('/auth/change-password', {
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });
      setAlert({ message: 'Password changed successfully.', type: 'success' });
      setForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setAlert({ message: err.response?.data?.message || 'Failed to change password.', type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '0.3rem' }}>Account Settings</h2>
      <p style={{ color: 'var(--color-ink-500)', marginBottom: '1.6rem' }}>
        Change your admin login password.
      </p>

      <AdminAlert message={alert.message} type={alert.type} onClose={() => setAlert({ message: '', type: 'success' })} />

      <div className="card-elevated p-4" style={{ maxWidth: 480 }}>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-medium">Current Password</label>
            <input
              type="password"
              name="currentPassword"
              className={`form-control ${errors.currentPassword ? 'is-invalid' : ''}`}
              value={form.currentPassword}
              onChange={handleChange}
            />
            {errors.currentPassword && <div className="invalid-feedback">{errors.currentPassword}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label fw-medium">New Password</label>
            <input
              type="password"
              name="newPassword"
              className={`form-control ${errors.newPassword ? 'is-invalid' : ''}`}
              value={form.newPassword}
              onChange={handleChange}
            />
            {errors.newPassword && <div className="invalid-feedback">{errors.newPassword}</div>}
          </div>
          <div className="mb-4">
            <label className="form-label fw-medium">Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
              value={form.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
          </div>
          <button type="submit" className="btn-amber" disabled={submitting} style={{ border: 'none' }}>
            {submitting ? 'Updating...' : 'Change Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ManageAccount;
