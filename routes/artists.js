const express = require('express');
const router = express.Router();
const db = require('../models');

// Get all Artists
router.get('/', function (req, res, next) {
  db.Artist.findAll()
    .then((results) => {
      res.json(results)
    })
});

// Get a Specific Artist
router.get('/:id', function (req, res, next) {
  db.Artist.findByPk(req.params.id)
    .then((results) => {
      res.json(results)
    })
})

// Add an Artist
router.post('/', function (req, res, next) {
  db.Artist.create({
    Artist_Name: req.body.name
  })
    .then((result) => {
      res.send(result);
    })
});

// Update an Artist
router.put('/:id', function (req, res, next) {
  db.Artist.update({
    Artist_Name: req.body.name
  },
  { where: { id: req.params.id }})
    .then(() => {
      db.Artist.findByPk(req.params.id)
        .then((result) => {
        res.json(result)
    })
    })
});

// Delete an Artist
router.delete('/:id', function (req, res, next) {
  db.Artist.destroy({
    where: { id: req.params.id }
  })
    .then(() => {
      db.Artist.findAll()
        .then((results) => {
        res.json(results)
    })
    })
});

module.exports = router;