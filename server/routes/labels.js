// @ts-check

import i18next from 'i18next';

export default (app) => {
  app
    .get('/labels', { name: 'labels#index', preValidation: app.authenticate }, async (req, reply) => {
      const labels = await app.objection.models.label.query();
      reply.render('labels/index', { labels });
      return reply;
    })
    .get('/labels/new', { name: 'labels#new', preValidation: app.authenticate }, async (req, reply) => {
      const label = await app.objection.models.label();
      reply.render('labels/new', { label });
    });
};
