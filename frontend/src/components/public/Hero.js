import React from 'react';

const Hero = ({ profile, loading }) => {
  const hasContent = profile && (profile.name || profile.designation || profile.shortIntro);

  return (
    <section
      id="hero"
      style={{
        paddingTop: '7rem',
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'var(--color-bg)',
      }}
    >
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-7">
            {loading ? (
              <p style={{ color: 'var(--color-ink-500)' }}>Loading...</p>
            ) : !hasContent ? (
              <div>
                <span className="section-label">Hero Section</span>
                <p className="empty-state" style={{ textAlign: 'left', padding: 0 }}>
                  No profile information has been added yet. Add your name, designation, and a short
                  introduction from the admin panel to populate this section.
                </p>
              </div>
            ) : (
              <>
                <span className="section-label">Hello, I'm</span>
                <h1
                  style={{
                    fontSize: 'clamp(2.6rem, 6vw, 4rem)',
                    lineHeight: 1.05,
                    marginBottom: '1rem',
                  }}
                >
                  {profile.name}
                </h1>
                {profile.designation && (
                  <h2
                    style={{
                      color: 'var(--color-ink-500)',
                      fontSize: '1.3rem',
                      fontWeight: 600,
                      fontFamily: 'var(--font-body)',
                      marginBottom: '1.3rem',
                    }}
                  >
                    {profile.designation}
                  </h2>
                )}
                {profile.shortIntro && (
                  <p
                    style={{
                      color: 'var(--color-ink-700)',
                      fontSize: '1.05rem',
                      lineHeight: 1.7,
                      marginBottom: '2rem',
                      maxWidth: 540,
                    }}
                  >
                    {profile.shortIntro}
                  </p>
                )}
                <div className="d-flex gap-3 flex-wrap">
                  {profile.resumeLink && (
                    <a href={profile.resumeLink} target="_blank" rel="noopener noreferrer" className="btn-amber">
                      View Resume
                    </a>
                  )}
                  <a href="#contact" className="btn-outline-slate">
                    Get in Touch
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
