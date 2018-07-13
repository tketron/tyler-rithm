const express = require('express');
const router = express.Router({ mergeParams: true });
const db = require('../db/index');

router.get('', async (req, res, next) => {
  // Get all the players on a specific team
  try {
    const data = await db.query('SELECT * FROM players WHERE team_id = $1', [
      req.params.team_id
    ]);
    return res.json(data.rows);
  } catch (err) {
    return next(err);
  }
});

router.post('', async (req, res, next) => {
  //Add a player to a specific team
  try {
    const data = await db.query(
      'INSERT INTO players (name, team_id) VALUES ($1, $2) RETURNING *',
      [req.body.name, req.params.team_id]
    );
    return res.json(data.rows[0]);
  } catch (err) {
    return next(err);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const data = db.query(
      'UPDATE players SET name = $1 WHERE id = $2 RETURNING *',
      [req.body.name, req.params.id]
    );
    return res.json(data.rows[0]);
  } catch (err) {
    return next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await db.query('DELETE FROM players WHERE id = $1', [req.params.id]);
    return res.json({ message: 'deleted' });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
