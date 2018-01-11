
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cities').del()
    .then(function () {
      // Inserts seed entries
      return knex('cities').insert([
        {name: 'Vancouver', image: 'https://eatmagazine.ca/wp-content/uploads/2016/05/Vancouver-Image.jpg', tagline: 'The most beautiful city on Earth'},
        {name: 'Mountain_View', image: 'http://media2.trover.com/T/56c8f9147eb4f46cfe02923a/fixedw_large_4x.jpg', tagline: 'Google lives here!' },
        {name: 'Toronto', image: 'https://media.timeout.com/images/102873865/630/472/image.jpg', tagline: 'The coldest city on Earth' },
        {name: 'Seattle', image: 'https://static.amazon.jobs/locations/66/thumbnails/seattle.jpg?1452011139', tagline: 'SEAHAWKS' },
        {name: 'San Francisco', image: 'http://www.chempartner.com/wp-content/uploads/2016/12/san-francisco-is-americas-snobbiest-city-according-to-the-rest-of-the-country.jpg', tagline: 'The Golden Gate City' },
        {name: 'New York', image: 'http://www.thompsontravelholidays.com/media/uploads/New%20York.jpg', tagline: 'The Big Apple' },
        {name: 'Berlin', image: 'https://images.pexels.com/photos/109630/pexels-photo-109630.jpeg?w=940&h=650&auto=compress&cs=tinysrgb', tagline: 'Be Berlin'},
        {name: 'London', image: 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?w=940&h=650&auto=compress&cs=tinysrgb', tagline: 'London is a modern Babylon'},
        {name: 'Seoul', image: 'https://images.pexels.com/photos/237211/pexels-photo-237211.jpeg?w=940&h=650&auto=compress&cs=tinysrgb', tagline: 'I.Seoul.U'},
        {name: 'Tokyo', image: 'https://images.pexels.com/photos/427747/pexels-photo-427747.jpeg?w=940&h=650&auto=compress&cs=tinysrgb', tagline: 'Japan. Endless Discovery'},
        {name: 'Stockholm', image: 'https://images.pexels.com/photos/208755/pexels-photo-208755.jpeg?w=940&h=650&auto=compress&cs=tinysrgb', tagline: 'Malmö: Mångfald Möten Möjligheter'},
        {name: 'Amsterdam', image: 'https://images.pexels.com/photos/600622/pexels-photo-600622.jpeg?w=940&h=650&auto=compress&cs=tinysrgb', tagline: 'Natura Artis Magistra'},
        {name: 'Shanghai', image: 'https://images.pexels.com/photos/19885/pexels-photo.jpg?w=940&h=650&auto=compress&cs=tinysrgb', tagline: 'Pearl of the orient'},
        {name: 'Barcelona', image: 'https://images.pexels.com/photos/705424/pexels-photo-705424.jpeg?w=940&h=650&auto=compress&cs=tinysrgb', tagline: 'Més que un club'},
        {name: 'Copenhagen', image: 'https://images.pexels.com/photos/416024/pexels-photo-416024.jpeg?w=940&h=650&auto=compress&cs=tinysrgb', tagline: 'Byen'}
        
      ]);
    });
};