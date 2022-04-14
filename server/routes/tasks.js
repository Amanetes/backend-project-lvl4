// @ts-check

import i18next from 'i18next';
import _ from 'lodash';

export default (app) => {
  app
    .get('/tasks', { name: 'tasks#index' }, async (req, reply) => {
      const {
        status, executor, label, isCreatorUser,
      } = req.query;

      const tasksQuery = app.objection.models.task.query()
        .withGraphJoined('[status, creator, executor, labels]');

      if (status) {
        tasksQuery.modify('filterByStatus', status);
      }
      if (executor) {
        tasksQuery.modify('filterByExecutor', executor);
      }
      if (label) {
        tasksQuery.modify('fileteByLabel', label);
      }
      if (isCreatorUser) {
        tasksQuery.modify('filterByCreator', req.user.id);
      }

      const [statuses, executors, labels, tasks] = await Promise.all([
        app.objection.models.taskStatus.query(),
        app.objection.models.user.query(),
        app.objection.models.label.query(),
        tasksQuery,
      ]);

      reply.render('tasks/index', {
        statuses, executors, labels, tasks, filter: req.query,
      });
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
