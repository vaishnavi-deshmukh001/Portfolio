import React from 'react';

const Skills = ({ skills }) => {
  return (
    <section id="skills" className="section">
      <div className="container">
        <span className="section-label">What I Know</span>
        <h2 className="section-title">Skills</h2>

        {(!skills || skills.length === 0) ? (
          <p className="empty-state" style={{ textAlign: 'left', padding: 0 }}>
            No skills have been added yet.
          </p>
        ) : (
          <div className="row g-3">
            {skills.map((skill) => (
              <div className="col-6 col-md-3" key={skill._id}>
                <div
                  className="card-elevated p-3 text-center"
                  style={{ fontWeight: 600, color: 'var(--color-ink-900)', fontSize: '0.95rem' }}
                >
                  {skill.name}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;
