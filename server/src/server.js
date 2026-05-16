require('dotenv').config();

const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

/**
 * Boot sequence: connect to MongoDB, then start the HTTP server.
 */
const startServer = async () => {
  await connectDB();

  const server = app.listen(PORT, () => {
    console.log(`🚀  Aion AI API listening on http://localhost:${PORT}`);
    console.log(`🌐  Environment: ${process.env.NODE_ENV || 'development'}`);
  });

  // Fail fast and loud on unhandled rejections.
  process.on('unhandledRejection', (reason) => {
    console.error('💥  Unhandled rejection:', reason);
    server.close(() => process.exit(1));
  });
};

startServer();
