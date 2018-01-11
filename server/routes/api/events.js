const express = require('express');
const events = express.Router();
const eventHelpers = require('./lib/event-helpers');
const jwt = require('jsonwebtoken');
const config = require('../auth/config/config');

module.exports = (knex) => {

  events.post('/:city_name/events', (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      new Promise((resolve, reject) => {
        resolve(knex('cities').select('id').where('name', req.body.cityName));
      })
        .then((data) => {
          knex('events')
            .insert({
              'creator_id': decoded.sub,
              'type_id': req.body.type_id,
              'city_id': data[0].id,
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
            .then(() => {
              res.send(200);
            });
        });
    });
  });

  events.put('/:city_name/events/:event_id', (req, res) => {
    eventHelpers.updateEventsInCity(knex, req, (newEvent) => {
      res.send(200);
    });
  });

  events.put('/:city_name/events/:event_id/like', (req, res) => {
    new Promise((resolve, reject) => {
      resolve(knex('events')
        .select('like')
        .where('id', req.params.event_id));
    })
      .then((data) => {
        if(data[0].like === null){
          data[0].like = [];
        }
        if(data[0].like.includes(req.body.like.toString())){
          data[0].like.splice(data[0].like.indexOf(req.body.like.toString()), 1);
          return knex('events')
            .where({id: req.params.event_id})
            .update({like: data[0].like});
        } else{
          return knex('events')
            .where({id: req.params.event_id})
            .update({like: data[0].like.concat(req.body.like.toString())});
        }
      })
      .then(() => {
        res.send(200);
      });
  });

  events.put('/:city_name/events/:event_id/attend', (req, res) => {
    new Promise((resolve, reject) => {
      resolve(knex('events')
        .select('attend')
        .where('id', req.params.event_id));
    })
      .then((data) => {
        if(data[0].attend === null){
          data[0].attend = [];
        }
        if(data[0].attend.includes(req.body.attend)){
          data[0].attend.splice(data[0].attend.indexOf(req.body.attend), 1);
          return knex('events')
            .where({id: req.params.event_id})
            .update({attend: data[0].attend});
        } else{
          return knex('events')
            .where({id: req.params.event_id})
            .update({attend: data[0].attend.concat(req.body.attend)});
        }
      })
      .then(() => {
        res.send(200);
      });
  });

  events.delete('/:city_name/events/:event_id', (req, res) => {
    eventHelpers.deleteEvent(knex, req.params.event_id, () => {
      res.send(200);
    });
  });

  return events;
};



