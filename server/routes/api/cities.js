const express = require('express');
const cities = express.Router();
const cityHelpers = require('./lib/city-helpers');

module.exports = (knex) => {

  	cities.get('/cities', (req, res) => {

	    cityHelpers.findAllCities(knex, (cities) => {
	    	const cityData = [];

	    	function pause(time){
  				return new Promise(resolve => setTimeout(() => resolve(), time));
			}

			async function fetchCities() {
				for (let i = 0; i < cities.length; i++) {
					await pause(75);
		    		cityHelpers.findCityData(knex, cities[i], (data) => {
				    	cityData.push(data);
				    	if (i === cities.length - 1) {
				    		return res.json(cityData);
				    	}
		    		});
	    		}
			}

			fetchCities();
	    });
  	});

  return cities;

}