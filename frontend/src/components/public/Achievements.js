import React from 'react';

const Achievements = ({ achievements }) => {
  return (
    <section id="achievements" className="section">
      <div className="container">
        <span className="section-label">Recognition</span>
        <h2 className="section-title">Achievements</h2>

        {(!achievements || achievements.length === 0) ? (
          <p className="empty-state" style={{ textAlign: 'left', padding: 0 }}>
            No achievements have been added yet.
          </p>
        ) : (
          <div className="row g-4">
            {achievements.map((ach) => (
              <div className="col-md-6" key={ach._id}>
                <div className="card-elevated h-100 p-4">
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '0.6rem' }}>{ach.title}</h3>
                  <p style={{ color: 'var(--color-ink-500)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
                    {ach.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Achievements;
