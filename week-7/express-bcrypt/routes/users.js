const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const { ensureCorrectUser, ensureLoggedIn } = require('../middleware/auth');

router.get('', async (req, res, next) => {
  // Show all users
  try {
    const userData = await db.query('SELECT id, username FROM users');
    return res.json(userData.rows);
  } catch (e) {
    return next(e);
  }
});

router.post('', async (req, res, next) => {
  // Add a new user
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const userData = await db.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING username',
      [req.body.username, hashedPassword]
    );
    return res.json(userData.rows[0]);
  } catch (e) {
    return next(e);
  }
});

router.post('/auth', async (req, res, next) => {
  try {
    // Check if the username exists in the database
    const userData = await db.query('SELECT * FROM users WHERE username=$1', [
      req.body.username
    ]);
    if (userData.rows.length > 0) {
      // If so, check if the password matches
      const match = await bcrypt.compare(
        req.body.password,
        userData.rows[0].password
      );
      if (match) {
        const token = jsonwebtoken.sign(
          {
            user_id: userData.rows[0].id,
            hello: 'World'
          },
          'SECRET_KEY'
        );
        return res.json({ token });
      } else {
        return res.json({ message: 'Invalid password!' });
      }
    } else {
      // If not, return res.json({message: Invalid username})
      return res.json({ message: 'Invalid username!' });
    }
  } catch (e) {
    return next(e);
  }
});

router.post('/secret', ensureLoggedIn, (req, res, next) => {
  return res.json({ message: 'You made it!' });
});

router.post('/protected', ensureLoggedIn, (req, res, next) => {
  return res.json({ message: 'Good job!' });
});

router.post('/secure/:id', ensureCorrectUser, (req, res, next) => {
  return res.json({ message: 'You made it!' });
});

router.post('/supersecure/:id', ensureCorrectUser, (req, res, next) => {
  return res.json({ message: 'Successfully authorized' });
});

module.exports = router;
