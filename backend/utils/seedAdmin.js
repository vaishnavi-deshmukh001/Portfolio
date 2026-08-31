// Run this once with: npm run seed
// Creates the default admin account using credentials from .env
// Safe to run multiple times - it will not create duplicate admins.

require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('../models/Admin');

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding...');

    const existingAdmin = await Admin.findOne({
      username: process.env.ADMIN_DEFAULT_USERNAME,
    });

    if (existingAdmin) {
      console.log(
        `Admin account "${process.env.ADMIN_DEFAULT_USERNAME}" already exists. Skipping seed.`
      );
    } else {
      const admin = await Admin.create({
        username: process.env.ADMIN_DEFAULT_USERNAME,
        password: process.env.ADMIN_DEFAULT_PASSWORD, // hashed automatically by pre-save hook
      });
      console.log(`Admin account created successfully: ${admin.username}`);
      console.log(`Default password: ${process.env.ADMIN_DEFAULT_PASSWORD}`);
      console.log('IMPORTANT: Please log in and change this password immediately.');
    }

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin account:', error.message);
    process.exit(1);
  }
};

seedAdmin();
