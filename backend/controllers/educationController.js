const Education = require('../models/Education');

// @route   GET /api/education
// @access  Public
const getEducation = async (req, res) => {
  try {
    const education = await Education.find().sort({ createdAt: -1 });
    res.status(200).json(education);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching education', error: error.message });
  }
};

// @route   POST /api/education
// @access  Private (Admin only)
const createEducation = async (req, res) => {
  try {
    const { degree, collegeName, year, description } = req.body;

    if (!degree || !degree.trim()) {
      return res.status(400).json({ message: 'Degree is required' });
    }
    if (!collegeName || !collegeName.trim()) {
      return res.status(400).json({ message: 'College name is required' });
    }
    if (!year || !year.trim()) {
      return res.status(400).json({ message: 'Year is required' });
    }

    const education = await Education.create({
      degree: degree.trim(),
      collegeName: collegeName.trim(),
      year: year.trim(),
      description: description ? description.trim() : '',
    });

    res.status(201).json({ message: 'Education added successfully', education });
  } catch (error) {
    res.status(500).json({ message: 'Server error while adding education', error: error.message });
  }
};

// @route   PUT /api/education/:id
// @access  Private (Admin only)
const updateEducation = async (req, res) => {
  try {
    const { degree, collegeName, year, description } = req.body;

    const updateData = {};
    if (degree !== undefined) updateData.degree = degree.trim();
    if (collegeName !== undefined) updateData.collegeName = collegeName.trim();
    if (year !== undefined) updateData.year = year.trim();
    if (description !== undefined) updateData.description = description.trim();

    const education = await Education.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!education) {
      return res.status(404).json({ message: 'Education entry not found' });
    }

    res.status(200).json({ message: 'Education updated successfully', education });
  } catch (error) {
    res.status(500).json({ message: 'Server error while updating education', error: error.message });
  }
};

// @route   DELETE /api/education/:id
// @access  Private (Admin only)
const deleteEducation = async (req, res) => {
  try {
    const education = await Education.findByIdAndDelete(req.params.id);
    if (!education) {
      return res.status(404).json({ message: 'Education entry not found' });
    }
    res.status(200).json({ message: 'Education deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error while deleting education', error: error.message });
  }
};

module.exports = { getEducation, createEducation, updateEducation, deleteEducation };
