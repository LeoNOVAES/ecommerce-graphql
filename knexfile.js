// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database:'aziza',
      user:'root',
      password:'root'
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/config/database/migrations`
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/config/database/migrations`
    }
  }

};
