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
  let languageQuery = { $or: [] };
  let genreQuery = { $or: [] };

  if (req.query.languages.split(',').length > 1) {
    req.query.languages.split(',').forEach((value) => {
      languageQuery.$or.push({ language: value });
    });
  } else if (!!req.query.languages) {
    languageQuery = { language: req.query.languages };
  } else {
    languageQuery = { language: /.*.*/ };
  }

  if (req.query.genres.split(',').length > 1) {
    req.query.genres.split(',').forEach((value) => {
      genreQuery.$or.push({ genres: value });
    });
  } else if (!!req.query.genres) {
    genreQuery = { genres: req.query.genres };
  } else {
    genreQuery = { genres: /.*.*/ };
  }

  query.$and.push(genreQuery);
  query.$and.push(languageQuery);
  switch (req.query.field) {
    case 'Title':
      query.$and.push({ bookTitle: new RegExp(`.*${req.query.contains}.*`, 'i') });
      break;
    case 'Author':
      query.$and.push({ authors: new RegExp(`.*${req.query.contains}.*`, 'i') });
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
