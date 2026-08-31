const mongoose = require('mongoose');

// This holds Hero Section + About Section data.
// It is a SINGLETON collection — only ever one document exists.
const ProfileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: '',
      trim: true,
    },
    designation: {
      type: String,
      default: '',
      trim: true,
    },
    shortIntro: {
      type: String,
      default: '',
      trim: true,
    },
    resumeLink: {
      type: String,
      default: '',
      trim: true,
    },
    aboutDescription: {
      type: String,
      default: '',
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Profile', ProfileSchema);
