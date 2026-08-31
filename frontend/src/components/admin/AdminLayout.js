import React, { useState } from 'react';
import { NavLink, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const NAV_ITEMS = [
  { label: 'Profile & Hero', path: '' },
  { label: 'Skills', path: 'skills' },
  { label: 'Projects', path: 'projects' },
  { label: 'Experience', path: 'experience' },
  { label: 'Certificates', path: 'certificates' },
  { label: 'Achievements', path: 'achievements' },
  { label: 'Education', path: 'education' },
  { label: 'Contact Info', path: 'contact' },
  { label: 'Account Settings', path: 'account' },
];

const AdminLayout = () => {
  const { adminUsername, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-bg)' }}>
      <aside
        className={sidebarOpen ? 'd-block' : 'd-none d-md-block'}
        style={{
          width: 260,
          backgroundColor: 'var(--color-ink-900)',
          color: '#fff',
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          overflowY: 'auto',
          zIndex: 1000,
        }}
      >
        <div style={{ padding: '1.7rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <h3 style={{ color: '#fff', fontSize: '1.1rem', margin: 0 }}>
            Dashboard<span style={{ color: 'var(--color-coral)' }}>.</span>
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', margin: '0.3rem 0 0' }}>
            {adminUsername}
          </p>
        </div>
        <nav style={{ padding: '1rem 0' }}>
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={`/secure-panel-q7m4-access/dashboard/${item.path}`}
              end
              onClick={() => setSidebarOpen(false)}
              style={({ isActive }) => ({
                display: 'block',
                padding: '0.75rem 1.5rem',
                color: isActive ? 'var(--color-coral)' : 'rgba(255,255,255,0.78)',
                backgroundColor: isActive ? 'rgba(232,93,76,0.1)' : 'transparent',
                borderLeft: isActive ? '3px solid var(--color-coral)' : '3px solid transparent',
                fontSize: '0.92rem',
                fontWeight: 600,
              })}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div style={{ padding: '1.5rem' }}>
          <button
            onClick={handleLogout}
            className="btn-outline-slate w-100"
            style={{ borderColor: 'rgba(255,255,255,0.3)', color: '#fff' }}
          >
            Log Out
          </button>
        </div>
      </aside>

      <div
        className="d-md-none"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: 'var(--color-ink-900)',
          color: '#fff',
          padding: '1rem 1.2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 1001,
        }}
      >
        <strong>Dashboard</strong>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{ background: 'none', border: '1px solid rgba(255,255,255,0.4)', color: '#fff', borderRadius: 4, padding: '0.3rem 0.7rem' }}
        >
          Menu
        </button>
      </div>

      <main
        style={{
          flex: 1,
          marginLeft: 0,
          padding: '2rem',
          paddingTop: window.innerWidth < 768 ? '5rem' : '2rem',
        }}
        className="admin-main-content"
      >
        <Outlet />
      </main>

      <style>{`
        @media (min-width: 768px) {
          .admin-main-content {
            margin-left: 260px !important;
            padding-top: 2rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminLayout;
