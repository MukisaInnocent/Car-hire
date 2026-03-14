const pool = require('../config/db');

const vehicleModel = {
  getAll: async () => {
    const result = await pool.query('SELECT * FROM vehicles ORDER BY created_at DESC');
    return result.rows;
  },

  getById: async (id) => {
    const result = await pool.query('SELECT * FROM vehicles WHERE id = $1', [id]);
    return result.rows[0];
  },

  create: async (vehicle) => {
    const { name, slug, image_url, seating_capacity, fuel_type, transmission, price_per_day, description, vehicle_type } = vehicle;
    const result = await pool.query(
      `INSERT INTO vehicles (name, slug, image_url, seating_capacity, fuel_type, transmission, price_per_day, description, vehicle_type)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [name, slug, image_url, seating_capacity, fuel_type, transmission, price_per_day, description, vehicle_type]
    );
    return result.rows[0];
  },

  update: async (id, vehicle) => {
    const { name, image_url, seating_capacity, fuel_type, transmission, price_per_day, description, vehicle_type, is_available } = vehicle;
    const result = await pool.query(
      `UPDATE vehicles SET name=$1, image_url=$2, seating_capacity=$3, fuel_type=$4, transmission=$5, 
       price_per_day=$6, description=$7, vehicle_type=$8, is_available=$9 WHERE id=$10 RETURNING *`,
      [name, image_url, seating_capacity, fuel_type, transmission, price_per_day, description, vehicle_type, is_available, id]
    );
    return result.rows[0];
  },

  delete: async (id) => {
    await pool.query('DELETE FROM vehicles WHERE id = $1', [id]);
  },
};

module.exports = vehicleModel;
