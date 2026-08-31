const mongoose = require('mongoose');

// Singleton document - only one Contact info record ever exists.
const ContactSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      default: '',
      trim: true,
    },
    phone: {
      type: String,
      default: '',
      trim: true,
    },
    linkedin: {
      type: String,
      default: '',
      trim: true,
    },
    github: {
      type: String,
      default: '',
      trim: true,
    },
    otherLinks: {
      // array of { label, url } objects for "Other Social Links"
      type: [
        {
          label: { type: String, trim: true },
          url: { type: String, trim: true },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Contact', ContactSchema);
