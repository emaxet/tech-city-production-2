
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('jobs', (table) => {
      table.integer('user_id');
    }),
    knex.schema.table('jobs', (table) => {
      table.dropColumn('company_id');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('jobs', (table) => {
      table.dropColumn('user_id');
    }),
    knex.schema.table('jobs', (table) => {
      table.integer('company_id');
    })
  ])
};
