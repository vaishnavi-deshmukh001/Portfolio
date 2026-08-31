const Certificate = require('../models/Certificate');

// @route   GET /api/certificates
// @access  Public
const getCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find().sort({ createdAt: -1 });
    res.status(200).json(certificates);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching certificates', error: error.message });
  }
};

// @route   POST /api/certificates
// @access  Private (Admin only)
const createCertificate = async (req, res) => {
  try {
    const { title, description, verificationLink } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: 'Certificate title is required' });
    }
    if (!description || !description.trim()) {
      return res.status(400).json({ message: 'Description is required' });
    }

    const certificate = await Certificate.create({
      title: title.trim(),
      description: description.trim(),
      verificationLink: verificationLink ? verificationLink.trim() : '',
    });

    res.status(201).json({ message: 'Certificate added successfully', certificate });
  } catch (error) {
    res.status(500).json({ message: 'Server error while adding certificate', error: error.message });
  }
};

// @route   PUT /api/certificates/:id
// @access  Private (Admin only)
const updateCertificate = async (req, res) => {
  try {
    const { title, description, verificationLink } = req.body;

    const updateData = {};
    if (title !== undefined) updateData.title = title.trim();
    if (description !== undefined) updateData.description = description.trim();
    if (verificationLink !== undefined) updateData.verificationLink = verificationLink.trim();

    const certificate = await Certificate.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }

    res.status(200).json({ message: 'Certificate updated successfully', certificate });
  } catch (error) {
    res.status(500).json({ message: 'Server error while updating certificate', error: error.message });
  }
};

// @route   DELETE /api/certificates/:id
// @access  Private (Admin only)
const deleteCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findByIdAndDelete(req.params.id);
    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }
    res.status(200).json({ message: 'Certificate deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error while deleting certificate', error: error.message });
  }
};

module.exports = { getCertificates, createCertificate, updateCertificate, deleteCertificate };
