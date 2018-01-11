
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('events', (table) => {
      table.string('location');
    }),
    knex.schema.table('events', (table) => {
      table.string('like');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('events', (table) => {
      table.dropColumn('location');
    }),
    knex.schema.table('events', (table) => {
      table.dropColumn('like');
    })
  ]);
};
