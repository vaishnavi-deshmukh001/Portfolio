import React from 'react';

const Education = ({ education }) => {
  return (
    <section id="education" className="section section-alt">
      <div className="container">
        <span className="section-label">Academic Background</span>
        <h2 className="section-title">Education</h2>

        {(!education || education.length === 0) ? (
          <p className="empty-state" style={{ textAlign: 'left', padding: 0 }}>
            No education entries have been added yet.
          </p>
        ) : (
          <div className="d-flex flex-column gap-3">
            {education.map((edu) => (
              <div key={edu._id} className="card-elevated p-4">
                <div className="row align-items-start">
                  <div className="col-md-2">
                    <span style={{ color: 'var(--color-coral)', fontWeight: 700, fontSize: '0.95rem' }}>
                      {edu.year}
                    </span>
                  </div>
                  <div className="col-md-10">
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>{edu.degree}</h3>
                    <p style={{ color: 'var(--color-ink-700)', fontWeight: 600, marginBottom: edu.description ? '0.5rem' : 0, fontSize: '0.95rem' }}>
                      {edu.collegeName}
                    </p>
                    {edu.description && (
                      <p style={{ color: 'var(--color-ink-500)', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                        {edu.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Education;
