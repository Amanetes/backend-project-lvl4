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
        tasksQuery.modify('filterByLabel', label);
      }
      if (isCreatorUser) {
        tasksQuery.modify('filterByCreator', req.user.id);
      }

      const [taskStatuses, users, labels, tasks] = await Promise.all([
        app.objection.models.taskStatus.query(),
        app.objection.models.user.query(),
        app.objection.models.label.query(),
        tasksQuery,
      ]);

      reply.render('tasks/index', {
        taskStatuses, users, labels, tasks, filterOpts: req.query,
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
      const task = await app.objection.models.task
        .query()
        .findById(req.params.id)
        .withGraphJoined('[status, creator, executor, labels]');

      reply.render('tasks/view', { task });
      return reply;
    })
    .get('/tasks/:id/edit', { name: 'tasks#edit', preValidation: app.authenticate }, async (req, reply) => {
      const task = await app.objection.models.task
        .query()
        .findById(req.params.id)
        .withGraphJoined('[status, creator, executor, labels]');

      const [taskStatuses, users, labels] = await Promise.all([
        app.objection.models.taskStatus.query(),
        app.objection.models.user.query(),
        app.objection.models.label.query(),
      ]);

      reply.render('tasks/edit', {
        task, taskStatuses, labels, users,
      });
    })
    .post('/tasks', { name: 'tasks#create', preValidation: app.authenticate }, async (req, reply) => {
      const labelIds = [_.get(req.body.data, 'labels', [])].flat();
      const currentLabels = await app.objection.models.label.query().findByIds(labelIds);
      const task = new app.objection.models.task();

      const taskData = {
        name: req.body.data.name,
        description: req.body.data.description,
        creatorId: req.user.id,
        statusId: Number(req.body.data.statusId),
        executorId: !req.body.data.executorId ? null : Number(req.body.data.executorId),
        labels: currentLabels,
      };

      try {
        await app.objection.models.task.transaction(async (trx) => {
          const inputTask = await app.objection.models.task.query(trx)
            .insertGraph(taskData, { relate: true });
          return inputTask;
        });

        req.flash('info', i18next.t('flash.tasks.create.success'));
        reply.redirect(app.reverse('tasks#index'));
      } catch ({ data }) {
        const [taskStatuses, users, labels] = await Promise.all([
          app.objection.models.taskStatus.query(),
          app.objection.models.user.query(),
          app.objection.models.label.query(),
        ]);

        req.flash('error', i18next.t('flash.tasks.create.error'));
        task.$set(req.body.data);
        reply.render('tasks/new', {
          task, errors: data, taskStatuses, users, labels,
        });
      }
      return reply;
    })
    .patch('/tasks/:id', { name: 'tasks#update', preValidation: app.authenticate }, async (req, reply) => {

      return reply;
    })
    .delete('/tasks/:id', { name: 'tasks#destroy', preValidation: app.authenticate }, async (req, reply) => {
      const task = await app.objection.models.task
        .query()
        .findById(req.params.id);

      if (task.creatorId !== req.user.id) {
        req.flash('error', i18next.t('flash.tasks.delete.failure'));
        return reply.redirect(app.reverse('tasks#index'));
      }

      try {
        await app.objection.models.task.transaction(async (trx) => {
          await task.$relatedQuery('labels', trx).unrelate();
          await task.$query(trx).delete();
        });

        req.flash('info', i18next.t('flash.tasks.delete.success'));
        return reply.redirect(app.reverse('tasks#index'));
      } catch ({ data }) {
        req.flash('error', i18next.t('flash.tasks.delete.error'));
        return reply.redirect(app.reverse('tasks#index'));
      }
    });
};
