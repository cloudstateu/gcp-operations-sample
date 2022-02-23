module.exports = (app) => {
  app.get(`/`, (_, res) => {
    res.json({ status: 'ok', data: process.env });
    c;
  });

  return app;
};
