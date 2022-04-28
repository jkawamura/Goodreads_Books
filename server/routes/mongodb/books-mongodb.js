/* eslint-disable no-extra-boolean-cast */
const express = require('express');
const client = require('../../db-mongodb');

const router = express.Router();

router.get('/top100', async (req, res) => {
  try {
    await client.connect();
    const result = await client.db('jkawamura').collection('books').find().sort({ numberRatings: -1 })
      .limit(100)
      .toArray();
    res.json(result);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
});

router.get('/languages', async (req, res) => {
  try {
    await client.connect();
    const result = await client.db('jkawamura').collection('books').distinct('language', { language: { $nin: ['', null] } });
    res.json(result);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
});

router.get('/:id', async (req, res) => {
  try {
    await client.connect();
    const result = await client.db('jkawamura').collection('books').findOne({ bookId: parseInt(req.params.id, 10) });
    res.json(result);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
});

router.get('/', async (req, res) => {
  const query = { $and: [] };
  let languageQuery = { language: { $in: [] } };
  let genreQuery = { genre: { $in: [] } };

  if (!!req.query.languages) {
    if (req.query.languages.split(',').length > 1) {
      req.query.languages.split(',').forEach((value) => {
        languageQuery.language.$in.push(value);
      });
    } else {
      languageQuery = { language: req.query.languages };
    }
  } else {
    languageQuery = { language: /.*.*/ };
  }

  if (!!req.query.genres) {
    if (req.query.genres.split(',').length > 1) {
      req.query.genres.split(',').forEach((value) => {
        genreQuery.genre.$in.push(value);
      });
    } else {
      genreQuery = { genres: req.query.genres };
    }
  } else {
    genreQuery = { genres: /.*.*/ };
  }

  query.$and.push(genreQuery);
  query.$and.push(languageQuery);
  query.$and.push({ rating: { $gte: parseInt(req.query.rating.split(',')[0], 10), $lt: parseInt(req.query.rating.split(',')[1], 10) } });
  query.$and.push({ numberRatings: { $gte: parseInt(req.query.review.split(',')[0], 10) * 1000, $lt: parseInt(req.query.review.split(',')[1], 10) * 1000 } });
  query.$and.push({ publishDate: { $gte: new Date(req.query.year.split(',')[0], 1, 1), $lt: new Date(req.query.year.split(',')[1], 12, 30) } });
  switch (req.query.field) {
    case 'Title':
      query.$and.push({ bookTitle: new RegExp(`.*${req.query.contains}.*`, 'i') });
      break;
    case 'Author':
      query.$and.push({ $expr: { $regexMatch: { input: { $concat: [{ $first: '$authors.firstName' }, { $first: '$authors.lastName' }] }, regex: `${req.query.contains}`, options: 'i' } } });
      break;
    case 'Description':
      query.$and.push({ description: new RegExp(`.*${req.query.contains}.*`, 'i') });
      break;
    default:
      console.log('no valid field');
  }

  try {
    await client.connect();
    const result = await client.db('jkawamura').collection('books').find(query).sort({ numberRatings: -1 })
      .toArray();
    res.json(result);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
});

router.use('*', (req, res) => {
  res.redirect('/top100');
});
module.exports = router;
