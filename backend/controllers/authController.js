const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');
require('dotenv').config();

const authController = {
  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
      }

      const result = await pool.query('SELECT * FROM admin_users WHERE username = $1', [username]);
      const admin = result.rows[0];

      if (!admin) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const validPassword = await bcrypt.compare(password, admin.password_hash);
      if (!validPassword) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { id: admin.id, username: admin.username, full_name: admin.full_name },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({ token, admin: { id: admin.id, username: admin.username, full_name: admin.full_name } });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  me: async (req, res) => {
    res.json({ admin: req.admin });
  },
};

module.exports = authController;
