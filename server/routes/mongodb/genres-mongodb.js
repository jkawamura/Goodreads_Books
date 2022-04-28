const express = require('express');
const client = require('../../db-mongodb');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    await client.connect();
    const result = await client.db('jkawamura').collection('books').distinct('genres');
    res.json(result);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
});

module.exports = router;
