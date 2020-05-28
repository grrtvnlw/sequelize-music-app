const express = require('express');
const router = express.Router();
const db = require('../models');
const bcrypt = require('bcrypt');

// GET users listening
router.get('/signup', function (req, res, next) {
  res.render('signup.ejs');
});

router.get('/login', function (req, res, next) {
  res.render('login.ejs');
});

router.get('/dashboard', function (req, res, next) {
  res.render('dashboard.ejs', {
    title: 'My Music Repository',
    user: req.session.user || null,
    email: req.session.user || null,
  });
});

router.post('/signup', (req, res) => {
  const { username, email, password } = req.body;
  bcrypt.hash(password, 10, (err, superSecretPasswordHash) => {
    db.Users.create({
      username,
      email,
      password: superSecretPasswordHash,
    }).then((result) => {
      res.redirect('/users/dashboard');
    });
  });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.Users.findOne({ where: { username }})
    .then(Users => {
      bcrypt.compare(password, Users.password, (err, match) => {
        if (match) {
          // res.send('Logged in!');
          req.session.user = Users;
          res.redirect('/');
        } else {
          res.send('Incorrect Password');
        };
      });
    })
    .catch(() => {
      res.send('username not found');
    });
});

module.exports = router;