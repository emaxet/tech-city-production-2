exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('events', (table) => {
      table.dropColumn('like');
    }),
    knex.schema.table('events', (table) => {
      table.specificType('like', 'text[]');
      table.specificType('attend', 'text[]');
    }),
    knex.schema.table('jobs', (table) => {
      table.specificType('like', 'text[]');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('events', (table) => {
      table.dropColumn('like');
      table.dropColumn('attend');
    }),
    knex.schema.table('jobs', (table) => {
      table.dropColumn('like');
    })
  ]);
};
