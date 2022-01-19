const express = require('express');
const router = express.Router();
const {
  getAllCheckPoints,
  getCheckPointById
} = require('../model/checkPoint')
/*
  checkPoint = {
    id,
    title: string
    description: stirng,
    completionText: string
    position: {
      longitude: number,
      latitude: number
    },
    objectToFind: {
      format: string,
      url: string
  },
*/

//Get all checkpoints
router.get('/', async function(req, res, next) {
  const checkPoints = await getAllCheckPoints()
  res.send(checkPoints);
});

//Get a single checkPoint by id
router.get('/:id', async function(req, res, next) {
  const id = req.params.id
  const checkPoint = await getCheckPointById(id)
  res.send(checkPoint)
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
