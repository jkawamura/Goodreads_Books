const express = require('express');

const router = express.Router();
const path = require('path');
const booksRouter = require('./books-psql');
const authorsRouter = require('./authors-psql');
const publishersRouter = require('./publishers-psql');
const genresRouter = require('./genres-psql');

router.use('/', express.static(path.join(__dirname, '../../public/psql.html')));

router.use('/books', booksRouter);
router.use('/authors', authorsRouter);
router.use('/publishers', publishersRouter);
router.use('/genres', genresRouter);

module.exports = router;
