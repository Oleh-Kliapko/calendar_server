const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const session = require('express-session');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
require('dotenv').config();

const swaggerJSDocs = YAML.load('./api.yaml');
const { usersRouter, reviewsRouter, tasksRouter } = require('./routes/api');
const { SECRET_KEY } = process.env;

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use(
  session({
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  }),
);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJSDocs));
app.use('/api/users', usersRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/tasks', tasksRouter);

app.use((_, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, _, res, __) => {
  const { status = 500, message = 'Server error. Please try later on' } = err;
  res.status(status).json({ message });
});

module.exports = app;
