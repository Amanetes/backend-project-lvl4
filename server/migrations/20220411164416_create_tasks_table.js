// @ts-check

export const up = (knex) => (
    knex.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table.string('name');
      table.string('description');
      table
      .integer('status_id')
      .unsigned()
      .index()
      .references('statuses.id');
      table
      .integer('author_id')
      .unsigned()
      .index()
      .references('users.id');
      table
      .integer('performer_id')
      .unsigned()
      .index()
      .references('user.id');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
  );
  
  export const down = (knex) => knex.schema.dropTable('statuses');