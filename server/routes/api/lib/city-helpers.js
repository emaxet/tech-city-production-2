module.exports = {



	findAllCities: (knex, cb) => {
    	knex('cities')
    	.orderBy('id', 'asc')
    	.then(cb)
  	},

 	findCityData: (knex, city, cb) => {
  		knex('cities')
  		.join('events', 'cities.id', 'events.city_id')
  		.where({'cities.id': city.id})
  		.select('events.id')
  		.then((events) => {
  			city['events'] = events.length;
  			knex('cities')
  			.join('jobs', 'cities.id', 'jobs.city_id')
  			.where({'cities.id': city.id})
  			.select('jobs.id')
  			.then((jobs) => {
  				city['jobs'] = jobs.length;
  				knex('cities')
  				.join('users_cities', 'cities.id', 'users_cities.city_id')
  				.join('users', 'users_cities.user_id', 'users.id')
  				.where({'cities.id': city.id })
  				.select('users.id')
  				.then((users) => {
  					city['users'] = users.length;
  					cb(city)	  				
  				});
  			})
  		})
 	}

}