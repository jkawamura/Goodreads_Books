const express = require('express');
const client = require('../../db-mongodb');

const router = express.Router();

/* GET users listing. */
router.get('/', async (req, res) => {
  const db = await client.connect();
  try {
    const rows = await client.db.books.find().count();
    res.send(rows);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
});

module.exports = router;
