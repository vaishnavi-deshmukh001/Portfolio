const Project = require('../models/Project');

// Helper to normalize technologies input (can come as array or comma-separated string)
const normalizeTechnologies = (technologies) => {
  if (Array.isArray(technologies)) {
    return technologies.map((t) => t.trim()).filter((t) => t.length > 0);
  }
  if (typeof technologies === 'string') {
    return technologies
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);
  }
  return [];
};

// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching projects', error: error.message });
  }
};

// @route   POST /api/projects
// @access  Private (Admin only)
const createProject = async (req, res) => {
  try {
    const { title, description, technologies, githubLink, liveDemoLink } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: 'Project title is required' });
    }
    if (!description || !description.trim()) {
      return res.status(400).json({ message: 'Project description is required' });
    }

    const project = await Project.create({
      title: title.trim(),
      description: description.trim(),
      technologies: normalizeTechnologies(technologies),
      githubLink: githubLink ? githubLink.trim() : '',
      liveDemoLink: liveDemoLink ? liveDemoLink.trim() : '',
    });

    res.status(201).json({ message: 'Project added successfully', project });
  } catch (error) {
    res.status(500).json({ message: 'Server error while adding project', error: error.message });
  }
};

// @route   PUT /api/projects/:id
// @access  Private (Admin only)
const updateProject = async (req, res) => {
  try {
    const { title, description, technologies, githubLink, liveDemoLink } = req.body;

    const updateData = {};
    if (title !== undefined) updateData.title = title.trim();
    if (description !== undefined) updateData.description = description.trim();
    if (technologies !== undefined) updateData.technologies = normalizeTechnologies(technologies);
    if (githubLink !== undefined) updateData.githubLink = githubLink.trim();
    if (liveDemoLink !== undefined) updateData.liveDemoLink = liveDemoLink.trim();

    const project = await Project.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({ message: 'Project updated successfully', project });
  } catch (error) {
    res.status(500).json({ message: 'Server error while updating project', error: error.message });
  }
};

// @route   DELETE /api/projects/:id
// @access  Private (Admin only)
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error while deleting project', error: error.message });
  }
};

module.exports = { getProjects, createProject, updateProject, deleteProject };
