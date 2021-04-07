const { Router } = require('express');
const Plant = require('../models/Plant');

module.exports = Router()
  .post('/', (req, res, next) => {
    Plant.insert(req.body)
      .then((plant) => res.send(plant))
      .catch(next);
  })

  .get('/', async (req, res, next) => {
    try {
      const plant = await Plant.find();
      res.send(plant);
    } catch (err) {
      next(err);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const plant = await Plant.getId(req.params.id);
      res.send(plant);
    } catch (err) {
      next(err);
    }
  })

  .put('/:id', async (req, res, next) => {
    try {
      const plant = await Plant.update(req.params.id, req.body);
      res.send(plant);
    } catch (err) {
      next(err);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const plant = await Plant.delete(req.params.id);
      res.send(plant);
    } catch (err) {
      next(err);
    }
  });
// Plant.get(req.body);
