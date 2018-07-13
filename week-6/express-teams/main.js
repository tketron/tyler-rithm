const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const teamRoutes = require('./routes/teams');
const playerRoutes = require('./routes/players');
const skillsRoutes = require('./routes/skills');

const app = express();

// Mount middleware
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

// Mount routes
app.use('/teams', teamRoutes);
app.use('/teams/:team_id/players', playerRoutes);
app.use('/skills', skillsRoutes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  return next(err); // pass the error to the next piece of middleware
});

/* 
  error handler - for a handler with four parameters, 
  the first is assumed to be an error passed by another
  handler's "next"
 */
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  return res.json({
    message: err.message,
    /*
     if we're in development mode, include stack trace (full error object)
     otherwise, it's an empty object so the user doesn't see all of that
    */
    error: app.get('env') === 'development' ? err : {}
  });
});

// Start server
app.listen(3000, () => {
  console.log('server starting on port 3000');
});
