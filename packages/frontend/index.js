if (process.env.NODE_ENV === 'production') {
  require('@google-cloud/trace-agent').start();
}

const express = require('express');
const lb = require('@google-cloud/logging-bunyan');
const axios = require('axios');

async function startServer() {
  const { _logger, mw } = await lb.express.middleware({
    logName: 'frontend'
  });

  const app = express();
  app.use(mw);
  app.set('view engine', 'pug');

  app.get('/', (_, res) => {
    res.render('index');
  });

  app.post('/', async (req, res, next) => {
    try {
      const response = await axios.post('https://training-ora-maciejborowy1.ey.r.appspot.com/orders/');
      const result = response.data;

      res.render('index', result);
    } catch (err) {
      next(err);
    }
  });

  app.use((err, _req, res, _next) => {
    req.log.error(err.stack);
    res.status(500).json({ status: 'fail', error: err.message });
  });

  const port = process.env.PORT || 8080;
  app.listen(port, console.log(`Application is listening on port ${port}...`));
}

startServer();
