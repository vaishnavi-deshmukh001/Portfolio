const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
      trim: true,
    },
    technologies: {
      // stored as array of strings, e.g. ["React", "Node.js", "MongoDB"]
      type: [String],
      default: [],
    },
    githubLink: {
      type: String,
      default: '',
      trim: true,
    },
    liveDemoLink: {
      type: String,
      default: '',
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', ProjectSchema);
