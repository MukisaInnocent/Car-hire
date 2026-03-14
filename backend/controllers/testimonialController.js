const testimonialModel = require('../models/Testimonial');

const testimonialController = {
  getAll: async (req, res) => {
    try {
      const visibleOnly = !req.admin;
      const testimonials = await testimonialModel.getAll(visibleOnly);
      res.json(testimonials);
    } catch (error) {
      console.error('Get testimonials error:', error);
      res.status(500).json({ error: 'Failed to fetch testimonials' });
    }
  },

  create: async (req, res) => {
    try {
      const testimonial = await testimonialModel.create(req.body);
      res.status(201).json(testimonial);
    } catch (error) {
      console.error('Create testimonial error:', error);
      res.status(500).json({ error: 'Failed to create testimonial' });
    }
  },

  toggleVisibility: async (req, res) => {
    try {
      const testimonial = await testimonialModel.toggleVisibility(req.params.id);
      if (!testimonial) return res.status(404).json({ error: 'Testimonial not found' });
      res.json(testimonial);
    } catch (error) {
      console.error('Toggle testimonial error:', error);
      res.status(500).json({ error: 'Failed to update testimonial' });
    }
  },

  delete: async (req, res) => {
    try {
      await testimonialModel.delete(req.params.id);
      res.json({ message: 'Testimonial deleted' });
    } catch (error) {
      console.error('Delete testimonial error:', error);
      res.status(500).json({ error: 'Failed to delete testimonial' });
    }
  },
};

module.exports = testimonialController;
