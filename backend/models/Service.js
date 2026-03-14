const pool = require('../config/db');

const serviceModel = {
  getAll: async () => {
    const result = await pool.query('SELECT * FROM services ORDER BY id ASC');
    return result.rows;
  },

  getById: async (id) => {
    const result = await pool.query('SELECT * FROM services WHERE id = $1', [id]);
    return result.rows[0];
  },

  create: async (service) => {
    const { title, slug, description, image_url, icon } = service;
    const result = await pool.query(
      `INSERT INTO services (title, slug, description, image_url, icon)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [title, slug, description, image_url, icon]
    );
    return result.rows[0];
  },

  update: async (id, service) => {
    const { title, description, image_url, icon } = service;
    const result = await pool.query(
      `UPDATE services SET title=$1, description=$2, image_url=$3, icon=$4 WHERE id=$5 RETURNING *`,
      [title, description, image_url, icon, id]
    );
    return result.rows[0];
  },
};

module.exports = serviceModel;
