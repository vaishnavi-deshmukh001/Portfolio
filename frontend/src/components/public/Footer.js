import React from 'react';

const Footer = ({ name }) => {
  const year = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: 'var(--color-ink-900)', padding: '2.2rem 0', textAlign: 'center' }}>
      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', margin: 0 }}>
        © {year} {name && name.trim() ? name : 'Portfolio'}. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
