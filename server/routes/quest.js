const express = require('express');
const router = express.Router();
const db = require('../db.js')

/*
  quest = {
    id,
    creator: user,
    description: stirng,
    title: string
    location: string,
    estimatedTime: number,
    avgTimeCompleted: number,
    startCount: number,
    completedCount: number,
    quest: quest[]
  }
*/

//Get all quests
router.get('/', function(req, res, next) {
  res.send('ok');
});

//Get a single quest by id
router.get('/:id', function(req, res, next) {
  res.send('ok');
});

//Get all quests created by a given user id 
router.get('/user/:id', function(req, res, next) {
  res.send('ok');
});

//Get all quests in the location 
router.get('/location/:location', function(req, res, next) {
  res.send('ok');
});


//Create a quest 
router.post('/', function(req, res, next) {
  res.send('ok');
});

//Create user's quest progression
router.post('/user/:userId', function(req, res, next) {
  res.send('ok');
});

//Update a quest 
router.put('/', function(req, res, next) {
  res.send('ok');
});

//Update user's quest progression 
router.put('/', function(req, res, next) {
  res.send('ok');
});


//Delete a quest 
router.delete('/', function(req, res, next) {
  res.send('ok');
});

module.exports = router;
