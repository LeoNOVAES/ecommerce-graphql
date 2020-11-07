
exports.up = (knex) => {
    return knex.schema.createTable('products', (table) => {
        table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'))
        table.text('name').notNullable()
        table.decimal('price').notNullable()
        table.text('cover').unique().notNullable()
        table.uuid('category_id').references('categories.id').notNullable()
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
    });
};

exports.down = (knex) => {
    return knex.schema.dropTable('prodcuts')
};