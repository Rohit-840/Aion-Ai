/**
 * Admin seed script.
 *
 *   Run with:  npm run seed:admin   (from the /server folder)
 *
 * Reads ADMIN_NAME / ADMIN_EMAIL / ADMIN_PASSWORD from the .env file,
 * then creates (or safely updates) an admin account.
 */
require('dotenv').config();

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../src/models/User');

const run = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/aion_studio';

  const name = process.env.ADMIN_NAME || 'Admin';
  const email = (process.env.ADMIN_EMAIL || 'admin@aionstudio.com').trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD || 'Admin@12345';

  try {
    await mongoose.connect(uri);
    console.log(`✅  Connected to MongoDB (${mongoose.connection.name})`);

    const passwordHash = await bcrypt.hash(password, 12);
    const existing = await User.findOne({ email });

    if (existing) {
      // Update the existing account so it is guaranteed to be a usable admin.
      existing.name = name;
      existing.passwordHash = passwordHash;
      existing.role = 'admin';
      existing.status = 'active';
      existing.plan = 'enterprise';
      if (existing.credits < 9999) existing.credits = 9999;
      await existing.save();
      console.log('♻️   Existing account updated to admin.');
    } else {
      await User.create({
        name,
        email,
        passwordHash,
        role: 'admin',
        credits: 9999,
        plan: 'enterprise',
        status: 'active',
      });
      console.log('✨  New admin account created.');
    }

    console.log('─────────────────────────────────────');
    console.log(`👤  Admin email   : ${email}`);
    console.log('🔐  Admin password: (the ADMIN_PASSWORD value from your .env)');
    console.log('─────────────────────────────────────');
    console.log('🎉  Admin seed complete. Log in at /login and open /admin.');
  } catch (error) {
    console.error('❌  Failed to seed admin:', error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
    console.log('🔌  Database connection closed.');
  }
};

run();
