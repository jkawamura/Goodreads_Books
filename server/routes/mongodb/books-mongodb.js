const express = require('express');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
  const data = { message: `${req.query.contains}` };
  res.json(data);
});

router.get('/:id', (req, res) => {

});

module.exports = router;
