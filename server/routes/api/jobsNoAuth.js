const express = require('express');
const jobs = express.Router();
const jobHelpers = require('./lib/job-helpers');

module.exports = (knex) => {

  jobs.get('/:city_name/jobs', (req, res) => {
	    const cityName = req.params.city_name;
	    jobHelpers.findJobsInCity(knex, cityName, (jobs) => {
	      res.json(jobs);
	    });
  	});

  	jobs.get('/:city_name/jobs/search/:query', (req, res) => {
	    jobHelpers.findJobsFromSearchQuery(knex, req, (jobs) => {
	      res.json(jobs);
	    });
  	});


  return jobs;

};