const express = require('express');

const router = express.Router();
const path = require('path');

const booksRouter = require('./books-mongodb');
const authorsRouter = require('./authors-mongodb');
const publishersRouter = require('./publishers-mongodb');
const genresRouter = require('./genres-mongodb');

router.use('/', express.static(path.join(__dirname, '../../public/mongodb.html')));

router.use('/books', booksRouter);
router.use('/authors', authorsRouter);
router.use('/publishers', publishersRouter);
router.use('/genres', genresRouter);

module.exports = router;
