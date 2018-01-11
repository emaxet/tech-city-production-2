
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('jobs', (table) => {
      table.string('company');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('jobs', (table) => {
      table.dropColumn('company');
    })
  ]);
};
