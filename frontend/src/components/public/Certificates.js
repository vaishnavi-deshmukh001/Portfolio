import React from 'react';

const Certificates = ({ certificates }) => {
  return (
    <section id="certificates" className="section section-alt">
      <div className="container">
        <span className="section-label">Credentials</span>
        <h2 className="section-title">Certificates</h2>

        {(!certificates || certificates.length === 0) ? (
          <p className="empty-state" style={{ textAlign: 'left', padding: 0 }}>
            No certificates have been added yet.
          </p>
        ) : (
          <div className="row g-4">
            {certificates.map((cert) => (
              <div className="col-md-6" key={cert._id}>
                <div className="card-elevated h-100 p-4">
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '0.6rem' }}>{cert.title}</h3>
                  <p
                    style={{
                      color: 'var(--color-ink-500)',
                      fontSize: '0.95rem',
                      lineHeight: 1.6,
                      marginBottom: cert.verificationLink ? '1rem' : 0,
                    }}
                  >
                    {cert.description}
                  </p>
                  {cert.verificationLink && (
                    <a
                      href={cert.verificationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline-slate"
                      style={{ fontSize: '0.85rem', padding: '0.4rem 1rem', display: 'inline-block' }}
                    >
                      Verify Certificate
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Certificates;
