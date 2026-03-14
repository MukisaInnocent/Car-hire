const vehicleModel = require('../models/Vehicle');

const vehicleController = {
  getAll: async (req, res) => {
    try {
      const vehicles = await vehicleModel.getAll();
      res.json(vehicles);
    } catch (error) {
      console.error('Get vehicles error:', error);
      res.status(500).json({ error: 'Failed to fetch vehicles' });
    }
  },

  getById: async (req, res) => {
    try {
      const vehicle = await vehicleModel.getById(req.params.id);
      if (!vehicle) return res.status(404).json({ error: 'Vehicle not found' });
      res.json(vehicle);
    } catch (error) {
      console.error('Get vehicle error:', error);
      res.status(500).json({ error: 'Failed to fetch vehicle' });
    }
  },

  create: async (req, res) => {
    try {
      const vehicle = await vehicleModel.create(req.body);
      res.status(201).json(vehicle);
    } catch (error) {
      console.error('Create vehicle error:', error);
      res.status(500).json({ error: 'Failed to create vehicle' });
    }
  },

  update: async (req, res) => {
    try {
      const vehicle = await vehicleModel.update(req.params.id, req.body);
      if (!vehicle) return res.status(404).json({ error: 'Vehicle not found' });
      res.json(vehicle);
    } catch (error) {
      console.error('Update vehicle error:', error);
      res.status(500).json({ error: 'Failed to update vehicle' });
    }
  },

  delete: async (req, res) => {
    try {
      await vehicleModel.delete(req.params.id);
      res.json({ message: 'Vehicle deleted' });
    } catch (error) {
      console.error('Delete vehicle error:', error);
      res.status(500).json({ error: 'Failed to delete vehicle' });
    }
  },
};

module.exports = vehicleController;
