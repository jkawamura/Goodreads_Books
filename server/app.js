const express = require('express');
const path = require('path');

const app = express();
app.set('port', process.env.PORT || 32000);

const cors = require('cors');
const psqlRouter = require('./routes/psql/index-psql');

const mongodbRouter = require('./routes/mongodb/index-mongodb');

app.use(cors());
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/psql', psqlRouter);
app.use('/mongodb', mongodbRouter);
app.use('*', (req, res) => {
  res.redirect('/');
});

app.listen(app.get('port'), (error) => {
  if (error) throw error;
  console.log(`Server created Successfully on ${app.get('port')}`);
});

module.exports = app;
