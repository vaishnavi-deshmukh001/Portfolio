import React from 'react';

const About = ({ profile }) => {
  const hasContent = profile && profile.aboutDescription && profile.aboutDescription.trim();

  return (
    <section id="about" className="section section-alt">
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <span className="section-label">Who I Am</span>
            <h2 className="section-title" style={{ borderBottom: 'none', paddingBottom: 0 }}>About</h2>
          </div>
          <div className="col-lg-9">
            {!hasContent ? (
              <p className="empty-state" style={{ textAlign: 'left', padding: 0 }}>
                No about information has been added yet.
              </p>
            ) : (
              <p style={{ fontSize: '1.1rem', lineHeight: 1.85, color: 'var(--color-ink-700)', maxWidth: 720 }}>
                {profile.aboutDescription}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
