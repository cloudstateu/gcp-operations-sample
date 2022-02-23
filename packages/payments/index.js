const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));

const router = express.Router();
const routes = require('./routes')(router, {});

app.use(`/${process.env.GAE_SERVICE}`, routes);

app.use((err, _req, res, _next) => {
  console.log('Handling uncaught error');
  console.error(err.stack);
  res.status(500).json({ status: 'fail', error: err.message });
});

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Application is listening on port ${port}...`));
