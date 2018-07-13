const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const userRoutes = require('./routes/users');

const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/users', userRoutes);

app.listen(3000, () => {
  console.log('server starting on port 3000...');
});
