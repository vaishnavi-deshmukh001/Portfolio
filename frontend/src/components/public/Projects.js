import React from 'react';

const Projects = ({ projects }) => {
  return (
    <section id="projects" className="section section-alt">
      <div className="container">
        <span className="section-label">My Work</span>
        <h2 className="section-title">Projects</h2>

        {(!projects || projects.length === 0) ? (
          <p className="empty-state" style={{ textAlign: 'left', padding: 0 }}>
            No projects have been added yet.
          </p>
        ) : (
          <div className="row g-4">
            {projects.map((project) => (
              <div className="col-md-6" key={project._id}>
                <div className="card-elevated h-100 p-4 d-flex flex-column">
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.7rem' }}>{project.title}</h3>
                  <p style={{ color: 'var(--color-ink-500)', fontSize: '0.96rem', lineHeight: 1.65, flexGrow: 1 }}>
                    {project.description}
                  </p>

                  {project.technologies && project.technologies.length > 0 && (
                    <div className="d-flex flex-wrap gap-2 mb-3">
                      {project.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          style={{
                            fontSize: '0.75rem',
                            backgroundColor: 'var(--color-coral-light)',
                            color: 'var(--color-coral-dark)',
                            borderRadius: '999px',
                            padding: '0.25rem 0.7rem',
                            fontWeight: 600,
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="d-flex gap-2 mt-auto">
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-outline-slate"
                        style={{ fontSize: '0.85rem', padding: '0.45rem 1.1rem' }}
                      >
                        GitHub
                      </a>
                    )}
                    {project.liveDemoLink && (
                      <a
                        href={project.liveDemoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-amber"
                        style={{ fontSize: '0.85rem', padding: '0.45rem 1.1rem' }}
                      >
                        Live Demo
                      </a>
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

export default Projects;
