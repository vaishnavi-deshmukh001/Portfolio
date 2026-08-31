import React, { useState } from 'react';
import { useHiddenAdminAccess } from '../../utils/useHiddenAdminAccess';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = ({ name }) => {
  const [expanded, setExpanded] = useState(false);
  const { handleSecretMultiClick } = useHiddenAdminAccess();

  return (
    <nav
      className="navbar navbar-expand-lg fixed-top"
      style={{ backgroundColor: '#fff', borderBottom: '1px solid var(--color-border)', padding: '1rem 0' }}
    >
      <div className="container d-flex justify-content-between align-items-center">
        {/* 
          Hidden admin access point: click this brand name 6 times within 2.5s.
          Looks like an ordinary, non-interactive logo/brand element.
        */}
        <span
          onClick={handleSecretMultiClick}
          className="navbar-brand m-0"
          style={{
            fontFamily: 'var(--font-display)',
            color: 'var(--color-ink-900)',
            fontSize: '1.25rem',
            fontWeight: 700,
            cursor: 'default',
            userSelect: 'none',
          }}
        >
          {name && name.trim() ? name : 'Portfolio'}
          <span style={{ color: 'var(--color-coral)' }}>.</span>
        </span>

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setExpanded(!expanded)}
          aria-label="Toggle navigation"
          style={{ border: 'none' }}
        >
          <span style={{ display: 'block', width: 22, height: 2, backgroundColor: 'var(--color-ink-900)', marginBottom: 5 }} />
          <span style={{ display: 'block', width: 22, height: 2, backgroundColor: 'var(--color-ink-900)', marginBottom: 5 }} />
          <span style={{ display: 'block', width: 22, height: 2, backgroundColor: 'var(--color-ink-900)' }} />
        </button>

        <div className={`${expanded ? 'd-flex' : 'd-none'} d-lg-flex flex-column flex-lg-row`}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setExpanded(false)}
              className="mx-lg-3 py-2 nav-underline-link"
              style={{ color: 'var(--color-ink-700)', fontSize: '0.9rem', fontWeight: 600 }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <style>{`
        .nav-underline-link {
          position: relative;
          transition: color 0.15s ease;
        }
        .nav-underline-link::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -2px;
          width: 0;
          height: 2px;
          background-color: var(--color-coral);
          transition: width 0.2s ease;
        }
        .nav-underline-link:hover {
          color: var(--color-coral) !important;
        }
        .nav-underline-link:hover::after {
          width: 100%;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
