const express = require('express');
const router = express.Router();
const db = require('../db/index');

router.get('', async (req, res, next) => {
  //Get all of the teams
  try {
    const data = await db.query('SELECT * FROM teams');
    return res.json(data.rows);
  } catch (err) {
    return next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const data = await db.query('SELECT * FROM teams WHERE id = $1', [
      req.params.id
    ]);
    const players = await db.query('SELECT * FROM players WHERE team_id = $1', [
      req.params.id
    ]);
    data.rows[0].players = players.rows;
    return res.json(data.rows[0]);
  } catch (err) {
    return next(err);
  }
});

router.post('', async (req, res, next) => {
  // Use SQL string injection, not javascript string interpolation
  try {
    const data = await db.query(
      'INSERT INTO teams (name) VALUES ($1) RETURNING *',
      [req.body.name]
    );
    return res.json(data.rows[0]);
  } catch (err) {
    return next(err);
  }
});

router.patch('/:id', async (req, res, next) => {
  // Update a team
  try {
    const data = await db.query(
      'UPDATE teams SET name = $1 WHERE id = $2 RETURNING *',
      [req.body.name, req.params.id]
    );
    return res.json(data.rows[0]);
  } catch (err) {
    return next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  // Delete a team
  try {
    await db.query('DELETE FROM teams WHERE id = $1', [req.params.id]);
    return res.json({ message: 'deleted' });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
