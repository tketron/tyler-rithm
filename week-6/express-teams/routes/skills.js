const express = require('express');
const router = express.Router();
const db = require('../db/index');

router.get('', async (req, res, next) => {
  // Get all skills
  try {
    const data = await db.query('SELECT * FROM skills');
    return res.json(data.rows);
  } catch (err) {
    return next(err);
  }
});

router.post('', async (req, res, next) => {
  // Add a skill
  try {
    const data = await db.query(
      'INSERT INTO skills (title) VALUES ($1) RETURNING *',
      [req.body.title]
    );
    return res.json(data.rows[0]);
  } catch (err) {
    return next(err);
  }
});

router.patch('/:id', async (req, res, next) => {
  // Update a skill
  try {
    const data = await db.query(
      'UPDATE skills SET title = $1 WHERE id = $2 RETURNING *',
      [req.body.title, req.params.id]
    );
    return res.json(data.rows[0]);
  } catch (err) {
    return next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  // Delete a skill
  try {
    await db.query('DELETE FROM skills WHERE id = $1', [req.params.id]);
    return res.json({ message: 'deleted' });
  } catch (err) {
    return next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  // See all the players with a skill
  try {
    const skillData = await db.query('SELECT * FROM skills WHERE id = $1', [
      req.params.id
    ]);
    const playerNames = await db.query(
      `SELECT p.name FROM players p
      JOIN players_skills ps ON p.id = ps.player_id
      JOIN skills s ON ps.skill_id = s.id
      WHERE s.id = $1`,
      [req.params.id]
    );
    skillData.rows[0].players = playerNames.rows.map(obj => obj.name);
    return res.json(skillData.rows[0]);
  } catch (err) {
    return next(err);
  }
  // const data =
});

module.exports = router;
