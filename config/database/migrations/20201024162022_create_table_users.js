
exports.up = (knex) => {
  return knex.schema.createTable('users', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'))
    table.text('first_name').notNullable()
    table.text('last_name').notNullable()
    table.text('email').unique().notNullable()
    table.text('password').notNullable()
    table.enu('role', ['ADMIN', 'USER']).notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  });
};

exports.down = (knex) => {
    return knex.schema.dropTable('users')
};
