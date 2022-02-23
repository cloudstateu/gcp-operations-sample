const axios = require('axios');

module.exports = (app, logger) => {
  app.get('/healthz', (_, res) => {
    res.json({ status: 'ok', data: process.env });
  });

  app.post('/', async (req, res) => {
    const orderId = req.body.data.order.id;

    logger.info({ order: { id: orderId }, req, message: 'Payment received' });

    await axios.post(`https://training-ora-maciejborowy1.ey.r.appspot.com/orders/${orderId}/status`, {
      status: 'paid'
    });

    res.sendStatus(201);
  });

  return app;
};
