
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {role_id: 1, first_name: 'Erik', last_name: 'Tammpere', email: 'etammpere@gmail.com', password: 'password', bio: 'I like pinecones', image: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAIAAQDGAAwAAQAAAAAAAAmrAAAAJGRhYzNmYTkzLTg3NjMtNDg5ZC05NWRjLWY3OWY0MTI2ODE4NQ.jpg', username: 'emaxet' },
        {role_id: 1, first_name: 'Denny', last_name: 'Park', email: 'denny_park@gmail.com', password: 'password', bio: 'I like acorns', image: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAIAAQDGAAwAAQAAAAAAAAmrAAAAJGRhYzNmYTkzLTg3NjMtNDg5ZC05NWRjLWY3OWY0MTI2ODE4NQ.jpg', username: 'dpark' },
        {role_id: 1, first_name: 'Ryan', last_name: 'Patterson', email: 'rpatterson@gmail.com', password: 'password', bio: 'I like pineapples', image: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAIAAQDGAAwAAQAAAAAAAAmrAAAAJGRhYzNmYTkzLTg3NjMtNDg5ZC05NWRjLWY3OWY0MTI2ODE4NQ.jpg', username: 'rbrazil' },
        {role_id: 1, first_name: 'Bhav', last_name: 'Singh', email: 'bsingh@gmail.com', password: 'password', bio: 'I like beergaritas', image: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAIAAQDGAAwAAQAAAAAAAAmrAAAAJGRhYzNmYTkzLTg3NjMtNDg5ZC05NWRjLWY3OWY0MTI2ODE4NQ.jpg', username: 'bbains' },
        {role_id: 1, first_name: 'Chance', last_name: 'Gao', email: 'gao@gmail.com', password: 'password', bio: 'I like bitcoin', image: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAIAAQDGAAwAAQAAAAAAAAmrAAAAJGRhYzNmYTkzLTg3NjMtNDg5ZC05NWRjLWY3OWY0MTI2ODE4NQ.jpg', username: 'cgao' }
      ]);
    });
};
