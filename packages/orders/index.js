const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));

app.get('/', (_, res) => {
  res.json({ status: 'ok', data: null });
});

app.use((err, _req, res, _next) => {
  console.log('Handling uncaught error');
  console.error(err.stack);
  res.status(500).json({ status: 'fail', error: err.message });
});

app.listen(8080, () => console.log('Application is listenning at port 8080...'));
