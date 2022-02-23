const express = require('express');
const morgan = require('morgan');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(morgan('dev'));
app.set('view engine', 'pug');

app.get('/', (_, res) => {
  res.render('index');
});

app.post('/', (_, res) => {
  const orderId = uuidv4();

  console.log(`User posted new order. OrderId: ${orderId}`);
  res.render('index', { order: { id: orderId } });
});

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Application is listening on port ${port}...`));
