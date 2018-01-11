
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('posts', (table) => {
    	table.dropColumn('content');
    	table.dropColumn('user_id');
    	table.string('message');
    	table.string('name');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('posts', (table) => {
    	table.dropColumn('message');
    	table.dropColumn('name');
    	table.string('content');
    	table.string('user_id');
    })
  ]);
};
