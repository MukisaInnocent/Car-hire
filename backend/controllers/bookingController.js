const bookingModel = require('../models/Booking');
const { sendBookingConfirmation, sendAdminNotification } = require('../config/email');
const { v4: uuidv4 } = require('uuid');

const bookingController = {
  create: async (req, res) => {
    try {
      const { customer_name, phone, email, pickup_location, dropoff_location, pickup_date, return_date, vehicle_type, service_type, special_requests } = req.body;

      if (!customer_name || !phone || !pickup_location || !pickup_date) {
        return res.status(400).json({ error: 'Name, phone, pickup location, and pickup date are required' });
      }

      const booking_ref = 'AYD-' + uuidv4().substring(0, 8).toUpperCase();

      const booking = await bookingModel.create({
        booking_ref,
        customer_name,
        phone,
        email,
        pickup_location,
        dropoff_location,
        pickup_date,
        return_date,
        vehicle_type,
        service_type,
        special_requests,
      });

      // Send emails (non-blocking)
      if (email) {
        sendBookingConfirmation(booking).catch(console.error);
      }
      sendAdminNotification(booking).catch(console.error);

      res.status(201).json({ message: 'Booking created successfully', booking });
    } catch (error) {
      console.error('Create booking error:', error);
      res.status(500).json({ error: 'Failed to create booking' });
    }
  },

  getAll: async (req, res) => {
    try {
      const bookings = await bookingModel.getAll();
      res.json(bookings);
    } catch (error) {
      console.error('Get bookings error:', error);
      res.status(500).json({ error: 'Failed to fetch bookings' });
    }
  },

  updateStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!['pending', 'confirmed', 'completed', 'cancelled'].includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
      }

      const booking = await bookingModel.updateStatus(id, status);
      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
      }

      res.json(booking);
    } catch (error) {
      console.error('Update booking error:', error);
      res.status(500).json({ error: 'Failed to update booking' });
    }
  },
};

module.exports = bookingController;
