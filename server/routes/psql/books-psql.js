const express = require('express');
const pool = require('../../db-psql');

const router = express.Router();

router.get('/:id', async (req, res) => {
  const query = `SELECT book.*, publisher.publisher_name, array_agg(DISTINCT concat(author.author_id, ',', author.first_name, ',', author.last_name, ',', author.role)) as author, array_agg(DISTINCT(genre.genre)) as genres FROM book LEFT JOIN author_book USING(book_id) LEFT JOIN author USING(author_id) LEFT JOIN publisher USING(publisher_id) LEFT JOIN genre_book USING(book_id) LEFT JOIN genre USING(genre_id) WHERE book.book_id=$1
  GROUP BY book.book_id, book.title, book.series, book.language, book.description, book.isbn, book.book_format, book.pages, book.publish_date, book.cover_image, publisher.publisher_name, book.rating, book.number_ratings, book.edition`;

  const client = await pool.connect();
  try {
    const { rows } = await client.query(query, [req.params.id]);
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
    const { rows } = await client.query(`SELECT book.*, publisher.publisher_name, array_agg(DISTINCT concat(author.author_id, ',', author.first_name, ',', author.last_name, ',', author.role)) as author, array_agg(DISTINCT(genre.genre)) as genres FROM book LEFT JOIN author_book USING(book_id) LEFT JOIN author USING(author_id) LEFT JOIN publisher USING(publisher_id) LEFT JOIN genre_book USING(book_id) LEFT JOIN genre USING(genre_id)
    GROUP BY book.book_id, book.title, book.series, book.language, book.description, book.isbn, book.book_format, book.pages, book.publish_date, book.cover_image, publisher.publisher_name, book.rating, book.number_ratings, book.edition`);
    res.json(rows);
  } catch (err) {
    console.log(err);
  } finally {
    client.release();
  }
});

module.exports = router;
