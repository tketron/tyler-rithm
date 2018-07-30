const db = require('../db');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const results = await db.query(
      'SELECT p.id, p.title, p.body, c.id AS comment_id, c.text AS comment_text FROM posts p FULL JOIN comments c on c.post_id = p.id'
    );
    var resultsObj = {};
    results.rows.forEach(p => {
      if (resultsObj[p.id]) {
        resultsObj[p.id].comments.push({
          id: p.comment_id,
          text: p.comment_text
        });
      } else {
        resultsObj[p.id] = {
          id: p.id,
          title: p.title,
          body: p.body,
          comments: []
        };
        if (p.comment_text) {
          resultsObj[p.id].comments.push({
            id: p.comment_id,
            text: p.comment_text
          });
        }
      }
    });
    return res.status(200).json(Object.values(resultsObj));
  } catch (e) {
    return next(e);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const results = await db.query(
      'INSERT INTO posts (title,body) VALUES ($1,$2) RETURNING *',
      [req.body.title, req.body.body]
    );
    results.rows[0].comments = [];
    return res.status(201).json(results.rows[0]);
  } catch (e) {
    return next(e);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const results = await db.query(
      'UPDATE posts SET title=$1,body=$2 WHERE id=$3 RETURNING *',
      [req.body.title, req.body.body, req.params.id]
    );
    return res.status(200).json(results.rows[0]);
  } catch (e) {
    return next(e);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const results = await db.query('DELETE FROM posts WHERE id=$1', [
      req.params.id
    ]);
    return res.status(200).json({ message: 'Post deleted' });
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
