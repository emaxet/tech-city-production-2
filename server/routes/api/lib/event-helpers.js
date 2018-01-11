module.exports = {

  findEventsInCity: (knex, cityName, cb) => {
    knex('cities')
      .join('events', 'events.city_id', 'cities.id')
      .join('users', 'events.creator_id', 'users.id')
      .select('users.username', 'events.title', 'events.description', 'events.image', 'events.keyword', 'events.start_date', 'events.end_date', 'events.start_time', 'events.end_time', 'events.location', 'cities.name', 'cities.id', 'events.id as eventId', 'users.id as userId', 'like', 'attend')
      .where({ 'cities.name': cityName})
      .orderBy('events.created_at')
      .then(cb);
  },

  updateEventsInCity: (knex, req, cb) => {
    knex('events')
      .where({'events.id': req.params.event_id})
      .then((data) => {
        knex('events')
          .where({'events.id': data[0].id})
          .update({
            'type_id': req.body.type_id,
            'city_id': data[0].city_id,
            'title': req.body.title,
            'description': req.body.description,
            'image': req.body.image,
            'keyword': req.body.keyword,
            'start_date': req.body.start_date,
            'end_date': req.body.end_date,
            'start_time': req.body.start_time,
            'end_time': req.body.end_time,
            'location': req.body.location
          })
          .then(cb);
      });
  },

  deleteEvent: (knex, eventId, cb) => {
    knex('events')
      .where({'events.id': eventId})
      .del()
      .then(cb);
  },

  findEventsFromSearchQuery: (knex, req, cb) => {
    const query = req.params.query;
    knex('events')
      .join('cities', 'events.city_id', 'cities.id')
      .where(function() {
        this.where('events.title', 'ilike', `%${query}%`)
          .orWhere('events.description', 'ilike', `%${query}%`)
          .orWhere('events.keyword', 'ilike', `%${query}%`)
      })
      .andWhere({'cities.name': req.params.city_name})
      .select('events.type_id', 'events.city_id', 'events.title', 'events.description', 'events.image', 'events.keyword', 'events.start_date', 'events.end_date', 'events.start_time', 'events.end_time', 'events.location')
      .then(cb);
  }
};