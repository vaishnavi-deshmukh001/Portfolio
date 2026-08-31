import React from 'react';

const Experience = ({ experiences }) => {
  return (
    <section id="experience" className="section">
      <div className="container">
        <span className="section-label">Where I've Worked</span>
        <h2 className="section-title">Experience</h2>

        {(!experiences || experiences.length === 0) ? (
          <p className="empty-state" style={{ textAlign: 'left', padding: 0 }}>
            No experience entries have been added yet.
          </p>
        ) : (
          <div className="d-flex flex-column gap-3">
            {experiences.map((exp) => (
              <div key={exp._id} className="card-elevated p-4">
                <div className="row align-items-start">
                  <div className="col-md-3">
                    <span style={{ color: 'var(--color-ink-500)', fontSize: '0.85rem', fontWeight: 600 }}>
                      {exp.duration}
                    </span>
                  </div>
                  <div className="col-md-9">
                    <h3 style={{ fontSize: '1.15rem', marginBottom: '0.2rem' }}>{exp.role}</h3>
                    <p style={{ color: 'var(--color-coral)', fontWeight: 700, fontSize: '0.92rem', marginBottom: '0.6rem' }}>
                      {exp.companyName}
                    </p>
                    <p style={{ color: 'var(--color-ink-700)', lineHeight: 1.7, margin: 0 }}>{exp.description}</p>
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

export default Experience;
