// @ts-check

export const up = (knex) => (
  knex.schema.createTable('tasks_labels', (table) => {
    table.increments('id').primary();
    
    table
        .integer('task_id')
        .unsigned()
        .index()
        .references('tasks.id')
        .onDelete('CASCADE');

    table
        .integer('label_id')
        .unsigned()
        .index()
        .references('labels.id')
        .onDelete('CASCADE');
  })
);
  
export const down = (knex) => knex.schema.dropTable('tasks_labels');