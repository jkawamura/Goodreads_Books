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

module.exports = router;
