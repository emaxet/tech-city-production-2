exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('events').del()
    .then(function () {
      // Inserts seed entries
      return knex('events').insert([
        {
          'creator_id': 1,
          "type_id": 1,
          'city_id': 1,
          'title': 'OpenLate - Vancouver Tech Talks and Hack Nights',
          'description': 'OpenLate provides tech talks and hack nights at the OpenDNS office in downtown Vancouver. Events generally run from 6:30 PM to 9:30 PM every other Wednesday at 675 West Hastings St, Suite 500.',
          'image': '',
          'keyword': 'js',
          'start_date': '2017/10/06',
          'end_date': '2017/10/07',
          'start_time': '9:00am',
          'end_time': '9:00pm'
        },
        {
          'creator_id': 1,
          "type_id": 1,
          'city_id': 1,
          'title': 'OpenLate2',
          'description': 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.',
          'image': '',
          'keyword': 'js',
          'start_date': '2017/11/06',
          'end_date': '2017/11/07',
          'start_time': '7:00am',
          'end_time': '4:00pm'
        },
        {
          'creator_id': 1,
          "type_id": 1,
          'city_id': 1,
          'title': 'OpenLate3',
          'description': 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb.',
          'image': '',
          'keyword': 'js',
          'start_date': '2017/10/06',
          'end_date': '2017/10/06',
          'start_time': '10:00am',
          'end_time': '2:00pm'
        }
      ]);
    });
};