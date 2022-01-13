const express = require('express');
const router = express.Router();
const db = require('../db.js')

/*
  checkPoint = {
    id,
    title: string
    description: stirng,
    position: {
      longitude: number,
      latitude: number
    },
    objectToFind: {
      format: string,
      url: string
    },
  }
*/

//Get all checkpoints
router.get('/', function(req, res, next) {
  res.send('ok');
});

//Get a single checkPoint by id
router.get('/:id', function(req, res, next) {
  res.send('ok');
});


//Create a checkPoint 
router.post('/', function(req, res, next) {
  res.send('ok');
});

//Update a checkPoint 
router.put('/', function(req, res, next) {
  res.send('ok');
});

//Delete a checkPoint 
router.delete('/', function(req, res, next) {
  res.send('ok');
});

module.exports = router;
