/* eslint-disable no-extra-boolean-cast */
const express = require('express');
const pool = require('../../db-psql');

const router = express.Router();

const runQuery = async (req, res, query, params) => {
  const client = await pool.connect();
  try {
    const { rows } = await client.query(query, params);
    res.json(rows);
  } catch (err) {
    console.log(err);
  } finally {
    client.release();
  }
};

router.get('/top100', async (req, res) => {
  const query = "SELECT book.*, publisher.publisher_name, array_agg(DISTINCT concat(author.author_id, ',', author.first_name, ',', author.last_name, ',', author.role)) as author, array_agg(DISTINCT(genre.genre)) as genres FROM book LEFT JOIN author_book USING(book_id) LEFT JOIN author USING(author_id) LEFT JOIN publisher USING(publisher_id) LEFT JOIN genre_book USING(book_id) LEFT JOIN genre USING(genre_id) GROUP BY book.book_id, book.title, book.series, book.language, book.description, book.isbn, book.book_format, book.pages, book.publish_date, book.cover_image, publisher.publisher_name, book.rating, book.number_ratings, book.edition ORDER BY book.number_ratings DESC LIMIT 100";

  runQuery(req, res, query, []);
});

router.get('/languages', async (req, res) => {
  const query = 'SELECT DISTINCT(book.language) from book';

  runQuery(req, res, query, []);
});

router.get('/:id', async (req, res) => {
  const query = "SELECT book.*, publisher.publisher_name, array_agg(DISTINCT concat(author.author_id, ',', author.first_name, ',', author.last_name, ',', author.role)) as author, array_agg(DISTINCT(genre.genre)) as genres FROM book LEFT JOIN author_book USING(book_id) LEFT JOIN author USING(author_id) LEFT JOIN publisher USING(publisher_id) LEFT JOIN genre_book USING(book_id) LEFT JOIN genre USING(genre_id) WHERE book.book_id=$1 GROUP BY book.book_id, book.title, book.series, book.language, book.description, book.isbn, book.book_format, book.pages, book.publish_date, book.cover_image, publisher.publisher_name, book.rating, book.number_ratings, book.edition";

  runQuery(req, res, query, [req.params.id]);
});

router.get('/', async (req, res) => {
  let queryFirst = "SELECT book.*, publisher.publisher_name, array_agg(DISTINCT concat(author.author_id, ',', author.first_name, ',', author.last_name, ',', author.role)) as author, array_agg(DISTINCT(genre.genre)) as genres FROM book LEFT JOIN author_book USING(book_id) LEFT JOIN author USING(author_id) LEFT JOIN publisher USING(publisher_id) LEFT JOIN genre_book USING(book_id) LEFT JOIN genre USING(genre_id) ";

  const queryGroupBy = ' GROUP BY book.book_id, book.title, book.series, book.language, book.description, book.isbn, book.book_format, book.pages, book.publish_date, book.cover_image, publisher.publisher_name, book.rating, book.number_ratings, book.edition ORDER BY book.number_ratings DESC';

  switch (req.query.field) {
    case 'Title':
      queryFirst += 'WHERE LOWER(book.title) LIKE $1';
      break;
    case 'Author':
      queryFirst += "WHERE (LOWER(REPLACE(CONCAT(author.first_name, author.last_name), ' ', '')) LIKE $1 AND LOWER(author.role) LIKE '%author%')";
      break;
    case 'Description':
      queryFirst += 'WHERE LOWER(book.description) LIKE $1';
      break;
    default:
      console.log('no valid field');
  }

  let valueCount = 1;
  const genreArr = [];
  const languageArr = [];

  if (parseInt(req.query.genres, 10)) {
    queryFirst += ' AND (';
    req.query.genres.split(',').forEach((value, i) => {
      genreArr.push(value);
      valueCount += 1;
      if (i === 0) {
        queryFirst += `genre.genre_id=$${valueCount}`;
      } else {
        queryFirst += ` OR genre.genre_id=$${valueCount}`;
      }
    });
    queryFirst += ')';
  }

  if (!!req.query.languages) {
    queryFirst += ' AND (';
    req.query.languages.split(',').forEach((value, i) => {
      languageArr.push(value);
      valueCount += 1;
      if (i === 0) {
        queryFirst += `book.language=$${valueCount}`;
      } else {
        queryFirst += ` OR book.language=$${valueCount}`;
      }
    });
    queryFirst += ')';
  }

  const query = queryFirst + queryGroupBy;

  runQuery(req, res, query, [`%${req.query.contains.replace(' ', '').toLowerCase()}%`, ...genreArr, ...languageArr]);
});

module.exports = router;
