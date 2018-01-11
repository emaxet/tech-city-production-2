
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', (table) => {
      table.dropColumn('password');
    }),
    knex.schema.table('users', (table) => {
      table.string('password');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', (table) => {
      table.dropColumn('password');
    }),
    knex.schema.table('users', (table) => {
      table.string('password', 25);
    })
  ]);
};
