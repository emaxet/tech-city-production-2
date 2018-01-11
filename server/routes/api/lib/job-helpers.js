module.exports = {

  findJobsInCity: (knex, cityName, cb) => {
    knex('cities')
      .join('jobs', 'jobs.city_id', 'cities.id')
      .join('users', 'jobs.user_id', 'users.id')
      .select('users.username', 'jobs.title', 'jobs.description', 'jobs.url', 'jobs.company', 'jobs.id', 'users.id as userId', 'like')
      .where({ 'cities.name': cityName})
      .orderBy('jobs.created_at')
      .then(cb);
  },

  deleteJob: (knex, jobId, cb) => {
    knex('jobs')
      .where({'jobs.id': jobId})
      .del()
      .then(cb);
  },

  findJobsFromSearchQuery: (knex, req, cb) => {
    const query = req.params.query;
    knex('jobs')
      .join('cities', 'jobs.city_id', 'cities.id')
      .where(function() {
        this.where('jobs.title', 'ilike', `%${query}%`)
          .orWhere('jobs.description', 'ilike', `%${query}%`)
          .orWhere('jobs.company', 'ilike', `%${query}%`);
      })
      .andWhere({'cities.name': req.params.city_name})
      .select('jobs.title', 'jobs.description', 'jobs.url', 'jobs.company')
      .then(cb);
  }
};