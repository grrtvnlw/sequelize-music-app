const express = require('express');
const router = express.Router();
const db = require('../models');
const bcrypt = require('bcrypt');

// GET users listening
router.get('/', function (req, res, next) {
  res.render('users.ejs');
});

router.post('/', (req, res) => {
  const { username, email, password } = req.body;
  bcrypt.hash(password, 10, (err, superSecretPasswordHash) => {
    db.Users.create({
      username,
      email,
      password: superSecretPasswordHash,
    }).then((result) => {
      res.redirect('/users');
    });
  });
});

module.exports = router;