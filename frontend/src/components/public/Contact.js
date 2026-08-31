import React from 'react';

const Contact = ({ contact }) => {
  const hasContent =
    contact &&
    (contact.email || contact.phone || contact.linkedin || contact.github || (contact.otherLinks && contact.otherLinks.length > 0));

  return (
    <section id="contact" className="section">
      <div className="container">
        <span className="section-label">Let's Connect</span>
        <h2 className="section-title">Contact</h2>

        {!hasContent ? (
          <p className="empty-state" style={{ textAlign: 'left', padding: 0 }}>
            No contact information has been added yet.
          </p>
        ) : (
          <div className="row g-3" style={{ maxWidth: 680 }}>
            {contact.email && (
              <div className="col-12 col-sm-6">
                <div className="card-elevated p-3">
                  <span style={{ fontSize: '0.76rem', color: 'var(--color-ink-500)', display: 'block', marginBottom: 4, fontWeight: 700, textTransform: 'uppercase' }}>Email</span>
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </div>
              </div>
            )}
            {contact.phone && (
              <div className="col-12 col-sm-6">
                <div className="card-elevated p-3">
                  <span style={{ fontSize: '0.76rem', color: 'var(--color-ink-500)', display: 'block', marginBottom: 4, fontWeight: 700, textTransform: 'uppercase' }}>Phone</span>
                  <a href={`tel:${contact.phone}`}>{contact.phone}</a>
                </div>
              </div>
            )}
            {contact.linkedin && (
              <div className="col-12 col-sm-6">
                <div className="card-elevated p-3">
                  <span style={{ fontSize: '0.76rem', color: 'var(--color-ink-500)', display: 'block', marginBottom: 4, fontWeight: 700, textTransform: 'uppercase' }}>LinkedIn</span>
                  <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">{contact.linkedin}</a>
                </div>
              </div>
            )}
            {contact.github && (
              <div className="col-12 col-sm-6">
                <div className="card-elevated p-3">
                  <span style={{ fontSize: '0.76rem', color: 'var(--color-ink-500)', display: 'block', marginBottom: 4, fontWeight: 700, textTransform: 'uppercase' }}>GitHub</span>
                  <a href={contact.github} target="_blank" rel="noopener noreferrer">{contact.github}</a>
                </div>
              </div>
            )}
            {contact.otherLinks &&
              contact.otherLinks.map((link, idx) => (
                <div className="col-12 col-sm-6" key={idx}>
                  <div className="card-elevated p-3">
                    <span style={{ fontSize: '0.76rem', color: 'var(--color-ink-500)', display: 'block', marginBottom: 4, fontWeight: 700, textTransform: 'uppercase' }}>
                      {link.label || 'Link'}
                    </span>
                    <a href={link.url} target="_blank" rel="noopener noreferrer">{link.url}</a>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Contact;
