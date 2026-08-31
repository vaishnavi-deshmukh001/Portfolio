import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import AdminAlert from './AdminAlert';

const EMPTY_FORM = { title: '', description: '', technologies: '', githubLink: '', liveDemoLink: '' };

const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [alert, setAlert] = useState({ message: '', type: 'success' });

  const fetchProjects = async () => {
    try {
      const res = await api.get('/projects');
      setProjects(res.data);
    } catch (err) {
      setAlert({ message: 'Failed to load projects.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openAddForm = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setErrors({});
    setShowForm(true);
  };

  const openEditForm = (project) => {
    setForm({
      title: project.title,
      description: project.description,
      technologies: (project.technologies || []).join(', '),
      githubLink: project.githubLink || '',
      liveDemoLink: project.liveDemoLink || '',
    });
    setEditingId(project._id);
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
    if (!form.title.trim()) newErrors.title = 'Project title is required.';
    if (!form.description.trim()) newErrors.description = 'Description is required.';
    if (form.githubLink && !/^https?:\/\/.+/.test(form.githubLink)) {
      newErrors.githubLink = 'Must be a valid URL starting with http:// or https://';
    }
    if (form.liveDemoLink && !/^https?:\/\/.+/.test(form.liveDemoLink)) {
      newErrors.liveDemoLink = 'Must be a valid URL starting with http:// or https://';
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
        await api.put(`/projects/${editingId}`, form);
        setAlert({ message: 'Project updated successfully.', type: 'success' });
      } else {
        await api.post('/projects', form);
        setAlert({ message: 'Project added successfully.', type: 'success' });
      }
      closeForm();
      fetchProjects();
    } catch (err) {
      setAlert({ message: err.response?.data?.message || 'Failed to save project.', type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await api.delete(`/projects/${id}`);
      setAlert({ message: 'Project deleted successfully.', type: 'success' });
      fetchProjects();
    } catch (err) {
      setAlert({ message: err.response?.data?.message || 'Failed to delete project.', type: 'error' });
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-1">
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.3rem' }}>Manage Projects</h2>
          <p style={{ color: 'var(--color-ink-500)' }}>Showcase the projects you've built.</p>
        </div>
        {!showForm && (
          <button onClick={openAddForm} className="btn-amber" style={{ border: 'none' }}>
            + Add Project
          </button>
        )}
      </div>

      <AdminAlert message={alert.message} type={alert.type} onClose={() => setAlert({ message: '', type: 'success' })} />

      {showForm && (
        <div className="card-elevated p-4 mb-4">
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>{editingId ? 'Edit Project' : 'Add New Project'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label fw-medium">Project Title</label>
                <input
                  type="text"
                  name="title"
                  className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                  value={form.title}
                  onChange={handleChange}
                />
                {errors.title && <div className="invalid-feedback">{errors.title}</div>}
              </div>
              <div className="col-md-6">
                <label className="form-label fw-medium">Technologies Used</label>
                <input
                  type="text"
                  name="technologies"
                  className="form-control"
                  value={form.technologies}
                  onChange={handleChange}
                  placeholder="React, Node.js, MongoDB (comma separated)"
                />
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
              <div className="col-md-6">
                <label className="form-label fw-medium">GitHub Link (Optional)</label>
                <input
                  type="text"
                  name="githubLink"
                  className={`form-control ${errors.githubLink ? 'is-invalid' : ''}`}
                  value={form.githubLink}
                  onChange={handleChange}
                  placeholder="https://github.com/username/repo"
                />
                {errors.githubLink && <div className="invalid-feedback">{errors.githubLink}</div>}
              </div>
              <div className="col-md-6">
                <label className="form-label fw-medium">Live Demo Link (Optional)</label>
                <input
                  type="text"
                  name="liveDemoLink"
                  className={`form-control ${errors.liveDemoLink ? 'is-invalid' : ''}`}
                  value={form.liveDemoLink}
                  onChange={handleChange}
                  placeholder="https://yourproject.com"
                />
                {errors.liveDemoLink && <div className="invalid-feedback">{errors.liveDemoLink}</div>}
              </div>
            </div>
            <div className="d-flex gap-2 mt-4">
              <button type="submit" className="btn-amber" disabled={submitting} style={{ border: 'none' }}>
                {submitting ? 'Saving...' : editingId ? 'Update Project' : 'Add Project'}
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
        ) : projects.length === 0 ? (
          <p className="empty-state">No projects added yet. Click "Add Project" to get started.</p>
        ) : (
          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr style={{ fontSize: '0.82rem', color: 'var(--color-ink-500)' }}>
                  <th>Title</th>
                  <th>Technologies</th>
                  <th>Links</th>
                  <th style={{ width: 140 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project._id}>
                    <td style={{ fontWeight: 500 }}>{project.title}</td>
                    <td style={{ fontSize: '0.85rem', color: 'var(--color-ink-500)' }}>
                      {project.technologies && project.technologies.length > 0 ? project.technologies.join(', ') : '—'}
                    </td>
                    <td style={{ fontSize: '0.82rem' }}>
                      {project.githubLink && <span style={{ marginRight: 8 }}>GitHub ✓</span>}
                      {project.liveDemoLink && <span>Demo ✓</span>}
                      {!project.githubLink && !project.liveDemoLink && '—'}
                    </td>
                    <td>
                      <button onClick={() => openEditForm(project)} style={iconBtnStyle('var(--color-amber)')}>Edit</button>
                      <button onClick={() => handleDelete(project._id)} style={iconBtnStyle('var(--color-danger)')}>Delete</button>
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

export default ManageProjects;
