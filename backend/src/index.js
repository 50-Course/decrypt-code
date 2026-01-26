import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { vaultRoutes } from './routes/vault.js';
import { healthRoutes } from './routes/health.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/vault', vaultRoutes);
app.use('/api', healthRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    error: err.message || 'Internal server error',
  });
});

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n❌ Error: Port ${PORT} is already in use.\n`);
    console.error('To fix this, you can:');
    console.error('\n1. Find and stop the process using port ' + PORT + ':');
    console.error('   netstat -ano | findstr :' + PORT);
    console.error('   taskkill /PID <PID_NUMBER> /F');
    console.error('\n2. Or use a different port by setting PORT in your .env file:');
    console.error('   PORT=4001\n');
    process.exit(1);
  } else {
    console.error('Server error:', err);
    process.exit(1);
  }
});
