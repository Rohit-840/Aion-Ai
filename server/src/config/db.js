const mongoose = require('mongoose');

/**
 * Connect to MongoDB using the MONGO_URI environment variable.
 * Works with a local MongoDB instance or a MongoDB Atlas cluster.
 */
const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/aion_studio';

  try {
    mongoose.set('strictQuery', true);
    const conn = await mongoose.connect(uri);
    console.log(`✅  MongoDB connected: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    console.error(`❌  MongoDB connection failed: ${error.message}`);
    // A database is essential — exit so the process manager can restart it.
    process.exit(1);
  }
};

module.exports = connectDB;
