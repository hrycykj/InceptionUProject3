const express = require('express');
const router = express.Router();
const {
  getAllQuests,
  getQuestById,
  getQuestsByLocation,
  getQuestByCreator
} = require('../model/quest')
/*
  quest = {
    id,
    creator: user,
    title: string,
    description: stirng,
    completionStory: string,
    location: string,
    estimatedTime: number,
    avgTimeCompleted: number,
    startCount: number,
    completedCount: number,
    likes, number,
    checkPoints: checkPoints[]
  }
*/

//Get all quests
router.get('/', async function (req, res, next) {
  const quests = await getAllQuests()
  res.send(quests);
});

//Get a single quest by id
router.get('/:id', async function (req, res, next) {
  const id = req.params.id
  const quest = await getQuestById(id)
  res.send(quest)
  
});

//Get all quests created by a given user id 
router.get('/user/:id', async function (req, res, next) {
  const id = req.params.id
  const quests = await getQuestByCreator(id)
  res.send(quests)
});

//Get all quests in the location 
router.get('/location/:location', async function (req, res, next) {
  const location = req.params.location
  const quests = await getQuestsByLocation(location)
  res.send(quests)
});


//Create a quest 
router.post('/', function (req, res, next) {
  res.send('ok');
});

//Create user's quest progression
router.post('/user/:userId', function (req, res, next) {
  res.send('ok');
});

//Update a quest 
router.put('/', function (req, res, next) {
  res.send('ok');
});

//Update user's quest progression 
router.put('/', function (req, res, next) {
  res.send('ok');
});


//Delete a quest 
router.delete('/', function (req, res, next) {
  res.send('ok');
});

module.exports = router;
