const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const itemRoutes = require('./routes/items');

const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/items', itemRoutes);

app.listen(3000, () => {
  console.log('server starting');
});
