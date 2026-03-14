const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/vehicles', require('./routes/vehicles'));
app.use('/api/services', require('./routes/services'));
app.use('/api/testimonials', require('./routes/testimonials'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', service: 'At Your Door Car Hiring API' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`🚗 At Your Door API running on port ${PORT}`);
});

module.exports = app;
