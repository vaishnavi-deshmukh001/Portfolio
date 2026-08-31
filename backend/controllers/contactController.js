const Contact = require('../models/Contact');

// @route   GET /api/contact
// @access  Public
const getContact = async (req, res) => {
  try {
    let contact = await Contact.findOne();
    if (!contact) {
      return res.status(200).json({
        email: '',
        phone: '',
        linkedin: '',
        github: '',
        otherLinks: [],
      });
    }
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching contact info', error: error.message });
  }
};

// @route   PUT /api/contact
// @access  Private (Admin only)
const updateContact = async (req, res) => {
  try {
    const { email, phone, linkedin, github, otherLinks } = req.body;

    let contact = await Contact.findOne();
    if (!contact) {
      contact = new Contact({});
    }

    if (email !== undefined) contact.email = email.trim();
    if (phone !== undefined) contact.phone = phone.trim();
    if (linkedin !== undefined) contact.linkedin = linkedin.trim();
    if (github !== undefined) contact.github = github.trim();
    if (otherLinks !== undefined) {
      // Expecting array of { label, url }
      contact.otherLinks = Array.isArray(otherLinks)
        ? otherLinks.filter((l) => l && l.url && l.url.trim())
        : [];
    }

    await contact.save();

    res.status(200).json({ message: 'Contact information updated successfully', contact });
  } catch (error) {
    res.status(500).json({ message: 'Server error while updating contact info', error: error.message });
  }
};

module.exports = { getContact, updateContact };
