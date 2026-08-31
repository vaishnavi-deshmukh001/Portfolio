const Experience = require('../models/Experience');

// @route   GET /api/experience
// @access  Public
const getExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ createdAt: -1 });
    res.status(200).json(experiences);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching experiences', error: error.message });
  }
};

// @route   POST /api/experience
// @access  Private (Admin only)
const createExperience = async (req, res) => {
  try {
    const { companyName, role, duration, description } = req.body;

    if (!companyName || !role || !duration || !description) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const experience = await Experience.create({
      companyName: companyName.trim(),
      role: role.trim(),
      duration: duration.trim(),
      description: description.trim(),
    });

    res.status(201).json({ message: 'Experience added successfully', experience });
  } catch (error) {
    res.status(500).json({ message: 'Server error while adding experience', error: error.message });
  }
};

// @route   PUT /api/experience/:id
// @access  Private (Admin only)
const updateExperience = async (req, res) => {
  try {
    const { companyName, role, duration, description } = req.body;

    const updateData = {};
    if (companyName !== undefined) updateData.companyName = companyName.trim();
    if (role !== undefined) updateData.role = role.trim();
    if (duration !== undefined) updateData.duration = duration.trim();
    if (description !== undefined) updateData.description = description.trim();

    const experience = await Experience.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }

    res.status(200).json({ message: 'Experience updated successfully', experience });
  } catch (error) {
    res.status(500).json({ message: 'Server error while updating experience', error: error.message });
  }
};

// @route   DELETE /api/experience/:id
// @access  Private (Admin only)
const deleteExperience = async (req, res) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);
    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }
    res.status(200).json({ message: 'Experience deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error while deleting experience', error: error.message });
  }
};

module.exports = { getExperiences, createExperience, updateExperience, deleteExperience };
