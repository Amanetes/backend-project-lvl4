// @ts-check

import i18next from 'i18next';

export default (app) => {
  app
    .get('/statuses', { name: 'statuses#index', preValidation: app.authenticate }, async (req, reply) => {
      const statuses = await app.objection.models.status.query();
      reply.render('statuses/index', { statuses });
      return reply;
    })
    .get('/statuses/new', { name: 'statuses#new', preValidation: app.authenticate }, async (req, reply) => {
      const status = await app.objection.models.status();
      reply.render('statuses/new', { status });
    });
};
