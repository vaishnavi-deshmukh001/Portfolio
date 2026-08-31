const Profile = require('../models/Profile');

// @route   GET /api/profile
// @access  Public
// Returns the single profile document. If none exists yet, returns empty defaults.
const getProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      // No profile created yet - return empty structure so frontend can show empty state
      return res.status(200).json({
        name: '',
        designation: '',
        shortIntro: '',
        resumeLink: '',
        aboutDescription: '',
      });
    }
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching profile', error: error.message });
  }
};

// @route   PUT /api/profile
// @access  Private (Admin only)
// Creates the profile document if it doesn't exist yet, otherwise updates it.
const updateProfile = async (req, res) => {
  try {
    const { name, designation, shortIntro, resumeLink, aboutDescription } = req.body;

    let profile = await Profile.findOne();

    if (!profile) {
      profile = new Profile({});
    }

    if (name !== undefined) profile.name = name;
    if (designation !== undefined) profile.designation = designation;
    if (shortIntro !== undefined) profile.shortIntro = shortIntro;
    if (resumeLink !== undefined) profile.resumeLink = resumeLink;
    if (aboutDescription !== undefined) profile.aboutDescription = aboutDescription;

    await profile.save();

    res.status(200).json({ message: 'Profile updated successfully', profile });
  } catch (error) {
    res.status(500).json({ message: 'Server error while updating profile', error: error.message });
  }
};

module.exports = { getProfile, updateProfile };
