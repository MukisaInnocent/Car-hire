const pool = require('../config/db');

const bookingModel = {
  getAll: async () => {
    const result = await pool.query('SELECT * FROM bookings ORDER BY created_at DESC');
    return result.rows;
  },

  getById: async (id) => {
    const result = await pool.query('SELECT * FROM bookings WHERE id = $1', [id]);
    return result.rows[0];
  },

  create: async (booking) => {
    const { booking_ref, customer_name, phone, email, pickup_location, dropoff_location, pickup_date, return_date, vehicle_type, service_type, special_requests } = booking;
    const result = await pool.query(
      `INSERT INTO bookings (booking_ref, customer_name, phone, email, pickup_location, dropoff_location, pickup_date, return_date, vehicle_type, service_type, special_requests)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
      [booking_ref, customer_name, phone, email, pickup_location, dropoff_location, pickup_date, return_date, vehicle_type, service_type, special_requests]
    );
    return result.rows[0];
  },

  updateStatus: async (id, status) => {
    const result = await pool.query(
      'UPDATE bookings SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );
    return result.rows[0];
  },
};

module.exports = bookingModel;
