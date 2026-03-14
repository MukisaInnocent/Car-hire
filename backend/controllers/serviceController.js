const serviceModel = require('../models/Service');

const serviceController = {
  getAll: async (req, res) => {
    try {
      const services = await serviceModel.getAll();
      res.json(services);
    } catch (error) {
      console.error('Get services error:', error);
      res.status(500).json({ error: 'Failed to fetch services' });
    }
  },

  create: async (req, res) => {
    try {
      const service = await serviceModel.create(req.body);
      res.status(201).json(service);
    } catch (error) {
      console.error('Create service error:', error);
      res.status(500).json({ error: 'Failed to create service' });
    }
  },

  update: async (req, res) => {
    try {
      const service = await serviceModel.update(req.params.id, req.body);
      if (!service) return res.status(404).json({ error: 'Service not found' });
      res.json(service);
    } catch (error) {
      console.error('Update service error:', error);
      res.status(500).json({ error: 'Failed to update service' });
    }
  },
};

module.exports = serviceController;
