const express = require('express');
const pool = require('../../db-psql');

const router = express.Router();

router.get('/:id', async (req, res) => {
  const client = await pool.connect();
  try {
    const { rows } = await client.query('SELECT * FROM publisher WHERE publisher_id= $1', [req.params.id]);
    res.send(rows);
  } catch (err) {
    console.log(err);
  } finally {
    client.release();
  }
});

router.get('/', async (req, res) => {
  const client = await pool.connect();
  try {
    const { rows } = await client.query('SELECT * FROM publisher');
    res.send(rows);
  } catch (err) {
    console.log(err);
  } finally {
    client.release();
  }
});

module.exports = router;
