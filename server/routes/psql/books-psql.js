const express = require('express');
const pool = require('../../db-psql');

const router = express.Router();

router.get('/:id', async (req, res) => {
  const client = await pool.connect();
  try {
    const { rows } = await client.query('SELECT * FROM book WHERE book_id= $1', [req.params.id]);
    res.json(rows);
  } catch (err) {
    console.log(err);
  } finally {
    client.release();
  }
});

router.get('/', async (req, res) => {
  const client = await pool.connect();
  try {
    const { rows } = await client.query("SELECT book.*,array_agg(concat(author.first_name,' ',author.last_name,' (', author.role,')')) AS full_name FROM book LEFT JOIN author_book USING(book_id) LEFT JOIN author USING(author_id) GROUP BY book.book_id");
    res.json(rows);
  } catch (err) {
    console.log(err);
  } finally {
    client.release();
  }
});

module.exports = router;
