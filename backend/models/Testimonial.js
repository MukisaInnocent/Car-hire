const pool = require('../config/db');

const testimonialModel = {
  getAll: async (visibleOnly = false) => {
    const query = visibleOnly
      ? 'SELECT * FROM testimonials WHERE is_visible = TRUE ORDER BY created_at DESC'
      : 'SELECT * FROM testimonials ORDER BY created_at DESC';
    const result = await pool.query(query);
    return result.rows;
  },

  create: async (testimonial) => {
    const { customer_name, rating, comment } = testimonial;
    const result = await pool.query(
      'INSERT INTO testimonials (customer_name, rating, comment) VALUES ($1, $2, $3) RETURNING *',
      [customer_name, rating, comment]
    );
    return result.rows[0];
  },

  toggleVisibility: async (id) => {
    const result = await pool.query(
      'UPDATE testimonials SET is_visible = NOT is_visible WHERE id = $1 RETURNING *',
      [id]
    );
    return result.rows[0];
  },

  delete: async (id) => {
    await pool.query('DELETE FROM testimonials WHERE id = $1', [id]);
  },
};

module.exports = testimonialModel;
