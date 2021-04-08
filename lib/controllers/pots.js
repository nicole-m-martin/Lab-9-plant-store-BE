const { Router } = require('express');
const Pot = require('../models/Pot');

module.exports = Router()
  .post('/', (req, res, next) => {
    Pot.insert(req.body)
      .then((pot) => res.send(pot))
      .catch(next);
  })

  .get('/', async (req, res, next) => {
    try {
      const pot = await Pot.find();
      res.send(pot);
    } catch (err) {
      next(err);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const pot = await Pot.getId(req.params.id);
      res.send(pot);
    } catch (err) {
      next(err);
    }
  })

  .put('/:id', async (req, res, next) => {
    try {
      const pot = await Pot.update(req.params.id, req.body);
      res.send(pot);
    } catch (err) {
      next(err);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const pot = await Pot.delete(req.params.id);
      res.send(pot);
    } catch (err) {
      next(err);
    }
  });
