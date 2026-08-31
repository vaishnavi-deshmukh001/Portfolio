const Achievement = require('../models/Achievement');

// @route   GET /api/achievements
// @access  Public
const getAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.find().sort({ createdAt: -1 });
    res.status(200).json(achievements);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching achievements', error: error.message });
  }
};

// @route   POST /api/achievements
// @access  Private (Admin only)
const createAchievement = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: 'Achievement title is required' });
    }
    if (!description || !description.trim()) {
      return res.status(400).json({ message: 'Description is required' });
    }

    const achievement = await Achievement.create({
      title: title.trim(),
      description: description.trim(),
    });

    res.status(201).json({ message: 'Achievement added successfully', achievement });
  } catch (error) {
    res.status(500).json({ message: 'Server error while adding achievement', error: error.message });
  }
};

// @route   PUT /api/achievements/:id
// @access  Private (Admin only)
const updateAchievement = async (req, res) => {
  try {
    const { title, description } = req.body;

    const updateData = {};
    if (title !== undefined) updateData.title = title.trim();
    if (description !== undefined) updateData.description = description.trim();

    const achievement = await Achievement.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!achievement) {
      return res.status(404).json({ message: 'Achievement not found' });
    }

    res.status(200).json({ message: 'Achievement updated successfully', achievement });
  } catch (error) {
    res.status(500).json({ message: 'Server error while updating achievement', error: error.message });
  }
};

// @route   DELETE /api/achievements/:id
// @access  Private (Admin only)
const deleteAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.findByIdAndDelete(req.params.id);
    if (!achievement) {
      return res.status(404).json({ message: 'Achievement not found' });
    }
    res.status(200).json({ message: 'Achievement deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error while deleting achievement', error: error.message });
  }
};

module.exports = { getAchievements, createAchievement, updateAchievement, deleteAchievement };
