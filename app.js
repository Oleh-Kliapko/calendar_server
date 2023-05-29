const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const session = require('express-session');
// const swaggerUI = require('swagger-ui-express');
// const YAML = require('yamljs');
require('dotenv').config();

// const swaggerJSDocs = YAML.load('./api.yaml');
const { usersRouter } = require('./routes/api');
const { SECRET_KEY } = process.env;

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'; // to set the log format: 'dev' - detailed information such as HTTP method, URL, status code, response time; 'short' - more concise log format

app.use(logger(formatsLogger));
app.use(cors()); // to allow server to handle requests coming from different domains
app.use(express.json()); // to enable the server to handle JSON payloads in request bodies: automatically parsing of request body and filling the req.body property with the JSON data
app.use(express.static('public')); // to handle requests for static files, such as HTML, CSS, images, or client-side JavaScript files. Any files present in the public directory can be accessed by clients by specifying their paths relative to the / URL.

// Add the express-session middleware
app.use(
  session({
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  }),
);

// app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJSDocs));
app.use('/api/users', usersRouter);
// app.use('/api/contacts', contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, _, res, __) => {
  const { status = 500, message = 'Server error. Please try later on' } = err;
  res.status(status).json({ message });
});

module.exports = app;
