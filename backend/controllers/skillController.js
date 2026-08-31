const Skill = require('../models/Skill');

// @route   GET /api/skills
// @access  Public
const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ createdAt: -1 });
    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching skills', error: error.message });
  }
};

// @route   POST /api/skills
// @access  Private (Admin only)
const createSkill = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ message: 'Skill name is required' });
    }
    const skill = await Skill.create({ name: name.trim() });
    res.status(201).json({ message: 'Skill added successfully', skill });
  } catch (error) {
    res.status(500).json({ message: 'Server error while adding skill', error: error.message });
  }
};

// @route   PUT /api/skills/:id
// @access  Private (Admin only)
const updateSkill = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ message: 'Skill name is required' });
    }
    const skill = await Skill.findByIdAndUpdate(
      req.params.id,
      { name: name.trim() },
      { new: true, runValidators: true }
    );
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    res.status(200).json({ message: 'Skill updated successfully', skill });
  } catch (error) {
    res.status(500).json({ message: 'Server error while updating skill', error: error.message });
  }
};

// @route   DELETE /api/skills/:id
// @access  Private (Admin only)
const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    res.status(200).json({ message: 'Skill deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error while deleting skill', error: error.message });
  }
};

module.exports = { getSkills, createSkill, updateSkill, deleteSkill };
