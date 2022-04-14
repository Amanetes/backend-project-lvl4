// @ts-check

import i18next from 'i18next';
import _ from 'lodash';

export default (app) => {
  app
    .get('/tasks', { name: 'tasks#index' }, async (req, reply) => {
      const tasks = await
      app
        .objection
        .models
        .task
        .query();
      reply.render('tasks/index', { tasks });
      return reply;
    })
    .get('/tasks/new', { name: 'tasks#new', preValidation: app.authenticate }, async (req, reply) => {
      const task = await new app
        .objection
        .models
        .task();
      reply.render('tasks/new', { task });
    })
    .get('/tasks/:id/edit', { name: 'tasks#edit', preValidation: app.authenticate }, async (req, reply) => {
      const task = await app
        .objection
        .models
        .task
        .query()
        .findById(req.params.id);
      reply.render('tasks/edit', { task });
      return reply;
    });
};
