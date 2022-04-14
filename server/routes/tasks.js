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
        .withGraphJoined('[status, creator, executor, labels]')
        .orderBy('created_at', 'desc');

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

      const [statuses, users, labels, tasks] = await Promise.all([
        app.objection.models.taskStatus.query(),
        app.objection.models.user.query(),
        app.objection.models.label.query(),
        tasksQuery,
      ]);

      reply.render('tasks/index', {
        statuses, users, labels, tasks, filter: req.query,
      });
      return reply;
    })
    .get('/tasks/new', { name: 'tasks#new', preValidation: app.authenticate }, async (req, reply) => {
      const [taskStatuses, users, labels] = await Promise.all([
        app.objection.models.taskStatus.query(),
        app.objection.models.user.query(),
        app.objection.models.label.query(),
      ]);

      const task = new app.objection.models.task();

      reply.render('tasks/new', {
        task, taskStatuses, users, labels,
      });

      return reply;
    })
    .get('/tasks/:id', { name: 'task#view', preValidation: app.authenticate }, async (req, reply) => {
      const task = await app.objection.models.task.query()
        .findById(req.params.id).withGraphJoined('[status, creator, executor, labels]');

      reply.render('tasks/view', { task });
      return reply;
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
    })
    .delete('/tasks/:id', { name: 'tasks#destroy', preValidation: app.authenticate }, async (req, reply) => {
      const task = await app.objection.models.task
        .query()
        .findById(req.params.id);

      return reply;
    })
    .post(
      '/tasks',
      { name: 'tasks#create', preValidation: app.authenticate },
      async (req, reply) => {
        const { data } = req.body;

        return reply;
      },
    );
};
